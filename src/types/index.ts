export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export interface Order {
  id: string;
  customerName: string;
  status: "processing" | "shipped" | "delivered";
  amount: number;
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
}

export interface DashboardStat {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  lowStockProducts: number;
}
