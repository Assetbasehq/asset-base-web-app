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
  country: string;
  assetId: string;
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
    yellowcardMetadata: IYellowcardMetaData;
  };
}

export interface IYellowcardMetaData {
  amount: number;
  bankInfo?: {
    name: string;
    accountNumber: string;
    accountName: string;
  };
  channelId: string;
  convertedAmount: number;
  country: string;
  currency: string;
  customerUID: string;
  depositId: string;
  directSettlement: boolean;
  expiresAt: string;
  fiatWallet: string;
  forceAccept: boolean;
  id: string;
  partnerFeeAmountLocal: number;
  partnerFeeAmountUSD: number;
  partnerId: string;
  rate: number;
  recipient: {
    country: string;
    idType: string;
    address: string;
    additionalIdNumber: string;
    phone: string;
  };
  reference: string;
  refundRetry: number;
  requestSource: string;
  sequenceId: string;
  serviceFeeAmountLocal: number;
  serviceFeeAmountUSD: number;
  source: {
    accountNumber: string;
    accountType: string;
  };
  status: string;
  tier0Active: boolean;
  updatedAt: string;
}

export interface IMomoNetwork {
  accountNumberType: string;
  channelIds: string[];
  code: string;
  country: string;
  countryAccountNumberType: string;
  createdAt: string;
  id: string;
  name: string;
  status: string;
  updatedAt: string;
}
