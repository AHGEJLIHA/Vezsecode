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
    },
    ru: {
        title: 'Название формы',
        first_name: 'Имя',
        last_name: 'Фамилия',
        email: 'E-mail',
        company: 'Компания',
        city: 'Город',
        message: 'Текст сообщения',
    },
    ar: {
        title: 'لقب شكل',
        first_name: 'اسم',
        last_name: 'لقب',
        email: 'البريد الإلكتروني',
        company: 'شركة',
        city: 'مدينة',
        message: 'رسالة',
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
        .concat(Array.from(document.getElementById('title')))
        .forEach((element) => _translateElementValue(element, languages, lang))
}

/**
 * Replace heading/paragraph element`s value to its translation
 * @param {HTMLElement} element - HTMLParagraphElement or HTMLHeadingElement
 * @param {Object} languages - localization object
 * @param {String} lang - language to change in ISO 639-1 format
 */
function _translateElementValue(element, languages, lang) {
    if (!element.id) throw 'Element has no id'
    if (languages[lang] === null) throw `There is no ${lang} in localization`
    if (languages[lang][element.id] === null) throw `There is no translation for ${element.id}`
    if (['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].indexOf(element.nodeName) < 0)
        throw TypeError('Missing element type')
    element.firstChild.nodeValue = languages[lang][element.id]
}
