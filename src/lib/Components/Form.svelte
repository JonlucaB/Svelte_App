<script lang='ts'>
    let textInput = 'Type Title Here';

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('message', {
            text: textInput
        })
    };
</script>

<style>

</style>

<form>
    <input value={textInput}>
    <button on:click|once={handleClick}>
        Submit
    </button>
</form>