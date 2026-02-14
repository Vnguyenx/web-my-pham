// src/components/RatingStars.tsx
interface Props {
    rating: number;
    max?: number;
    onSelect?: (value: number) => void; // Thêm prop này để xử lý khi người dùng chọn sao
}

const Rating = ({ rating, max = 5, onSelect }: Props) => {
    return (
        <div className="rating">
            <div className="stars-interactive">
                {[...Array(max)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <span
                            key={index}
                            className="star"
                            onClick={() => onSelect?.(starValue)} // Gọi hàm chọn nếu có
                            style={{
                                cursor: onSelect ? 'pointer' : 'default',
                                color: starValue <= rating ? '#ffc107' : '#e4e5e9',
                                fontSize: '20px'
                            }}
                        >
                            ★
                        </span>
                    );
                })}
            </div>
            <span className="rating-value">
                {rating} / {max}
            </span>
        </div>
    );
};

export default Rating;