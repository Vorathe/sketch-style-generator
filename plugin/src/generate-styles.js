import userDefaults from './user-defaults.js'

export default function(context) {
    let colors = [];

    context.document.showMessage('👍 Generating Styles')

    context.document.pages().forEach((page, i) => {
        page.layers().forEach((layer, i) => {
            layer.style().fills().forEach((attr, i) => {
                colors.push(attr.color().RGBADictionary())
            })

            layer.style().borders().forEach((attr, i) => {
                colors.push(attr.color().RGBADictionary())
            })

            layer.style().shadows().forEach((attr, i) => {
                colors.push(attr.color().RGBADictionary())
            })

            layer.style().innerShadows().forEach((attr, i) => {
                colors.push(attr.color().RGBADictionary())
            })
        })
    })

    colors = colors.map(({ r, g, b, a }) => `rgba(${_c(r)}, ${_c(g)}, ${_c(b)}, ${a})`).filter(_unique)

    fetch(userDefaults.getPreference('repourl'), { method: 'POST', body: JSON.stringify(colors) })
        .then(res => res.text())
        .then(text => {
            log(text)

            context.document.showMessage('👍 Finished. Styles should be in Github now!')
        })
        .catch(text => {
            log(text)

            context.document.showMessage('🛑 Minor issue. Try again.')
        })
}

function _c (v) {
    return Math.round(255 * v)
}

function _unique (value, index, self) {
    return self.indexOf(value) === index;
}
