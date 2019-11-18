module.exports = () => {
    return {
        "type": "Alexa.Presentation.APL.ExecuteCommands",
        "token": "videoplayer",    
        "commands": [
            {
                "type": "ControlMedia",
                "componentId": "videoPlayer",
                "command": "rewind"
            },
            // On FireTV Stick 4K, "rewind" does not autoplay
            {
                "type": "ControlMedia",
                "componentId": "videoPlayer",
                "command": "play"
            },
            {
                "type": "showOverlayShortly"
            }
        ]
    };
};