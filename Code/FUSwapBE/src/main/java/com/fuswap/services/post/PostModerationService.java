package com.fuswap.services.post;

import com.fuswap.dtos.location.CityDto;
import com.fuswap.dtos.location.DistrictDto;
import com.fuswap.dtos.location.WardDto;
import com.fuswap.dtos.post.CategoryDto;
import com.fuswap.dtos.post.GoodsPostManageDto;
import com.fuswap.dtos.post.PostModerationDto;
import com.fuswap.entities.post.GoodsPost;
import com.fuswap.entities.user.Manager;
import com.fuswap.repositories.post.GoodsPostRepository;
import com.fuswap.services.user.ManagerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PostModerationService {
    private final GoodsPostRepository goodsPostRepository;
    private final ManagerService managerService;

    public PostModerationService(GoodsPostRepository goodsPostRepository, ManagerService managerService) {
        this.goodsPostRepository = goodsPostRepository;
        this.managerService = managerService;
    }

    public Page<GoodsPostManageDto> getPostModerationList(Integer pageNo, String status) {
        Pageable pageable = PageRequest.of(pageNo - 1, 12);
        Page<GoodsPost> goodsPostPage;
        if(status.isBlank()) {
            goodsPostPage = goodsPostRepository.findAll(pageable);
        } else {
            goodsPostPage = goodsPostRepository.findAllAndStatus(pageable, status);
        }
        return getGoodsPostManageDto(goodsPostPage);
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
                goodsPost.getCustomer().getFamilyName() +
                        goodsPost.getCustomer().getGivenName()
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
                if(goodsPost.getPostStatus().equals("Approving")) {
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
