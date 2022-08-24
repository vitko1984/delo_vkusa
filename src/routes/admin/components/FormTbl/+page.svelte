{#each table as row,idx}
  <span class="relative flex items-center px-1 h-full shadow-rowRightShadow">
    <input type="search" name="tag" class="input input-bordered h-6 w-full max-w-xs" on:blur={handleBlur} bind:value="{table1[idx].tag}">
    {#if table1[idx].tag?.length === 0}
      <i class="absolute bottom-0 right-1 errors">{field_empty}</i>
    {:else if (table1[idx].tag?.length > 0 && table1[idx].tag?.length <= 2)}
        <i class="absolute bottom-0 right-1 errors">{name_incorrect}</i>
    {/if}
  </span>
  <span class="relative flex items-center px-1 h-full shadow-rowRightShadow">
    <input type="search" name="category" class="input input-bordered h-6 w-full max-w-xs" on:blur={handleBlur} bind:value="{table1[idx].category}">
    {#if table1[idx].category?.length === 0}
      <i class="absolute bottom-0 right-1 errors">{field_empty}</i>
    {:else if (table1[idx].category?.length > 0 && table1[idx].category?.length <= 2)}
        <i class="absolute bottom-0 right-1 errors">{name_incorrect}</i>
    {/if}
  </span>
  <span class="relative flex items-center px-1 h-full shadow-rowRightShadow">
    <input type="search" name="name" class="input input-bordered h-6 w-full max-w-xs" on:blur={handleBlur} bind:value="{table1[idx].name}">
    {#if table1[idx].name?.length === 0}
      <i class="absolute bottom-0 right-1 errors">{field_empty}</i>
    {:else if (table1[idx].name?.length > 0 && table1[idx].name?.length <= 2)}
      <i class="absolute bottom-0 right-1 errors">{name_incorrect}</i>
    {/if}
  </span>
  <span class="relative flex items-center px-1 h-full shadow-rowRightShadow">
    <input type="search" name="photo" class="input input-bordered h-6 w-full max-w-xs" on:blur={handleBlur} bind:value="{table1[idx].photo}">
    {#if table1[idx].photo?.length === 0}
      <i class="absolute bottom-0 right-1 errors">{field_empty}</i>
    {:else if (table1[idx].photo?.length > 0 && table1[idx].photo?.length <= 2)}
        <i class="absolute bottom-0 right-1 errors">{name_incorrect}</i>
    {/if}
  </span>
  <span class="relative flex items-center px-1 h-full shadow-rowRightShadow">
    <input type="search" name="price" class="input input-bordered h-6 w-full max-w-xs" on:blur={handleBlur} bind:value="{table1[idx].price}">
    {#if table1[idx].price?.length === 0}
      <i class="absolute bottom-0 right-1 errors">{field_empty}</i>
    {:else if (table1[idx].price?.length > 0 && table1[idx].price?.length <= 2)}
        <i class="absolute bottom-0 right-1 errors">{name_incorrect}</i>
    {/if}
  </span>
  <span class="relative flex items-center px-1 h-full shadow-rowRightShadow">
    <textarea type="text" name="description" class="textarea textarea-bordered h-6 w-full max-w-xs" bind:value="{row.description}" />
  </span>
  <div class="grid items-center px-2">
    <button tabIndex="0" title="Удалить строку" on:click="{() => onClose(idx)}" class="place-self-center text-red-400 shadow-sub">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="{mdiCloseThick}" />
      </svg>
    </button>
  </div>
{/each}

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mdiCheckBold, mdiCloseThick } from '@mdi/js';
  import type { DataGallery, AdminTbl } from '$lib/types';

  const dispatch = createEventDispatcher();
  const field_empty = "Заполнить.";
  const name_incorrect = "От 3-х симв.";

  export let table: DataGallery[];
  export let onClose = (i: number) => {};

  $: table1 = table;

  const handleBlur = () => {
    console.log('***handleBlur***');
    let rowTable:AdminTbl[] = [];
    let rw:AdminTbl = {}
    for (const p of table1) {
      rw = {...rw, ...{tag_id: 0, tag: {value: p.tag, isEdit: false}, category_id: 0, category: {value: p.category, isEdit: false}, product_id: 0, name: {value: p.name, isEdit: false}, photo: {value: p.photo, isEdit: false}, price: {value: p.price, isEdit: false}, description: {value: p.description, isEdit: false}}};
      rowTable = [...rowTable, rw];
    };
    dispatch('table', {
			rowTbl: rowTable
		});      
  };

  $: console.log('table: ', table1);

</script>

<style lang="postcss">
  .errors {
    @apply p-0 text-sm text-orange-600 list-none;
  }
</style>