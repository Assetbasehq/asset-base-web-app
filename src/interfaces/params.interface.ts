export interface IParams {
  page?: string;
  limit?: string;
  search?: string;
  type?: string;
  offset?: string;
  start_date?: string;
  end_date?: string;
  currency?: string;
  [key: string]: any;
  //   availability?: string[];
  //   pricingModel?: "hourly" | "daily" | "weekly" | "monthly";
  //   amenities?: string[];
}
