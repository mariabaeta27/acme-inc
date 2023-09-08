# Teste prático Acme-Inc.

Projeto desenvolvido como parte do processo seletivo da People Caplink
 

## Solicitação: 

A Acme é uma empresa que atua vendendo produtos genéricos e preza bastante pela qualidade de suas soluções e por estar sempre um passo à frente do mercado em relação ao uso de tecnologia e design de suas aplicações.

Este aplicativo deverá conter:

### Páginas
- Uma página de autenticação, possibilitando o cadastro e/ou o acesso do usuário.
  - Campos do formulário de cadastro: nome, email, telefone e senha;
  - Campos do formulário de login: email e senha;
- Uma página inicial, que deverá mostrar uma lista de produtos da Acme
- Uma página do produto, que deverá ser acessada ao clicar em um desses produtos da tela inicial

### Funcionalidades
- O usuário deve poder se cadastrar e acessar sua conta
- Os dados das contas cadastradas devem ser persistidos via local storage.
- Um botão de carrinho posicionado em algum local da tela (fica a seu critério) onde o usuário poderá acessar o estado atual do carrinho de qualquer lugar da aplicação.
- Não é necessário associar o carrinho a uma conta específica.
- O usuário deve poder ver a página inicial, mas só poderá adicionar itens comofavoritos caso esteja logado.
-Possibilidade de selecionarmos produtos como “favoritos”, em ambas as páginas
- Possibilidade de, na página inicial, filtrar produtos pelo status “favorito” ou pelo nome do produto
- Possibilidade de adicionar e remover itens do carrinho (carrinho e favorito são duas coisas
diferentes!)
- Possibilidade de realizar o “checkout” do seu carrinho, o que deverá gerar um JSON com a lista de produtos que estavam no carrinho no momento do checkout e também trazer
quaisquer informações da sessão do usuário que considere relevante.
- O usuário pode adicionar itens no carrinho sem estar logado, mas ao realizar o checkout, o site deve solicitar a autenticação primeiro.

### Informações do projeto: 

Projeto desenvolvido utilizando Next 13 + Tailwind Css

Projeto hospedado na Vercel: https://acme-inc-eight.vercel.app/

### Primeiros passos:

 - Clone o projeto: [Repositorio do Git](https://github.com/mariabaeta27/acme-inc.)
 - Acesse a pasta do projeto
 - Istale as depedencias com o comando: (Recomendo a utilização do Yarn como gerenciador de pacotes, mas pode usar o de sua preferência)

  ````
    yarn
  ````

### Rodando o projeto

- Com o comando a seguir rode
````
  yarn dev

  http://localhost:8000/

````
OBS: Ao rodar o projeto, o navegado irá te direcionar para rota local informada a cima.


