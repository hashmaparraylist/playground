package org.coding4life.service.impl;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.coding4life.service.ComputeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * Created by QuSheng on 2017/5/18.
 */
@Service
public class ComputeServiceImpl implements ComputeService {

    @Autowired private RestTemplate restTemplate = null;

    @Override
    @HystrixCommand(fallbackMethod = "nodeServiceFallback")
    public String node() {
        return this.restTemplate.getForObject("http://node-consul-service/", String.class);
    }

    public String nodeServiceFallback() {
        return "error";
    }
}
