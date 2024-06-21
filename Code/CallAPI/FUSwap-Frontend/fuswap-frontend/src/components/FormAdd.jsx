import Footer from "../components/Footer.jsx";
import CHeader from "../components/CHeader.jsx";
import Cookies from "js-cookie";
import '../styles/styles.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";

const baseURL = "http://localhost:8080/api/v1/customer/category";

const initialState = {
    cateName: '',
    available: '',
    delete: false,
    muserName: "admin"
}

const error_init = {
    cateName_err: '',
    available_err: '',
}

export default function CDashboard() {

    //check if there is 'sessionid' in the cookie
    const navigate = useNavigate();
    useEffect(() => {
        const sessionCookie = Cookies.get("sessionid");
        if (!sessionCookie) {
            //navigate to homepage if not logged in (or no cookie or expired cookie)
            navigate("/");
        }
    }, [navigate]);

    const [state, setState] = useState(initialState);
    const { cateName, available } = state;
    const [errors, setErrors] = useState(error_init);

    //add new category ( call api by POST )
    const addNewCategory = async (data) => {
        const response = await axios.post(baseURL, data, {withCredentials: true, responseType: "json"});
        if (response.status === 200 || response.status === 201) {
            toast.success(response.data.message);
            navigate('/customer/dashboard');
        } else if(response.status === 400 || response.status === 403) {
            toast.success(response.data.message);
            navigate('/customer/dashboard');
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            addNewCategory(state)
        } else {
            toast.error("Some info is invalid ~ Pls check again");
        }
    }
    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setState((state) => ({ ...state, [name]: value }));
    }

    //simple validation
    const validateForm = () => {
        let isValid = true;
        let errors = { ...error_init };

        if (cateName.trim().length < 5) {
            errors.cateName_err = 'Category name must be more than 4 words';
            isValid = false;
        }

        if(!(available.trim().toLowerCase() === "true" || available.trim().toLowerCase() === "false")) {
            errors.available_err = 'TRUE or FALSE';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    }

    return (
        <>
            <CHeader/>
            <div className='container'>
                <div className="form">
                    <h2>Add New Category</h2>
                    <form onSubmit={handleSubmit}>

                         {/*The field to call to get the data must match*/}
                         {/*    the field on the back-end OR match the returned json*/}

                        <div>
                            <label htmlFor="cateName">Category name: </label>
                            <input type="text" name='cateName' value={state.cateName} onChange={handleInputChange}/>
                            {errors.cateName_err && <span className='error'>{errors.cateName_err}</span>}
                        </div>
                        <div>
                            <label htmlFor="available">Available: </label>
                            <input type="text" name='available' value={state.available} onChange={handleInputChange}/>
                            {errors.available_err && <span className='error'>{errors.available_err}</span>}
                        </div>
                        <div>
                            <input type="hidden" name='delete' value={state.delete} onChange={handleInputChange}/>
                        </div>
                        <div>
                            <label htmlFor="muserName">Manager: </label>
                            <input type="text" name='muserName' value={state.muserName} onChange={handleInputChange} readOnly/>
                        </div>
                        <button type='submit' className='form-button'>Submit</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
}
