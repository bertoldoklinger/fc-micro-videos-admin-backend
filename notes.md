# Roadmap Micro Videos Admin
## Configuração Docker e Docker-compose
- criamos o Dockerfile
- criamos o docker-compose.yml
- criamos o script start.sh para rodar quando subir o container
- abaixo de build, no docker-compose, se quisermos rodar um comando .sh usamos a flag commmand: com o path do comando
- chmod +x .docker/start.sh para dar permissão de execução do script start.sh no container
- para entrar no terminal do container => docker compose exec app bash
- abrimos a pasta no devcontainer e setamos zshplugins,etc 
- ajeitamos o path do devcontainer.json e docker-compose.yml para /home/node/app e adicionamos plugins do zsh
- buildamos o devcontainer
## Configuração Nodejs + Typescript
- SWC é um compilador em rust da vercel 20x mais rápido que o babel para compilar typescript para javascript(legal usar até para jest)
- npx jest --init para iniciar o jest
- para rodar o jest com swc, precisamos ir no jest.config.ts e lá em transform passar essa configuração => transform: {'^.+\\.(t|j)sx?$': '@swc/jest',}
- pacotes importantes => jest @types/jest ts-node typescript @swc/jest @swc/core @swc/cli (Todas dependencias de desenvolvimento)
## Capitulo 02 - Entidade Categoria
- Uma entidade é algo que queremos manipular, que seja único através de uma identificação, ela vais e diferencia de outras entidades por essa identificação
