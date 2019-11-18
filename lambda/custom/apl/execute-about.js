module.exports = () => {
    return {
        "type": "Alexa.Presentation.APL.ExecuteCommands",
        "token": "videoplayer",    
        "commands": [
            // Pauses for 3 seconds for users to be able to read the overlay
            // You can add SpeakItem command to provide a voice description
            {
                "type": "ControlMedia",
                "componentId": "videoPlayer",
                "command": "pause"
            },
            {
                "type": "ControlMedia",
                "componentId": "videoPlayer",
                "command": "play",
                "delay": "3000"
            }
        ]
    };
};