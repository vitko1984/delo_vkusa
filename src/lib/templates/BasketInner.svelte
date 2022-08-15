<div class="grid grid-rows-[36px_minmax(20px,_1fr)] px-1 lg:px-8 mb-2">

  <!--Шапка(верхняя часть) таблицы-->
  <div class="grid grid-cols-[minmax(100px,_1fr)_80px_minmax(100px,_1fr)_40px] items-center bg-gray-50 font-black not-italic text-xs text../stores/stores] leading-9">
    <span class="shadow-rowRightShadow">
      <i>{tbl_hdrs[0]}</i> 
    </span>
    <span class="border-r border-[#eeecf7] border-solid shadow-rowDownShadow">
      <i>{tbl_hdrs[1]}</i>
    </span>
    <span class="border-r border-[#eeecf7] border-solid shadow-rowDownShadow">
      <i>{tbl_hdrs[2]}</i>
    </span>
    <span class="shadow-rowDownShadow">
      <!--<i>{tbl_hdrs[3]}</i>-->
    </span>
  </div>

  <!--Контент таблицы-->
  {#if $cnt === 0}
    <span class="bg-gray-50 font-black not-italic text-base">
      <i>Ваша корзина пуста</i>
    </span>
  {:else}
    {#each $tbl as row, idx}
      {#if new RegExp($uid).test(row.productName)}
        <div class="grid grid-cols-[minmax(100px,_1fr)_80px_minmax(100px,_1fr)_40px] items-center bg-gray-50 font-normal not-italic text-xs leading-9">
          <span class="shadow-rowStartColumnShadow">
            <i>{(row.productName).replace(`|${$uid}`, '')}</i>
          </span>
          <span class="border-r border-[#eeecf7] border-solid shadow-rowDownShadow">
            <i>{row.price}</i>
          </span>
          <span class="flex items-center px-2 justify-between border-r border-[#eeecf7] border-solid shadow-rowDownShadow">
            {#if row.isCount}
              <span  
                use:clickOutside 
                on:click-outside={() => [($tbl[idx].isCount = false), handleAmount(idx)]}
                use:keydownEnter
                on:keydown-enter={() => [($tbl[idx].isCount = false), handleAmount(idx)]}>
                <input type="text" placeholder="0" bind:value="{editCount}" class="input input-bordered input-xs focus:placeholder:text-transparent">
              </span>
            {:else}
              <i>{row.amount}</i>           
            {/if}
            <button tabIndex="0" title="Изменить количество" on:click="{() => ($tbl[idx].isCount = true)}" class="text-green-400 shadow-sub">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="{mdiLeadPencil}" />
              </svg>
            </button>
          </span>
          <button tabIndex="0" title="Удалить данный заказ" on:click="{() => handleDelete(idx)}" class="place-self-center text-red-400 shadow-sub">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="{mdiDeleteForever}" />
            </svg>
          </button>
        </div>
      {/if}
    {/each}
    <span class="self-center h-9 bg-gray-50 font-black not-italic text-xs text-right pt-2 pr-4"><i>Итого: </i><i class="font-normal text-[#ab5252]">{$form.total}</i></span>
  {/if}
</div>

<script lang="ts">
  import { mdiLeadPencil, mdiDeleteForever } from '@mdi/js';
  import { clickOutside } from '$lib/ioevents/click';
  import { keydownEnter } from '$lib/ioevents/keydown';
  import { uid, contentBasket as tbl, amountOrder as cnt, form } from '../../stores/app';
  import menu from '$lib/local/ru-RU';

  const tbl_hdrs = menu.basketTblHeaders;
  $form.label = 'Оформить';

  let editCount: number | undefined;

  const handleAmount = async (i: number) => {
    const _amount = editCount ? Number(editCount) - $tbl[i].amount : $tbl[i].amount;
    let _count = 0;
    const data = {productName: ($tbl[i].productName).replace(`|${$uid}`, ''), price: $tbl[i].price, amount: _amount};
    const res = await fetch('/api/basket', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}, credentials: 'include'});
    if (res.ok) {
      const result = await res.json();
      console.log('Ответ сервера(PostUserBasket) в BasketInner: ', result.msg);
      $cnt = 0;
      $form.total = 0;
      result.body.basket.map(v => {
        if (new RegExp($uid).test(v.productName)) {
          $form.total += v.price * v.amount; 
          $cnt += v.amount;
        };
        editCount = undefined;
      });
      $tbl = result.body.basket;
      return {
        message: result.msg
      };
    };
  };

  const handleDelete = async (i: number) => {
    const data = {productName: $tbl[i].productName};
    const res = await fetch('/api/basket_del', {method: 'DELETE', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}});
    if (res.ok) {
      const result = await res.json();
      console.log('Ответ сервера(DeleteBasket) в BasketInner: ', result.msg);
      $cnt = 0;
      $form.total = 0;
      result.body.basket.map(v => {
        if (new RegExp($uid).test(v.productName)) {
          $form.total += v.price * v.amount; 
          $cnt += v.amount;
        };
      });
      $tbl = result.body.basket;
      return {
        message: result.msg
      };
    };
  };

  $: console.log('totalPriceBasket: ', $form.total);
  $: console.log('Содержимое корзины заказов в BasketInner: ', $tbl);
</script>