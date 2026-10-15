package com.example.apimonitor.repository;

import com.example.apimonitor.model.MonitoredApi;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApiRepository extends JpaRepository<MonitoredApi, Long> {
}
