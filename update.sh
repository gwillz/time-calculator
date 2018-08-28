#!/usr/bin/env bash
export NODE_ENV=production

sudo -u http -H git pull
sudo -u http -HE npm run postcss
sudo -u http -HE npm run webpack
