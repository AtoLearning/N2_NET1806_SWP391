import Footer from "../components/Footer.jsx";
import CHeader from "../components/CHeader.jsx";
import '../styles/styles.css';
import {useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";

const baseURL = "http://localhost:8080/api/v1/customer/category";

const initialState = {
    cateName: '',
    available: '',
    isDelete: false,
    muserName: "admin"
}

const error_init = {
    cateName_err: '',
    available_err: '',
}

export default function CDashboard() {

    const { cateId } = useParams();
    const [state, setState] = useState(initialState);
    const {cateName, available} = state;
    const [errors, setErrors] = useState(error_init);
    const [category, setCategory] = useState({});

    //get info of category is chosen ( call api by GET )
    useEffect(() => {
        const getCategory = async (cateId) => {
            try {
                const response = await axios.get(`${baseURL}/${cateId}`, { withCredentials: true });
                if(response.status === 200) {
                    // if the back-end returns a json file with the required data, get it
                    setCategory(response.data.obj);
                }
            } catch (error) {
                //if not, console.log the error
                console.log(error);
            }
        };
        getCategory(cateId);
    }, [cateId]);

    //update info of category is chosen ( call api by PUT )
    const updateCategory = async (cateId, data) => {
        const response = await axios.put(`${baseURL}/${cateId}`, data, {withCredentials: true, responseType: "json"});
        if (response.status === 200) {
            toast.success(response.data.message);
            navigate('/customer/dashboard');
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            updateCategory(cateId, state)
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
                    <h2>Update Category #{cateId}</h2>
                    <form onSubmit={handleSubmit}>

                         {/*The field to call to get the data must match*/}
                         {/*   the field on the back-end OR match the returned json*/}

                        <div>
                            <label htmlFor="cateName">Category name: </label>
                            <input type="text" name='cateName' placeholder={category.cateName} value={state.cateName} onChange={handleInputChange}/>
                            {errors.cateName_err && <span className='error'>{errors.cateName_err}</span>}
                        </div>
                        <div>
                            <label htmlFor="available">Available: </label>
                            <input type="text" name='available' placeholder={category.available ? "true" : "false"} value={state.available} onChange={handleInputChange}/>
                            {errors.available_err && <span className='error'>{errors.available_err}</span>}
                        </div>
                        <div>
                            <input type="hidden" name='isDelete' value={state.isDelete} onChange={handleInputChange}/>
                        </div>
                        <div>
                            <label htmlFor="muserName">Manager: </label>
                            <input type="text" name='muserName' value={state.muserName} onChange={handleInputChange} readOnly/>
                        </div>
                        <button type='submit' className='form-button'>Update</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
}
