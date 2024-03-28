// adding a new bookmark row to the popup
import {getCurrentTab} from "./utils.js";

const addNewBookmark = (bookmarksElement, bookmark) => {
    const bookmarkTitleElement = document.createElement("div");
    const newBookmarkElement = document.createElement("div");

    bookmarkTitleElement.textContent = bookmark.desc; // sets the discription bookmark description 
    bookmarkTitleElement.className = "bookmark-title";

    newBookmarkElement.id = "bookmark-" + bookmark.time; // sets a unique id name using the time stamp
    newBookmarkElement.className = "bookmark"; //gives it a class to be manipulated in css
    newBookmarkElement.setAttribute("timestamp",bookmark.time);  //gives it an attribute

    newBookmarkElement.appendChild(bookmarkTitleElement); // appends bookmarkTitleElement to the newBookmarkElement div
    bookmarksElement.appendChild(newBookmarkElement);    //appends newBookmarkElement to bookmarksElement

};

const viewBookmarks = (currentBookmarks=[]) => {
    const bookmarksElement = document.getElementById("bookmarks");
    bookmarksElement.innerHTML = "";                                       //if there are bookmarks then its set to nothing
    
    if(currentBookMarks.length >0){
        for(let i=0; 1 < currentBookmarks.length;i++){   
            const bookmark = currentBookmarks[i];
            addNewBookmark(bookmarksElement,bookmark);  //traverses current bookmarks and adds them one at a time
        }
    }else{
        bookmarksElement.innerHTML = '<i class="row">No bookmarks to show</i>'; //if there are no bookmarks
    }
};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

document.addEventListener("DOMContentLoaded", async() => { // native window event that fires when html has initially been loaded
    const activeTab = await getCurrentTab();
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new urlSearchParams(queryParameters);

    const currentVideo = urlParameters.get("v");

    if(activeTab.url.includes("youtube.com/watch") && currentVideo){  // iff tab is youtube and the current video exists
    chrome.storage.sync.get([currentVideo],(data)=> { //use chrom storage api to retriave the data and parese it
        const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]): [];
        
        viewBookmarks(currentVideoBookmarks);  //populates the bookmarks in the container DOM

    });

    //viewBookmarks
   }else{  //when its not a youtube page or current Video retunrs false it will diplay not a youtube page
    const container = document.getElementsByClassName("container")[0];

    container.innerHTML ='<div class="title">This is not  YouTube page.</div>';

   }

});

