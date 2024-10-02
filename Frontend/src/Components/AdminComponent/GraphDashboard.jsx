import React, { useMemo, useState } from 'react';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { useSelector } from 'react-redux';

// Register chart types with ChartJS
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend, LineElement, PointElement);

const GraphDashboard = () => {
    const { UserList, ProductList, OrderList } = useSelector(state => state.Admin);
    const [totalRevenue, setTotalRevenue] = useState(0);

    // Calculate total revenue
    useMemo(() => {
        let total = 0;
        OrderList.forEach((order) => {
            total += order.totalprice;
        });
        setTotalRevenue(total);
    }, [OrderList]);

    // Bar Chart: Monthly Sales
    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Monthly Sales (₹)',
            data: OrderList.map(order => order.totalprice), // Replace with real monthly data
            backgroundColor: '#4fa94d',
        }]
    };

    // Count the number of products per category
    const categoryLabels = ['Electronics', 'Fashion', 'Furniture', 'Grocery', 'Jewellery', 'Kitchen'];
    const categoryCounts = categoryLabels.reduce((acc, category) => {
        acc[category] = ProductList.reduce((count, product) => {
            return count + (product.category.includes(category) ? 1 : 0);
        }, 0);
        return acc;
    }, {});

    // Pie Chart: Number of Products per Category
    const pieData = {
        labels: categoryLabels,
        datasets: [{
            label: 'Products per Category',
            data: categoryLabels.map(label => categoryCounts[label]), // Get counts for each category
            backgroundColor: ['#3b82f6', '#f97316', '#f43f5e', '#10b981', 'green', 'yellow'],
        }]
    };


    // Line Chart: Revenue Trend
    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Revenue Trend (₹)',
            data: OrderList.map(order => order.totalprice), // Replace with real monthly revenue
            borderColor: '#f43f5e',
            fill: false,
        }]
    };

    // Doughnut Chart: Payment Method Distribution
    const paymentMethodCounts = OrderList.reduce((acc, order) => {
        if (order?.payment?.method) {
            acc[order.payment.method] = (acc[order.payment.method] || 0) + 1;
        }
        return acc;
    }, {});

    const doughnutData = {
        labels: ['Credit Card', 'Netbanking', 'UPI', 'Wallet'],
        datasets: [{
            label: 'Payment Methods',
            data: [
                paymentMethodCounts['Credit Card'] || 0,
                paymentMethodCounts['netbanking'] || 0,
                paymentMethodCounts['upi'] || 0,
                paymentMethodCounts['Wallet'] || 0,
            ],
            backgroundColor: ['#3b82f6', '#10b981', '#f43f5e', '#f97316'],
        }]
    };


    // Options for bar chart
    const barOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            tooltip: { enabled: true },
        },
        scales: {
            x: { grid: { display: false } },
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(0, 0, 0, 0.1)' },
            },
        },
    };

    return (
        <div className="w-full p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="bg-blue-600 text-white py-4 px-6 rounded-lg mb-8">
                <h2 className="text-3xl font-semibold">Dashboard</h2>
            </div>

            {/* Total Amount Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 shadow-md rounded-lg text-center">
                    <h3 className="text-2xl font-semibold">Total Revenue</h3>
                    <p className="text-xl mt-2 text-green-500">₹{totalRevenue}</p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg text-center">
                    <h3 className="text-2xl font-semibold">Total Orders</h3>
                    <p className="text-xl mt-2 text-blue-500">{OrderList.length}</p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg text-center">
                    <h3 className="text-2xl font-semibold">Active Users</h3>
                    <p className="text-xl mt-2 text-yellow-500">{UserList.length}</p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg text-center">
                    <h3 className="text-2xl font-semibold">Total Products</h3>
                    <p className="text-xl mt-2 text-yellow-500">{ProductList.length}</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Monthly Sales Overview</h3>
                    <div className="h-72 lg:h-96 w-full">
                        <Bar data={barData} options={barOptions} key="barChart" />
                    </div>
                </div>

                {/* Doughnut Chart: Payment Methods */}
                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Payment Method Distribution</h3>
                    <div className="h-72 lg:h-96 w-full">
                        <Doughnut data={doughnutData} key="doughnutChart" />
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 gap-6 mt-4">
                {/* Line Chart: Revenue Trend */}
                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Revenue Trend</h3>
                    <Line data={lineData} key="lineChart" />
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Product Category Distribution</h3>
                    <div className="w-full h-96">
                        <Pie data={pieData} key="pieChart" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraphDashboard;
