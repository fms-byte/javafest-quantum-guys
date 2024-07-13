package com.quantumguys.janun.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.auth0.jwt.interfaces.DecodedJWT;

@Component
public class JwtToPricipalConverter {

    public UserPrincipal convert(DecodedJWT jwt){
        UserPrincipal userPrincipal = new UserPrincipal(jwt.getClaim("username").asString(),jwt.getClaim("email").asString(), Long.valueOf(jwt.getSubject()),null, null);
        
        List<SimpleGrantedAuthority> authorities = getAuthorities(jwt);

        if(authorities == null){
            System.out.println("Authorities is null");
        }
        userPrincipal.setAuthorities(authorities);

        // print get authorities
        // System.out.println("User principal created "+userPrincipal.getUsername()+" "+userPrincipal.getEmail()+" "+userPrincipal.getUserId()+" "+userPrincipal.getAuthorities());
        return userPrincipal;
    }

    private List<SimpleGrantedAuthority> getAuthorities(DecodedJWT jwt) {
        var claim = jwt.getClaim("role");
        if (claim.isNull() || claim.isMissing()) {
            System.out.println("Role claim is missing");
            return List.of();
        }
        String role = claim.asString();
        // System.out.println("Role claim is present: " + role);

        if (role == null || role.isEmpty()) {
            System.out.println("Role is null or empty");
            return List.of();
        }
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role));
        
        if(role.equals("ADMIN")){
            authorities.add(new SimpleGrantedAuthority("MANAGER"));
            authorities.add(new SimpleGrantedAuthority("USER"));
        }
        if(role.equals("MANAGER")){
            authorities.add(new SimpleGrantedAuthority("USER"));
        }

        return authorities;
    }
                
}
