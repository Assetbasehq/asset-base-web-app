import type { IAsset } from "./asset.interface";

export interface INotification {
  asset: IAsset;
  number_of_investors: string;
}
