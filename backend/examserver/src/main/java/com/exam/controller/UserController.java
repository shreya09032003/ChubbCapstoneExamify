package com.exam.controller;

import com.exam.helper.UserFoundException;
import com.exam.model.Notification;
import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.model.exam.Category;
import com.exam.service.CategoryService;
import com.exam.service.NotificationService;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private NotificationService notificationService;

    //creating user
//    @PostMapping("/")
//    public ResponseEntity<?> createUser(@RequestBody User user) throws Exception {
//        // Validate and fetch the role dynamically
//        Role selectedRole = this.userService.getRoleByName(user.getRole());
//        if (selectedRole == null) {
//            return ResponseEntity.badRequest().body("Invalid role selected.");
//        }
//
//        user.setProfile("default.png");
//
//        // Encode the password
//        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
//
//        // Create a set for UserRole
//        Set<UserRole> roles = new HashSet<>();
//
//        UserRole userRole = new UserRole();
//        userRole.setUser(user);
//        userRole.setRole(selectedRole);
//
//        roles.add(userRole);
//
//        // Save the user with the dynamically selected role
//        User createdUser = this.userService.createUser(user, roles);
//
//        return ResponseEntity.ok(createdUser);
//    }


    // Creating user with category
//    @PostMapping("/")
//    public ResponseEntity<?> createUser(@RequestBody User user,  @RequestParam Long categoryId) throws Exception {
//        // Validate and fetch the role dynamically
//        Role selectedRole = this.userService.getRoleByName(user.getRole());
//        if (selectedRole == null) {
//            return ResponseEntity.badRequest().body("Invalid role selected.");
//        }
//
//        user.setProfile("default.png");
//
//        // Encode the password
//        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
//
//        // Create a set for UserRole
//        Set<UserRole> roles = new HashSet<>();
//        UserRole userRole = new UserRole();
//        userRole.setUser(user);
//        userRole.setRole(selectedRole);
//        roles.add(userRole);
//
//        // Save the user with the dynamically selected role and category
//        User createdUser = this.userService.createUser(user, roles, categoryId);
//
//        return ResponseEntity.ok(createdUser);
//    }


    @PostMapping("/")
    public ResponseEntity<?> createUser(@RequestBody User user, @RequestParam Long categoryId) throws Exception {
        // Validate and fetch the role dynamically
        Role selectedRole = this.userService.getRoleByName(user.getRole());
        if (selectedRole == null) {
            return ResponseEntity.badRequest().body("Invalid role selected.");
        }
        System.out.println(user.getCategory());

        user.setProfile("default.png");
        System.out.println(categoryId);

        // Encode the password
        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));

        // Create a set for UserRole
        Set<UserRole> roles = new HashSet<>();
        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(selectedRole);
        roles.add(userRole);

        // Fetch the Category based on categoryId
        Category category = this.categoryService.getCategory(categoryId);

        if (category == null) {
            return ResponseEntity.badRequest().body("Category not found.");
        }

        user.setCategory(category);  // Set the category for the user

        // Pass all three arguments to the createUser method
        User createdUser = this.userService.createUser(user, roles, categoryId);

        return ResponseEntity.ok(createdUser);
    }


    // Endpoint to get all users by role
    @GetMapping("/role/{roleName}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable String roleName) {
        List<User> users = userService.getUsersByRole(roleName);
        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(users);
        }
        return ResponseEntity.ok(users);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username) {
        return this.userService.getUser(username);
    }


    //delete the user by id
//    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) {

        this.userService.deleteUser(userId);


    }

//    public void delete(@PathVariable("quesId") Long quesId) {
//        this.service.deleteQuestion(quesId);
//    }


    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = this.userService.getAllUsers();
        System.out.println(users);
        return ResponseEntity.ok(users);
    }


    @GetMapping("/notifications")
    @CrossOrigin("*")
    public List<Notification> getNotificationsByRole(@RequestParam String role) {
        // Fetch the notifications based on the role
        return notificationService.getNotificationsByRole(role);
    }


    //update api


    @ExceptionHandler(UserFoundException.class)
    public ResponseEntity<?> exceptionHandler(UserFoundException ex) {
        return ResponseEntity.ok(ex.getMessage());
    }


    @PutMapping("/update-user")
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        try {
            System.out.println("Updating user: " + user);
            User updatedUser = userService.updateUser(user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            System.out.println("Error updating user: " + e.getMessage());
            e.printStackTrace();  // Print full stack trace to the logs
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating user profile: " + e.getMessage());
        }
//}


    }
}
