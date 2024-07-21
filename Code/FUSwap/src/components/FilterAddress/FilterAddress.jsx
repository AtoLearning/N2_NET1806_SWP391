import React, { useState, useEffect } from "react";
import axios from "axios";
import './FilterAddressStyle.css';
import PropTypes from "prop-types";

const cityUrl = "http://localhost:8080/api/v1/guest/cities";
const districtUrl = "http://localhost:8080/api/v1/guest/districts";
const wardUrl = "http://localhost:8080/api/v1/guest/wards";

export default function FilterAddress({ onCityChange, onDistrictChange, onWardChange }) {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const[cities, setCities] = useState([]);
    const[districts, setDistricts] = useState([]);
    const[wards, setWards] = useState([]);

    useEffect(() => {
        const selectedWardObj = wards.find(ward => ward.wardId === parseInt(selectedWard));
        onWardChange(selectedWard, selectedWardObj?.wardName || '');
    }, [selectedWard, wards, onWardChange]);

    useEffect(() => {
        const getCityList = async () => {
            try {
                const response = await axios.get(cityUrl, {withCredentials: true});
                setCities(response.data.obj);
            } catch (error) {
                console.error('Error getting list of city data', error);
            }
        }

        getCityList();
    }, []);

    useEffect(() => {
        const getDistrictList = async () => {
            if (selectedCity) {
                try {
                    const response = await axios.get(districtUrl, {
                        params: {
                            cityId: selectedCity
                        },
                        withCredentials: true});
                    setDistricts(response.data.obj);
                    setWards([]);
                    setSelectedDistrict('');
                    setSelectedWard('');
                } catch (error) {
                    console.error('Error getting list of district data', error);
                }
            } else {
                setDistricts([]);
                setWards([]);
                setSelectedDistrict('');
                setSelectedWard('');
            }
        }
        getDistrictList();
        const selectedCityObj = cities.find(city => city.cityId === parseInt(selectedCity));
        onCityChange(selectedCity, selectedCityObj?.cityName || '');
    }, [selectedCity, cities, onCityChange]);

    useEffect(() => {
        const getWardList = async () => {
            if (selectedCity && selectedDistrict) {
                try {
                    const response = await axios.get(wardUrl, {
                        params: {
                            districtId: selectedDistrict
                        },
                        withCredentials: true
                    });
                    setWards(response.data.obj);
                    setSelectedWard('');
                } catch (error) {
                    console.error('Error getting list of ward data', error);
                }
            } else {
                setWards([]);
                setSelectedWard('');
            }
        }
        getWardList();
        const selectedDistrictObj = districts.find(district => district.districtId === parseInt(selectedDistrict));
        onDistrictChange(selectedDistrict, selectedDistrictObj?.districtName || '');
    }, [selectedCity, selectedDistrict, districts, onDistrictChange]);
    return (
        <div className="sort-address-container">

            <div className="sort-options">
                <select
                    className='address-select select-1'
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
                    ))}
                </select>

                <select
                    className='address-select select-2'
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                        <option key={district.districtId} value={district.districtId}>{district.districtName}</option>
                    ))}
                </select>

                <select
                    className='address-select select-3'
                    value={selectedWard}
                    onChange={(e) => setSelectedWard(e.target.value)}
                >
                    <option value="">Select Ward</option>
                    {wards.map((ward) => (
                        <option key={ward.wardId} value={ward.wardId}>{ward.wardName}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

FilterAddress.propTypes = {
    onCityChange: PropTypes.func.isRequired,
    onDistrictChange: PropTypes.func.isRequired,
    onWardChange: PropTypes.func.isRequired
};
