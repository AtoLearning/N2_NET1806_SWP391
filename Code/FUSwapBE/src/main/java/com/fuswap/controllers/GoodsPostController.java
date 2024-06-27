package com.fuswap.controllers;

import com.fuswap.dtos.GoodsPostDto;
import com.fuswap.dtos.ResponseDto;
import com.fuswap.services.GoodsPostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/")
@Slf4j
public class GoodsPostController {

    private final GoodsPostService goodsPostService;

    public GoodsPostController(GoodsPostService goodsPostService) {
        this.goodsPostService = goodsPostService;
    }

    @GetMapping("/posts")
    public ResponseEntity<ResponseDto> getAllPosts() {
        List<GoodsPostDto> goodsPostDtoList = goodsPostService.getAllPosts();
        if(goodsPostDtoList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto("200 OK", "Having no any posts!", ""));
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto("200 OK", "200 OK", goodsPostDtoList));
        }
    }

    @PostMapping("/customer/post")
    public ResponseEntity<ResponseDto> createGoodsPost(@RequestBody GoodsPostDto goodsPostDto) {
        boolean isCreated = goodsPostService.createGoodsPost(goodsPostDto);
        if(isCreated) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(
                            "201 CREATED",
                            "Post #" + goodsPostDto.getPostID() + " is created successfully!",
                            goodsPostDto));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseDto(
                            "400 BAD REQUEST",
                            "Create post failed!",
                            ""));
        }
    }
}
