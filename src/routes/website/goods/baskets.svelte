<script lang="ts">
  import Gallery from '$lib/Gallery.svelte';

  const caption = {
    tag: 'Зефир',
    category: 'Зефирные корзины'
  };
</script>
      
<svelte:head>
  <title>Корзины</title>
</svelte:head>
      
<div class="container flex flex-col items-center">
  <span class="font-black text-2xl lg:text-3xl xl:text-4xl text-[#ab5252]">
    <i>Зефирная корзина - красиво и вкусно!</i>
  </span>
  <Gallery {...caption} />
</div>