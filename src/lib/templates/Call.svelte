<div class="flex flex-col items-start px-8">
  <span class="label">
    <span class="mb-1">*</span><i class="label-text text-[#ab8c52]">Имя:</i>
  </span>             
  <input type="search" name="name" class="input input-bordered h-6 w-full max-w-xs placeholder:text-gray-300" placeholder="Введите имя..." on:blur={handleChange} bind:value="{$form.name}">
  {#if errors.name.length !== 0}
    <i class="errors">{errors.name}</i>
  {/if}
  <span class="label">
    <span class="mb-1">*</span><i class="label-text text-[#ab8c52]">Телефон:</i>
  </span>
  <input type="search" name="phone" class="input input-bordered h-6 w-full max-w-xs placeholder:text-gray-300" placeholder="Введите телефон..." on:blur={handleChange} bind:value="{$form.phone}">
  {#if errors.phone.length !== 0}
    <i class="errors">{errors.phone}</i>
  {/if}
  <span class="label">
    <i class="label-text text-[#ab8c52]">Удобное время, пожелания:</i>
  </span>
  <textarea type="text" name="wish" class="textarea textarea-bordered h-24 w-full max-w-xs placeholder:text-gray-300" placeholder="Текст..." bind:value="{$form.wish}"></textarea>
  <span class="label">
    <span class="mb-1">*</span><i class="label-text text-gray-500 text-xs">Помеченные поля обязательны для заполнения.</i>
  </span>    
</div>

<script context="module">
  export const prerender = true;
</script>

<script lang="ts"> 
  import { contentBasket as tbl, uid, form, isHandleErrors } from '../../stores/app';

  const field_empty = "Поле не заполнено.";
  const name_incorrect = "Поле должно содержать не менее 2-х символов.";
  const phone_incorrect = 'Номер должен содержать не менее 11-ти символов.';

  let errors = {name: '', phone: ''};

  $form.label = 'Перезвонить';

  const handleChange = () => {
    errors.name = $form.name.length === 0 ? field_empty : ($form.name.length > 0 && $form.name.length <= 1) ? name_incorrect : ''
    errors.phone = $form.phone.length === 0 ? field_empty : ($form.phone.length > 0 && $form.phone.length <= 10) ? phone_incorrect : ''; 
    return errors;
  };
</script>

<style lang="postcss">
  .errors {
    @apply p-0 text-sm text-orange-600 list-none;
  }    
</style>