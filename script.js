let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item'); // Bootstrap list item classes
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-primary'); // Bootstrap button classes
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
    listItem.appendChild(button);
    list.appendChild(listItem);
  }

  async function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  async function loadDetails(item) {
    let url = item.detailsUrl;
    console.log('Loading details for:', item.name); // Add console log for debugging
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Assign details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      // You can add more details here
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon); // Add console log for debugging
    loadDetails(pokemon).then(function () {
      // Fill in modal details
      document.querySelector('.modal-title').innerText = pokemon.name;
      document.querySelector('.modal-body').innerHTML = `
        <p><strong>Height:</strong> ${pokemon.height}</p>
        <img src="${pokemon.imageUrl}" alt="Image of ${pokemon.name}">
      `;
      $('#pokemonModal').modal('show'); // Use Bootstrap's modal method to show the modal
    });
  }

  // Public methods and properties
  return {
    add: add, // Add a Pokemon to the list
    getAll: getAll, // Get all the Pokemon in the list
    addListItem: addListItem, // Add a list item for a Pokemon
    loadList: loadList // Load the list of Pokemon from the API
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

$()