export async function getCurrentTab() {  // grabs the current tab    this is straight from chrome documentation
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });

    return tabs[0];
}
