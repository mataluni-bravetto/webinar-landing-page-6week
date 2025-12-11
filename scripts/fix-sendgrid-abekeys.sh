#!/bin/bash
# Fix SendGrid credentials in AbëKEYS vault
# This script helps re-add SendGrid credentials if decryption fails

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}"
echo "╔════════════════════════════════════════════════════════╗"
echo "║  🔧 FIX SENDGRID ABËKEYS CREDENTIALS                  ║"
echo "╚════════════════════════════════════════════════════════╝"
echo -e "${NC}"

ABEKEYS_VAULT="$HOME/.abekeys/credentials"
SENDGRID_CRED_FILE="$ABEKEYS_VAULT/sendgrid.json"

# Check if vault exists
if [ ! -d "$ABEKEYS_VAULT" ]; then
    echo -e "${YELLOW}Creating AbëKEYS vault...${NC}"
    mkdir -p "$ABEKEYS_VAULT"
    chmod 700 "$ABEKEYS_VAULT"
fi

echo ""
echo "The current SendGrid credential file cannot be decrypted."
echo "This usually means it was encrypted with a different vault key."
echo ""
echo "Options:"
echo "1. Re-add credentials (recommended)"
echo "2. Use environment variables instead"
echo "3. Exit"
echo ""
read -p "Choose option [1-3]: " choice

case $choice in
    1)
        echo ""
        echo -e "${CYAN}Re-adding SendGrid credentials...${NC}"
        echo ""
        
        read -sp "Enter SendGrid API Key (SG.xxxxx): " API_KEY
        echo ""
        
        if [ -z "$API_KEY" ]; then
            echo -e "${RED}❌ API key is required${NC}"
            exit 1
        fi
        
        read -p "Enter From Email: " FROM_EMAIL
        if [ -z "$FROM_EMAIL" ]; then
            echo -e "${RED}❌ From email is required${NC}"
            exit 1
        fi
        
        read -p "Enter From Name [default: Bravetto Team]: " FROM_NAME
        FROM_NAME=${FROM_NAME:-Bravetto Team}
        
        # Backup old file if it exists
        if [ -f "$SENDGRID_CRED_FILE" ]; then
            BACKUP_FILE="${SENDGRID_CRED_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
            cp "$SENDGRID_CRED_FILE" "$BACKUP_FILE"
            echo -e "${YELLOW}Backed up old credential file to: $BACKUP_FILE${NC}"
        fi
        
        # Create new plain text credential file
        # Note: For production, you'd want to encrypt this, but for now plain text works
        cat > "$SENDGRID_CRED_FILE" <<EOF
{
  "service": "sendgrid",
  "api_key": "$API_KEY",
  "from_email": "$FROM_EMAIL",
  "from_name": "$FROM_NAME",
  "created_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "notes": "Re-added after decryption failure"
}
EOF
        
        chmod 600 "$SENDGRID_CRED_FILE"
        
        echo ""
        echo -e "${GREEN}✅ SendGrid credentials saved to AbëKEYS vault${NC}"
        echo -e "${YELLOW}⚠️  Note: Credentials are stored in plain text.${NC}"
        echo -e "${YELLOW}   For production, consider encrypting them.${NC}"
        echo ""
        echo "Next steps:"
        echo "1. Run: npm run validate:sendgrid"
        echo "2. Test registration on the landing page"
        ;;
    2)
        echo ""
        echo -e "${CYAN}Using environment variables instead...${NC}"
        echo ""
        echo "Create a .env.local file in the webinar-landing-page directory:"
        echo ""
        echo "SENDGRID_API_KEY=your_api_key_here"
        echo "SENDGRID_FROM_EMAIL=your_email@domain.com"
        echo "SENDGRID_FROM_NAME=Bravetto Team"
        echo ""
        echo "The app will automatically use environment variables if abekeys fails."
        ;;
    3)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac
