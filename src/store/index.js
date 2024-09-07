import { defineStore } from 'pinia'

export const allData = defineStore('datas', {
    state: () => ({
        users: [
            {
                userName: 'admin',
                password: '1234',
                role: 'Admin'
            },
            {
                userName: 'vendor',
                password: '1234',
                role: 'Vendor'
            },
            {
                userName: 'staff',
                password: '1234',
                role: 'Staff'
            }
        ],
        menus: [
            {
                menuName: 'Dashboard',
                roles: ['Admin', 'Staff', 'Vendor'],
                icon: 'fa-solid fa-house me-1',
                navLink: '/'
            },
            {
                menuName: 'Managements',
                roles: ['Admin'],
                icon: 'fa-solid fa-bars-progress me-1',
                subMenu: [
                    {
                        subMenuName: "Vendor management",
                        navLink: '/vendor'
                    },
                    {
                        subMenuName: "Staff management",
                        navLink: '/staff'
                    }
                ]
            },
            {
                menuName: 'Pending Transactions',
                roles: ['Admin', 'Staff'],
                icon: 'fa-solid fa-wallet me-1',
                navLink: '/pendingTrnsaction'
            },
            {
                menuName: 'Transactions History',
                roles: ['Admin', 'Staff', 'Vendor'],
                icon: 'fa-solid fa-clock-rotate-left me-1',
                navLink: '/transactionHistory'
            },
        ],
        transactionsList : [
            {
                id: 1,
                date: '2024-09-18',
                transactionId: '123678',
                approvedBy: 'Jagathees',
                approvedRole: 'Admin',
                orderBy: 'Dharani',
                amount: 100000,
                status: 'Completed',
                partitalAmount: null,
                recevierName: 'Lorem 2',
                accountNo: 'xxxx5678',
                ifscCode: 'iob34535'
            },
            {
                id: 2,
                date: '2024-09-27',
                transactionId: '-',
                approvedBy: '-',
                approvedRole: '',
                orderBy: 'Vendor 3',
                amount: 30000,
                status: 'Pending',
                partitalAmount: null,
                recevierName: 'Lorem 7',
                accountNo: 'xxxx8967',
                ifscCode: 'cnrb2345'
            },
            {
                id: 3,
                date: '2024-06-05',
                transactionId: '123456',
                approvedBy: 'Admin 1',
                approvedRole: 'Admin',
                orderBy: 'vendor 3',
                amount: 130000,
                status: 'Inprogress',
                partitalAmount: null,
                recevierName: 'Lorem 9',
                accountNo: 'xxxx8685',
                ifscCode: 'iob34535'
            },
            {
                id: 4,
                date: '2024-06-08',
                transactionId: '763421',
                approvedBy: 'Admin 4',
                approvedRole: 'Admin',
                orderBy: 'Vendor 3',
                amount: 340000,
                status: 'Inprogress',
                partitalAmount: null,
                recevierName: 'Lorem 2',
                accountNo: 'xxxx5678',
                ifscCode: 'iob34535'
            },
            {
                id: 5,
                date: '2024-06-05',
                transactionId: '536252',
                approvedBy: 'Staff 1',
                approvedRole: 'Staff',
                orderBy: 'Vendor 2',
                amount: 470000,
                status: 'Cancelled',
                partitalAmount: null,
                recevierName: 'Lorem 2',
                accountNo: 'xxxx5678',
                ifscCode: 'iob34535'
            },
            {
                id: 5,
                date: '2024-09-05',
                transactionId: '123678',
                approvedBy: 'Admin 3',
                approvedRole: 'Admin',
                orderBy: 'Vendor 5',
                amount: 800000,
                status: 'Partially completed',
                partitalAmount: 500000,
                recevierName: 'Lorem 2',
                accountNo: 'xxxx5678',
                ifscCode: 'iob34535'
            }
        ],
        sideMenuShow: true,
        OTP: 1234,
        profileData: {}
    }),
    getters: {
        userDetail: (state) => state.users,
    },
    actions: {
        addUser(user) {
            this.users.push(user)
        },
        toggleSideBar() {
            this.sideMenuShow = !this.sideMenuShow
        },
        updateProfileData(userData={}) {
            this.profileData = userData;
        },
        addTransaction(data){
            let temp = {
                id: this.transactionsList.length + 1,
                date: '2024-09-05',
                transactionId: '-',
                approvedBy: '-',
                approvedRole: '',
                orderBy: 'Vendor 5',
                amount: data.amount,
                status: 'Pending',
                partitalAmount: null,
                recevierName: data.receiverName,
                accountNo: data.accountNo,
                ifscCode: data.ifscCode
            }
            this.transactionsList.push(temp)
            console.log(temp)
        }
    }
})