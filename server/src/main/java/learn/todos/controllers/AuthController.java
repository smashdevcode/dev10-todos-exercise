package learn.todos.controllers;

import learn.todos.models.AppUser;
import learn.todos.models.ValidationErrorResult;
import learn.todos.security.AppUserService;
import learn.todos.security.JwtConverter;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.ValidationException;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {
    // The `AuthenticationManager` interface defines a single method `authenticate()`
    // that processes an Authentication request.
    private final AuthenticationManager authenticationManager;
    private final JwtConverter converter;
    private final AppUserService service;

    public AuthController(AuthenticationManager authenticationManager, JwtConverter converter, AppUserService service) {
        this.authenticationManager = authenticationManager;
        this.converter = converter;
        this.service = service;
    }

    @PostMapping("/api/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody Map<String, String> credentials) {
        // The `UsernamePasswordAuthenticationToken` class is an `Authentication` implementation
        // that is designed for simple presentation of a username and password.
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(credentials.get("username"), credentials.get("password"));

        try {
            // The `Authentication` interface Represents the token for an authentication request
            // or for an authenticated principal once the request has been processed by the //
            // `AuthenticationManager.authenticate(Authentication)` method.
            Authentication authentication = authenticationManager.authenticate(authToken);

            if (authentication.isAuthenticated()) {
                // The `User` class models core user information retrieved by a `UserDetailsService`.
                // Developers may use this class directly, subclass it, or write their own
                // `UserDetails` implementation from scratch.
                User user = (User)authentication.getPrincipal();

                String jwtToken = converter.getTokenFromUser(user);

                HashMap<String, String> map = new HashMap<>();
                map.put("jwt_token", jwtToken);

                return new ResponseEntity<>(map, HttpStatus.OK);
            }
        } catch (AuthenticationException ex) {
            System.out.println(ex);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping("/api/create_account")
    public ResponseEntity<?> createAccount(@RequestBody AppUser appUser) {
        try {
            appUser.getRoles().add("USER");
            service.add(appUser);
        } catch (ValidationException ex) {
            ValidationErrorResult validationErrorResult = new ValidationErrorResult();
            validationErrorResult.addMessage(ex.getMessage());
            return new ResponseEntity<>(validationErrorResult, HttpStatus.BAD_REQUEST);
        } catch (DuplicateKeyException ex) {
            ValidationErrorResult validationErrorResult = new ValidationErrorResult();
            validationErrorResult.addMessage("The provided username already exists");
            return new ResponseEntity<>(validationErrorResult, HttpStatus.BAD_REQUEST);
        }

        HashMap<String, String> map = new HashMap<>();
        map.put("appUserId", String.valueOf(appUser.getAppUserId()));

        return new ResponseEntity<>(map, HttpStatus.CREATED);
    }
}
