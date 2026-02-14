import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import "../../styles/sidebar.css";

const Sidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { list: categories } = useAppSelector((state) => state.categories);

    // Lấy trạng thái từ URL để "tích" vào các ô tương ứng
    const currentCat = searchParams.get("category");
    const currentSub = searchParams.get("sub");

    const handleFilter = (catId: string, subName?: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("category", catId);
        newParams.set("page", "1"); // Reset về trang 1 khi lọc mới

        if (subName) {
            newParams.set("sub", subName);
        } else {
            newParams.delete("sub"); // Nếu nhấn vào cate cha thì bỏ lọc sub
        }
        setSearchParams(newParams);
    };

    return (
        <aside className="product-sidebar">
            <h3 className="sidebar-title">Danh mục</h3>
            <div className="filter-list">
                {categories.map((cat) => (
                    <div key={cat.id} className="filter-item">
                        <div
                            className={`category-parent ${currentCat === cat.id ? "active" : ""}`}
                            onClick={() => handleFilter(cat.id)}
                        >
                            {cat.name}
                        </div>

                        {/* Hiện sub-category nếu category cha đang được chọn */}
                        {currentCat === cat.id && cat.subs && (
                            <ul className="sub-category-list">
                                {cat.subs.map((sub) => (
                                    <li
                                        key={sub}
                                        className={currentSub === sub ? "active-sub" : ""}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Không cho nảy lên cate cha
                                            handleFilter(cat.id, sub);
                                        }}
                                    >
                                        {/* Bạn có thể thêm thẻ <input type="checkbox" readOnly checked={currentSub === sub} /> ở đây */}
                                        {sub}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;