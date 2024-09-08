<template>
    <div class="login container">
        <div class="row">
            <div class="col-lg-6 my-auto">
                <div class="img">
                    <img src="../../assets/images/Reset password-cuate.png" class="img-fluid" alt="Login Image">
                </div>
            </div>
            <div class="col-lg-6 my-auto">
                <div class="card" style="z-index: 10;">
                    <div class="card-body">
                        <h1 class="mb-4">Change password!</h1>
                        <form @submit.prevent="onSubmit">
                            <label class="form-label">Enter Old Password <span class="text-danger">*</span></label>
                            <Field name="oldPassword" :rules="oldPasswordRules" v-slot="{ field, errors }">
                                <input type="text" v-bind="field" class="form-control" placeholder="Enter Old Password...">
                                <p class="text-danger mb-2">{{ errors[0] }}</p>
                            </Field>
                            <label class="form-label">Enter new password  <span class="text-danger">*</span></label>
                            <Field name="newPassword" :rules="newPasswordRules" v-slot="{ field, errors }">
                                <input type="password" v-bind="field" class="form-control mb-2" placeholder="Enter your new password...">
                                <p class="text-danger mb-2">{{ errors[0] }}</p>
                            </Field>
                            <label class="form-label">Re-enter Password  <span class="text-danger">*</span></label>
                            <Field name="reNewPassword" :rules="reNewPasswordRules" v-slot="{ field, errors }">
                                <input type="password" v-bind="field" class="form-control mb-2" placeholder="Re-enter your password...">
                                <p class="text-danger mb-2">{{ errors[0] }}</p>
                            </Field>
                            <button type="submit" class="btn btn-primary w-100 mt-3">Change Password</button>
                            <button type="button" @click="navigateTo('/')" class="btn btn-secondary w-100 mt-2">Back To Home</button>
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
    name: 'ChangePasswordPage',
    setup() {
        
        const router = useRouter();
        const store = allData()
        const users = ref([])
        console.log('jk', store.users, users)
        const notify = (value) => {
            if(value){
                toast.error(value, {
                    autoClose: 3000,
                    position: 'top-right'
                });
                return
            }
            toast.success('Password successfully changed!', {
                autoClose: 3000,
                position: 'top-right'
            });
        };
        const navigateTo = (route) => {
            router.push(route);
        }
        
        const oldPasswordRules = yup.string().required('Old password is required').min(4, 'Old must be at least 4 characters');
        const newPasswordRules = yup.string().required('New password is required').min(4, 'Password must be at least 4 characters');
        const reNewPasswordRules = yup.string().required('Re-New password is required').oneOf([yup.ref('newPassword'), null], 'Passwords must match');
        const schema = yup.object().shape({
            oldPassword: oldPasswordRules,
            newPassword: newPasswordRules,
            reNewPassword: reNewPasswordRules,
        });
        const { handleSubmit, resetForm } = useForm({
            validationSchema: schema,
        });
        const onSubmit = handleSubmit((values) => {
            if(values){
                notify()
                setTimeout(() => {
                    resetForm();
                }, 1000);
                console.log('jk Form Submitted:', values);
            }
        });

        return {
            allUsers: store.users,
            notify,
            navigateTo,
            oldPasswordRules,
            newPasswordRules,
            reNewPasswordRules,
            onSubmit,
        }
    },
    components: {
        Field,
    },
}
</script>
