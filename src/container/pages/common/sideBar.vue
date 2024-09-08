<template>
    <div class="sideBar">
        <ul class="menuList">
          <li :class="currentPath == '/' || currentPath == ''  ? 'active' : ''" @click="navigateTo('/')"><i class="fa-solid fa-house me-1"></i> Dashboard</li>
          <li :class="currentPath == '/vendor' || currentPath == '/staff' ? 'active' : ''" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            <!-- <p class="d-inline-flex"> -->
              <a href="javascript:;">
                <i class="fa-solid fa-bars-progress me-1"></i> Managements <i class="fa-solid fa-angle-down"></i>
              </a>
            <!-- </p> -->
            <div class="collapse" id="collapseExample">
            <ul class="mt-2">
                <li :class="currentPath == '/vendor' ? 'active' : ''" @click="navigateTo('/vendor')" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Vendor management</li>
                <li :class="currentPath == '/staff' ? 'active' : ''" @click="navigateTo('/staff')" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Staff management</li>
            </ul>
            </div>
          </li>
          <li :class="currentPath == '/transactions' ? 'active' : ''" @click="navigateTo('/transactions')"><i class="fa-solid fa-wallet me-1"></i> Transactions</li>
          <li :class="currentPath == '/order' ? 'active' : ''" @click="navigateTo('/order')"><i class="fa-solid fa-money-check-dollar me-1"></i> Place Order</li>
        </ul>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { allData } from '@/store/index';
import { useRouter, useRoute } from 'vue-router';
export default {
    name: "SideBar",
    setup() {
      const store = allData();
      const router = useRouter();
      const route = useRoute();
      const currentPath = ref('');
      onMounted(() => {
        currentPath.value = route.path;
      });
      const checkIsMobile = () => {
        return window.innerWidth <= 992;
      };
      const navigateTo = (route) => {
          if(checkIsMobile()){
            store.toggleSideBar()
          }
          currentPath.value = route;
          router.push(route);
        }

      return {
        store,
        navigateTo,
        currentPath,
        route,
        checkIsMobile
      }
    }
}
</script>