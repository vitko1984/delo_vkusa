<script lang="ts">
  //throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  import '../../app.css';
  import Header from '$lib/header/Header.svelte';
  import Basket from '$lib/templates/BasketInner.svelte';
  import Dialog from '$lib/templates/Dialog.svelte';
  import Order from '$lib/templates/Order.svelte';
  import Search from '$lib/templates/Search.svelte';
  import BackCall from '$lib/templates/Call.svelte';
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

  interface DataUser extends Edit {envelope?: Edit[], }; 
  
  export let data;

  const {usr, get_prd} = data;
  
  ///export let userid = '';
  ///export let usr: {users: Edit[]; uid: string; msg?: string};
  ///export let get_prd: {tbl: any[]; msg: string; status: number};

  let isNoErrors = false;
  let count = 0;
  let dataUser: DataUser;

  $dataGallery = get_prd.tbl;
  $uid = usr.uid;
  $users = [];
  $galleryRatings = [];
  $basket = [];
  $form.total = 0;

  for (let v of usr.users) {
    if (v.uid === $uid) {
      $form.name = v.name ? v.name : '';
      $form.email = v.email ? v.email : '';
      $form.phone = v.phone ? v.phone : '';
      $form.address = v.address ? v.address : '';
    };
    $users = [...$users, {id: v.id, uid: v.uid, name: v.name, email: v.email, phone: v.phone, address: v.address, photo: v.avatar}];
    $galleryRatings = [...$galleryRatings, ...v.posts];
    $basket = [...$basket, ...v.basket];
  };

  $basket.map((v, i) => {
    $basket.splice(i, 1, {...v, isCount: false});
    if (new RegExp($uid).test(v.productName)) {
      $form.total += v.price * v.amount; 
      count = count + v.amount;
    }; 
  });

  $cnt = count;

  let product: DataGallery = {};
  let zefirFlowers = $dataGallery;

  const headerEvent = (event: { detail: { product:object; searchIdent:string; }; }) => {
    console.log('***HeaderEvent***', event.detail);
    if (!event.detail.product) return;
    $ident = event.detail.searchIdent;
    product = {...event.detail.product};
    //zefirFlowers.map((v: DataGallery) => {if (v.name === event.detail.name) product = v});
    //if (product === undefined) $ident = '';
  };

  const handleAction = (vl: (string|number|boolean)[]) => {
    alert(vl[0]);
    console.log('handleModal: ', vl[0]);
    if (vl[0] === '????????????????') {
      $ident = 'order';      
    };
    if (vl[0] === '??????????') {
      $isHandleErrors = true;
      isNoErrors = $form.name.length === 0 || $form.email.length === 0 || $form.phone.length === 0 || 
      ($form.name.length > 0 && $form.name.length <= 1) || ($form.email.length > 0 && !/@/.test($form.email)) || 
      ($form.phone.length > 0 && $form.phone.length <= 10) ? false : true;
      dataUser = {title: vl[0], name: $form.name, email: $form.email, phone: $form.phone, address: $form.address, envelope: $basket.filter(v => new RegExp($uid).test(v.productName)), total: $form.total, };
    };
    if (vl[0] === '??????????????????????') {
      $isHandleErrors = true;
      isNoErrors = $form.name.length === 0 || $form.phone.length === 0 || 
      ($form.name.length > 0 && $form.name.length <= 1) || ($form.phone.length > 0 && $form.phone.length <= 10) ? false : true;
      dataUser = {title: vl[0], name: $form.name, phone: $form.phone, wish: $form.wish || $form.wish.length !== 0 ? $form.wish : ''};
    };
    if (vl[0] === '?? ??????????????' && product !== undefined) {
      $cnt += 1;
      let dataBasket = {productName: product.name, price: product.price, amount: 1};
      if ($basket.length !== 0) {
        let _count = 0;
        $basket.map((v, i) => {
          if (v.productName === `${dataBasket.productName}|${$uid}`) {
            _count = _count + 1;
            data = {productName: dataBasket.productName, price: v.price, amount: v.amount +1};
            $basket.splice(i, 1, {productName: v.productName, price: v.price, amount: v.amount +1}); 
          };
          if ((i === $basket.length - 1) && _count === 0)  $basket.push({productName: `${dataBasket.productName}|${$uid}`, price: dataBasket.price, amount: dataBasket.amount});
        });
      } else {
        $basket.push({productName: `${dataBasket.productName}|${$uid}`, price: dataBasket.price, amount: dataBasket.amount});
      };
      console.log('?????????????????????? ?????????????????? ??????????????: ', $basket);
      postBasket(dataBasket);
    };
  };

  const postBasket = async (dataBasket: object) => {
    console.log('***postBasket***');
    try {
      const res = await fetch('/goods/basket', {method: 'POST', body: JSON.stringify(dataBasket), headers: {'Content-Type': 'application/json'}, credentials: 'include'});
      if (res.ok) {
        const result = await res.json();
        console.log('?????????? ??????????????(PostUserBasket): ', result.msg);
        $cnt = 0;
        $form.total = 0;
        result.body.basket.map(v => {
          if (new RegExp($uid).test(v.productName)) {
            $form.total += v.price * v.amount; 
            $cnt += v.amount;
          };
        });
        $basket = result.body.basket;
        $uid = result.body.uid;
        $ident = '';
        return {
          message: result.msg
        };
      };
    } catch(error) {
      console.log('?????????? ?????????????????? ????????????!')
      console.error(error)
    }
  };

  const handleSubmit = async () => {
    console.log('***HandleSubmit***');
    const res = await fetch('/goods/user', {method: 'post', body: JSON.stringify(dataUser), headers: {accept: 'application/json'}, credentials: 'include'});
    if (res.ok) {
      const result = await res.json();
      const { content, msg, status } = result;
      if (status === 200) {
        $ident = '';
        console.log('?????????? ????????????-?????? ??-??????: ', content);
      };
      console.log('?????????? ??????????????(HandleSubmit): ', msg);
      return {
        message: result.msg
      };
    };
  };

  $: isNoErrors && handleSubmit();

  $: console.log('??????????-?? ????????????????????????: ', $uid);
  $: console.log('?????? ????????????????: ', $dataGallery);
  $: console.log('?????? ?? ??????????????????????????: ', usr.users);
  $: console.log('?????????????????? ??????????????????????????: ', $users);
  $: console.log('?????????????????? ??????????????????: ', $galleryRatings);
  $: console.log('?????????????????? ??????????????: ', $basket);
  $: console.log('?????????????????? ???????????????? ?????????? ????????: ', $form);
  $: console.log('Header-product: ', product);
