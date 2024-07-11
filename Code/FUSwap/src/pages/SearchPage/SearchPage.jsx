import { useLocation } from "react-router-dom";
import AfterSearchPost from "../../components/AllPostList/AfterSearchPost";
import FilterSearch from "../../components/FilterSearch/FilterSearch";
import FilterAdress from "../../components/FilterAddress/FilterAddress";
import './SearchPageStyle.css';


export default function SearchPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("query") || "";

    return (
        <main className="search-container">

                <div className="search-content-wrapper">
                    <FilterSearch />
                </div>
                <div className="search-content">
                    <h2 className="section-title">Search results for keyword {searchQuery}</h2>
                    <FilterAdress />
                    <AfterSearchPost />
                </div>
            
        </main>
    );
}
