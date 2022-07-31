<div class="flex items-start px-2 pb-2">
  <picture>
    <img src="/Товары/{products[idx].photo}" alt="Фото" class="w-3/4 rounded border-[2px] border-[#ab8c52]">
  </picture>
  <div class="flex flex-col items-start">
    <span class="label">
      <i class="label-text text-[#ab8c52]">Ваше имя(псевдоним)</i>
    </span>
    {#if $form.name}
      <span class="text-[#ab5252] text-base px-1"><i>{$form.name}</i></span>
    {:else}             
      <input type="search" class="input input-bordered h-5 w-full max-w-xs placeholder:text-gray-300" placeholder="Имя..." bind:value="{$form.input}">              
    {/if}
    <span class="label">
      <i class="label-text text-[#ab8c52]">Оцените товар(курсором)</i>
    </span>
    <Rating bind:rating={$form.rating} defaultValue={$form.default} />
    <span class="label">
      <i class="label-text text-[#ab8c52]">Напишите свой отзыв</i>
    </span>
    <textarea class="textarea textarea-bordered h-24 placeholder:text-gray-300" placeholder="Отзыв..." bind:value="{$form.textarea}"></textarea>
  </div>
</div>

<script lang="ts">
  import { users, uid, form } from '../../stores/app';
  import type { DataGallery } from '$lib/types';
  import Rating from './Rating.svelte';

  export let idx: number;
  export let products:DataGallery[];

  $form.label = 'Применить';

  $users.map((v, idx) => {
    if (v.uid === $uid) $form.name = v.name ? v.name : '';
  });
</script>
