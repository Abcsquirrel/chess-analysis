chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        sendResponse();
        var pgn = request.message;
        chrome.tabs.query({
            active: true
        }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                value: pgn
            }, (response) => {})
        })
    }
)
chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.query({
        active: true
    }, (tabs) => {
        var curTab = tabs[0];
        const re = /(chess.com\/game\/live)|(chess.com\/live\/game)/;
        if (re.test(curTab.url)) {
            var match = curTab.url.match(re)[0];
            chrome.tabs.create({
                url: "https://lichess.org/paste",
                active: true
            });
            setTimeout(() => {
                chrome.tabs.sendMessage(curTab.id, {
                    value: "GET PGN",
                    site: match
                }, (response) => {})
            }, 200);


        }
    })
})