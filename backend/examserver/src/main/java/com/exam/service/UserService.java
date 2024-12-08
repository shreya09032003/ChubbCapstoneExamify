package com.exam.service;

import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.model.Role;

import java.util.List;
import java.util.Set;

public interface UserService {

    // Creating user
    public User createUser(User user, Set<UserRole> userRoles, Long categoryId) throws Exception;

    // Get user by username
    public User getUser(String username);

    List<User> getUsersByRole(String roleName);

    // Delete user by ID
    public void deleteUser(Long userId);

    // Get role by role name
    public Role getRoleByName(String roleName);

    public List<User> getAllUsers();

    User updateUser(User user);
}
