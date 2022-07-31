<svelte:head>
  <title>Оплата и доставка</title>
</svelte:head>

<div class="container py-6">
  <div class="flex flex-col items-start">
    <div class="flex">
      <picture>
        <img src="/payment.png" alt="Оплата" class="rounded-sm w-[100px] h-[100px]">
      </picture>
      <span class="self-center ml-6 font-black text-[32px] leading-10 py-2">Оплата</span>
    </div>   
    <span class="text-[#ab8c52] font-semibold text-[16px] leading-6 my-4">Способы оплаты товара:</span>
    <ol class="font-normal text-sm leading-10 ml-6 text-left">
      <li class="">1. <i></i>Для физ. лиц - оплата наличными при получении товара</li>
      <li class="">2. <i></i>Для юр. лиц - по договору</li>  
      <li class="">3. <i>Оплата банковской картой, клиенту "Сбера" - по телефону</i></li>      
    </ol>      
  </div>
  
  <div class="flex flex-col items-start mt-[70px]">
    <div class="flex">
      <picture>
        <img src="/delivery.png" alt="Доставка" class="rounded-sm w-[100px] h-[100px]">
        <!--<img src="/delivery-man.png" alt="Доставка" class="rounded-sm w-[100px] h-[100px]">-->
      </picture>
      <span class="self-center ml-6 font-black text-[32px] leading-10 py-2">Доставка</span>
    </div>
    <span class="text-[#ab8c52] font-semibold text-[16px] leading-6 my-4">Способы доставки товара:</span>
    <ol class="font-normal text-sm leading-10 ml-6 text-left">
      <li class="">1. <i>Самовывоз</i></li>
      <li class="">2. <i>Для юр. лиц по договору, при крупном опте - бесплатно</i></li>
      <li class="">3. <i>Для физ. лиц с заказом транспорта по согласованию с покупателем</i></li>
    </ol>  
  </div>
</div>