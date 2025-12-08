import { ordersService } from "@/api/orders.api";
import ActionModal from "@/components/modals/action-modal";
import SuccessModal from "@/components/modals/success-modal";
import { Button } from "@/components/ui/button";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function AssetOpenOrders() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { user } = useAuthStore();

  const {
    data: orders,
    isLoading,
    isError,
  } = useOrders({
    status: "pending",
    sort: "asc",
    account_id: user?.account_id,
    limit: "5",
  });

  const deleteOrderMutation = useMutation({
    mutationFn: (orderId: string) => ordersService.deletePendingOrder(orderId),
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      setIsSuccessModalOpen(true);

      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.log({ error });
      setError(error.message);
    },
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
            <TableHead className="text-left text-muted-foreground">
              Action
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
              <TableCell className="text-left">
                <Button
                  onClick={() => {
                    setError(null);
                    setOrderId(order.id);
                    setIsDeleteModalOpen(true);
                  }}
                  className="cursor-pointer bg-fixed-ticker-red hover:bg-fixed-ticker-red/80 text-white"
                >
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ActionModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          if (!orderId) {
            setError("No order selected");
            return;
          }
          deleteOrderMutation.mutateAsync(orderId);
        }}
        isLoading={deleteOrderMutation.isPending}
        error={error}
        title="Cancel Order"
        description="Are you sure you want to cancel this order?"
        buttonText="Yes, cancel order"
        loadingButtonText="Cancelling..."
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Order Cancelled"
        description="Your order has been cancelled successfully."
        buttonText="Close"
      />
    </div>
  );
}
