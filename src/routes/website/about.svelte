<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>О нас</title>
</svelte:head>

<div class="container py-6">
  <div class="grid grid-cols-[560px_minmax(80px,_1fr)]">
	<picture>
      <img src="/20220215_171309-01.jpeg" alt="Фото" class="rounded-lg border-2 border-solid border-[#ab8c52]">
    </picture>
	<div class="flex flex-col ml-6 p-4 border-2 rounded-lg border-solid border-[#ab8c52]">
	  <span class="font-black text-[32px] text-[#ab8c52] leading-10 py-2">
		<i>О нас</i>
	  </span>	
	  <div class="text-left text-sm">
		<i>
		  <b>Всем привет!</b>	
		</i>
		<p>
		  <i>  
			Добро пожаловать в сладкий мир зефирных цветов⚘⚘⚘
		  </i>	
		</p>
		<p>
		  <i>
		    Меня зовут Инна, и я занимаюсь зефирной флористикой. Создаю красоту, которую можно попробовать на вкус.
		  </i>
		<p>
		  <i>	
			В кондитерской деле я с 2015 года. Сначала пекла торты, капкейки, муссовые пирожные, училась работать с белковым кремом, шоколадом, но все было не то.. долго искала что-то своё, то, что действительно будет приносить мне удовольствие.
		  </i>
		</p>
		<p>
		  <i>
			И в 2018 году я случайно попала на страничку с домашним зефиром и понеслась.
			Изначально ничего не получалось, но я не сдавалась, покупала курсы, рецепты, книги, проходила марафоны и делала, делала, делала... и теперь могу похвастаться вот такими вот результатами!
		  </i>
		</p>
		<p>
		  <i>
			<b>Кстати, корзинки я тоже делаю сама.</b>  
		  </i>
		</p>
	  </div>	
	</div>  
  </div>	
</div>

<style lang="postcss">
  /*p {
    text-indent: 10px; // Отступ первой строки в пикселах 
   }*/	
</style>
