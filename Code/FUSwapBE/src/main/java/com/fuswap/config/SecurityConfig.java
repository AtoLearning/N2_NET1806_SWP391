package com.fuswap.config;

import com.fuswap.dtos.response.CustomerRes;
import com.fuswap.services.user.CustomerService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.util.Date;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final CustomerService customerService;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CorsConfig corsConfig;

    private final String[] PUBLIC_ENDPOINT = {
            "/api/v1/oauth2/**",
            "/api/v1/guest/**"
    };
    private final String LOGIN_PAGE = "http://localhost:3000/login";
    private final String FAILURE_LOGIN_PAGE = "http://localhost:3000/login?error=true";
    private final String HOMEPAGE_AFTER_EXPIRE = "http://localhost:3000";
    private final String HOMEPAGE_AUTHORIZED = "http://localhost:3000/customer_profile";

    public SecurityConfig(CustomerService customerService,
                          CustomAuthenticationEntryPoint customAuthenticationEntryPoint,
                          CorsConfig corsConfig) {
        this.customerService = customerService;
        this.customAuthenticationEntryPoint = customAuthenticationEntryPoint;
        this.corsConfig = corsConfig;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity.cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer
                .configurationSource(corsConfig.corsConfigurationSource()));
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        httpSecurity.authorizeHttpRequests(request -> request
                .requestMatchers(PUBLIC_ENDPOINT).permitAll()
                .anyRequest().authenticated());
        httpSecurity.exceptionHandling(exceptionHandling -> exceptionHandling
                .authenticationEntryPoint(customAuthenticationEntryPoint));
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
        return (request, response, authentication) -> {

            OidcUser user = (OidcUser)authentication.getPrincipal();
            CustomerRes customerRes = customerService.findByCUserName(user.getEmail());
            if(customerRes == null) {
                customerRes = new CustomerRes(
                        user.getEmail(),
                        user.getGivenName() == null ? "" : user.getGivenName(),
                        user.getFamilyName() == null ? "" : user.getFamilyName(),
                        user.getNickName() == null ? "" : user.getNickName(),
                        user.getPicture() == null ? "" : user.getPicture(),
                        0f,
                        "",
                        new Date(),
                        "",
                        false
                );
                if(customerService.createAccount(customerRes)) {
                    request.getSession().setAttribute("profile", customerRes);
                    response.sendRedirect(HOMEPAGE_AUTHORIZED);
                } else {
                    response.sendRedirect(FAILURE_LOGIN_PAGE);
                }
            } else {
                request.getSession().setAttribute("profile", customerRes);
                response.sendRedirect(HOMEPAGE_AUTHORIZED);
            }
        };
    }

}
