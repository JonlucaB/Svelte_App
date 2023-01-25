<script lang='ts'>
    import { AnimeCard, fetchAnime, requestOneAnime, requestReccomendedAnime } from "../lib/Components/app";

    let aTitle = "test";
        
    async function handleClick() {
        fetchAnime(aTitle, requestOneAnime, 0).then(function (data) {
            console.log(data)
            return new AnimeCard(data.data.Media.title.english, data.data.Media.coverImage.medium)}).catch(function (error) {
                console.log("There was an error in fetching the anime Title: "+aTitle+" ID: "+100);
                console.log(error);
                return new AnimeCard("No Anime Found :(", "https://www.cambridge.org/elt/blog/wp-content/uploads/2019/07/Sad-Face-Emoji.png")
        }).then(card => createCard(card))
    }

    function createCard(card: AnimeCard) {
        let userCardDisplay = document.getElementById('userAnime');
        
        userCardDisplay.firstChild ? userCardDisplay.removeChild(userCardDisplay.firstChild) : console.log("No child to remove")

        const newCard = document.createElement('card');

        newCard.innerHTML = `
            <div class='card' id='userCard'>
                <h1>${card.getTitle()}</h1>
                <img src=${card.getImgUrl()} class="img-fluid img-center img-round img-featured" data-v-0f11a864=""/>
                <a href= class="button">See More</a>
            </div>`

        userCardDisplay?.appendChild(newCard);
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
    .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 300px;
    margin: auto;
    text-align: center;
    font-family: arial;
    }

    .card h1 {
        font-size: 25px;
    }

    .card img {
        width:140px;
        height:200px;
    }
  
    .card button {
        border: none;
        outline: 0;
        padding: 12px;
        color: white;
        background-color: #000;
        text-align: center;
        cursor: pointer;
        width: 100%;
        font-size: 18px;
    }
    
    .card button:hover {
        opacity: 0.7;
    }

    a.button {
        -webkit-appearance: button;
        -moz-appearance: button;
        appearance: button;

        text-decoration: none;
        color: initial;
    }

    a.button:hover {
        opacity: 0.7;
    }

    #userAnime {
        border:rgba(0, 0, 0, 0.2);
    }
</style>

<h1>Welcome to my app!</h1>
<input bind:value={aTitle}>
<button on:click={handleClick}>
    Submit Your Anime
</button>
<div id="userAnime"/>
<noscript>You must enable Javascript to use this website</noscript>