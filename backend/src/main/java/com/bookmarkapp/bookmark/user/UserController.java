package com.bookmarkapp.bookmark.user;

import com.bookmarkapp.bookmark.user.User;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));  // Encrypt password
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials, HttpServletRequest request) {
        request.getSession().setAttribute("user", credentials.get("email"));  // Store session
        request.getSession().setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
        System.out.println("Session created: " + request.getSession().getId());  // Log session ID

        return ResponseEntity.ok(Map.of("message", "Logged in successfully"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        request.getSession().invalidate();  // Destroy session
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    @GetMapping("/check-auth")
    public ResponseEntity<?> checkAuth(HttpServletRequest request) {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        boolean isLoggedIn = !Objects.equals(name, "anonymousUser");
        Optional<Long> userId = Optional.empty();

        if (isLoggedIn) {
            userId = userRepository.findByEmail(name)
                    .map(User::getId);// or throw if preferred
        }

        return ResponseEntity.ok(Map.of("loggedIn", isLoggedIn, "name", name, "id", userId.map(Object::toString).orElse("unknown")));
    }
}
