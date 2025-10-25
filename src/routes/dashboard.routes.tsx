import DashboardLayout from "@/layouts/dashboard-layout";
import DashboardHome from "@/pages/dashboard/dashboardHome/dashboard-home";
import Assets from "@/pages/dashboard/assets/assets";
import Wallet from "@/pages/dashboard/wallet/wallet";
import WalletPage from "@/pages/dashboard/wallet/_components/wallet-page";
import Withdraw from "@/pages/dashboard/wallet/withdraw/withdraw";
import Markets from "@/pages/dashboard/markets/markets";
import AssetDetails, {
  AssetDetailsInvest,
} from "@/pages/dashboard/markets/_components/asset-details";
import Liquidity from "@/pages/dashboard/liquidity/liquidity";
import AvailableLiquidity from "@/pages/dashboard/liquidity/_components/available-liquidity";
import MyInvestments from "@/pages/dashboard/liquidity/_components/my-investments";
import Portfolio from "@/pages/dashboard/portfolio/portfolio";
import MyAssets from "@/pages/dashboard/portfolio/_components/my-assets";
import Watchlist from "@/pages/dashboard/portfolio/_components/watchlist";
import Matured from "@/pages/dashboard/portfolio/_components/matured";
import Profile from "@/pages/dashboard/profile/profile";
import ProfilePage from "@/pages/dashboard/profile/_components/profile-page";
import ProfileLeaderboard from "@/pages/dashboard/profile/_components/profile-leaderboard";
import ProfileKYC from "@/pages/dashboard/profile/_components/profile-kyc/profile-kyc";
import ProfileSecurity from "@/pages/dashboard/profile/_components/profile-security";
import ProfileReferrals from "@/pages/dashboard/profile/_components/profile-referrals";
import ProfileAccountStatement from "@/pages/dashboard/profile/_components/profile-account-statement/profile-account-statement";
import ProfileInvestmentCertificate from "@/pages/dashboard/profile/_components/profile-investment-certificate";
import ProfileContactUs from "@/pages/dashboard/profile/_components/profile-contact-us";
import ProfileDeleteAccount from "@/pages/dashboard/profile/_components/profile-delete-account";
import Onboarding404 from "@/pages/onboarding/onboarding404";
import { AuthGuard } from "@/guards/auth.guard";
import type { RouteObject } from "react-router";
import Deposit404 from "@/pages/dashboard/wallet/deposit/deposit-404";
import CryptoDeposit from "@/pages/dashboard/wallet/deposit/crypto/crypto-deposit";
import Deposit from "@/pages/dashboard/wallet/deposit/deposit";
import FundUsdWithUsdCard from "@/pages/dashboard/wallet/deposit/usd/usd/usd-card/fund-usd-with-usd-card";
import FundUsdWithBankAccount from "@/pages/dashboard/wallet/deposit/usd/usd/bank-account/fund-usd-with-bank-account";
import FundUsdWithGhsTigo from "@/pages/dashboard/wallet/deposit/usd/ghs/tigo/fund-usd-with-ghs-tigo";
import FundUsdWithUgxMTN from "@/pages/dashboard/wallet/deposit/usd/ugx/mtn/fund-usd-with-ugx-mtn";
import FundUsdWithUgxAirtel from "@/pages/dashboard/wallet/deposit/usd/ugx/airtel/fund-usd-with-ugx-airtel";
import FundNgnWithNgnCard from "@/pages/dashboard/wallet/deposit/ngn/ngn/ngn-card/fund-ngn-with-ngn-card";
import FundUsdWithKesMpesa from "@/pages/dashboard/wallet/deposit/usd/kes/m-pesa/fund-usd-with-kes-mpesa";
import FundNgnWithNgnVirtualAccount from "@/pages/dashboard/wallet/deposit/ngn/ngn/virtual-account/fund-ngn-with-ngn-virtual-account";
import FundNgnWithNgnRiseWallet from "@/pages/dashboard/wallet/deposit/ngn/ngn/rise-wallet/fund-ngn-with-ngn-rise-wallet";
import FundUsdWithGhsMTN from "@/pages/dashboard/wallet/deposit/usd/ghs/mtn/fund-usd-with-ghs-mtn";
import FundUsdWithGhsVodafone from "@/pages/dashboard/wallet/deposit/usd/ghs/vodafone/fund-usd-with-ghs-airtel";
import ConvertFunds from "@/pages/dashboard/wallet/convert/convert";
import FundUsdWithUsdRiseWallet from "@/pages/dashboard/wallet/deposit/usd/usd/rise-wallet/fund-with-rise";
import FundUsdWithNgnCard from "@/pages/dashboard/wallet/deposit/usd/ngn/ngn-card/fund-usd-with-ngn-card";
import ProfileBanksAndCards from "@/pages/dashboard/profile/_components/profile-banks-and-cards";
import FundCryptoWithFiat from "@/pages/dashboard/wallet/deposit/crypto/usdt/yellow-card/fund-crypto-with-usdt-yellow-card";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <AuthGuard />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: "assets",
            children: [
              {
                index: true,
                element: <Assets />,
              },
              {
                path: ":assetId",
                element: <AssetDetailsInvest />,
              },
            ],
          },
          {
            path: "wallet",
            element: <Wallet />,
            children: [
              {
                index: true,
                element: <WalletPage />,
              },
              {
                path: "deposit",
                // element: <DepositLayout />,
                children: [
                  {
                    index: true,
                    element: <Deposit />,
                  },
                  // --- USD BASED ROUTES ---
                  {
                    path: "usd/ngn/ngn-card",
                    element: <FundUsdWithNgnCard />,
                  },
                  {
                    path: "usd/usd/rise-wallet",
                    element: <FundUsdWithUsdRiseWallet />,
                  },
                  {
                    path: "usd/usd/usd-card",
                    element: <FundUsdWithUsdCard />,
                  },
                  {
                    path: "usd/usd/bank-account",
                    element: <FundUsdWithBankAccount />,
                  },
                  {
                    path: "usd/ghs/mtn",
                    element: <FundUsdWithGhsMTN />,
                  },
                  {
                    path: "usd/ghs/vodafone",
                    element: <FundUsdWithGhsVodafone />,
                  },
                  {
                    path: "usd/ghs/tigo",
                    element: <FundUsdWithGhsTigo />,
                  },
                  {
                    path: "usd/ugx/mtn",
                    element: <FundUsdWithUgxMTN />,
                  },
                  {
                    path: "usd/ugx/airtel",
                    element: <FundUsdWithUgxAirtel />,
                  },
                  {
                    path: "usd/kes/mpesa",
                    element: <FundUsdWithKesMpesa />,
                  },

                  // --- NGN BASED ROUTES ---
                  {
                    path: "ngn/ngn/virtual-account",
                    element: <FundNgnWithNgnVirtualAccount />,
                  },
                  {
                    path: "ngn/ngn/ngn-card",
                    element: <FundNgnWithNgnCard />,
                  },
                  {
                    path: "ngn/ngn/rise-wallet",
                    element: <FundNgnWithNgnRiseWallet />,
                  },

                  // --- CRYPTO BASED ROUTES ---
                  {
                    path: "crypto/usdt",
                    element: <CryptoDeposit />,
                  },
                  {
                    path: "crypto/usdc",
                    element: <CryptoDeposit />,
                  },
                  {
                    path: "crypto/cngn",
                    element: <CryptoDeposit />,
                  },
                  {
                    path: "crypto/usdt/fiat",
                    element: <FundCryptoWithFiat />,
                  },

                  // --- FALLBACK ---
                  {
                    path: "*",
                    element: <Deposit404 />,
                  },
                ],
              },
              {
                path: "withdraw",
                element: <Withdraw />,
              },
              {
                path: "swap",
                element: <ConvertFunds />,
              },
            ],
          },
          {
            path: "markets",
            children: [
              {
                index: true,
                element: <Markets />,
              },
              {
                path: ":assetId",
                element: <AssetDetails />,
              },
            ],
          },
          {
            path: "liquidity",
            element: <Liquidity />,
            children: [
              {
                index: true,
                element: <AvailableLiquidity />,
              },
              {
                path: "my-investments",
                element: <MyInvestments />,
              },
            ],
          },
          {
            path: "portfolio",
            element: <Portfolio />,
            children: [
              {
                index: true,
                element: <MyAssets />,
              },
              {
                path: "watchlist",
                element: <Watchlist />,
              },
              {
                path: "matured",
                element: <Matured />,
              },
            ],
          },
          {
            path: "account",
            element: <Profile />,
            children: [
              { path: "profile", element: <ProfilePage /> },
              { path: "user", element: <ProfilePage /> },
              { path: "leaderboard", element: <ProfileLeaderboard /> },
              { path: "kyc", element: <ProfileKYC /> },
              { path: "security", element: <ProfileSecurity /> },
              { path: "referrals", element: <ProfileReferrals /> },
              { path: "banks-and-cards", element: <ProfileBanksAndCards /> },
              {
                path: "account-statement",
                element: <ProfileAccountStatement />,
              },
              {
                path: "investment-certificate",
                element: <ProfileInvestmentCertificate />,
              },
              { path: "contact-us", element: <ProfileContactUs /> },
              { path: "delete-account", element: <ProfileDeleteAccount /> },
            ],
          },
          {
            path: "*",
            element: <Onboarding404 />,
          },
        ],
      },
    ],
  },
];
