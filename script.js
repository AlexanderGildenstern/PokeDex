
let allPokemons = [];
let currentColorBg;
let amountPokemons;


function init() {
    loadPokemonAmount();
}

/*
    Load the pokemons amount of the first generation
*/ 

async function loadPokemonAmount() {
    let url = `https://pokeapi.co/api/v2/generation/1/`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    generation1_Pokemons = responseAsJson;  // amount Pokemons of generation 1
    amountPokemons = generation1_Pokemons["pokemon_species"].length
    console.log('Loaded pokemon', generation1_Pokemons);
    loadAllPokemons(amountPokemons);  // start function with pokemon amounts
}

/*
    safe all Pokemons in a Array
*/

async function loadAllPokemons(amountPokemons) {

    for (let i = 0; i < amountPokemons; i++) {
        let url = ` https://pokeapi.co/api/v2/pokemon/${i + 1}`;
        let response = await fetch(url);
        let responseAsJson = await response.json();
        allPokemons[i] = responseAsJson;
    }
    renderPokemonCards(amountPokemons);
}

function showOverlay(i) {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('overlay').innerHTML=`

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
    showNumber(i);
    showName(i);
    showImage(i);
    showTypes(i);
    showAboutPokemon(i);
    showBgcolor(i);
    
}
function showBaseStats(i){
    document.getElementById('baseStats').classList.add('redBorderLine');
    document.getElementById('about').classList.remove('redBorderLine');
    document.getElementById('baseStats').classList.remove('color-gray');
    document.getElementById('about').classList.add('color-gray');

    let hp = allPokemons[i]["stats"][0]["base_stat"];
    if(hp>50){
        hpColor = '#5bc686';
    }
    if(hp<50){
        hpColor = '#fb7171';
    }
    let attack = allPokemons[i]["stats"][1]["base_stat"];
    if(attack>50){
         attackColor = '#5bc686';
    }
    if(hp<50){
        attackColor = '#fb7171';
    }
    let defense = allPokemons[i]["stats"][2]["base_stat"];
    if(defense>50){
        defenseColor = '#5bc686';
    }
    if(defense<50){
        defenseColor = '#fb7171';
    }
    let spAtk = allPokemons[i]["stats"][3]["base_stat"];
    if(spAtk>50){
        spAtkColor = '#5bc686';
    }
    if(spAtk<50){
        spAtkColor = '#fb7171';
    }
    let spDef = allPokemons[i]["stats"][4]["base_stat"];
    if(spDef>50){
        spDefColor = '#5bc686';
    }
    if(spDef<50){
        spDefColor = '#fb7171';
    }
    let speed = allPokemons[i]["stats"][5]["base_stat"];
    if(speed>50){
        speedColor = '#5bc686';
    }
    if(speed<50){
        speedColor = '#fb7171';
    }
    let total = hp + attack + defense + spAtk + spDef + speed;
    let totalWitdh = total/6;
    if(totalWitdh>'50'){
        totalColor = '#5bc686';
    }
    if(totalWitdh<'50'){
        totalColor = '#fb7171';
    }

    document.getElementById(`table-overflow${i}`).innerHTML =`
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
    document.getElementById('pokemon-background').style.height='750px';
}
function showBgcolor(){
    document.getElementById(`pokemon-background`).classList.add(currentColorBg);
}
function showAboutPokemon(i){
    let height = allPokemons[i]["height"];
    let weight = allPokemons[i]["weight"];

    document.getElementById("height").innerHTML = height + " cm";
    document.getElementById("weight").innerHTML = weight + " kg";
    document.getElementById("abilities").innerHTML='';

    for( let j=0 ; j < allPokemons[i]["abilities"]["length"] ; j++ ){

        let abilities = allPokemons[i]["abilities"][j]["ability"]["name"];
        if(j==0){
            document.getElementById("abilities").innerHTML += `${abilities}`;
        }
        else{
            document.getElementById("abilities").innerHTML += `, ${abilities}`;
        }
    }
}

