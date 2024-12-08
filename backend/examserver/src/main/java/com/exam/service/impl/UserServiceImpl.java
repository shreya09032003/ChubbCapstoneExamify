package com.exam.service.impl;

import com.exam.helper.UserFoundException;
import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repo.CategoryRepository;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private CategoryRepository categoryRepository;


    // Creating user
//    @Override
//    public User createUser(User user, Set<UserRole> userRoles) throws Exception {
//        User local = this.userRepository.findByUsername(user.getUsername());
//        if (local != null) {
//            System.out.println("User is already there !!");
//            throw new UserFoundException();
//        } else {
//            // Assigning roles to the user
//            user.getUserRoles().addAll(userRoles);
//            local = this.userRepository.save(user);
//        }
//
//        return local;
//    }


    @Override
    public User createUser(User user, Set<UserRole> userRoles, Long categoryId) throws Exception {
        // Check if user already exists
        User local = this.userRepository.findByUsername(user.getUsername());
        if (local != null) {
            System.out.println("User is already there !!");
            throw new UserFoundException();
        } else {
            // Get the category by ID
            this.categoryRepository.findById(categoryId).ifPresent(user::setCategory);

            // Assign roles to the user
            user.getUserRoles().addAll(userRoles);

            // Generate a verification token
//            String verificationToken = UUID.randomUUID().toString();
//            user.setVerificationToken(verificationToken);


            local = this.userRepository.save(user);
            // Send the verification email
//            this.emailService.sendVerificationEmail(user.getEmail(), verificationToken);

        }

        return local;
    }


    // Get role by role name
    @Override
    public Role getRoleByName(String roleName) {
        return this.roleRepository.findByRoleName(roleName);
    }

    // Get user by username
    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }


    @Override
    public List<User> getUsersByRole(String roleName) {
        return this.userRepository.findUsersByRoleName(roleName);
    }

    // Delete user by ID
    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

    @Override
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    @Override
    public User updateUser(User user) {
        User existingUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update fields
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPhone(user.getPhone());

        return userRepository.save(existingUser);
    }


}
