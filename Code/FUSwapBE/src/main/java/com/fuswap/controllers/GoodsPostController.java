package com.fuswap.controllers;

import com.fuswap.dtos.request.GoodsPostReq;
import com.fuswap.dtos.response.GoodsPostRes;
import com.fuswap.dtos.response.ResponseDto;
import com.fuswap.services.post.GoodsPostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@Slf4j
public class GoodsPostController {

    private final GoodsPostService goodsPostService;

    public GoodsPostController(GoodsPostService goodsPostService) {
        this.goodsPostService = goodsPostService;
    }

    @GetMapping("/guest/posts")
    public ResponseEntity<ResponseDto> getAllPosts(@RequestParam(name = "pageNo", defaultValue = "1") int pageNo) {
        if(pageNo <= 0) pageNo = 1;
        Page<GoodsPostRes> goodsPostResPage = goodsPostService.getAllPosts(pageNo);
        if(goodsPostResPage.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto("200 OK", "Having no any posts!", "", 0));
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto("200 OK", "200 OK", goodsPostResPage.get(), goodsPostResPage.getTotalPages()));
        }
    }

    @PostMapping("/customer/post")
    public ResponseEntity<ResponseDto> createGoodsPost(
            @RequestBody GoodsPostReq goodsPostReq,
            @CookieValue(name = "SESSION") String sessionId) {
        boolean isCreated = goodsPostService.createGoodsPost(goodsPostReq, sessionId);
        if(isCreated) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(
                            "201 CREATED",
                            "Your post is moderating! Please wait for a moment.",
                            goodsPostReq, 0));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseDto(
                            "400 BAD REQUEST",
                            "Create post failed!",
                            "", 0));
        }
    }

    @PutMapping("/customer/post/{postId}")
    public ResponseEntity<ResponseDto> updateGoodsPost(
            @PathVariable(name = "postId") long postId,
            @RequestBody GoodsPostReq goodsPostReq) {
        boolean isUpdated = goodsPostService.updateGoodsPost(postId, goodsPostReq);
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
}
