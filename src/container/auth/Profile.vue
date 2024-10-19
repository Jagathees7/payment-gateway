<template>
    <div class="login container">
        <div class="row">
            <div class="col-lg-6 my-auto">
                <div class="card" style="z-index: 10;">
                    <div class="card-body">
                        <h1 class="mb-4">My Profile!</h1>
                        <form @submit.prevent="onSubmit">
                            <label class="form-label">Name <span class="text-danger">*</span></label>
                            <Field name="name" :rules="nameRules" v-slot="{ field, errors }">
                                <input type="text" v-bind="field" class="form-control" placeholder="Enter Name...">
                                <p class="text-danger mb-2">{{ errors[0] }}</p>
                            </Field>
                            <label class="form-label">Nick Name <span class="text-danger">*</span></label>
                            <Field name="nickName" :rules="nickNameRules" v-slot="{ field, errors }">
                                <input type="text" v-bind="field" class="form-control" placeholder="Enter Nick Name...">
                                <p class="text-danger mb-2">{{ errors[0] }}</p>
                            </Field>
                            <label class="form-label">Mobile No  <span class="text-danger">*</span></label>
                            <Field name="mobileNo" :rules="mobileNoRules" v-slot="{ field, errors }">
                                <input type="number" v-bind="field" class="form-control mb-2" placeholder="Enter Mobile No...">
                                <p class="text-danger mb-2">{{ errors[0] }}</p>
                            </Field>
                            <label class="form-label">Mail ID  <span class="text-danger">*</span></label>
                            <Field name="mailId" :rules="mailIdRules" v-slot="{ field, errors }">
                                <input type="email" v-bind="field" class="form-control mb-2" placeholder="Enter Mail ID...">
                                <p class="text-danger mb-2">{{ errors[0] }}</p>
                            </Field>
                            <button type="submit" class="btn btn-primary w-100 mt-3">Save</button>
                            <button type="button" @click="navigateTo('/')" class="btn btn-secondary w-100 mt-2">Back To Home</button>
                        </form>
                    </div>
                </div>
                
            </div>
            <div class="col-lg-6 my-auto">
                <div class="img">
                    <img src="../../assets/images/Profile data-rafiki.png" class="img-fluid" alt="Login Image">
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
    name: 'ProfilePage',
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
            toast.success('Profile updated successfully!', {
                autoClose: 3000,
                position: 'top-right'
            });
        };
        const navigateTo = (route) => {
            router.push(route);
        }
        
        const nameRules = yup.string().required('Name is required');
        const nickNameRules = yup.string().required('Nick Name is required');
        const mobileNoRules = yup.string().required('Mobile No is required').matches(/^[0-9]+$/, 'Mobile No must be digits only').min(10, 'Mobile No must be at least 10 digits');
        const mailIdRules = yup.string().required('Mail ID is required').email('Mail ID must be a valid email');

        const defaultValues = {
            name: 'Jagatheeswaran',
            nickName: 'Jaga',
            mobileNo: '9876543210',
            mailId: 'jk@gmail.com'
        };

        const { handleSubmit, resetForm } = useForm({
            validationSchema: yup.object({
                name: nameRules,
                nickName: nickNameRules,
                mobileNo: mobileNoRules,
                mailId: mailIdRules,
            }),
            initialValues: defaultValues, // Set default values here
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
            nameRules,
            nickNameRules,
            mobileNoRules,
            mailIdRules,
            onSubmit,
        }
    },
    components: {
        Field,
    },
}
</script>
