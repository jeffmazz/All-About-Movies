# All About Movies

## Descrição
Um site interativo para saber tudo sobre filmes. O site é baseado na API do TMDB para renderizações das páginas, carrosséis e pesquisa.

## Imagens do Projeto

<details>
  <summary>Veja as capturas de tela</summary>

  ### Home
  **Parte superior da página inicial:**
  ![Home Top](/public/Home.png)

  **Parte inferior da página inicial:**
  ![Home Bottom](/public/Home2.png)

  ### Sidebar
  **Menu lateral com links para as páginas:**
  ![Sidebar](/public/Sidebar.png)

  ### CardList
  **Exemplo do componente CardList:**
  ![Card List](/public/CardList.png)

  ### Search
  **Exemplo do resultado de pesquisa**
  ![Search](/public/Search.png)

  ### Pagination
  **Exemplo do componente Pagination:**
  ![Pagination](/public/Pagination.png)

</details>

## Funcionalidades

- **Navbar**
  - Botão de Hamburger para a sidebar.
  - Campo de pesquisa para mostrar o resultado digitado.

- **Sidebar**
  - Menu lateral com links para as páginas:
    - **Home**
    - **Actors**
    - **Movies** > **Top Movies** e **Popular Movies**
    - **Series** > **Top Series** e **Popular Series**

- **Página Inicial (Home)**
  - Uma galeria no topo e um carrossel no final da página
  - elementos interativos com botões para modificar seus conteúdos.
  - Textos de curiosidades.

- **Páginas - Movies, Series, Actors e Search**
  - Essas páginas utilizam o componente **CardList**, que recebe os dados através de uma busca no backend e retorna os resultados exibidos como cards no navegador.
  - Os componentes que utilizam o **CardList** também possuem um outro componente chamado **Pagination**.
  - Esse componente recebe a quantidade total de páginas dos resultados e permite a navegação entre elas, garantindo que o conteúdo não fique limitado a apenas uma página.

## Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript, React e bibliotecas adicionais como react-icons.
- **Backend**: Node.js

## Como Rodar o Projeto

1. Clone o Repositório
   ```bash
   git clone https://github.com/jeffmazz/All-About-Movies.git

3. Instale as Dependências:
   ```bash
   npm install

4. Rode o Projeto:
   ```bash
   npm run dev
