import { driverRegisterDataType,VehicleHomeDataType } from "./types"

export const welcomelist = [
    "Flexible hours", "Your prices", "Low Service payment"
    
]




export const driverRegistrationData:driverRegisterDataType[]  = [
 
     {
        name: "Basic Info",
        icon: require("../assets/icons/user-octagon.png"),
        key: 1,
       url: "basicInfoScreen"
    },
  
    {
        name: "Drivers License",
        icon: require("../assets/icons/barcode.png"),
        key: 2,
          url: "driverLicenseScreen"
    },
    {
        name: "Vehicle Details",
        icon: require("../assets/icons/car.png"),
        key: 3,
          url: "vehicleInfoHomeScreen"
    },
    {
        name: "Road worthiness",
        icon: require("../assets/icons/personalcard.png"),
        key: 4,
          url: "roadWorthinesScreen"
    }
]


export const driverLicenseData = [
    "Bring the driver license in front of you and take a photo as an example",
    "The photo should clearly show the face and your drivers license",
    "The photo must be taken in good light and in good quality",
    "photo in sunglasses are not allowed"

]

export const driverLicenseData2 = [
    "The vehicle and its license plate number are visible",
    "The photo of the vehicle is in front",
    "The image is sharp, high resolution and taken lighting conditions"

]


export const roadWorthinessData= [
    "Please kindly upload a valid road worthiness document.",
    "The document should be clear and visible.",
    "The document should be valid at the date of registration."

]



export const basicInfoData = [
    "Clearly visible face",
    "Without sunglases",
    "Good lightening and",
    "without filter"
]

export const periodData = [
    {
        name: "Day",
        id: 1
    },
    {
        name: "Week",
        id: 2
    },
    {
        name: "Month",
        id: 3
    }
]

export const statisticData = [
    {
        text: "Total Ride",
        number:164,
        id: 1
    },
    {
        text: "Total deliveries",
        number: 164,
        id: 2
    },
    {
        text: "Completed ride",
        number:164,
        id: 3
    },
    {
        text: "Cancelled ride",
        number:164,
        id: 4
    }
]

export const transactionData = [
    {
        id: 1,
        time: "14:30 PM", 
        date: "Aug 24th",
        amount: "3,500",
        type: "Withdrawal",
        img: require("../assets/images/uploadPic.png")

    },

    {
        id: 2,
        time: "14:30 PM", 
        date: "Aug 24th",
        amount: "3,500",
        type: "Order Payment",
        img: require("../assets/images/vehicle.png")

    },
    {
        id: 3,
        time: "14:30 PM", 
        date: "Aug 24th",
        amount: "3,500",
        type: "Commision Payment",
        img: require("../assets/images/vehicle.png")

    }
]

export const rideRequestList = [
    {
        img: require("../assets/images/uploadPic.png"),
        address: "Liberty Road No. 37",
        state: "Lagos",
        amount: "₦3,650",
        time: "4 mins",
        distance: "1.2",
        id: 1
    },
    {
        img: require("../assets/images/uploadPic.png"),
        address: "Liberty Road No. 37",
        state: "Lagos",
        amount: "₦3,650",
        time: "4 mins",
        distance: "1.2",
        id: 2
    },
    {
        img: require("../assets/images/uploadPic.png"),
        address: "Liberty Road No. 37",
        state: "Lagos",
        amount: "₦3,650",
        time: "4 mins",
        distance: "1.2",
        id: 3
    },
    {
        img: require("../assets/images/uploadPic.png"),
        address: "Liberty Road No. 37",
        state: "Lagos",
        amount: "₦3,650",
        time: "4 mins",
        distance: "1.2",
        id: 4
    },
    {
        img: require("../assets/images/uploadPic.png"),
        address: "Liberty Road No. 37",
        state: "Lagos",
        amount: "₦3,650",
        time: "4 mins",
        distance: "1.2",
        id: 5
    },
    {
        img: require("../assets/images/uploadPic.png"),
        address: "Liberty Road No. 37",
        state: "Lagos",
        amount: "₦3,650",
        time: "4 mins",
        distance: "1.2",
        id: 6
    },
    {
        img: require("../assets/images/uploadPic.png"),
        address: "Liberty Road No. 37",
        state: "Lagos",
        amount: "₦3,650",
        time: "4 mins",
        distance: "1.2",
        id: 7
    },
    {
        img: require("../assets/images/uploadPic.png"),
        address: "Liberty Road No. 37",
        state: "Lagos",
        amount: "₦3,650",
        time: "4 mins",
        distance: "1.2",
        id: 8
    }
]


export const profileOptionsData = [
    {
        id: 1,
        text: "Payments",
        img: require("../assets/images/paymentProfilePic.png"),
        url: ""

    },
    {
        id: 2,
        text: "Ride History",
        img: require("../assets/images/rideHistoryProfilePic.png"),
        url: ""

    },
    {
        id: 3,
        text: "Promo",
        img: require("../assets/images/promoProfilePic.png"),
        url: ""

    },
    {
        id: 4,
        text: "Support",
        img: require("../assets/images/supportProfilePic.png"),
        url: ""

    },
    {
        id: 5,
        text: "About",
        img: require("../assets/images/aboutProfilePic.png"),
        url: ""

    }
    
]


export const vehicleHomeData: VehicleHomeDataType[] = [
    {
        image: require("../assets/images/user-octagonActive.png"),
        data: "Select Vehicle Brand",
        url: "vehicleBrandScreen"
    },
    {
        image: require("../assets/images/cameraActive.png"),
        data: "Number Plate",
           url: "vehicleNumberPlateScreen"
    
    },
    {
        image: require("../assets/images/personalcardActive.png"),
        data: "Photo of Vehicle",
           url: "vehiclePhotoScreen"
    },
    {
        image: require("../assets/images/carActive.png"),
        data: "Vehicle production year",
           url: "vehicleProductionYear"
    },
    {
        image: require("../assets/images/barcode2.png"),
        data: "Certificate of vehicle registration",
           url: "vehicleCertRegScreen"
    },

  
   



]




