package com.example.apimonitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.apimonitor.model.MonitoringHistory;

public interface MonitoringHistoryRepository extends JpaRepository<MonitoringHistory, Long> {

}
