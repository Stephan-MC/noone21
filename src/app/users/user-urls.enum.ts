export enum UserUrls {
    ADD_POST = "user/register",
    UPDATE_PUT = "user/edit",
    SINGLE_GET = "user/",
    ALL_GET = "user",
    SEARCH_GET = "user/search",
    DELETE_POST = "",
    SOCIAL_LOGIN = "user/social-login",
    RESET_POST = "user/reset-password-by-admin",
    CHANGE_PASSWORD = "user/change-password",

    CONSULTATION_POST = "user/consultation/add",
    CONSULTATION_DELETE = "user/consultation/delete",
    CONSULTATION_PUT = "user/consultation/edit",

    EDUCATION_POST = "user/education/add",
    EDUCATION_PUT = "user/education/edit",
    EDUCATION_DELETE = "user/education/delete",

    SKILL_POST = "user/skill/add",
    SKILL_DELETE = "user/skill/delete",

    CATEGORIES_ADD = "user/category/add",
    CATEGORIES_EDIT = "user/category/edit",
    CATEGORIES_DELETE = "user/category/delete",
    User_Cat_Del= "user/userCategory/delete",

    FAQ_POST = "user/faq/add",
    FAQ_DELETE = "user/faq/delete",
    FAQ_PUT = "user/faq/edit",

    Video_Single_Galary = "user/userVideo/",
    Video_Galary = "user/userVideo/add",
    Video_Delete = "user/userVideo/delete",
    Video_Put= "user/userVideo/edit",

    Image_Single_Galary= "user/userImage/",
    Image_Galary_Add = "user/userImage/add",
    Image_Delete = "user/userImage/delete",
    UserVerify="user/verifyUser/",


    ImgSingleApproval= "user/userImageApproval/",
    Image_Delete_approval= "user/imgDelApproval",
    VidSingleApporval = "user/userVideoApproval/",
    Video_Delete_Approval="user/video_Delete_Approval",
    EDUCATION_DELETE_APPROVAL="user/user-education/delapproval",
}
