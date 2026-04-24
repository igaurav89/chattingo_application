package com.chattingo.backend.controller;

import com.chattingo.backend.model.User;
import com.chattingo.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.chattingo.backend.config.JwtUtil;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
private JwtUtil jwtUtil;

    // Register API
    @PostMapping("/register")
    public String register(@RequestBody User user) {

        Optional<User> existingUser =
                userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            return "Email Already Exists";
        }

        userRepository.save(user);
        return "User Registered Successfully";
    }

    // Login API
   @PostMapping("/login")
public String login(@RequestBody User user) {

    Optional<User> existingUser =
            userRepository.findByEmailAndPassword(
                    user.getEmail(),
                    user.getPassword()
            );

    if (existingUser.isPresent()) {
        return jwtUtil.generateToken(user.getEmail());
    } else {
        return "Invalid Email or Password";
    }
}

    // Test API
    @GetMapping("/test")
    public String test() {
        return "Backend Running Successfully";
    }
}