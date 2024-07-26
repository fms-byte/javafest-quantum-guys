package com.quantumguys.janun.service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quantumguys.janun.dto.ChannelMinDTO;
import com.quantumguys.janun.dto.CommentCreateDTO;
import com.quantumguys.janun.dto.CommentDTO;
import com.quantumguys.janun.dto.MediaMinDTO;
import com.quantumguys.janun.dto.PageDTO;
import com.quantumguys.janun.dto.PostCreateDTO;
import com.quantumguys.janun.dto.PostDTO;
import com.quantumguys.janun.dto.TagMinDTO;
import com.quantumguys.janun.entity.AuthUser;
import com.quantumguys.janun.entity.Channel;
import com.quantumguys.janun.entity.Comment;
import com.quantumguys.janun.entity.Media;
import com.quantumguys.janun.entity.Post;
import com.quantumguys.janun.entity.Reaction;
import com.quantumguys.janun.entity.Tag;
import com.quantumguys.janun.entity.Thread;
import com.quantumguys.janun.repository.AuthUserRepository;
import com.quantumguys.janun.repository.ChannelRepository;
import com.quantumguys.janun.repository.CommentRepository;
import com.quantumguys.janun.repository.PostRepository;
import com.quantumguys.janun.repository.ReactionRepository;
import com.quantumguys.janun.repository.ReportRepository;
import com.quantumguys.janun.repository.TagRepository;
import com.quantumguys.janun.repository.ThreadRepository;
import com.quantumguys.janun.util.Utility;

