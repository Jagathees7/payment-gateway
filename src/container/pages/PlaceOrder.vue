<template>
    <div class="vendorPage">
        <div class="container">
            <h4 class="py-4 m-0" style="font-weight: bold;">PLACE ORDER</h4>
            <div class="row">
                <div class="col-12">
                    <div class="orderForm">
                        <div class="card">
                            <div class="card-title p-3 m-0">
                                <h5 class="m-0">Order Form</h5>
                            </div>
                            <div class="card-body pt-0">
                                <form @submit.prevent="placeOrder">
                                    <div class="row">
                                        <div class="col-lg-4 mt-2">
                                            <label class="form-label">Receiver Name <span class="text-danger">*</span></label>
                                            <Field name="receiverName" :rules="receiverNameRules" v-slot="{ field, errors }">
                                                <input type="text" v-bind="field" class="form-control mb-3" placeholder="Enter Receiver">
                                                <p class="text-danger">{{ errors[0] }}</p>
                                            </Field>
                                        </div>
                                        <div class="col-lg-4 mt-2">
                                            <label class="form-label">Account No <span class="text-danger">*</span></label>
                                            <Field name="accountNo" :rules="accountNoRules" v-slot="{ field, errors }">
                                                <input type="number" class="form-control" v-bind="field" placeholder="Enter Account No">
                                                <p class="text-danger">{{ errors[0] }}</p>
                                            </Field>
                                        </div>
                                        <div class="col-lg-4 mt-2">
                                            <label class="form-label">IFSC Code <span class="text-danger">*</span></label>
                                            <Field name="ifscCode" :rules="ifscCodeRules" v-slot="{ field, errors }">
                                                <input type="text" class="form-control" v-bind="field" placeholder="Enter IFSC Code">
                                                <p class="text-danger">{{ errors[0] }}</p>
                                            </Field>
                                        </div>
                                        <div class="col-lg-4 mt-2">
                                            <label class="form-label">Amount <span class="text-danger">*</span></label>
                                            <Field name="amount" :rules="amountRules" v-slot="{ field, errors }">
                                                <input type="number" class="form-control" v-bind="field" placeholder="Enter Amount">
                                                <p class="text-danger">{{ errors[0] }}</p>
                                            </Field>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary mt-3">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { allData } from '@/store/index';
import { toast } from 'vue3-toastify';
import { useForm, Field } from 'vee-validate';
import * as yup from 'yup';
export default {
    name: "PlaceOrder",
    setup() {
        const orderForm = ref({
            receiverName: '',
            accountNo: '',
            ifscCode: '',
            amount: ''
        })
        const store = allData()
        const users = ref(store.users)
        const { handleSubmit, resetForm } = useForm();

         // Define validation rules using Yup
        const receiverNameRules = yup.string().required('Receiver Name is required');
        const accountNoRules = yup.string().required('Account No is required');
        const ifscCodeRules = yup.string().required('IFSC Code is required');
        const amountRules = yup.string().required('Amount is required');

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
        const placeOrder = handleSubmit((values) => {
            store.addTransaction(values);
            notify('Oreder Placed Successfully!', 'success');
            setTimeout(() => {
                resetForm();
            }, 1000);
            console.log(values)
        })

        return{
            orderForm,
            placeOrder,
            users,
            notify,
            handleSubmit,
            receiverNameRules,
            accountNoRules,
            ifscCodeRules,
            amountRules
        }
    },
    components: {
        Field,
    },
}
</script>