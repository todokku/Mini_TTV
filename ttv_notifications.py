# File: ttv_notifications.py
# Use: Gets Twitch TV notifications
# Author: Talon Jones

# Purpose: Use Twitch API to receive notifications, host on Heroku to periodically pull updates

import logging
import json
import requests

logging.basicConfig(filename='ttv_notifications.log', level=logging.DEBUG,
                    format='%(asctime)s - %(levelname)s - %(message)s')

app_id = json.loads(open('ttv_client_secrets.json', 'r').read())['web']['app_id']
app_secret = json.loads(open('ttv_client_secrets.json', 'r').read())['web']['app_secret']

print(app_id, app_secret)