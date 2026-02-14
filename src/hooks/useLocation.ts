// src/hooks/useLocation.ts
import { useState, useEffect, useCallback } from "react";
import { locationApi } from "../api/locationApi";

export const useLocation = (initialDetail: string = "") => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [addressDetail, setAddressDetail] = useState(initialDetail);
    const [locationNames, setLocationNames] = useState({ p: "", d: "", w: "" });

    // Load tỉnh thành lần đầu
    useEffect(() => {
        locationApi.getProvinces().then(setProvinces);
    }, []);

    // Hàm tạo chuỗi địa chỉ tổng hợp
    const generateFullAddress = useCallback((detail: string, names: typeof locationNames) => {
        return [detail, names.w, names.d, names.p]
            .filter(part => part && part.trim() !== "")
            .join(", ");
    }, []);

    // Xử lý chọn Tỉnh
    const handleProvinceChange = async (code: number, name: string) => {
        const updatedNames = { p: name, d: "", w: "" };
        setLocationNames(updatedNames);
        setWards([]);

        if (code) {
            const data = await locationApi.getDistricts(code);
            setDistricts(data);
        } else {
            setDistricts([]);
        }
        return generateFullAddress(addressDetail, updatedNames);
    };

    // Xử lý chọn Huyện
    const handleDistrictChange = async (code: number, name: string) => {
        const updatedNames = { ...locationNames, d: name, w: "" };
        setLocationNames(updatedNames);

        if (code) {
            const data = await locationApi.getWards(code);
            setWards(data);
        } else {
            setWards([]);
        }
        return generateFullAddress(addressDetail, updatedNames);
    };

    // Xử lý chọn Xã
    const handleWardChange = (name: string) => {
        const updatedNames = { ...locationNames, w: name };
        setLocationNames(updatedNames);
        return generateFullAddress(addressDetail, updatedNames);
    };

    // Xử lý nhập số nhà
    const handleDetailChange = (detail: string) => {
        setAddressDetail(detail);
        return generateFullAddress(detail, locationNames);
    };

    return {
        provinces, districts, wards,
        handleProvinceChange,
        handleDistrictChange,
        handleWardChange,
        handleDetailChange,
        addressDetail
    };
};