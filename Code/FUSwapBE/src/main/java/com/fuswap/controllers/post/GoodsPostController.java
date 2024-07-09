package com.fuswap.controllers.post;

import com.fuswap.dtos.post.GoodsPostManageDto;
import com.fuswap.dtos.post.GoodsPostViewDto;
import com.fuswap.dtos.ResponseDto;
import com.fuswap.services.post.GoodsPostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@Slf4j
public class GoodsPostController {

    private final GoodsPostService goodsPostService;

    public GoodsPostController(GoodsPostService goodsPostService) {
        this.goodsPostService = goodsPostService;
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
            @RequestParam(name = "searchValue") String searchValue) {
        if(pageNo <= 0) pageNo = 1;
        Page<GoodsPostViewDto> goodsPostViewDtoPage = goodsPostService.getPostListByKeyword(pageNo, searchValue);
        if(goodsPostViewDtoPage.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto("200 OK", "Having no any posts!", "", 0));
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto("200 OK", "200 OK", goodsPostViewDtoPage.get(), goodsPostViewDtoPage.getTotalPages()));
        }
    }

    @GetMapping("/guest/post/details/{postId}")
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

    @GetMapping("/customer/my-post/details/{postId}")
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

    @GetMapping("/customer/my-posts")
    public ResponseEntity<ResponseDto> getMyPosts(
            @RequestParam(name = "pageNo", defaultValue = "1") int pageNo,
            Authentication authentication) {
        if(pageNo <= 0) pageNo = 1;
        String username = getUserNameInAuthentication(authentication);
        Page<GoodsPostManageDto> goodsPostManageDtoPage = goodsPostService.getMyPosts(pageNo, username);
        if(!goodsPostManageDtoPage.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("200 OK", "YOUR POSTS HERE", goodsPostManageDtoPage, goodsPostManageDtoPage.getTotalPages())
            );
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(
                    new ResponseDto("204 NO CONTENT", "YOU HAVE NOT ANY POSTS", "", 0)
            );
        }
    }

    @PostMapping("/customer/my-post/create")
    public ResponseEntity<ResponseDto> createGoodsPost(
            @RequestBody GoodsPostManageDto goodsPostManageDto,
            @CookieValue(name = "SESSION") String sessionId) {
        boolean isCreated = goodsPostService.createGoodsPost(goodsPostManageDto, sessionId);
        if(isCreated) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(
                            "201 CREATED",
                            "Your post is moderating! Please wait for a moment.",
                            goodsPostManageDto, 0));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseDto(
                            "400 BAD REQUEST",
                            "Create post failed!",
                            "", 0));
        }
    }

    @PutMapping("/customer/my-post/update/{postId}")
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

    @DeleteMapping("/customer/my-post/delete/{postId}")
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
