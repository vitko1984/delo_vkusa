<div class="flex flex-col px-2 pb-2 items-start">
  <div class="grid grid-cols-2">
    <picture>
      <img src="/Товары/{product.photo}" alt="Фото" class="rounded border-[2px] border-[#ab8c52]">
    </picture>
    <div class="flex flex-col items-start p-4">
      <span class="label">
        <i class="label-text text-[#ab8c52]">Название продукта:</i>
      </span>
      <span class="text-[#ab5252] text-base px-1"><i>{product.name}</i></span>
      <span class="label">
        <i class="label-text text-[#ab8c52]">Категория:</i>
      </span>
      <span class="text-[#ab5252] text-base px-1"><i>{categoryName}</i></span>
      <span class="label">
        <i class="label-text text-[#ab8c52]">Стоимость продукта:</i>
      </span>
      <span class="text-[#ab5252] text-base px-1"><i>{product.price} </i><i>руб.</i></span>
      <span class="label">
        <i class="label-text text-[#ab8c52]">Оценка(рейтинг) продукта:</i>
      </span>
      <span class="mt-1" tabIndex="0" title="Общий рейтинг"><Rating defaultValue={Math.round(product.ratings.reduce((a, b) => (a+b))/(product.ratings.length - 2))} readonly /></span>
    </div>
  </div>
  <div class="w-full">
    <span class="label">
      <i class="label-text text-[#ab8c52]">Отзывы о продукте:</i>
    </span>  
    {#each comments as item}
      <div class="flex py-1 flex-col shadow-rowDownShadow text-left text-xs font-extrabold">
        <span class="flex justify-between">
          <i>{item.name}</i>
          <i class="font-normal text-gray-400">{item.date}</i>
        </span>
        <span class="font-normal">{item.comment}</span>
      </div>  
    {/each}
  </div>
</div>

<script lang="ts">   
  import type { DataGallery } from '$lib/types';  
  import { 
    form, 
    users, 
    galleryRatings as rtngs, 
    dataGallery } from '../../stores/app';
  import Rating from './Rating.svelte';

  export let product: DataGallery;

  let comments = [{name: '', comment: '',  date: '', } ];
  let userName = '';
  let categoryName = 'Вкусняшка';
  let ctgrs: DataGallery[] = [];
  
  product = {...product, ratings: [0, 0, ], };
  for (let j = 0; j < $rtngs.length; j++) {
    if (new RegExp($rtngs[j].productName).test(product.name)) {
      product.ratings = [...product.ratings, $rtngs[j].rating];
    };
    $users.map(t => {
      if (t.id === $rtngs[j].userId) userName = t.name;  
      if ($rtngs[j].productName === `${product.name}|${t.uid}`) {
        comments = [...comments, {name: userName, comment: $rtngs[j].comment, date: $rtngs[j].updatedAt.slice(0, 10)}];
      };
    });
  };

  $dataGallery.map(v => ctgrs = [...ctgrs, ...v.categories]);
  ctgrs.map(v => {if (v.id === product.categoryId) categoryName = v.name});

  $form.label = 'В корзину';

  $: console.log('Продукты из Layout: ', product);
  $: console.log('Категории из Layout: ', ctgrs);
</script>