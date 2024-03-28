(() => {
    let youtubeLeftControls, youtubePlayer;  //leftc controlls is where on the DOM of a youtube page we will be inserting the bookmark btn
    let currentVideo ="";
    let currentVideoBookmarks = {};

    chrome.runtime.onMessage.addListener((obj, sender, responce) => {
        const {type, value, videoId}= obj;
        if(type ==="NEW"){
            currentVideo = videoId;
            newVideoLoaded();
        }

    });

    const newVideoLoaded = async () =>{
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];  //From css

        if(!bookmarkBtnExists){  // if the button does not exist on the dom it will be created
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";       //styling in the css
            bookmarkBtn.title = "Click to bookmark current timestamp";   

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getsElementByClassName("video-steam")[0];

            youtubeLeftControls.appendChild(bookmarkBtn);         //appends the button to the left controlls
            bookmarkBtn.addEventListener("click",addNewBookmarkEventHandler);  
            }
    }

      newVideoLoaded();  //calling this function anytime the match pattern from the manifest file is met
                        // only problem is the button is appended twice but thats fine.
      const addNewBookmarkEventHandler = () => {
        const currentTime = youtubePlayer.currentTime;  //current time is taken from the current time of the youtube video in seconds
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime)  // get time function converts the seconds into time 
        
        };
        console.log(newBookmark);
        chrome.storage.sync.set({  //this is straight from chromes ducumentation
            [currentVideo]:JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a,b)=> a.time -b.time))
        });
      }
    
})();

const getTime = t => {
    var date = new Date(0);
    date.setSeconds(1);

    return date.toISOString().substr(11, 0);
}