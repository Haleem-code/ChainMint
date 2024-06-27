"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const authorizedEmails = [
  "haleemayomide02@gmail.com",
  "abdulhaleemayomide@gmail.com",
  "Rohit@crossmint.com",
  "Danny@crossmint.com",
  "Connor@crossmint.com",
];

export default function CreateWallet() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email") || "";
    setEmail(savedEmail);
  }, []);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const createCustodialWallet = async () => {
    setLoading(true);
    setError(""); // Clear any previous error
    try {
      console.log("Attempting to create wallet for email:", email);
      if (!authorizedEmails.includes(email)) {
        throw new Error("Unauthorized email address.");
      }

      const response = await fetch(
        "https://staging.crossmint.com/api/v1-alpha1/wallets",
        {
          method: "POST",
          headers: {
            "X-PROJECT-ID":
              process.env.NEXT_PUBLIC_PROJECT_ID ||
              "eaa53b04-a685-4d50-90a4-21d832a860fe",
            "X-CLIENT-SECRET":
              process.env.NEXT_PUBLIC_CLIENT_SECRET ||
              "ck_staging_35Zr1xBDyZbaE3xb9qdob1xU8XJxmeaiDPxFWPwFhWbjp1oFsWbVRW2FWT4E9k34TWcLzeDvgCbGVHEDdVH4PVp1VtUE4R4Qt34Z4Q45U6xXEZ331bg88ULVVW5CTmBrCxV5AU3GMd314FK25XK13wkmx6YKZ7iQSWujhAHYW6Ltc7chS1VdrcRctH6NKyWZirfsHBcNhkcf23PXZKBLYAV",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            chain: "base-sepolia",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error creating wallet");
      }

      const walletData = await response.json();
      console.log("Wallet created successfully:", walletData);
      setWalletAddress(walletData.publicKey);

      localStorage.setItem("email", email); // Save email to local storage
      router.push("/minting"); // Navigate to the minting page after wallet creation
    } catch (error: any) {
      console.error("Error creating wallet:", error);
      setError(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">
      <div className="p-5">
        <div className="text-center mb-5">CREATE A CUSTODIAL WALLET</div>
        {!walletAddress ? (
          <>
            {loading ? (
              <div className="py-3 text-center">Loading...</div>
            ) : (
              <div className="text-center">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className="border rounded w-72 p-2 my-2 text-black"
                />
                <button
                  onClick={createCustodialWallet}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-3 py-2 px-4 rounded focus:outline-none"
                >
                  Create Custodial Wallet
                </button>
                {error && <div className="text-red-500 mt-2">{error}</div>}
              </div>
            )}
          </>
        ) : (
          <div className="py-3 text-center">
            Wallet Address: {walletAddress}
          </div>
        )}
      </div>
    </div>
  );
}
