
package com.example.EmailService.Controller;
import com.example.EmailService.Controller.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/sendEmail")
    public String sendEmail(
            @RequestParam String to,
            @RequestParam String subject,
            @RequestBody String text) {

        emailService.sendSimpleEmail(to, subject, text);
        return "Email sent successfully!";
    }
}
