import '../../styles/CheckoutForm.css';
import { useLocation } from '../../hooks/useLocation';

interface Props {
    formData: any;
    setFormData: (data: any) => void;
}

const CheckoutForm = ({ formData, setFormData }: Props) => {
    const {
        provinces, districts, wards,
        handleProvinceChange, handleDistrictChange, handleWardChange, handleDetailChange
    } = useLocation(formData.addressDetail);

    const updateFormAddress = (fullAddress: string, detail?: string) => {
        setFormData((prev: any) => ({
            ...prev,
            address: fullAddress,
            ...(detail !== undefined && { addressDetail: detail })
        }));
    };

    return (
        <div className="checkout-form">
            <h3>Thông Tin Giao Hàng</h3>
            <div className="form-row">
                <input name="name" placeholder="Họ và tên *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                <input name="phone" placeholder="Số điện thoại *" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
            </div>

            <div className="location-selectors">

                <select name="ward" onChange={async (e) => {
                    const addr = await handleProvinceChange(Number(e.target.value), e.target.options[e.target.selectedIndex].text);
                    updateFormAddress(addr);
                }}>
                    <option value="">Chọn Tỉnh/Thành</option>
                    {provinces.map((p: any) => <option key={p.code} value={p.code}>{p.name}</option>)}
                </select>

                <select name="ward" disabled={!districts.length} onChange={async (e) => {
                    const addr = await handleDistrictChange(Number(e.target.value), e.target.options[e.target.selectedIndex].text);
                    updateFormAddress(addr);
                }}>
                    <option value="">Chọn Quận/Huyện</option>
                    {districts.map((d: any) => <option key={d.code} value={d.code}>{d.name}</option>)}
                </select>

                <select name="ward" disabled={!wards.length} onChange={(e) => {
                    const addr = handleWardChange(e.target.options[e.target.selectedIndex].text);
                    updateFormAddress(addr);
                }}>
                    <option value="">Chọn Phường/Xã</option>
                    {wards.map((w: any) => <option key={w.code} value={w.code}>{w.name}</option>)}
                </select>
            </div>

            <div className="form-group">
                <input
                    name="addressDetail"
                    placeholder="Số nhà, tên đường..."
                    onChange={(e) => {
                        const detail = e.target.value;
                        const addr = handleDetailChange(detail);
                        updateFormAddress(addr, detail);
                    }}
                    required
                />
            </div>

            {/* Hiển thị địa chỉ xem trước để User kiểm tra */}
            <p className="address-preview">Giao đến: {formData.address}</p>
        </div>
    );
};

export default CheckoutForm;