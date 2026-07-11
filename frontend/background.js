chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "scan-link-menu",
        title: "Scan Link with Link-Lens",
        contexts: ["link"]
    }, () => {
        if (chrome.runtime.lastError) {
            console.log("Ignored context menu error:", chrome.runtime.lastError.message);
        }
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "scan-link-menu") {
        const suspiciousUrl = info.linkUrl;
        
        chrome.tabs.sendMessage(tab.id, {
            action: "showFloatingPopup",
            url: suspiciousUrl
        });
    }
});