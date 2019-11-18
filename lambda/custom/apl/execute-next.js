module.exports = () => {
    return {
        "type": "Alexa.Presentation.APL.ExecuteCommands",
        "token": "videoplayer",    
        "commands": [
            {
                "type": "Sequential",
                "commands": [
                    {
                        "type": "ControlMedia",
                        "componentId": "videoPlayer",
                        "command": "next"
                    },
                    // On FireTV Stick 4K, "next" does not autoplay
                    {
                        "type": "ControlMedia",
                        "componentId": "videoPlayer",
                        "command": "play"
                    },
                    {
                        "type": "showOverlayShortly",
                        // Add delay to avoid race condition
                        "delay": "500"
                    }
                ]
            }
        ]
    };
};