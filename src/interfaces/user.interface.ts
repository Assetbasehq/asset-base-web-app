export interface IUser {
  account_id: string;
  account_type: string;
  country: string;
  created_at: string;
  date_of_birth: string;
  email_address: string;
  first_name: string;
  gender: string;
  id: string;
  last_name: string;
  organization_name: null;
  phone_number: string;
  profile_photo_url: null;
  referral_code: string;
  referral_count: number;
  referred_by: null;
  updated_at: string;
  metadata?: {
    signup_mode: string;
    rise_account_id?: string;
    rise_username?: string;
    rise_kyc_status?: string;
  };
}

export interface NextOfKin {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  relationship: string;
  bank_name: string;
  bank_account_number: string;
}

export interface IUpdateUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: File | null;
  phoneNumber?: string;
  document?: File[] | null;
  roles?: string[];
}

export type UserBankAccount = {
  id: string;
  created_at: string;
  user_id: string;
  status: string;
  wallet_type: string;
  currencies: string[];
  provider: string;
  details: {
    accounts?: {
      id: string;
      last_digits: string;
      account_name: string;
      account_type: string;
    }[];
    currency: string;
    provider: string;
    bank_name: string;
    provider_reference: string;
    bank_code?: string;
    account_name?: string;
    account_number?: string;
    network?: string;
  };
};
