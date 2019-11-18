// // Sample playlist
// const playlist = [
//     {
//         "url": "https://skill-sample-apl-video.s3-eu-west-1.amazonaws.com/northernspain.mp4",
//         "title": "Northern Spain",
//         "subtitle": "Drone footage of northern Spain landscapes"
//     },
//     {
//         "url": "https://skill-sample-apl-video.s3-eu-west-1.amazonaws.com/Driving_timelapse_CCBY_NatureClip.mov",
//         "title": "Driving timelapse",
//         "subtitle": "Timelapse video of a country road in the UK"
//     }
// ];

module.exports = (playlist) => {
    return {
        "type": "Alexa.Presentation.APL.RenderDocument",
        "token": "videoplayer",    
        "document": {
            "type": "APL",
            "version": "1.1",
            "import": [
                {
                    "name": "alexa-layouts",
                    "version": "1.1.0"
                }
            ],
            "layouts": {
                "CustomAlexaTransportControls": {
                    "description": "Modified AlexaTransportControls from alexa-layouts 1.1.0 to avoid pausing after pressing previous/next button",
                    "parameters": [
                    {
                        "name": "secondaryControls",
                        "type": "string",
                        "default": "skip",
                        "description": "The type of secondary controls to use. Default is skip (foward and backwards). Valid options are skip | jump10 | jump30 | none"
                    },
                    {
                        "name": "primaryControlSize",
                        "type": "dimension",
                        "default": "@transportPrimaryButtonSize",
                        "description": "The height and width for the primary button."
                    },
                    {
                        "name": "secondaryControlSize",
                        "type": "dimension",
                        "default": "@transportSecondaryButtonSize",
                        "description": "The height and width for the secondary buttons."
                    },
                    {
                        "name": "mediaComponentId",
                        "type": "string",
                        "description": "The id of the media playing component"
                    },
                    {
                        "name": "autoplay",
                        "type": "boolean",
                        "default": false,
                        "description": "Determines the starting state of the play/pause icon. This should match the autoplay state of the media playing component. Defaults to false. "
                    },
                    {
                        "name": "playPauseToggleButtonId",
                        "type": "string",
                        "default": "alexaPlayPauseToggleButton",
                        "description": "Optional id to set on the Play/Pause Toggle Button. This is useful when displaying mutiple Videos on one screen, each with their own transport controls."
                    }
                    ],
                    "items": [
                    {
                        "type": "Container",
                        "direction": "row",
                        "alignItems": "center",
                        "paddingTop": "@transportLayoutMargins",
                        "paddingBottom": "@transportLayoutMargins",
                        "paddingLeft": "@transportLayoutMargins",
                        "paddingRight": "@transportLayoutMargins",
                        "items": [
                        {
                            "when": "${secondaryControls == '' || secondaryControls == 'skip'}",
                            "type": "SecondaryControlsButton",
                            "buttonSize": "${secondaryControlSize}",
                            "icon": "@urlPreviousIcon",
                            "iconFocused": "@urlPreviousIconFocused",
                            "id": "secondaryControlLeft",
                            "pressAction": [
                                {
                                    "type": "ControlMedia",
                                    "componentId": "${mediaComponentId}",
                                    "command": "previous"
                                },
                                {
                                    "type": "ControlMedia",
                                    "componentId": "${mediaComponentId}",
                                    "command": "play"
                                }
                            ]
                        },
                        {
                            "type": "Frame",
                            "spacing": "${secondaryControls == 'none' ? '0dp' : @transportButtonSpacing}",
                            "item": {
                                "type": "PlayPauseToggleButton",
                                "buttonSize": "${primaryControlSize}",
                                "componentId": "${mediaComponentId}",
                                "autoplay": "${autoplay}",
                                "playPauseToggleButtonId": "${playPauseToggleButtonId}"
                            }
                        },
                        {
                            "when": "${secondaryControls == '' || secondaryControls == 'skip'}",
                            "type": "Frame",
                            "spacing": "@transportButtonSpacing",
                            "item": {
                                "type": "SecondaryControlsButton",
                                "buttonSize": "${secondaryControlSize}",
                                "icon": "@urlNextIcon",
                                "iconFocused": "@urlNextIconFocused",
                                "id": "secondaryControlRight",
                                "pressAction": [
                                    {
                                        "type": "ControlMedia",
                                        "componentId": "${mediaComponentId}",
                                        "command": "next"
                                    },
                                    {
                                        "type": "ControlMedia",
                                        "componentId": "${mediaComponentId}",
                                        "command": "play"
                                    }
                                ]
                            }
                        }
                        ]
                    }
                    ]
                }
            },
            "mainTemplate": {
                "parameters": [
                    "payload"
                ],
                "items": [
                    {
                        "type": "Container",
                        "direction": "column",
                        "height": "100vh",
                        "width": "100vw",
                        "items": [
                            {
                                "type": "TouchWrapper",
                                "id": "videoWideToggleButton",
                                "width": "100vw",
                                "height": "100vh",
                                "items": [
                                    {
                                        "type": "Video",
                                        "id": "videoPlayer",
                                        "width": "100vw",
                                        "height": "100vh",
                                        "autoplay": true,
                                        "audioTrack": "foreground",
                                        "source": "${payload.videoplayerData.properties.playlist}",
                                        "onPause": [
                                            {
                                                "type": "Parallel",
                                                "commands": [
                                                    // Show the "play" icon
                                                    {
                                                        "type": "SetState",
                                                        "componentId": "alexaPlayPauseToggleButton",
                                                        "state": "checked",
                                                        "value": true
                                                    },
                                                    // Show the overlay with the title until the user performs an action
                                                    {
                                                        "type": "SetValue",
                                                        "componentId": "overlayContainer",
                                                        "property": "display",
                                                        "value": "normal"
                                                    },
                                                    {
                                                        "type": "SetFocus",
                                                        "componentId": "alexaPlayPauseToggleButton"
                                                    },
                                                    {
                                                        "type": "SendEvent",
                                                        "arguments": [ "trackIndex: ${event.trackIndex}, trackCount: ${event.trackCount}, currentTime: ${event.currentTime}, duration: ${event.duration}, paused: ${event.paused}, ended: ${event.ended}" ]
                                                    }
                                                ]
                                            }
                                            
                                        ],
                                        "onPlay": [
                                            {
                                                "type": "Parallel",
                                                "commands": [
                                                    // Show the "pause" icon
                                                    {
                                                        "type": "SetState",
                                                        "componentId": "alexaPlayPauseToggleButton",
                                                        "state": "checked",
                                                        "value": false
                                                    },
                                                    // Update the title and subtitle texts
                                                    {
                                                        "type": "SetValue",
                                                        "componentId": "title",
                                                        "property": "text",
                                                        "value": "${payload.videoplayerData.properties.playlist[event.trackIndex].title}"
                                                    },
                                                    {
                                                        "type": "SetValue",
                                                        "componentId": "subtitle",
                                                        "property": "text",
                                                        "value": "${payload.videoplayerData.properties.playlist[event.trackIndex].subtitle}"
                                                    },
                                                    {
                                                        "type": "showOverlayShortly"
                                                    },
                                                    {
                                                        "type": "SendEvent",
                                                        "arguments": [ "trackIndex: ${event.trackIndex}, trackCount: ${event.trackCount}, currentTime: ${event.currentTime}, duration: ${event.duration}, paused: ${event.paused}, ended: ${event.ended}" ]
                                                    }
                                                ]
                                            }
                                        ],
                                        "onEnd": [
                                            {
                                                "type": "SendEvent",
                                                "arguments": [ "trackIndex: ${event.trackIndex}, trackCount: ${event.trackCount}, currentTime: ${event.currentTime}, duration: ${event.duration}, paused: ${event.paused}, ended: ${event.ended}" ]
                                            }
                                        ],
                                        "onTimeUpdate": [
                                            {
                                                "type": "SendEvent",
                                                "arguments": [ "trackIndex: ${event.trackIndex}, trackCount: ${event.trackCount}, currentTime: ${event.currentTime}, duration: ${event.duration}, paused: ${event.paused}, ended: ${event.ended}" ]
                                            }
                                        ],
                                        "onTrackUpdate": [
                                            // Update the title and subtitle texts
                                            {
                                                "type": "SetValue",
                                                "componentId": "title",
                                                "property": "text",
                                                "value": "${payload.videoplayerData.properties.playlist[event.trackIndex].title}"
                                            },
                                            {
                                                "type": "SetValue",
                                                "componentId": "subtitle",
                                                "property": "text",
                                                "value": "${payload.videoplayerData.properties.playlist[event.trackIndex].subtitle}"
                                            },
                                            {
                                                "type": "showOverlayShortly"
                                            },
                                            {
                                                "type": "SendEvent",
                                                "arguments": [ "trackIndex: ${event.trackIndex}, trackCount: ${event.trackCount}, currentTime: ${event.currentTime}, duration: ${event.duration}, paused: ${event.paused}, ended: ${event.ended}" ]
                                            }
                                        ]
                                    }
                                ],
                                "onPress": [
                                    {
                                        "type": "showOverlayShortly"
                                    }
                                ]
                            },
                            {
                                "type": "Container",
                                "id": "overlayContainer",
                                "position": "absolute",
                                "display": "invisible",
                                "width": "100vw",
                                "height": "100vh",
                                "alignItems": "center",
                                "items": [
                                    {
                                        "type": "Text",
                                        "id": "title",
                                        "text": " ",
                                        "width": "100vw",
                                        "fontSize": "8vh",
                                        "paddingTop": "3vh",
                                        "paddingLeft": "3vh"
                                    },
                                    {
                                        "type": "Text",
                                        "id": "subtitle",
                                        "text": " ",
                                        "width": "100vw",
                                        "fontSize": "5vh",
                                        "paddingTop": "1vh",
                                        "paddingLeft": "3vh"
                                    },
                                    {
                                        "type": "CustomAlexaTransportControls",
                                        "position": "absolute",
                                        "bottom": "0",
                                        "autoplay": true,
                                        "primaryControlSize": "10vh",
                                        "secondaryControlSize": "10vh",
                                        "mediaComponentId": "videoPlayer",
                                        "playPauseToggleButtonId": "alexaPlayPauseToggleButton"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            "commands": {
                // Custom command that shows an overlay container with title and pause/previous/next buttons
                "showOverlayShortly": {
                    "parameters": [ 
                        {
                            "name": "delay",
                            "type": "number",
                            "default": 0
                          }
                    ],
                    "commands": [
                        {
                            "type": "Sequential",
                            "delay": "${delay}",
                            "commands": [
                                {
                                    "type": "SetValue",
                                    "componentId": "overlayContainer",
                                    "property": "display",
                                    "value": "normal"
                                },
                                {
                                    "type": "SetFocus",
                                    "componentId": "alexaPlayPauseToggleButton"
                                },
                                {
                                    "type": "SetValue",
                                    "componentId": "overlayContainer",
                                    "property": "display",
                                    "value": "invisible",
                                    "delay": "3000"
                                }
                            ]
                        }
                    ]
                }
            }
        },
        "datasources": {
            "videoplayerData": {
                "type": "object",
                "properties": {
                    "playlist": playlist
                }
            }
        }
    };
};