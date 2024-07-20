import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../Address/AddressStyle.css';
import PropTypes from "prop-types";

const cityUrl = "http://localhost:8080/api/v1/guest/cities";
const districtUrl = "http://localhost:8080/api/v1/guest/districts";
const wardUrl = "http://localhost:8080/api/v1/guest/wards";

export default function Address({ onCityChange, onDistrictChange, onWardChange, cityId, districtId, wardId }) {
    const [selectedCity, setSelectedCity] = useState(cityId);
    const [selectedDistrict, setSelectedDistrict] = useState(districtId);
    const [selectedWard, setSelectedWard] = useState(wardId);
    const[cities, setCities] = useState([]);
    const[districts, setDistricts] = useState([]);
    const[wards, setWards] = useState([]);

    useEffect(() => {
        setSelectedCity(cityId);
        setSelectedDistrict(districtId);
        setSelectedWard(wardId);
    }, [cityId, districtId, wardId]);

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
                    if(districtId && wardId) {
                        setSelectedDistrict(districtId);
                        setSelectedWard(wardId);
                    } else {
                        setSelectedDistrict('');
                        setSelectedWard('');
                    }
                } catch (error) {
                    console.error('Error getting list of district data', error);
                }
            } else {
                setDistricts([]);
                setWards([]);
                if(districtId && wardId) {
                    setSelectedDistrict(districtId);
                    setSelectedWard(wardId);
                } else {
                    setSelectedDistrict('');
                    setSelectedWard('');
                }
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
                    if(wardId) {
                        setSelectedWard(wardId);
                    } else {
                        setSelectedWard('');
                    }
                } catch (error) {
                    console.error('Error getting list of ward data', error);
                }
            } else {
                setWards([]);
                if(wardId) {
                    setSelectedWard(wardId);
                } else {
                    setSelectedWard('');
                }
            }
        }
        getWardList();
        const selectedDistrictObj = districts.find(district => district.districtId === parseInt(selectedDistrict));
        onDistrictChange(selectedDistrict, selectedDistrictObj?.districtName || '');
    }, [selectedCity, selectedDistrict, districts, onDistrictChange]);

    return (
        <div className='address-contain'>
            <div className='address-content'>
                <select
                    className='address-select select-1'
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                >
                    <option value="" hidden>Select City</option>
                    {cities.map((city) => (
                        <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
                    ))}
                </select>
            </div>
            <div className='address-content'>
                <select
                    className='address-select select-2'
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                    <option value="" hidden>Select District</option>
                    {districts.map((district) => (
                        <option key={district.districtId} value={district.districtId}>{district.districtName}</option>
                    ))}
                </select>
            </div>
            <div className='address-content'>
                <select
                    className='address-select select-3'
                    value={selectedWard}
                    onChange={(e) => setSelectedWard(e.target.value)}
                >
                    <option value="" hidden>Select Ward</option>
                    {wards.map((ward) => (
                        <option key={ward.wardId} value={ward.wardId}>{ward.wardName}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

Address.propTypes = {
    onCityChange: PropTypes.func.isRequired,
    onDistrictChange: PropTypes.func.isRequired,
    onWardChange: PropTypes.func.isRequired,
    cityId: PropTypes.number.isRequired,
    districtId: PropTypes.number.isRequired,
    wardId: PropTypes.number.isRequired,
};