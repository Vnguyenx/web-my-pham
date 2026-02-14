export interface Product {
    id: number;
    name: string;

    category: string;
    subCategory: string;
    brand: string;

    price: number;
    priceRoot: number;
    discountPercent: number;

    image: string;

    rating: number;
    stock: number;
    sold: number;

    descriptionShort: string;
    descriptionDetail: string;

    benefits: string[];
    usage: string[];

    specs: {
        volume: string;
        origin: string;
        skinType: string;
        expiry: string;
    };
}
