package com.onneshon.blog.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping("/")
    public String home(){
        return "<h1>Welcome to the  Blog Sphere API Developed by SHAIK and Team.</h1>";
    }
}
