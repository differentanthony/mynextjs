"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import InvestmentForm from "@/components/InvestmentForm";
import { Investment } from "@/type";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Risk Level Colors
const riskColors: Record<string, string> = {
  Low: "bg-green-500 text-white",
  Medium: "bg-yellow-500 text-gray-900",
  High: "bg-red-500 text-white",
};

interface Transaction {
  id: string;
  stock: string;
  amount: number;
  date: string;
  updatedBalance: number;
}

// Investment Data
const investments: Investment[] = [
  {
    id: "1",
    name: "Solar Panel Frame Plan",
    duration: "4 Weeks",
    investmentRange: "₦10,000 – ₦25,000",
    grossReturn: 50,
    netReturn: 45,
    description:
      "Invest in the production of high-quality solar panel frames, the backbone of every solar system. Your investment helps us manufacture and distribute these essential components worldwide. Returns are subject to a 10% withholding tax.",
    cta: "Invest in Solar Frames",
    imageUrl: "/images/investments/solar.jpg",
    riskLevel: "Low",
  },
  {
    id: "2",
    name: "Photovoltaic Cell Plan",
    duration: "6 Weeks",
    investmentRange: "₦30,000 – ₦50,000",
    grossReturn: 45,
    netReturn: 40.5,
    description:
      "Fund the production of photovoltaic cells, the heart of solar panels that convert sunlight into energy. Your investment supports cutting-edge technology and global energy solutions. Returns are subject to a 10% withholding tax.",
    cta: "Invest in PV Cells",
    imageUrl: "/images/investments/solar2.jpg",
    riskLevel: "Medium",
  },
  {
    id: "3",
    name: "Inverter System Plan",
    duration: "8 Weeks",
    investmentRange: "₦60,000 – ₦80,000",
    grossReturn: 45,
    netReturn: 40.5,
    description:
      "Invest in solar inverters, the brains of the solar system that convert DC power to AC. Your contribution helps us produce and sell these critical components to energy projects worldwide. Returns are subject to a 10% withholding tax.",
    cta: "Invest in Inverters",
    imageUrl: "/images/investments/solar3.jpg",
    riskLevel: "High",
  },
  {
    id: "4",
    name: "Mounting Structure Plan",
    duration: "12 Weeks",
    investmentRange: "₦90,000 – ₦120,000",
    grossReturn: 50,
    netReturn: 45,
    description:
      "Support the manufacturing of durable mounting structures that secure solar panels in place. Your investment ensures the stability and efficiency of solar installations globally. Returns are subject to a 10% withholding tax.",
    cta: "Invest in Mounting Structures",
    imageUrl: "/images/investments/solar4.jpg",
    riskLevel: "Low",
  },
  {
    id: "5",
    name: "Energy Storage Battery Plan",
    duration: "14 Weeks",
    investmentRange: "₦150,000 – ₦200,000",
    grossReturn: 50,
    netReturn: 45,
    description:
      "Fund the production of advanced energy storage batteries, essential for storing solar power. Your investment helps us deliver reliable energy solutions to homes and businesses. Returns are subject to a 10% withholding tax.",
    cta: "Invest in Storage Batteries",
    imageUrl: "/images/investments/solar5.jpg",
    riskLevel: "Medium",
  },
  {
    id: "6",
    name: "NextEra Energy, Inc. (NEE)",
    investmentRange: "₦8,000 – ₦150,000",
    riskLevel: "High",
    imageUrl: "/images/investments/solar6.jpg",
    description:
      "NextEra Energy, Inc. is a global leader in renewable energy, specializing in solar and wind power generation.",
      duration: "16 Weeks",
      grossReturn: 50,
      netReturn: 45,
    cta: "Invest in Storage Batteries",
  },
];

