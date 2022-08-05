<svelte:head>
  {#if $modal[idx] || $ident === 'basket' || $ident === 'order' || $ident === 'phone' || $ident === 'search'}
    <style>
      body { overflow: hidden; }
    </style>
  {/if}
</svelte:head>

<div class="border-[1px] border-solid border-gray-400" class:DialogModal={$modal[idx] || $ident === 'basket' || $ident === 'order' || $ident === 'phone' || $ident === 'search'}>
  <div class:DialogModalWrap={$modal[idx] || $ident === 'basket' || $ident === 'order' || $ident === 'phone' || $ident === 'search'}>
    <div class="flex items-center justify-between bg-[#ab8c52] text-[#f0f0f0] text-4xl font-serif m-0 p-[10px] pb-[20px] text-left">
      <i>{header}</i>
      <button class="hover:scale-110" on:click={() => [onAction(['Выйти', $modal[idx] = false]), $ident = '']}>
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
      </button>
    </div>
    <div class="DialogBody"><slot></slot></div>
    <div class="p-[10px] text-right border-t border-solid border-[#ab8c52]">
      {#if $form.label}
        <button type="submit" on:click={() => onAction([$form.label, idx])} class="button" class:button-active="{true}">
          <i>{$form.label}</i>
        </button>
      {/if}
    </div>
  </div>
</div>

<script lang="ts">
  import { modalDialog as modal, edit, modalId as ident, form } from '../../stores/app';

  export let header = '';
  export let onAction = (val: (string | boolean | number)[]) => {};
  export let idx: number;
</script>

<style lang="postcss">
.DialogModal {
  @apply fixed bottom-0 left-0 right-0 top-[132px]  bg-black bg-opacity-50 z-10;
}
.DialogModalWrap {
  @apply bg-white bg-opacity-90 my-[5%] mx-auto max-w-lg;
}
.DialogBody {
  @apply pt-2 text-center overflow-x-hidden /*border-y border-solid border-gray-300*/;
  max-height: 50vh;
}
</style>