package com.example.apimonitor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.apimonitor.model.MonitoredApi;
import com.example.apimonitor.service.ApiService;

@RestController
@RequestMapping("/api")
public class ApiController {
	
	@Autowired
	private ApiService service;
	
	@GetMapping("/all")
	public List<MonitoredApi> getAllApis() {
		 return service.getAllApis();
	}
	
	@PostMapping("/add")
	public MonitoredApi addApi(@RequestBody MonitoredApi api) {
		return service.saveApi(api);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteApi(@PathVariable Long id) {
		service.deleteApi(id);
	}
	
	@PutMapping("/update/{id}")
	public MonitoredApi updateApi(@PathVariable Long id,
			                       @RequestBody MonitoredApi updatedApi) {
		
		return service.updateApi(id, updatedApi);
	}
	
}
































