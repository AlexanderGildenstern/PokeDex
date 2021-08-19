let allPokemons = [];       // JSON Array of Pokemons
let currentColorBg;         // background for pokemon cards
let amountPokemons;         // amount of pokemon
let loadActuallyCards = 0;


/**
 * initialize the Website
 * 
 */
function init() {
    loadMoreCards();
}

/* optional
window.onscroll = function() {
            if(window.scrollY > 200) {
                // Lade 20 weitere pokeom
            } 

            if(window.scrollY > 400) {
                // Lade 20 weitere pokeom
            }       
          }
*/

/**
 * show 20 more Pokemon cards
 * 
 */
function loadMoreCards() {
    loadActuallyCards += 20;
    loadPokemonAmount(loadActuallyCards);
}

/**
 * Load the pokemons amount of the first generation
 * 
 * @param {number} loadActuallyCards - Actually Pokemon cards
 */
async function loadPokemonAmount(loadActuallyCards) {
    let url = 'https://pokeapi.co/api/v2/generation/1/';
    let response = await fetch(url);
    let responseAsJson = await response.json();
    generation1_Pokemons = responseAsJson;  // amount Pokemons of generation 1
    amountPokemons = generation1_Pokemons['pokemon_species'].length;
    loadAllPokemons(loadActuallyCards);
}

/**
 * safe all Pokemons in a Array
 * 
 * @param {number} loadActuallyCards - Actually Pokemon cards
 */
async function loadAllPokemons(loadActuallyCards) {
    let x = 0;

    if (loadActuallyCards > 19) {
        x = loadActuallyCards - 20;
    }
    if (loadActuallyCards > amountPokemons) {
        loadActuallyCards = amountPokemons;
    }
    for (let i = x; i < loadActuallyCards; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
        let response = await fetch(url);
        let responseAsJson = await response.json();
        allPokemons[i] = responseAsJson;
    }
    renderPokemonCards(loadActuallyCards, x);
}

/**
 * Show Pokemoncards in the main
 * 
 * @param {number} loadActuallyCards - Actually Pokemon cards
 * @param {number} x - start at number of x
 */
function renderPokemonCards(loadActuallyCards, x) {
    for (i = x; i < loadActuallyCards; i++) {
        document.getElementById('all-pokemon-container').innerHTML += generatePokemonCardsHtml(i);
        showNumber(i);
        showName(i);
        showImage(i);
        showTypes(i);
    }
}

/**
 * Generate Html code of Pokemon Cards
 * 
 * @param {number} i - Number of position
 * @returns 
 */
function generatePokemonCardsHtml(i) {
    return `
    <div id="card${i}" class="card" onclick="showOverlay(${i})">
        <div class="card-row-left">
            <h2 class="card-title" id="card-title${i}"></h2>
            <div>
                <div class="card-element card-text " id="card-element${i}">
                </div>
                <div class="card-type card-text" id="card-type${i}">
                </div>
            </div>
        </div>
        <div class="card-row-right">
            <div class="card-number">
                <div>
                    #<span id="card-number${i}"></span>
                </div>
            </div>
            <div class="card-img">
                <img id="card-image${i}" src="">
            </div>
        </div>
    </div>
`;
}

/**
 * Show the number of the Pokemon
 * 
 * @param {number} i - Number of position
 */
function showNumber(i) {
    let pokemonNumber = i + 1;
    if (i < 9) {
        pokemonNumber = `0${pokemonNumber}`;
    }
    if (i < 99) {
        pokemonNumber = `0${pokemonNumber}`;
    }
    document.getElementById('pokemon-number').innerHTML = pokemonNumber;
    document.getElementById(`card-number${i}`).innerHTML = pokemonNumber;
}

/**
 * Show the name of the Pokemon
 * 
 * @param {number} i - Number of position
 */
function showName(i) {
    let pokemonName = allPokemons[i]['name'];
    document.getElementById(`card-title${i}`).innerHTML = pokemonName;
    document.getElementById('pokemonName').innerHTML = pokemonName;
}

/**
 * Show the image in the main and in singel cards
 * 
 * @param {number} i - Number of position
 */
