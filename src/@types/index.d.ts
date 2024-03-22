export interface ResponseLoginUser {
  user: User;
  token: string;
  type: string;
  expireAt: string;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  avatar: string;
  token: string;
}

export interface Credential {
  email: string;
  password: string;
}

export interface ResourceNotFound {
  status: number;
  message: string;
}

export interface ResourceError {
  status: number;
  message: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface ProductCreate {
  name: string;
  quantity: number;
  price: number;
}

export interface ListProducts {
  products: Product[];
}

export interface Product {
  name: string;
  quantity: number;
  code: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  id: number;
}

export interface DataProductRow {
  name: string;
  code: string;
  quantity: number;
  price: number;
  createdAt: string;
}

export interface OperationCreate {
  quantity: number;
  product_id: number;
  type_op: number;
}

export interface HistoryProductRoot {
  historyProduct: HistoryProduct;
}

export interface HistoryProduct {
  quantity: number;
  typeOp: number;
  productId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  id: number;
}

export interface DataListOperationRow {
  product: string;
  quantity: number;
  responsible: string;
  date: string;
  type_operation: number;
}

export interface ListOperationHistory {
  historyOperations: HistoryOperation[];
}

export interface HistoryOperation {
  id: number;
  quantity: number;
  typeOp: number;
  userId: number;
  productId: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
  user: User;
}

export interface DetailInvoiceRow {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Purchase {
  total_invoice: number;
  status: boolean;
  payment_method: string;
  num_operation?: string;
}

export interface Detail {
  product_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  total_line: number;
}

export interface Invoice {
  invoice: Purchase;
  details: Detail[];
}
export interface ListInvoices {
  invoices: InvoiceResponse[];
}

export interface InvoiceResponse {
  id: number;
  totalInvoice: string;
  userId: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
  numOperation?: string;
  user: User;
}

export interface PurchaseRow {
  id: number;
  user: string;
  method: string;
  status: string;
  num_operation: string;
  date: string;
  total: number;
}

export interface DetailInvoiceInter {
  id: number;
  totalInvoice: string;
  userId: number;
  date: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
  numOperation: any;
  user: User;
  detail_invoice: InfoDetailInvoice[];
}

export interface InfoDetailInvoice {
  id: number;
  invoiceId: number;
  productId: number;
  quantity: string;
  unitPrice: string;
  totalLine: string;
  createdAt: string;
  updatedAt: string;
  products: Product;
}

export interface Consolidate {
  invoices_consolidate: number;
  count_invoices: number;
  invoices: InvoiceResponse[];
  invoices_not_paid: number;
  invoices_paid: number;
}
21 de marzo de 2024