<script context="module">
  /** @type {import('./[slug]').Load} */
  export const load = async ({ fetch, session }) => {
    const { userid, message } = session;
    const products = await fetch('/api/get_products');
    return { props: {
      get_prd: products.ok && (await products.json()),
      uid: userid,
    }};
  };
</script>

<script lang="ts">
  import '../../app.css';
  import Header from '$lib/header/Header.svelte'
  
  export let uid = '';
  export let get_prd: {tbl: any[]; msg: string; status: number};

  $: console.log('Идент-р пользователя: ', uid);
  $: console.log('Все продукты: ', get_prd);
</script>

<div class="page">
  <Header />
  <main>
    <slot />
  </main>
  <footer class="flex flex-col text-center py-5">
    <p>Разработка - "<a href="https://delo_vkusa.ru" target="_blank" class="focus:no-underline">Дело вкуса</a>"</p>
    <p>Эл.почта: nk1389074@gmail.com</p>
    <p>Телефон: +7 988 553 63 43</p>
    <p class="w-full text-center border-t border-solid border-white">Авторские права "Дело вкуса" 
      <i>©</i>
       2022. Все права защищены.</p> 
  </footer>
</div>