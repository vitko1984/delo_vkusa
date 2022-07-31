<svelte:window bind:innerWidth={ widthWin } />

<header>
  <div class="hdr bg-red-100">  
    <a href="/">
      <div class="h-24 w-24">
        <picture>
          <img src="{delo_vkusa}" alt="Дело вкуса" />
        </picture>
      </div>  
      <div class="grid gap-0 text-gray-600 pl-3 mt-1 p-4">
        <i class="font-bold text-3xl leading-none text-[#ab8c52]">Дело вкуса</i>
        <i class="font-semibold text-xs leading-none">Зефир:(букеты, корзины)</i>
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
    <div class="flex justify-between items-center w-36">
      <!-- Theme toggler -->
      <div class="flex text-[#ab8c52]">
        <ToggleTheme />
      </div>
      <div class="pb-2 w-8">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="btn btn-ghost btn-circle bg-transparent text-[#ab8c52] hover:bg-transparent">
          <button tabIndex="0" title="+7 988 553-63-43" on:click="{() => $ident = 'phone'}" class="w-8 bg-[#ab8c52] rounded-[50%] p-1 transition-transform border-[2px] border-solid border-white hover:scale-110">
            <i class="fa fa-phone text-white"></i>
          </button>
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

      <!-- Profile menu -->
      <div class="relative">
        <button
          id="nav-profile-photo"
          class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
          on:click={toggleProfileMenu}
          use:keydownEscape
          on:keydown-escape={closeProfileMenu}
          aria-label="Account"
          aria-haspopup="true"
        >
          <img
            class="object-cover w-8 h-8 rounded-full"
            src="/{avatar}"
            alt="{first_name} {last_name}"
            aria-hidden="true"
          />
        </button>
        {#if $isProfileMenuOpen}
          <ul
            use:clickOutside={['nav-profile-photo']}
            on:click-outside={closeProfileMenu}
            use:keydownEscape
            on:keydown-escape={closeProfileMenu}
            class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
            aria-label="submenu"
          >
            <li class="flex">
              <a
                class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                href="/"
              >
                <svg
                  class="w-4 h-4 mr-3"
                  aria-hidden="true"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Профиль</span>
              </a>
            </li>
            <li class="flex">
              <a
                class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                href="/"
              >
                <svg
                  class="w-4 h-4 mr-3"
                  aria-hidden="true"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Настройки</span>
              </a>
            </li>
            <li class="flex">
              <a
                  class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  href="{import.meta.env.VITE_LOGOUT_PATH}"
              >
                <svg
                    class="w-4 h-4 mr-3"
                    aria-hidden="true"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span>Выход</span>
              </a>
            </li>
          </ul>
        {/if}
        </div>
    </div>  
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
  import { 
    modalId as ident, 
    amountOrder as count, form 
  } from '../../stores/app';
  import {
    isProfileMenuOpen,
    toggleProfileMenu,
  } from '../../stores/menus'
  import { clickOutside } from '$lib/ioevents/click'
  import { keydownEscape } from '$lib/ioevents/keydown'
  //import type { DataGallery } from '$lib/types';
  import Account from '$lib/Account.svelte';
  import Menu from '$lib/Menu.svelte';
  import ToggleTheme from '$lib/templates/Admin/ToggleTheme.svelte';
  import delo_vkusa from '$lib/pictures/delo_vkusa.jpg';

  const dispatch = createEventDispatcher();
  
  //export let bqt: DataGallery[] = [];
  //export let bskts: DataGallery[] = [];
  export let user: any;
  const { photo, first_name, last_name } = user;

  const field_empty = "Поле не заполнено.";
  const name_incorrect = "Поле должно содержать не менее 2-х символов.";

  let isLogin = '';
  let widthWin: number;
  let search = '';
  let dataSearch: string[] = [];
  //let zefirFlowers = bskts.length !== 0 && bqt.length !== 0 ? [...bskts, ...bqt] : bskts.length === 0 && bqt.length !== 0 ? [...bqt] : bskts.length !== 0 && bqt.length === 0 ? [...bskts] : [];
  let errors = {name: '', };
  let avatar = 'my_photo.jpg'
  
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

  const closeProfileMenu = () => {};

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