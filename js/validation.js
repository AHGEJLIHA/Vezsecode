document.getElementById('userInfo').onsubmit = (event) => {
    const inputs = document
        .querySelectorAll('input')
        .forEach((element) => {
            if (element.classList.contains('invalid-value'))
                element.classList.remove('invalid-value')
            if (
                element.type !== 'email' &&
                !_isValueValid(element.value)
            )
                element.classList.add('invalid-value')
        })

    return false
}

/**
 *
 * @param {String} value - the value to validate
 * @returns {Boolean} true - if value contains no more
 *  than 3 equal symbols in a row (except russian 'O')
 *  and no more than 1 non-letter-degree symbol
 */
function _isValueValid(value) {
    // counting equal symbols in a row
    let equalSymbolsCount = 1
    // counting non-letter-degree symbols
    let nonWordSymbolsCount = 0
    let previousSymbol = ''
    // check that char is word-degree symbol
    const wordSymbolsRegExp = new RegExp(
        /[A-Za-zА-Яа-яЁё0-9]/
    ).compile()
    const forbiddenSequence = new RegExp(/ООО[О]+/)
    if (forbiddenSequence.test(value)) return false
    Array.from(value).forEach((char) => {
        // is char letter or degree
        if (!wordSymbolsRegExp.test(char)) nonWordSymbolsCount++
        // is there 3 in a row equal symbol
        else if (equalSymbolsCount > 3 && previousSymbol !== 'О')
            return false
        // save previous char
        else if (previousSymbol === '') previousSymbol = char
        // count equal symbols
        else if (previousSymbol === char) equalSymbolsCount++
        // count anew
        else {
            previousSymbol = char
            equalSymbolsCount = 1
        }
    })

    return equalSymbolsCount <= 3 && nonWordSymbolsCount <= 1
}
