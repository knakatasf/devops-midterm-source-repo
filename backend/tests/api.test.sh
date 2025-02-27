URL="http://$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' infra-repo-backend-1):8800/books"

DATA='{
  "title": "Test Book",
  "description": "This is a test book",
  "price": 10,
  "cover": ""
}'

POST_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST -H "Content-Type: application/json" -d "$DATA" "$URL")

if [ "$POST_RESPONSE" -ne 200 ] && [ "$POST_RESPONSE" -ne 201 ]; then
    echo "❌ API test failed: POST request failed with HTTP $POST_RESPONSE"
    exit 1
fi

sleep 2

GET_RESPONSE=$(curl -s "$URL")

echo "$GET_RESPONSE" | grep -q "Test Book"
if [ $? -eq 0 ]; then
    echo "✅ API test passed: Book found in database!"
    exit 0
else
    echo "❌ API test failed: Inserted book not found!"
    exit 1
fi