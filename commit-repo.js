const fetch = require('node-fetch');
const baseUrl = 'https://api.github.com/repos/vorathe/sketch-style-generator/git';
const refs = '/refs/heads/master';
const accessToken = '?access_token=a6dc36e144956c89c86a84bdb396b675ab8efac7';
const commit = '/commits/';
const trees = '/trees';
let latestSHA = '';

function getLatestSHA() {
    console.log('ENTER -> getLatestSHA');
    fetch(baseUrl + refs + accessToken)
        .then(response => {
            response.json().then(json => {
                console.log(json.object.sha);
                latestSHA = json.object.sha;
                getBaseTreeSHA(json.object.sha);
            });
        })
        .catch(error => {
            console.log(error);
        });
}
function getBaseTreeSHA(latestSHA) {
    console.log('ENTER -> getBaseTreeSHA');
    fetch(baseUrl + commit + latestSHA + accessToken)
        .then(commit => {
            commit.json().then(commitJson => {
                console.log('commitJson -> ', commitJson);
                // postFilesToTree(commitJson.tree.sha);
            })
        })
}
function postFilesToTree(baseTreeSHA) {
    console.log('ENTER -> postFilesToTree');
    console.log(baseUrl + trees + accessToken);
    console.log('baseTreeSHA -> ', baseTreeSHA);
    fetch(baseUrl + '/commits/' + accessToken, { method: 'POST', body: {
        'base_tree': baseTreeSHA,
        'tree': [{
            'path': 'file.scss',
            'mode': '100644',
            'type': 'blob',
            'content': 'height: 20px'
        }]
    }, headers: { 'content-type': 'application/json' }})
        .then(file => {
            console.log(file);
            file.json().then(fileJson => {
                console.log(fileJson);
                // console.log('fileJson.sha -> ', fileJson);
                // postNewTree(fileJson.sha, latestSHA);
            })
    })
}

function postNewTree(fileTreeSHA, latestCommitSHA) {
    console.log('ENTER -> postNewTree');
    console.log('postNewTree URL -> ', baseUrl + '/commits' + accessToken);
    fetch(baseUrl + commit + accessToken, { method: 'POST', body: {
        "parent": [latestCommitSHA],
        "tree": fileTreeSHA,
        "message": 'New scss file',
    }}).then(newTree => {
        newTree.json().then(newTreeJson => {
            console.log('newTreeJson -> ', newTreeJson);
            // postNewCommit(newTreeJson.sha);
        })
    })
}

function postNewCommit(newCommitSHA) {
    console.log('ENTER -> postNewCommit');
    fetch(baseUrl + refs, {method: 'POST', body: { "sha": newCommitSHA}})
        .then(finalCommit => {
            finalCommit.json().then(finalCommitJson => {
                console.log(finalCommitJson);
            })
    })
}

getLatestSHA();
