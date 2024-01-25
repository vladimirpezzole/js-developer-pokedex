// Obter detalhes do Pokémon a partir da URL
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
        // *Inserir depois as propriedades para as outras abas 
      };
    });
}

// Exibir detalhes do Pokémon 
// na DOM <section id="content" class="content">
function displayPokemonDetails(pokemonDetails) {
  const pokemonInfo = document.createElement('div');
  
  pokemonInfo.innerHTML = `
    <ol id="pokemonListDetails" class="">
      <li class="pokemon ${pokemonDetails.primaryType}">

        <div class="backLink">
          <a href="index.html">
            <button><i class="fas fa-arrow-left"></i></button>
          </a>
          <button id="heartButton"><i class="far fa-heart"></i></button>
        </div>

        <div class="detail">
          <div>
            <div class="name">${pokemonDetails.name}</div>
            <div class="number">#${pokemonDetails.id}</div>
            <ol class="types">
              ${pokemonDetails.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
          </div>

          <div class="photo">
            <img src="${pokemonDetails.photo}" alt="${pokemonDetails.name}">
          </div>
        </div>

        <div class="skills">
          <div class="tab-container">
            <div class="tab-header">
              <div class="tab active" onclick="openTab('about', this)">About</div>
              <div class="tab" onclick="openTab('base-stats', this)">Base Stats</div>
              <div class="tab" onclick="openTab('evolution', this)">Evolution</div>
              <div class="tab" onclick="openTab('moves', this)">Moves</div>
            </div>

            <div class="tab-content active" id="about">
              <div>
                <div><span>Species</span><span>Seed</span></div>
                <div><span>Height</span><span>2'3.6" (0.70 cm)</span></div>
                <div><span>Weight</span><span>15.2 lbs (6.9 kg)</span></div>
                <div><span>Abilities</span><span>Overgrow, Chlorophyl</span></div>

                <div class="tab-container-subtitle"><span><strong>Breeding</strong></span></div>
                <div><span>Gender</span><span>M 87.5% F 12.5%</span></div>
                <div><span>Egg Groups</span><span>Monster</span></div>
                <div><span>Egg Cycles</span><span>Grass</span></div>
              </div>
            </div>

            <div class="tab-content" id="base-stats">
              <div>Conteúdo da aba 'Base Stats'</div>
              <p>------- --------------------</p>
              <p>------- --------------------</p>
              <p>------- --------------------</p>
              <p>------- --------------------</p>
              <p>------- --------------------</p>
              <p>------- --------------------</p>
            </div>

            <div class="tab-content" id="evolution">
              <div>Conteúdo da aba 'Evolution'</div>
              <p>------- --------------------</p>
              <p>------- --------------------</p>
              <p>------- --------------------</p>
              <p>------- --------------------</p>
              <p>------- --------------------</p>
              <p>------- --------------------</p>
            </div>

            <div class="tab-content" id="moves">
              <div>Conteúdo da aba 'Moves'</div>
              <p>------- --------------------</p>
              <p>------- --------------------</p>
              <p>------- --------------------</p>
              <p>------- --------------------</p>
              <p>------- --------------------</p>
              <p>------- --------------------</p>
            </div>
          </div>
        </div>
      </li>
    </ol>
  `;

  const content = document.getElementById('content');
  const contentPokemon = document.getElementById('contentPokemon');

  content.replaceChild(pokemonInfo, contentPokemon);
  
  // Substitui o Coracao vazado pelo preenchido e vice-versa
  const heartButton = document.getElementById('heartButton');
  heartButton.addEventListener('click', function() {
    this.querySelector('i').classList.toggle('far');
    this.querySelector('i').classList.toggle('fas');
  });
}

// Principal obter e mostra detalhes do Pokémon
function getPokemonDetailsById(pokemonId) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

  fetchPokemonDetails(url)
    .then(displayPokemonDetails)
    .catch(error => console.error("Erro ao obter informações:", error));
}


