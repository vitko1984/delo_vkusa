{#each rowTable as row,idx}
  <span class="px-1 shadow-rowRightShadow text-left"><i class="label-text text-gray-400 h-6 w-full max-w-xs">{row.name}</i></span>
  <span class="px-1 border-r border-[#eeecf7] border-solid h-full text-left shadow-rowDownShadow"><i class="label-text text-gray-400 h-6 w-full max-w-xs">{row.tag}</i></span>
  <span class="px-1 border-r border-[#eeecf7] border-solid h-full text-left shadow-rowDownShadow"><i class="label-text text-gray-400 h-6 w-full max-w-xs">{row.category}</i></span>
  <span class="px-1 border-r border-[#eeecf7] border-solid h-full text-left shadow-rowDownShadow"><i class="label-text text-gray-400 h-6 w-full max-w-xs">{row.photo}</i></span>
  <span class="px-1 border-r border-[#eeecf7] border-solid h-full text-left shadow-rowDownShadow"><i class="label-text text-gray-400 h-6 w-full max-w-xs">{row.price}</i></span>
  <span class="px-1 border-r border-[#eeecf7] border-solid h-full text-left shadow-rowDownShadow"><i class="label-text text-gray-400 h-6 w-full max-w-xs">{row.description}</i></span>
  {#if rowTable.length !== 0}
    <div class="grid items-center px-2">
      <button tabIndex="0" title="Удалить строку из БД" on:click="{() => onCloseDB(idx)}" class="place-self-center text-red-400 shadow-sub">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="{mdiCloseThick}" />
        </svg>
      </button>
    </div>    
  {/if}
{/each}

<script lang="ts">
  import { mdiCheckBold, mdiCloseThick } from '@mdi/js';
  import type { DataGallery } from '$lib/types';

  export let rowTable: {name?: string; tag?: string; category?: string; photo?: string; price?: string; description?: string}[] = [];

  const onCloseDB = async (i: number) => {
    const res = await fetch('/goods/row_clear', {method: 'DELETE', body: JSON.stringify(rowTable[i]), headers: {'Content-Type': 'application/json'}});
    if (res.ok) {
      rowTable = [];
      let rw: {name?: string; tag?: string; category?: string; photo?: string; price?: string; description?: string;} = {};
      const result = await res.json();
      console.log('Ответ сервера(adminClearRowWithTable): ', result.msg);
      console.log('Данные с сервера(adminClearRowWithTable): ', result.tbl);
      rowTable = rowTable.filter(v => v.tag !== result.tbl.name);
      rw = {...rw, tag: result.tbl.name};
      for (const s of result.tbl.categories) {
        rw = {...rw, category: s.name};
        for (const p of s.products) {
          rw = {...rw, ...p};
          rowTable = [...rowTable, rw];
        };
      };
      return {
        message: result.msg
      };
    };
  };

  $: console.log('rowTable: ', rowTable);
</script>

<style lang="postcss">

</style>