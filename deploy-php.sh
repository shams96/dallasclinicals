#!/bin/bash
# Deploy PHP site to Hostinger via rsync
# Usage: ./deploy-php.sh user@host:/path/to/public_html

set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <ssh-target>"
  echo "Example: $0 user@server:/home/user/public_html"
  exit 1
fi

TARGET="$1"
SOURCE="php-site/"

echo "Deploying $SOURCE to $TARGET..."
rsync -avz --delete "$SOURCE" "$TARGET"
echo "Done."