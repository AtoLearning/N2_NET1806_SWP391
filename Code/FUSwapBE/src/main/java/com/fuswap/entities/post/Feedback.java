package com.fuswap.entities.post;

import com.fuswap.entities.user.Customer;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tblfeedback")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedbackid")
    Long FeedbackID;

    @Column(name = "content")
    String Content;

    @Column(name = "createat")
    Date CreateAt;

    @ManyToOne
    @JoinColumn(name = "cusername")
    Customer customer;

    @Override
    public String toString() {
        return "Feedback{" +
                "FeedbackID=" + FeedbackID +
                ", Content='" + Content + '\'' +
                ", CreateAt=" + CreateAt +
                ", customer=" + customer +
                '}';
    }
}
