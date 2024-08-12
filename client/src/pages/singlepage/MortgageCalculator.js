import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const MortgageCalculator = () => {
    const [totalAmount, setTotalAmount] = useState(7500000);
    const [downPayment, setDownPayment] = useState(200000);
    const [interestRate, setInterestRate] = useState(12);
    const [amortizationPeriod, setAmortizationPeriod] = useState(15);
    const [paymentPeriod, setPaymentPeriod] = useState("Monthly");
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [totalCostOfLoan, setTotalCostOfLoan] = useState(0);
    const [totalInterestPaid, setTotalInterestPaid] = useState(0);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Loan Balance',
                data: [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    });

    const [balanceData, setBalanceData] = useState([]);

    const calculateMortgage = () => {
        const principal = totalAmount - downPayment;
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = amortizationPeriod * 12;

        const payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
        setMonthlyPayment(payment.toFixed(2));

        const totalCost = payment * numberOfPayments;
        setTotalCostOfLoan(totalCost.toFixed(2));
        setTotalInterestPaid((totalCost - principal).toFixed(2));

        // Generate chart data
        const newBalanceData = [];
        let currentBalance = principal;
        let totalPaid = 0;

        for (let i = 0; i <= numberOfPayments; i++) {
            if (i % 12 === 0) {
                newBalanceData.push({ balance: currentBalance.toFixed(2), totalPaid: totalPaid.toFixed(2) });
            }
            const interestForMonth = currentBalance * monthlyRate;
            const principalForMonth = payment - interestForMonth;
            currentBalance -= principalForMonth;
            totalPaid += payment;
        }

        setBalanceData(newBalanceData);
        setChartData({
            labels: Array.from({ length: amortizationPeriod + 1 }, (_, i) => i),
            datasets: [
                {
                    label: 'Loan Balance',
                    data: newBalanceData.map(data => data.balance),
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }
            ]
        });
    };

    useEffect(() => {
        calculateMortgage();
    }, [totalAmount, downPayment, interestRate, amortizationPeriod, paymentPeriod]);

    return (
        <div className="flex p-4 mt-4 border rounded-lg shadow-lg">
            <div className="w-1/2 pr-4">
                <h2 className="mb-4 text-2xl font-bold">Mortgage Calculator</h2>
                <label
                    htmlFor="totalProjectExtent"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                >
                    Total Amount
                </label>
                <div className="relative mb-2">
                    <span className="absolute left-2 top-2">₹</span>
                    <input
                        type="number"
                        placeholder="Total Amount"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(Number(e.target.value))}
                        className="w-full p-2 pl-6 border rounded"
                    />
                </div>
                <label
                    htmlFor="totalProjectExtent"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                >
                    Down Payment
                </label>
                <div className="relative mb-2">
                    <span className="absolute left-2 top-2">₹</span>
                    <input
                        type="number"
                        placeholder="Down Payment"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="w-full p-2 pl-6 border rounded"
                    />
                </div>
                <label
                    htmlFor="totalProjectExtent"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                >
                    Interest Rate
                </label>
                <div className="relative mb-2">
                    <input
                        type="number"
                        placeholder="Interest Rate (%)"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full p-2 pr-10 border rounded"
                    />
                    <span className="absolute right-2 top-2">%</span>
                </div>
                <label
                    htmlFor="totalProjectExtent"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                >
                    Amortization Period
                </label>
                <div className="relative mb-2">
                    <input
                        type="number"
                        placeholder="Amortization Period (Years)"
                        value={amortizationPeriod}
                        onChange={(e) => setAmortizationPeriod(Number(e.target.value))}
                        className="w-full p-2 pr-16 border rounded"
                    />
                    <span className="absolute right-2 top-2">year(s)</span>
                </div>
                <label
                    htmlFor="totalProjectExtent"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                >
                    Payment Period
                </label>
                <div className="relative mb-2">
                    <select
                        value={paymentPeriod}
                        onChange={(e) => setPaymentPeriod(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="Monthly">Monthly</option>
                        <option value="Semi-Monthly">Semi-Monthly</option>
                        <option value="Biweekly">Biweekly</option>
                        <option value="Weekly">Weekly</option>
                    </select>
                </div>
                <button
                    onClick={calculateMortgage}
                    className="w-full p-2 text-white bg-blue-500 rounded"
                >
                    Calculate
                </button>
            </div>
            <div className="w-1/2 pl-4">
                <div className="flex flex-col space-y-2">
                    <h3 className="text-xl font-bold">Results</h3>
                    <div className="flex justify-between">
                        <p>Monthly Payment :</p>
                        <p>₹{monthlyPayment}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Total Cost of Loan :</p>
                        <p>₹{totalCostOfLoan}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Total Interest Paid :</p>
                        <p>₹{totalInterestPaid}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Payment Period :</p>
                        <p>{paymentPeriod}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Mortgage Payment :</p>
                        <p>₹{monthlyPayment}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <h4 className="text-lg font-bold">Loan Balance Chart</h4>
                    <Line
                        data={chartData}
                        options={{
                            plugins: {
                                tooltip: {
                                    callbacks: {
                                        label: function (tooltipItem) {
                                            const index = tooltipItem.dataIndex;
                                            const balance = tooltipItem.dataset.data[index];
                                            const totalPaid = index < balanceData.length ? balanceData[index].totalPaid : "N/A";
                                            return [
                                                `Year: ${tooltipItem.label}`,
                                                `Loan Balance: ₹${balance}`,
                                                `Total Amount Paid: ₹${totalPaid}`
                                            ];
                                        }
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MortgageCalculator;