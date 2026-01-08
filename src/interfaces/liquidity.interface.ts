export interface ILiquidity {
  id: string;
  userAddress: string;
  poolType: "COMPANY" | "ASSETBASE";
  paymentTokenAssetId: string;
  assetWeb3ServiceId: string;
  amount: string;
  txHash: string;
  tokenId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
