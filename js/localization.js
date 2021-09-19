// import languages from '../assets/localization.json'

const languages = {
    en: {
        title: 'Form title',
        first_name: 'first name',
        last_name: 'last name',
        email: 'email',
        company: 'company',
        city: 'city',
        message: 'message',
        send: 'send',
    },
    ru: {
        title: 'Название формы',
        first_name: 'Имя',
        last_name: 'Фамилия',
        email: 'E-mail',
        company: 'Компания',
        city: 'Город',
        message: 'Текст сообщения',
        send: 'Отправить',
    },
    ar: {
        title: 'لقب شكل',
        first_name: 'اسم',
        last_name: 'لقب',
        email: 'البريد الإلكتروني',
        company: 'شركة',
        city: 'مدينة',
        message: 'رسالة',
        send: 'يرسل',
    },
}

const container = document.getElementById('switcherContainer')
Array.from(container.children).forEach((element) =>
    element.addEventListener('change', () => {
        switchLanguage(element.value)
    })
)

/**
 * Translate each heading/paragraph element on the page
 * @param {String} lang - language to change in ISO 639-1 format
 */
function switchLanguage(lang) {
    Array.from(document.getElementsByTagName('p'))
        .concat([document.getElementById('title'), document.getElementById('send')])
        .forEach((element) => _translateElementValue(element, languages, lang))
}

/**
 * Replace heading/paragraph element`s value to its translation
 * @param {HTMLElement} element - HTMLParagraphElement || HTMLHeadingElement || HTMLInputElement
 * @param {Object} languages - localization object
 * @param {String} lang - language to change in ISO 639-1 format
 */
function _translateElementValue(element, languages, lang) {
    _checkElementLocalization(element, languages, lang)
    if (element.nodeName === 'INPUT') element.value = languages[lang][element.id]
    else element.firstChild.nodeValue = languages[lang][element.id]
}

/**
 * Check that element has id, language is in dictionary, element could be translated and has correct type
 * @param {HTMLElement} element - element to check
 * @param {Object} languages - localization object
 * @param {String} lang - language to change in ISO 639-1 format
 */
function _checkElementLocalization(element, languages, lang) {
    if (!lang) throw 'Incorrect language'
    if (lang.length != 2) throw TypeError('Incorrect language format, should be in ISO 639-1')
    if (!element.id) throw 'Element has no id'
    if (languages[lang] === null) throw `There is no ${lang} in localization`
    if (languages[lang][element.id] === null) throw `There is no translation for ${element.id}`
    if (
        element.nodeName !== 'INPUT' &&
        ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].indexOf(element.nodeName) < 0
    )
        throw TypeError('Missing element type')
}
