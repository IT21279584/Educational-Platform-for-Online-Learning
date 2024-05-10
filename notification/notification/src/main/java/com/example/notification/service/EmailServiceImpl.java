package com.example.notification.service;

import com.example.notification.payload.EmailDetails;
import com.example.notification.payload.UserDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class EmailServiceImpl {
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private RestTemplate restTemplate;


    @Value("${spring.mail.username}")
    private String emailSender;

    public void sendEmail(EmailDetails emailDetails){
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(emailSender);
            mailMessage.setTo(emailDetails.getRecipient());
            mailMessage.setText(emailDetails.getMessageBody());
            mailMessage.setSubject(emailDetails.getSubject());
            javaMailSender.send(mailMessage);
            log.info("Mail sent successfully");
        }catch (MailException e){
            log.debug("Failure occurred while sending email");
        }
    }

    private UserDTO getUserDetails(Integer userId) {
        String userUrl = "http://localhost:8082/api/users/" + userId; // Assuming this is your user service endpoint
        return restTemplate.getForObject(userUrl, UserDTO.class);
    }
}
