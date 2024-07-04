import axios from "axios";
import authHeader from "./apiHeader";

// const API_URL = 'http://192.168.100.123:8000/api_v2/'
// const API_URL = 'http://192.168.100.51:8000/api_v2/'
const API_URL = 'https://triftel.io/api_v2/'

const Login = async (data) => {
    const response = await axios.post(API_URL + 'login', data)
    if (response.data.success !== 1) {
        return response.data;
    }
    if (response.data.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response.data;

}

const EmailOTP = async (data) => {
    const response = await axios.post(API_URL + 'user-mail-verification', data)
    // console.log(response.data)
    // console.log(response.data.token, 'otp services')
    return response.data;
}

const OTPVerify = async (data) => {
    const response = await axios.post(API_URL + 'user-check-verification', data)
    // console.log(response.data, 'otp verify services')
    return response.data;
}

const SetUserName = async (data) => {
    const response = await axios.get(API_URL + `generate-accointid/${data}`)
    // console.log(response.data, 'set user name services')
    return response.data;
}

const CheckUserName = async (data) => {
    const response = await axios.get(API_URL + `update-accointid/${data}`)
    // console.log(response.data, 'check user name services')
    return response.data;
}

const Register = async (data) => {
    const response = await axios.post(API_URL + `register`, data)
    // console.log(response.data, 'register services')
    return response.data;
}

const ForPassOTP = async (data) => {
    const response = await axios.post(API_URL + 'forgot-password-code', data)
    // console.log(response?.data?.data?.token, 'for pass otp services')
    return response.data;
}

const ForPassOTPVerify = async (data) => {
    const response = await axios.post(API_URL + 'forgot-password-verify-code', data)
    // console.log(response?.data, 'verify otp services')
    return response.data;
}

const ResetForPass = async (data) => {
    const response = await axios.post(API_URL + 'forgot-password-reset-submit', data)
    // console.log(response?.data, 'reset password services')
    return response.data;
}

const ViewProfile = async (id) => {
    const response = await axios.get(API_URL + `view_profile/${id}`, { headers: authHeader() })
    // console.log(response.data, 'get profile from services');
    return response.data;
}

const GetPost = async (data) => {
    const response = await axios.post(API_URL + `profile_group_page_friend_post`, data, { headers: authHeader() })
    // console.log(response.data, 'get post from services');
    return response.data;
}

const UserFollowerFollowing = async (data) => {
    const response = await axios.post(API_URL + `user-follower-following`, data, { headers: authHeader() })
    // console.log(response.data, 'get follower-following from services');
    return response.data;
}

const GetProfileViewList = async (data) => {
    const response = await axios.post(API_URL + `profile_view_list`, data, { headers: authHeader() })
    // console.log(response.data, 'get profile views from services');
    return response.data;
}

const GetAllPost = async (id) => {
    const response = await axios.get(API_URL + `get-all-posts/5/${id}`, { headers: authHeader() })
    // console.log(response.data, 'from post service');
    return response.data;
}

const DeletePost = async (id) => {
    const response = await axios.delete(API_URL + `post/${id}`, { headers: authHeader() })
    // console.log(response.data, 'from delete post service');
    return response.data;
}

const TurnOnOffComment = async (data) => {
    const response = await axios.post(API_URL + `post-comment-on-off`, data, { headers: authHeader() })
    // console.log(response.data, 'on off service');
    return response.data;
}

const TurnOnOffPostNoti = async (data) => {
    const response = await axios.post(API_URL + `post-notification-on-off`, data, { headers: authHeader() })
    // console.log(response.data, 'noti service');
    return response.data;
}

const GetComments = async (data) => {
    const response = await axios.post(API_URL + `post-comment-detail`, data, { headers: authHeader() })
    // console.log(response.data, 'comment service');
    return response.data;
}

const DeleteComment = async (data) => {
    const response = await axios.post(API_URL + `post_comment_remove`, data, { headers: authHeader() })
    // console.log(response.data, 'comment service');
    return response.data;
}

const AddComment = async (data) => {
    const response = await axios.post(API_URL + `post_comment`, data, { headers: authHeader() })
    // console.log(response.data, 'service');
    return response.data;
}

const PostSave = async (data) => {
    const response = await axios.post(API_URL + `post-save`, data, { headers: authHeader() })
    // console.log(response.data, 'service');
    return response.data;
}

const PostLikeUnlike = async (data) => {
    const response = await axios.post(API_URL + `post_like`, data, { headers: authHeader() })
    // console.log(response.data, 'like unlike');
    return response.data;
}

const FollowUnfollow = async (data) => {
    const response = await axios.post(API_URL + `follow`, data, { headers: authHeader() })
    // console.log(response.data, 'folllow');
    return response.data;
}

const AcceptRejectReq = async (data) => {
    const response = await axios.post(API_URL + `friends-reuqest`, data, { headers: authHeader() })
    // console.log(response.data, 'folllow');
    return response.data;
}

const AllUsersPostLikes = async (data) => {
    const response = await axios.post(API_URL + `all_users_post_like`, data, { headers: authHeader() })
    // console.log(response.data, 'folllow');
    return response.data;
}

const CreatePost = async (data) => {
    const response = await axios.post(API_URL + `post`, data, { headers: authHeader(), ContentType: "multipart/form-data" })
    // console.log(response.data);
    return response.data;
}

const SearchContact = async (data) => {
    const response = await axios.post(API_URL + `search-contacts`, data, { headers: authHeader() })
    // console.log(response.data);
    return response.data;
}

const FetchPattenData = async (data) => {
    const response = await axios.post(API_URL + `post-pattern`, data, { headers: authHeader() })
    // console.log(response.data);
    return response.data;
}

const GetStory = async () => {
    const response = await axios.get(API_URL + `get-story`, { headers: authHeader() })
    // console.log(response.data, 'story');
    return response.data;
}

const ChangePostPrivacy = async (data) => {
    const response = await axios.post(API_URL + `change-post-privacy`, data, { headers: authHeader() })
    // console.log(response.data, 'privacy');
    return response.data;
}

const BlockUnblock = async (data) => {
    const response = await axios.post(API_URL + `block-report`, data, { headers: authHeader() })
    // console.log(response.data, 'block');
    return response.data;
}

const UserSetting = async (data) => {
    const response = await axios.post(API_URL + `user-settings`, data, { headers: authHeader() })
    // console.log(response.data, 'user-----------setting');
    return response.data;
}

const LoginDeviceList = async (data) => {
    const response = await axios.get(API_URL + `login_device_list`, { headers: authHeader() })
    // console.log(response.data, 'user-----------setting');
    return response.data;
}

const apiService = {
    Login,
    EmailOTP,
    OTPVerify,
    SetUserName,
    CheckUserName,
    Register,
    ForPassOTP,
    ForPassOTPVerify,
    ResetForPass,
    ViewProfile,
    GetPost,
    UserFollowerFollowing,
    GetProfileViewList,
    GetAllPost,
    DeletePost,
    TurnOnOffComment,
    TurnOnOffPostNoti,
    GetComments,
    DeleteComment,
    AddComment,
    PostSave,
    PostLikeUnlike,
    FollowUnfollow,
    AcceptRejectReq,
    AllUsersPostLikes,
    CreatePost,
    SearchContact,
    FetchPattenData,
    GetStory,
    ChangePostPrivacy,
    BlockUnblock,
    UserSetting,
    LoginDeviceList
};

export default apiService;