function showTypes(i){
        let type1 = allPokemons[i]["types"][0]["type"]["name"];
        let type2 = allPokemons[i]["types"].length;
        
        document.getElementById(`card-element${i}`).innerHTML=type1;
        document.getElementById(`pokemon-type`).innerHTML=type1;
        
        document.getElementById(`card-type${i}`).innerHTML=type2;
        document.getElementById(`pokemon-sort`).innerHTML=type2;

        currentColorBg = `type-${type1}`;
        document.getElementById(`card${i}`).classList.add(currentColorBg);
        
        
        removeType2(type1, type2, i);
}

function showImage(i){
    let pokemonImage = allPokemons[i]["sprites"]["other"]["dream_world"]["front_default"];
    document.getElementById(`card-image${i}`).src=pokemonImage;
    document.getElementById(`pokemonImage`).src=pokemonImage;
}
function showName(i){
    let pokemonName = allPokemons[i]["name"];
    document.getElementById(`card-title${i}`).innerHTML=pokemonName;
    document.getElementById(`pokemonName`).innerHTML=pokemonName;
}

function showNumber(i){
    let pokemonNumber = i+1;
    if (i < 9) {
        pokemonNumber = `0${pokemonNumber}`;
    }
    if (i < 99) {
        pokemonNumber = `0${pokemonNumber}`;
    }
    document.getElementById("pokemon-number").innerHTML= pokemonNumber;
    document.getElementById(`card-number${i}`).innerHTML= pokemonNumber;
}

function closeOverlay() {
    document.getElementById(`pokemon-background`).classList.remove(currentColorBg);
    document.getElementById('overlay').classList.add('d-none');
}

function renderPokemonCards(amountPokemons) {

    for (let i = 0; i < amountPokemons; i++) {

        document.getElementById('all-pokemon-container').innerHTML += `

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
        showNumber(i);
        showName(i);
        showImage(i);
        showTypes(i);
    }
}
/*
    Clear field of type 2 (poisen,flying ...) if is not exist
*/
function removeType2(type1, type2, i) {

    if (type2 == 1) {
        type2 = '';
        document.getElementById("card-type" + i).classList.add("d-none");
        document.getElementById("pokemon-sort").classList.add("d-none");
    }
    if (type2 == 2) {
        type2 = allPokemons[i]["types"][1]["type"]["name"];
        document.getElementById('card-type' + i).innerHTML = type2;
        document.getElementById("pokemon-sort").classList.remove("d-none");
        document.getElementById('pokemon-sort').innerHTML = type2;
    }
    loadSpecialBgColor(type1, type2, i);
}
/*
    Load background-Color for special Pokemon
*/
function loadSpecialBgColor(type1, type2, i) {

    if (type1 == "normal" && type2 == "flying") {
        document.getElementById("card" + i).classList.add("type-flying");
        currentColorBg = `type-flying`;
    }
    if (type1 == "normal" && type2 == "fairy") {
        document.getElementById("card" + i).classList.add("type-fairy");
        currentColorBg = `type-fairy`;
    }
    if (type1 == "grass" && type2 == "psychic" || type1 == "water" && type2 == "psychic" || type1 == "psychic" && type2 == "fairy") {
        document.getElementById("card" + i).classList.add("type-psychic");
        currentColorBg = `type-psychic`;
    }
    if (type1 == "ground" && type2 == "rock") {
        document.getElementById("card" + i).classList.add("type-rock");
        currentColorBg = `type-rock`;
    }   
}

function showAbout(i){

    document.getElementById(`table-overflow${i}`).innerHTML=`
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
    showAboutPokemon(i);
    document.getElementById('baseStats').classList.remove('redBorderLine');
    document.getElementById('about').classList.add('redBorderLine');
    document.getElementById('baseStats').classList.add('color-gray');
    document.getElementById('about').classList.remove('color-gray');
    document.getElementById('pokemon-background').style.height='550px';
}

/*
    search for Pokemon and render in the main
*/

function filterPokemons() {
    let search = document.getElementById('search-box').value;
    search = search.toLowerCase();

    let list = document.getElementById('all-pokemon-container');
    list.innerHTML = ``;

    for (let i = 0; i < amountPokemons; i++) {
        const name = allPokemons[i]["name"];

        if (name.toLowerCase().includes(search)) {
            list.innerHTML += `
    
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
        showNumber(i);
        showName(i);
        showImage(i);
        showTypes(i);
        }
    }
}