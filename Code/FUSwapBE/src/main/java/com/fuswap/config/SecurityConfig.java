package com.fuswap.config;

import com.fuswap.dtos.CustomerDto;
import com.fuswap.services.CustomerService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.filter.RequestContextFilter;

import java.io.IOException;
import java.security.Principal;
import java.util.Date;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final CustomerService customerService;

    private final String[] PUBLIC_ENDPOINT = {
            "/api/v1/oauth2/**",
            "/api/v1/guest/**"
    };
    private final String LOGIN_PAGE = "http://localhost:3000/login";
    private final String FAILURE_LOGIN_PAGE = "http://localhost:3000/login?error=true";
    private final String HOMEPAGE_AFTER_EXPIRE = "http://localhost:3000";
    private final String HOMEPAGE_AUTHORIZED = "http://localhost:3000/customer_profile";

    public SecurityConfig(CustomerService customerService) {
        this.customerService = customerService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, RequestContextFilter requestContextFilter) throws Exception {

        httpSecurity.cors(AbstractHttpConfigurer::disable);
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        httpSecurity.authorizeHttpRequests(request -> request
                .requestMatchers(PUBLIC_ENDPOINT).permitAll()
                .anyRequest().authenticated());
        httpSecurity.oauth2Login(oauth2 -> oauth2
                .loginPage(LOGIN_PAGE)
                .successHandler(CustomerAuthenticationSuccessHandler())
                .failureUrl(FAILURE_LOGIN_PAGE));
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
    public AuthenticationSuccessHandler CustomerAuthenticationSuccessHandler() {
        return new AuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(
                    HttpServletRequest request,
                    HttpServletResponse response,
                    Authentication authentication) throws IOException, ServletException {

                OidcUser user = (OidcUser)authentication.getPrincipal();
                CustomerDto customer = customerService.findByCUserName(user.getEmail());
                if(customer == null) {
                    customer = new CustomerDto(
                            user.getEmail(),
                            user.getGivenName(),
                            user.getFamilyName(),
                            user.getNickName(),
                            user.getPicture(),
                            0f,
                            0f,
                            new Date(),
                            "",
                            false
                    );
                }
                request.getSession().setAttribute("profile", customer);
                response.sendRedirect(HOMEPAGE_AUTHORIZED);
            }
        };
    }

}
