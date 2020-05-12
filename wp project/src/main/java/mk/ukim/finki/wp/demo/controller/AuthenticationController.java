package mk.ukim.finki.wp.demo.controller;

import mk.ukim.finki.wp.demo.security.AuthenticationRequest;
import mk.ukim.finki.wp.demo.security.AuthenticationResponse;
import mk.ukim.finki.wp.demo.model.User;
import mk.ukim.finki.wp.demo.repository.UserRepository;
import mk.ukim.finki.wp.demo.service.MyUserDetailsService;
import mk.ukim.finki.wp.demo.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private MyUserDetailsService userDetailsService;
    @Autowired
    private  JwtUtil jwtTokenUtil;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;
    @PostMapping("signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody AuthenticationRequest authenticationRequest){
        if(userRepository.existsByUsername(authenticationRequest.getUsername())){
            return ResponseEntity
                    .badRequest()
                    .body("ERROR: This username is already taken!");

        }
        User user = new User(authenticationRequest.getUsername(),encoder.encode(authenticationRequest.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok().body("User registered successfully!");

    }


    @RequestMapping(value = "/signin", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {


            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }
        final UserDetails userDetails= userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt=jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }


}
