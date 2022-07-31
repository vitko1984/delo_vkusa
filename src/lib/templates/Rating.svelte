<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div on:mouseout={_reset} class="text-[28px] cursor-pointer inline-block whitespace-nowrap" class:RatingReadonly={readonly}>
  {#each stars as star, idx}
    <span class="text-yellow-400 inline-block relative w-4" class:RatingOn="{idx+1 <= tmpRating}" on:click={() =>!readonly && setRating(idx+1)} on:mouseover={() => !readonly && setTmpRating(idx+1)}>&#9734;</span>
  {/each}
</div>
{#if !readonly && !!id}
  <input type="hidden" value={rating} />
{/if}

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let max = 5;
  export let defaultValue = 0;
  export let readonly = false;
  export let id = '';
  export let rating = 0;

  let stars:number[] = [];

  $: rating = defaultValue;
  $: tmpRating = defaultValue;
  for(let i = 0; i < max; i++) {
    stars = [...stars, 1];
  };

  const setTmpRating = (rtg:number) => {tmpRating = rtg;};
  const setRating = (rtg:number) => {
    tmpRating = rtg; 
    rating = rtg;
    dispatch('rating', rating);
  };
  const _reset = () => {tmpRating = rating};

  //$: console.log('defaulValue: ', defaultValue);
  //$: console.log('rating: ', rating);
</script>

<style lang="postcss">
  .RatingReadonly{
    @apply cursor-auto;
  }

  .RatingOn:before {
    @apply absolute text-yellow-400 left-0 p-[2px];
    content: "\2605";
  }
</style>