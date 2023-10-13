FROM nginx
COPY index.html /usr/share/nginx/html/index.html
COPY script.js /usr/share/nginx/html/script.js