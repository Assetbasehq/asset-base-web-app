import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrders } from "@/hooks/use-orders";
import type { IOrder } from "@/interfaces/order.interface";
import { dateTimeService } from "@/services/date-time-service";
import { FormatService } from "@/services/format-service";
import { useAuthStore } from "@/store/auth-store";

export default function AssetOrderHistory() {
  const { user } = useAuthStore();
  const {
    data: orders,
    isLoading,
    isError,
  } = useOrders({
    sort: "asc",
    account_id: user?.account_id,
    limit: "5",
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  if (!orders) return <div>No orders found</div>;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-muted-foreground">
              Date
            </TableHead>
            <TableHead className="text-muted-foreground">Type</TableHead>
            <TableHead className="text-muted-foreground">
              Number of shares
            </TableHead>
            <TableHead className="text-left text-muted-foreground">
              Price per share
            </TableHead>
            <TableHead className="text-left text-muted-foreground">
              Amount
            </TableHead>
            <TableHead className="text-left text-muted-foreground">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.items?.map((order: IOrder) => (
            <TableRow key={order.transaction_id} className="text-custom-white">
              <TableCell className="font-medium">
                {dateTimeService.formatDateTime(order.created_at)}
              </TableCell>
              <TableCell className="text-left">
                {order.order_type === "bid" ? "Buy" : "Sell"}
              </TableCell>
              <TableCell className="text-left">
                {order.number_of_shares}
              </TableCell>
              <TableCell className="text-left">
                {order.price_per_share}
              </TableCell>
              <TableCell className="text-left">
                {FormatService.formatCurrency(
                  order.number_of_shares * order.price_per_share,
                  "usd"
                )}
              </TableCell>
              <TableCell className="text-left capitalize">
                {order.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
