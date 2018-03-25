#! /bin/bash

npm run build
mkdir temp
cp -r index.html static/ dist/ temp/

git fetch origin
git checkout gh-pages
git pull origin gh-pages

rm -r dist/ static/
mv -f temp/* .
rm -r temp/

git add -f index.html static/ dist/
git commit -m "$1"
git push origin gh-pages
git co master
