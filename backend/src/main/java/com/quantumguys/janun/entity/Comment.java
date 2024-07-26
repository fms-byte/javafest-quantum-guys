package com.quantumguys.janun.entity;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;

import com.quantumguys.janun.dto.CommentDTO;
import com.quantumguys.janun.util.Utility;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Comment extends BaseEntity {

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private AuthUser user;

    @OneToMany(mappedBy = "comment", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Report> reports;

    private long reportsCount;

    private boolean anonymous;

    public <T> T toDto(Class<T> clazz) {
        T dto = super.toDto(clazz);

        if (dto instanceof CommentDTO) {
            if (this.isAnonymous()) {
                ((CommentDTO) dto).setUser(null);
            }

            ((CommentDTO) dto)
                    .setCreatedAt(this.getCreatedAt().format(DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm")));
            ((CommentDTO) dto)
                    .setUpdatedAt(this.getUpdatedAt().format(DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm")));

            long x = LocalDateTime.now().toEpochSecond(ZoneOffset.ofHours(6))
                    - this.getCreatedAt().toEpochSecond(ZoneOffset.ofHours(6));
            ((CommentDTO) dto).setCreatedAgo(Utility.secToTime(x) + "ago");
            x = LocalDateTime.now().toEpochSecond(ZoneOffset.ofHours(6))
                    - this.getUpdatedAt().toEpochSecond(ZoneOffset.ofHours(6));
            ((CommentDTO) dto).setUpdatedAgo(Utility.secToTime(x) + "ago");
        }
        return dto;
    }

}