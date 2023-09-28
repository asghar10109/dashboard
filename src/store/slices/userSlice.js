import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { extraReducers } from "../reducer/userReducer"

axios.defaults.baseURL = process.env.REACT_APP_APIURL
const user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null
console.log(user, "0000")
axios.defaults.headers.common['Authorization'] = `Bearer ${user?.data?.user_authentication}`;
const initialState = {
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    user: user,
    terms: null,
    privacy: null,
    dashboard: null,
}

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('error.response :>> ', error.response);
        if (error.response && error.response.status === 401) {
            // Dispatch the logout action
            // store.dispatch(logout());
            localStorage.clear();

            // Redirect to the login page
            window.location.href = '/admin';
        }

        return Promise.reject(error);
    }
);

export const signinUser = createAsyncThunk('/api/login', async (bodyData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`/api/login`, bodyData)
        console.log('response', response)
        return response
    } catch (error) {
        console.log('error', error.response)
        return rejectWithValue(error.response.data)
    }
})



export const dashboard = createAsyncThunk('get-dashboard-data', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-dashboard-data`)
        // console.log('response.data', response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

// export const recentCampaigns = createAsyncThunk('admin/recentCampaigns', async (bodyData = null, { rejectWithValue }) => {
//     try {
//         const response = await axios.get(`admin/recentCampaigns`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

export const getAllUsers = createAsyncThunk('/api/get-all-users', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/get-all-users`)

        return response
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const getAllReports = createAsyncThunk('/api/getallreports', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/getallreports`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})




export const acceptRejectReport = createAsyncThunk('accept-or-decline-reports', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.post(`accept-or-decline-reports`, bodyData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const getAllPosts = createAsyncThunk('/api/getallpost', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/getallpost`)
        return response
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getallreactions = createAsyncThunk('/api/getallreactions',async(post, { rejectWithValue }) => {
    try{
        
        const response = await axios.post(`/api/getallreactions`,{post})
        return response.data
    }
    catch(err){
        return rejectWithValue(err.response.data)
    }
}) 

export const getallcomments = createAsyncThunk('/api/getallcomments',async(post, { rejectWithValue }) => {
    try{
        
        const response = await axios.post(`/api/getallcomments`,{post})
        return response.data
    }
    catch(err){
        return rejectWithValue(err.response.data)
    }
}) 

