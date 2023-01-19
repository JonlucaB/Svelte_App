<script lang='ts'>
	import OutlierForm from "../lib/Components/OutlierForm.svelte";
    import { AnimeCard, fetchAnime } from "../lib/Components/app";

    let aTitle = "test";

    function handleClick() {
        alert('The user input ß' + aTitle);
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
<noscript>You must enable Javascript to use this website</noscript>
