<template>
  <footer class="footer" :class="{'footer--dark': dark}">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 mb-3 mb-lg-0">
          <a class="footer__logo" href="#">
            <img :src="require(dark ? '~/assets/img/carcity-logo-white.png' : '~/assets/img/carcity-logo.png')" width="124" height="38" alt="">
          </a>
          <a class="footer__phone" href="tel:+77273191300">
            <svg width="15" height="15" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 13.42V16.956C18.0001 17.2092 17.9042 17.453 17.7316 17.6382C17.559 17.8234 17.3226 17.9363 17.07 17.954C16.633 17.984 16.276 18 16 18C7.163 18 0 10.837 0 2C0 1.724 0.015 1.367 0.046 0.93C0.0637224 0.677444 0.176581 0.441011 0.361804 0.268409C0.547026 0.0958068 0.790823 -0.000114433 1.044 2.56579e-07H4.58C4.70404 -0.000125334 4.8237 0.045859 4.91573 0.12902C5.00776 0.212182 5.0656 0.326583 5.078 0.45C5.101 0.68 5.122 0.863 5.142 1.002C5.34073 2.38892 5.748 3.73783 6.35 5.003C6.445 5.203 6.383 5.442 6.203 5.57L4.045 7.112C5.36445 10.1865 7.81455 12.6365 10.889 13.956L12.429 11.802C12.4919 11.714 12.5838 11.6509 12.6885 11.6237C12.7932 11.5964 12.9042 11.6068 13.002 11.653C14.267 12.2539 15.6156 12.6601 17.002 12.858C17.141 12.878 17.324 12.9 17.552 12.922C17.6752 12.9346 17.7894 12.9926 17.8724 13.0846C17.9553 13.1766 18.0012 13.2961 18.001 13.42H18Z"
                fill="currentColor"
              />
            </svg>
            +7 727 319 13 00
          </a>
        </div>

        <div class="w-100 d-lg-none" />

        <div class="col-lg-4 col-md-6">
          <ul class="footer__nav">
            <li>
              <NuxtLink class="footer__nav-link" :to="{ name: 'terms-of-use' }">
                Пользовательское соглашение
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="footer__nav-link" :to="{ name: 'privacy-policy' }">
                Политика конфеденциальности
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="footer__nav-link" :to="{ name: 'rules-shopping-center' }">
                Правила ТЦ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="footer__nav-link" :to="{ name: 'rules-ad' }">
                Правила размещения объявлений
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div v-if="$route.name === 'index'" class="col-lg-4 col-md-6">
          <ul class="footer__nav">
            <li>
              <NuxtLink class="footer__nav-link" :to="{ name: 'index', hash: '#about' }">
                О нас
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="footer__nav-link" :to="{ name: 'index', hash: '#infrastructure' }">
                Инфраструктура
              </NuxtLink>
            </li>
            <!--            <li>-->
            <!--              <NuxtLink class="footer__nav-link" :to="{ name: 'index', hash: '#plan' }>-->
            <!--                План помещений-->
            <!--              </NuxtLink>-->
            <!--            </li>-->
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  }
}
</script>
