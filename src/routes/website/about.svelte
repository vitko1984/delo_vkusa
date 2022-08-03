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

<div class="container pb-4 flex flex-col items-center">
  <div class="flex items-center flex-col max-w-screen-md rounded-lg border-2 border-solid border-amber-200 bg-white p-1 mt-5">	
	<picture>
	  <img src="/20220215_171309-01.jpeg" alt="Фото" class="rounded-lg border-2 border-solid border-[#ab8c52]">
	</picture>
	
	<div class="text-left text-lg mx-4">
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

<style lang="postcss">
  /*p {
    text-indent: 10px; // Отступ первой строки в пикселах 
   }*/	
</style>
