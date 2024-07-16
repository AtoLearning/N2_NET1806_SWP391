package com.fuswap.services.user;

import com.fuswap.dtos.user.CustomerDto;
import com.fuswap.dtos.user.CustomerViewDto;
import com.fuswap.dtos.user.SupplierDto;
import com.fuswap.entities.user.Role;
import com.fuswap.repositories.user.CustomerRepository;
import com.fuswap.repositories.user.ManagerRepository;
import com.fuswap.repositories.user.RoleRepository;
import com.fuswap.services.post.FeedbackService;
import com.fuswap.services.post.GoodsPostService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.fuswap.entities.user.Customer;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;

@Service
@Slf4j
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final ManagerRepository managerRepository;
    private final RoleRepository roleRepository;
    private final FeedbackService feedbackService;
    private final GoodsPostService goodsPostService;

    public CustomerService(
            CustomerRepository customerRepository,
            ManagerRepository managerRepository,
            RoleRepository roleRepository, FeedbackService feedbackService, GoodsPostService goodsPostService) {
        this.customerRepository = customerRepository;
        this.managerRepository = managerRepository;
        this.roleRepository = roleRepository;
        this.feedbackService = feedbackService;
        this.goodsPostService = goodsPostService;
    }

    @Transactional(readOnly = true)
    public CustomerDto findByCUserName(String cUserName) {
        Customer customer = customerRepository.findByCUserName(cUserName);
        if(customer != null) {
            return new CustomerDto(
                customer.getCUserName(),
                customer.getGivenName(),
                customer.getFamilyName(),
                customer.getNickname(),
                customer.getAvatar(),
                customer.getPoints(),
                customer.getPhone(),
                customer.getDOB(),
                customer.getGender(),
                customer.getAddress(),
                customer.getIsVerified()
            );
        }
        return null;
    }

    public Customer getByCUserName(String cUserName) {
        return customerRepository.findByCUserName(cUserName);
    }

    public boolean createAccount(Customer newCustomer) {
        Optional<Role> role = roleRepository.findById(3);
        Role r = new Role();
        if(role.isPresent()) {
            r.setRoleID(role.get().getRoleID());
            r.setRoleName(role.get().getRoleName());
        }
        Customer customer = new Customer(
                newCustomer.getCUserName(),
                newCustomer.getGivenName(),
                newCustomer.getFamilyName(),
                newCustomer.getNickname(),
                newCustomer.getAvatar(),
                newCustomer.getPoints(),
                newCustomer.getPhone(),
                newCustomer.getDOB(),
                newCustomer.getAddress(),
                newCustomer.getGender(),
                true,
                false,
                managerRepository.findByMUserName("admin"),
                r,
                new HashSet<>(),
                new HashSet<>(),
                new HashSet<>(),
                new HashSet<>(),
                new HashSet<>()
        );
        customerRepository.save(customer);
        return true;
    }

    public boolean isFullInformation(String cUserName) {
        Customer customer = customerRepository.findByCUserName(cUserName);
        if(customer != null) {
            if(customer.getGivenName() == null || customer.getGivenName().isBlank()) return false;
            if(customer.getFamilyName() == null || customer.getFamilyName().isBlank()) return false;
            if(customer.getNickname() == null || customer.getNickname().isBlank()) return false;
            if(customer.getAvatar() == null || customer.getAvatar().isBlank()) return false;
            if(customer.getPhone() == null || customer.getPhone().isBlank()) return false;
            if(customer.getDOB() == null) return false;
            return true;
        }
        return false;
    }

    public boolean updateCustomerProfile(
            CustomerDto customerDto,
            HttpServletRequest request) {
        Customer customer = customerRepository.findByCUserName(customerDto.getCUserName());
        if(customer != null) {
            if(!customerDto.getGivenName().isBlank()) customer.setGivenName(customerDto.getGivenName());
            if(!customerDto.getNickname().isBlank()) customer.setNickname(customerDto.getNickname());
            if(!customerDto.getGender().isBlank()) customer.setGender(customerDto.getGender());
            if(!customerDto.getAvatar().isBlank()) customer.setAvatar(customerDto.getAvatar());
            if(customerDto.getDob() != null) customer.setDOB(customerDto.getDob());
            if(!customerDto.getPhone().isBlank()) customer.setPhone(customerDto.getPhone());
            customerRepository.save(customer);
            request.getSession().setAttribute("profile", findByCUserName(customer.getCUserName()));
            return true;
        }
        return false;
    }

    public Customer save(Customer customer) {
        return customerRepository.save(customer);
    }

    public SupplierDto getSupplierProfile(int pageNo, String cuserName) {
        Customer customer = getByCUserName(cuserName);
        if(customer != null) {
            SupplierDto supplierDto = new SupplierDto();
            supplierDto.setCustomerViewDto(new CustomerViewDto(
                customer.getCUserName(),
                customer.getGivenName(),
                customer.getFamilyName(),
                customer.getNickname(),
                customer.getAvatar(),
                customer.getPoints(),
                customer.getPhone(),
                customer.getDOB(),
                customer.getAddress(),
                customer.getGender(),
                customer.getIsVerified(),
                feedbackService.getFeedbackBySupplier(cuserName)
            ));
            supplierDto.setGoodsPostViewDtoPage(goodsPostService.getSupplierPostList(pageNo, cuserName));
            return supplierDto;
        }
        return null;
    }
}
