package com.fuswap.config;

import com.fuswap.dtos.CustomerDto;
import com.fuswap.services.CustomerService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.filter.RequestContextFilter;

import java.io.IOException;
import java.util.Date;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomerService customerService;
    private final CorsConfigurationSource corsConfigurationSource;

    private final String[] PUBLIC_ENDPOINT = {
            "/api/v1/oauth2/**",
            "/api/v1/guest/**"
    };
    private final String LOGIN_PAGE = "http://localhost:3000/login";
    private final String FAILURE_LOGIN_PAGE = "http://localhost:3000/login?error=true";
    private final String HOMEPAGE_AFTER_EXPIRE = "http://localhost:3000";
    private final String HOMEPAGE_AUTHORIZED = "http://localhost:3000/customer";

    public SecurityConfig(CustomerService customerService, CorsConfigurationSource corsConfigurationSource) {
        this.customerService = customerService;
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity.cors(Customizer.withDefaults());
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
                    Authentication authentication) throws IOException {

                OidcUser user = (OidcUser)authentication.getPrincipal();
                CustomerDto customerDto = customerService.findByCUserName(user.getEmail());
                if(customerDto == null) {
                    customerDto = new CustomerDto(
                            user.getEmail(),
                            user.getGivenName() == null ? "" : user.getGivenName(),
                            user.getFamilyName() == null ? "" : user.getFamilyName(),
                            user.getNickName() == null ? "" : user.getNickName(),
                            user.getPicture() == null ? "" : user.getPicture(),
                            0f,
                            0f,
                            new Date(),
                            "",
                            false
                    );
                    customerService.createAccount(customerDto);
                }
                request.getSession().setAttribute("profile", customerDto);
                response.sendRedirect(HOMEPAGE_AUTHORIZED);
            }
        };
    }

}
