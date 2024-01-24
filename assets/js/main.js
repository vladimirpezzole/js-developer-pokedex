const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `    
    <button class="viewPokemonButton" type="button" onclick="getPokemonDetailsById(${
      pokemon.number
    })">
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>

    </button>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

function loadPokemonDetail(id) {
  return pokeApi.getPokemonDetailId(id);
}

loadMoreButton.addEventListener("click", () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
      const newLimit = maxRecords - offset;
      loadPokemonItens(offset, newLimit);

      loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
      loadPokemonItens(offset, limit);
    }
  });

// Funções para pagina de detalhes
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


