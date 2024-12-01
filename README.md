# Documentação do Projeto Mobile - EmmaysEdPostsBlog

## Descrição do Projeto

A versão mobile do **EmmaysEdPostsBlog** foi desenvolvida utilizando **React Native** com o framework **Expo**, permitindo que professores e alunos interajam com o blog diretamente de seus dispositivos móveis. Professores podem criar e gerenciar posts, enquanto alunos podem visualizar e interagir com os conteúdos publicados. O projeto utiliza **expo-auth-session** para autenticação e **React Context** para gerenciar o estado global de autenticação e informações do usuário.

---

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicativos mobile multiplataforma.
- **Expo**: Ferramenta que simplifica o desenvolvimento e o gerenciamento do app.
- **expo-auth-session**: Biblioteca para autenticação segura utilizando o protocolo OAuth 2.0.
- **Expo Router**: Gerenciador de rotas baseado em arquivos para navegação.
- **Fetch API**: Para consumo de APIs REST.
- **Styled Components**: Para estilização de componentes no aplicativo.
- **TypeScript**: Para tipagem estática e maior segurança no desenvolvimento.

---

## Funcionalidades do App

1. **Autenticação**
   - Login via e-mail e senha utilizando o backend do **EmmaysEdPostsBlogAPI**.
   - Manutenção de estado de autenticação utilizando **React Context**.
   - Logout para encerrar a sessão do usuário.

2. **Gerenciamento de Posts**
   - Professores podem:
     - Criar novos posts.
     - Editar posts existentes.
     - Excluir posts.
   - Alunos podem:
     - Visualizar posts publicados.
     - Buscar posts por palavra-chave.

3. **Busca e Filtros**
   - Sistema de busca por título e conteúdo do post.
   - Paginação para carregamento eficiente de posts.

4. **Navegação**
   - Navegação fluida e baseada em arquivos com **Expo Router**.
   - Rotas protegidas para telas de criação e edição de posts.

---

## Configuração e Instalação

1. **Clone o repositório do projeto mobile**:

   ```bash
   git clone https://github.com/EmilyTarga/EmmaysEdPostsBlogMobile.git
   ```

2. **Instale as dependências**:

   ```bash
   cd EmmaysEdPostsBlogMobile
   npm install
   ```

3. **Configuração do ambiente**:
   - Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

     ```env
     API_URL=http://localhost:4000/api
     AUTH_CLIENT_ID=seu-cliente-id
     AUTH_REDIRECT_URI=exp://localhost:19000
     ```

4. **Inicie o aplicativo**:

   ```bash
   npm start
   ```

5. **Execute o app no emulador ou dispositivo físico**:
   - Para iOS: Abra no emulador do Xcode ou no aplicativo Expo Go.
   - Para Android: Abra no emulador do Android Studio ou no aplicativo Expo Go.

---

## Integração com o Backend

A aplicação consome a API do backend **EmmaysEdPostsBlogAPI**. Para que o app funcione corretamente, certifique-se de que:

1. O backend está rodando localmente ou em um servidor de produção acessível.
2. O arquivo `.env` do app contém a URL correta da API.

### Principais Endpoints Consumidos

- **POST /user/login**: Para autenticação.
- **GET /posts**: Para listar todos os posts.
- **GET /posts/{postId}**: Para detalhes de um post.
- **POST /posts**: Para criação de posts.
- **PUT /posts/{postId}**: Para edição de posts.
- **DELETE /posts/{postId}**: Para exclusão de posts.

---

## Principais Desafios no Desenvolvimento

1. **Integração com o Backend**
   - Implementar chamadas à API com a **Fetch API** e gerenciar respostas e erros de forma centralizada foi desafiador no início, especialmente para tratar os diferentes papéis de usuários (professores e alunos).

2. **Gerenciamento de Estado com React Context**
   - Configurar o **React Context** para gerenciar a autenticação e compartilhar informações do usuário entre as telas exigiu planejamento. No entanto, o uso de contextos trouxe simplicidade e eliminou a necessidade de bibliotecas externas para gerenciamento de estado.

3. **Navegação com Expo Router**
   - Substituir o tradicional **React Navigation** pelo **Expo Router** foi desafiador inicialmente devido à mudança na abordagem de configuração das rotas. No entanto, a estrutura baseada em arquivos simplificou bastante a organização das telas.

4. **Consistência de Design**
   - Criar um design responsivo e consistente, com estilização baseada em **Styled Components**, foi fundamental para garantir uma boa experiência do usuário em diferentes dispositivos.

---

## Contribuindo

1. Faça um fork do repositório.
2. Crie uma nova branch: `git checkout -b minha-feature`.
3. Faça suas alterações e commit: `git commit -m 'Adiciona nova funcionalidade'`.
4. Envie para a branch principal: `git push origin minha-feature`.
5. Crie um pull request.

---

## Licença

Este projeto está licenciado sob a **MIT License**.
