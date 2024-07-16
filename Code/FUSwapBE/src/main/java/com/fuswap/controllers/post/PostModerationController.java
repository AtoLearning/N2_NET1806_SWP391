package com.fuswap.controllers.post;

import com.fuswap.dtos.ResponseDto;
import com.fuswap.dtos.post.GoodsPostManageDto;
import com.fuswap.dtos.post.GoodsPostViewDto;
import com.fuswap.dtos.post.PostModerationDto;
import com.fuswap.services.post.GoodsPostService;
import com.fuswap.services.post.PostModerationService;
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
public class PostModerationController {
    private final PostModerationService postModerationService;

    public PostModerationController(PostModerationService postModerationService) {
        this.postModerationService = postModerationService;
    }

    @GetMapping("/mod/posts")
    public ResponseEntity<ResponseDto> getPostModerationList(
            @RequestParam(name = "pageNo", defaultValue = "1") Integer pageNo,
            @RequestParam(name = "status", defaultValue = "") String status) {
        if(pageNo <= 0) pageNo = 1;
        Page<GoodsPostManageDto> goodsPostManageDtoPage = postModerationService.getPostModerationList(pageNo, status);
        if(goodsPostManageDtoPage.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto("200 OK", "Having no any posts!", "", 0));
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto("200 OK", "200 OK", goodsPostManageDtoPage.get(), goodsPostManageDtoPage.getTotalPages()));
        }
    }


    @GetMapping("/mod/my-post-moderation")
    public ResponseEntity<ResponseDto> getMyPostModerationList(
            @RequestParam(name = "pageNo", defaultValue = "1") int pageNo,
            Authentication authentication) {
        if(pageNo <= 0) pageNo = 1;
        String username = getUserNameInAuthentication(authentication);
        Page<GoodsPostManageDto> goodsPostManageDtoPage = postModerationService.getMyPostModerationList(pageNo, username);
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

    @PutMapping("mod/posts/moderate/{postId}")
    public ResponseEntity<ResponseDto> moderatePost(
            @PathVariable(name = "postId") Long postId,
            @RequestBody PostModerationDto postModerationDto,
            Authentication authentication
    ) {
        String username = getUserNameInAuthentication(authentication);
        boolean isModerated = postModerationService.moderatePost(postId, postModerationDto, username);
        if(isModerated) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseDto("200", "POST IS APPROVED", "", 0)
            );
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseDto("400", "CANNOT UPDATE STATUS OF POST", "", 0)
            );
        }
    }

    private String getUserNameInAuthentication(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}