function showImage(i) {
    let pokemonImage = allPokemons[i]['sprites']['other']['dream_world']['front_default'];
    document.getElementById(`card-image${i}`).src = pokemonImage;
    document.getElementById('pokemonImage').src = pokemonImage;
}

/**
 * show the types in main and single cards
 * 
 * @param {number} i - Number of position
 */
function showTypes(i) {
    let type1 = allPokemons[i]['types'][0]['type']['name'];
    let type2 = allPokemons[i]['types'].length;

    document.getElementById(`card-element${i}`).innerHTML = type1;
    document.getElementById('pokemon-type').innerHTML = type1;

    document.getElementById(`card-type${i}`).innerHTML = type2;
    document.getElementById('pokemon-sort').innerHTML = type2;

    currentColorBg = `type-${type1}`;
    document.getElementById(`card${i}`).classList.add(currentColorBg);
    removeType2(type1, type2, i);
}

/**
 * show singel cards
 * 
 * @param {number} i - Number of position
 */
function showOverlay(i) {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('overlay').innerHTML = generateSingelCardsHtml(i);
    showNumber(i);
    showName(i);
    showImage(i);
    showTypes(i);
    showAboutPokemon(i);
    showBgcolor(i);
}

/**
 * Generate Html of singel cards
 * 
 * @param {number} i - Number of position
 * @returns 
 */
function generateSingelCardsHtml(i) {
    return `        
    <div id="pokemon-background" class="pokemon-background">
        <div class="pokemon-header">
            <div class="button-back">
                <img onclick="closeOverlay()" src="img/left-arrow.png">
            </div>
            <div id="pokemon">
                <h1 id="pokemonName">Name</h1>
            </div>

            <div class="pokemon-number">
                    #<span id="pokemon-number">001</span>
            </div>
        </div>
        <div class="pokemon-sort flex">
            <div>
                <span class="bg-text" id="pokemon-type">Fire</span>
            </div>
            <div>
                <span class="bg-text" id="pokemon-sort">Flying</span>
            </div>
        </div>
    </div>
    <div class="info-container">
        <img id="pokemonImage" class="pokemonImage">
        <div id="pokemon-info-head" class="pokemon-info-head flex">
            <div onclick="showAbout(${i})" id="about" class="redBorderLine ">
                About
            </div>
            <div id="baseStats" onclick="showBaseStats(${i})" class=" baseStats color-gray">
                Base Stats
            </div>
        </div>
        <div>
            <table id="table-overflow${i}" class="table-overflow">
                <tr>
                    <td>Height</td>
                    <td id="height">60 cm</td>
                </tr>
                <tr>
                    <td>Weight</td>
                    <td id="weight">8.5 kg</td>
                </tr>
                <tr>
                    <td>Abilities</td>
                    <td id="abilities">Blaze,solar-Power</td>
                </tr>
            </table>
        </div>
    </div>
`;
}

/**
 *  show Base Stats of single pokemon cards
 * 
 * @param {number} i - Number of position
 */
function showBaseStats(i) {
    document.getElementById('baseStats').classList.add('redBorderLine');
    document.getElementById('about').classList.remove('redBorderLine');
    document.getElementById('baseStats').classList.remove('color-gray');
    document.getElementById('about').classList.add('color-gray');
    chooseCurrentColor(i);
    document.getElementById('pokemon-background').style.height = '750px';
}
/**
 * Choose the right background-color of the Pokemon
 * 
 * @param {number} i - Number of position
 */
