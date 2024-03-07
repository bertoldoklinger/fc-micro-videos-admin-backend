FROM node:20.5.1-slim

#seta user para ser node, não root (+segurança)
USER node

WORKDIR /home/node/app

#mantem o container docker em execução(hot reload)
CMD [ "tail", "-f", "/dev/null" ]
