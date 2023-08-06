# Proagro - CPS (Frontend)

# 1. Introdução

## Comunicação de Perda Simplificada (CPS)
A Comunicação de perda simplificada foi criada para gerenciar de forma eficiente o fluxo de comunicação de perdas, otimizando essa etapa fundamental no processo de solicitação do benefício do Proagro para os produtores rurais afetados por determinados eventos com prejuízo decorrente desses eventos. Como por exemplo 
excesso de chuvas, granizo, etc...
## Detalhes do projeto
O **frontend** da aplicação CPS é desenvolvido em Angular.
Este repositório é destinado a parte **frontend** do projeto. Para mais informações da aplicação Backend desenvolvida com Python/DjangoRest confira o repositório [proagro-cps-backend](https://github.com/Regismrs/proagro-cps-backend).
# 2. Instalação
## Pré-requisitos
Instale o [Node.js](https://nodejs.org) que inclui o [Node Package Manager](https://www.npmjs.com/get-npm)
## Como executar localmente

### Clone este repositório
```
git clone https://github.com/regismrs/proagro-cps-frontend.git
```
### Instale as dependências
```shell
cd proagro-cps-frontend
npm install
```
### Execute a aplicação localmente
```shell
ng serve
```
Acesse a aplicação em http://localhost:4200
  
## Build

Execute `ng build` no terminal para compilar o projeto. Os arquivos (index.html, etc) serão gerados dentro da pasta `dist/`.
# 3. Uso da API
## API
###### DOCUMENTAÇÃO
Os dados da aplicação frontend serão provenientes da REST API AgroCPS. O funcionamento da API pode ser consultado na documentação oficial disponibilizada em [https://agrocps.docs.apiary.io/#](https://agrocps.docs.apiary.io/#).
###### TOKEN
A garantia do acesso aos dados da API do lado servidor ocorre através da verificação do **Token** informado pelo usuário no header de suas requisições. O token é fornecido pela equipe responsável pela API. Para mais detalhes consulte a documentação da API.
# 5. Recursos
### Validação de Formulários no Frontend
Implementamos validações de formulários no frontend utilizando os recursos nativos de validação do Angular. Essa abordagem foi adotada para fornecer uma experiência de uso mais amigável e mitigar erros nos dados inseridos pelos usuários.

Através dos validators do Angular, criamos regras de validação personalizadas para garantir que os campos de entrada atendam aos critérios específicos definidos pelo sistema. Essas validações são aplicadas em tempo real, assim que o usuário interage com o formulário, fornecendo feedback instantâneo sobre possíveis problemas nos dados inseridos.

Além disso, combinamos as validações do frontend com as validações do backend para garantir a integridade dos dados durante o processo de submissão. Isso ajuda a evitar a submissão de dados inválidos ao servidor e melhora a segurança da aplicação.

As mensagens de erro claras e informativas são apresentadas aos usuários, indicando os campos que precisam ser corrigidos ou ajustados. Dessa forma, garantimos que os dados inseridos estejam em conformidade com as exigências do sistema, reduzindo a ocorrência de erros e aumentando a usabilidade geral da aplicação.

Com a validação de formulários no frontend, proporcionamos aos usuários uma experiência mais intuitiva e confiável, tornando a interação com a aplicação mais agradável e eficiente.
### Verificação de Comunicados Divergentes em Raio de 10 km
Implementamos um mecanismo de verificação de comunicados para alertar os usuários sobre a existência de registros divergentes em um raio inferior a 10 km.

Durante o preenchimento de um novo comunicado, nossa aplicação realiza uma busca no banco de dados por outros comunicados registrados no mesmo dia, por motivos diferentes e dentro do raio especificado. Caso sejam encontrados comunicados próximos com motivos diferentes, o usuário é alertado sobre a existência dessas informações conflitantes e possa verificar melhor esses dados.

Essa funcionalidade visa garantir a consistência e a precisão das informações fornecidas pelos produtores rurais e registradas pelos analistas. Através do alerta oportuno, evitamos que comunicados contraditórios sejam submetidos ao sistema, o que poderia levar a decisões equivocadas ou fraudulentas.

Com a verificação de comunicados divergentes oferecemos uma camada adicional de segurança e confiabilidade ao processo de registro de perdas nas lavouras, reforçando o compromisso com a qualidade e a precisão dos dados submetidos pelos usuários.
### Busca Avançada por Data de Colheita e Data de Cadastro
Implementamos um sistema de busca avançada que permite aos usuários localizarem informações relevantes de forma rápida e precisa. Com a busca por data de colheita e data de cadastro dos comunicados, os produtores rurais podem filtrar os registros para encontrar informações específicas dentro de um período determinado.

Além disso, a busca por data de cadastro dos comunicados possibilita aos usuários acompanhar as últimas atualizações e novos registros submetidos ao sistema. Isso ajuda a manter os produtores rurais informados sobre os acontecimentos mais recentes em sua região e facilita a identificação de possíveis tendências ou padrões de perdas nas lavouras.

As opções de busca avançada foram projetadas para serem intuitivas e de fácil uso. Os usuários podem especificar intervalos de datas ou selecionar datas específicas por meio de um calendário interativo. As buscas são executadas de forma rápida e eficiente em questão de segundos.
### Funções e Validadores Reutilizáveis
Desenvolvemos um conjunto de funções e validadores reutilizáveis para realizar tarefas comuns em várias partes do projeto. Essas funções abrangem desde cálculos matemáticos até formatação de datas e strings. Ao criar essas funções genéricas, aumentamos a eficiência do desenvolvimento, tornando mais fácil a implementação de novos recursos e funcionalidades. `src/app/shared/functions/`

Além dos validadores nativos do Angular, implementamos validadores personalizados para garantir que os dados inseridos pelos usuários atendam a critérios específicos definidos pelo sistema. Esses validadores são aplicados em campos de entrada de formulários para garantir a integridade dos dados e proporcionar uma experiência de usuário mais fluida e amigável. Os validadores personalizados ajudam a prevenir erros e fornecem feedback claro sobre como corrigir possíveis problemas.

### Pipe PATTERN
Desenvolvemos um pipe personalizado para formatação de dados numéricos em qualquer pattern, uma tarefa muito comum e recorrente ao lidar - por exemplo - com documentos, telefones, praticamente em qualquer projeto. 

Pipes personalizados facilitam a manipulação de dados de forma concisa e legível, permitindo que os dados sejam apresentados de maneira significativa e compreensível para os usuários. Verifique os arquivos em `src/app/shared/pipes/`

Essas abstrações reutilizáveis ajudam a reduzir a complexidade do código e aprimoram a manutenção do projeto, tornando-o mais fácil de entender e estender no futuro.
### Lazy Loading com Angular
Implementamos o carregamento tardio (lazy loading) dos módulos usando a funcionalidade nativa do Angular. Com o lazy loading, a aplicação carrega dinamicamente os módulos de acordo com a necessidade, melhorando significativamente o tempo de inicialização e o desempenho geral da aplicação.

Ao adotar essa abordagem, os módulos do projeto são divididos em partes menores e independentes. Isso possibilita que apenas os módulos necessários para cada rota sejam carregados sob demanda, resultando em tempos de carregamento mais rápidos para os usuários.

Além disso, o lazy loading contribui para a escalabilidade do projeto, permitindo que futuras expansões e adições de recursos sejam facilmente incorporadas, sem afetar o desempenho das áreas já existentes.

Aproveite o benefício do lazy loading para uma experiência de usuário mais ágil e uma arquitetura modular que facilita o desenvolvimento contínuo do projeto.
# 6. Como contribuir
* Faça um fork deste repositório
* Crie uma nova branch: git checkout -b minha-feature
* Faça suas alterações e faça commit: git commit -m "Minha nova feature"
* Envie as alterações para o seu repositório: git push origin minha-feature
* Crie um Pull Request para este repositório
# Licença
Este projeto está licenciado sob a MIT License.
# Contato
Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para me contatar através do e-mail: regismrs.br@gmail.com
