import { useLocation } from "react-router-dom";
import AfterSearchPost from "../../components/AllPostList/AfterSearchPost";
import FilterSearch from "../../components/FilterSearch/FilterSearch";
import FilterAddress from "../../components/FilterAddress/FilterAddress";
import './SearchPageStyle.css';
import {useCallback, useState} from "react";
import SortSearch from "../../components/SortSearch/SortSearch.jsx";

const initialState = {
    wardName: '',
    districtName: '',
    cityName: '',
    cateName: '',
    priceSort: '',
    dateSort: '',
    postType: ''

}

export default function SearchPage() {
    const [state, setState] = useState(initialState);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchValue = queryParams.get("searchValue") || "";

    const handleCityChange = useCallback((cityId, cityName) => {
        setState((prevState) => ({
            ...prevState,
            cityName: cityName
        }));
    }, []);
    const handleDistrictChange = useCallback((districtId, districtName) => {
        setState((prevState) => ({
            ...prevState,
            districtName: districtName
        }));
    }, []);
    const handleWardChange = useCallback((wardId, wardName) => {
        setState((prevState) => ({
            ...prevState,
            wardName: wardName
        }));
    }, []);
    const handleCateChange = useCallback((cateId, cateName) => {
        setState((prevState) => ({
            ...prevState,
            cateName: cateName
        }));
    }, []);
    const handlePriceSortChange = useCallback((priceSort) => {
        setState((prevState) => ({
            ...prevState,
            priceSort: priceSort
        }));
    }, []);
    const handleDateSortChange = useCallback((dateSort) => {
        setState((prevState) => ({
            ...prevState,
            dateSort: dateSort
        }));
    }, []);
    const handlePostTypeChange = useCallback((postType) => {
        setState((prevState) => ({
            ...prevState,
            postType: postType
        }));
    }, []);

    console.log(state.cateName)

    return (
        <main className="search-container">

                <div className="search-content-wrapper">
                    <FilterSearch
                        onCateChange={handleCateChange}
                        onPostTypeChange={handlePostTypeChange}
                    />
                </div>
                <div className="search-content">
                    <h2 className="section-title">Search results for keyword {searchValue}</h2>
                    <FilterAddress
                        onCityChange={handleCityChange}
                        onDistrictChange={handleDistrictChange}
                        onWardChange={handleWardChange}
                    />
                    <SortSearch
                        onPriceSortChange={handlePriceSortChange}
                        onDateSortChange={handleDateSortChange}
                    />
                    <AfterSearchPost
                        searchValue={searchValue === null ? '' : searchValue}
                        cityName={state.cityName === null ? '' : state.cityName}
                        districtName={state.districtName === null ? '' : state.districtName}
                        wardName={state.wardName === null ? '' : state.wardName}
                        priceSort={state.priceSort === null ? '' : state.priceSort}
                        dateSort={state.dateSort === null ? '' : state.dateSort}
                        postType={state.postType === null ? '' : state.postType}
                        cateName={state.cateName === null ? '' : state.cateName}
                    />
                </div>

        </main>
    );
}
