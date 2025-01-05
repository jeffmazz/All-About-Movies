# All About Movies

## Descrição
Um site interativo para saber tudo sobre filmes. O site é baseado na API do TMDB para renderizações das páginas, carrosséis e pesquisa.

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
  
  ![Sidebar](caminho-para-sua-imagem/sidebar.jpg)

- **Página Inicial (Home)**
  - Galeria/carrossel interativo com botões para modificar os conteúdos.
  - Textos de curiosidades.
  - Botões para modificar o conteúdo do segundo carrossel.

  ![Home](caminho-para-sua-imagem/home.jpg)

- **Páginas - Movies, Series, Actors e Search**
  - Essas páginas utilizam o componente **CardList**, que recebe os dados através de uma busca no backend e retorna os resultados exibidos como cards no navegador.
  
  -![Card List](caminho-para-sua-imagem/card-list.jpg)
  - Os componentes que utilizam o **CardList** também possuem um outro componente chamado **Pagination**.
  - Esse componente recebe a quantidade total de páginas dos resultados e permite a navegação entre elas, garantindo que o conteúdo não fique limitado a apenas uma página.

  ![Pagination](caminho-para-sua-imagem/pagination.jpg)

## Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript, React e bibliotecas adicionais.
- **Backend**: Node.js

## Como Rodar o Projeto

1. Clone o Repositório

2. Instale as Dependências:
   ```bash
   npm install

2. Rode o Projeto:
   ```bash
   npm run dev
