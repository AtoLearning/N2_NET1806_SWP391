package com.fuswap.services.post;

import com.fuswap.dtos.location.CityDto;
import com.fuswap.dtos.location.DistrictDto;
import com.fuswap.dtos.location.WardDto;
import com.fuswap.dtos.post.CategoryDto;
import com.fuswap.dtos.post.GoodsPostManageDto;
import com.fuswap.dtos.post.GoodsPostViewDto;
import com.fuswap.dtos.post.PostModerationDto;
import com.fuswap.dtos.user.CustomerViewDto;
import com.fuswap.entities.post.GoodsPost;
import com.fuswap.entities.user.Manager;
import com.fuswap.repositories.post.GoodsPostRepository;
import com.fuswap.services.user.ManagerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PostModerationService {
    private final GoodsPostRepository goodsPostRepository;
    private final ManagerService managerService;
    private final FeedbackService feedbackService;

    public PostModerationService(GoodsPostRepository goodsPostRepository, ManagerService managerService, FeedbackService feedbackService) {
        this.goodsPostRepository = goodsPostRepository;
        this.managerService = managerService;
        this.feedbackService = feedbackService;
    }

    public Page<GoodsPostViewDto> getPostModerationList(Integer pageNo, String status, String gmail, String sortDate, String myModPost, String mUserName) {
        Sort sort = Sort.by("CreateAt");
        if (sortDate != null) {
            sort = Sort.by(sortDate.equalsIgnoreCase("oldest") ? Sort.Direction.ASC : Sort.Direction.DESC, "CreateAt");
        }
        Pageable pageable = PageRequest.of(pageNo - 1, 10, sort);
        if(status.equals("None")) status = "";
        if(myModPost.equalsIgnoreCase("false")) mUserName = "";
        log.info("MUserName: {}", mUserName);
        Page<GoodsPost> goodsPostPage = goodsPostRepository.findByStatusAndGmail(pageable, status, gmail, mUserName);
        return getGoodsPostViewDto(goodsPostPage);
    }

    private Page<GoodsPostViewDto> getGoodsPostViewDto(Page<GoodsPost> goodsPostPage) {
        log.info("check");
        return goodsPostPage.map(goodsPost -> new GoodsPostViewDto(
                goodsPost.getPostID(),
                goodsPost.getTitle(),
                goodsPost.getContent(),
                goodsPost.getIsExchange(),
                goodsPost.getUnitPrice(),
                goodsPost.getCreateAt(),
                goodsPost.getPostImage(),
                goodsPost.getPostStatus(),
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
                        goodsPost.getCustomer().getGender(),
                        goodsPost.getCustomer().getIsVerified(),
                        goodsPost.getCustomer().getCusRank(),
                        feedbackService.getFeedbackBySupplier(goodsPost.getCustomer().getCUserName())
                ),
                feedbackService.getFeedbackByFeedbackId(goodsPost.getFeedback() == null ? 0L : goodsPost.getFeedback().getFeedbackID()),
                goodsPost.getPostAddress().getStreetNumber(),
                goodsPost.getPostAddress().getStreet(),
                goodsPost.getPostAddress().getWard().getWardName(),
                goodsPost.getPostAddress().getDistrict().getDistrictName(),
                goodsPost.getPostAddress().getCity().getCityName(),
                goodsPost.getCategory().getCateName(),
                goodsPost.getManager().getMUserName(),
                goodsPost.getManager().getFullName(),
                goodsPost.getReason()
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
                goodsPost.getPostStatus(),
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
                goodsPost.getManager().getFullName(),
                goodsPost.getReason()
        ));
    }

    public Page<GoodsPostManageDto> getMyPostModerationList(int pageNo, String username) {
        Pageable pageable = PageRequest.of(pageNo - 1, 12);
        Page<GoodsPost> goodsPostPage = goodsPostRepository.getMyPostModerationList(pageable, username);
        return getGoodsPostManageDto(goodsPostPage);
    }

    public boolean moderatePost(Long postId, PostModerationDto postModerationDto, String username) {
        Manager manager = managerService.findByMUserName(username);
        if(manager != null) {
            GoodsPost goodsPost = goodsPostRepository.findByPostID(postId);
            if(goodsPost != null && postModerationDto != null) {
                if(goodsPost.getPostStatus().equals("Approving") || goodsPost.getPostStatus().equals("Approved")) {
                    goodsPost.setPostStatus(postModerationDto.getStatus());
                    goodsPost.setReason(postModerationDto.getReason());
                    goodsPost.setManager(manager);
                    if(postModerationDto.getStatus().equals("Approved")) {
                        goodsPost.setIsAvailable(true);
                    }
                    goodsPostRepository.save(goodsPost);
                    return true;
                }
            }
        }
        return false;
    }
}
