# Alexa APL Video Skill Sample

Simple skill that plays a list of videos using Alexa Presentation Language.

Features:
* Shows title and subtitle for a few seconds at the beginning of each video
* Supports voice commands for stop/pause/resume/next/previous/start over
* Touching anywhere on the screen (or the action button on a FireTV remote) shows pause/previous/next buttons for a few seconds


## Additional resources

* APL Video component:
https://developer.amazon.com/docs/alexa-presentation-language/apl-video.html
 
* Default play/pause/previous/next controls from package alexa-layouts (APL 1.1):
https://developer.amazon.com/fr/docs/alexa-presentation-language/apl-transport-controls-layout.html
 
* To keep track of playback, use APL Video play/pause/end/timeUpdate/trackUpdate handlers to send APL SendEvent commands:
https://developer.amazon.com/fr/docs/alexa-presentation-language/apl-standard-commands.html#sendevent-command

* AlexaTransportControl next/previous buttons pause the video by default. Modified the default behaviour with a custom layout.
* ControlMedia next/previous/rewind autoplays on Show but not FireTV. Added a play command.

## Test locally

* Run the server: `cd lambda/custom && node local-debugger.js --portNumber 8080 --skillEntryFile ./index.js)`. You can replace `node` by `nodemon` after installing it to automatically restart the server when files change.
* Create a tunnel from a public HTTPS endpoint: `ngrok http --region=eu 8080`
* Update the skill endpoint
