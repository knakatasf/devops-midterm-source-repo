#!/bin/bash

URL="http://$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' infra-repo-frontend-1):80"

RESPONSE=$(curl -s $URL)

if echo "$RESPONSE" | grep -q "<title>Vite + React</title>"; then
    echo "✅ Homepage loaded successfully!"
    exit 0
else
    echo "❌ Homepage did not load correctly!"
    exit 1
fi