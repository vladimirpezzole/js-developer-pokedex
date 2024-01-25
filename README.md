# Desenvolvimento Frontend com Angular
## Trilha JS Developer - Pokedex -- Desafio de projeto

----

 ### ****A finalidade deste README é descrever de forma simples, mas com detalhes, o que foi feito para resolver o desafio, afim de servir de uma possível consulta para quem possa interessar.***

 **Muitas melhorias e outras informações podem ser acrescentadas, mas este é um execício a fim didático que pode ou não ser ampliado.**


----

![Pokedex](/assets/img/pokedex2.png)

## Construindo uma Pokédex com JavaScript

**Link Uteis**

- Imagem de referencia: https://dribbble.com/shots/6540871-Pokedex-App/attachments/6540871-Pokedex-App?mode=media
- PokéAPI https://pokeapi.co/

**URLs utilizadas para consulta na API**
- Para listar os Pokemons: https://pokeapi.co/api/v2/pokemon?offset=0&limit=10
- Para listar os etalhes individuais do Pokémons: https://pokeapi.co/api/v2/pokemon/1/

---
**http-server**
- ****Caso precise instalar o 'http-server' via >> [NPN](https://www.npmjs.com/package/http-server)*** 
`npm i http-server`

- **Comando para iniciar servidor local de teste** 
`http-server ./`

---

---

**>> Entendendo o Desafio**
 
> Entenda a importância do Git/GitHub nos Desafios de Projeto da DIO, além de explorar o mundo Pokémon através do consumo de uma API REST para a criação de uma Pokédex incrível! Para isso, você irá explorar, além do JavaScript, todos os fundamentos de desenvolvimento Web aprendidos até aqui.
 
> Agora é sua hora de brilhar! Explore todos os conceitos que aprendemos nesta imersão e replique (ou melhore) este projeto prático. Para isso, use seu próprio repositório no GitHub e, com isso, aumente ainda mais seu portfólio de projetos!
 
> Dica: você pode dar um "fork" no Repositório do GitHub (App) para organizar suas alterações e evoluções, mantendo uma referência direta ao código original.
 
>**GitHub** - Todo código-fonte desenvolvido para este conteúdo foi versionado no GitHub, no seguinte endereço:
https://github.com/digitalinnovationone/js-developer-pokedex

----
----
# Desafio:

## **Desenvolver a partir do que foi estudado a página de detalhes com integração a API** [![Pokedex](/assets/img/pokeapi.png)](https://pokeapi.co/)


![Pokedex](/assets/img/p0.gif)
---

## **Descrevendo as alterações que foram feitas em cima do Fork >> <small> https://github.com/digitalinnovationone/js-developer-pokedex** </small>


Os **cartões da lista de Pokémons** foram convertidos em **Buttons** 

![Pokedex](/assets/img/p0.png)

que quando clicados chamam uma página de detalhes. 

![Pokedex](/assets/img/p1.png)

Para isso no arquivo **'main.js'** dentro da **função** **'convertPokemonToLi'**, a `<li>`, retornada pela função, foi envolvida com um `<button>` que quando clicado chama a função `getPokemonDetailsById(<ID do pokémon>)` , passando o **ID do pokémon** como parâmetro, localizada novo arquivo **poke-api-byId.js**.

```js
function convertPokemonToLi(pokemon) {
  return `    
    <button class="viewPokemonButton" type="button" onclick="getPokemonDetailsById(${pokemon.number})">
        <li class="pokemon ${pokemon.type}">
            <----->
        </li>
    </button>
    `;
}
```

Dentro do arquivo **'poke-api-byId.js'** a função **'getPokemonDetailsById'** chamada pelo **Button**, 
chama a função `fetchPokemonDetails(url)` , passando a **url** `https://pokeapi.co/api/v2/pokemon/${pokemonId}/` como parâmetro.

```js
function getPokemonDetailsById(pokemonId) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

  fetchPokemonDetails(url)
    .then(displayPokemonDetails)
    .catch(error => console.error("Erro ao obter informações:", error));
}
```

A  função **'fetchPokemonDetails'**, por sua vez, obtém detalhes do Pokémon a partir da **URL**...  

```js
function fetchPokemonDetails(url) {
  return fetch(url)
    .then(response => response.json())
    .then(pokemonDetails => {
      return {
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        types: pokemonDetails.types.map(type => type.type.name),
        primaryType: pokemonDetails.types[0].type.name,
        photo: pokemonDetails.sprites.other.dream_world.front_default,
        // *mais propriedades podem ser adicionadas aqui
      };
    });
}
```

...que retorna as informações como parâmetro para função **'displayPokemonDetails'** que aguarda para exibir detalhes do Pokémon na DOM dentro da `<section id="content">`.

Na função as informações são passadas ao **HTML** dentro da *constante* **'pokemonInfo'** 

```js
function displayPokemonDetails(pokemonDetails) {
  const pokemonInfo = document.createElement('div');

  pokemonInfo.innerHTML = 
  `
    <ol id="pokemonListDetails" class="">
      <li class="pokemon ${pokemonDetails.primaryType}">

        <div class="backLink">
            <----->
        </div>

        <div class="detail">
            <div>
                <div class="name">${pokemonDetails.name}</div>
                <div class="number">#${pokemonDetails.id}</div>
                <ol class="types">
                ${pokemonDetails.types.map(type => 
                `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>

            <div class="photo">
                <img src="${pokemonDetails.photo}" 
                alt="${pokemonDetails.name}">
            </div>
        </div>

        <div class="skills">
          <----->
        </div>

      </li>
    </ol>
  `;
    <----->
```
*...continuando a função.*

Essas linhas abaixo declaram as variáveis, **content** e **contentPokemon**, usando **document.getElementById** para obter referências aos elementos HTML com os IDs **content** e **contentPokemon**. 
```js
    <----->
  const content = document.getElementById('content');
  const contentPokemon = document.getElementById('contentPokemon');
   <----->
```

O método **replaceChild** substitui o elemento com o ID **contentPokemon** `<main id="contentPokemon">`, pelo elemento da *constante* **pokemonInfo**, dentro do elemento **pai** com o ID **content** `<section id="content">`, na DOM do arquivo **index.html**. 

```js
    <----->
  content.replaceChild(pokemonInfo, contentPokemon);
    <----->
```


Na parte final o **evento** acionado pelo **Button** no ícone do **coração**

![Pokedex](/assets/img/c1.png)

substitui a **classe 'far'** *(**coração vazado**)*, do ícone, 

```js
    <----->
  const heartButton = document.getElementById('heartButton');

  heartButton.addEventListener('click', function() {
    this.querySelector('i').classList.toggle('far');
    this.querySelector('i').classList.toggle('fas');
  });
}

```

pela  **classe 'fas'** **'far'** *(**coração preenchido**)*  e vice-versa.

![Pokedex](/assets/img/c2.png)

----

<br>

 Voltando ao arquivo **'main.js'**...

A **função 'openTab'** controla as abas na página de detalhes

```js
function openTab(tabId, tabElement) {
  // Oculta todos os conteúdos da aba
  var tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach(function (content) {
    content.classList.remove("active");
  });

  // Remove a classe 'active' de todas as abas
  var tabs = document.querySelectorAll(".tab");
  tabs.forEach(function (tab) {
    tab.classList.remove("active");
  });

  // Mostra apenas o conteúdo da aba selecionada
  var selectedTabContent = document.getElementById(tabId);
  if (selectedTabContent) {
    selectedTabContent.classList.add("active");
  }

  // Adiciona a classe 'active' à aba clicada
  tabElement.classList.add("active");
}
```
![Pokedex](/assets/img/a1.png)

----
----