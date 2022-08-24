{#each rowTable as row,idx}
  <span class="relative flex items-center p-1 h-full shadow-rowRightShadow text-left">
    {#if row.tag?.isEdit}
      <input type="text" name="tag" placeholder="Изменить..." bind:value="{row.tag.value}" on:blur="{handleBlur}" class="input input-bordered input-xs w-full placeholder:italic placeholder:text-slate-400 focus:placeholder:text-transparent">
      {#if row.tag?.value.length === 0}
        <i class="errors">{field_empty}</i>
      {:else if (row.tag?.value.length > 0 && row.tag?.value.length <= 2)}
        <i class="errors">{name_incorrect}</i>
      {/if}    
    {:else}
      <i class="text-[10px] xl:text-xs 2xl:text-sm text-gray-600 placeholder:italic placeholder:text-slate-400 w-full max-w-xs">{row.tag?.value}</i>
      <!--<button tabIndex="0" title="Редактировать..." on:click="{() => rowTable[idx].tag = {isEdit:true, value: row.tag?.value}}" class="place-self-center text-green-400 shadow-sub hover:scale-110">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="{mdiLeadPencil}" />
        </svg>
      </button>--> 
    {/if}
  </span>
  <span class="relative flex items-center px-1 h-full shadow-rowRightShadow text-left">
    {#if row.category?.isEdit}
      <input type="text" name="category" placeholder="Изменить..." bind:value="{row.category.value}" on:blur="{handleBlur}" class="input input-bordered input-xs w-full placeholder:italic placeholder:text-slate-400 focus:placeholder:text-transparent">
      {#if row.category?.value.length === 0}
        <i class="errors">{field_empty}</i>
      {:else if (row.category?.value.length > 0 && row.category?.value.length <= 2)}
        <i class="errors">{name_incorrect}</i>
      {/if}
    {:else}
      <i class="text-[10px] xl:text-xs 2xl:text-sm text-gray-600 placeholder:italic placeholder:text-slate-400 w-full max-w-xs">{row.category?.value}</i>
      <!--<button tabIndex="0" title="Редактировать..." on:click="{() => rowTable[idx].category = {isEdit:true, value: row.category?.value}}" class="place-self-center text-green-400 shadow-sub hover:scale-110">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="{mdiLeadPencil}" />
        </svg>
      </button>--> 
    {/if}
  </span>
  <span class="relative flex items-center px-1 h-full shadow-rowRightShadow text-left">
    {#if row.name?.isEdit}
      <input type="text" name="name" placeholder="Изменить..." bind:value="{row.name.value}" on:blur="{handleBlur}" class="input input-bordered input-xs w-full placeholder:italic placeholder:text-slate-400 focus:placeholder:text-transparent">
      {#if row.name?.value.length === 0}
        <i class="errors">{field_empty}</i>
      {:else if (row.name?.value.length > 0 && row.name?.value.length <= 2)}
        <i class="errors">{name_incorrect}</i>
      {/if}
    {:else}
      <i class="text-[10px] xl:text-xs 2xl:text-sm text-gray-600 h-6 w-full max-w-xs">{row.name?.value}</i>
      <button tabIndex="0" title="Редактировать..." on:click="{() => rowTable[idx].name = {isEdit:true, value: row.name?.value}}" class="place-self-center text-green-400 shadow-sub hover:scale-110">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="{mdiLeadPencil}" />
        </svg>
      </button>  
    {/if}
  </span>
  <span class="relative flex items-center px-1 h-full shadow-rowRightShadow text-left">
    {#if row.photo?.isEdit}
      <input type="text" name="photo" placeholder="Изменить..." bind:value="{row.photo.value}" on:blur="{handleBlur}" class="input input-bordered input-xs w-full placeholder:italic placeholder:text-slate-400 focus:placeholder:text-transparent">
      {#if row.photo?.value.length === 0}
        <i class="errors">{field_empty}</i>
      {:else if (row.photo?.value.length > 0 && row.photo?.value.length <= 2)}
        <i class="errors">{name_incorrect}</i>
      {/if}
    {:else}
      <i class="text-[10px] xl:text-xs 2xl:text-sm text-gray-600 placeholder:italic placeholder:text-slate-400 w-full max-w-xs">{row.photo?.value}</i>
      <button tabIndex="0" title="Редактировать..." on:click="{() => rowTable[idx].photo = {isEdit:true, value: row.photo?.value}}" class="place-self-center text-green-400 shadow-sub hover:scale-110">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="{mdiLeadPencil}" />
        </svg>
      </button>  
    {/if}
  </span>
  <span class="relative flex items-center px-1 h-full shadow-rowRightShadow text-left">
    {#if row.price?.isEdit}
      <input type="text" name="price" placeholder="Изменить..." bind:value="{row.price.value}" on:blur="{handleBlur}" class="input input-bordered input-xs w-full placeholder:italic placeholder:text-slate-400 focus:placeholder:text-transparent">
      {#if row.price?.value.length === 0}
        <i class="errors">{field_empty}</i>
      {:else if (row.price?.value.length > 0 && row.price?.value.length <= 2)}
        <i class="errors">{name_incorrect}</i>
      {/if}
    {:else}
      <i class="text-[10px] xl:text-xs 2xl:text-sm text-gray-600 h-6 w-full max-w-xs">{row.price?.value}</i>
      <button tabIndex="0" title="Редактировать..." on:click="{() => rowTable[idx].price = {isEdit:true, value: row.price?.value}}" class="place-self-center text-green-400 shadow-sub hover:scale-110">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="{mdiLeadPencil}" />
        </svg>
      </button>
    {/if}
  </span>
  <span class="relative flex items-center px-1 h-full shadow-rowRightShadow text-left">
    {#if row.description?.isEdit}
      <textarea type="text" name="description" placeholder="Изменить..." bind:value="{row.description.value}" on:blur="{handleBlur}" class="textarea textarea-bordered input-xs w-full placeholder:italic placeholder:text-slate-400 focus:placeholder:text-transparent"></textarea>
    {:else}
      <i class="text-[10px] xl:text-xs 2xl:text-sm text-gray-600 placeholder:italic placeholder:text-slate-400 w-full max-w-xs">{row.description?.value}</i>
      <button tabIndex="0" title="Редактировать..." on:click="{() => rowTable[idx].description = {isEdit:true, value: row.description?.value}}" class="place-self-center text-green-400 shadow-sub hover:scale-110">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="{mdiLeadPencil}" />
        </svg>
      </button>  
    {/if}
  </span>
  {#if rowTable.length !== 0}
    <div class="grid items-center px-2">
      <button tabIndex="0" title="Удалить строку из БД" on:click="{() => onCloseDB(idx)}" class="place-self-center text-red-400 shadow-sub hover:scale-110">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="{mdiDeleteForever}" />
        </svg>
      </button>
    </div>    
  {/if}
{/each}

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mdiCheckBold, mdiCloseThick, mdiLeadPencil, mdiDeleteForever} from '@mdi/js';
  import type { DataGallery, AdminTbl } from '$lib/types';

  const dispatch = createEventDispatcher();
  const field_empty = "Заполнить.";
  const name_incorrect = "От 3-х симв.";

  export let rowTable:AdminTbl[] = [];

  const onCloseDB = async (i: number) => {
    const res = await fetch('/goods/row_clear', {method: 'DELETE', body: JSON.stringify({tag: rowTable[i].tag?.value, category: rowTable[i].category?.value, name: rowTable[i].name?.value, photo: rowTable[i].photo?.value, price: rowTable[i].price?.value, description: rowTable[i].description?.value }), headers: {'Content-Type': 'application/json'}});
    if (res.ok) {
      rowTable = [];
      let rw: AdminTbl = {};
      const result = await res.json();
      console.log('Ответ сервера(adminClearRowWithTable): ', result.msg);
      console.log('Данные с сервера(adminClearRowWithTable): ', result.tbl);
      rowTable = rowTable.filter(v => v.tag?.value !== result.tbl.name);
      rw = {...rw, ...{tag_id: result.tbl.id, tag: {value: result.tbl.name, isEdit: false}}};
      for (const s of result.tbl.categories) {
        rw = {...rw, ...{category_id: s.id, category: {value: s.name, isEdit: false}}};
        for (const p of s.products) {
          rw = {...rw, ...{product_id: p.id, name: {value: p.name, isEdit: false}, photo: {value: p.photo, isEdit: false}, price: {value: p.price, isEdit: false}, description: {value: p.description, isEdit: false}}};
          rowTable = [...rowTable, rw];
        };
      };
      return {
        message: result.msg
      };
    };
  };  

  const handleBlur = () => {
    console.log('***handleBlur***');
    dispatch('edit', {
      rowTbl: table
    });      
  };

  $: table = rowTable;
  $: console.log('rowTable: ', rowTable);
</script>

<style>
  .errors {
    @apply  absolute -bottom-3 left-2 p-0 text-[10px] font-semibold text-orange-600 list-none;
  }
</style>