chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        let site = request.site
        sendResponse();
        getPGN(site).then((data) => {
            chrome.runtime.sendMessage({
                message: data
            }, (response) => {});
        });
    }
)
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function getPGN(site) {
    if (site == "chess.com/game/live") {
        document.getElementsByClassName("icon-font-chess share live-game-buttons-button")[0].click();
        await sleep(200);
        var pgnVal = document.getElementsByClassName("share-menu-tab-image-component share-menu-tab")[0].getAttribute("pgn");
        return pgnVal
    } else if (site == "chess.com/live/game") {
        var a = document.getElementsByClassName("daily-game-footer-middle")[0].getElementsByTagName("div")[0].getElementsByTagName("a")[0];
        a.click();
        await sleep(200);
        var pgnVal = document.getElementsByClassName("share-menu-tab-image-component share-menu-tab")[0].getAttribute("pgn");
        return pgnVal
    }
}