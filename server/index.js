const PORT = process.env.PORT || 3000;

const express = require('express')
const app = express()

app.post('/', processColors)
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

function processColors (req, res) {
    let body = [];

    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        let colors = formatColors(body)
        let sass = createSass(colors)

        res.send(sass)
    });
}

function formatColors (body) {
    let json = JSON.parse(body)
    let colors = {}

    json.forEach((v, k) => {
        colors[`color${k + 1}`] = v
    })

    return colors
}

function createSass (obj) {
    let sass = ''

    Object.keys(obj).forEach(k => {
        sass += `$${k}: ${obj[k]};\n`
    })

    return sass
}

function checkinSass () {

}