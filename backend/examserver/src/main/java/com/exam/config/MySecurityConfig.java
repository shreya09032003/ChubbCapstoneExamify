package com.exam.config;

import com.exam.service.impl.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class MySecurityConfig {

    private final JwtAuthenticationEntryPoint unauthorizedHandler;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public MySecurityConfig(
            JwtAuthenticationEntryPoint unauthorizedHandler,
            JwtAuthenticationFilter jwtAuthenticationFilter,
            UserDetailsServiceImpl userDetailsServiceImpl
    ) {
        this.unauthorizedHandler = unauthorizedHandler;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests( request->
                                request.requestMatchers("/generate-token", "/user/","/category/","/notifications","/quiz","/result").permitAll()  // Use antMatchers() instead of requestMatchers()
                                .requestMatchers(HttpMethod.OPTIONS).permitAll()
//                                        .requestMatchers("/admin/deactivate-user/**").hasRole("ADMIN")
                                .anyRequest().authenticated()
                        )  // Use authorizeRequests() instead of authorizeHttpRequests()
                .exceptionHandling(config->config.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
