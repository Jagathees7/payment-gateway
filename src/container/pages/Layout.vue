<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 p-0">
                <HeaderSection></HeaderSection>
            </div>
            <!-- <div class="col-lg-2 p-0" v-if="store.sideMenuShow">
                <SideBar></SideBar>
            </div>
            <div class="p-0"  :class="store.sideMenuShow ? 'col-lg-10' : 'col-lg-12'">
                <router-view></router-view>
            </div> -->
            <div class="col-12 p-0">
                <div class="d-flex h-100">
                    <div class="layoutSide h-100" :class="store.sideMenuShow ? 'active' : ''">
                        <SideBar></SideBar>
                    </div>
                    <div class="layoutMain" :class="store.sideMenuShow ? 'active' : ''">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderSection from '@/container/pages/common/headerSection.vue'
import SideBar from '@/container/pages/common/sideBar.vue'
import { allData } from '@/store/index';
export default {
    name: 'LayoutPage',
    setup() {
        const store = allData()

        return {
            store
        }
    },
    components: {
        HeaderSection,
        SideBar
    }
}
</script>