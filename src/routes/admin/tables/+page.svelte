<svelte:head>
  <title>Таблицы</title>
</svelte:head>

<main class="h-full pb-16 overflow-y-auto">
  <div class="container grid px-6 mx-auto">
    <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Таблицы</h2>
    <!-- CTA -->
    <div class="flex items-center justify-between p-4 mb-8 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple ">
      <a class="text-sm font-semibold text-purple-100" href="https://github.com/daison12006013/sveltekit-windmill-admin">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span>Разместить на  GitHub</span>
        </div>
      </a>
      <button class="text-sm font-semibold text-purple-100" on:click="{() => {}}">
        <i>Показать больше &RightArrow;</i>
      </button>
    </div>

    <!--Заголовок контейнера таблицы-->
    <div class="flex justify-between h-[72px] font-black not-italick py-[22px]">
      <div class="flex items-center">
        <button on:click="{() => menuTbl = !menuTbl}" class="button w-12 h-12 bg-[#ab5252] rounded-[100%] mr-[2px]">
          {#if !menuTbl}
            <div tabindex="0" title="Меню таблицы. Жми...">
              <svg style="width:24px;height:24px" viewBox="2 0 24 24">
                <path fill="currentColor" d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
              </svg>
            </div>
          {:else}
            <div tabindex="0" title="Закрыть меню. Жми...">
              <svg style="width:24px;height:24px" viewBox="2 0 24 24">
                <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
              </svg>
            </div>    
          {/if}
        </button>
        {#if menuTbl}
          <div transition:fly="{{ x: 50, duration: 500 }}">
            <button tabindex="0" title="{products_hdrs.hdr_link1}. Жми..." on:click="{() => handleSubmit(formTbl)}" class="button px-4 mr-[2px]">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14 12L10 8V11H2V13H10V16M22 12A10 10 0 0 1 2.46 15H4.59A8 8 0 1 0 4.59 9H2.46A10 10 0 0 1 22 12Z" />
              </svg>  
            </button>
          </div>
          <div transition:fly="{{ x: 50, duration: 500 }}">
            <button tabindex="0" title="{products_hdrs.hdr_link3}. Жми..." on:click="{handleClearTable}" class="button px-4 mr-[2px]">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z" />
              </svg>
            </button>
          </div>
          <div transition:fly="{{ x: 50, duration: 500 }}">
            <button tabindex="0" title="{products_hdrs.hdr_link2}. Жми..." on:click="{() => {addRow()}}" class="button px-4 mr-[2px]">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M2,16H10V14H2M18,14V10H16V14H12V16H16V20H18V16H22V14M14,6H2V8H14M14,10H2V12H14V10Z" />
              </svg>
            </button>
          </div>       
        {/if}
      </div>
      <span class="text-[#ab8c52] text-xl">
        <i>{products_hdrs.hdr}</i>
      </span>
    </div>

                        <!--Таблица-->
    <div class="grid grid-rows-[48px_minmax(48px,_1fr)]">

      <!--Шапка(верхняя часть) таблицы-->
      <div class="grid grid-cols-[100px_repeat(2,_minmax(80px,_1fr))minmax(120px,_1fr)_100px_minmax(120px,_1fr)_40px] bg-amber-50">
        {#each tbl_hdrs as header,i}
          <div class="place-content-center flex items-center" class:name_shadow="{i !== tbl_hdrs.length - 1}">
            {#if i === 2}
              <span class="flex px-4">
                <button on:click={() => {}} class="text-gray-200 hover:text-gray-300 mr-4"><i class="fas fa-cog"></i></button>        
                <span class="flex items-center">
                  <i class="font-black not-italic text-[10px]">{tbl_hdrs[i]}</i>
                  <div class="flex flex-col mb-[10px]">
                    <button on:click="{() => _sort(i, 0)}" class="text-gray-300" class:active_sort = "{is_direction[i][0]}"><svg style="width:16px;height:16px" viewBox="0 0 16 16"><path fill="currentColor" d="{mdiMenuUp}" /></svg></button>
                    <button on:click="{() => _sort(i, 1)}" class="text-gray-300" class:active_sort = "{is_direction[i][1]}"><svg style="width:16px;height:16px" viewBox="0 0 16 16"><path fill="currentColor" d="{mdiMenuDown}" /></svg></button>            
                  </div> 
                </span>
              </span>
            {:else}
              <span class="flex items-center">
                <div class="flex items-center">
                  {#if header === 'Цена'}
                    <div class="flex flex-col mb-[10px] mr-2">
                      <button on:click="{() => _sort(i, 0)}" class="text-gray-300" class:active_sort = "{is_direction[i][0]}"><svg style="width:16px;height:16px" viewBox="0 0 16 16"><path fill="currentColor" d="{mdiMenuUp}" /></svg></button>      
                      <button on:click="{() => _sort(i, 1)}" class="text-gray-300" class:active_sort = "{is_direction[i][1]}"><svg style="width:16px;height:16px" viewBox="0 0 16 16"><path fill="currentColor" d="{mdiMenuDown}" /></svg></button>
                    </div>                
                  {/if} 
                  <i class="font-black not-italic text-[10px]">{header}</i>
                </div>
              </span>
            {/if}
          </div> 
        {/each}
      </div>

      <!--Контент таблицы-->
      <div class="grid grid-cols-[100px_repeat(2,_minmax(80px,_1fr))minmax(120px,_1fr)_100px_minmax(120px,_1fr)_40px] shadow-rowDownShadow bg-gray-50">
        <Tbl {rowTable} on:edit="{handleVerify}" />
        <FormTbl {table} on:table="{handleVerify}" onClose="{i => handleClose(i)}" />
      </div><br />
      <span class="text-left flex flex-col label-text font-semibold text-[#ab5252] text-xs">
        <span>* <i>1. Поля "Название" и "Фото" должны быть уникальными(неповторяющимися).</i></span>
        <span>* <i class="">2. "Категории" должны наследоваться от "Тэгов", а все остальные поля от "Категорий".</i></span>
      </span>
    </div>
  </div>
</main>

<script lang="ts">
  import { fly } from 'svelte/transition';
  import { mdiMenuDown } from '@mdi/js';
  import { mdiMenuUp } from '@mdi/js';
  import menu from '$lib/local/ru-RU';
  import type { DataGallery, AdminTbl } from '$lib/types';
  import FormTbl from '../components/FormTbl/+page.svelte';
  import Tbl from '../components/RowTbl/+page.svelte';

  export let data;

  const {get_prd} = data;

  let get_products = get_prd.tbl ? get_prd.tbl : [];

  console.log('Выборка продуктов: ', get_prd.tbl);
  console.log('Сообщение выборки продуктов: ', get_prd.msg);


  let rowTable: AdminTbl[] = [];
  let rw: AdminTbl = {};
  for (const v of get_products) {
    rw = {...rw, ...{tag_id: v.id, tag: {value: v.name, isEdit: false}}};
    for (const s of v.categories) {
      rw = {...rw, ...{category_id: s.id, category: {value: s.name, isEdit: false}}};
      for (const p of s.products) {
        rw = {...rw, ...{product_id: p.id, name: {value: p.name, isEdit: false}, photo: {value: p.photo, isEdit: false}, price: {value: p.price, isEdit: false}, description: {value: p.description, isEdit: false}}};
        rowTable = [...rowTable, rw];
      };
    };
  };

  const products_hdrs = menu.productTblHeaders;
  const tbl_hdrs = products_hdrs.table_hdrs;
  
  let is_direction = [[false, false], [false, false], [false, false], [false, false], [false, false], [false, false], [false, false], ];
  let menuTbl = false;
  let table: DataGallery[] = [];
  let formTbl: AdminTbl[] = [];
  let isErrors: boolean[] = [];

  const handleClose = (i: number) => {
    console.log('***handleClose***');
    table = table.filter((v, id) => id !== i);
    formTbl = formTbl.filter((v, id) => id !== i);///
    console.log('Close Table: ', table);
  };

  const handleVerify = (event: { detail: { rowTbl: AdminTbl[]; }; }) => {
    console.log('***handleVerify***');
    formTbl = [];
    event.detail.rowTbl.map((v, i) => {
      isErrors[i] =  (v.name.value.length <= 2 || v.tag.value.length <= 2 || v.category.value.length <= 2 || v.photo.value.length <= 2 || v.price.value.length <= 2) ? true : false;
    });
    if (isErrors.filter(s => s === true).length === 0) formTbl = [...formTbl, ...event.detail.rowTbl];
  };

  const addRow = () => {
    console.log('***addRow***');
    const formInit = {name: '', tag: '', category: '', photo: '', price: '', description: ''};
    table = [...table, formInit];
  };

  const handleSubmit = async ( t: DataGallery[] ) => {
    console.log('***handleSubmit***');
    if (t.length === 0) return;
    let data:{name?:string, categories?: {name?:string; products?:DataGallery[]}[]}[] = [];
    let ctgrs:{tag: string; category: string; products: DataGallery[]; }[] = [];
    let nameCtgrs:string[] = [];
    let nameTags:string[] = [];

    for (let m of t) {
      if (!nameTags.includes(m.tag.value)) nameTags.push(m.tag.value);
      if (!nameCtgrs.includes(m.category.value)) nameCtgrs.push(m.category.value);
    };
    for (let p of nameTags) {
      data.push({name: p, categories: []});
    };
    for (let n of nameCtgrs) {
      ctgrs.push({category: n, products: []});
    };
    ctgrs.map((vl, idx) => {
      t.map(v => {
        if (vl.category === v.category.value) {
          ctgrs[idx].products.push({name: v.name.value, price: v.price.value, photo: v.photo.value, description: v.description.value});
          ctgrs[idx].tag = v.tag.value;
        }; 
      })
    });
    data.map((q, i) => {
      ctgrs.map((r, id) => {
        if (q.name === r.tag) {
          data[i].categories?.push({name: r.category, products: r.products});
        };
      });
    });
    /*const res = await fetch('/goods', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}});
    if (res.ok) {
      rw = {};
      const result = await res.json();
      console.log('Сообщение с сервера(adminLoadGoods): ', result.msg);
      console.log('Данные с сервера(adminLoadGoods): ', result.tbl);
      if (result.tbl && result.tbl.length !== 0) table = [];
      for (const v of result.tbl) {
        rowTable = rowTable.filter(t => t.tag.value !== v.body.name);
        rw = {...rw, ...{tag_id: v.id, tag: {value: v.body.name, isEdit: false}}};
        for (const s of v.body.categories) {
          rw = {...rw, ...{category_id: s.id, category: {value: s.name, isEdit: false}}};
          for (const p of s.products) {
            rw = {...rw, ...{product_id: p.id, name: {value: p.name, isEdit: false}, photo: {value: p.photo, isEdit: false}, price: {value: p.price, isEdit: false}, description: {value: p.description, isEdit: false}}};
            rowTable = [...rowTable, rw];
          };
        };
      };
      return {
        message: result.msg,
        dataTbl: result.tbl
      };
    };*/
    console.log('Data: ', data);
    console.log('Ctgrs: ', ctgrs);
    console.log('NameTags: ', nameTags);
    console.log('NameCtgrs: ', nameCtgrs);
  };

  const handleClearTable = async () => {
    console.log('***handleClearTable***');
    const res = await fetch('/goods', {method: 'DELETE'});
    if (res.ok) {
      rowTable = [];
      const result = await res.json();
      console.log('Ответ сервера(adminClearTable): ', result.msg);
      return {
        message: result.msg
      };
    };
  };

  const _sort = (gr_pos: number, pos: number) => {
    console.log('***_sort***');
    if (is_direction[gr_pos][pos] === false) {
      for (let i = 0; i < is_direction.length; i++) {
        for (let j = 0; j < is_direction[i].length; j++) {
          if (j === pos && i === gr_pos) {
            is_direction[i][j] = true;
          } else is_direction[i][j] = false;
        };
      };
    };
    pos === 0 && sortUp(gr_pos);
    pos === 1 && sortDown(gr_pos);
  };

  const sortUp = (key: number) => {
    console.log('***function sortUp***');
    rowTable = rowTable.sort((a, b) => {
      if (key === 4 && (typeof a.price === 'string' && typeof b.price === 'string')) return Number(b.price) - Number(a.price);
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;      
    });    
  };

  const sortDown = (key: number) => {
    console.log('***function sortDown***');
    rowTable = rowTable.sort((a, b) => {
      if (key === 4 && (typeof a.price === 'string' && typeof b.price === 'string')) return Number(a.price) - Number(b.price);
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
    });
  };

$: console.log('formTbl: ', formTbl);
$: console.log('isErrors: ', isErrors);
$: console.log('Сортировка: ', is_direction);
$: console.log('rowTable: ', rowTable);
</script>

<style>
  .active_sort {
    @apply text-amber-500;
  }

  .name_shadow {
    @apply shadow-rowRightShadow;
  }
  /*.border_right {
    @apply border-r border-solid h-full;
  }*/
</style>