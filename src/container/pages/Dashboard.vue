<template>
    <div class="dashboard">
        <div class="container px-4">
        <h3 class="py-3" style="font-weight: bold;">DASHBOARD</h3>
            <div class="row">
                <div class="col-lg-3 col-md-6 py-2">
                    <div class="card bg-primary-gradient text-center shadow h-100">
                        <div class="card-body">
                            <h5 class="card-title mt-2">Total Transactions</h5>
                            <div class="count">125</div>
                            <p class="card-text">Track your sales performance.</p>
                            <i class="bi bi-bar-chart-fill icon"></i>
                        </div>
                    </div>
                </div>

                <!-- Card 2 -->
                <div class="col-lg-3 col-md-6 py-2">
                    <div class="card bg-success-gradient text-center shadow h-100">
                        <div class="card-body">
                            <h5 class="card-title mt-2">Total Staff</h5>
                            <div class="count"> 56</div>
                            <p class="card-text">Monitor total sign-ups on your platform.</p>
                            <i class="bi bi-people-fill icon"></i>
                        </div>
                    </div>
                </div>

                <!-- Card 3 -->
                <div class="col-lg-3 col-md-6 py-2">
                    <div class="card bg-warning-gradient text-center shadow h-100">
                        <div class="card-body">
                            <h5 class="card-title mt-2">Orders</h5>
                            <div class="count">328</div>
                            <p class="card-text">Check the status of current orders.</p>
                            <i class="bi bi-box-seam icon"></i>
                        </div>
                    </div>
                </div>

                <!-- Card 4 -->
                <div class="col-lg-3 col-md-6 py-2">
                    <div class="card bg-danger-gradient text-center shadow h-100">
                        <div class="card-body">
                            <h5 class="card-title mt-2">Revenue</h5>
                            <div class="count amount">15,987 <span>AED</span></div>
                            <div class="count amount">46,98709 <span>INR</span></div>
                            <p class="card-text">View your revenue details.</p>
                            <i class="bi bi-cash-stack icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DashboardPage'
}
</script>

<style scoped>
    .card {
        border: none;
        color: white;
        border-radius: 15px;
    }
    .card-body {
        position: relative;
    }
    .count {
        font-size: 2.5rem;
        font-weight: bold;
    }
    .icon {
        position: absolute;
        top: -15px;
        right: 15px;
        opacity: 0.3;
        font-size: 4rem;
    }
    /* Background gradients for cards */
    .bg-primary-gradient {
        background: linear-gradient(45deg, #007bff, #00d4ff);
    }
    .bg-success-gradient {
        background: linear-gradient(45deg, #28a745, #77dd77);
    }
    .bg-warning-gradient {
        background: linear-gradient(45deg, #ffc107, #ffdd57);
    }
    .bg-danger-gradient {
        background: linear-gradient(45deg, #dc3545, #ff6f61);
    }
    .amount{
        font-size: 30px;
    }
    .amount span{
        color: #E5E5E5;
        font-size: 16px;
    }
</style>