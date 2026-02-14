// src/api/locationApi.ts

const BASE_URL = "https://provinces.open-api.vn/api";

export const locationApi = {
    // Lấy danh sách Tỉnh/Thành
    getProvinces: async () => {
        const res = await fetch(`${BASE_URL}/p/`);
        return res.json();
    },

    // Lấy danh sách Quận/Huyện theo mã Tỉnh
    getDistricts: async (provinceCode: number) => {
        const res = await fetch(`${BASE_URL}/p/${provinceCode}?depth=2`);
        const data = await res.json();
        return data.districts;
    },

    // Lấy danh sách Phường/Xã theo mã Quận
    getWards: async (districtCode: number) => {
        const res = await fetch(`${BASE_URL}/d/${districtCode}?depth=2`);
        const data = await res.json();
        return data.wards;
    }
};