<template>
    <div class="login container">
        <div class="row">
            <div class="col-lg-6 my-auto">
                <div class="img">
                    <img src="../../assets/login.png" class="img-fluid" alt="Login Image">
                </div>
            </div>
            <div class="col-lg-6 my-auto">
                <div class="card">
                    <div class="card-body">
                        <h1 class="mb-4">Hello, <br> Welcome back!</h1>
                        
                        <form @submit.prevent="onSubmit">
                            <label class="form-label">User Name  <span class="text-danger">*</span></label>
                            <Field name="userName" :rules="userNameRules" v-slot="{ field, errors }">
                                <input type="text" v-bind="field" class="form-control mb-3" placeholder="Enter your user name...">
                                <p class="text-danger">{{ errors[0] }}</p>
                            </Field>
                            <label class="form-label">Password  <span class="text-danger">*</span></label>
                            <Field name="password" :rules="passwordRules" v-slot="{ field, errors }">
                                <input type="password" v-bind="field" class="form-control mb-3" placeholder="Enter your password...">
                                <p class="text-danger">{{ errors[0] }}</p>
                            </Field>
                            <p class="forgetPassword" @click="navigateTo('/forgotPassword')">Forget password</p>
                            <button type="submit" class="btn btn-primary w-100">Login</button>
                        </form>
                        
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { allData } from '@/store/index';
import { toast } from 'vue3-toastify';
import { ref } from 'vue'
import { useForm, Field } from 'vee-validate';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
export default {
    name: 'LoginPage',
    setup() {
        const { handleSubmit } = useForm();
        const router = useRouter();
        const store = allData()
        const users = ref(store.users)
        console.log('jk', store)
        
        const notify = (msg, type) => {
            if(type == 'success'){
                toast.success(msg || 'Success!', {
                    autoClose: 3000,
                    position: 'top-right',
                });
            }
            else if(type == 'error'){
                toast.error(msg || 'Error!', {
                    autoClose: 3000,
                    position: 'top-right',
                });
            }
            
        };
        const navigateTo = (route) => {
            router.push(route);
        }
         // Define validation rules using Yup
        const userNameRules = yup.string().required('User Name is required')
        const passwordRules = yup.string().required('Password is required').min(4, 'Password must be at least 4 characters');

        const onSubmit = handleSubmit((values) => {
            if(values){
                let user = users.value.find(data => data.userName == values.userName && data.password == values.password);
                if(user){
                    notify('Authentication verified. Redirecting...!', 'success')
                    store.updateProfileData(user)
                    setTimeout(() => {
                        navigateTo('/')
                    }, 2000);
                }
                else{
                    notify('User name or password is incorrect!', 'error')
                }
                console.log('jk Form Submitted:', user);
            }
        });

        return {
            allUsers: store.users,
            notify,
            navigateTo,
            userNameRules,
            passwordRules,
            onSubmit,
        }
    },
    components: {
        Field,
    },
}
</script>

<style scoped>

</style>