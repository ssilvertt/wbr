#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Starting deployment...${NC}"

echo -e "${BLUE}📦 Building project...${NC}"
pnpm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "\033[0;31m❌ Build failed${NC}"
    exit 1
fi

echo -e "${BLUE}📤 Deploying to server...${NC}"
sshpass -p "$PASSWORD" rsync -avz --delete --progress dist/ $SERVER:$DEPLOY_PATH

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    echo -e "${GREEN}🌍 Your site is live!${NC}"
else
    echo -e "\033[0;31m❌ Deployment failed${NC}"
    exit 1
fi
