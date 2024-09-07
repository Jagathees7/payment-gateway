<template>
    <div class="sideBar">
        <ul class="menuList">
          <li class="active" @click="navigateTo('/')"><i class="fa-solid fa-house me-1"></i> Dashboard</li>
          <li>
            <!-- <p class="d-inline-flex"> -->
              <a class="" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                <i class="fa-solid fa-bars-progress me-1"></i> Managements <i class="fa-solid fa-angle-down"></i>
              </a>
            <!-- </p> -->
            <div class="collapse" id="collapseExample">
            <ul>
                <li @click="navigateTo('/vendor')" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Vendor management</li>
                <li @click="navigateTo('/staff')" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Staff management</li>
            </ul>
            </div>
          </li>
          <li @click="navigateTo('/transactions')"><i class="fa-solid fa-wallet me-1"></i> Transactions</li>
          <li @click="navigateTo('/order')"><i class="fa-solid fa-money-check-dollar me-1"></i> Place Order</li>
        </ul>
    </div>
</template>

<script>
import { allData } from '@/store/index';
import { useRouter } from 'vue-router';
export default {
    name: "SideBar",
    setup() {
      const store = allData();
      const router = useRouter();

      const navigateTo = (route) => {
          // const routeExists = router.getRoutes().some(r => r.path === route);
              router.push(route);
              // return
          // if (routeExists) {
          // } else {
          //     // Handle the non-existent route case
          //     console.warn(`Route "${route}" does not exist.`);
          //     router.push('/404'); // Redirect to a 404 page or any other fallback route
          // }
        }

      return {
        store,
        navigateTo
      }
    }
}
</script>