package com.bookmarkapp.bookmark.user;

import com.bookmarkapp.bookmark.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findById(Integer id);
    Optional<User> findByEmail(String email);
}
