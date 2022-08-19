{#each rowTable as row,idx}
  <span class="flex items-center justify-between p-1 shadow-rowRightShadow text-left">
    {#if row.name?.isEdit}
      <input type="text" placeholder="Изменить..." bind:value="{row.name.value}" class="input input-bordered input-xs w-full placeholder:italic placeholder:text-slate-400 focus:placeholder:text-transparent">
    {:else}
      <i class="label-text text-gray-600 h-6 w-full max-w-xs">{row.name?.value}</i>
      <button tabIndex="0" title="Редактировать..." on:click="{() => handleEdit(idx, 'name')}" class="place-self-center text-green-400 shadow-sub hover:scale-110">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="{mdiLeadPencil}" />
        </svg>
      </button>  
    {/if}
  </span>
  <span class="flex items-center justify-between p-1 border-r border-solid h-full text-left shadow-rowDownShadow">
    {#if row.tag?.isEdit}
      <input type="text" placeholder="Изменить..." bind:value="{row.tag.value}" class="input input-bordered input-xs w-full placeholder:italic placeholder:text-slate-400 focus:placeholder:text-transparent">    
    {:else}
      <i class="label-text text-gray-600 placeholder:italic placeholder:text-slate-400 h-6 w-full max-w-xs">{row.tag?.value}</i>
      <button tabIndex="0" title="Редактировать..." on:click="{() => handleEdit(idx, 'tag')}" class="place-self-center text-green-400 shadow-sub hover:scale-110">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="{mdiLeadPencil}" />
        </svg>
      </button> 
    {/if}
  </span>
  <span class="flex items-center justify-between p-1 border-r border-solid h-full text-left shadow-rowDownShadow">
    {#if row.category?.isEdit}
      <input type="text" placeholder="Изменить..." bind:value="{row.category.value}" class="input input-bordered input-xs w-full placeholder:italic placeholder:text-slate-400 focus:placeholder:text-transparent">
    {:else}
      <i class="label-text text-gray-600 placeholder:italic placeholder:text-slate-400 h-6 w-full max-w-xs">{row.category?.value}</i>
      <button tabIndex="0" title="Редактировать..." on:click="{() => handleEdit(idx, 'category')}" class="place-self-center text-green-400 shadow-sub hover:scale-110">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="{mdiLeadPencil}" />
        </svg>
      </button> 
    {/if}
  </span>
  <span class="flex items-center justify-between p-1 border-r border-solid h-full text-left shadow-rowDownShadow">
    {#if row.photo?.isEdit}
      <input type="text" placeholder="Изменить..." bind:value="{row.photo.value}" class="input input-bordered input-xs w-full placeholder:italic placeholder:text-slate-400 focus:placeholder:text-transparent">
    {:else}
      <i class="label-text text-gray-600 placeholder:italic placeholder:text-slate-400 h-6 w-full max-w-xs">{row.photo?.value}</i>
      <button tabIndex="0" title="Редактировать..." on:click="{() => handleEdit(idx, 'photo')}" class="place-self-center text-green-400 shadow-sub hover:scale-110">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="{mdiLeadPencil}" />
        </svg>
      </button>  
    {/if}
  </span>
  <span class="flex items-center justify-between p-1 border-r border-solid h-full text-left shadow-rowDownShadow">
    {#if row.price?.isEdit}
      <input type="text" placeholder="Изменить..." bind:value="{row.price.value}" class="input input-bordered input-xs w-full placeholder:italic placeholder:text-slate-400 focus:placeholder:text-transparent">
    {:else}
      <i class="label-text text-gray-600 h-6 w-full max-w-xs">{row.price?.value}</i>
      <button tabIndex="0" title="Редактировать..." on:click="{() => handleEdit(idx, 'price')}" class="place-self-center text-green-400 shadow-sub hover:scale-110">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="{mdiLeadPencil}" />
        </svg>
      </button>
    {/if}
  </span>
  <span class="flex items-center justify-between p-1 border-r border-solid h-full text-left shadow-rowDownShadow">
    {#if row.description?.isEdit}
      <textarea type="text" placeholder="Изменить..." bind:value="{row.description.value}" class="textarea textarea-bordered input-xs w-full placeholder:italic placeholder:text-slate-400 focus:placeholder:text-transparent"></textarea>
    {:else}
      <i class="label-text text-gray-600 placeholder:italic placeholder:text-slate-400 h-6 w-full max-w-xs">{row.description?.value}</i>
      <button tabIndex="0" title="Редактировать..." on:click="{() => handleEdit(idx, 'description')}" class="place-self-center text-green-400 shadow-sub hover:scale-110">
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
  import { mdiCheckBold, mdiCloseThick, mdiLeadPencil, mdiDeleteForever} from '@mdi/js';
  import type { DataGallery, AdminTbl } from '$lib/types';

  export let rowTable:AdminTbl[] = [];

  let data:DataGallery[] = [];

  const onCloseDB = async (i: number) => {
    const res = await fetch('/goods/row_clear', {method: 'DELETE', body: JSON.stringify({tag: rowTable[i].tag?.value, category: rowTable[i].category?.value, name: rowTable[i].name?.value, photo: rowTable[i].photo?.value, price: rowTable[i].price?.value, description: rowTable[i].description?.value }), headers: {'Content-Type': 'application/json'}});
    if (res.ok) {
      rowTable = [];
      let rw: AdminTbl = {};
      const result = await res.json();
      console.log('Ответ сервера(adminClearRowWithTable): ', result.msg);
      console.log('Данные с сервера(adminClearRowWithTable): ', result.tbl);
      rowTable = rowTable.filter(v => v.tag?.value !== result.tbl.name);
      rw = {...rw, tag: {value: result.tbl.name, isEdit: false}};
      for (const s of result.tbl.categories) {
        rw = {...rw, category: {value: s.name, isEdit: false}};
        for (const p of s.products) {
          rw = {...rw, ...{name: {value: p.name, isEdit: false}, photo: {value: p.photo, isEdit: false}, price: {value: p.price, isEdit: false}, description: {value: p.description, isEdit: false}}};
          rowTable = [...rowTable, rw];
        };
      };
      return {
        message: result.msg
      };
    };
  };

  const handleEdit = (i: number, v: string) => {
    console.log('***handleEdit***');
    rowTable[i][v] = {isEdit:true, value: ''};
  };

  const handleUpdateDB = async() => {
    console.log('***handleUpdateDB***');
    const res = await fetch('/goods', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}});    
  };

  $: console.log('rowTable: ', rowTable);
</script>

<style lang="postcss">

</style>