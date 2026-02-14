import { Product } from './Product';

export interface WishlistItem {
    id: number;
    userId: number;
    productId: number;
    createdAt?: string;
    product: Product;
}

export interface CreateWishlistDto {
    userId: number;
    productId: number;
}