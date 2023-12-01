$(document).ready(function () {

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
      listItem.classList.add('list-group-item');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('btn', 'btn-primary');
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

      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {

        item.imageUrl = details.sprites.front_default;
        item.height = details.height;

      }).catch(function (e) {
        console.error(e);
      });
    }

    function showDetails(pokemon) {

      loadDetails(pokemon).then(function () {

        document.querySelector('.modal-title').innerText = pokemon.name;
        document.querySelector('.modal-body').innerHTML = `
        <p><strong>Height:</strong> ${pokemon.height}</p>
        <img src="${pokemon.imageUrl}" alt="Image of ${pokemon.name}">
      `;
        $('#pokemonModal').modal('show');
      });
    }


    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList
    };
  })();

  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });

});