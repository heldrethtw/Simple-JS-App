let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  /**
   * Adds a Pokemon object to the pokemonList array.
   * @param {Object} pokemon - The Pokemon object to add.
   */
  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.error('Invalid pokemon data');
    }
  }

  /**
   * Returns the pokemonList array.
   * @returns {Array} - The array of Pokemon objects.
   */
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let listItem = document.createElement('li');
    listItem.classList.add('group-list-item');
    let button = document.createElement('button');
    button.innerHTML = pokemon.name;
    button.classList.add('btn', 'btn-primary', 'custom-button');
    listItem.appendChild(button);
    document.querySelector('.pokemon-list').appendChild(listItem);

    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }
  /**
   * Displays the details of a selected Pokemon.
   * @param {Object} pokemon - The Pokemon object to display details for.
   */

  /*}
  function getAll() {
    return pokemonList;
  }


  /**
   * Adds a list item with a button for a given Pokemon.
   * @param {Object} pokemon - The Pokemon object to add to the list.
   */


  /**
   * Loads the list of Pokemon from the API.
   */
  async function loadList() {
    console.log('loadList called');
    try {
      const response = await fetch(apiUrl);
      console.log(response);
      const json = await response.json();
      console.log(json);
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Fetches additional details for a given Pokemon item.
   * @param {Object} item - The Pokemon item to fetch details for.
   * @returns {Promise} - A promise that resolves when the details are loaded.
   */
  async function loadDetails(item) {
    let url = item.detailsUrl;
    try {
      const response = await fetch(url);
      const details = await response.json();
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Shows a modal with the specified title and content.
   * @param {string} title - The title of the modal.
   * @param {Array} contentElements - An array of DOM elements to be displayed in the modal body.
   */
  function showModal(title, contentElements) {

    let modalTitle = document.querySelector('#pokemonModalLabel');
    let modalBody = document.querySelector('.modal-body');


    modalTitle.innerText = title;
    modalBody.innerHTML = '';

    contentElements.forEach(function (element) {
      modalBody.appendChild(element);
    });

    $('#pokemonModal').modal('is-visible');
    // Rest of the code for displaying the modal...
  }

  /**
   * Hides the modal.
   */
  function hideModal() {
    $('#pokemonModal').modal('is-visible');
  }

  /**
   * Shows the details of a given Pokemon.
   * @param {Object} pokemon - The Pokemon object to show details for.
   */
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let content = [];

      let nameElement = document.createElement('p');
      nameElement.innerText = `Name: ${pokemon.name}`;

      let heightElement = document.createElement('p');
      heightElement.innerText = `Height: ${pokemon.height}`;

      let imageElement = document.createElement('img');
      imageElement.src = pokemon.imageUrl;

      content.push(nameElement, heightElement, imageElement);

      showModal('Pokémon Details', content);
    }).catch(function (error) {
      console.log(error);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    hideModal: hideModal
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

