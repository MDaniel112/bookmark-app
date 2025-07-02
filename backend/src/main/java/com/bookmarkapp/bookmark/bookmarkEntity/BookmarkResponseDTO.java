package com.bookmarkapp.bookmark.bookmarkEntity;


import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
public class BookmarkResponseDTO {
    private Long id;
    private String url;
    private String title;
    private String description;
    private Set<String> tags;
    private LocalDateTime createdAt;
    private LocalDateTime lastVisited;
    private Long userId;
}