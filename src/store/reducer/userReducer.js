import { toast } from 'react-toastify';
import axios from "axios";
import { addCategory, addPreference, addQuestion, addReason, approveDisapprove, approveDisapproveAd, approveDisapproveReport, blockUnblock, dashboard, deleteAccount, deleteCategory, deletePreference, deleteQuestion, deleteReason, getAllBusiness, getAllEmployees, getAllEmployers, getAllPayments, getAllPosts, addPost, getAllUsers, getCategory, getEmployerJobs, getEmployersRequest, getMarketPlace, getPreference, getQuestion, getReason, getReportedPosts, Pp, privacy, recentCampaigns, signinUser, Tc, TcPp, terms, updatePassword, updatePp, updatePrivacy, updateTc, updateTcpp, updateTerms, userLogout, deletePost, getAllReports, acceptRejectReport, editPost, getAllFeedbacks ,getallreactions,getallcomments} from "../slices/userSlice"
export const extraReducers = (builder) => {
    builder


        // Sign In
        .addCase(signinUser.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(signinUser.fulfilled, (state, action) => {
            state.status = 'succeeded'
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log("action",action)
            localStorage.setItem("user", JSON.stringify(action.payload.data));
            state.user = action.payload.data
            
            console.log(state.user)
            axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.data.data.user_authentication}`;
            

            state.error = null
        })
        .addCase(signinUser.rejected, (state, action) => {
            console.log('state :>> ', state, action);
            state.status = 'failed'
            state.error = action.payload.message
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })


        // Dashboard
        .addCase(dashboard.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(dashboard.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            // console.log('action.payload', action.payload)
            state.dashboard = { iosCount: action.payload.data.ios, androidCount: action.payload.data.android, userCount: action.payload.data.users} 
            // state.lineChart = action.payload.data.products
            // console.log(state.dashboard)
            // state.areaChart = action.payload.data.featured
        })
        .addCase(dashboard.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })


        // Recent Campaigns
        // .addCase(recentCampaigns.pending, (state, action) => {
        //     state.status = 'loading'
        // })
        // .addCase(recentCampaigns.fulfilled, (state, action) => {
        //     state.status = 'succeeded'
        //     state.error = null
        //     state.campaigns = action.payload.campaigns
        // })
        // .addCase(recentCampaigns.rejected, (state, action) => {
        //     state.status = 'failed'
        //     state.error = action.payload.message
        // })


        // update Password
        .addCase(updatePassword.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(updatePassword.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .addCase(updatePassword.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })


        // Get Users
        .addCase(getAllFeedbacks.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getAllFeedbacks.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null

        })
        .addCase(getAllFeedbacks.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })

       
        //getallreactions

        .addCase(getallreactions.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getallreactions.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            console.log('action.payload', action)
            
        })
        .addCase(getallreactions.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            
        })

        //getallcomments

        .addCase(getallcomments.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getallcomments.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            console.log('action.payload', action)
            
        })
        .addCase(getallcomments.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            
        })




        // Get Users
        .addCase(getAllUsers.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null

        })
        .addCase(getAllUsers.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })
        
        
        // Get Reports
        .addCase(getAllReports.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getAllReports.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null

        })
        .addCase(getAllReports.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })

        .addCase(acceptRejectReport.pending, (state, action) => {
            state.status = 'loading'
            state.error = null
        })
        .addCase(acceptRejectReport.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .addCase(acceptRejectReport.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        
        
        // Get Posts
        .addCase(getAllPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getAllPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null

        })
        .addCase(getAllPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })


        .addCase(addPost.pending, (state, action) => {
            state.status = 'loading'
            state.error = null
        })
        .addCase(addPost.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .addCase(addPost.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        
        
        .addCase(editPost.pending, (state, action) => {
            state.status = 'loading'
            state.error = null
        })
        .addCase(editPost.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .addCase(editPost.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })

        .addCase(deletePost.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            console.log('action.payload for delete post ....', action.payload)
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .addCase(deletePost.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        
        
        // Preferences_____________________________________________________________________________________________________________________________
        .addCase(getPreference.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getPreference.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null

        })
        .addCase(getPreference.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })

    
        .addCase(addPreference.pending, (state, action) => {
            state.status = 'loading'
            state.error = null
        })
        .addCase(addPreference.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .addCase(addPreference.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })


        
        .addCase(deletePreference.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(deletePreference.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            console.log('action.payload', action.payload)
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .addCase(deletePreference.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })



        // Question_____________________________________________________________________________________________________________________________
        .addCase(getQuestion.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getQuestion.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null

        })
        .addCase(getQuestion.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })

    
        .addCase(addQuestion.pending, (state, action) => {
            state.status = 'loading'
            state.error = null
        })
        .addCase(addQuestion.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .addCase(addQuestion.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })


        
        .addCase(deleteQuestion.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(deleteQuestion.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            console.log('action.payload', action.payload)
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .addCase(deleteQuestion.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })















        // Reason_____________________________________________________________________________________________________________________________
        .addCase(getReason.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getReason.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null

        })
        .addCase(getReason.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })

    
        .addCase(addReason.pending, (state, action) => {
            state.status = 'loading'
            state.error = null
        })
        .addCase(addReason.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .addCase(addReason.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })


        
        .addCase(deleteReason.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(deleteReason.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            console.log('action.payload', action.payload)
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .addCase(deleteReason.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        
        
        // Get Users
        .addCase(getAllPayments.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getAllPayments.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null

        })
        .addCase(getAllPayments.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })
        
        
        // Get Employers
        .addCase(getAllEmployers.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getAllEmployers.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null

        })
        .addCase(getAllEmployers.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })
        
        
        
        // Get Employees
        .addCase(getAllEmployees.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getAllEmployees.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null

        })
        .addCase(getAllEmployees.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })
        
        
        // Get Employers Request
        .addCase(getEmployersRequest.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getEmployersRequest.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null

        })
        .addCase(getEmployersRequest.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })
        
        
        // Get Employers Jobs
        .addCase(getEmployerJobs.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getEmployerJobs.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null

        })
        .addCase(getEmployerJobs.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })


        // Get Business
        // .addCase(getAllBusiness.pending, (state, action) => {
        //     state.status = 'loading'
        // })
        // .addCase(getAllBusiness.fulfilled, (state, action) => {
        //     state.status = 'succeeded'
        //     state.error = null
        // })
        // .addCase(getAllBusiness.rejected, (state, action) => {
        //     state.status = 'failed'
        //     state.error = action.payload.message
        // })


        // Get Ads
        // .addCase(getMarketPlace.pending, (state, action) => {
        //     state.status = 'loading'
        // })
        // .addCase(getMarketPlace.fulfilled, (state, action) => {
        //     state.status = 'succeeded'
        //     state.error = null
        // })
        // .addCase(getMarketPlace.rejected, (state, action) => {
        //     state.status = 'failed'
        //     state.error = action.payload.message
        // })

        // Ads Management
        // .addCase(approveDisapproveAd.pending, (state, action) => {
        //     state.status = 'loading'
        // })
        // .addCase(approveDisapproveAd.fulfilled, (state, action) => {
        //     state.status = 'succeeded'
        //     state.error = null
        //     toast.success(action.payload.message, {
        //         position: toast.POSITION.TOP_RIGHT
        //     });
        // })
        // .addCase(approveDisapproveAd.rejected, (state, action) => {
        //     state.status = 'failed'
        //     state.error = action.payload.message
        // })

        // Get Reported Posts
        // .addCase(getReportedPosts.pending, (state, action) => {
        //     state.status = 'loading'
        // })
        // .addCase(getReportedPosts.fulfilled, (state, action) => {
        //     state.status = 'succeeded'
        //     state.error = null
        // })
        // .addCase(getReportedPosts.rejected, (state, action) => {
        //     state.status = 'failed'
        //     state.error = action.payload.message
        // }) 

        // Report Management
        // .addCase(approveDisapproveReport.pending, (state, action) => {
        //     state.status = 'loading'
        // })
        // .addCase(approveDisapproveReport.fulfilled, (state, action) => {
        //     state.status = 'succeeded'
        //     state.error = null
        //     toast.success(action.payload.message, {
        //         position: toast.POSITION.TOP_RIGHT
        //     });
        // })
        // .addCase(approveDisapproveReport.rejected, (state, action) => {
        //     state.status = 'failed'
        //     state.error = action.payload.message
        // })

        // Delete Account
        .addCase(deleteAccount.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(deleteAccount.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .addCase(deleteAccount.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        


        // Approve DisApprove
        .addCase(approveDisapprove.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(approveDisapprove.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .addCase(approveDisapprove.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })


        // Block unBlock
        .addCase(blockUnblock.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(blockUnblock.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .addCase(blockUnblock.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })


        // Log Out
        .addCase(userLogout.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(userLogout.fulfilled, (state, action) => {
            toast.success(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            localStorage.clear();
            state.status = 'succeeded'
            state.user = null
            state.error = null
            state.TcPp = null
            state.categories = null
            state.dashboard = null
            state.lineChart = null
            state.areaChart = null
            state.charges = null
            state.campaigns = null
        })
        .addCase(userLogout.rejected, (state, action) => {
            toast.error(action.payload.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            state.status = 'failed'
            state.error = action.payload.message
        })


        // Get TcPp
        .addCase(terms.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(terms.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.terms = action.payload
        })
        .addCase(terms.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })
        // Get TcPp
        .addCase(privacy.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(privacy.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.privacy = action.payload
        })
        .addCase(privacy.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })


        // Update TcPp
        .addCase(updateTerms.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(updateTerms.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.privacy = action.payload
        toast.success(action.payload.message)
        })
        .addCase(updateTerms.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })
        // Update TcPp
        .addCase(updatePrivacy.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(updatePrivacy.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.terms = action.payload
        toast.success(action.payload.message)
        })
        .addCase(updatePrivacy.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
        })

        // Add Category
        // .addCase(addCategory.pending, (state, action) => {
        //     state.status = 'loading'
        //     state.error = null
        // })
        // .addCase(addCategory.fulfilled, (state, action) => {
        //     state.status = 'succeeded'
        //     state.error = null
        //     toast.success(action.payload.message, {
        //         position: toast.POSITION.TOP_RIGHT
        //     });
        // })
        // .addCase(addCategory.rejected, (state, action) => {
        //     state.status = 'failed'
        //     state.error = action.payload.message
        //     toast.error(action.payload.message, {
        //         position: toast.POSITION.TOP_RIGHT
        //     });
        // })


        // Get Category
        // .addCase(getCategory.pending, (state, action) => {
        //     state.status = 'loading'
        //     state.error = null
        //     state.categories = null
        // })
        // .addCase(getCategory.fulfilled, (state, action) => {
        //     state.status = 'succeeded'
        //     state.error = null
        //     state.categories = action.payload.categories
        // })
        // .addCase(getCategory.rejected, (state, action) => {
        //     state.status = 'failed'
        //     state.error = action.payload.message
        //     state.categories = null

        // })


        // Delete Category
        // .addCase(deleteCategory.pending, (state, action) => {
        //     state.status = 'loading'
        //     state.error = null

        // })
        // .addCase(deleteCategory.fulfilled, (state, action) => {
        //     state.status = 'succeeded'
        //     state.error = null
        //     toast.success(action.payload.message, {
        //         position: toast.POSITION.TOP_RIGHT
        //     });

        // })
        // .addCase(deleteCategory.rejected, (state, action) => {
        //     state.status = 'failed'
        //     state.error = action.payload.message
        //     state.categories = null

        // })

}






                       