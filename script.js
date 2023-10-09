const pokemonRepository = (function() {
    let pokemonList = [];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    return {
        getAll: getAll,
        add: add
    };
})();

let specialHeight = 6;

const pokemon1 = {
    name: "Bulbasaur",
    height: 7,
    types: ['grass', 'poison']
};
pokemonRepository.add(pokemon1);

const pokemon2 = {
    name: "Charmander",
    height: 6,
    types: ['fire']
};
pokemonRepository.add(pokemon2);

const pokemon3 = {
    name: "Squirtle",
    height: 5,
    types: ['water']
};
pokemonRepository.add(pokemon3);

pokemonRepository.getAll().forEach(pokemon => {
    const ulElement = document.querySelector('.pokemon-list'); // Corrected selector
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    ulElement.appendChild(listItem);

    if (pokemon.height > specialHeight) {
        document.write(`${pokemon.name} (height:${pokemon.height}) - wow, that's big!<br>`); // Corrected document.write
    } else if (pokemon.height > 5) {
        document.write(`${pokemon.name} is an averaged sized pokemon.<br>`); // Corrected document.write
    } else {
        document.write(`${pokemon.name} is a small pokemon.<br>`); // Corrected document.write
    }
});
