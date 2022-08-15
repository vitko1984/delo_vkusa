<script context="module">
	export const prerender = true
</script>

<script lang="ts">
  import { dataGallery } from '../../stores/app';
  import type { Edit } from '$lib/types';

  let tag_names:string[] = [];
  let category_names:string[] = [];
  let zefirFlowers:Edit[] = [];

  for (let v of $dataGallery) {
    tag_names = [...tag_names, v.name];
    for (let t of v.categories) {
      category_names = [...category_names, t.name];
      zefirFlowers = [...zefirFlowers, ...t.products];
    };

  };

  console.log('Зефирные цветы: ', zefirFlowers);
</script>
  
<svelte:head>
  <title>Домашняя</title>
</svelte:head>
  
<div class="container flex flex-col items-center">
  <section>
	  <div class="welcome">
	    <picture>
		    <source srcset="svelte-welcome.webp" type="image/webp" />
		    <img src="svelte-welcome.png" alt="Welcome" />
	    </picture>
	  </div>	
  </section>

  <div class="flex items-center flex-col max-w-screen-md rounded-lg border-2 border-solid border-amber-200 bg-white p-1 mt-5">
    <div class="carousel">
      {#each zefirFlowers as item, idx}
        <div id="{String(idx)}" class="carousel-item relative w-full">
          <img src="/Товары/{item.photo}" alt="Фото" class="w-auto">
          <div class="hidden md: static md:absolute md:flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#{idx === 0 ? zefirFlowers.length - 1 : idx - 1}" sveltekit:noscroll class="btn btn-circle bg-[#ab8c52] hover:bg-amber-300 border-white">❮</a>
            <a href="#{idx === zefirFlowers.length - 1 ? 0 : idx + 1}" sveltekit:noscroll class="btn btn-circle bg-[#ab8c52] hover:bg-amber-300 border-white">❯</a>
          </div>
        </div>
      {/each}
    </div>
    <div class="p-4 text-left text-base md:text-lg bg-gray-50">
      <p><i><b>Хочешь порадовать родных, близких или коллег, но не знаешь как?!</b></i></p>
      <p><i>Закажи зефирный букет- это отличный и оригинальный подарок на любой случай или праздник.</i></p>
      <p><i>Удивительно нежный зефир никого не оставит равнодушным.</i></p>
      <p><i>В составе только качественные и натуральные ингредиенты.</i></p>
      <i><b>Уникальное предложение:</b></i>
      <p><i>- на второй букет скидка 10%</i></p>
      <p><i>- индивидуальные скидки для родительского комитета</i></p>
    </div>
  </div>
</div>
  
<style lang="postcss">
  section {
	  @apply flex flex-col justify-center items-center pt-4;
  }
  
  .welcome {
    @apply w-full max-h-[200px];
  }
  
  .welcome img {
	  @apply block;
  }
</style>
