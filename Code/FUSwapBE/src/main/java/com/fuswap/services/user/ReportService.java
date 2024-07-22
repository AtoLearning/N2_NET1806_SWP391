package com.fuswap.services.user;

import com.fuswap.dtos.user.ReportManageDto;
import com.fuswap.entities.post.GoodsPost;
import com.fuswap.entities.user.Customer;
import com.fuswap.entities.user.Manager;
import com.fuswap.entities.user.Report;
import com.fuswap.repositories.post.GoodsPostRepository;
import com.fuswap.repositories.user.CustomerRepository;
import com.fuswap.repositories.user.ManagerRepository;
import com.fuswap.repositories.user.ReportRepository;
import com.fuswap.services.post.GoodsPostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@Slf4j
public class ReportService {
    private final ReportRepository reportRepository;
    private final ManagerRepository managerRepository;
    private final CustomerRepository customerRepository;
    private final GoodsPostRepository goodsPostRepository;

    public ReportService(ReportRepository reportRepository, ManagerRepository managerRepository, CustomerRepository customerRepository, GoodsPostRepository goodsPostRepository) {
        this.reportRepository = reportRepository;
        this.managerRepository = managerRepository;
        this.customerRepository = customerRepository;
        this.goodsPostRepository = goodsPostRepository;
    }

    public boolean createReport(ReportManageDto reportManageDto, String username) {
        Report report = new Report();
        Customer customer = customerRepository.findByCUserName(username);
        Manager manager = managerRepository.findByMUserName("admin");
        GoodsPost goodsPost = goodsPostRepository.findByPostID(reportManageDto.getPostId());
        if(customer != null && manager != null && goodsPost != null) {
            report.setReportName(reportManageDto.getTitle());
            report.setContent(reportManageDto.getContent());
            report.setReportImage(reportManageDto.getReportImage());
            report.setReportStatus(reportManageDto.getReportStatus());
            report.setCreateAt(LocalDate.now());
            report.setManager(manager);
            report.setCustomer(customer);

            goodsPost.setReport(reportRepository.save(report));
            goodsPostRepository.save(goodsPost);

            return true;
        }
        return false;
    }

    public ReportManageDto getReportByReportId(Long reportId) {
        log.info("getReportByReportId {}", reportId);
        log.info("getReportByReportId {}", reportRepository.getReportByReportId(reportId));
        return reportRepository.getReportByReportId(reportId);
    }
}
