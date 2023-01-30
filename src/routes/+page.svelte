<script lang='ts'>
    import { AnimeCard, fetchAnime, requestOneAnime, requestReccomendedAnime } from "../lib/Components/app";

    let aTitle = "test";
    async function handleClick() {
        fetchAnime(aTitle, requestOneAnime, 0).then(createCard);
    }
    
    function createCard(card: AnimeCard) {
        let cardDisplay = document.getElementById('cardDisplayd')
        
        cardDisplay.firstChild ? cardDisplay.removeChild(cardDisplay.firstChild) : null

        const newCard = document.createElement('card');

        newCard.innerHTML = `
            <div class="card">
                <h1>${card.getTitle()}</h1>
                <img src=${card.getImgUrl()} class="img-fluid img-center img-round img-featured" data-v-0f11a864=""/>
                <a href=${card.getImgUrl()} class="button">See More</a>
            </div>`

        cardDisplay?.appendChild(newCard);
    }
</script>

<style>
    h1 {
        text-align: center;
        font-family: Tahoma;
        font-size: 40px;
        font-style: normal;
        font-weight: 400;
    }
</style>

<div class="div-1">
    <h1>WIP Anime reccomendation app using graphql and svelte</h1>
    <input bind:value={aTitle}>
    <button on:click={handleClick}>
        Submit Your Anime
    </button>
</div>

<div class="cardDisplay" id="cardDisplay">
</div>
<noscript>You must enable Javascript to use this website</noscript>