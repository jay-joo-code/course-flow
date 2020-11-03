
checklist

- [ ] create DB
    - [ ] dev project
    - [ ] prod project
MongoDB Atlas, GCP Tokyo, M0 Free

- [ ] firebase integration
    - [ ] update firebase config

- [ ] .gitignore file
- [ ] local .env file

- [ ] deploy to lightsail https://medium.com/@sharmasha2nk/aws-lightsail-bitnami-nodejs-letsencrypt-cf653573b8a1
1. create node instance (not MEAN)
2. assign static public ip to server instance
at lightsail console:
networking > attach static ip

3. update DNS record to point domain to the public ip address
type | host | value
A    |  @   | 3.34.55.36

2. connect locally through SSH
1) download SSH key from lightsail profile
2) move the .pem file to /documents/ssh-keys
3) open terminal, enter commands
chmod 400 /path/to/pem_file
ssh-add /path/to/pem_file

ssh bitnami@3.34.55.36

if (error: REMOTE HOST IDENTIFICATION HAS CHANGED)
[error msg] Offending ECDSA key in /Users/jae/.ssh/known_hosts:LINE_NUMBER

vi /Users/jae/.ssh/known_hosts

[delete line at LINE_NUMBER]
move to line you wish to delete. press "dd"

3. create apps directory
cd stack
sudo mkdir apps
sudo chown -R bitnami apps
cd apps

3. clone origin repository
sudo git clone ORIGINAL_REPO

sudo mv REPO_NAME prod
sudo chown -R bitnami prod
cd prod

3. setup deployment environment
touch .env
vi .env

[required env variables]
PORT=3000
FORCE_PROD_DB=true
(with ssl) FORCE_HTTPS=false
(without ssl) FORCE_HTTPS=true
NODE_ENV=production
DB_PROD=
DB_DEV=

sudo npm i -g pm2
cd ..
sudo chown -R bitnami prod
cd prod
npm i
sudo npm run heroku-postbuild
sudo pm2 start npm --name prod -- start

[pm2 commands]
sudo pm2 restart prod
sudo pm2 stop prod

4. 80 (default) -> 3000 fowarding
sudo cp /opt/bitnami/apache/conf/vhosts/sample-http-vhost.conf.disabled /opt/bitnami/apache/conf/vhosts/sample-http-vhost.conf
sudo cp /opt/bitnami/apache/conf/vhosts/sample-https-vhost.conf.disabled /opt/bitnami/apache/conf/vhosts/sample-https-vhost.conf
sudo /opt/bitnami/ctlscript.sh restart apache

4. setup bare git repo for automatic deployments
https://medium.com/@molp/deploy-node-js-server-to-aws-lightsail-vps-fd7e67f07b14

mkdir prod.git
cd prod.git
git --bare init
cd hooks
touch post-receive
vi post-receive

i
```
#!/bin/bash

echo ‘post-receive: Triggered.’

cd /home/bitnami/stack/apps/prod

echo ‘post-receive: git check out…’

XDG_CONFIG_HOME=/home/bitnami/stack/apps/prod git --git-dir=/home/bitnami/stack/apps/prod/prod.git --work-tree=/home/bitnami/stack/apps/prod checkout master -f

HOME=/home/bitnami/stack/apps/prod

echo ‘post-receive: npm install…’

sudo npm install --unsafe-perm \
&& echo ‘post-receive: building…’ \
&& npm run heroku-postbuild \
&& echo ‘post-receive: → done.’ \
&& (sudo pm2 delete prod || true) \
&& sudo pm2 start npm --name prod -- start \
&& echo ‘post-receive: app started successfully with pm2.’
```
esc
:wq! (enter)

chmod +x post-receive
cd ../../..
sudo chown -R bitnami prod
exit
exit

5. link bare repo in server to local environment
git clone bitnami@13.125.79.197:/~/stack/apps/prod/prod.git
git remote add prod ssh://bitnami@13.125.79.197:/~/stack/apps/prod/prod.git
git remote -v

add "prod/" to gitignore

5. [DEPRECATED] configure server (replace the default app with your app)
sudo mkdir /opt/bitnami/apps/prod/conf
sudo mkdir /opt/bitnami/apps/prod/htdocs

