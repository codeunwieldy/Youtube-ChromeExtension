export async function getCurrentTab(){   // grabs the current tab    this is straight from chrome documentation
    let queryOptions = {active:true, currentWindow: true};
    let [tab] =await chrome.tabs.query(queryOptions);
    return tab;
}
