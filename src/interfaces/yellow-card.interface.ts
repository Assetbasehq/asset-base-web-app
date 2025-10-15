/**
 * Interface for Yellow Card Deposit
 *
 *NetworkId and MomoNumber are optional and only needed when paymentGateway is "momo"
 */
export interface IYellowCardDeposit {
  amount: number;
  currency: string;
  paymentGateway: string;
  networkId?: string;
  momoNumber?: string;
  country?: string;
  assetId?: string;
  amountCurrency?: string;
}

/**
 * Interface for Yellow Card Deposit Response
 *
 * yellowCardMetaData can contains information about the bank or momo account for the deposit
 */
export interface IYellowCardDepositResponse {
  status: string;
  message: string;
  data: {
    id: string;
    active: boolean;
    userId: string;
    walletId: string;
    assetId: string;
    amount: number;
    walletAddress: string;
    type: "DEPOSIT" | "WITHDRAWAL";
    processingStatus: string;
    bridgingStatus: string;
    assetToUsdRate: number;
    txHash: string;
    reference: string;
    exchangeRate: number;
    provider: string;
    localAmount: number;
    fee: number;
    yellowCardMetaData: {
      [key: string]: string | number | boolean | null;
    };
  };
}
