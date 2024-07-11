package com.fuswap.services.post;

import com.fuswap.dtos.location.CityDto;
import com.fuswap.dtos.location.DistrictDto;
import com.fuswap.dtos.location.WardDto;
import com.fuswap.dtos.post.CategoryDto;
import com.fuswap.dtos.post.FeedbackDto;
import com.fuswap.dtos.user.CustomerDto;
import com.fuswap.dtos.post.GoodsPostManageDto;
import com.fuswap.dtos.post.GoodsPostViewDto;
import com.fuswap.dtos.user.CustomerViewDto;
import com.fuswap.entities.location.City;
import com.fuswap.entities.location.District;
import com.fuswap.entities.location.PostAddress;
import com.fuswap.entities.location.Ward;
import com.fuswap.entities.post.Category;
import com.fuswap.entities.post.Feedback;
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
    private final FeedbackService feedbackService;
    private final RedisTemplate<String, Object> redisTemplate;

    public GoodsPostService(GoodsPostRepository goodsPostRepository,
                            ManagerRepository managerRepository,
                            CustomerRepository customerRepository,
                            CategoryRepository categoryRepository,
                            PostAddressRepository postAddressRepository,
                            WardRepository wardRepository,
                            DistrictRepository districtRepository,
                            CityRepository cityRepository, FeedbackService feedbackService,
                            RedisTemplate<String, Object> redisTemplate) {
        this.goodsPostRepository = goodsPostRepository;
        this.managerRepository = managerRepository;
        this.customerRepository = customerRepository;
        this.categoryRepository = categoryRepository;
        this.postAddressRepository = postAddressRepository;
        this.wardRepository = wardRepository;
        this.districtRepository = districtRepository;
        this.cityRepository = cityRepository;
        this.feedbackService = feedbackService;
        this.redisTemplate = redisTemplate;
    }

    public Page<GoodsPostViewDto> getPostList(Integer pageNo) {
        log.info("pageNo {}", pageNo.toString());
        Pageable pageable = PageRequest.of(pageNo - 1, 12);
        Page<GoodsPost> goodsPostPage = goodsPostRepository.findAllAndIsAvailable(pageable);
        return getGoodsPostViewDto(goodsPostPage);
    }

    public Page<GoodsPostViewDto> getPostListByKeyword(Integer pageNo, String searchValue) {
        Pageable pageable = PageRequest.of(pageNo - 1, 12);
        Page<GoodsPost> goodsPostPage = goodsPostRepository.findAllAndIsAvailableAndByKeyword(pageable, searchValue);
        return getGoodsPostViewDto(goodsPostPage);
    }

    private Page<GoodsPostViewDto> getGoodsPostViewDto(Page<GoodsPost> goodsPostPage) {
        return goodsPostPage.map(goodsPost -> new GoodsPostViewDto(
                goodsPost.getPostID(),
                goodsPost.getTitle(),
                goodsPost.getContent(),
                goodsPost.getIsExchange(),
                goodsPost.getUnitPrice(),
                goodsPost.getCreateAt(),
                goodsPost.getPostImage(),
                new CustomerViewDto(
                        goodsPost.getCustomer().getCUserName(),
                        goodsPost.getCustomer().getGivenName(),
                        goodsPost.getCustomer().getFamilyName(),
                        goodsPost.getCustomer().getNickname(),
                        goodsPost.getCustomer().getAvatar(),
                        goodsPost.getCustomer().getPoints(),
                        goodsPost.getCustomer().getPhone(),
                        goodsPost.getCustomer().getDOB(),
                        goodsPost.getCustomer().getAddress(),
                        goodsPost.getCustomer().getIsVerified(),
                        feedbackService.getFeedbackBySupplier(goodsPost.getCustomer().getCUserName())
                ),
                goodsPost.getPostAddress().getStreetNumber(),
                goodsPost.getPostAddress().getStreet(),
                goodsPost.getPostAddress().getWard().getWardName(),
                goodsPost.getPostAddress().getDistrict().getDistrictName(),
                goodsPost.getPostAddress().getCity().getCityName(),
                goodsPost.getCategory().getCateName()
        ));
    }

    private Page<GoodsPostManageDto> getGoodsPostManageDto(Page<GoodsPost> goodsPostPage) {
        return goodsPostPage.map(goodsPost -> new GoodsPostManageDto(
                goodsPost.getPostID(),
                goodsPost.getSpecialPostID(),
                goodsPost.getTitle(),
                goodsPost.getContent(),
                goodsPost.getIsExchange(),
                goodsPost.getUnitPrice(),
                goodsPost.getCreateAt(),
                goodsPost.getPostImage(),
                goodsPost.getPostAddress().getStreetNumber(),
                goodsPost.getPostAddress().getStreet(),
                new WardDto(
                        goodsPost.getPostAddress().getWard().getWardID(),
                        goodsPost.getPostAddress().getWard().getWardName()
                ),
                new DistrictDto(
                        goodsPost.getPostAddress().getDistrict().getDistrictID(),
                        goodsPost.getPostAddress().getDistrict().getDistrictName()
                ),
                new CityDto(
                        goodsPost.getPostAddress().getCity().getCityID(),
                        goodsPost.getPostAddress().getCity().getCityName()
                ),
                new CategoryDto(
                        goodsPost.getCategory().getCateID(),
                        goodsPost.getCategory().getCateName(),
                        goodsPost.getCategory().getCateImage()
                ),
                goodsPost.getCustomer().getFamilyName() +
                        goodsPost.getCustomer().getGivenName()
        ));
    }

    public boolean createGoodsPost(GoodsPostManageDto goodsPostManageDto, String cUserName) {
        GoodsPost goodsPost = new GoodsPost();
        try {
            goodsPost.setSpecialPostID(geneSpecPostId());
            goodsPost.setTitle(goodsPostManageDto.getTitle());
            goodsPost.setContent(goodsPostManageDto.getPostContent());
            goodsPost.setIsExchange(goodsPostManageDto.getIsExchange());
            goodsPost.setIsAvailable(false);
            goodsPost.setPostImage(goodsPostManageDto.getPostImage());
            goodsPost.setUnitPrice(goodsPostManageDto.getUnitPrice());
            goodsPost.setCreateAt(Date.valueOf(LocalDate.now()));

            Customer customer = customerRepository.findByCUserName(cUserName);
            goodsPost.setCustomer(customer);

            Manager manager = managerRepository.findByMUserName("admin");
            goodsPost.setManager(manager);

            PostAddress postAddress = new PostAddress();
            postAddress.setStreetNumber(goodsPostManageDto.getStreetNumber());
            postAddress.setStreet(goodsPostManageDto.getStreet());
            Optional<Ward> wardOptional = wardRepository.findById(goodsPostManageDto.getWardDto().getWardId());
            if(wardOptional.isEmpty()) return false;
            Ward ward = wardOptional.get();
            postAddress.setWard(ward);
            Optional<District> districtOptional = districtRepository.findById(goodsPostManageDto.getDistrictDto().getDistrictId());
            if(districtOptional.isEmpty()) return false;
            District district = districtOptional.get();
            postAddress.setDistrict(district);
            Optional<City> cityOptional = cityRepository.findById(goodsPostManageDto.getCityDto().getCityId());
            if(cityOptional.isEmpty()) return false;
            City city = cityOptional.get();
            postAddress.setCity(city);
            postAddressRepository.save(postAddress);
            goodsPost.setPostAddress(postAddress);

            Optional<Category> categoryOptional = categoryRepository.findById(goodsPostManageDto.getCategoryDto().getCateId());
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
            CustomerDto customerDto = (CustomerDto)sessionAttributes.get("sessionAttr:profile");
            if(customerDto != null) {
                return customerRepository.findByCUserName(customerDto.getCUserName());
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
    public boolean updateGoodsPost(Long postId, GoodsPostManageDto goodsPostManageDto, String username) {
        Optional<GoodsPost> goodsPost = goodsPostRepository.findById(postId);
        if(goodsPost.isPresent()) {
            if(goodsPost.get().getTransaction() == null && goodsPost.get().getCustomer().getCUserName().equals(username)) {
                goodsPost.get().setTitle(goodsPostManageDto.getTitle());
                goodsPost.get().setContent(goodsPostManageDto.getPostContent());
                goodsPost.get().setPostImage(goodsPostManageDto.getPostImage());
                if(!goodsPost.get().getIsExchange()) {
                    goodsPost.get().setUnitPrice(goodsPostManageDto.getUnitPrice());
                }
                Optional<Ward> wardOptional = wardRepository.findById(goodsPostManageDto.getWardDto().getWardId());
                Optional<District> districtOptional = districtRepository.findById(goodsPostManageDto.getDistrictDto().getDistrictId());
                Optional<City> cityOptional = cityRepository.findById(goodsPostManageDto.getCityDto().getCityId());
                goodsPost.get().getPostAddress().setStreetNumber(goodsPostManageDto.getStreetNumber());
                goodsPost.get().getPostAddress().setStreet(goodsPostManageDto.getStreet());
                if(wardOptional.isEmpty()) return false;
                goodsPost.get().getPostAddress().setWard(wardOptional.get());
                if(districtOptional.isEmpty()) return false;
                goodsPost.get().getPostAddress().setDistrict(districtOptional.get());
                if(cityOptional.isEmpty()) return false;
                goodsPost.get().getPostAddress().setCity(cityOptional.get());

                Optional<Category> categoryOptional = categoryRepository.findById(goodsPostManageDto.getCategoryDto().getCateId());
                if(categoryOptional.isEmpty()) return false;
                goodsPost.get().setCategory(categoryOptional.get());
                goodsPostRepository.saveAndFlush(goodsPost.get());
                return true;
            }
        }
        return false;
    }

    public GoodsPostViewDto getPostDetails(Long postId) {
        GoodsPost goodsPost = goodsPostRepository.findByPostID(postId);
        if(goodsPost != null) {
            GoodsPostViewDto goodsPostViewDto = new GoodsPostViewDto();
            goodsPostViewDto.setPostId(goodsPost.getPostID());
            goodsPostViewDto.setTitle(goodsPost.getTitle());
            goodsPostViewDto.setContent(goodsPost.getContent());
            goodsPostViewDto.setIsExchange(goodsPost.getIsExchange());
            goodsPostViewDto.setUnitPrice(goodsPost.getUnitPrice());
            goodsPostViewDto.setCreateAt(goodsPost.getCreateAt());
            goodsPostViewDto.setPostImage(goodsPost.getPostImage());
            goodsPostViewDto.setCustomerViewDto( new CustomerViewDto(
                    goodsPost.getCustomer().getCUserName(),
                    goodsPost.getCustomer().getGivenName(),
                    goodsPost.getCustomer().getFamilyName(),
                    goodsPost.getCustomer().getNickname(),
                    goodsPost.getCustomer().getAvatar(),
                    goodsPost.getCustomer().getPoints(),
                    goodsPost.getCustomer().getPhone(),
                    goodsPost.getCustomer().getDOB(),
                    goodsPost.getCustomer().getAddress(),
                    goodsPost.getCustomer().getIsVerified(),
                    feedbackService.getFeedbackBySupplier(goodsPost.getCustomer().getCUserName())
            ));
            goodsPostViewDto.setStreetNumber(goodsPost.getPostAddress().getStreetNumber());
            goodsPostViewDto.setStreet(goodsPost.getPostAddress().getStreet());
            goodsPostViewDto.setWardName(goodsPost.getPostAddress().getWard().getWardName());
            goodsPostViewDto.setDistrictName(goodsPost.getPostAddress().getDistrict().getDistrictName());
            goodsPostViewDto.setCityName(goodsPost.getPostAddress().getCity().getCityName());
            goodsPostViewDto.setCateName(goodsPost.getCategory().getCateName());
            return goodsPostViewDto;
        }
        return null;
    }

    public GoodsPostManageDto getMyPostDetails(Long postId, String username) {
        GoodsPost goodsPost = goodsPostRepository.findByPostID(postId);
        if (goodsPost != null && goodsPost.getCustomer().getCUserName().equals(username)) {
            GoodsPostManageDto goodsPostManageDto = new GoodsPostManageDto();
            goodsPostManageDto.setTitle(goodsPost.getTitle());
            goodsPostManageDto.setPostContent(goodsPost.getContent());
            goodsPostManageDto.setIsExchange(goodsPost.getIsExchange());
            goodsPostManageDto.setUnitPrice(goodsPost.getUnitPrice());
            goodsPostManageDto.setPostImage(goodsPost.getPostImage());
            goodsPostManageDto.setStreetNumber(goodsPost.getPostAddress().getStreetNumber());
            goodsPostManageDto.setStreet(goodsPost.getPostAddress().getStreet());
            goodsPostManageDto.setWardDto(new WardDto(
                    goodsPost.getPostAddress().getWard().getWardID(),
                    goodsPost.getPostAddress().getWard().getWardName()
            ));
            goodsPostManageDto.setDistrictDto(new DistrictDto(
                    goodsPost.getPostAddress().getDistrict().getDistrictID(),
                    goodsPost.getPostAddress().getDistrict().getDistrictName()
            ));
            goodsPostManageDto.setCityDto(new CityDto(
                    goodsPost.getPostAddress().getCity().getCityID(),
                    goodsPost.getPostAddress().getCity().getCityName()
            ));
            goodsPostManageDto.setCategoryDto(new CategoryDto(
                    goodsPost.getCategory().getCateID(),
                    goodsPost.getCategory().getCateName(),
                    goodsPost.getCategory().getCateImage()
            ));
            goodsPostManageDto.setMUserName(goodsPost.getManager().getFullName());
            return goodsPostManageDto;
        }
        return null;
    }

    public Page<GoodsPostManageDto> getMyPosts(int pageNo, String username) {
        Pageable pageable = PageRequest.of(pageNo - 1, 12);
        Page<GoodsPost> goodsPostPage = goodsPostRepository.findMyPosts(pageable, username);
        return getGoodsPostManageDto(goodsPostPage);
    }

    public boolean deleteGoodsPost(Long postId, String username) {
        GoodsPost goodsPost = goodsPostRepository.findByPostID(postId);
        if(goodsPost != null && goodsPost.getCustomer().getCUserName().equals(username)) {
            if(goodsPost.getTransaction() == null) {
                goodsPostRepository.delete(goodsPost);
                return true;
            }
        }
        return false;
    }
}
