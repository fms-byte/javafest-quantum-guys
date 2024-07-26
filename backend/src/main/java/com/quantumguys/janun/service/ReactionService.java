package com.quantumguys.janun.service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quantumguys.janun.dto.PageDTO;
import com.quantumguys.janun.dto.ReactionDTO;
import com.quantumguys.janun.entity.Reaction;
import com.quantumguys.janun.repository.ReactionRepository;
import com.quantumguys.janun.util.Utility;

@Service
@Transactional
public class ReactionService {

    @Autowired
    private ReactionRepository reactionRepository;

    public PageDTO<ReactionDTO> getMyReactions(String username, Pageable pageable){
        Page<ReactionDTO> reactions = reactionRepository.findMyReaction(username, pageable)
                                            .map(reaction -> convertToDto(username, reaction));
                                
        return new PageDTO<ReactionDTO>(reactions);
    }

    private ReactionDTO convertToDto(String username, Reaction reaction){
        ReactionDTO reactionDTO = reaction.toDto(ReactionDTO.class);
        reactionDTO.setCreatedAt(reaction.getCreatedAt().format(DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm")));
        reactionDTO.setUpdatedAt(reaction.getUpdatedAt().format(DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm")));

        long x = LocalDateTime.now().toEpochSecond(ZoneOffset.ofHours(6)) - reaction.getCreatedAt().toEpochSecond(ZoneOffset.ofHours(6));
        reactionDTO.setCreatedAgo(Utility.secToTime(x)+"ago");
        x = LocalDateTime.now().toEpochSecond(ZoneOffset.ofHours(6)) - reaction.getUpdatedAt().toEpochSecond(ZoneOffset.ofHours(6));
        reactionDTO.setUpdatedAgo(Utility.secToTime(x)+"ago");
        return reactionDTO;
    }


}