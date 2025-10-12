export interface IParams {
  page?: number | string;
  limit?: number | string;
  search?: string;
  type?: string;
  offset?: string;
  [key: string]: any;
  //   availability?: string[];
  //   pricingModel?: "hourly" | "daily" | "weekly" | "monthly";
  //   amenities?: string[];
}
