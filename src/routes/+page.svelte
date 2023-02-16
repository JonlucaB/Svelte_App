<script lang='ts'>
    import { AnimeCard, fetchAnime, requestOneAnime, requestReccomendedAnime } from "../lib/Components/app";

    let aTitle = "test";
    async function handleClick() {
        fetchAnime(aTitle, requestOneAnime, 0).then(createAnimeList);
    }
    

    function createAnimeList(userAnime: AnimeCard) {
        let cardDisplay = document.getElementById('animeList')
        
        cardDisplay?.firstChild ? cardDisplay.removeChild(cardDisplay.firstChild) : 
        
        cardDisplay?.appendChild(userAnime.display());

        //display all the other reccomended animes yuh
        userAnime.recIds.forEach(function (id) { fetchAnime("", requestReccomendedAnime, id).then(newCard => {
            cardDisplay?.appendChild(newCard.display())}).catch(function (error) {
                console.log("Failure to load Anime ID: "+id+"\nResulted in the following error\n"+error);
            })
        })
    };
</script>

<link rel="stylesheet" href="../style.css"/>
<body>
    <div class="div-1">
        <h1>WIP Anime reccomendation app using graphql and svelte</h1>
        <input bind:value={aTitle}>
        <button on:click={handleClick}>
            Submit Your Anime
        </button>
    </div>
    
    <div class="animeList" id="animeList">
    </div>
    <noscript>You must enable Javascript to use this website</noscript>
</body>