<script lang='ts'>
    import { AnimeCard, fetchAnime } from "../lib/Components/app";

    let aTitle = "test";
    let result;

    function handleClick() {
        result = fetchAnime("Cowboy Bebop");
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
<!-- <OutlierForm on:message={handleMessage}/> -->
<input bind:value={aTitle}>
<button on:click={handleClick}>
    Submit
</button>
<p>{result}</p>
<noscript>You must enable Javascript to use this website</noscript>
