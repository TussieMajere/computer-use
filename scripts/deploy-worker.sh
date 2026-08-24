#!/bin/bash
# deploy-worker.sh — Deploy Worker til ai-uncensored.store
# Bruk: CLOUDFLARE_API_TOKEN=<token> bash scripts/deploy-worker.sh
# Eller: bash scripts/deploy-worker.sh <token>

set -e

# Hent token
TOKEN="${CLOUDFLARE_API_TOKEN:-$1}"
if [ -z "$TOKEN" ]; then
    echo "❌ Ingen API-token. Bruk:"
    echo "   CLOUDFLARE_API_TOKEN=<token> $0"
    echo "   $0 <token>"
    exit 1
fi

cd "$(dirname "$0")/.."

echo "🔍 Verifiserer token..."
VERIFY=$(curl -s -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
    -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json")

if echo "$VERIFY" | grep -q '"success":true'; then
    echo "✅ Token gyldig!"
else
    echo "❌ Token ugyldig: $(echo $VERIFY | grep -o '"message":"[^"]*"')"
    echo ""
    echo "💡 Generer nytt token på https://dash.cloudflare.com/profile/api-tokens"
    echo "   Tilgang: Zone > DNS > Edit"
    exit 1
fi

echo "🚀 Deployer Worker..."
CLOUDFLARE_API_TOKEN="$TOKEN" npx wrangler deploy --config workers/wrangler.jsonc 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Worker deployet til ai-uncensored.store!"
    echo "🌐 https://ai-uncensored.store"
else
    echo "❌ Deploy feilet. Se output over."
    exit 1
fi