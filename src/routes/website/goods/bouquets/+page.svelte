<script lang="ts">
  import Gallery from '$lib/Gallery.svelte';

  const caption = {
    tag: 'Зефир',
    category: 'Зефирные букеты'
  };
</script>
      
<svelte:head>
  <title>Букеты</title>
</svelte:head>
      
<div class="container flex flex-col items-center">
  <span class="font-black text-2xl lg:text-3xl xl:text-4xl text-amber-50">
    <i>Зефирный букет - прекрасный подарок!</i>
  </span>
  <Gallery {...caption} />
</div>