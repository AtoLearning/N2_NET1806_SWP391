package com.fuswap.controllers.post;

import com.fuswap.dtos.post.GoodsPostManageDto;
import com.fuswap.dtos.post.GoodsPostViewDto;
import com.fuswap.dtos.ResponseDto;
import com.fuswap.dtos.user.CustomerDto;
import com.fuswap.services.post.GoodsPostService;
import com.fuswap.services.user.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@Slf4j
public class GoodsPostController {

    private final GoodsPostService goodsPostService;
    private final CustomerService customerService;

    public GoodsPostController(GoodsPostService goodsPostService, CustomerService customerService) {
        this.goodsPostService = goodsPostService;
        this.customerService = customerService;
    }

    @GetMapping("/guest/posts")
    public ResponseEntity<ResponseDto> getPostList(@RequestParam(name = "pageNo", defaultValue = "1") Integer pageNo) {
        if(pageNo <= 0) pageNo = 1;
        Page<GoodsPostViewDto> goodsPostViewDtoPage = goodsPostService.getPostList(pageNo);
        if(goodsPostViewDtoPage.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto("200 OK", "Having no any posts!", "", 0));
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto("200 OK", "200 OK", goodsPostViewDtoPage.get(), goodsPostViewDtoPage.getTotalPages()));
        }
    }

    @GetMapping("/guest/posts/search")
    public ResponseEntity<ResponseDto> getPostListByKeyword(
            @RequestParam(name = "pageNo", defaultValue = "1") int pageNo,
            @RequestParam(name = "searchValue") String searchValue,
            @RequestParam(name = "cityName") String cityName,
            @RequestParam(name = "districtName") String districtName,
            @RequestParam(name = "wardName") String wardName,
            @RequestParam(name = "priceSort") String priceSort,
            @RequestParam(name = "dateSort") String dateSort,
            @RequestParam(name = "postType") String postType,
            @RequestParam(name = "cateName") String cateName) {
        if(pageNo <= 0) pageNo = 1;
        Page<GoodsPostViewDto> goodsPostViewDtoPage =
                goodsPostService.getPostListByKeyword(
                        pageNo,
                        searchValue,
                        cityName,
                        districtName,
                        wardName,
                        priceSort,
                        dateSort,
                        postType,
                        cateName);
        if(goodsPostViewDtoPage.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto("200 OK", "Having no any posts!", "", 0));
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto("200 OK", "200 OK", goodsPostViewDtoPage.get(), goodsPostViewDtoPage.getTotalPages()));
        }
    }

    @GetMapping("/customer/post/details/{postId}")
    public ResponseEntity<ResponseDto> getPostDetails(@PathVariable(name = "postId") Long postId) {
        GoodsPostViewDto goodsPostViewDto = goodsPostService.getPostDetails(postId);
        if(goodsPostViewDto != null) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("200 OK", "GOODS POST DETAILS", goodsPostViewDto, 0)
            );
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("404 Not Found", "404 Not Found", "", 0)
            );
        }
    }

    @GetMapping("/customer/post/details/related-goods")
    public ResponseEntity<ResponseDto> getRelatedGoods(
            @RequestParam(name = "postId") Long postId,
            @RequestParam(name = "cateName") String cateName,
            @RequestParam(name = "cuserName") String cuserName
    ) {
        List<GoodsPostViewDto> goodsPostViewDtoList = goodsPostService.getRelatedGoods(postId, cateName, cuserName);
        if(!goodsPostViewDtoList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("200 OK", "GOODS POST DETAILS", goodsPostViewDtoList, 0)
            );
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("404 Not Found", "404 Not Found", "", 0)
            );
        }
    }

    @GetMapping("/customer/permission/my-post/details/{postId}")
    public ResponseEntity<ResponseDto> getMyPostDetails(
            @PathVariable(name = "postId") Long postId,
            Authentication authentication) {
        String username = getUserNameInAuthentication(authentication);
        GoodsPostManageDto goodsPostManageDto = goodsPostService.getMyPostDetails(postId, username);
        if(goodsPostManageDto != null) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("200 OK", "GOODS POST DETAILS", goodsPostManageDto, 0)
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseDto("404 Not Found", "404 Not Found", "", 0)
            );
        }
    }

    @GetMapping("/customer/permission/my-posts")
    public ResponseEntity<ResponseDto> getMyPosts(
            @RequestParam(name = "pageNo", defaultValue = "1") int pageNo,
            @RequestParam(name = "postStatus") String postStatus,
            @RequestParam(name = "sortDate") String sortDate,
            Authentication authentication) {
        if(pageNo <= 0) pageNo = 1;
        String username = getUserNameInAuthentication(authentication);
        Page<GoodsPostManageDto> goodsPostManageDtoPage = goodsPostService.getMyPosts(pageNo, postStatus, sortDate, username);
        if(!goodsPostManageDtoPage.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("200 OK", "YOUR POSTS HERE", goodsPostManageDtoPage.get(), goodsPostManageDtoPage.getTotalPages())
            );
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(
                    new ResponseDto("204 NO CONTENT", "YOU HAVE NOT ANY POSTS", "", 0)
            );
        }
    }

    @PostMapping("/customer/permission/my-post/create")
    public ResponseEntity<ResponseDto> createGoodsPost(
            @RequestBody GoodsPostManageDto goodsPostManageDto,
            Authentication authentication) {
        String username = getUserNameInAuthentication(authentication);
        boolean isFullInformation = customerService.isFullInformation(username);
        if(!isFullInformation) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseDto(
                            "400.1",
                            "Less personal information",
                            "", 0));
        }
        boolean isCreated = goodsPostService.createGoodsPost(goodsPostManageDto, username);
        if(isCreated) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(
                            "201",
                            "Your post is moderating! Please wait for a moment.",
                            goodsPostManageDto, 0));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseDto(
                            "400",
                            "Create post failed!",
                            "", 0));
        }
    }

    @PutMapping("/customer/permission/my-post/update/{postId}")
    public ResponseEntity<ResponseDto> updateGoodsPost(
            @PathVariable(name = "postId") Long postId,
            @RequestBody GoodsPostManageDto goodsPostManageDto,
            Authentication authentication) {
        String username = getUserNameInAuthentication(authentication);
        boolean isUpdated = goodsPostService.updateGoodsPost(postId, goodsPostManageDto, username);
        if(isUpdated) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("200 OK", "Your post has been updated!", "", 0)
            );
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseDto("400 BAD REQUEST", "Update post failed!", "", 0)
            );
        }
    }

    @DeleteMapping("/customer/permission/my-post/delete/{postId}")
    public ResponseEntity<ResponseDto> deleteGoodsPost(
            @PathVariable(name = "postId") Long postId,
            Authentication authentication) {
        String username = getUserNameInAuthentication(authentication);
        boolean isDelete = goodsPostService.deleteGoodsPost(postId, username);
        if(isDelete) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("200 OK", "Your post has been deleted!", "", 0)
            );
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseDto("400 BAD REQUEST", "Delete post failed!", "", 0)
            );
        }
    }

    private String getUserNameInAuthentication(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}
