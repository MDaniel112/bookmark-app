package com.bookmarkapp.bookmark.bookmarkEntity;

import com.bookmarkapp.bookmark.user.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "bookmarks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;
    private String title;
    private String description;

    @ElementCollection
    private Set<String> tags;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime lastVisited;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
