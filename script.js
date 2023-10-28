let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    function add(pokemon) {
      if (typeof pokemon === 'object' && 'name' in pokemon) {
        pokemonList.push(pokemon);
      } else {
        console.error('Invalid pokemon data');
      }
    }
  
    function getAll() {
      return pokemonList;
    }
  
    function addListItem(pokemon) {
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('custom-button');
      listItem.appendChild(button);
      document.querySelector('.pokemon-list').appendChild(listItem);
  
      button.addEventListener('click', function () {
        showDetails(pokemon);
      });
    }
  
    function loadList() {
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
  
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }
  
    function showModal(title, contentElements) {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.innerHTML = '';
  
      let modal = document.createElement('div');
      modal.classList.add('modal');
  
      let closeButton = document.createElement('button');
      closeButton.innerText = 'Close';
      closeButton.addEventListener('click', hideModal);
  
      let titleElement = document.createElement('h1');
      titleElement.innerText = title;
  
      modal.appendChild(closeButton);
      modal.appendChild(titleElement);
  
      contentElements.forEach((element) => {
        modal.appendChild(element);
      });
  
      modalContainer.appendChild(modal);
      modalContainer.classList.add('is-visible');
    }
  
    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
    }
  
    function showDetails(pokemon) {
      loadDetails(pokemon).then(() => {
        let content = [];
  
        let nameElement = document.createElement('p');
        nameElement.innerText = `Name: ${pokemon.name}`;
  
        let heightElement = document.createElement('p');
        heightElement.innerText = `Height: ${pokemon.height}`;
  
        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;
  
        content.push(nameElement, heightElement, imageElement);
  
        showModal('Pokémon Details', content);
      });
    }
  
    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
  })();
  
  // Fetch data and populate the list
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
  
  // Event listeners for modal interactions
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      pokemonRepository.hideModal();
    }
  });
  
  document.querySelector('#modal-container').addEventListener('click', (e) => {
    let target = e.target;
    let modalContainer = document.querySelector('#modal-container');
    if (target === modalContainer) {
      pokemonRepository.hideModal();
    }
  });
  