<div class="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 my-5 max-w-7xl">
  {#each products as item, idx}
    <div class="border border-[#ab8c52] p-1 rounded-md bg-red-50">
      <span class="text-[#ab8c52] font-../stores/storesmb-1">
        <i class="">{item.name}</i>
      </span>       
      <picture>
        <img src="/Товары/{item.photo}" alt="Фото" class="rounded-sm">
      </picture>
      <div class="flex justify-between items-center">
        <span class="mt-1" tabIndex="0" title="Общий рейтинг"><Rating defaultValue={Math.round(item.ratings.reduce((a, b) => (a+b))/(item.ratings.length - 2))} readonly /></span>
        <span class="font-semibold mt-[6px]" tabIndex="0" title="Цена(рублей)"><i>{item.price} руб.</i></span>
        <Actions { idx } onAction={ info => handleAction(info, idx) } />
      </div>
    </div>
    {#if $modal[idx] && ($ident === 'info' || $ident === 'edit')}
      <Dialog header={products[idx].name} {idx} onAction={info => handleModal(info)}>
        {#if $ident === 'edit'}
          <Edit {idx} {products} />
        {:else if $ident === 'info'}
          <Review {nameProduct} />
        {/if}
      </Dialog>
    {/if}    
  {/each}
</div>

<script lang="ts">
  import { onMount } from 'svelte';
  import {
    dataGallery,
    galleryRatings, 
    modalDialog as modal, 
    modalId as ident, 
    contentBasket as basket, 
    amountOrder as count, 
    uid, form } from '../stores/app';
  import type { DataGallery } from '$lib/types';
  import Dialog from '$lib/templates/Dialog.svelte';
  import Rating from '$lib/templates/Rating.svelte';
  import Actions from '$lib/templates/Actions.svelte';
  import Edit from '$lib/templates/Edit.svelte';
  import Review from '$lib/templates/Review.svelte';

  export let tag:string;
  export let category:string;

  let defaultValue = 0;
  let nameProduct = '';
  let products:DataGallery[] = [];
  let tg = $dataGallery.filter(i => i.name === tag);

  for (let v of tg) {
    const ctgrs = v.categories.filter(i => i.name === category);
    for (let t of ctgrs) {
      products = [...products, ...t.products];
    };
  };
  
  $form.default = defaultValue

  $: for (let i = 0; i < products.length; i++) {
    products[i] = {...products[i], ratings: [0,0, ]};
    $modal[i] = false;
    for (let j = 0; j < $galleryRatings.length; j++) {
      if (new RegExp($galleryRatings[j].productName).test(products[i].name)) {
        products[i].ratings = [...products[i].ratings, $galleryRatings[j].rating];
      };
    };
  };

  const handleModal = async (vl) => {
    alert(vl[0]);
    console.log('handleModal: ', vl[0]);
    if (vl[0] === 'Выйти') {
      $form.input = '';
      $form.textarea = '';
      $form.rating = defaultValue;
    };
    if (vl[0] === 'Применить') {
      const res = await fetch('/api/dialog', {method: 'POST', body: JSON.stringify({name: $form.name ? $form.name : $form.input, comment: $form.textarea, rating: $form.rating, productName: products[vl[1]].name}), headers: {'Content-Type': 'application/json'}, credentials: 'include'});
      console.log(await res.json());
      if (res.ok) {
        $galleryRatings = [];
        const result = await res.json();
        console.log(result.msg);
        $galleryRatings = [...$galleryRatings, ...result.body.posts];
        $modal[vl[1]] = false;
        $form.input = '';
        $form.textarea = '';
        $form.rating = defaultValue;
      };
    };
  };

  const handleAction = (vl: string[], id: number) => {
    console.log('****handleAction**');
    alert(vl[0]);
    if (vl[1]) {
      if (vl[1] === 'add_basket') {
        let data = {productName: products[id].name, price: products[id].price, amount: 1};
        postBasket(data);
      };//
      if (vl[1] === 'info') {
        nameProduct = products[id].name;
      };
      $ident = vl[1];
    };
    //
  };

  const postBasket = async (data: object) => {
    console.log('***postBasket***');
    const res = await fetch('/api/basket', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}, credentials: 'include'});
    if (res.ok) {
      const result = await res.json();
      console.log('Ответ сервера(PostUserBasket): ', result.msg);
      $count = 0;
      $form.total = 0;
      result.body.basket.map(v => {
        if (new RegExp($uid).test(v.productName)) {
          $form.total += v.price * v.amount; 
          $count += v.amount;
        };
      });
      $basket = result.body.basket;
      return {
        message: result.msg
      };
    };
  };
  //onMount(getRating);
    
  $: console.log('Ответ сервера(GalleryGoods): ', $dataGallery);
  $: console.log('modalDialogArr: ', $modal);
  //$: console.log('GalleryGetRatings: ', $galleryRatings);
  $: console.log('Получено из Edit: ', $form);
  $: console.log('$uid: ', $uid);
  $: console.log('Продукты: ', products);
</script>