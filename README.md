


Pokémon Repository Module
Description
This module is designed to interact with the Pokémon API to manage a Pokémon list in a web application. It allows fetching data from the Pokémon API, displaying a list of Pokémon, and showing details for each Pokémon in a modal.

Features
Fetch a list of Pokémon from the Pokémon API.
Display each Pokémon as an item in a list.
Show detailed information about each Pokémon in a modal.
Methods
add(pokemon): Adds a new Pokémon to the repository.
getAll(): Retrieves all Pokémon from the repository.
addListItem(pokemon): Creates a list item for a Pokémon and adds it to the DOM.
loadList(): Loads Pokémon list from the Pokémon API.
loadDetails(item): Loads detailed information for a specific Pokémon.
showDetails(pokemon): Displays detailed information about a Pokémon in a modal.
Usage
Initializing the Pokémon List:

Call pokemonRepository.loadList() to fetch Pokémon from the API and initialize the list.
Displaying Pokémon List:

Use pokemonRepository.getAll() to retrieve all Pokémon.
Use pokemonRepository.addListItem(pokemon) to display each Pokémon as a list item.
Showing Pokémon Details:

Click on a Pokémon list item to display its details in a modal.
Dependencies
Bootstrap (for styling and modal functionality)
jQuery (for DOM manipulation and Bootstrap's modal functionality)
Installation
Include the module in your HTML file:

html
Copy code
<script src="path/to/pokemonRepository.js"></script>
Ensure that Bootstrap and jQuery are also included in your project.

Notes
The list of Pokémon is initially empty and populated dynamically from the Pokémon API.
The module uses async functions and promises for API calls.