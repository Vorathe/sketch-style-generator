const fetch = require('node-fetch')

// const user = 'vorathe'
// const repo = 'sketch-style-generator'
// const accessToken = '936490c4929b3d22634c991b714f978483decf23'
// const branch = 'master'
const PORT = process.env.PORT || 3000
const USER = process.env.USER || ''
const REPO = process.env.REPO || ''
const BRANCH = process.env.BRANCH || ''
const ACCESSTOKEN = process.env.ACCESSTOKEN || ''

console.log(PORT)
console.log(USER)
console.log(REPO)
console.log(BRANCH)
console.log(ACCESSTOKEN)

const express = require('express')
const app = express()

app.get('/', (req, res) => { res.send('hello world') })
app.post('/', processColors)
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

function processColors (req, res) {
    let body = [];

    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        let colors = _formatColors(body)
        let sass = _createSass(colors)

        _checkinSass(sass, (data) => {
            res.send(data)
        })
    });
}

function _formatColors (body) {
    let json = JSON.parse(body)
    let colors = {}

    json.forEach((v, k) => {
        colors[`color${k + 1}`] = v
    })

    return colors
}

function _createSass (obj) {
    let sass = ''

    Object.keys(obj).forEach(k => {
        sass += `$${k}: ${obj[k]};\n`
    })

    return sass
}

function _checkinSass (content, callback) {
    let latestSha = ''

    getLatestSha()
        .then(data => {
            latestSha = data

            return data
        })
        .then(getBaseTreeSha)
        .then(baseTreeSha => postFilesToTree(baseTreeSha, content))
        .then(fileTreeSha => postNewTree(fileTreeSha, latestSha))
        .then(postNewCommit)
        .then(data => {
            callback(data)
        })
}

function getLatestSha() {
    return fetch(`https://api.github.com/repos/${USER}/${REPO}/git/refs/heads/${BRANCH}?access_token=${ACCESSTOKEN}`).then(res => res.json()).then(data => data.object.sha)
}

function getBaseTreeSha(latestSha) {
    return fetch(`https://api.github.com/repos/${USER}/${REPO}/git/commits/${latestSha}?access_token=${ACCESSTOKEN}`).then(res => res.json()).then(data => data.tree.sha)
}

function postFilesToTree(baseTreeSha, content) {
    return fetch(`https://api.github.com/repos/${USER}/${REPO}/git/trees?access_token=${ACCESSTOKEN}`, {
        method: 'POST',
        body: JSON.stringify({
            base_tree: baseTreeSha,
            tree: [{
                path: 'file.scss',
                mode: '100644',
                type: 'blob',
                content: content
            }]
        })
    }).then(res => res.json()).then(data => data.sha)
}

function postNewTree(fileTreeSha, latestSha) {
    return fetch(`https://api.github.com/repos/${USER}/${REPO}/git/commits?access_token=${ACCESSTOKEN}`, {
        method: 'POST',
        body: JSON.stringify({
            parent: [ latestSha ],
            tree: fileTreeSha,
            message: 'New scss file',
        })
    }).then(res => res.json()).then(data => data.sha)
}

function postNewCommit(newCommitSha) {
    return fetch(`https://api.github.com/repos/${USER}/${REPO}/git/refs/heads/${BRANCH}?access_token=${ACCESSTOKEN}`, {
        method: 'POST',
        body: JSON.stringify({
            sha: newCommitSha,
            force: true
        })
    }).then(res => res.json())
}