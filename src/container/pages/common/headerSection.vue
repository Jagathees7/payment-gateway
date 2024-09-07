<template>
    <div class="header">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="left">
                            <img src="../../../assets/images/companyLogoOnly.png" class="companyLogoOnly" alt="Company logo">
                            <img src="../../../assets/images/companyLogo.png" class="companyLogo" alt="Company logo">
                            <i class="fa-solid fa-bars fa-xl" @click="toggleSideBar()" style="color: #000000; padding-left: 20px; cursor: pointer;"></i>
                        </div>
                        <div class="right d-flex align-items-center"  data-bs-toggle="dropdown" aria-expanded="false">
                            <div class="profile">
                                <i class="fa-regular fa-user fa-lg" style="color: #e5e5e5;"></i>
                            </div>
                            <div class="dropdown px-2 pt-0">
                                <p class="m-0 dropdown-toggle nickName">
                                    Jagatheeswaran <br>
                                    <span class="text-muted" style="font-size: 16px;">{{profileData.role||'Admin'}}</span>
                                </p>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-user px-2" style="color: #000000;"></i>My Profile</a></li>
                                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-lock px-2" style="color: #000000;"></i>Change Password</a></li>
                                    <li @click="logout()"><a class="dropdown-item" href="#"><i class="fa-solid fa-arrow-right-from-bracket px-2" style="color: #000000;"></i>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { allData } from '@/store/index';
import { useRouter } from 'vue-router'
export default {
    name: "HeaderSection",
    setup() {
        const store = allData()
        const profileData = ref(store.profileData)
        const router = useRouter()
        // console.log('jkhead', profileData.value)
        const toggleSideBar = () => {
            store.toggleSideBar()
        }
        const logout = () => {
            router.push('/login')
        }

        return {
            logout,
            store,
            toggleSideBar,
            profileData
        }
    }
}
</script>