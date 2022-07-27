<svelte:window bind:innerWidth={ widthWin } />

<header>
  <div class="hdr bg-red-100">  
    <a href="/">
      <div class="h-24 w-24">
        <picture>
          <img src="{delo_vkusa}" alt="Дело вкуса" />
        </picture>
      </div>  
      <div class="grid gap-0 text-gray-600 pl-3 mt-1">
        <i class="font-bold text-4xl leading-none text-[#ab8c52]">Дело вкуса</i>
        <i class="font-semibold text-xs leading-none">Зефир - Зефирные букеты - Зефирные корзины</i>
        <!--<i class="font-semibold text-xs leading-none">Торты</i>
        <i class="font-semibold text-xs leading-none">Пирожные</i>-->
      </div>
    </a>
    <div class="flex flex-col text-center">
      <span class="font-bold text-xl mb-2 leading-none text-[#ab5252]"><i>Красота, которую можно попробовать на вкус !</i></span>
      <div class="flex items-start h-10 w-auto 2xl:w-[640px] bg-white border border-solid border-[#a4a099] rounded-lg shadow-headerShadow">
        <button on:click="{() => handleEvent('search')}" class="py-[6px]"><i class="fas fa-search text-[#a4a099] self-center ml-2"></i></button>
        <input list="search" type="text" placeholder="Введите название или выберите из списка..." bind:value="{search}" on:blur={handleChange} class="self-center h-9 mx-1 w-full border-none placeholder:font-normal placeholder:text-[#a4a099] placeholder:text-sm placeholder:not-italic" />
        <datalist id="search">
          {#each dataSearch as name, idx}
            <option>{name}</option>
          {/each}
        </datalist>
      </div>
      {#if errors.name.length !== 0}
        <i class="errors">{errors.name}</i>
      {/if}
    </div>
    {#if widthWin > 768}
      <div class="pb-2">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="btn btn-ghost btn-circle bg-transparent text-[#ab8c52] hover:bg-transparent">
          <div class="indicator">
            <button tabIndex="0" title="Заказать обратный звонок. Жми..." on:click="{() => $ident = 'phone'}" class="h-8 w-8 bg-[#ab8c52] rounded-[50%] p-1 transition-transform border-[2px] border-solid border-white hover:scale-110">
              <i class="fa fa-phone text-white"></i>
            </button>
            <span class="badge badge-sm indicator-item indicator-bottom indicator-center pb-[2px] bg-[#ab5252] border-[1px] border-white"><i class="font-black text-white mt-1 text-xs">+7 988 553-63-43</i></span>
          </div>
        </label>
      </div>
      <div class="dropdown dropdown-end">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="btn btn-ghost btn-circle bg-transparent text-[#ab8c52] hover:bg-transparent">
          <div class="indicator">
            <div tabIndex="0" title="Вход в корзину. Жми..." class="hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <span class="badge badge-sm indicator-item bg-[#ab5252] border-[1px] border-white">{$count}</span>
          </div>
        </label>
        <div tabindex="0" class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
          <div class="card-body">
            <span class="font-bold text-lg text-[#ab5252]"><i>Заказов - {$count}</i></span>
            <span class=""><i>Сумма: <b>{$form.total} руб.</b></i></span>
            <div class="card-actions">
              <button on:click="{() => $ident = 'basket'}" class="button btn-block"><i>Войти</i></button>
            </div>
          </div>
        </div>
      </div>
      {#if !!isLogin}
        <Account />
      {/if}
    {:else}
      <h3>Логотип меню</h3>
    {/if}
  </div>  
  <div class="hdr-menu bg-red-50">
    <Menu />
  </div>
</header>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { modalId as ident, amountOrder as count, form } from '../../stores/app';
  //import type { DataGallery } from '$lib/types';
  import Account from '$lib/Account.svelte';
  import Menu from '$lib/Menu.svelte';
  import delo_vkusa from '$lib/pictures/delo_vkusa.jpg';

  const dispatch = createEventDispatcher();
  
  //export let bqt: DataGallery[] = [];
  //export let bskts: DataGallery[] = [];

  const field_empty = "Поле не заполнено.";
  const name_incorrect = "Поле должно содержать не менее 2-х символов.";

  let isLogin = '';
  let widthWin: number;
  let search = '';
  let dataSearch: string[] = [];
  //let zefirFlowers = bskts.length !== 0 && bqt.length !== 0 ? [...bskts, ...bqt] : bskts.length === 0 && bqt.length !== 0 ? [...bqt] : bskts.length !== 0 && bqt.length === 0 ? [...bskts] : [];
  let errors = {name: '', };
  
  //zefirFlowers.map(v =>  dataSearch.push(v.name));

  const handleChange = () => {
    console.log('***handleChange***');
    errors.name = search.length === 0 ? field_empty : (search.length > 0 && search.length <= 1) ? name_incorrect : ''; 
    return errors;
  };

  const handleEvent = (ident: string) => {
    dispatch('product', {
	  name: search,
      searchIdent: ident
	});
  };

  $: console.log('Количество покупок: ', $count);
  $: console.log('Массив названий продуктов: ', dataSearch);
</script>

<style>
  a {
    @apply flex flex-shrink-0;
  }

  a:focus { 
    @apply outline-none no-underline;
  }

  a:hover { 
    @apply text-amber-500;
  }

  input:focus-visible {
    @apply outline-none;
		box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
	}

  .errors {
    @apply p-0 text-sm text-orange-600 list-none;
  }
</style>