</script>

<div class="page">
  <Header on:product="{headerEvent}"/>
  <main class="main bg-gray-200">
    <slot />
  </main>

  {#if $ident === 'basket'}
    <Dialog header={'???????? ????????????'} idx={0} onAction={info => handleAction(info)}>
      <Basket  />
    </Dialog>
  {:else if $ident === 'order'}
    <Dialog header={'???????????????????? ????????????'} idx={0} onAction={info => handleAction(info)}>
      <Order />
    </Dialog>
  {:else if $ident === 'phone'}
    <Dialog header={'???????????????? ????????????'} idx={0} onAction={info => handleAction(info)}>
      <BackCall />
    </Dialog>
  {:else if $ident === 'search'}
    <Dialog header='???????????????? ????????????????' idx={0} onAction={info => handleAction(info)}>
      <Search {product} />
    </Dialog>
  {/if}

  <footer class="flex flex-col text-center py-5 bg-[#ab5252]">
    <p>???????????????????? - "<a href="https://delo_vkusa.ru" target="_blank" class="focus:no-underline text-blue-400">???????? ??????????</a>"</p>
    <p>????.??????????: nk1389074@gmail.com</p>
    <p>??????????????: +7 988 553 63 43</p>
    <p class="w-full text-center border-t border-solid border-white">?????????????????? ?????????? "???????? ??????????"<i>??</i>2022. ?????? ?????????? ????????????????.</p> 
  </footer>
</div>

<style>
  .main {
    background: url(/back.jpg);
    background-size: 100%;
  }
</style>