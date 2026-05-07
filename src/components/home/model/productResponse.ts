export type size = {
    product_franchise_id: string;
    size: string;
    price: number;
    is_available: boolean;
}

export type Product = {
    product_id: string;
    category_id?: string;
    category_name?: string;
    category_display_order?: number;
    product_display_order?: number;
    SKU?: string;
    name: string;
    description: string;
    image_url: string;
    is_have_topping: boolean;
    sizes: size[];
}

