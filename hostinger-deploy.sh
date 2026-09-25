#!/bin/bash
# Hostinger Git deployment build script for PHP site
# This runs on Hostinger's server after git pull

set -e

echo "Deploying PHP site..."

# Copy PHP site to public_html (root directory)
cp -r php-site/* public_html/

# Ensure config.php has production values (user must set these)
echo "Deployment complete. Verify includes/config.php has real NOTIFY_URL and ADMIN_EMAIL"