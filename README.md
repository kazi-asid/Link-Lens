# Link-Lens

> **See Before You Step. Surf Without Fear.**

A full-stack web security solution that helps users detect phishing, malware, and potentially dangerous websites before visiting them. Link-Lens combines a Chrome Extension with a Java Spring Boot backend to analyze URLs using the VirusTotal API and present a visual security report along with a sandbox preview.

---

## Table of Contents

- Project Overview
- Problem Statement
- Solution
- Key Features
- Tech Stack
- System Architecture
- Project Structure
- Workflow
- Installation & Setup
- Usage Guide
- API Documentation
- Screenshots
- Challenges Faced
- Security & Privacy
- Future Roadmap
- Project Status
- Contributing
- License
- Author

---

## Project Overview

Link-Lens is a browser-based security tool designed to help users inspect hyperlinks before opening them. Instead of directly visiting an unknown website, users can simply right-click any link and scan it through the Link-Lens Chrome Extension.

The extension communicates with a Java Spring Boot backend, which securely interacts with the VirusTotal API to evaluate the reputation of the target URL. The result is presented inside a floating popup together with a live sandbox preview, allowing users to make informed decisions before clicking potentially malicious links.

The project focuses on browser security, malware detection, phishing prevention, and improving safe browsing through a lightweight yet practical security workflow.
---

## Problem Statement

Cyber threats such as phishing websites, malware distribution, fake login pages, and malicious redirects have become increasingly common. Most users visit links without verifying their authenticity, making them vulnerable to credential theft, malware infections, and online scams.

Traditional security solutions often require users to manually copy URLs into online scanners or rely on antivirus software that may not provide immediate link verification during everyday browsing. This creates a gap between user convenience and online security.

---

## Solution

Link-Lens addresses this problem by providing a lightweight browser extension that allows users to scan any hyperlink before opening it.

With a simple right-click, the extension retrieves the selected URL, securely sends it to a Java Spring Boot backend, and performs a reputation analysis using the VirusTotal API. Alongside the security score, Link-Lens also displays a cloud-rendered sandbox preview of the destination webpage, helping users understand where a link leads without actually visiting it.

This approach enables faster decision-making while reducing the risk of interacting with malicious websites.

---

## Key Features

- Right-click context menu integration for instant URL scanning.
- Floating popup interface injected directly into the current webpage.
- Live sandbox website preview using Thum.io.
- Real-time URL reputation analysis through the VirusTotal API.
- Dynamic security score with Safe, Warning, and Malicious indicators.
- Color-coded user interface for better visual feedback.
- Skeleton loading animation for improved user experience.
- RESTful backend built with Java Spring Boot.
- Secure communication between the Chrome Extension and backend server.
- Modular architecture for easy future feature expansion.
---

## Tech Stack

### Frontend
- JavaScript (ES6)
- HTML5
- CSS3
- Chrome Extension (Manifest V3)

### Backend
- Java 17
- Spring Boot
- Maven

### APIs & Services
- VirusTotal API
- Thum.io Screenshot API

### Libraries
- Jackson Databind
- Spring Web
- RestTemplate

### Development Tools
- Visual Studio Code
- Git & GitHub
- Google Chrome

---

## System Architecture

```text
User
   │
   ▼
Chrome Extension
   │
   ▼
background.js
   │
   ▼
content.js
   │
   ▼
Spring Boot Backend
   │
   ▼
VirusTotal API
   │
   ▼
Security Score
   │
   ▼
Floating Popup + Sandbox Preview
```

---

## Project Structure

```text
Link-Lens
│
├── frontend/
│   ├── manifest.json
│   ├── background.js
│   ├── content.js
│   └── icon.png
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   └── .mvn/
│
└── README.md
```

---

## Workflow

1. The user right-clicks on any hyperlink.
2. The Chrome Extension captures the selected URL.
3. The URL is sent to the content script.
4. A floating popup is displayed instantly.
5. A sandbox preview is loaded using the Thum.io API.
6. The URL is sent to the Spring Boot backend.
7. The backend queries the VirusTotal API.
8. The security score is calculated.
9. The result is returned to the extension.
10. The popup displays the final security status with dynamic colors.
---

## Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/<your-username>/Link-Lens.git
```

### Frontend Setup

1. Open **Google Chrome**.
2. Navigate to **chrome://extensions/**.
3. Enable **Developer Mode**.
4. Click **Load unpacked**.
5. Select the `frontend` folder.

### Backend Setup

1. Navigate to the backend directory.

```bash
cd backend
```

2. Open `ScanController.java`.

3. Replace the placeholder below with your own VirusTotal API key.

```java
private static final String VT_API_KEY = "Your_API_Key";
```

4. Run the Spring Boot application.

```bash
mvn spring-boot:run
```

The backend server will start at:

```
http://localhost:8080
```

---

## Usage Guide

1. Start the Spring Boot backend.
2. Load the Chrome Extension.
3. Open any webpage.
4. Right-click on any hyperlink.
5. Select **"Scan Link with Link-Lens"**.
6. Wait a few seconds while the scan completes.
7. Review the sandbox preview and security score before visiting the website.

---

## API Documentation

### Scan URL

**Endpoint**

```
POST /api/scan
```

**Request Body**

```json
{
  "url": "https://example.com"
}
```

**Success Response**

```json
{
  "status": "success",
  "url": "https://example.com",
  "score": 100
}
```

**Error Response**

```json
{
  "status": "error",
  "message": "VirusTotal scan failed.",
  "score": 0
}
```
---

## Challenges Faced

During development, several practical challenges were encountered while integrating the Chrome Extension with the backend service.

Some of the major challenges included:

- Establishing communication between the Chrome Extension and the Spring Boot backend.
- Handling Cross-Origin Resource Sharing (CORS) correctly.
- Understanding the VirusTotal URL scanning workflow.
- Encoding URLs in the format required by the VirusTotal v3 API.
- Parsing complex JSON responses from the API.
- Designing a lightweight floating popup without affecting the current webpage.
- Providing a responsive user experience while waiting for scan results.

These challenges helped improve knowledge of browser extension development, REST APIs, Java Spring Boot, and real-world application integration.

---

## Security & Privacy

- API keys are stored only on the backend and are never exposed to the browser extension.
- Link-Lens does not collect or store user browsing history.
- The extension scans only the URL explicitly selected by the user.
- Security analysis is performed using the VirusTotal API.
- The project is intended for educational and cybersecurity learning purposes.

---

## Future Roadmap

The following features are planned for future releases:

- Scan history
- Improved UI/UX
- Dark mode
- Extension settings page
- Faster scanning using caching
- Detailed threat reports
- Multiple security engine support
- AI-assisted phishing analysis
- Chrome Web Store deployment
- Cloud deployment for the backend

---

## Project Status

**Current Status:** Active Development 🚧

The core functionality of Link-Lens is fully operational. The project successfully scans URLs, retrieves security information from the VirusTotal API, and displays the results inside the Chrome Extension.

Additional features and optimizations are planned for future releases.
---

## Contributing

Contributions, suggestions, and feedback are always welcome.

If you would like to improve Link-Lens, feel free to fork the repository, create a new branch, and submit a pull request.

---

## License

This project is licensed under the MIT License.

---

## Author

**Kazi Asid Alam**

- GitHub: https://github.com/kazi-asid
- LinkedIn: https://www.linkedin.com/in/kazi-asid

---

⭐ If you found this project useful, consider giving it a star on GitHub.
