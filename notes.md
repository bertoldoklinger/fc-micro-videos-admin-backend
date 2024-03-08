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
- Podemos ter 2 approachs para criação de entidades
  - O "purista" - entidades - menos possível de libs e frameworks
  - O mix - entidades misturadas com ORM (dominio ríco com expressividade e comportamento)
- Não criamos uma entity com o new porque quando recuperamos ela de um banco de dados, ele recarrega a entity, rodando o constructor, por isso sempre utilizamos em entidades o método static create, para realmente criar o objeto da Entidade puro, (diferença de construção e criação)
- O método static create é uma factory method, ele vai fabricar a entidade
- Quando queremos fazer o set, alterar atributos da entidade, devemos fazer com expressividade, não spammar varios setters sem sentido
- Quando queremos definir essas operações(alterações de atributos), é importante que a gente converse com o **domain expert**, frases que vão ter verbos, vão tender a virar operações que vamos criar com os atributos, que tenhamos um entendimento melhor do que será feito no domínio
- A diferença entre um método expressivo de operação e um setter é que um setter é anêmico, ele representa uma mudança de valor, o método expressivo = exemplo *changeName()* está representando uma operação que você vai:
  - Alterar o nome
  - Fazer a validação dos dados
  - Outras verificações
  - Eventos
- Eric Evans fala: "O projeto é o código e o código é o projeto" (Devemos sempre usar linguagem expressiva e ubíqua)
- Nas **Entities** é interessante ter o método toJSON() que retorna os atributos como um objeto javascript, para testes e serializar depois
- Em **Entities**, eu quero ter uma identidade para diferenciar um de outra, todos os campos podem mudar ao longo do tempo, só a identidade que não(id normalmente)
- **Value Objects** são informações que não tem uma identidade única, apenas **valores** únicos
- **Value Objects** são objetos que vão armazenar valores específicos fazendo suas validações necessárias
- **Value Objects** diferente de Entities, são **livres de efeitos colaterais(modificação de propriedades) e imutáveis**, após criar-lo, não podemos modifica-lo
- Gerar mais Value Objects acaba gerando mais qualidade para aplicação, porque você abstrai regras daquele valor, tirando das Entities e tornando ela reusável entre entidades.

### Testes
- Quando testamos uma entidade, normalmente testamos o construtor dela, instanciando a classe e fazendo asserções nos seus atributos
- Devemos também testar todos os comportamentos(métodos) dela, todo "setter" deve ser testado