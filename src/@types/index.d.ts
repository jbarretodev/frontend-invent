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