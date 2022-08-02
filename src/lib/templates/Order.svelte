<!--<form on:submit|preventDefault="{handleSubmit}" class="">-->
  <div class="flex flex-col items-start pl-2">
    <span class="label">
      <i class="label-text text-[#ab8c52] font-normal text-3xl">Покупатель</i>
    </span>
    <span class="label">
      <span class="mb-1">*</span><i class="label-text text-[#ab8c52]">Ваше имя(псевдоним):</i>
    </span>             
    <input type="search" name="name" class="input input-bordered h-6 w-full max-w-xs placeholder:text-gray-300" placeholder="Введите имя..." on:blur={handleChange} bind:value="{$form.name}">
    {#if errors.name.length !== 0}
      <i class="errors">{errors.name}</i>
    {/if}
    <span class="label">
      <span class="mb-1">*</span><i class="label-text text-[#ab8c52]">Эл. почта:</i>
    </span>
    <input type="search" name="email" class="input input-bordered h-6 w-full max-w-xs placeholder:text-gray-300" placeholder="Введите эл.почту..." on:blur={handleChange} bind:value="{$form.email}">
    {#if errors.email.length !== 0}
      <i class="errors">{errors.email}</i>
    {/if}
    <span class="label">
      <span class="mb-1">*</span><i class="label-text text-[#ab8c52]">Телефон:</i>
    </span>
    <input type="search" name="phone" class="input input-bordered h-6 w-full max-w-xs placeholder:text-gray-300" placeholder="Введите телефон..." on:blur={handleChange} bind:value="{$form.phone}">
    {#if errors.phone.length !== 0}
      <i class="errors">{errors.phone}</i>
    {/if}
    <span class="label">
      <i class="label-text text-[#ab8c52]">Адрес(для доставки):</i>
    </span>
    <textarea type="text" name="address" class="textarea textarea-bordered h-24 w-full max-w-xs placeholder:text-gray-300" placeholder="Введите адрес..." bind:value="{$form.address}"></textarea>
    <span class="label">
      <span class="mb-1">*</span><i class="label-text text-gray-500 text-xs">Помеченные поля обязательны для заполнения.</i>
    </span>
    <span class="label">
      <i class="label-text text-[#ab8c52]">Детали заказа:</i>
    </span>
    <div class="w-full bg-white px-2 rounded-lg border border-gray-300">  
      {#each $tbl as row, idx}
        {#if new RegExp($uid).test(row.productName)}
          <div class="flex py-1 flex-col shadow-rowDownShadow text-left text-sm leading-6 font-extrabold">
            <span class="flex justify-between">
              <span><i>{tbl_hdrs[0]}</i></span>
              <span class="font-normal text-[#ab8c52]"><i>{(row.productName).replace(`|${$uid}`, '')}</i></span>
            </span>
            <span class="flex justify-between">
              <span class="font-normal"><i>{tbl_hdrs[1]}</i></span>
              <span class="font-normal text-gray-400"><i>{row.price}</i></span>
            </span>
            <span class="flex justify-between">
              <span class="font-normal"><i>{tbl_hdrs[2]}</i></span>
              <span class="font-normal text-gray-400"><i>{row.amount}</i></span>
            </span>
          </div>
        {/if}  
      {/each}
    </div>
    <div class="flex items-center w-full justify-between">
      <span class="label"><i class="label-text text-[#ab8c52]">Общая стоимость:</i></span>
      <span class="font-normal text-sm text-gray-400"><i class="text-[#ab5252]">{$form.total}</i><i class="ml-1">рублей</i></span>
    </div>
    <span class="label text-left">
      <i class="label-text text-gray-500 text-xs">Нажимая на кнопку "Заказ" я даю согласие на обработку моих персональных данных.</i>
    </span>
  </div>
<!--</form>-->

<script lang="ts">
  import { contentBasket as tbl, uid, form, isHandleErrors } from '../../stores/app';
  import menu from '$lib/local/ru-RU';

  const tbl_hdrs = menu.basketTblHeaders;
  const field_empty = "Поле не заполнено.";
  const name_incorrect = "Поле должно содержать не менее 2-х символов.";
  const email_incorrect = 'Неверный E-Mail';
  const phone_incorrect = 'Номер должен содержать не менее 11-ти символов.';

  let errors = {name: '', email: '', phone: ''};

  $form.label = 'Заказ';

  const handleChange = () => {
    errors.name = $form.name.length === 0 ? field_empty : ($form.name.length > 0 && $form.name.length <= 1) ? name_incorrect : '';
    errors.email = $form.email.length === 0 ? field_empty : ($form.email.length > 0 && !/@/.test($form.email)) ? email_incorrect : '';
    errors.phone = $form.phone.length === 0 ? field_empty : ($form.phone.length > 0 && $form.phone.length <= 10) ? phone_incorrect : ''; 
    return errors;
  };

  $: $isHandleErrors && handleChange();
</script>

<style>
  .errors {
    @apply p-0 text-sm text-orange-600 list-none;
  }
</style>