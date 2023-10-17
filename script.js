const pokemonRepository = (function () {
    let pokemonList = [];

    function addButtonEventListener(button, pokemon) {
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }
    

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon && 'height' in pokemon && 'types' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.error('Invalid pokemon data');
        }
    }

    function addListItem(pokemon) {
        // 1. Create an li element
        let listItem = document.createElement('li');

        // 2. Create a button and set its text to the Pokémon's name
        let button = document.createElement('button');
        button.innerText = pokemon.name;

        // 3. Add a class to the button
        button.classList.add('custom-button');

        // 4. Append the button to the listItem
        listItem.appendChild(button);

        // 5. Append the listItem to the unordered list
        document.querySelector('.pokemon-list').appendChild(listItem);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem  // this line makes the function publicly accessible
    };
})();

let specialHeight = 6;

const pokemon1 = {
    name: "Bulbasaur",
    height: 7,
    types: ["grass", "poison"]
};
pokemonRepository.add(pokemon1);

const pokemon2 = {
    name: "Charmander",
    height: 6,
    types: ["fire"]
};
pokemonRepository.add(pokemon2);

const pokemon3 = {

    name: "Blastoise",
    height: 5,
    types: ["water"]
};
pokemonRepository.add(pokemon3);

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});

