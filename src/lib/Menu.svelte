<div class="flex justify-between items-center px-2 lg:px-[70px] py-1">
    <!-- Mobile hamburger -->
    <button
      id="nav-mobile-hamburger"
      class="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
      on:click={toggleSideMenu}
      aria-label="Menu"
    >
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <div class="hidden md:block">
      <nav>
        <ul class="flex items-start list-none">
          {#each menu.menuList as items, id}
            <li>
              <div class="dropdown">                
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label tabindex="0">
                  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                  <a class:active="{$page.url.pathname === items.path || ($page.url.pathname === `${items.path}/baskets` && id === 2) || ($page.url.pathname === `${items.path}/bouquets` && id === 2)}" 
                    class="block mr-8 cursor-pointer focus:no-underline" sveltekit:prefetch href={!items.submenu ? items.path : null}>      
                  <i class="-top-[6px] text-[15px] leading-[18px] font-[500] not-italic text-gray-600 hover:text-opacity-70 focus:no-underline">{ items.name }</i>
                  </a>
                </label>
                <ul tabindex="0" class="dropdown-content menu mt-1 p-2 w-52 rounded-b-md bg-white" class:submenu="{items.submenu && id === 2}">            
                  {#if items.submenu}                
                    {#each Object.entries(items.submenu) as item, idx}
                      <li>
                        <a class="cursor-pointer focus:no-underline" href="{items.path}{item[1]}" on:click="{() => pathName = item[1]}">                     
                          <i class="text-xs leading-none font-normal not-italic" class:sub_active="{$page.url.pathname === `${items.path}${item[1]}`}">{item[0]}</i>
                        </a>
                      </li>
                    {/each}                 
                  {/if}
                </ul>
              </div>  
            </li>
          {/each}
        </ul>
      </nav>
    </div>
    
    <div class=" grid grid-cols-2 gap-4">
      <a href="https://t.me/+4F_rxQUqmIs0MGEy"tabIndex="0" title='"Телеграм". Жми...' class="cursor-pointer hover:scale-110">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="url(#paint0_linear)"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0667 23.3334C12.5483 23.3334 12.6364 23.1376 12.4576 22.6441L10.9333 17.6275L22.6667 10.6667" fill="#C8DAEA"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0667 23.3333C13.4667 23.3333 13.6434 23.1504 13.8667 22.9333L16 20.8589L13.3389 19.2543" fill="#A9C9DD"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3386 19.2547L19.7866 24.0185C20.5224 24.4245 21.0535 24.2143 21.2368 23.3354L23.8614 10.967C24.1301 9.88963 23.4507 9.40099 22.7468 9.72056L7.33484 15.6634C6.28283 16.0853 6.28896 16.6722 7.14308 16.9338L11.0981 18.1682L20.2545 12.3915C20.6868 12.1294 21.0835 12.2703 20.7579 12.5593" fill="url(#paint1_linear)"/>
          <defs>
          <linearGradient id="paint0_linear" x1="12.0016" y1="1.3344" x2="4.0016" y2="20" gradientUnits="userSpaceOnUse">
          <stop stop-color="#37AEE2"/>
          <stop offset="1" stop-color="#1E96C8"/>
          </linearGradient>
          <linearGradient id="paint1_linear" x1="13.997" y1="16.9828" x2="15.7066" y2="22.5128" gradientUnits="userSpaceOnUse">
          <stop stop-color="#EFF7FC"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          </defs>
        </svg>
      </a>
      <a href="https://vk.com/delovkusa_aksay"tabIndex="0" title='"В контакте". Жми...' class="cursor-pointer hover:scale-110">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#4D74A0"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8369 21.2507C16.8369 21.2507 17.1449 21.2171 17.3026 21.0508C17.4471 20.8984 17.442 20.6108 17.442 20.6108C17.442 20.6108 17.4228 19.2678 18.0581 19.0696C18.6841 18.8746 19.488 20.3683 20.3411 20.9426C20.9855 21.3769 21.4746 21.2819 21.4746 21.2819L23.7543 21.2507C23.7543 21.2507 24.9463 21.1786 24.3812 20.2585C24.3344 20.1831 24.0514 19.5776 22.6867 18.3338C21.2568 17.0318 21.4488 17.2424 23.17 14.9899C24.2184 13.6183 24.6374 12.7809 24.5064 12.4228C24.382 12.0803 23.6107 12.1713 23.6107 12.1713L21.0447 12.1869C21.0447 12.1869 20.8544 12.1615 20.7134 12.2442C20.5756 12.3253 20.4863 12.5146 20.4863 12.5146C20.4863 12.5146 20.0806 13.5757 19.5389 14.4786C18.3961 16.3829 17.9395 16.4836 17.7526 16.3656C17.3177 16.0895 17.4262 15.2579 17.4262 14.6671C17.4262 12.8211 17.7117 12.0517 16.8711 11.8526C16.5923 11.7862 16.3869 11.7428 15.6732 11.7354C14.7575 11.7264 13.9829 11.7387 13.5438 11.9492C13.2517 12.0894 13.0263 12.4024 13.164 12.4204C13.3335 12.4425 13.7175 12.522 13.9211 12.794C14.1841 13.1455 14.1749 13.9338 14.1749 13.9338C14.1749 13.9338 14.326 16.1067 13.8218 16.3763C13.4762 16.5615 13.0021 16.1837 11.9829 14.4557C11.4612 13.5708 11.0672 12.5924 11.0672 12.5924C11.0672 12.5924 10.9912 12.4097 10.8552 12.3114C10.6907 12.1926 10.4612 12.1557 10.4612 12.1557L8.02293 12.1713C8.02293 12.1713 7.65649 12.1811 7.52209 12.3376C7.40273 12.4761 7.51291 12.7637 7.51291 12.7637C7.51291 12.7637 9.42194 17.1481 11.5839 19.358C13.5664 21.3835 15.8168 21.2507 15.8168 21.2507H16.8369Z" fill="white"/>
        </svg>
      </a>
    </div>
  </div>
  
  
  <script lang="ts">
    import { page } from '$app/stores';
    import {
      toggleSideMenu,
    } from '../stores/menus'
    import menu from '$lib/local/ru-RU';
  
    let pathName = '';
  
    $: console.log('Текущий путь: ', $page.url.pathname);
    $: console.log('Текущий индекс: ', pathName);    
  </script>
    
  <style>
    .active {
      @apply shadow-menuShadow h-9;
    }
    .sub_active {
      @apply text-blue-600;
    }
    .submenu {
      @apply shadow-menu;
    }
  </style>