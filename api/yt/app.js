const copyright = "SISTEMA DESENVOLVIDO POR RENILDOMARCIO";
const youtubeApiUrl = "https://psycodeliccircus.github.io/api/yt/";
const referenceUrl = "https://psycodeliccircus.github.io/api/";
const prefixUrl = "https://psycodeliccircus.github.io/";
const hostUrl = "//psycodeliccircus.github.io";
const hostName = "psycodeliccircus.github.io";

if (window.location.hostname === "psycodeliccircus.github.io") {
    $(document).ready(function () {
        (function () {
            console.log("API READY", youtubeApiUrl);

            const searchInput = $("#searchTxt");
            const resultsDiv = $("#results");
            const searchButton = $("#searchBtn");
            const youtubeSearchEndpoint = "https://www.googleapis.com/youtube/v3/search";
            const collectionElement = $(".collection");

            const apiKeys = [
                "AIzaSyAq-6L3AEKpVdswOgdAGMAtC93IbVqeV3g",
                "AIzaSyCkcGCPkvj_2YdFHRF1oHEYFnvZ7y3EcW8",
                "AIzaSyAJe_h5NLZi4w4whlm-Zl2mWP76Z-FA2nA"
            ];

            const selectedApiKey = getRandomElement(apiKeys);
            console.log(searchQuery);

            const urlParams = new URL(document.location).searchParams;
            const searchQuery = urlParams.get("x");

            if (searchQuery) {
                const requestData = {
                    maxResults: "8",
                    part: "snippet",
                    q: searchQuery,
                    type: "",
                    key: selectedApiKey
                };

                $.get(youtubeSearchEndpoint, requestData, function (response) {
                    $.post("https://fdev-carcontrol/catchSearch", JSON.stringify(response.items));
                });
            }
        })();
    });

    function removeEmoji(text) {
        let cleanedText = text;
        const numEmojiRegex = /[\u0023-\u0039]\ufe0f?\u20e3/g;
        const extendedEmojiRegex = /\p{Extended_Pictographic}/gu;
        const emojiComponentRegex = /\p{Emoji_Component}/gu;

        if (numEmojiRegex.test(cleanedText)) {
            cleanedText = cleanedText.replace(numEmojiRegex, "");
        }
        if (extendedEmojiRegex.test(cleanedText)) {
            cleanedText = cleanedText.replace(extendedEmojiRegex, "");
        }
        if (emojiComponentRegex.test(cleanedText)) {
            for (const match of cleanedText.match(emojiComponentRegex) || []) {
                if (/[\d|*|#]/.test(match)) continue;
                cleanedText = cleanedText.replace(match, "");
            }
        }
        return cleanedText;
    }

    const removeAllEmojis = text => {
        if (!text) return "";
        return text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, "");
    };

    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}
