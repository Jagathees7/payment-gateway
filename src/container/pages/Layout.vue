<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 p-0">
                <HeaderSection></HeaderSection>
            </div>
            <div class="col-12 p-0">
                <div class="d-flex h-100 blowHeader">
                    <div class="layoutSide h-100" :class="store.sideMenuShow ? 'active' : ''">
                        <SideBar></SideBar>
                    </div>
                    <div class="layoutMain" :class="store.sideMenuShow ? 'active' : ''">
                        <router-view></router-view>
                        <footer class="footer">
                            <FooterSection />
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderSection from '@/container/pages/common/headerSection.vue'
import SideBar from '@/container/pages/common/sideBar.vue'
import FooterSection from '@/container/pages/common/FooterSection.vue'
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
        SideBar,
        FooterSection
    }
}
</script>