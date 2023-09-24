let pokemonList = []

//Pokemon 1
const pokemon1 =
{
    name: "Bulbasaur",
    height: 7,
    types: [grass, poison]
};
pokemonList.push(pokemon1);

//Pokemon2
const pokemon2 = {
    name: "Charmander",
    height: 6,
    types: ['fire']
};
pokemonList.push(pokemon2)

//Pokemon 3
const pokemon3 = {
    name: "Squirtle",
    height: 5,
    types: ['water']
};
pokemonList.push(pokemon3)

console.log(pokemonList);

//set height edge for unique pokemon

let specialHeight = 6;

//iterate over each pokemon
for (let i = 0; i < pokemonList.length; i++) {
    const pokemon = pokemonList[i];

    //check the height of the pokemon and write a message based on the height 
    if (pokemon.height > specialHeight) {
        document.write(`${pokemon.name} (height:${pokemon.height} - wow, that's big!<br>`);
    } else if (pokemon.height > 5) {
        document.write(`${pokemon.name} is an averaged sized pokemon.<br>`);
    } else {
        document.write(`${pokemon.name} is a small pokemon.<br>`);
    }
}