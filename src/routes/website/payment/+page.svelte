<svelte:head>
  <title>Оплата и доставка</title>
</svelte:head>

<div class="container grid pb-4">
  <div class="flex flex-col items-start bg-white w-full md:w-1/2 border-2 border-solid border-amber-200 p-4  rounded-lg">
    <div class="flex">
      <picture>
        <img src="/payment.png" alt="Оплата" class="rounded-sm w-[100px] h-[100px]">
      </picture>
      <span class="self-center ml-6 font-black text-[32px] leading-10 py-2">Оплата</span>
    </div>   
    <span class="text-[#ab8c52] font-semibold text-[16px] leading-6 my-4">Способы оплаты товара:</span>
    <ol class="font-normal text-sm leading-10 ml-6 text-left">
      <li class="">1. <i></i>Для физ. лиц - оплата наличными при получении товара</li>
      <li class="">2. <i></i>Для юр. лиц - по договору</li>  
      <li class="">3. <i>Оплата банковской картой, клиенту "Сбера" - по телефону</i></li>      
    </ol>      
  </div>
  
  <div class="justify-self-end flex flex-col items-start mt-[70px] bg-white w-full md:w-1/2 border-2 border-solid border-amber-200 p-4  rounded-lg">
    <div class="flex">
      <picture>
        <img src="/delivery.png" alt="Доставка" class="rounded-sm w-[100px] h-[100px]">
        <!--<img src="/delivery-man.png" alt="Доставка" class="rounded-sm w-[100px] h-[100px]">-->
      </picture>
      <span class="self-center ml-6 font-black text-[32px] leading-10 py-2">Доставка</span>
    </div>
    <span class="text-[#ab8c52] font-semibold text-[16px] leading-6 my-4">Способы доставки товара:</span>
    <ol class="font-normal text-sm leading-10 ml-6 text-left">
      <li class="">1. <i>Самовывоз</i></li>
      <li class="">2. <i>Для юр. лиц по договору, при крупном опте - бесплатно</i></li>
      <li class="">3. <i>Для физ. лиц с заказом транспорта по согласованию с покупателем</i></li>
    </ol>  
  </div>
</div>

<script context="module">
	import { browser, dev } from '$app/env';

	// нам не нужен JS на этой странице, хотя мы загрузим
	// это в dev, чтобы мы получили горячую замену модуля...
	export const hydrate = dev;

	// ...но если клиентский маршрутизатор уже загружен
	// (т.е. мы пришли сюда из другого места в приложении), используйте его
	export const router = browser;

	// так как здесь нет динамических данных, мы можем пререндерить
	// так, чтобы он служил статическим активом в prod
	export const prerender = true;
</script>