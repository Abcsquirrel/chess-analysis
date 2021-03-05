chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        sendResponse()
        let pgn = request.value;
        var formData = new FormData();
        formData.append("pgn", pgn);
        const Http = new XMLHttpRequest();
        Http.open("POST", "https://lichess.org/import");
        Http.send(formData);
        Http.onload = () => {
            window.location.replace(Http.responseURL)
        }
    }
)