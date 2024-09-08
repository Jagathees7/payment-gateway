<template>
    <div class="transactionHistory">
        <div class="container">
            <h4 class="py-4 m-0" style="font-weight: bold;">TRANSACTIONS</h4>
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
                                <form @submit.prevent="filterTransactions">
                                    <div class="row">
                                        <div class="col-lg-4 mt-2">
                                            <label class="form-label">Date {{filters.date}}</label>
                                            <input type="date" v-model="filters.date" class="form-control">
                                        </div>
                                        <div class="col-lg-4 mt-2">
                                            <label class="form-label">Transaction ID</label>
                                            <input type="number" v-model="filters.transactionId" class="form-control" placeholder="Enter Transaction ID">
                                        </div>
                                        <div class="col-lg-4 mt-2">
                                            <label class="form-label">Approved By</label>
                                            <input type="text" v-model="filters.approvedBy" class="form-control" placeholder="Enter Approved By">
                                        </div>
                                        <div class="col-lg-4 mt-2">
                                            <label class="form-label">Order By</label>
                                            <input type="text" v-model="filters.orderBy" class="form-control" placeholder="Enter Order By">
                                        </div>
                                        <div class="col-lg-4 mt-2">
                                            <label class="form-label">Amount</label>
                                            <input type="number" v-model="filters.amount" class="form-control" placeholder="Enter Amount">
                                        </div>
                                        <div class="col-lg-4 mt-2">
                                            <label class="form-label">Status</label>
                                            <select class="form-select"  v-model="filters.status">
                                                <option value="">select the status</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Inprogress">Inprogress</option>
                                                <option value="Cancelled">Cancelled</option>
                                                <option value="Partially Completed">Partially Completed</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-4 mt-2">
                                            <label class="form-label">Recevier Name</label>
                                            <input type="text" v-model="filters.receiverName" class="form-control" placeholder="Enter Recevier Name">
                                        </div>
                                        <div class="col-lg-4 mt-2">
                                            <label class="form-label">Account No</label>
                                            <input type="text" v-model="filters.accountNo" class="form-control" placeholder="Enter Account No">
                                        </div>
                                        <div class="col-lg-4 mt-2">
                                            <label class="form-label">IFSC Code</label>
                                            <input type="text" v-model="filters.ifscCode" class="form-control" placeholder="Enter IFSC Code">
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
                            <div class="card-title py-3">
                                <h5 class="m-0 p-0">Transactions List</h5>
                            </div>
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-hover">
                                        <thead class="table-light">
                                            <tr>
                                                <th>#</th>
                                                <th @click="sortTable('date')" style="cursor: pointer;">
                                                    Date
                                                    <i :class="getSortIcon('date')" class="ms-2"></i>
                                                </th>
                                                <th @click="sortTable('transactionId')" style="cursor: pointer;">
                                                    Transaction ID
                                                    <i :class="getSortIcon('transactionId')" class="ms-2"></i>
                                                </th>
                                                <th @click="sortTable('approvedBy')" style="cursor: pointer;">
                                                    Approved By
                                                    <i :class="getSortIcon('approvedBy')" class="ms-2"></i>
                                                </th>
                                                <th @click="sortTable('orderBy')" style="cursor: pointer;">
                                                    Order By
                                                    <i :class="getSortIcon('orderBy')" class="ms-2"></i>
                                                </th>
                                                <th @click="sortTable('amount')" style="cursor: pointer;">
                                                    Amount
                                                    <i :class="getSortIcon('amount')" class="ms-2"></i>
                                                </th>
                                                <th @click="sortTable('status')" style="cursor: pointer;">
                                                    Status
                                                    <i :class="getSortIcon('status')" class="ms-2"></i>
                                                </th>
                                                <th @click="sortTable('recevierName')" style="cursor: pointer;">
                                                    Recevier Name
                                                    <i :class="getSortIcon('amount')" class="ms-2"></i>
                                                </th>
                                                <th @click="sortTable('accountNo')" style="cursor: pointer;">
                                                    Account No
                                                    <i :class="getSortIcon('amount')" class="ms-2"></i>
                                                </th>
                                                <!-- <th @click="sortTable('ifscCode')" style="cursor: pointer;">
                                                    IFSC Code
                                                    <i :class="getSortIcon('amount')" class="ms-2"></i>
                                                </th> -->
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in sortedFilteredTransactions" :key="index">
                                                <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
                                                <td>{{ item.date }}</td>
                                                <td>{{ item.transactionId }}</td>
                                                <td>{{ item.approvedBy }} <br><span class="text-muted" style="font-size: 14px;">{{item.approvedRole}}</span></td>
                                                <td>{{ item.orderBy }}</td>
                                                <td>
                                                   <span v-if="item.partitalAmount"> {{ item.partitalAmount }} <br></span> 
                                                    <span :class="item.partitalAmount ? 'partial' : '' ">{{ item.amount }}</span>
                                                </td>
                                                <td :class="item.status">{{ item.status }}</td>
                                                <td>{{ item.recevierName }}</td>
                                                <td>{{ item.accountNo }}</td>
                                                <!-- <td>{{ item.ifscCode }}</td> -->
                                                <td style="text-align: center; cursor: pointer;" @click="openActionPopup(item)">
                                                    <i class="fa-solid fa-eye"></i>
                                                    <!-- <i class=  "fa-solid fa-eye-slash"></i> -->
                                                </td>
                                            </tr>
                                            <tr v-if="sortedFilteredTransactions.length==0"><td colspan="10" style="text-align: center;">No data available</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                                    <div class="d-flex justify-content-between align-items-center flex-wrap mt-3">
                                        <!-- Pagination Items -->
                                        <div class="pt-2">
                                            <button class="btn btn-primary btn-sm me-2" @click="prevPage" :disabled="currentPage === 1">Previous</button>

                                            <!-- Page numbers, dynamically generated -->
                                            <span v-for="page in pageNumbers" :key="page">
                                            <button
                                                class="btn btn-sm"
                                                :class="{ 'btn-primary': page === currentPage, 'btn-light': page !== currentPage }"
                                                @click="changePage(page)"
                                            >
                                                {{ page }}
                                            </button>
                                            </span>

                                            <button class="btn btn-primary btn-sm ms-2" @click="nextPage" :disabled="currentPage === totalPages">
                                            Next
                                            </button>
                                        </div>

                                        <!-- Items Per Page Dropdown -->
                                        <div class="pt-2 form-group d-flex align-items-center">
                                            <label for="itemsPerPage" class="me-2 mb-0">Show</label>
                                            <select v-model="itemsPerPage" id="itemsPerPage" class="form-select form-select-sm w-auto">
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            </select>
                                            <span class="ms-2">items per page</span>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- action popup -->
        <div class="modal fade" id="actionPopupModal" tabindex="-1" aria-labelledby="actionPopupModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="actionPopupModalLabel">Transaction Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <ul>
                            <li><strong>Date:</strong> {{ transactionDetail.date }}</li>
                            <li><strong>Transaction ID:</strong> {{ transactionDetail.transactionId }}</li>
                            <li><strong>Approved By:</strong> {{ transactionDetail.approvedBy }}</li>
                            <li><strong>Approved Role:</strong> {{ transactionDetail.approvedRole }}</li>
                            <li><strong>Ordered By:</strong> {{ transactionDetail.orderBy }}</li>
                            <li><strong>Amount:</strong> {{ transactionDetail.amount }}</li>
                            <li><strong>Status:</strong> {{ transactionDetail.status }}</li>
                            <li><strong>Receiver Name:</strong> {{ transactionDetail.recevierName }}</li>
                            <li><strong>Account No:</strong> {{ transactionDetail.accountNo }}</li>
                            <li><strong>IFSC Code:</strong> {{ transactionDetail.ifscCode }}</li>
                            <li v-if="transactionDetail.partitalAmount !== null">
                            <strong>Partial Amount:</strong> {{ transactionDetail.partitalAmount }}
                            </li>
                        </ul>
                        <h5>Action</h5>
                        <div class="form">
                            <div class="my-3">
                                <label class="form-label">Status</label>
                                <select class="form-select"  v-model="changeStatus">
                                    <option value="">select the status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Inprogress">Inprogress</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Partially Completed">Partially Completed</option>
                                </select>
                            </div>
                            <div class="my-3" v-if="changeStatus == 'Partially Completed' ">
                                <label class="form-label">Partial Amount</label>
                                <input type="number" class="form-control" v-model="partitalAmount">
                            </div>
                            <div class="my-3" v-if="changeStatus == 'Completed' ">
                                <label class="form-label">Transaction ID</label>
                                <input type="number" class="form-control" v-model="popupTransactionId">
                            </div>
                        </div>
                        <div class="d-grid gap-2">
                        <button type="button" class="btn btn-primary me-2" @click="saveTransaction(transactionDetail)">Save</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { Modal } from 'bootstrap';