function chooseCurrentColor(i) {
    let hp = allPokemons[i]['stats'][0]['base_stat'];
    let attack = allPokemons[i]['stats'][1]['base_stat'];
    let defense = allPokemons[i]['stats'][2]['base_stat'];
    let spAtk = allPokemons[i]['stats'][3]['base_stat'];
    let spDef = allPokemons[i]['stats'][4]['base_stat'];
    let speed = allPokemons[i]['stats'][5]['base_stat'];
    let total = hp + attack + defense + spAtk + spDef + speed;
    let totalWitdh = total / 6;

    if (hp > 50) {
        hpColor = '#5bc686';
    }
    else {
        hpColor = '#fb7171';
    }

    if (attack > 50) {
        attackColor = '#5bc686';
    }
    else {
        attackColor = '#fb7171';
    }

    if (defense > 50) {
        defenseColor = '#5bc686';
    }
    else {
        defenseColor = '#fb7171';
    }

    if (spAtk > 50) {
        spAtkColor = '#5bc686';
    }
    else {
        spAtkColor = '#fb7171';
    }

    if (spDef > 50) {
        spDefColor = '#5bc686';
    }
    else {
        spDefColor = '#fb7171';
    }

    if (speed > 50) {
        speedColor = '#5bc686';
    }
    else {
        speedColor = '#fb7171';
    }
    if (totalWitdh > '50') {
        totalColor = '#5bc686';
    }
    else {
        totalColor = '#fb7171';
    }
    document.getElementById(`table-overflow${i}`).innerHTML = generateBaseStatsHtml(hp, attack, defense, spAtk, spDef, speed, total, totalWitdh, hpColor, attackColor, defenseColor, spAtkColor, spDefColor, speedColor, totalColor);
}
/**
 * Generate Html code for BaseStats linies
 * 
 * @param {number} hp - Number for hp scale width
 * @param {number} attack - Number for attack scale width
 * @param {number} defense - Number for defense scale width
 * @param {number} spAtk - Number for spAtk scale width
 * @param {number} spDef - Number for spDef scale width
 * @param {number} speed - Number for speed scale width
 * @param {number} total - Number for total scale width
 * @param {number} totalWitdh - Number for totalWidth scale width
 * @param {string} hpColor - Color of the scale line
 * @param {string} attackColor - Color of the scale line
 * @param {string} defenseColor - Color of the scale line
 * @param {string} spAtkColor - Color of the scale line
 * @param {string} spDefColor - Color of the scale line
 * @param {string} speedColor - Color of the scale line
 * @param {string} totalColor - Color of the scale line
 * @returns 
 */
function generateBaseStatsHtml(hp, attack, defense, spAtk, spDef, speed, total, totalWitdh, hpColor, attackColor, defenseColor, spAtkColor, spDefColor, speedColor, totalColor) {
    return `
    <tr>
        <td>HP</td>
        <td id="hp" class="hp">${hp}
            <div  class="range-view">
                <span style="width:${hp}% ; background-color: ${hpColor}" class="baseStatsLine"></span>
            </div>
        </td>
    </tr>
    <tr>
        <td>Attack</td>
        <td id="attack" class="attack">${attack}
            <div  class="range-view">
                <span style="width:${attack}% ; background-color: ${attackColor}" class="baseStatsLine"></span>
            </div>
        </td>
    </tr>
    <tr>
        <td>Defense</td>
        <td id="defense" class="defense">${defense}
            <div  class="range-view">
                <span style="width:${defense}% ; background-color: ${defenseColor} " class="baseStatsLine"></span>
            </div>
        </td>
    </tr>
    <tr>
        <td>Sp. Atk</td>
        <td id="spAtk" class="spAtk">${spAtk}
            <div  class="range-view">
                <span style="width:${spAtk}% ; background-color: ${spAtkColor} " class="baseStatsLine"></span>
            </div>
        </td>
    </tr>
    <tr>
        <td>Sp. Def</td>
        <td id="spDef" class="spDef">${spDef}
            <div  class="range-view">
                <span style="width:${spDef}% ; background-color: ${spDefColor}" class="baseStatsLine"></span>
            </div>
        </td>
    </tr>
    <tr>
        <td>Speed</td>
        <td id="speed" class="speed">${speed}
            <div  class="range-view">
                <span style="width:${speed}% ; background-color: ${speedColor}" class="baseStatsLine"></span>
            </div>
        </td>
    </tr>
    <tr>
        <td>Total</td>
        <td id="total" class="total">${total}
            <div  class="range-view">
                <span style="width:${totalWitdh}% ; background-color: ${totalColor}" class="baseStatsLine"></span>
            </div>
        </td>
    </tr>
    `;
}
/**
 * Show the right background-color of a Pokemon
 * 
 */
function showBgcolor() {
    document.getElementById('pokemon-background').classList.add(currentColorBg);
}

/**
 * Show the point about in single cards
 * 
 * @param {number} i - Number of position
 */
