// // pages/checkout.tsx
// "use client";

// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import {
//   CrossmintAASDK,
// } from "@crossmint/client-sdk-aa";

// export default function Checkout() {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [success, setSuccess] = useState<boolean>(false);
//   const router = useRouter();

//   const handleCheckout = async () => {
//     setLoading(true);
//     try {
//       const xm = CrossmintAASDK.init({
//         apiKey: process.env.NEXT_PUBLIC_API_KEY,
//       });

//       const walletAddress = localStorage.getItem("walletAddress");
//       if (!walletAddress) throw new Error("No wallet address found");

//       await xm.createCheckout({
//         walletAddress,
//         amount: 5000, // Example amount in USDC
//         currency: "USDC",
//       });

//       setSuccess(true);
//     } catch (error) {
//       console.error("Error during checkout")
