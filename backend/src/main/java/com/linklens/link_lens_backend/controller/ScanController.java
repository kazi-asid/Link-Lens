package com.linklens.link_lens_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ScanController {

    private static final String VT_API_KEY = "Your_API_Key";

    @PostMapping("/scan")
    public ResponseEntity<Map<String, Object>> scanUrl(@RequestBody Map<String, String> request) {
        String urlToScan = request.get("url");
        System.out.println("🔥 Received URL for scanning: " + urlToScan);

        Map<String, Object> response = new HashMap<>();
        response.put("url", urlToScan);

        try {
            String encodedUrl = Base64.getUrlEncoder().withoutPadding().encodeToString(urlToScan.getBytes(StandardCharsets.UTF_8));

            String vtApiUrl = "https://www.virustotal.com/api/v3/urls/" + encodedUrl;
            RestTemplate restTemplate = new RestTemplate();
            
            HttpHeaders headers = new HttpHeaders();
            headers.set("x-apikey", VT_API_KEY);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            System.out.println("⏳ Contacting VirusTotal...");
            ResponseEntity<String> vtResponse = restTemplate.exchange(vtApiUrl, HttpMethod.GET, entity, String.class);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(vtResponse.getBody());
            JsonNode stats = root.path("data").path("attributes").path("last_analysis_stats");

            int malicious = stats.path("malicious").asInt();
            int suspicious = stats.path("suspicious").asInt();
            int harmless = stats.path("harmless").asInt();
            int undetected = stats.path("undetected").asInt();

            int totalScans = malicious + suspicious + harmless + undetected;
            int score = 100;
            
            if (totalScans > 0) {
                int badVotes = malicious + suspicious;
                score = 100 - ((badVotes * 100) / totalScans);
            }

            response.put("status", "success");
            response.put("score", score);
            
            System.out.println("✅ Scan Complete! Score: " + score);

        } catch (Exception e) {
            System.out.println("❌ Error: " + e.getMessage());
            response.put("status", "error");
            response.put("message", "VirusTotal scan failed. Url might not be indexed yet.");
            response.put("score", 0);
        }

        return ResponseEntity.ok(response);
    }
}