sudo touch /opt/bitnami/apps/prod/conf/httpd-prefix.conf
sudo vi /opt/bitnami/apps/prod/conf/httpd-prefix.conf
[add this line] Include "/opt/bitnami/apps/prod/conf/httpd-app.conf"

sudo touch /opt/bitnami/apps/prod/conf/httpd-app.conf
sudo vi /opt/bitnami/apps/prod/conf/httpd-app.conf
[add lines] 
ProxyPass / http://127.0.0.1:3000/
ProxyPassReverse / http://127.0.0.1:3000/

sudo vi /opt/bitnami/apache2/conf/bitnami/bitnami-apps-prefix.conf
[add lines] 
Include "/opt/bitnami/apps/prod/conf/httpd-prefix.conf"

[not sure if these steps are necessary; follow instructions in page below]
[https://docs.bitnami.com/aws/infrastructure/nodejs/get-started/get-started/]

sudo cp /opt/bitnami/apache/conf/vhosts/prod-http-vhost.conf.disabled /opt/bitnami/apache/conf/vhosts/prod-http-vhost.conf
sudo cp /opt/bitnami/apache/conf/vhosts/prod-https-vhost.conf.disabled /opt/bitnami/apache/conf/vhosts/prod-https-vhost.conf

sudo cp /opt/bitnami/apache/conf/vhosts/sample-http-vhost.conf.disabled /opt/bitnami/apache/conf/vhosts/sample-http-vhost.conf
sudo cp /opt/bitnami/apache/conf/vhosts/sample-https-vhost.conf.disabled /opt/bitnami/apache/conf/vhosts/sample-https-vhost.conf

sudo /opt/bitnami/ctlscript.sh restart apache

sudo touch /opt/bitnami/apache/conf/vhosts/prod-http-vhost.conf
sudo vi /opt/bitnami/apache/conf/vhosts/prod-http-vhost.conf

[add lines]
<VirtualHost _default_:80>
  ServerAlias *
  DocumentRoot "/opt/bitnami/apps/prod/public"
  <Directory "/opt/bitnami/apps/prod/public">
    Require all granted
  </Directory>
  ProxyPass / http://localhost:3000/
  ProxyPassReverse / http://localhost:3000/
</VirtualHost>

sudo touch /opt/bitnami/apache/conf/vhosts/prod-https-vhost.conf
sudo vi /opt/bitnami/apache/conf/vhosts/prod-https-vhost.conf

[add lines]
<VirtualHost _default_:443>
  ServerAlias *
  SSLEngine on
  SSLCertificateFile "/opt/bitnami/apache/conf/bitnami/certs/server.crt"
  SSLCertificateKeyFile "/opt/bitnami/apache/conf/bitnami/certs/server.key"
  DocumentRoot "/opt/bitnami/apps/prod"
  <Directory "/opt/bitnami/apps/prod">
    Require all granted
  </Directory>
  ProxyPass / http://localhost:3000/
  ProxyPassReverse / http://localhost:3000/
</VirtualHost>

sudo /opt/bitnami/ctlscript.sh restart apache

[check http://domain.com shows my site]

9. SSL https://docs.bitnami.com/aws/how-to/generate-install-lets-encrypt-ssl/

sudo /opt/bitnami/bncert-tool

set up SSL through the cli
remove browser data on the domain to apply SSL

sudo /opt/bitnami/letsencrypt/lego --tls --email="jj534@cornell.edu" --domains="DOMAIN" --path="/opt/bitnami/letsencrypt" renew --days 90

[check certificate renewal status]
sudo /opt/bitnami/letsencrypt/lego --path /opt/bitnami/letsencrypt --email="jj534@cornell.edu" --http --http-timeout 30 --http.webroot /opt/bitnami/apps/letsencrypt --domains=www.goondaetalk.com renew

[set renewal to run if certificate expires in less than 90 days (doesn't work)]
sudo /opt/bitnami/letsencrypt/lego --path /opt/bitnami/letsencrypt --email="jj534@cornell.edu" --http --http-timeout 30 --http.webroot /opt/bitnami/apps/letsencrypt --domains=goondaetalk.com renew && sudo /opt/bitnami/apache2/bin/httpd -f /opt/bitnami/apache2/conf/httpd.conf -k graceful


- [ ] google auth https://developers.google.com/identity/sign-in/web/sign-in?authuser=4
    - [ ] configure consent screen
    - [ ] create google auth credentials
    - [ ] add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET to server env variables