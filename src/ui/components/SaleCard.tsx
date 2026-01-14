interface SaleCardProps {
  id: number;
  product: string;
  unitPrice: number;
  quantity: number;
  discount: number;
  customer: string;
  createdAt: Date;
}

export default function SaleCard({
  id,
  product,
  unitPrice,
  quantity,
  discount,
  customer,
  createdAt,
}: SaleCardProps) {
  return (
    <div className="sale-card">
      {String(
        id + product + unitPrice + quantity + discount + customer + createdAt
      )}
    </div>
  );
}
