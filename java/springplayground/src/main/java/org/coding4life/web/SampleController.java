package org.coding4life.web;

import lombok.extern.slf4j.Slf4j;
import org.coding4life.service.ComputeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalancerClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
public class SampleController {

    @Value("${spring.application.name}")
    private String appName = null;

    @Value("${wechat.appKey}")
    private String wechatAppKey = null;

    @Autowired private DiscoveryClient discoveryClient = null;
    @Autowired private LoadBalancerClient loadBalancer = null;
    @Autowired private ComputeService computeService = null;

    @GetMapping("/")
    public ServiceInstance lb() {
        return loadBalancer.choose(appName);
    }

    @GetMapping("/hello")
    public String hello() {
        log.info(this.wechatAppKey);
        List<String> services = discoveryClient.getServices();
        services.forEach(log::info);
        return "hello world!";
    }

    @GetMapping("/call")
    public String callNode() {
        return this.computeService.node();
    }
}
