module.exports = () => {
    return {
        "type": "Alexa.Presentation.APL.ExecuteCommands",
        "token": "videoplayer",    
        "commands": [
            {
                "type": "ControlMedia",
                "componentId": "videoPlayer",
                "command": "previous"
            },
            // On FireTV Stick 4K, "previous" does not autoplay
            {
                "type": "ControlMedia",
                "componentId": "videoPlayer",
                "command": "play"
            },
            {
                "type": "showOverlayShortly",
                "delay": "500"
            }
        ]
    };
};