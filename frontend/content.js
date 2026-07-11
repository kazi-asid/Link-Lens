const style = document.createElement('style');
style.innerHTML = `
    @keyframes blink {
        0% { opacity: 1; }
        50% { opacity: 0.3; }
        100% { opacity: 1; }
    }
    .skeleton-loader {
        background: linear-gradient(90deg, #ecf0f1 25%, #bdc3c7 50%, #ecf0f1 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
    }
    @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
`;
document.head.appendChild(style);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showFloatingPopup") {
        showCustomPopup(request.url);
    }
});

function showCustomPopup(url) {
    let existingPopup = document.getElementById("link-lens-floating-box");
    if (existingPopup) existingPopup.remove();

    const popup = document.createElement("div");
    popup.id = "link-lens-floating-box";
    
    popup.style.position = "fixed";
    popup.style.bottom = "20px";
    popup.style.right = "20px";
    popup.style.width = "340px";
    popup.style.backgroundColor = "white";
    popup.style.border = "2px solid #2c3e50";
    popup.style.borderRadius = "12px";
    popup.style.boxShadow = "0px 10px 30px rgba(0,0,0,0.4)";
    popup.style.padding = "15px";
    popup.style.zIndex = "9999999";
    popup.style.fontFamily = "Arial, sans-serif";

    const previewImageUrl = `https://image.thum.io/get/width/320/crop/600/noanimate/${url}`;

    popup.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 10px;">
            <strong style="color: #2c3e50; font-size: 16px;">Link-Lens Scanner</strong>
            <button id="link-lens-close-btn" style="background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer; padding: 2px 8px; font-weight: bold;">X</button>
        </div>
        
        <div style="background-color: #f1c40f; padding: 8px; border-radius: 5px; font-size: 12px; word-break: break-all; margin-bottom: 10px;">
            <strong>Target URL:</strong><br>
            <span style="color: #2980b9;">${url}</span>
        </div>

        <!-- 🖼️ Sandbox Preview Section -->
        <div style="border: 1px solid #bdc3c7; border-radius: 8px; overflow: hidden; background: #f9f9f9; position: relative;">
            <div style="background: #34495e; color: white; font-size: 11px; padding: 4px 8px; font-weight: bold; display: flex; align-items: center; gap: 5px;">
                <span>🔍</span> Sandbox Preview
            </div>
            <div id="preview-image-container" class="skeleton-loader" style="width: 100%; height: 160px; position: relative;">
                <img id="link-lens-preview-img" src="${previewImageUrl}" 
                     style="width: 100%; height: 160px; object-fit: cover; opacity: 0; transition: opacity 0.5s ease; display: block;" 
                     alt="Loading preview...">
            </div>
        </div>

        <!-- 🛡️ Security Score Section -->
        <div id="link-lens-status" style="margin-top: 12px; padding: 10px; background: #ecf0f1; border-radius: 8px; font-size: 13px; color: #7f8c8d; text-align: center; font-weight: bold;">
            <span style="font-size: 16px; animation: blink 1.5s infinite;">⏳</span> Connecting to security engines...
        </div>
    `;

    document.body.appendChild(popup);

    const previewImg = document.getElementById("link-lens-preview-img");
    previewImg.onload = () => {
        previewImg.style.opacity = "1";
        document.getElementById("preview-image-container").classList.remove("skeleton-loader");
    };
    previewImg.onerror = () => {
        document.getElementById("preview-image-container").innerHTML = `<div style="padding: 50px 0; text-align: center; color: #7f8c8d; font-size: 12px;">Preview not available</div>`;
        document.getElementById("preview-image-container").classList.remove("skeleton-loader");
    };

    document.getElementById("link-lens-close-btn").addEventListener("click", () => {
        popup.remove();
    });

    fetch("http://localhost:8080/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url })
    })
    .then(response => response.json())
    .then(data => {
        const statusDiv = document.getElementById("link-lens-status");
        if(data.score >= 80) {
            statusDiv.style.backgroundColor = "#e8f8f5";
            statusDiv.style.color = "#27ae60";
            statusDiv.innerHTML = `✅ Safe to Visit <br> Score: <span style="font-size: 18px; color: #2ecc71;">${data.score}/100</span>`;
        } else if(data.score >= 50) {
            statusDiv.style.backgroundColor = "#fef9e7";
            statusDiv.style.color = "#f39c12";
            statusDiv.innerHTML = `⚠️ Proceed with Caution <br> Score: <span style="font-size: 18px; color: #e67e22;">${data.score}/100</span>`;
        } else {
            statusDiv.style.backgroundColor = "#fdedec";
            statusDiv.style.color = "#c0392b";
            statusDiv.innerHTML = `❌ Highly Malicious! <br> Score: <span style="font-size: 18px; color: #e74c3c;">${data.score}/100</span>`;
        }
    })
    .catch(error => {
        const statusDiv = document.getElementById("link-lens-status");
        statusDiv.style.backgroundColor = "#fdedec";
        statusDiv.style.color = "#c0392b";
        statusDiv.innerHTML = `❌ Connection Error!`;
        console.error("Link-Lens Error:", error);
    });
}
