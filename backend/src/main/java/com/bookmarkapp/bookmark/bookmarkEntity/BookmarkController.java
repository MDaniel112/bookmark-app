package com.bookmarkapp.bookmark.bookmarkEntity;

import com.bookmarkapp.bookmark.user.User;
import com.bookmarkapp.bookmark.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createBookmark(
            @RequestBody BookmarkRequestDTO dto) {
        Optional<User> userOpt = userRepository.findById(dto.getUserId());

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid user ID.");
        }

        return ResponseEntity.ok(bookmarkService.create(userOpt.get(), dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookmarks(@PathVariable Long id) {
        Optional<User> userOpt = userRepository.findById(id);

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid user ID.");
        }
        return ResponseEntity.ok(bookmarkService.getAllByUser(userOpt.get()));
    }

    @PutMapping("/{id}/visited")
    public ResponseEntity<BookmarkResponseDTO> updateLastVisited(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        return ResponseEntity.ok(bookmarkService.updateLastVisited(user, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBookmark(@PathVariable Long id) {
        bookmarkService.deleteBookmark(id);
        return ResponseEntity.ok(Map.of("message", "bookmark deleted"));
    }
}
