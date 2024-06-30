package com.fuswap.services;

import com.fuswap.dtos.CustomerDto;
import com.fuswap.dtos.GoodsPostDto;
import com.fuswap.entities.GoodsPost;
import com.fuswap.repositories.CustomerRepository;
import com.fuswap.repositories.GoodsPostRepository;
import com.fuswap.repositories.ManagerRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class GoodsPostService {

    private final GoodsPostRepository goodsPostRepository;
    private final ManagerRepository managerRepository;
    private final CustomerRepository customerRepository;


    public GoodsPostService(
            GoodsPostRepository goodsPostRepository,
            ManagerRepository managerRepository,
            CustomerRepository customerRepository) {
        this.goodsPostRepository = goodsPostRepository;
        this.managerRepository = managerRepository;
        this.customerRepository = customerRepository;
    }

    public List<GoodsPostDto> getAllPosts() {
        List<GoodsPost> goodsPostList = goodsPostRepository.findAll();
        List<GoodsPostDto> goodsPostDtoList = new ArrayList<>();
        for(GoodsPost goodsPost : goodsPostList) {
            if(goodsPost.getIsAvailable()) {
                goodsPostDtoList.add(new GoodsPostDto(
                    goodsPost.getPostID(),
                    goodsPost.getTittle(),
                    goodsPost.getContent(),
                    goodsPost.getIsExchange(),
                    goodsPost.getUnitPrice(),
                    goodsPost.getCreateAt(),
                    new CustomerDto(
                            goodsPost.getCustomer().getCUserName(),
                            goodsPost.getCustomer().getGivenName(),
                            goodsPost.getCustomer().getFamilyName(),
                            goodsPost.getCustomer().getNickname(),
                            goodsPost.getCustomer().getAvatar(),
                            goodsPost.getCustomer().getCoins(),
                            goodsPost.getCustomer().getPoints(),
                            goodsPost.getCustomer().getDOB(),
                            goodsPost.getCustomer().getAddress(),
                            goodsPost.getCustomer().getIsVerified()
                    ),
                    goodsPost.getPostAddress(),
                    goodsPost.getCategory()
                ));
            }
        }
        return goodsPostDtoList;
    }

    public boolean createGoodsPost(GoodsPostDto goodsPostDto) {
        if(goodsPostDto == null) return false;
        GoodsPost goodsPost = new GoodsPost(
                RandomStringUtils.randomAlphanumeric(5),
                goodsPostDto.getTitle(),
                goodsPostDto.getContent(),
                goodsPostDto.getIsExchange(),
                false,
                goodsPostDto.getUnitPrice(),
                5f,
                goodsPostDto.getCreateAt(),
                managerRepository.findByMUserName("admin"),
                customerRepository.findByCUserName(goodsPostDto.getCustomerDto().getCUserName()),
                goodsPostDto.getPostAddress(),
                goodsPostDto.getCategory()
        );
        goodsPostRepository.save(goodsPost);
        return true;
    }
}
