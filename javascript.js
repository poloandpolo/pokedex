const contenedor = document.getElementById("mainContainer");
const searchingBar = document.getElementById("searchingBar");

const getPokemons = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
};

const writePokemons = async (numberPokemons) => {
    const pokemonPromises = [];
    for (let i = 1; i <= numberPokemons; i++) {
        pokemonPromises.push(getPokemons(i));
    }

    const allPokemons = await Promise.all(pokemonPromises);

    let html = '';
    allPokemons.forEach((tempPokemon) => {
        if (tempPokemon.types[1]) {
            html += `<div class="pokecard" pokemon-name="${tempPokemon.name}" pokemon-id="${tempPokemon.id}">
                        <img src="${tempPokemon.sprites.front_default}" alt="">
                        <p>${tempPokemon.name}</p>
                        <p>Type: ${tempPokemon.types[0].type.name}, ${tempPokemon.types[1].type.name}</p>
                     </div>`;
        } else {
            html += `<div class="pokecard" pokemon-name="${tempPokemon.name}" pokemon-id="${tempPokemon.id}">
                        <img src="${tempPokemon.sprites.front_default}" alt="">
                        <p>${tempPokemon.name}</p>
                        <p>Type: ${tempPokemon.types[0].type.name}</p>
                     </div>`;
        }
    });

    contenedor.innerHTML = html;
};

writePokemons(1025).then(() => {
    const data = Array.from(document.querySelectorAll(".pokecard"));

    searchingBar.addEventListener("keyup", () => {
        let tempHtml = "";
        const inputValue = searchingBar.value.toLowerCase();

        if (inputValue === "") {
            data.forEach((pokecard) => {
                tempHtml += `<div class="pokecard">${pokecard.innerHTML}</div>`;
            });
        } else {
            const filteredPokemon = data.filter((pokemon) => {
                const pokemonName = pokemon.getAttribute("pokemon-name").toLowerCase();
                return pokemonName.includes(inputValue);
            });

            filteredPokemon.forEach((pokemon) => {
                tempHtml += `<div class="pokecard">${pokemon.innerHTML}</div>`;
            });
        }

        contenedor.innerHTML = tempHtml;
    });
});






