(() => {
    let youtubeLeftControls, youtubePlayer;  //leftc controlls is where on the DOM of a youtube page we will be inserting the bookmark btn
    let currentVideo ="";
    let currentVideoBookmarks = [];

    chrome.runtime.onMessage.addListener((obj, sender, responce) => {
        const {type, value, videoId}= obj; //takes values out of object
        if(type ==="NEW"){
            currentVideo = videoId;
            newVideoLoaded();
        }else if(type ==="PLAY"){
            youtubePlayer.currentTime = value; //value is time 
        }else if(type ==="DELETE"){
            currentVideoBookmarks = currentVideoBookmarks.filter((b)=>b.time != value); //filtering by time so the time does not equal time being passed in which is the one being deleted 
            chrome.storage.sync.set({ [currentVideo]: JSON.stringify(currentVideoBookmarks) }) ;   //syncs chrome storage so if the page reloads the deleted part does not show up

            responce(currentVideoBookmarks);

        }

    });

    const fetchBookmarks = () =>{       
        return new Promise ((resolve)=>{      //retunr promise so we can resolve async
            chrome.storage.sync.get([currentVideo], (obj) =>{  //gets from chrome storage and takes an object
                resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]): []);  // resolve to find any bookmarks when indexing using the current video
                                                                                 //if it find it then the data will be parsed and if not will return empty array

            });
        });
    };

    const newVideoLoaded = async () => {
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
        currentVideoBookmarks = await fetchBookmarks();
    
        
    
        
    
        if (!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement("img");
    
            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark current timestamp";
    
            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0]; // Get the video player element
            youtubeLeftControls.appendChild(bookmarkBtn);
            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
        }
    }
        newVideoLoaded();  //calling this function anytime the match pattern from the manifest file is met
            // only problem is the button is appended twice but thats fine.

      
        const addNewBookmarkEventHandler = async () => {
        const currentTime = youtubePlayer.currentTime;  //current time is taken from the current time of the youtube video in seconds
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime)  // get time function converts the seconds into time 
        
        };

        currentVideoBookmarks = await fetchBookmarks(); // resolves promise
        
        chrome.storage.sync.set({  //this is straight from chromes ducumentation
            [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time)) //stores the data in JSON,
        });                                                                                                     // adds to the current bookmakr list the times of bookmarks in order
      };
    
})();

const getTime = t => {
    var date = new Date(0);
    date.setSeconds(t);

    return date.toISOString().substr(11, 0);
}