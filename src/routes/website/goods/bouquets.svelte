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
  <span class="font-black text-4xl text-[#ab8c52]">
    <i>Зефирный букет - прекрасный подарок!</i>
  </span>
  <Gallery {...caption} />
</div>