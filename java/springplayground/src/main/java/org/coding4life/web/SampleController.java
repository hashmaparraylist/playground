package org.coding4life.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SampleController {

    private final static Logger logger = LoggerFactory.getLogger(SampleController.class);

    @GetMapping("/hello")
    public String hello() {
        logger.debug("Hello, world!");
        return "Hello, world!";
    }
}
