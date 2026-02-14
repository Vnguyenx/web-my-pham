// Kiểu dữ liệu cho 1 comment / đánh giá sản phẩm
export interface Comment {
    id: number;          // id comment
    productId: number;   // id sản phẩm được comment
    userId: number;      // id người dùng comment
    rating: number;      // số sao (1 → 5)
    content: string;     // nội dung bình luận
    date: string;        // ngày comment (YYYY-MM-DD)
}
