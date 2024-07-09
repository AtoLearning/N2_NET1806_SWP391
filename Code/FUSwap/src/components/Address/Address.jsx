import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../Address/AddressStyle.css';

const cities = [
    { CityID: 1, CityName: 'Hồ Chí Minh' },
    { CityID: 2, CityName: 'Hà Nội' },
    { CityID: 3, CityName: 'Đà Nẵng' },
    { CityID: 4, CityName: 'Huế' },
    { CityID: 5, CityName: 'Phan Rang – Tháp Chàm' },
    { CityID: 6, CityName: 'Bà Rịa - Vũng Tàu' },
    { CityID: 7, CityName: 'An Giang' },
    { CityID: 8, CityName: 'Lào Cai' },
    { CityID: 9, CityName: 'Yên Bái' },
    { CityID: 10, CityName: 'Phú Thọ' },

];
const districts = [
    { DistrictID: 1, DistrictName: 'Quận 1' },
    { DistrictID: 2, DistrictName: 'Quận 3' },
    { DistrictID: 3, DistrictName: 'Hai Bà Trưng' },
    { DistrictID: 4, DistrictName: 'Ngũ Hành Sơn' },
];

const wards = [
    { WardID: 1, WardName: 'Dương Minh Châu' },
    { WardID: 2, WardName: 'Phường 13' },
    { WardID: 3, WardName: 'Phường 20' },
    { WardID: 4, WardName: 'Phường 17' },
];

export default function Address({ onCityChange, onDistrictChange, onWardChange }) {
    // const [cities, setCities] = useState([]);
    // const [districts, setDistricts] = useState([]);
    // const [wards, setWards] = useState([]);

    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    useEffect(() => {
        onCityChange(selectedCity);
        setSelectedDistrict('');
        setSelectedWard('');
    }, [selectedCity, onCityChange]);

    useEffect(() => {
        onDistrictChange(selectedDistrict);
        setSelectedWard('');
    }, [selectedDistrict, onDistrictChange]);

    useEffect(() => {
        onWardChange(selectedWard);
    }, [selectedWard, onWardChange]);

    // useEffect(() => {
    //     const getCityList = async () => {
    //         try {
    //             const response = await axios.get('');
    //             setCities(response.data);
    //         } catch (error) {
    //             console.error('Error getting list of city data', error);
    //         }
    //     }

    //     getCityList();
    // }, []);

    // useEffect(() => {
    //     const getDistrictList = async () => {
    //         if (selectedCity) {
    //             try {
    //                 const response = await axios.get('');
    //                 setDistricts(response.data);
    //                 setWards([]);
    //                 setSelectedDistrict('');
    //                 setSelectedWard('');
    //             } catch (error) {
    //                 console.error('Error getting list of district data', error);
    //             }
    //         } else {
    //             setDistricts([]);
    //             setWards([]);
    //             setSelectedDistrict('');
    //             setSelectedWard('');
    //         }
    //     }
    //     getDistrictList();
    //     onCityChange(selectedCity);
    // }, [selectedCity]);

    // useEffect(() => {
    //     const getWardList = async () => {
    //         if (selectedCity && selectedDistrict) {
    //             try {
    //                 const response = await axios.get('');
    //                 setWards(response.data);
    //                 setSelectedWard('');
    //             } catch (error) {
    //                 console.error('Error getting list of ward data', error);
    //             }
    //         } else {
    //             setWards([]);
    //             setSelectedWard('');
    //         }
    //     }
    //     getWardList();
    //     onDistrictChange(selectedDistrict);
    // }, [selectedCity, selectedDistrict]);

    // useEffect(() => {
    //     onWardChange(selectedWard);
    //   }, [selectedWard, onWardChange]);

    return (
        <div className='address-contain'>
            <div className='address-content'>
                <select
                    className='address-select select-1'
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city.CityID} value={city.CityID}>{city.CityName}</option>
                    ))}
                </select>
            </div>
            <div className='address-content'>
                <select
                    className='address-select select-2'
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                        <option key={district.DistrictID} value={district.DistrictID}>{district.DistrictName}</option>
                    ))}
                </select>
            </div>
            <div className='address-content'>
                <select
                    className='address-select select-3'
                    value={selectedWard}
                    onChange={(e) => setSelectedWard(e.target.value)}
                >
                    <option value="">Select Ward</option>
                    {wards.map((ward) => (
                        <option key={ward.WardID} value={ward.WardID}>{ward.WardName}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
