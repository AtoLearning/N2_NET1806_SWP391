package com.fuswap.services.post;

import com.fuswap.dtos.response.CustomerRes;
import com.fuswap.dtos.request.GoodsPostReq;
import com.fuswap.dtos.response.GoodsPostRes;
import com.fuswap.entities.location.City;
import com.fuswap.entities.location.District;
import com.fuswap.entities.location.PostAddress;
import com.fuswap.entities.location.Ward;
import com.fuswap.entities.post.Category;
import com.fuswap.entities.post.GoodsPost;
import com.fuswap.entities.user.Customer;
import com.fuswap.entities.user.Manager;
import com.fuswap.repositories.location.CityRepository;
import com.fuswap.repositories.location.DistrictRepository;
import com.fuswap.repositories.location.PostAddressRepository;
import com.fuswap.repositories.location.WardRepository;
import com.fuswap.repositories.post.CategoryRepository;
import com.fuswap.repositories.user.CustomerRepository;
import com.fuswap.repositories.post.GoodsPostRepository;
import com.fuswap.repositories.user.ManagerRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

@Service
@Slf4j
public class GoodsPostService {

    private final GoodsPostRepository goodsPostRepository;
    private final ManagerRepository managerRepository;
    private final CustomerRepository customerRepository;
    private final CategoryRepository categoryRepository;
    private final PostAddressRepository postAddressRepository;
    private final WardRepository wardRepository;
    private final DistrictRepository districtRepository;
    private final CityRepository cityRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    public GoodsPostService(GoodsPostRepository goodsPostRepository,
                            ManagerRepository managerRepository,
                            CustomerRepository customerRepository,
                            CategoryRepository categoryRepository,
                            PostAddressRepository postAddressRepository,
                            WardRepository wardRepository,
                            DistrictRepository districtRepository,
                            CityRepository cityRepository,
                            RedisTemplate<String, Object> redisTemplate) {
        this.goodsPostRepository = goodsPostRepository;
        this.managerRepository = managerRepository;
        this.customerRepository = customerRepository;
        this.categoryRepository = categoryRepository;
        this.postAddressRepository = postAddressRepository;
        this.wardRepository = wardRepository;
        this.districtRepository = districtRepository;
        this.cityRepository = cityRepository;
        this.redisTemplate = redisTemplate;
    }

    public Page<GoodsPostRes> getAllPosts(Integer pageNo) {
        log.info("pageNo {}", pageNo.toString());
        Pageable pageable = PageRequest.of(pageNo - 1, 12);
        Page<GoodsPost> goodsPostPage = goodsPostRepository.findAllAndIsAvailable(pageable);
        return getGoodsPostRes(goodsPostPage);
    }

    public Page<GoodsPostRes> getPostByKeyword(Integer pageNo, String searchValue) {
        Pageable pageable = PageRequest.of(pageNo - 1, 12);
        Page<GoodsPost> goodsPostPage = goodsPostRepository.findAllAndIsAvailableAndByKeyword(pageable, searchValue);
        return getGoodsPostRes(goodsPostPage);
    }

    private Page<GoodsPostRes> getGoodsPostRes(Page<GoodsPost> goodsPostPage) {
        return goodsPostPage.map(goodsPost -> new GoodsPostRes(
                goodsPost.getPostID(),
                goodsPost.getTitle(),
                goodsPost.getContent(),
                goodsPost.getIsExchange(),
                goodsPost.getUnitPrice(),
                goodsPost.getCreateAt(),
                goodsPost.getPostImage(),
                new CustomerRes(
                        goodsPost.getCustomer().getCUserName(),
                        goodsPost.getCustomer().getGivenName(),
                        goodsPost.getCustomer().getFamilyName(),
                        goodsPost.getCustomer().getNickname(),
                        goodsPost.getCustomer().getAvatar(),
                        goodsPost.getCustomer().getPoints(),
                        goodsPost.getCustomer().getPhone(),
                        goodsPost.getCustomer().getDOB(),
                        goodsPost.getCustomer().getAddress(),
                        goodsPost.getCustomer().getIsVerified()
                ),
                goodsPost.getPostAddress().getStreetNumber(),
                goodsPost.getPostAddress().getStreet(),
                goodsPost.getPostAddress().getWard().getWardName(),
                goodsPost.getPostAddress().getDistrict().getDistrictName(),
                goodsPost.getPostAddress().getCity().getCityName(),
                goodsPost.getCategory().getCateName()
        ));
    }

