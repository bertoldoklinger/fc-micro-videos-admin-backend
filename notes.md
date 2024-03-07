
## Configuração Docker e Docker-compose
- abaixo de build, no docker-compose, se quisermos rodar um comando .sh usamos a flag commmand: com o path do comando
- chmod +x .docker/start.sh para dar permissão de execução do script start.sh no container
- para entrar no terminal do container => docker compose exec app bash
- o devcontainer joga o vscode para dentro do container