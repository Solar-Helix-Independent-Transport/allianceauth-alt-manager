#!/bin/bash

echo "Cleaning old assets."
rm -rf ../altmanager/static/altmanager/assets
rm ../altmanager/static/altmanager/manifest.json
echo "Copying new assets."
cp build/static/.vite/manifest.json ../altmanager/static/altmanager/manifest.json
cp -r build/static/assets ../altmanager/static/altmanager/assets
echo "Assets copied successfully."
