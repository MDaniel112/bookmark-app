package com.bookmarkapp.bookmark.bookmarkEntity;

import com.bookmarkapp.bookmark.user.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookmarkService {

    private final BookmarkRepository repository;

    public BookmarkService(BookmarkRepository repository) {
        this.repository = repository;
    }

    public BookmarkResponseDTO create(User user, BookmarkRequestDTO dto) {
        Bookmark bookmark = Bookmark.builder()
                .url(dto.getUrl())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .tags(dto.getTags())
                .user(user)
                .createdAt(LocalDateTime.now())
                .build();

        Bookmark saved = repository.save(bookmark);
        return toResponse(saved);
    }

    public List<BookmarkResponseDTO> getAllByUser(User user) {
        return repository.findAllByUser(user).stream()
                .map(this::toResponse)
                .toList();
    }

    public BookmarkResponseDTO updateLastVisited(User user, Long id) {
        Bookmark bookmark = repository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Bookmark not found"));

        bookmark.setLastVisited(LocalDateTime.now());
        Bookmark updated = repository.save(bookmark);
        return toResponse(updated);
    }

    public void deleteBookmark(Long id) {
        repository.deleteById(id);
    }

    private BookmarkResponseDTO toResponse(Bookmark b) {
        return BookmarkResponseDTO.builder()
                .id(b.getId())
                .url(b.getUrl())
                .title(b.getTitle())
                .description(b.getDescription())
                .tags(b.getTags())
                .createdAt(b.getCreatedAt())
                .lastVisited(b.getLastVisited())
                .build();
    }
}