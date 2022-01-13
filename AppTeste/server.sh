#! /bin/bash
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
docker run \
-it \
--name node.js \
--rm \
-d node.js\
-h node.js \
-w /node \
-v "${SCRIPTPATH}"/:/node/ \
-p 3000:3000 \
node


./start.sh

