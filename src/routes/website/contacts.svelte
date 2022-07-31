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

<div class="container py-6 pl-[100px] 2xl:pl-4">            
  <picture>
    <img src="/contacts.png" alt="Контакты" class="rounded-sm w-[640px] h-[320px]">
  </picture>

  <div class="flex flex-col items-start">
    <span class="font-black text-[32px] leading-10 py-2">Контакты</span>
    <span class="font-normal text-[16px] leading-6 mb-4">Ваши вопрсы и предложения мы будем рады получить по следующим адресам:</span>
    <div class="grid grid-cols-2 gap-4">
      <div class="grid grid-rows-4 gap-4">
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
      <div id="map" class="block w-[312px] h-[200px]"></div>
    </div>            
  </div>

  <div class="flex flex-col items-start mt-[70px]">
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
    <button class="button mt-6" on:click="{ handleSubmit }">Отправить</button>   
  </div>
</div> 

<script lang="ts">
  import { form, isHandleErrors } from '../../stores/app';
  //import DG from '2gis-maps';

  /*const map = DG.map('map', {
    center: [47.256616290029115,39.87908988462681],
    zoom: 15
  });
  DG.marker([47.256616290029115,39.87908988462681]).addTo(map);*/

  const field_empty = "Поле не заполнено.";
  const name_incorrect = "Поле должно содержать не менее 2-х символов.";
  const email_incorrect = 'Неверный E-Mail';

  let errors = {name: '', email: ''}; 
  let wish = '';

  const handleChange = () => {
    console.log('***handleChange***');
    errors.name = $form.name.length === 0 ? field_empty : ($form.name.length > 0 && $form.name.length <= 1) ? name_incorrect : '';
    errors.email = $form.email.length === 0 ? field_empty : ($form.email.length > 0 && !/@/.test($form.email)) ? email_incorrect : ''; 
    return errors;
  };  

  const handleSubmit = async () => {
    console.log('***handleSubmit***');
    $isHandleErrors = true;
    const isNoErrors = $form.name.length === 0 || $form.email.length === 0 || 
      ($form.name.length > 0 && $form.name.length <= 1) || ($form.email.length > 0 && !/@/.test($form.email)) ? false : true;
    if (isNoErrors) {
      const res = await fetch('/goods/user', {method: 'POST', body: JSON.stringify({title: 'Комментарий "Контакты"', name: $form.name, email: $form.email, wish: wish || wish.length !== 0 ? wish : ''}), headers: {'Content-Type': 'application/json'}, credentials: 'include'});
      if (res.ok) {
        const result = await res.json();
        console.log('Ответ сервера(HandleSubmit): ', result.msg);
        return {
          message: result.msg
        };
      };
    };      
  };
</script>

<style>
  .errors {
    @apply p-0 text-sm text-orange-600 list-none;
  }
</style>