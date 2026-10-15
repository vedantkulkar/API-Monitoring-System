package com.example.apimonitor.service;

import java.util.List;
import java.time.LocalDateTime;
import com.example.apimonitor.model.MonitoringHistory;
import com.example.apimonitor.repository.MonitoringHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.apimonitor.model.MonitoredApi;
import com.example.apimonitor.repository.ApiRepository;


@Service
public class ApiService {
	
	@Autowired
	private EmailService emailService;

    @Autowired
    private ApiRepository repo;
    
    @Autowired
    private MonitoringHistoryRepository historyRepo;

    public List<MonitoredApi> getAllApis() {
        return repo.findAll();
    }

    public MonitoredApi saveApi(MonitoredApi api) {
        return repo.save(api);
    }


@Scheduled(fixedRate = 10000)
public void checkApiStatus() {
	
	List<MonitoredApi> apis = repo.findAll();
	
	for (MonitoredApi api : apis) {
		
		String oldStatus = api.getStatus();
		try {
			long start = System.currentTimeMillis();
			
			RestTemplate restTemplate = new RestTemplate();
			restTemplate.getForObject(api.getUrl(), String.class);
			
			long end = System.currentTimeMillis();
			
			api.setStatus("UP");
			api.setResponseTime((int)(end - start));
			
		} catch (Exception e) {
			
			api.setStatus("DOWN");
			api.setResponseTime(0);
			
			if(!"DOWN".equals(oldStatus)) {
			
			System.out.println("API DOWN - sending email...");
			e.printStackTrace();
			
			emailService.sendAlert(api.getName(), api.getUrl());
		}
	}
		
	MonitoredApi latestApi = repo.findById(api.getId())
			.orElseThrow(() -> new RuntimeException("API Not Found"));
	
	latestApi.setStatus(api.getStatus());
	latestApi.setResponseTime(api.getResponseTime());
	
	repo.save(latestApi);
	}
}

public MonitoredApi updateApi(Long id, MonitoredApi updatedApi) {
	
	MonitoredApi api = repo.findById(id)
			.orElseThrow(() -> new RuntimeException("API Not Found"));
	
	api.setName(updatedApi.getName());
	api.setUrl(updatedApi.getUrl());
	
	return repo.save(api);
}

public void deleteApi(Long id) {
	repo.deleteById(id);
}

}

  
