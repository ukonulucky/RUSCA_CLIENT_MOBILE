import * as Yup from "yup"

export const validationSchemaSignIn = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required")
})


export const validationSchemaSignUp = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email().required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().max(12, "Passoword cannot exceed 12 characters").min(6, "Password must have a minimum lenght of 8 characters").required("Password is required")
})

export const forgetPasswordValidationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
})

export const newPasswordValidationSchema = Yup.object().shape({
   newPassword: Yup.string().required("Password is required"),
   confirmPassword: Yup.string().oneOf([Yup.ref("newPassword"), undefined], "Password muust match").required("Please confirm your password")
})

export const personalDetailsValidationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email().required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required")
})


export const changePasswordValidationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("newPassword"), undefined], "Password muust match").required("Please confirm your password")
 })

 export const ReviewFormScheamValidation = Yup.object().shape({
    review: Yup.string().required("Review description is required")
 })




export const basicInfoSchemaValidation = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string().email().required("Email is required"),
    dob: Yup.string().required("Date is required"),
    image: Yup.string().required("Profile Photo is required")

})




export const driverLicenseUploadValidation  =  Yup.object().shape({
    back_image: Yup.string().required("Image back view is required"),
    front_image: Yup.string().required("Image front view is required"),
    id_number: Yup.string().required("License number is required"),
    expiry_date: Yup.string().required("Licence expiry date is required")

})


export const vehicleBrandValidation = Yup.object().shape({
    brand: Yup.string().required("vehicle brand is required"),
    model: Yup.string().required("vehicle model is required"),
    color: Yup.string().required("vehicle color is required"),
})

export const vehicleYearValidation = Yup.object().shape({
    vehicleYear: Yup.string().required("vehicle year number is required")
})

export const vehiclePlateNumberValidation = Yup.object().shape({
    vehiclePlateNumber: Yup.string().required("vehicle plate number is required")
})

export const vehicleCertRegValidation = Yup.object().shape({
    vehicleCert: Yup.string().required("vehicle document is required")
})


export const vehiclePhotoValidation = Yup.object().shape({
    vehiclePhoto: Yup.string().required("vehicle photo is required")
})



export const roadWorthinessValidation = Yup.object().shape({
    roadWorthiness: Yup.string().required("road worthiness is required")
})
