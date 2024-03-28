(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo ="";

    chrome.runtime.onMessage.addListener((obj, sender, responce) => {
        const {type, value, videoId}= obj;
        if(type ==="NEW"){
            currentVideo = videoId;
            newVideoLoaded();
        }

    });

    const newVideoLoaded = () =>{
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];  //From css

        if(!bookmarkBtnExists){  // if the button does not exist on the dom it will be created
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";       //styling in the css
            bookmarkBtn.title = "Click to bookmark current timestamp";   
        }
    }


    
})();

const getTime = t => {
    var date = new Date(0);
    date.setSeconds(1);

    return date.toISOString().substr(11, 0);
}