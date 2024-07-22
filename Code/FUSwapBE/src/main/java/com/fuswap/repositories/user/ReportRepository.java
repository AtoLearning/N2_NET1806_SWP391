package com.fuswap.repositories.user;

import com.fuswap.dtos.user.ReportManageDto;
import com.fuswap.entities.user.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    @Transactional(readOnly = true)
    @Query("SELECT new com.fuswap.dtos.user.ReportManageDto" +
            "(gp.report.ReportID, r.ReportName, r.Content, " +
            "r.ReportImage, r.ReportStatus, " +
            "gp.PostID, gp.Title, gp.PostImage) " +
            "FROM GoodsPost gp JOIN gp.report r " +
            "WHERE gp.report.ReportID = :reportId")
    ReportManageDto getReportByReportId(Long reportId);
}