export const getAllFeedbacks = createAsyncThunk('get-feedbacks', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-feedbacks`)

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const addPost = createAsyncThunk('/api/post', async (bodyData = null, { rejectWithValue }) => {
    try {

        const response = await axios.post(`/api/post`, bodyData)

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const editPost = createAsyncThunk('/api/editpost', async (bodyData = null, { rejectWithValue }) => {
    try {
        console.log('first for edit api ')
        const response = await axios.put(`/api/editpost`, bodyData)
        console.log("response from edit post......  ", response)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const deletePost = createAsyncThunk('/api/deletepost', async (postid, { rejectWithValue }) => {
    try {

        const response = await axios.delete(`/api/deletepost`,{data:{postid}})
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})




export const getPreference = createAsyncThunk('get-preferences', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-preferences`)

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const addPreference = createAsyncThunk('add-preference', async (bodyData = null, { rejectWithValue }) => {
    try {
        // console.log('first', first)
        const response = await axios.post(`add-preference`, bodyData)

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const deletePreference = createAsyncThunk('delete-preference', async (id, { rejectWithValue }) => {
    try {

        const response = await axios.get(`delete-preference/${id._id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})













//Question
export const getQuestion = createAsyncThunk('get-questions', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-questions`)

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const addQuestion = createAsyncThunk('add-question', async (bodyData = null, { rejectWithValue }) => {
    try {
        // console.log('first', first)
        const response = await axios.post(`add-question`, bodyData)

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const deleteQuestion = createAsyncThunk('delete-question', async (id, { rejectWithValue }) => {
    try {

        const response = await axios.get(`delete-question/${id._id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})











//Reason
export const getReason = createAsyncThunk('get-reasons', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-reasons`)

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const addReason = createAsyncThunk('add-reason', async (bodyData = null, { rejectWithValue }) => {
    try {
        // console.log('first', first)
        const response = await axios.post(`add-reason`, bodyData)

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const deleteReason = createAsyncThunk('delete-reason', async (id, { rejectWithValue }) => {
    try {

        const response = await axios.get(`delete-reason/${id._id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})











export const getAllPayments = createAsyncThunk('get-all-payment', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-all-payment`)

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const getAllEmployers = createAsyncThunk('get-all-employers', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-all-employers`)

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const getAllEmployees = createAsyncThunk('get-all-employees', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-all-employees`)

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getEmployerJobs = createAsyncThunk('get-all-employers-jobs', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-all-employers-jobs/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const getEmployersRequest = createAsyncThunk('get-employers-request', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-employers-request`)

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

// export const getAllBusiness = createAsyncThunk('admin/getAllBusiness', async (bodyData = null, { rejectWithValue }) => {
//     try {
//         const response = await axios.get(`admin/getAllBusiness`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

// export const getMarketPlace = createAsyncThunk('admin/allMarketPlaceAds', async (bodyData = null, { rejectWithValue }) => {
//     try {
//         const response = await axios.get(`admin/allMarketPlaceAds`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

// export const approveDisapproveAd = createAsyncThunk('admin/approveDisapproveAd', async (bodyData, { rejectWithValue }) => {
//     try {
//         const response = await axios.post(`admin/approveDisapproveAd/${bodyData.id}`, bodyData)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

// export const getReportedPosts = createAsyncThunk('admin/getReportedPosts', async (bodyData = null, { rejectWithValue }) => {
//     try {
//         const response = await axios.get(`admin/getReportedPosts`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

// export const approveDisapproveReport = createAsyncThunk('admin/approveDisapproveReport', async (bodyData, { rejectWithValue }) => {
//     try {
//         const response = await axios.post(`admin/approveDisapproveReport/${bodyData.id}`, bodyData)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

export const deleteAccount = createAsyncThunk('admin/deleteAccount', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`admin/deleteAccount/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const approveDisapprove = createAsyncThunk('verify-employer', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`verify-employer/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const blockUnblock = createAsyncThunk('/api/block-users', async (user, { rejectWithValue }) => {
    try {
        
        const response = await axios.post(`/api/block-users/`, {user})
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const updatePassword = createAsyncThunk('admin/update-password', async (bodyData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`admin/update-password`, bodyData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const updateTerms = createAsyncThunk('update-content/terms_and_conditions', async (bodyData, { rejectWithValue }) => {
    try {
        const response = await axios.put(`update-content/terms_and_conditions`, bodyData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const updatePrivacy = createAsyncThunk('update-content/privacy_policy', async (bodyData, { rejectWithValue }) => {
    try {
        const response = await axios.put(`update-content/privacy_policy`, bodyData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const privacy1 = createAsyncThunk('update-content/privacy', async (bodyData, {rejectWithValue}) => {

    try{

    }
    catch(error){

    }
})    

export const userLogout = createAsyncThunk('/api/logout', async (bodyData = null, { rejectWithValue }) => {
    try {
        const response = await axios.post(`/api/logout`)
        console.log('response', response)
        return response

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const terms = createAsyncThunk('get-content/terms_and_conditions', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-content/terms_and_conditions`)
        console.log(response.data.data[0].content)
        return response.data.data[0]
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const privacy = createAsyncThunk('get-content/privacy_policy', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`get-content/privacy_policy`)
        console.log(response.data.data[0].content)
        return response.data.data[0]
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

// export const addCategory = createAsyncThunk('admin/categories', async (category, { rejectWithValue }) => {
//     try {

//         const response = await axios.post(`admin/categories`, category)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })


// export const getCategory = createAsyncThunk('admin/allCategories', async (category, { rejectWithValue }) => {
//     try {

//         const response = await axios.get(`/allCategories`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

// export const deleteCategory = createAsyncThunk('admin/deletecategory', async (id, { rejectWithValue }) => {
//     try {
//         const response = await axios.delete(`admin/deletecategory/${id}`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })


const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        token: (state) => {
            var user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                state.user = user
            }
        }
    },
    extraReducers
})
export const getUserStatus = (state) => state?.users?.data?.status;
export const getUserError = (state) => state?.users?.data?.error;
export const getUsertoken = (state) => state?.users?.user?.data?.user_authentication;
export const getProfile = (state) => state?.users?.user?.data;
export const getTerms = (state) => state?.users?.data?.terms;
export const getPrivacy = (state) => state?.users?.data?.privacy;
export const getAllCategories = (state) => state?.users?.data?.categories;
export const getAllCharges = (state) => state?.users?.data?.charges;
export const getDashboard = (state) => state?.users?.data?.dashboard;
export const getareaChart = (state) => state?.users?.data?.areaChart;
export const getlineChart = (state) => state?.users?.data?.lineChart;
export const getcampaigns = (state) => state?.users?.data?.campaigns;

export const { token } = userSlice.actions

export default userSlice.reducer




               