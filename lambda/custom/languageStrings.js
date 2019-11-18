/* *
 * We create a language strings object containing all of our strings.
 * The keys for each string will then be referenced in our code, e.g. handlerInput.t('WELCOME_MSG').
 * The localisation interceptor in index.js will automatically choose the strings
 * that match the request's locale.
 * */

module.exports = {
    en: {
        translation: {
            NO_SCREEN_MSG: "Sorry, this skill requires a screen.",
            HELP_MSG: 'This skill launches a playlist with several videos. At any time, you can say : pause, next, previous or, stop.',
            GOODBYE_MSG: 'Goodbye!',
            REFLECTOR_MSG: 'You just triggered {{intentName}}',
            FALLBACK_MSG: 'Sorry, I don\'t know about that. Please try again.',
            ERROR_MSG: 'Sorry, I had trouble doing what you asked. Please try again.'
        }
    },
    fr: {
        translation: {
            NO_SCREEN_MSG: "Désolé, cette skill n'est disponible que sur les appareils avec écran.",
            HELP_MSG: 'Cette skill lance une playlist de vidéos. Vous pouvez dire à tout instant : pause, suivant, précédent ou, stop.',
            GOODBYE_MSG: 'Au revoir!',
            REFLECTOR_MSG: 'Vous avez invoqué l\'intention {{intentName}}',
            FALLBACK_MSG: 'Désolé, je ne sais pas. Pouvez-vous reformuler?',
            ERROR_MSG: 'Désolé, je n\'ai pas compris. Pouvez-vous reformuler?'
        }
    }
}