    public boolean createGoodsPost(GoodsPostReq goodsPostReq, String sessionId) {
        GoodsPost goodsPost = new GoodsPost();
        try {
            goodsPost.setSpecialPostID(geneSpecPostId());
            goodsPost.setTitle(goodsPostReq.getTitle());
            goodsPost.setContent(goodsPostReq.getContent());
            goodsPost.setIsExchange(goodsPostReq.getIsExchange());
            goodsPost.setIsAvailable(false);
            goodsPost.setPostImage(goodsPostReq.getPostImage());
            goodsPost.setUnitPrice(goodsPostReq.getUnitPrice());
            goodsPost.setCreateAt(Date.valueOf(LocalDate.now()));

            Customer customer = getCustomerByCUserName(sessionId);
            goodsPost.setCustomer(customer);

            Manager manager = managerRepository.findByMUserName("admin");
            goodsPost.setManager(manager);

            PostAddress postAddress = new PostAddress();
            postAddress.setStreetNumber(goodsPostReq.getStreetNumber());
            postAddress.setStreet(goodsPostReq.getStreet());
            Optional<Ward> wardOptional = wardRepository.findById(goodsPostReq.getWard().getWardID());
            if(wardOptional.isEmpty()) return false;
            Ward ward = wardOptional.get();
            postAddress.setWard(ward);
            Optional<District> districtOptional = districtRepository.findById(goodsPostReq.getDistrict().getDistrictID());
            if(districtOptional.isEmpty()) return false;
            District district = districtOptional.get();
            postAddress.setDistrict(district);
            Optional<City> cityOptional = cityRepository.findById(goodsPostReq.getCity().getCityID());
            if(cityOptional.isEmpty()) return false;
            City city = cityOptional.get();
            postAddress.setCity(city);
            postAddressRepository.save(postAddress);
            goodsPost.setPostAddress(postAddress);

            Optional<Category> categoryOptional = categoryRepository.findById(goodsPostReq.getCategoryReq().getCateId());
            if (categoryOptional.isEmpty()) return false;
            Category category = categoryOptional.get();
            goodsPost.setCategory(category);

            goodsPostRepository.save(goodsPost);
            return true;
        } catch(Exception ex) {
            log.info("LOG ERROR {}", ex.getMessage());
            return false;
        }
    }

    private Customer getCustomerByCUserName(String sessionId) {
        sessionId = new String(Base64.getDecoder().decode(sessionId));
        Boolean exists = redisTemplate.hasKey("spring:session:sessions:" + sessionId);
        if(Boolean.TRUE.equals(exists)) {
            Map<Object, Object> sessionAttributes = redisTemplate
                    .opsForHash()
                    .entries("spring:session:sessions:" + sessionId);
            CustomerRes customerRes = (CustomerRes)sessionAttributes.get("sessionAttr:profile");
            if(customerRes != null) {
                return customerRepository.findByCUserName(customerRes.getCUserName());
            }
        }
        return null;
    }

    private String geneSpecPostId() {
        String specialPostID;
        while(true) {
            specialPostID = RandomStringUtils.randomAlphanumeric(5);
            GoodsPost goodsPostOptional = goodsPostRepository.findBySpecialPostID(specialPostID);
            if(goodsPostOptional == null) return specialPostID;
        }
    }

    @Transactional(readOnly = true)
    public boolean updateGoodsPost(long postId, GoodsPostReq goodsPostReq, String username) {
        Optional<GoodsPost> goodsPost = goodsPostRepository.findById(postId);
        if(goodsPost.isPresent()) {
            if(goodsPost.get().getTransaction() == null && goodsPost.get().getCustomer().getCUserName().equals(username)) {
                goodsPost.get().setTitle(goodsPostReq.getTitle());
                goodsPost.get().setContent(goodsPostReq.getContent());
                goodsPost.get().setPostImage(goodsPostReq.getPostImage());
                if(!goodsPost.get().getIsExchange()) {
                    goodsPost.get().setUnitPrice(goodsPostReq.getUnitPrice());
                }
                Optional<Ward> wardOptional = wardRepository.findById(goodsPostReq.getWard().getWardID());
                Optional<District> districtOptional = districtRepository.findById(goodsPostReq.getDistrict().getDistrictID());
                Optional<City> cityOptional = cityRepository.findById(goodsPostReq.getCity().getCityID());
                goodsPost.get().getPostAddress().setStreetNumber(goodsPostReq.getStreetNumber());
                goodsPost.get().getPostAddress().setStreet(goodsPostReq.getStreet());
                if(wardOptional.isEmpty()) return false;
                goodsPost.get().getPostAddress().setWard(wardOptional.get());
                if(districtOptional.isEmpty()) return false;
                goodsPost.get().getPostAddress().setDistrict(districtOptional.get());
                if(cityOptional.isEmpty()) return false;
                goodsPost.get().getPostAddress().setCity(cityOptional.get());

                Optional<Category> categoryOptional = categoryRepository.findById(goodsPostReq.getCategoryReq().getCateId());
                if(categoryOptional.isEmpty()) return false;
                goodsPost.get().setCategory(categoryOptional.get());
                goodsPostRepository.saveAndFlush(goodsPost.get());
                return true;
            }
        }
        return false;
    }
}
