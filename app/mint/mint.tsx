"use client";
import { useState, useEffect } from "react";

export default function Minting() {
  const [minting, setMinting] = useState<boolean>(false);
  const [mintingError, setMintingError] = useState<string>("");
  const [mintedNFT, setMintedNFT] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("email") || "";
    setEmail(savedEmail);
  }, []);

  const mintNFT = async () => {
    setMinting(true);
    setMintingError(""); // Clear any previous error

    try {
      const apiKey =
        process.env.SERVER_SIDE_API_KEY ||
        "sk_staging_AB9yMCY8Gesbec4Mk1fSd9DpkCnHA4snuiJs2kETsoeKxWXAdwdDrKp2Ksv2fUi8sJyYGbZZMZEnyYgEPztfmQVbVFdw9NP6vZGSNMW72C4EVmzTZSXPTUy6AQqFgYmMG4vGShDuzbBktwM7sSCFDyn6qehXMbmjcHACCSDtm6mFDuSLb2pBiL4pGMDWsmWH3ka3UxeC4Je6iW6B47QsDjcb";
      const chain = "base-sepolia";
      const env = "staging";
      const recipientEmail = email;
      const recipientAddress = `email:${recipientEmail}:${chain}`;

      const url = `https://${env}.crossmint.com/api/2022-06-09/collections/default/nfts`;
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          recipient: recipientAddress,
          metadata: {
            name: "Crossmint Test NFT",
            image: "https://imgur.com/a/UkRthpe",
            description: "My first NFT using Crossmint",
          },
        }),
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Error minting NFT");
      }

      const nftData = await response.json();
      console.log("NFT minted successfully:", nftData);
      setMintedNFT(nftData.tokenId); // Update this to match the actual response field
    } catch (error: any) {
      console.error("Error minting NFT:", error);
      setMintingError(error.message || "An error occurred.");
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">
      <div className="p-5">
        <div className="text-center mb-5">MINT YOUR NFT</div>
        {mintedNFT ? (
          <div className="py-3 text-center">NFT Minted: {mintedNFT}</div>
        ) : (
          <>
            {minting ? (
              <div className="py-3 text-center">Minting...</div>
            ) : (
              <div className="text-center">
                <button
                  onClick={mintNFT}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-3 py-2 px-4 rounded focus:outline-none"
                >
                  Mint NFT
                </button>
                {mintingError && (
                  <div className="text-red-500 mt-2">{mintingError}</div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
