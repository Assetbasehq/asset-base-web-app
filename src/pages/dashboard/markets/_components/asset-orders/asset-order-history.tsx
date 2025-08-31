import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Order {
  date: string;
  type: string;
  side: "Buy" | "Sell";
  price: string;
  amount: string;
  action: string;
}

const orders: Order[] = [
  {
    date: "03-03-2025 09:49:56",
    type: "Market",
    side: "Buy",
    price: "38,538.42",
    amount: "0.25",
    action: "Cancel",
  },
  {
    date: "03-03-2025 10:15:22",
    type: "Limit",
    side: "Sell",
    price: "40,120.00",
    amount: "0.10",
    action: "Cancel",
  },
  {
    date: "03-03-2025 11:05:18",
    type: "Market",
    side: "Buy",
    price: "37,850.10",
    amount: "0.50",
    action: "Cancel",
  },
];
export default function AssetOrderHistory() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-muted-foreground">
              Date
            </TableHead>
            <TableHead className="text-muted-foreground">Type</TableHead>
            <TableHead className="text-muted-foreground">Side</TableHead>
            <TableHead className="text-left text-muted-foreground">
              Price
            </TableHead>
            <TableHead className="text-left text-muted-foreground">
              Amount
            </TableHead>
            <TableHead className="text-left text-muted-foreground">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{order.date}</TableCell>
              <TableCell className="text-left">{order.type}</TableCell>
              <TableCell className="text-left">{order.side}</TableCell>
              <TableCell className="text-left">{order.price}</TableCell>
              <TableCell className="text-left">{order.amount}</TableCell>
              <TableCell className="text-left">{order.action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
