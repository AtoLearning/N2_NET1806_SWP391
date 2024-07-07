    package com.fuswap.config;

    import com.fuswap.dtos.response.CustomerRes;
    import com.fuswap.entities.user.CustomOidcUser;
    import com.fuswap.services.user.CustomerDetailsService;
    import com.fuswap.services.user.CustomerService;
    import com.fuswap.services.user.ManagerDetailsService;
    import jakarta.servlet.http.HttpServletResponse;
    import lombok.extern.slf4j.Slf4j;
    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.http.HttpMethod;
    import org.springframework.security.authentication.AuthenticationManager;
    import org.springframework.security.authentication.AuthenticationProvider;
    import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
    import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
    import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
    import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
    import org.springframework.security.config.http.SessionCreationPolicy;
    import org.springframework.security.core.GrantedAuthority;
    import org.springframework.security.core.authority.SimpleGrantedAuthority;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.security.core.userdetails.UserDetailsService;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
    import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
    import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
    import org.springframework.security.oauth2.core.oidc.user.OidcUser;
    import org.springframework.security.web.SecurityFilterChain;
    import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

    import java.io.PrintWriter;
    import java.util.*;
    import java.util.stream.Collectors;

    @Slf4j
    @Configuration
    @EnableWebSecurity
    public class SecurityConfig {
        private final CustomerService customerService;
        private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
        private final CustomAccessDeniedHandler customAccessDeniedHandler;
        private final CorsConfig corsConfig;
        private final ManagerDetailsService managerDetailsService;
        private final CustomerDetailsService customerDetailsService;

        private final String[] PUBLIC_ENDPOINT = {
                "/api/v1/oauth2/**",
                "/api/v1/guest/**"
        };
        private final String FAILURE_CUSTOMER_LOGIN_PAGE = "http://localhost:3000/c/login?error=true";
        private final String FAILURE_MANAGER_LOGIN_PAGE = "http://localhost:3000/m/login?error=true";
        private final String HOMEPAGE_AFTER_EXPIRE = "http://localhost:3000/";
        private final String CUSTOMER_HOMEPAGE_AUTHORIZED = "http://localhost:3000/c/home";
        private final String MANAGER_HOMEPAGE_AUTHORIZED = "http://localhost:3000/home";

        public SecurityConfig(CustomerService customerService,
                              CustomAuthenticationEntryPoint customAuthenticationEntryPoint, CustomAccessDeniedHandler customAccessDeniedHandler,
                              CorsConfig corsConfig, ManagerDetailsService managerDetailsService, CustomerDetailsService customerDetailsService) {
            this.customerService = customerService;
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
    //                .requestMatchers(PUBLIC_ENDPOINT).permitAll()
                    .requestMatchers(HttpMethod.POST, "/api/v1/perform_login").permitAll()
                    .requestMatchers("/api/v1/guest/posts").hasRole("CUSTOMER")
                    .anyRequest().authenticated());
            httpSecurity.exceptionHandling(exceptionHandling -> exceptionHandling
                    .accessDeniedHandler(customAccessDeniedHandler)
                    .authenticationEntryPoint(customAuthenticationEntryPoint));
            httpSecurity.formLogin(login -> login
                    .loginProcessingUrl("/api/v1/perform_login")
                    .usernameParameter("username")
                    .passwordParameter("password")
                    .successHandler(ManagerAuthenticationSuccessHandler())
                    .failureUrl(FAILURE_MANAGER_LOGIN_PAGE)
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
                // Tạo đối tượng OidcUser từ IdToken và UserInfo
                OidcUser oidcUser = new DefaultOidcUser(
                        Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")), // Default role
                        userRequest.getIdToken()
                );

                // Lấy email từ OidcUser
                String email = oidcUser.getEmail();

                // Lấy thông tin người dùng từ cơ sở dữ liệu
                UserDetails userDetails = customerDetailsService.loadUserByUsername(email);

                // Gán vai trò từ cơ sở dữ liệu
                Set<GrantedAuthority> authorities = new HashSet<>(userDetails.getAuthorities());

                // Trả về CustomOidcUser với thông tin và vai trò từ cơ sở dữ liệu
                return new CustomOidcUser(oidcUser, authorities);
            };
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
                        response.sendRedirect(CUSTOMER_HOMEPAGE_AUTHORIZED);
                    } else {
                        response.sendRedirect(FAILURE_CUSTOMER_LOGIN_PAGE);
                    }
                } else {
                    request.getSession().setAttribute("profile", customerRes);
                    response.sendRedirect(CUSTOMER_HOMEPAGE_AUTHORIZED);
                }
            };
        }

        @Bean
        public AuthenticationSuccessHandler ManagerAuthenticationSuccessHandler() {
            return (request, response, authentication) -> {
                log.info("AuthenticationSuccessHandler invoked");
                UserDetails manager = (UserDetails)authentication.getPrincipal();
                log.info("MUserName: {}", manager.getUsername());
                log.info("Password: {}", manager.getPassword());
                log.info("Role: {}", manager.getAuthorities());
                request.getSession().setAttribute("profile", manager);
                response.setContentType("application/json;charset=UTF-8");
                response.setStatus(HttpServletResponse.SC_OK);
                PrintWriter writer = response.getWriter();
                writer.write("{\"status\":\"success\"}");
                writer.flush();
            };
        }

    }
