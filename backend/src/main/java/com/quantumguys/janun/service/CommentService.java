package com.quantumguys.janun.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quantumguys.janun.dto.CommentDTO;
import com.quantumguys.janun.dto.PageDTO;
import com.quantumguys.janun.entity.Comment;
import com.quantumguys.janun.repository.CommentRepository;

@Service
@Transactional
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public PageDTO<CommentDTO> getMyComments(String username, Pageable pageable){
        Page<CommentDTO> comments = commentRepository.getUserComments(username, pageable)
                                    .map(comment -> convertToDto(username, comment));

        return new PageDTO<CommentDTO>(comments);
    }

    private CommentDTO convertToDto(String username, Comment comment){
        CommentDTO commentDTO = comment.toDto(CommentDTO.class);
        return commentDTO;
    }
}