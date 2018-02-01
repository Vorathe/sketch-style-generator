# Save Colors

POST / body: [ "#08c", "red" ]

# Required Variables

PORT = Port the app will run on. (Default = 3000)
USER = User of the Github repo.
REPO = Github repository to check new styles into.
BRANCH = Branch to commit the file to.
ACCESSTOKEN = Access token used to grant access to commit new file.

# Run locally

1. docker build -t sketchstyles .
2. docker run \
-e PORT={port} \
-e USER='{user}' \
-e REPO='{repo}' \
-e BRANCH='{branch}' \
-e ACCESSTOKEN='{token}' \
-p {local_port}:{port} \
sketchstyles

# Deploy to Heroku

1. Install Heroku CLI
2. $ heroku login
3. $ heroku container:login
3. $ heroku container:push web --app {heroku-app-id}