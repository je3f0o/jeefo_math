#!/bin/bash

rm -rf npm

cp -R src npm
cp package.json LICENSE npm

npm publish npm --access public
