export type Promotion = {
    _id: string;
    name: string;
    franchise_id: string;
    product_franchise_id: string;
    type: string;
    value: number;
    start_date: string;
    end_date: string;
    created_by: string;
    is_active: boolean;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    __v: number;
}

export type Voucher = {
  _id: string;
  code: string;
  franchise_id: string;
  product_franchise_id: string | "";
  name: string;
  description: string;
  type: "PERCENT" | "FIXED";
  value: number;
  quota_total: number;
  quota_used: number;
  start_date: string;
  end_date: string;
  created_by: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  __v: number;
}