function showAboutPokemon(i) {
    let height = allPokemons[i]['height'];
    let weight = allPokemons[i]['weight'];
    document.getElementById('height').innerHTML = height + ' cm';
    document.getElementById('weight').innerHTML = weight + ' kg';
    document.getElementById('abilities').innerHTML = '';

    for (let j = 0; j < allPokemons[i]['abilities']['length']; j++) {

        let abilities = allPokemons[i]['abilities'][j]['ability']['name'];
        if (j == 0) {
            document.getElementById('abilities').innerHTML += `${abilities}`;
        }
        else {
            document.getElementById('abilities').innerHTML += `, ${abilities}`;
        }
    }
}

/**
 * Close Overlay of single Pokemon
 * 
 */
function closeOverlay() {
    document.getElementById('pokemon-background').classList.remove(currentColorBg);
    document.getElementById('overlay').classList.add('d-none');
}

/**
 * Clear field of type 2 (poisen,flying ...) if is not exist
 * 
 * @param {string} type1 
 * @param {string} type2 
 * @param {number} i - Number of position
 */
function removeType2(type1, type2, i) {
    let cardType = document.getElementById('card-type' + i);
    let pokemonSort = document.getElementById('pokemon-sort');
    
    if (type2 == 1) {
        type2 = '';
        cardType.classList.add('d-none');
        pokemonSort.classList.add('d-none');
    }
    if (type2 == 2) {
        type2 = allPokemons[i]['types'][1]['type']['name'];
        cardType.innerHTML = type2;
        pokemonSort.classList.remove('d-none');
        pokemonSort.innerHTML = type2;
    }
    loadSpecialBgColor(type1, type2, i);
}

/**
 * Load background-Color for special Pokemon
 * 
 * @param {string} type1 - choose the right background-color
 * @param {string} type2 - choose the right background-color
 * @param {number} i - Number of position
 */
function loadSpecialBgColor(type1, type2, i) {
    let card = document.getElementById('card' + i);
    
    if (type1 == 'normal' && type2 == 'flying') {
        card.classList.add('type-flying');
        currentColorBg = 'type-flying';
    }
    if (type1 == 'normal' && type2 == 'fairy') {
        card.classList.add('type-fairy');
        currentColorBg = 'type-fairy';
    }
    if (type1 == 'grass' && type2 == 'psychic' || type1 == 'water' && type2 == 'psychic' || type1 == 'psychic' && type2 == 'fairy') {
        card.classList.add('type-psychic');
        currentColorBg = 'type-psychic';
    }
    if (type1 == 'ground' && type2 == 'rock') {
        card.classList.add('type-rock');
        currentColorBg = 'type-rock';
    }
}

/**
 * Show about of singel Pokemon
 * 
 * @param {number} i - Number of position
 */
function showAbout(i) {
    document.getElementById(`table-overflow${i}`).innerHTML = generateShowAboutHtml(i);
    showAboutPokemon(i);
    document.getElementById('baseStats').classList.remove('redBorderLine');
    document.getElementById('about').classList.add('redBorderLine');
    document.getElementById('baseStats').classList.add('color-gray');
    document.getElementById('about').classList.remove('color-gray');
    document.getElementById('pokemon-background').style.height = '550px';
}

/**
 * Generate about Html code
 * 
 * @param {number} i - Number of position
 * @returns 
 */
function generateShowAboutHtml(i) {
    return `
    <tr>
        <td>Height</td>
        <td id="height">60 cm</td>
    </tr>
    <tr>
        <td>Weight</td>
        <td id="weight">8.5 kg</td>
    </tr>
    <tr>
        <td>Abilities</td>
        <td id="abilities">Blaze,solar-Power</td>
    </tr>
    `;
}

/**
 * search for Pokemon and render in the main
 * 
 */
function filterPokemons() {
    let search = document.getElementById('search-box').value;
    search = search.toLowerCase();

    let list = document.getElementById('all-pokemon-container');
    list.innerHTML = '';

    for (let i = 0; i < amountPokemons; i++) {
        const name = allPokemons[i]['name'];

        if (name.toLowerCase().includes(search)) {
            list.innerHTML += generatePokemonCardsHtml(i);
            showNumber(i);
            showName(i);
            showImage(i);
            showTypes(i);
        }
    }
}