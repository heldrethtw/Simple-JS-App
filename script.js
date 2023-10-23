let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=150';


    document.addEventListener('DOMContentLoaded', function () {
        // Get all buttons with the 'custom-button' class
        let buttons = document.querySelectorAll('.custom-button');

        // Loop through each button and add a mouseover event listener
        buttons.forEach(function (button) {
            button.addEventListener('mouseover', function (event) {
                console.log('Button hovered: ', event.target.innerText);
            });
        });
    });




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
        function addButtonEventListener(button, pokemon) {
            button.addEventListener('click', function () {
                showDetails(pokemon);
            });
        }
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
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    function showLoadingMessage() {
        const loadingDiv = document.createElement('div');
        loadingDiv.innerText = 'Loading...';
        loadingDiv.id = 'loadingDiv';
        document.body.appendChild(loadingDiv);
    }

    function hideLoadingMessage() {
        const loadingDiv = document.getElementById('loadingDiv');
        if (loadingDiv) {
            document.body.removeChild(loadingDiv);
        }
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showLoadingMessage: showLoadingMessage,
        hideLoadingMessage: hideLoadingMessage
    };
})();

pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


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

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});

