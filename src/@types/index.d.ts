import { RsInvoiceNotPaid } from "./index.d";
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
  roleId: number;
}

export interface UserUpdate {
  id?: number;
  fullName: string;
  email: string;
  role_id: number;
}

export interface UserCreateInter {
  fullName: string;
  password: string;
  email: string;
  role_id: number;
}

export interface UserRow {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
  active: boolean;
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
  sell_by: string;
  exempt: boolean;
}

export interface ListProducts {
  products: Product[];
}

export interface Product {
  name: string;
  sell_by: string;
  quantity: number;
  code: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  id: number;
  exempt: boolean;
}

export interface DataProductRow {
  id: number;
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
  date: string;
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
  iva: number;
  total: number;
}

export interface Purchase {
  total_invoice: number;
  status: boolean;
  subtotal: number;
  payment_method?: string;
  num_operation?: string;
  full_name_client?: string;
  identification?: string;
  client_id?: number;
}

export interface Detail {
  product_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  total_line: number;
  iva: number;
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
  date: string;
  paymentMethod: string;
  numOperation?: string;
  user: User;
  client_id?: number;
}

export interface InvoiceCli {
  id: number;
  totalInvoice: string;
  userId: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
  numOperation?: string;
  date: string;
  client_id: number;
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
  totalInvoice: number;
  userId: number;
  date: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
  numOperation: string;
  user: User;
  subtotal: number;
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

export type ListClient = Client[];

export interface Client {
  id: number;
  fullName: string;
  identification: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientInvoices {
  id: number;
  fullName: string;
  identification: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  invoices: InvoiceCli[];
}

export interface ClientTable {
  fullName: string;
  identification: string;
  phone?: string;
  createdAt: string;
  id: number;
}

export type ListClientTable = ClientTable[];

export interface InvoiceFilePDF {
  file: string;
}

export interface IvaResponse {
  active: boolean;
  createdAt: Date;
  id: number;
  updatedAt: Date;
  value: number;
}

export interface CommerceResponse {
  address: string;
  createdAt: Date;
  id: number;
  identification: string;
  name: string;
  phone: string;
  dolarRate: number;
  updatedAt: Date;
}

export interface CommerceCreate {
  name: string;
  identification: string;
  phone: string;
  address: string;
  dolarRate: number;
}

export interface RsInvoiceNotPaid {
  client: Client | null;
  clientId: number | null;
  createdAt: Date;
  date: Date;
  id: number;
  numOperation: string | null;
  paymentMethod: string;
  status: boolean;
  subtotal: string;
  totalInvoice: string;
  updatedAt: Date;
  user: User;
  userId: number;
}

export interface InvoicesNotPaidInter {
  total: number;
  invoices: RsInvoiceNotPaid[] | [];
}

export interface InvoicesNotPaidTable {
  id: number;
  client: string;
  total: number;
  date: string;
  responsible: string;
}

export interface PayDebt {
  paymentMethod: string;
  reference: string;
}

export interface ReportBestSelling {
  name: string;
  value: number;
}

export interface reportSells {
  date: string;
  totalInvoice: number;
}

export type Roles = Root2[];

export interface Role {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

