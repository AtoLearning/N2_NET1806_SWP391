package com.fuswap.entities.user;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tblreport")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reportid")
    Long ReportID;

    @Column(name = "reportname")
    String ReportName;

    @Column(name = "content")
    String Content;

    @Column(name = "reportimage")
    String ReportImage;

    @Column(name = "reportstatus")
    String ReportStatus;

    @Column(name = "createat")
    LocalDate CreateAt;

    @ManyToOne
    @JoinColumn(name = "musername")
    Manager manager;

    @ManyToOne
    @JoinColumn(name = "cusername")
    Customer customer;

    @Override
    public String toString() {
        return "Report{" +
                "ReportID=" + ReportID +
                ", ReportName='" + ReportName + '\'' +
                ", Content='" + Content + '\'' +
                ", ReportImage='" + ReportImage + '\'' +
                ", ReportStatus='" + ReportStatus + '\'' +
                ", CreateAt=" + CreateAt +
                ", manager=" + manager +
                ", customer=" + customer +
                '}';
    }
}
