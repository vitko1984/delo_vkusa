<div class="grid grid-rows-[36px_minmax(20px,_1fr)] px-4 mb-2">
  <span class="label">
    <i class="label-text text-[#ab8c52] font-normal text-3xl">Все отзывы о продукте:</i>
  </span>         
  <div>  
    {#each comments as item}
      <div class="flex py-1 flex-col shadow-rowDownShadow text-left text-xs font-extrabold">
        <span class="flex justify-between">
          <i>{item.name}</i>
          <i class="font-normal text-gray-400">{item.date}</i>
        </span>
        <span class="font-normal">{item.comment}</span>
      </div>  
    {/each}
  </div>
</div>

<script lang="ts">
  import { 
    users, 
    form,
    galleryRatings as ratings,
  } from '../../stores/app';

  export let nameProduct = '';

  let comments:{name:string | undefined; comment:string | undefined; date:string | undefined}[] = [{name: '', comment: '',  date: ''}, ];

  $form.label = '';

  for (let v of $ratings) {
    let userName:string | undefined = '';
    for (let t of $users) {
      if (t.id === v.userId) userName = t.name;
      if (v.productName === `${nameProduct}|${t.uid}`) {
        comments = [...comments, {name: userName, comment: v.comment, date: v.updatedAt.slice(0, 10)}];
      };
    };
  };

  $: console.log('Название продукта: ', nameProduct);
  $: console.log('Comments: ', comments);
  $: console.log('Users: ', $users);
  $: console.log('Ratings: ', $ratings);
</script>
