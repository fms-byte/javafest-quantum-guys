package com.quantumguys.janun.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.quantumguys.janun.entity.AuthUser;
import com.quantumguys.janun.repository.UserRepository;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        AuthUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        UserPrincipal userPrincipal= new UserPrincipal(user.getUsername(),user.getEmail(), user.getId(),user.getPassword() ,null);
        userPrincipal.setAuthorities(getAuthorities(user));
        // if(getAuthorities(user)==null){
        //     System.out.println("Authorities is null");
        // }
        // else{
        //     for(SimpleGrantedAuthority s:getAuthorities(user)){
        //         System.out.println("Authorities are "+s.getAuthority());
        //     }
        // }
        return userPrincipal;
    };

    private List<SimpleGrantedAuthority> getAuthorities(AuthUser user) {
        return List.of(new SimpleGrantedAuthority(user.getRole()));
    }

}
