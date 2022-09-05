#!/bin/sh
npm run build
nginx_config=index.nginx-debian.html
mv /var/www/html/${nginx_config} /tmp
rm -rf /var/www/html/*
mv ./build/* /var/www/html
mv /tmp/${nginx_config} /var/www/html/${nginx_config}