@Service
@Transactional
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ChannelRepository channelRepository;

    @Autowired
    private ThreadRepository threadRepository;

    @Autowired
    private AuthUserRepository authUserRepository;

    @Autowired
    private ReactionRepository reactionRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private TagRepository tagRepository;

    public PostDTO createPost(String username, PostCreateDTO postCreateDTO) {
        Thread thread = threadRepository
                .findBySlugAndChannelSlug(postCreateDTO.getThreadSlug(), postCreateDTO.getChannelSlug())
                .orElseThrow(() -> new RuntimeException("Thread not found"));

        Channel channel = thread.getChannel();

        Post post = new Post();
        post = updateFromDto(postCreateDTO, thread, channel, post);

        String slug = titleToSlug(postCreateDTO.getTitle(), channel.getSlug(), thread.getSlug());
        while (postRepository.existsBySlug(slug)) {
            slug = titleToSlug(postCreateDTO.getTitle(), channel.getSlug(), thread.getSlug());
        }
        post.setSlug(slug);

        post = updateTags(postCreateDTO, post);
        post = updateMedia(postCreateDTO, post);

        post = save(post);
        return convertToDTO(username, post, channel);
    }

    public PostDTO updatePost(String username, String postSlug, PostCreateDTO postCreateDTO) {
        Post post = postRepository.findBySlug(postSlug)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Thread thread = post.getThread();
        Channel channel = thread.getChannel();

        post = updateFromDto(postCreateDTO, thread, channel, post);
        post = updateTags(postCreateDTO, post);
        post = updateMedia(postCreateDTO, post);

        post = save(post);
        return convertToDTO(username, post, channel);
    }

    public Post save(Post post) {
        return postRepository.save(post);
    }

    public void deletePost(String postSlug) {
        Post post = postRepository.findBySlug(postSlug)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        postRepository.delete(post);
    }

    public PageDTO<PostDTO> getChannelPosts(String username, String channelSlug, Pageable pageable) {
        boolean isPremium = authUserRepository.isPremium(username);
        Page<PostDTO> posts = postRepository.getChannelPosts(channelSlug, isPremium, pageable)
                .map(post -> convertToDTO(username, post, post.getThread().getChannel()));
        return new PageDTO<PostDTO>(posts);
    }

    public PageDTO<PostDTO> getThreadPosts(String username, String channelSlug, String threadSlug, Pageable pageable) {
        boolean isPremium = authUserRepository.isPremium(username);
        Page<PostDTO> posts = postRepository.getThreadPosts(channelSlug, threadSlug, isPremium, pageable)
                .map(post -> convertToDTO(username, post, post.getThread().getChannel()));
        return new PageDTO<PostDTO>(posts);
    }

    public PageDTO<PostDTO> getTagPosts(String username, String tagSlug, Pageable pageable) {
        boolean isPremium = authUserRepository.isPremium(username);
        Page<PostDTO> posts = postRepository.getTagPosts(tagSlug, isPremium, pageable)
                .map(post -> convertToDTO(username, post, post.getThread().getChannel()));
        return new PageDTO<PostDTO>(posts);
    }

    public PostDTO getPost(String username, String postSlug) {
        Post post = postRepository.findBySlug(postSlug)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return convertToDTO(username, post, post.getThread().getChannel());
    }

    public Post getPostEntity(String username, String postSlug) {
        Post post = postRepository.findBySlug(postSlug)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return post;
    }

    public PageDTO<PostDTO> getPosts(String username, Pageable pageable) {
        boolean isPremium = authUserRepository.isPremium(username);
        Page<PostDTO> posts = postRepository.getPosts(isPremium, pageable)
                .map(post -> convertToDTO(username, post, post.getThread().getChannel()));
        return new PageDTO<PostDTO>(posts);
    }

    public PageDTO<PostDTO> getMyPosts(String username, Pageable pageable) {
        Page<PostDTO> posts = postRepository.findMyPosts(username, pageable)
                .map(post -> convertToDTO(username, post, post.getThread().getChannel()));
        return new PageDTO<PostDTO>(posts);
    }

    public PostDTO react(String username, String postSlug, String reaction) {
        Post post = postRepository.findBySlug(postSlug)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        AuthUser user = authUserRepository.getUser(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Reaction oldReaction = reactionRepository.getReaction(username, postSlug)
                .orElse(null);

        if (reaction == null) {
            // remove reaction
            if (oldReaction != null) {
                post.getReactions().remove(oldReaction);
                if (oldReaction.getType().equals("like")) {
                    post.setLikesCount(post.getLikesCount() - 1);
                } else if (oldReaction.getType().equals("dislike")) {
                    post.setDislikesCount(post.getDislikesCount() - 1);
                }
            }
        } else {
            if (!reaction.equals("like") && !reaction.equals("dislike")) {
                throw new RuntimeException("Invalid reaction type");
            }
            if (oldReaction == null) {
                Reaction newReaction = new Reaction();
                newReaction.setUser(user);
                newReaction.setPost(post);
                newReaction.setType(reaction);

                post.getReactions().add(newReaction);
                if (reaction.equals("like")) {
                    post.setLikesCount(post.getLikesCount() + 1);
                } else if (reaction.equals("dislike")) {
                    post.setDislikesCount(post.getDislikesCount() + 1);
                }
            } else {
                if (!oldReaction.getType().equals(reaction)) {
                    if (reaction.equals("like")) {
                        post.setLikesCount(post.getLikesCount() + 1);
                        post.setDislikesCount(post.getDislikesCount() - 1);
                    } else if (reaction.equals("dislike")) {
                        post.setDislikesCount(post.getDislikesCount() + 1);
                        post.setLikesCount(post.getLikesCount() - 1);
                    }
                    oldReaction.setType(reaction);
                    post.getReactions().add(oldReaction);
                }
            }
        }
        post = save(post);
        return convertToDTO(username, post, post.getThread().getChannel());
    }

    public PageDTO<CommentDTO> getComments(String username, String postSlug, Pageable pageable) {
        Page<Comment> comments = commentRepository.getPostComments(postSlug, pageable);
        return new PageDTO<CommentDTO>(comments.map(comment -> comment.toDto(CommentDTO.class)));
    }

    public CommentDTO getComment(String username, String postSlug, long commentId){
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        return comment.toDto(CommentDTO.class);
    }

    public PageDTO<CommentDTO> getMyComments(String username, String postSlug, Pageable pageable) {
        Page<Comment> comments = commentRepository.getUserComments(username, postSlug, pageable);
        return new PageDTO<CommentDTO>(comments.map(comment -> comment.toDto(CommentDTO.class)));
    }

    public CommentDTO addComment(String username, String postSlug, CommentCreateDTO commentCreateDTO) {
        AuthUser user = authUserRepository.getUser(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = postRepository.findBySlug(postSlug)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Comment comment = new Comment();
        comment.updateFromDto(commentCreateDTO);
        comment.setUser(user);
        comment.setPost(post);

        post.getComments().add(comment);
        post.setCommentsCount(post.getCommentsCount() + 1);
        post = save(post);

        comment = commentRepository.getMyLastCommentInPost(username, postSlug);
        if(comment==null)throw new RuntimeException("An Error Ocurred");
        return comment.toDto(CommentDTO.class);
    }

    public void deleteComment(String username, String postSlug, long commentId) {
        AuthUser user = authUserRepository.getUser(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = postRepository.findBySlug(postSlug)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        
        if(comment.getUser()!=user){
            throw new RuntimeException("You are not allowed to remove this comment");
        }

        post.getComments().remove(comment);
        post.setCommentsCount(post.getCommentsCount()-1);
        save(post);
    }

    private PostDTO convertToDTO(String username, Post post, Channel channel) {
        PostDTO postDTO = post.toDto(PostDTO.class);
        postDTO.setCreatedAt(post.getCreatedAt().format(DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm")));
        postDTO.setUpdatedAt(post.getUpdatedAt().format(DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm")));

        long x = LocalDateTime.now().toEpochSecond(ZoneOffset.ofHours(6)) - post.getCreatedAt().toEpochSecond(ZoneOffset.ofHours(6));
        postDTO.setCreatedAgo(Utility.secToTime(x)+"ago");
        x = LocalDateTime.now().toEpochSecond(ZoneOffset.ofHours(6)) - post.getUpdatedAt().toEpochSecond(ZoneOffset.ofHours(6));
        postDTO.setUpdatedAgo(Utility.secToTime(x)+"ago");

        postDTO.setChannel(channel.toDto(ChannelMinDTO.class));
        postDTO.getChannel().setSubscribed(channelRepository.isSubscribed(username, channel.getSlug()));

        postDTO.getThread().setSubscribed(threadRepository.isSubscribed(username, channel.getSlug(),
                post.getThread().getSlug()));

        postDTO.setReaction(reactionRepository.getReactionType(username, post.getSlug()));
        postDTO.setReacted(postDTO.getReaction() != null);
        postDTO.setCommented(commentRepository.isCommented(username, post.getSlug()));
        postDTO.setReported(reportRepository.isReportedPost(username, post.getSlug()));
        postDTO.setSubscribed(postDTO.getThread().isSubscribed());

        return postDTO;
    }

    private Post updateFromDto(PostCreateDTO postCreateDTO, Thread thread, Channel channel, Post post) {
        post.setThread(thread);
        post.setTitle(postCreateDTO.getTitle());
        post.setContent(postCreateDTO.getContent());
        post.setType(postCreateDTO.getType());
        post.setStatus(postCreateDTO.getStatus());
        post.setPremium(postCreateDTO.isPremium()|thread.isPremium());

        return post;
    }

    private String titleToSlug(String title, String channelSlug, String threadSlug) {
        title = title.toLowerCase();
        String slug = title.replace(' ', '-');
        slug += "-" + channelSlug;
        slug += "-" + threadSlug;
        slug += "-" + RandomChars(4);
        return slug;
    }

    private String RandomChars(int n){
        String s ="";
		for(int i=0;i<n;i++){
			int x = (int)(Math.random()*1000);
			x = x%26 +97;
			s = s + String.valueOf(Character.toChars(x));
		}
		return s;
    }

    private Post updateTags(PostCreateDTO postCreateDTO, Post post) {
        if (postCreateDTO.getTags() != null) {
            post = removeAllTags(post);
            // get real tags from db
            Set<String> tagNames = postCreateDTO.getTags().stream().map(TagMinDTO::getName)
                    .collect(Collectors.toSet());
            Set<Tag> oldTags = tagRepository.getTags(tagNames);

            // add the channel in the tags and increase the channel count of the tags
            for (Tag tag : oldTags) {
                tag.getPosts().add(post);
                tag.setPostCount(tag.getPostCount() + 1);
            }
            // set the tags of the channel and update the tag count
            post.setTags(oldTags);
            post.setTagCount((long) oldTags.size());
        }
        return post;
    }
    private Post removeAllTags(Post post) {
        if (post.getTags() != null) {
            for (Tag tag : post.getTags()) {
                tag.getPosts().remove(post);
                tag.setPostCount(tag.getPostCount()-1);
            }
        }
        post.getTags().clear();
        post.setTagCount(0);
        return post;
    }

    private Post updateMedia(PostCreateDTO postCreateDTO, Post post) {
        if (postCreateDTO.getMedia() != null) {
            List<Media> mediaList = new ArrayList<>();
            for (MediaMinDTO mediaMinDTO : postCreateDTO.getMedia()) {
                Media media = new Media();
                media.setType(mediaMinDTO.getType());
                media.setUrl(mediaMinDTO.getUrl());
                media.setPost(post);
                mediaList.add(media);
            }
            post.getMedia().clear();
            post.setMedia(mediaList);
        }
        return post;
    }

}