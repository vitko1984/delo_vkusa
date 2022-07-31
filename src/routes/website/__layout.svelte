<script context="module">
  /** @type {import('./__types/[slug]').Load} */
  export const load = async ({ fetch, session }) => {
    const { userid, message, user } = session;
    const products = await fetch('/api/get_products');
    const users = await fetch('/api/get_users');
    return { props: {
      usr: users.ok && (await users.json()),
      get_prd: products.ok && (await products.json()),
      userid: userid,
      user: user,
    }};
  };
</script>

<script lang="ts">
  import '../../app.css';
  import Header from '$lib/header/Header.svelte';
  import type { Edit, DataGallery } from '$lib/types';
  import { 
    modalId as ident,
    uid, 
    users, 
    contentBasket as basket, 
    amountOrder as cnt, 
    isHandleErrors, 
    form,
    galleryRatings, 
    dataGallery } from '../../stores/app';
  
  export let userid = '';
  export let usr: {users: Edit[]; msg?: string};
  export let user: any;
  export let get_prd: {tbl: any[]; msg: string; status: number};

  $dataGallery = get_prd.tbl;
  $uid = userid;
  $users = [];
  $galleryRatings = [];
  $basket = [];

  for (let v of usr.users) {
    if (v.uid === $uid) {
      $form.name = v.name ? v.name : '';
      $form.email = v.email ? v.email : '';
      $form.phone = v.phone ? v.phone : '';
      $form.address = v.address ? v.address : '';
    };
    $users = [...$users, {id: v.id, name: v.name, email: v.email, phone: v.phone, address: v.address}];
    $galleryRatings = [...$galleryRatings, ...v.posts];
    $basket = [...$basket, ...v.basket];
  };

  let product: DataGallery | undefined;
  let zefirFlowers = $dataGallery;

  const headerEvent = (event: { detail: { name: string|any[]; searchIdent: any; }; }) => {
    if (event.detail.name.length === 0) return;
    $ident = event.detail.searchIdent;
    product = undefined;
    zefirFlowers.map((v: DataGallery) => {if (v.name === event.detail.name) product = v});
    if (product === undefined) $ident = '';
  };

  $: console.log('Идент-р пользователя: ', $uid);
  $: console.log('Все продукты: ', $dataGallery);
  $: console.log('Все с пользователей: ', usr.users);
  $: console.log('Хранилище пользователей: ', $users);
  //$: console.log('Хранилище рейтингов: ', $galleryRatings);
  $: console.log('Хранилище корзины: ', $basket);
  $: console.log('Хранилище значений полей форм: ', $form);
</script>

<div class="page">
  <Header {user}  on:product="{headerEvent}"/>
  <main>
    <slot />
  </main>
  <footer class="flex flex-col text-center py-5">
    <p>Разработка - "<a href="https://delo_vkusa.ru" target="_blank" class="focus:no-underline">Дело вкуса</a>"</p>
    <p>Эл.почта: nk1389074@gmail.com</p>
    <p>Телефон: +7 988 553 63 43</p>
    <p class="w-full text-center border-t border-solid border-white">Авторские права "Дело вкуса"<i>©</i>2022. Все права защищены.</p> 
  </footer>
</div>