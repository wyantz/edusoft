package com.siska.edu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages =  "com.siska.edu")
public class SiskaLMSApplication {

	public static void main(String[] args) {
		SpringApplication.run(SiskaLMSApplication.class, args);
	}

}
