# Save Colors

POST / body: [ "#08c", "red" ]

# Required Variables

PORT = Port the app will run on. (Default = 3000)
REPOURL = Github repository url to check new styles into.
BRANCH = Branch to commit the file to.
ACCESSTOKEN = Access token used to grant access to commit new file.
SECRETKEY = Key used to authorize the request made from the plugin to the server. This is any key you want to create.

# Run locally

1. docker build -t sketchstyles .
2. docker run \
-e PORT={port} \
-e REPOURL='{repourl}' \
-e BRANCH='{branch}' \
-e ACCESSTOKEN='{token}' \
-e SECRETKEY='{secretekey}' \
-p {local_port}:{port} \
sketchstyles

# Deploy to Heroku

1. Install Heroku CLI
2. $ heroku login
3. $ heroku container:login
3. $ heroku container:push web --app {heroku-app-id}