#!/bin/sh
npm run build
rm -rf ../../Osa3/spabackend/build
cp -r build ../../Osa3/spabackend/