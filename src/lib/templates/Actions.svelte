<div class="flex items-center mt-1">
  <button tabIndex="0" title="Добавить в корзину. Жми..." on:click={() => [onAction(['В корзину', 'add_basket']), $modal[idx] = true]} class=" border-[2px] rounded-[50%] hover:scale-110" class:ActionsOrder="{true}">
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="{mdiBasket}" />
    </svg>
  </button>    
  <button tabIndex="0" title="Написать отзыв и выставить оценку. Жми..." on:click={() => [onAction(['Написать отзыв и выставить оценку', 'edit']), $modal[idx] = true]} class="Actions text-xl pr-[2px] hover:scale-110" class:ActionsEdit="{true}"><i>&#10000;</i></button>
  <button tabIndex="0" title="Показать все отзывы. Жми..." on:click={() => [onAction(['Показать все отзывы.', 'info']), $modal[idx] = true]} class="Actions flex items-center text-xl hover:scale-110" class:ActionsInfo="{true}"><i class="">i</i></button>      
</div>

<script lang="ts">
  import { mdiBasket } from '@mdi/js';
  import { modalDialog as modal} from '../../stores/app';
  
  export let onAction = (val: string[]) => {};
  export let idx: number;
</script>

<style lang="postcss">
  .Actions {
    @apply rounded-[50%] border-[2px] border-solid border-black text-black inline-block font-bold 
    duration-100 transition-transform;
  }

  .ActionsInfo {
    @apply border-blue-400 text-blue-400 h-7 w-7 text-center pr-[2px];
  }

  .ActionsEdit {
    @apply border-lime-500 text-lime-500 h-7 w-7 mr-1;
  }

  .ActionsOrder {
    @apply border-[#ab5252] text-[#ab5252] mr-1;
  }
</style>