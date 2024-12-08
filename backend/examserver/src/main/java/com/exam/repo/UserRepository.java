package com.exam.repo;

import com.exam.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findByUsername(String username);



    @Query("SELECT u FROM User u JOIN u.userRoles ur JOIN ur.role r WHERE r.roleName = :roleName")
    List<User> findUsersByRoleName(@Param("roleName") String roleName);

}
