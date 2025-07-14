package com.bookmarkapp.bookmark.bookmarkEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bookmarkapp.bookmark.user.User;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findAllByUser(User user);
    Optional<Bookmark> findByIdAndUser(Long id, User user);
    void deleteById(Long id);
}
