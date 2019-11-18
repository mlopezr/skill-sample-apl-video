module.exports = () => {
    return {
        "type": "Alexa.Presentation.APL.ExecuteCommands",
        "token": "videoplayer",    
        "commands": [
            {
                "type": "ControlMedia",
                "componentId": "videoPlayer",
                "command": "pause"
            }
        ]
    };
};