#!/bin/sh

rm ../lambdaApi.zip
rm -rf ./node_modules
rm package-lock.json
npm install --production
zip -r ../lambdaApi.zip ./* -x circleci/\* -x nyc_output/\* -x config/\* -x coverage/\* -x server/\* -x test/\*