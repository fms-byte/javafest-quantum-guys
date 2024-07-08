package com.quantumguys.janun.security;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.auth0.jwt.interfaces.DecodedJWT;

@Component
public class JwtToPricipalConverter {

    public UserPrincipal convert(DecodedJWT jwt){
        UserPrincipal userPrincipal = new UserPrincipal(jwt.getClaim("username").asString(),jwt.getClaim("email").asString(), Long.valueOf(jwt.getSubject()),null, null);
        userPrincipal.setAuthorities(getAuthorities(jwt));
        // print get authorities
        if(getAuthorities(jwt)==null){
            System.out.println("Authorities is null");
        }
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
        return List.of(new SimpleGrantedAuthority(role));
    }
                
}
