#!/bin/sh
npm run build
rm -rf ../../../puhelinluettelonBackend/build
cp -r build ../../../puhelinluettelonBackend/