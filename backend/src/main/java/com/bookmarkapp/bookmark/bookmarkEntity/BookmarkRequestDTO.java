package com.bookmarkapp.bookmark.bookmarkEntity;

import lombok.Data;

import java.util.Set;

@Data
public class BookmarkRequestDTO {
    private String url;
    private String title;
    private String description;
    private Set<String> tags;
    private Long userId;
}
