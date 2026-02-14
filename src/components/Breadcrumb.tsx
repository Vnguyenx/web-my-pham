
import { Link } from "react-router-dom";
import "../styles/breadcrumb.css";

export interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface Props {
    items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: Props) => {
    return (
        <nav className="breadcrumb">
            {items.map((item, index) => (
                <span key={index} className="breadcrumb-item">
                    {/* Nếu có path → render Link */}
                    {item.path ? (
                        <Link to={item.path}>{item.label}</Link>
                    ) : (
                        <span className="current">{item.label}</span>
                    )}

                    {/* Dấu phân cách */}
                    {index < items.length - 1 && (
                        <span className="separator">›</span>
                    )}
                </span>
            ))}
        </nav>
    );
};

export default Breadcrumb;
