chrome.tabs.onUpdate.addListener((tabId, tab) => {
    if(tab.url && tab.url.includes("youtube.com/watch")){
        const queryParameters =tab.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);
        console.log(urlParameters);

        chrom.tabs.sendMessage(tabId, {
            type:"NEW",                      //type of the event
            videoId: urlParameters.get("v")   // unique video id we will be storing
        })
    }
});