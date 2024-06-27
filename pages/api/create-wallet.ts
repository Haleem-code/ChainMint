// pages/api/create-wallet.ts

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, chain } = req.body;

    try {
      const response = await fetch(
        "https://staging.crossmint.com/api/v1-alpha1/wallets",
        {
          method: "POST",
          headers: {
            "X-API-KEY":
              process.env.SERVER_SIDE_API_KEY ||
              "sk_staging_AB9yMCY8Gesbec4Mk1fSd9DpkCnHA4snuiJs2kETsoeKxWXAdwdDrKp2Ksv2fUi8sJyYGbZZMZEnyYgEPztfmQVbVFdw9NP6vZGSNMW72C4EVmzTZSXPTUy6AQqFgYmMG4vGShDuzbBktwM7sSCFDyn6qehXMbmjcHACCSDtm6mFDuSLb2pBiL4pGMDWsmWH3ka3UxeC4Je6iW6B47QsDjcb",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, chain }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error creating wallet: ${errorText}`);
      }

      const wallet = await response.json();
      res.status(200).json(wallet);
    } catch (error: any) {
      // Explicitly typing error as any
      console.error("Error creating wallet:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method not allowed" });
  }
}