import { allData } from '@/store/index';
import { toast } from 'vue3-toastify';
export default {
    name: 'TransactionsHistory',
    setup() {
        const showFilter = ref(true);
        // const transactionsList = ref([
        //     {
        //         id: 1,
        //         date: '2024-09-18',
        //         transactionId: '123678',
        //         approvedBy: 'Jagathees',
        //         approvedRole: 'Admin',
        //         orderBy: 'Dharani',
        //         amount: 100000,
        //         status: 'Completed',
        //         partitalAmount: null,
        //         recevierName: 'Lorem 2',
        //         accountNo: 'xxxx5678',
        //         ifscCode: 'iob34535'
        //     },
        //     {
        //         id: 2,
        //         date: '2024-09-27',
        //         transactionId: '-',
        //         approvedBy: '-',
        //         approvedRole: '',
        //         orderBy: 'Vendor 3',
        //         amount: 30000,
        //         status: 'Pending',
        //         partitalAmount: null,
        //         recevierName: 'Lorem 7',
        //         accountNo: 'xxxx8967',
        //         ifscCode: 'cnrb2345'
        //     },
        //     {
        //         id: 3,
        //         date: '2024-06-05',
        //         transactionId: '123456',
        //         approvedBy: 'Admin 1',
        //         approvedRole: 'Admin',
        //         orderBy: 'vendor 3',
        //         amount: 130000,
        //         status: 'Inprogress',
        //         partitalAmount: null,
        //         recevierName: 'Lorem 9',
        //         accountNo: 'xxxx8685',
        //         ifscCode: 'iob34535'
        //     },
        //     {
        //         id: 4,
        //         date: '2024-06-08',
        //         transactionId: '763421',
        //         approvedBy: 'Admin 4',
        //         approvedRole: 'Admin',
        //         orderBy: 'Vendor 3',
        //         amount: 340000,
        //         status: 'Inprogress',
        //         partitalAmount: null,
        //         recevierName: 'Lorem 2',
        //         accountNo: 'xxxx5678',
        //         ifscCode: 'iob34535'
        //     },
        //     {
        //         id: 5,
        //         date: '2024-06-05',
        //         transactionId: '536252',
        //         approvedBy: 'Staff 1',
        //         approvedRole: 'Staff',
        //         orderBy: 'Vendor 2',
        //         amount: 470000,
        //         status: 'Cancelled',
        //         partitalAmount: null,
        //         recevierName: 'Lorem 2',
        //         accountNo: 'xxxx5678',
        //         ifscCode: 'iob34535'
        //     },
        //     {
        //         id: 5,
        //         date: '2024-09-05',
        //         transactionId: '123678',
        //         approvedBy: 'Admin 3',
        //         approvedRole: 'Admin',
        //         orderBy: 'Vendor 5',
        //         amount: 800000,
        //         status: 'Partially completed',
        //         partitalAmount: 500000,
        //         recevierName: 'Lorem 2',
        //         accountNo: 'xxxx5678',
        //         ifscCode: 'iob34535'
        //     }
        // ]);
        const store = allData()
        const transactionsList = ref(store.transactionsList)
        const currentPage = ref(1);
        const itemsPerPage = ref(5);
        const filters = ref({
            date: '',
            transactionId: '',
            approvedBy: '',
            orderBy: '',
            amount: '',
            status: '',
            recevierName: '',
            accountNo: '',
            ifscCode: ''
        });
        const sortKey = ref('');
        const sortOrder = ref('asc');
        const filteredTransaction = ref([...transactionsList.value]);
        const totalPages = computed(() => Math.ceil(filteredTransaction.value.length / itemsPerPage.value));
        const actionPopupModal = ref(null);
        const transactionDetail = ref({})
        const changeStatus = ref('')
        const partitalAmount = ref('')
        const popupTransactionId = ref('')

        const openActionPopup = (transaction) => {
            transactionDetail.value = transaction;
            changeStatus.value = '';
            partitalAmount.value = '';
            popupTransactionId.value = '';
            actionPopupModal.value = new Modal(document.getElementById('actionPopupModal'));
            actionPopupModal.value.show();
        };

        const paginatedData = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage.value;
            const end = start + itemsPerPage.value;
            return transactionsList.value.slice(start, end);
        });

        const pageNumbers = computed(() => {
            const start = Math.max(1, currentPage.value - 2);
            const end = Math.min(totalPages.value, currentPage.value + 2);
            const pages = [];
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        });

        const changePage = (page) => {
            currentPage.value = page;
        };

        const prevPage = () => {
            if (currentPage.value > 1) currentPage.value--;
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) currentPage.value++;
        };

        watch(itemsPerPage, () => {
            currentPage.value = 1; // Reset to page 1 when itemsPerPage changes
        });

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

        const saveTransaction = (transactionDetail) => {
            filteredTransaction.value = transactionsList.value.map(item => {
                if(item.id == transactionDetail.id){
                    let temp = {
                        ...item, 
                        status: changeStatus.value ? changeStatus.value : item.status, 
                        partitalAmount: partitalAmount.value ? partitalAmount.value : item.partitalAmount,
                        transactionId: popupTransactionId.value ? popupTransactionId.value : item.partitalAmount
                        }
                    console.log('jkjk', temp)
                    return temp;
                }
                else{
                    return item;
                }
            })
            notify('Transaction updated successfully!', 'success')
            actionPopupModal.value.hide();
            // filteredTransaction.value = [...transactionsList.value]
        };

        const resetFilters = () => {
            filters.value = {
                date: '',
                transactionId: '',
                approvedBy: '',
                orderBy: '',
                amount: '',
                status: '',
                recevierName: '',
                accountNo: '',
                ifscCode: ''
            };
            filteredTransaction.value = [...transactionsList.value];
        };

        const getSortIcon = (key) => {
            if (sortKey.value === key) {
                return sortOrder.value === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down';
            }
            return 'fa fa-sort';
        };

        const sortTable = (key) => {
            if (sortKey.value === key) {
                sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
            } else {
                sortKey.value = key;
                sortOrder.value = 'asc';
            }
        };

        const sortedFilteredTransactions = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage.value;
            const end = start + itemsPerPage.value;
            // return transactionsList.value.slice(start, end);
            return filteredTransaction.value.slice(start, end).sort((a, b) => {
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

        const toggleFilter = () => {
            showFilter.value = !showFilter.value;
        };

        const filterTransactions = () => {
            filteredTransaction.value = transactionsList.value.filter(transaction => {
                return (
                    (!filters.value.date || transaction.date == filters.value.date) &&
                    (!filters.value.transactionId || transaction.transactionId.includes(filters.value.transactionId)) &&
                    (!filters.value.approvedBy || transaction.approvedBy.toLowerCase().includes(filters.value.approvedBy.toLowerCase())) &&
                    (!filters.value.orderBy || transaction.orderBy.toLowerCase().includes(filters.value.orderBy.toLowerCase())) &&
                    (!filters.value.amount || transaction.amount == filters.value.amount) &&
                    (!filters.value.status || transaction.status.toLowerCase() == filters.value.status.toLowerCase()) &&
                    (!filters.value.recevierName || transaction.recevierName.toLowerCase().includes(filters.value.recevierName.toLowerCase())) &&
                    (!filters.value.accountNo || transaction.accountNo.toLowerCase().includes(filters.value.accountNo.toLowerCase())) &&
                    (!filters.value.ifscCode || transaction.ifscCode.toLowerCase().includes(filters.value.ifscCode.toLowerCase()))
                );
            });
        };

        return {
            showFilter,
            toggleFilter,
            transactionsList,
            filterTransactions,
            filters,
            resetFilters,
            getSortIcon,
            sortTable,
            sortedFilteredTransactions,
            openActionPopup,
            saveTransaction,
            transactionDetail,
            changeStatus,
            partitalAmount,
            popupTransactionId,
            notify,
            currentPage,
            itemsPerPage,
            totalPages,
            paginatedData,
            pageNumbers,
            changePage,
            prevPage,
            nextPage
        }
    }
}
</script>

<style scoped>
.partial{
    text-decoration: line-through;
}
td{
    vertical-align: middle;
}
.modal ul {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.modal li {
  margin-bottom: 10px;
  font-size: 1.1em;
  color: #555555;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e5e5e5; /* Light bottom border */
  padding-bottom: 5px;
}

.modal li span:first-child {
  font-weight: bold;
  color: #333333;
}
.Pending{
    color: rgb(247, 153, 13);
}
.Completed{
    color: rgb(7, 193, 41);
}
.Inprogress{
    color: rgb(13, 161, 247);
}
.Cancelled{
    color: rgb(247, 13, 13);
}
.Partially{
    color: rgb(185, 64, 222);
}
</style>