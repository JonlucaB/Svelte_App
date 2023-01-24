<script lang='ts'>
    import { AnimeCard, fetchAnime, requestOneAnime, requestReccomendedAnime } from "../lib/Components/app";

    let aTitle = "test";
    let userAnime: AnimeCard;
    let testText = "no Anime tyet bro";
        
    async function handleClick() {
        fetchAnime(aTitle, requestOneAnime, 0).then(function (data) {
            userAnime = new AnimeCard(data.data.Media.title.english, data.data.Media.coverImage.medium)
            console.log(data)}).catch(function (error) {
                console.log("There was an error in fetching the anime Title: "+aTitle+" ID: "+100);
                console.log(error);
                userAnime = new AnimeCard("No Anime Found :(", "https://www.cambridge.org/elt/blog/wp-content/uploads/2019/07/Sad-Face-Emoji.png")
        }).then(changeText)
    }

    function changeText() {
        testText = userAnime.getTitle();
    }
</script>

<style>
    html {
        background: #BB9;
        margin: 0;
        height: 100%;
        border-width: 3px;
        border-style: solid;
        border-color: #000;
    }
    
    h1 {
        text-align: center;
        font-family: Tahoma;
        font-size: 40px;
        font-style: normal;
        font-weight: 400;
    }
</style>

<h1>Welcome to my app!</h1>
<input bind:value={aTitle}>
<button on:click={handleClick}>
    Submit
</button>
<button on:click={changeText}>
    Change Text
</button>
<p>{testText}</p>
<noscript>You must enable Javascript to use this website</noscript>