export default function InvestmentDetails() {
  const { id: investmentId } = useParams<{ id: string }>();
  const [investment, setInvestment] = useState<Investment | null>(null);
  const [walletBalance, setWalletBalance] = useState(100000); // Example starting balance
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showForm, setShowForm] = useState(false);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  // ✅ Define chart data inside the component
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [100, 200, 300, 400, 500],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
      },
    ],
  };

  useEffect(() => {
    if (investmentId) {
      const selectedInvestment = investments.find(
        (inv) => inv.id === investmentId
      );
      setInvestment(selectedInvestment || null);
    }
  }, [investmentId]);

  if (!investment) {
    return (
      <p className="text-white text-center mt-10">Investment not found.</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto p-4 md:p-6 text-white pt-[70px] md:pt-[90px] overflow-hidden">
        {/* Back Link */}
        <Link
          href="/investments"
          className="text-blue-500 hover:underline flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Investments
        </Link>

        {/* Investment Form Modal */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg relative">
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowForm(false)}
              >
                ✖
              </button>

              {/* Investment Form */}
              <InvestmentForm
                walletBalance={walletBalance}
                setWalletBalance={setWalletBalance}
                transactions={transactions}
                setTransactions={setTransactions}
                onClose={() => setShowForm(false)} // Pass onClose prop
              />
            </div>
          </div>
        )}

        {/* Investment Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg"
        >
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg mb-6">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mr-4 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <h1 className="text-4xl font-bold text-white">
                {investment.name}
              </h1>
            </div>
          </div>

          {/* Investment Image */}
          <div className="relative w-full h-48 md:h-60 rounded-lg overflow-hidden mb-6">
            <Image
              src={investment.imageUrl}
              alt={investment.name}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-4 rounded-lg text-center">
              <p className="text-gray-200">Duration</p>
              <p className="text-2xl font-bold text-white">
                {investment.duration}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-green-500 p-4 rounded-lg text-center">
              <p className="text-gray-200">Investment Range</p>
              <p className="text-2xl font-bold text-white">
                {investment.investmentRange}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-500 p-4 rounded-lg text-center">
              <p className="text-gray-200">Gross Return</p>
              <p className="text-2xl font-bold text-white">
                {investment.grossReturn}%
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-600 to-red-500 p-4 rounded-lg text-center">
              <p className="text-gray-200">Net Return</p>
              <p className="text-2xl font-bold text-white">
                {investment.netReturn}%
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <p className="text-gray-300 mb-2">Investment Progress</p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: "30%" }}
              ></div>
            </div>
            <p className="text-gray-300 mt-2">4 Weeks Remaining</p>
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-6">{investment.description}</p>

          {/* Risk Level */}
          <div className="mb-6">
            <p className="text-gray-300">Risk Level:</p>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                riskColors[investment.riskLevel]
              }`}
            >
              {investment.riskLevel}
            </span>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all"
              onClick={() => setShowForm(true)}
            >
              {investment.cta}
            </button>
            <p className="text-gray-300 mt-2">
              Start investing in just a few clicks.
            </p>
          </div>
        </motion.div>

        {/* Tax Disclaimer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Understanding Your Returns
          </h2>
          <p className="text-gray-300">
            All investment returns are subject to a 10% withholding tax as
            required by Nigerian law. This tax is deducted before your returns
            are paid out, ensuring compliance with local regulations. For
            example, if your investment earns a 50% return, your net return
            after tax will be 45%. We handle all tax filings and deductions on
            your behalf, so you can focus on earning returns.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg overflow-hidden"
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Investment Performance Over Time
          </h2>
          <p className="text-gray-300 mb-4">
            Track the performance of your investment with this live candlestick
            chart.
          </p>

          {/* Chart Container */}
          <div className="relative w-full h-auto min-h-[300px] md:min-h-[350px] lg:min-h-[400px] bg-gray-800 rounded-lg shadow-lg overflow-hidden p-4 flex flex-col justify-center">
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/30 to-transparent opacity-25"></div>

            {/* Chart Component */}
            <div className="relative w-full h-full">
              <Line options={options} data={chartData} />
            </div>
          </div>
        </motion.div>

        {/* Download Summary */}
        <div className="mt-8 text-center">
          <button className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600">
            Download Investment Summary
          </button>
        </div>

        {/* Contact Option */}
        <div className="mt-8 text-center">
          <p className="text-gray-300">Have questions?</p>
          <button className="text-blue-500 hover:underline">Contact Us</button>
        </div>
      </div>
    </div>
  );
}