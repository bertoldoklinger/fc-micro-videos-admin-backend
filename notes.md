
## Configuração Docker e Docker-compose
- abaixo de build, no docker-compose, se quisermos rodar um comando .sh usamos a flag commmand: com o path do comando
- chmod +x .docker/start.sh para dar permissão de execução do script start.sh no container
- para entrar no terminal do container => docker compose exec app bash
- o devcontainer joga o vscode para dentro do container
## Configuração Nodejs + Typescript
- SWC é um compilador em rust da vercel 20x mais rápido que o babel para compilar typescript para javascript(legal usar até para jest)
- npx jest --init para iniciar o jest
- para rodar o jest com swc, precisamos ir no jest.config.ts e lá em transform passar essa configuração => transform: {'^.+\\.(t|j)sx?$': '@swc/jest',}
- pacotes importantes => jest @types/jest ts-node typescript @swc/jest @swc/core @swc/cli (Todas dependencias de desenvolvimento)