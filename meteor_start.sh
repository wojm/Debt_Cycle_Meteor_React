#!/bin/sh
DOMAIN=debtcycle.meteorapp.com
PORT=3000

# Find configured IPv4 addresses, skip localhost
IP=`ifconfig |grep -oE "(inet )([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)"|awk '{print $2}' | grep -v "127.0.0.1"`
echo "Your IP:       $IP"

# Replace periods with hyphens
HOSTNAME=`echo $IP` # | tr '.' '-'`
# Append the domain name
HOSTNAME="${HOSTNAME}/${DOMAIN}"
#HOSTNAME="10-0-10-15.${DOMAIN}"
echo "Hostname:      $HOSTNAME"

# Check that there is a DNS record for the private IP
printf "Checking DNS:  "
#if ! test `dig $HOSTNAME +short`; then
#  echo "ERROR! DNS is not configured for your current IP address (${IP}), shoot an email to mikael@airlab.io and he will fix it."
#  exit
#else
#  echo "OK"
#fi

#echo "Configure Facebook:"
#echo "1. Go here https://developers.facebook.com/apps/"
#echo "2. Select/create a FB app → click Test Apps → select/create a dev app → click Settings"
#echo "3. Change the Site URL to \"http://${HOSTNAME}:${PORT}/\""

# Start Meteor
ROOT_URL=http://${DOMAIN}/ meteor run
