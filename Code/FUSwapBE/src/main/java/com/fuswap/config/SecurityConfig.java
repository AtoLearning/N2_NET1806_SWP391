package com.fuswap.config;

import com.fuswap.dtos.user.CustomerDto;
import com.fuswap.dtos.user.ManagerDto;
import com.fuswap.entities.user.CustomOidcUser;
import com.fuswap.entities.user.Customer;
import com.fuswap.entities.user.Manager;
import com.fuswap.exceptions.CustomAccessDeniedHandler;
import com.fuswap.exceptions.CustomAuthenticationEntryPoint;
import com.fuswap.services.user.CustomerDetailsService;
import com.fuswap.services.user.CustomerService;
import com.fuswap.services.user.ManagerDetailsService;
import com.fuswap.services.user.ManagerService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@Slf4j
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final CustomerService customerService;
    private final ManagerService managerService;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;
    private final CorsConfig corsConfig;
    private final ManagerDetailsService managerDetailsService;
    private final CustomerDetailsService customerDetailsService;

    private final String[] PUBLIC_ENDPOINT = {
            "/api/v1/oauth2/**",
            "/api/v1/guest/**",
            "/api/v1/perform_login",
            "/api/v1/auth-status"
    };
    private final String FAILURE_CUSTOMER_LOGIN_PAGE = "http://localhost:3000/c/login?error=inemail";
    private final String HOMEPAGE_AFTER_EXPIRE = "http://localhost:3000/";
    private final String CUSTOMER_HOMEPAGE_AUTHORIZED = "http://localhost:3000/";

    public SecurityConfig(CustomerService customerService, ManagerService managerService,
                          CustomAuthenticationEntryPoint customAuthenticationEntryPoint, CustomAccessDeniedHandler customAccessDeniedHandler,
                          CorsConfig corsConfig, ManagerDetailsService managerDetailsService, CustomerDetailsService customerDetailsService) {
        this.customerService = customerService;
        this.managerService = managerService;
        this.customAuthenticationEntryPoint = customAuthenticationEntryPoint;
        this.customAccessDeniedHandler = customAccessDeniedHandler;
        this.corsConfig = corsConfig;
        this.managerDetailsService = managerDetailsService;
        this.customerDetailsService = customerDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity.cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer
                .configurationSource(corsConfig.corsConfigurationSource()));
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        httpSecurity.authorizeHttpRequests(request -> request
                .requestMatchers(PUBLIC_ENDPOINT).permitAll()
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/v1/mod/**").hasAnyRole("ADMIN", "MODERATOR")
                .requestMatchers("/api/v1/customer/permission/**").hasRole("CUSTOMER")
                .requestMatchers("/api/v1/customer/**").hasAnyRole("ADMIN", "MODERATOR", "CUSTOMER")
                .anyRequest().authenticated());
        httpSecurity.exceptionHandling(exceptionHandling -> exceptionHandling
                .accessDeniedHandler(customAccessDeniedHandler)
                .authenticationEntryPoint(customAuthenticationEntryPoint));
        httpSecurity.formLogin(login -> login
                .loginProcessingUrl("/api/v1/perform_login")
                .usernameParameter("username")
                .passwordParameter("password")
                .successHandler(ManagerAuthenticationSuccessHandler())
                .failureHandler(ManagerAuthenticationFailureHandler())
                .permitAll());
        httpSecurity.oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo
                        .oidcUserService(this.oidcUserService()))
                .successHandler(CustomerAuthenticationSuccessHandler())
                .failureUrl(FAILURE_CUSTOMER_LOGIN_PAGE)
                .permitAll());
        httpSecurity.sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                .maximumSessions(1)
                .maxSessionsPreventsLogin(false)
                .expiredUrl(HOMEPAGE_AFTER_EXPIRE));
        httpSecurity.logout(logout -> logout
                .logoutUrl("/logout")
                .deleteCookies("SESSION")
                .invalidateHttpSession(true)
                .logoutSuccessUrl(HOMEPAGE_AFTER_EXPIRE));

        return httpSecurity.build();
    }

    @Bean
    public OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService() {
        return userRequest -> {
            OidcUser oidcUser = new DefaultOidcUser(
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")), // Default role
                    userRequest.getIdToken()
            );
            String email = oidcUser.getEmail();
            CustomerDto customerDto = customerService.findByCUserName(email);
            if(customerDto == null && email.endsWith("@fpt.edu.vn")) {
                Customer newCustomer = getCustomer(email, oidcUser);
                customerService.createAccount(newCustomer);
            }
            UserDetails userDetails = customerDetailsService.loadUserByUsername(email);
            Set<GrantedAuthority> authorities = new HashSet<>(userDetails.getAuthorities());
            return new CustomOidcUser(oidcUser, authorities);
        };
    }

    private Customer getCustomer(String email, OidcUser oidcUser) {
        Customer newCustomer = new Customer();
        newCustomer.setCUserName(email);
        newCustomer.setGivenName(oidcUser.getGivenName());
        newCustomer.setFamilyName(oidcUser.getFamilyName());
        newCustomer.setNickname("FUSwapper");
        newCustomer.setAvatar(oidcUser.getPicture());
        newCustomer.setPoints(0f);
        newCustomer.setPhone("");
        newCustomer.setGender("Nam");
        newCustomer.setDOB(Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()));
        newCustomer.setAddress("");
        return newCustomer;
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(managerDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationSuccessHandler CustomerAuthenticationSuccessHandler() {
        return (request, response, authentication) -> {
            OidcUser user = (OidcUser)authentication.getPrincipal();
            CustomerDto customerDto = customerService.findByCUserName(user.getEmail());
            request.getSession().setAttribute("profile", customerDto);
            response.sendRedirect(CUSTOMER_HOMEPAGE_AUTHORIZED);
        };
    }

    @Bean
    public AuthenticationSuccessHandler ManagerAuthenticationSuccessHandler() {
        return (request, response, authentication) -> {
            UserDetails userDetails = (UserDetails)authentication.getPrincipal();
            Manager manager = managerService.findByMUserName(userDetails.getUsername());
            ManagerDto managerDto = new ManagerDto(
                    manager.getMUserName(),
                    manager.getFullName(),
                    manager.getNickname(),
                    manager.getAvatar(),
                    manager.getPhone(),
                    manager.getDOB(),
                    manager.getGender()
            );
            request.getSession().setAttribute("profile", managerDto);
            response.setContentType("application/json;charset=UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);
            PrintWriter writer = response.getWriter();
            writer.write("{\"status\":\"Login successful\"}");
            writer.flush();
        };
    }

    @Bean
    public AuthenticationFailureHandler ManagerAuthenticationFailureHandler() {
        return (request, response, authentication) -> {
            response.setContentType("application/json;charset=UTF-8");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            PrintWriter writer = response.getWriter();
            writer.write("{\"status\":\"Wrong username or password\"}");
            writer.flush();
        };
    }
}
