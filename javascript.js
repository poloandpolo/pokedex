const contenedor = document.getElementById("mainContainer")
const searchingBar = document.getElementById("searchingBar")


const getPokemons = async (id) => {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

    const data = await response.json()

    return (data)
}

const writePokemons = async (numberPokemons) => {
    
    for (let i = 1; i <= numberPokemons; i++) {

        const tempPokemon = (await getPokemons(i))

        if ((Boolean(tempPokemon.types[1]))){
            contenedor.innerHTML += `<div class="pokecard" pokemon-name=${tempPokemon.name} pokemon-id=${tempPokemon.id}>
            <img src="${tempPokemon.sprites.front_default}" alt="">
                <p>${tempPokemon.name}</p>
                <p>Type: "${tempPokemon.types[0].type.name}, ${tempPokemon.types[1].type.name}"</p>
        </div>`
        }else{
            contenedor.innerHTML += `<div class="pokecard" pokemon-name=${tempPokemon.name} pokemon-id=${tempPokemon.id}>
            <img src="${tempPokemon.sprites.front_default}" alt="">
                <p>${tempPokemon.name}</p>
                <p>Type: "${tempPokemon.types[0].type.name}"</p>
        </div>`
    }
    }
}

writePokemons(200).then(() => {
    const data = Array.from(document.querySelectorAll(".pokecard"))

    console.log(data)

    searchingBar.addEventListener("keyup", async (e) => {

        if (searchingBar.value == ""){
            let tempHtml = ""

            data.forEach((pokecard) => {
                tempHtml += `<div class="pokecard">${pokecard.innerHTML}</div>`
            })

            contenedor.innerHTML = tempHtml

        }else{
            
            let tempHtml = "";
            const inputValue = searchingBar.value.toLowerCase(); 
        
            const filteredPokemon = data.filter((pokemon) => {
                const pokemonName = pokemon.getAttribute("pokemon-name").toLowerCase(); 
                return pokemonName.includes(inputValue); 
            });
        
            filteredPokemon.forEach((pokemon) => {
                tempHtml += `<div class="pokecard">${pokemon.innerHTML}</div>`;
            });
        
            contenedor.innerHTML = tempHtml;
        }
    
})
})





