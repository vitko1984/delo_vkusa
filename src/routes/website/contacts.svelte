<svelte:head>
  <title>Контакты</title>
  <script type="text/javascript">
    var map;

    DG.then(function () {
        map = DG.map('map', {
            center: [47.256616290029115,39.87908988462681],
            zoom: 15
        });
        DG.marker([47.256616290029115,39.87908988462681]).addTo(map);
    });
  </script>
</svelte:head>

<div class="container grid grid-rows-3 pb-4">
  <div class="justify-self-center grid bg-white opacity-70 rounded-lg w-1/2 h-3/4 border-2 border-solid border-amber-200">            
    <picture class="justify-self-center">
      <img src="/contacts.png" alt="Контакты">
    </picture>
  </div>

  <div class="flex flex-col items-start bg-white w-1/2 h-4/5 border-2 border-solid border-amber-200 p-4  rounded-lg">
    <span class="font-black text-[32px] leading-10 py-2">Контакты</span>
    <span class="font-normal text-[16px] leading-6 mb-4">Ваши вопрсы и предложения мы будем рады получить по следующим адресам:</span>
    <div class="flex justify-between w-full">
      <div class="grid grid-rows-4 gap-4 mr-4">
        <div class="flex items-center">
          <i class="fa-solid fa-location-dot"></i>
          <i class="text-[#ab8c52] font-black text-sm leading-[22px] ml-2">г.Аксай, ул.Калинина д.18</i>
        </div>
        <div class="flex items-center">
          <i class="fa-solid fa-phone"></i>
          <i class="text-[#ab8c52] font-black text-sm leading-[22px] ml-2">+7 (988) 553-63-43</i>
        </div>
        <div class="flex items-center">
          <i class="fa-solid fa-envelope"></i>
          <i class="text-[#ab8c52] font-black text-sm leading-[22px] ml-2">nk1389074@gmail.com</i>      
        </div>
        <div class="flex items-center">
          <i class="fa-solid fa-clock"></i>
          <i class="text-[#ab8c52] font-black text-sm leading-[22px] ml-2">пн.-сб. 09.00-18.00</i>  
        </div>
      </div>
      <div id="map" class="block w-full min-h-[120px] min-w-[220px] mb-4"></div>
    </div>            
  </div>

  <!-- svelte-ignore component-name-lowercase -->
  <div class="justify-self-end flex flex-col items-start bg-white  border-2 border-solid border-amber-200 p-4  rounded-lg">
    <span class="font-black text-[32px] leading-10 py-2">Обратная связь</span>
    <span class="font-normal text-[16px] leading-6 mb-4">Отправьте Ваш вопрос, комментарий, пожелание прямо с сайта.</span>
    <div class="grid grid-rows-[54px_54px_120px] gap-4 w-[640px]">
      <div class="">
        <input type="search" name="name" placeholder="Ваше имя" class="input input-bordered -mb-1 w-full bg-blue-50 placeholder:text-gray-400" on:blur={handleChange} bind:value="{$form.name}" />
        {#if errors.name.length !== 0}
          <i class="errors">{errors.name}</i>
        {/if}
      </div>
      <div class="">
        <input type="search" name="phone" placeholder="Ваша эл. почта" class="input input-bordered -mb-1 bg-blue-50 w-full placeholder:text-gray-400" on:blur={handleChange} bind:value="{$form.email}" />
        {#if errors.email.length !== 0}
          <i class="errors">{errors.email}</i>
        {/if}
      </div>
     <textarea type="text" name="wish" placeholder="Ваше сообщение" class="textarea textarea-bordered bg-blue-50 w-full placeholder:text-gray-400" bind:value="{wish}" />    
    </div>
    <button type="submit" class="button mt-6" on:click="{ handleAction }">Отправить</button>   
  </div>
</div>

<script context="module">
	export const prerender = true
</script>

<script lang="ts">
  import { form, isHandleErrors } from '../../stores/app';
  import type { Edit } from '$lib/types';

  const field_empty = "Поле не заполнено.";
  const name_incorrect = "Поле должно содержать не менее 2-х символов.";
  const email_incorrect = 'Неверный E-Mail';

  let errors = {name: '', email: ''}; 
  let wish = '';
  let isNoErrors = false;
  let dataUser:Edit;

  const handleChange = () => {
    console.log('***handleChange***');
    errors.name = $form.name.length === 0 ? field_empty : ($form.name.length > 0 && $form.name.length <= 1) ? name_incorrect : '';
    errors.email = $form.email.length === 0 ? field_empty : ($form.email.length > 0 && !/@/.test($form.email)) ? email_incorrect : ''; 
    return errors;
  };
  
  const handleAction = () => {
    console.log('***handleAction***');
    $isHandleErrors = true;
    isNoErrors = $form.name.length === 0 || $form.email.length === 0 || ($form.name.length > 0 && $form.name.length <= 1) || ($form.email.length > 0 && !/@/.test($form.email)) ? false : true;
    dataUser = {title: 'Комментарий "Контакты"', name: $form.name, email: $form.email, wish: wish || wish.length !== 0 ? wish : ''};
  };

  const handleSubmit = async () => {
    console.log('***handleSubmit***');
    const res = await fetch('/goods/user', {method: 'post', body: JSON.stringify(dataUser), headers: {accept: 'application/json'}, credentials: 'include'});
    if (res.ok) {
      const result = await res.json();
      const { content, msg, status } = result;
      if (status === 200) {
        console.log('Ответ бессер-ной ф-ции: ', content);
      };
      console.log('Ответ сервера(HandleSubmit): ', msg);
      return {
        message: result.msg
      };
    };      
  };

  $: isNoErrors && handleSubmit();
</script>

<style>
  .errors {
    @apply p-0 text-sm text-orange-600 list-none;
  }
</style>