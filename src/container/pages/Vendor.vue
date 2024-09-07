<template>
    <div class="vendorPage">
        <div class="container">
            <h4 class="py-4 m-0" style="font-weight: bold;">VENDOR MANAGEMENT</h4>
            <div class="row">
                <div class="col-12">
                    <div class="filterForm">
                        <div class="card">
                            <div class="card-title p-3 m-0 d-flex justify-content-between align-items-center">
                                <h5 class="m-0">Filter</h5>
                                <button class="btn btn-outline-secondary" @click="toggleFilter()">
                                    <i class="fa-solid fa-filter"></i> {{ showFilter ? 'Hide' : 'Show' }} Filter
                                </button>
                            </div>
                            <div class="card-body pt-0" v-if="showFilter">
                                <form @submit.prevent="filterVendors">
                                    <div class="row">
                                        <div class="col-lg-4 mt-2">
                                            <label class="form-label">Vendor Name</label>
                                            <input type="text" v-model="filters.vendorName" class="form-control">
                                        </div>
                                        <div class="col-lg-4 mt-2">
                                            <label class="form-label">Nick Name</label>
                                            <input type="text" v-model="filters.nickName" class="form-control">
                                        </div>
                                        <div class="col-lg-4 mt-2">
                                            <label class="form-label">Phone No</label>
                                            <input type="number" v-model="filters.phoneNo" class="form-control">
                                        </div>
                                        <div class="col-lg-4 mt-2">
                                            <label class="form-label">Mail</label>
                                            <input type="text" v-model="filters.email" class="form-control">
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary mt-3 me-2 px-3">Search</button>
                                    <button type="button" class="btn btn-secondary mt-3 px-3" @click="resetFilters">Reset</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="table mt-3">
                        <div class="card px-3">
                            <div class="card-title py-3 d-flex justify-content-between align-items-center">
                                <h5 class="m-0 p-0">Vendor List</h5>
                                <button class="btn btn-primary" @click="openEditModal('add')">Add Vendor</button>
                            </div>
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-hover">
                                        <thead class="table-light">
                                            <tr>
                                                <th>#</th>
                                                <th @click="sortTable('vendorName')" style="cursor: pointer;">
                                                    Vendor Name
                                                    <i :class="getSortIcon('vendorName')" class="ms-2"></i>
                                                </th>
                                                <th @click="sortTable('nickName')" style="cursor: pointer;">
                                                    Nick Name
                                                    <i :class="getSortIcon('nickName')" class="ms-2"></i>
                                                </th>
                                                <th @click="sortTable('phoneNo')" style="cursor: pointer;">
                                                    Phone No
                                                    <i :class="getSortIcon('phoneNo')" class="ms-2"></i>
                                                </th>
                                                <th @click="sortTable('email')" style="cursor: pointer;">
                                                    Mail
                                                    <i :class="getSortIcon('email')" class="ms-2"></i>
                                                </th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(vendor, index) in sortedFilteredVendors" :key="vendor.id">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ vendor.vendorName }}</td>
                                                <td>{{ vendor.nickName }}</td>
                                                <td>{{ vendor.phoneNo }}</td>
                                                <td>{{ vendor.email }}</td>
                                                <td>
                                                    <button class="btn btn-sm btn-warning me-2" @click="openEditModal(vendor)">Edit</button>
                                                    <button class="btn btn-sm btn-danger" @click="deleteVendor(vendor)">Delete</button>
                                                </td>
                                            </tr>
                                            <tr v-if="sortedFilteredVendors.length==0"><td colspan="8" style="text-align: center;">No data available</td></tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Vendor Modal -->
        <div class="modal fade" id="editVendorModal" tabindex="-1" aria-labelledby="editVendorModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editVendorModalLabel">{{ ifAdd ? 'Add Vendor' : 'Edit Vendor' }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveVendor">
                            <div class="mb-3">
                                <label for="vendorName" class="form-label">Vendor Name</label>
                                <input type="text" class="form-control" id="vendorName" v-model="selectedVendor.vendorName" required>
                            </div>
                            <div class="mb-3">
                                <label for="nickName" class="form-label">Nick Name</label>
                                <input type="text" class="form-control" id="nickName" v-model="selectedVendor.nickName" required>
                            </div>
                            <div class="mb-3">
                                <label for="phoneNo" class="form-label">Phone No</label>
                                <input type="text" class="form-control" id="phoneNo" v-model="selectedVendor.phoneNo" required>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" v-model="selectedVendor.email" required>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Vendor Modal -->
        <div class="modal fade" id="deleteVendorModal" tabindex="-1" aria-labelledby="deleteVendorModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteVendorModalLabel">Delete Vendor</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete this vendor {{ '(' + selectedVendor.vendorName + ')' }}</p>
                        <button type="button" class="btn btn-success me-2" @click="confirmDeleteVendor()">Yes</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">No</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { Modal } from 'bootstrap';
import { toast } from 'vue3-toastify';

export default {
    name: 'VendorPage',
    setup() {
        const vendors = ref([
            {
                id: 1,
                vendorName: 'Vendor A',
                nickName: 'V-A',
                phoneNo: '123-456-7890',
                email: 'vendorA@example.com',
            },
            {
                id: 2,
                vendorName: 'Vendor B',
                nickName: 'V-B',
                phoneNo: '234-567-8901',
                email: 'vendorB@example.com',
            },
            {
                id: 3,
                vendorName: 'Vendor C',
                nickName: 'V-C',
                phoneNo: '345-678-9012',
                email: 'vendorC@example.com',
            }
        ]);

        const filters = ref({
            vendorName: '',
            nickName: '',
            phoneNo: '',
            email: '',
        });

        const filteredVendors = ref([...vendors.value]); // Initialize with all vendors

        const selectedVendor = ref({
            id: null,
            vendorName: '',
            nickName: '',
            phoneNo: '',
            email: '',
        });

        const editVendorModal = ref(null);
        const deleteVendorModal = ref(null);
        const showFilter = ref(true);
        const sortKey = ref('');
        const sortOrder = ref('asc');
        const ifAdd = ref(false);

        const sortTable = (key) => {
            if (sortKey.value === key) {
                sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
            } else {
                sortKey.value = key;
                sortOrder.value = 'asc';
            }
        };

        const getSortIcon = (key) => {
            if (sortKey.value === key) {
                return sortOrder.value === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down';
            }
            return 'fa fa-sort';
        };

        const toggleFilter = () => {
            showFilter.value = !showFilter.value;
        };

        const filterVendors = () => {
            filteredVendors.value = vendors.value.filter(vendor => {
                return (
                    (!filters.value.vendorName || vendor.vendorName.toLowerCase().includes(filters.value.vendorName.toLowerCase())) &&
                    (!filters.value.nickName || vendor.nickName.toLowerCase().includes(filters.value.nickName.toLowerCase())) &&
                    (!filters.value.phoneNo || vendor.phoneNo.includes(filters.value.phoneNo)) &&
                    (!filters.value.email || vendor.email.toLowerCase().includes(filters.value.email.toLowerCase()))
                );
            });
        };

        const resetFilters = () => {
            filters.value = {
                vendorName: '',
                nickName: '',
                phoneNo: '',
                email: '',
            };
            filteredVendors.value = [...vendors.value]; // Reset filtered list to include all vendors
        };

        const sortedFilteredVendors = computed(() => {
            return filteredVendors.value.slice().sort((a, b) => {
                if (sortKey.value) {
                    let compare = 0;
                    if (a[sortKey.value] < b[sortKey.value]) {
                        compare = -1;
                    } else if (a[sortKey.value] > b[sortKey.value]) {
                        compare = 1;
                    }
                    return sortOrder.value === 'asc' ? compare : -compare;
                } else {
                    return 0;
                }
            });
        });

        const openEditModal = (vendor) => {
            if (vendor === 'add') {
                ifAdd.value = true;
                selectedVendor.value = {
                    id: null,
                    vendorName: '',
                    nickName: '',
                    phoneNo: '',
                    email: '',
                };
            } else {
                ifAdd.value = false;
                selectedVendor.value = { ...vendor };
            }
            editVendorModal.value = new Modal(document.getElementById('editVendorModal'));
            editVendorModal.value.show();
        };

        const saveVendor = () => {
            if (ifAdd.value) {
                selectedVendor.value.id = vendors.value.length + 1;
                vendors.value.push({ ...selectedVendor.value });
                toast.success('Vendor added successfully!');
                filteredVendors.value = [...vendors.value];
            } else {
                const index = vendors.value.findIndex(v => v.id === selectedVendor.value.id);
                if (index !== -1) {
                    vendors.value.splice(index, 1, { ...selectedVendor.value });
                    toast.success('Vendor updated successfully!');
                }
                filteredVendors.value = [...vendors.value];
            }
            editVendorModal.value.hide();
        };

        const deleteVendor = (vendor) => {
            selectedVendor.value = { ...vendor };
            deleteVendorModal.value = new Modal(document.getElementById('deleteVendorModal'));
            deleteVendorModal.value.show();
        };

        const confirmDeleteVendor = () => {
            filteredVendors.value = filteredVendors.value.filter(v => v.id !== selectedVendor.value.id);
            toast.success('Vendor deleted successfully!');
            deleteVendorModal.value.hide();
        };

        return {
            vendors,
            filters,
            selectedVendor,
            showFilter,
            sortedFilteredVendors,
            toggleFilter,
            filterVendors,
            resetFilters,
            sortTable,
            getSortIcon,
            openEditModal,
            saveVendor,
            deleteVendor,
            confirmDeleteVendor,
        };
    },
};
</script>

<style scoped>
.table-responsive {
    max-height: 400px;
    overflow-y: auto;
}
</style>
