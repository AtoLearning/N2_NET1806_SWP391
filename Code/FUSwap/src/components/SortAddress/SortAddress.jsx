import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, SelectItem } from "@nextui-org/react";
import './SortAddressStyle.css';

const baseURL = "http://localhost:8080/api/v1/guest";

export default function SortAddress({ onSort }) {
    // Khai báo các biến state
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    // Hàm gọi API để lấy danh sách thành phố
    const getCities = async () => {
        try {
            const response = await axios.get(`${baseURL}/cities`, { withCredentials: true });
            if (response.status === 200) {
                setCities(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Hàm gọi API để lấy danh sách quận/huyện dựa trên thành phố đã chọn
    const getDistricts = async (city) => {
        try {
            const response = await axios.get(`${baseURL}/districts`, {
                params: { city },
                withCredentials: true
            });
            if (response.status === 200) {
                setDistricts(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Hàm gọi API để lấy danh sách phường/xã dựa trên quận/huyện đã chọn
    const getWards = async (district) => {
        try {
            const response = await axios.get(`${baseURL}/wards`, {
                params: { district },
                withCredentials: true
            });
            if (response.status === 200) {
                setWards(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect để gọi API khi component được mount
    useEffect(() => {
        getCities();
    }, []);

    // useEffect để gọi API khi thành phố được chọn thay đổi
    useEffect(() => {
        if (selectedCity) {
            getDistricts(selectedCity);
        }
    }, [selectedCity]);

    // useEffect để gọi API khi quận/huyện được chọn thay đổi
    useEffect(() => {
        if (selectedDistrict) {
            getWards(selectedDistrict);
        }
    }, [selectedDistrict]);

    // Hàm xử lý khi người dùng chọn thành phố, quận/huyện, hoặc phường/xã
    const handleSort = (option, value) => {
        if (option === 'city') {
            setSelectedCity(value);
            setSelectedDistrict('');
            setSelectedWard('');
        } else if (option === 'district') {
            setSelectedDistrict(value);
            setSelectedWard('');
        } else if (option === 'ward') {
            setSelectedWard(value);
        }
        onSort({ option, value });
    };

    // JSX trả về hiển thị giao diện chọn thành phố, quận/huyện, phường/xã
    return (
        <div className="sort-address-container">
            <div className="sort-by">Sorted by:</div>
            <div className="sort-options">
                <Select
                    label="City"
                    placeholder="Select a city"
                    onChange={(e) => handleSort('city', e.target.value)}
                    className="sort-select"
                    value={selectedCity}
                >
                    {cities.map((city) => (
                        <SelectItem key={city.id} value={city.name}>{city.name}</SelectItem>
                    ))}
                </Select>

                <Select
                    label="District"
                    placeholder="Select a district"
                    onChange={(e) => handleSort('district', e.target.value)}
                    className="sort-select"
                    value={selectedDistrict}
                    disabled={!selectedCity}
                >
                    {districts.map((district) => (
                        <SelectItem key={district.id} value={district.name}>{district.name}</SelectItem>
                    ))}
                </Select>

                <Select
                    label="Ward"
                    placeholder="Select a ward"
                    onChange={(e) => handleSort('ward', e.target.value)}
                    className="sort-select"
                    value={selectedWard}
                    disabled={!selectedDistrict}
                >
                    {wards.map((ward) => (
                        <SelectItem key={ward.id} value={ward.name}>{ward.name}</SelectItem>
                    ))}
                </Select>
            </div>
        </div>
    );
}
