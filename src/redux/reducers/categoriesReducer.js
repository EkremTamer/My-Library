
const initialState={
    start:false,
    success:false,
    categories:[],
    fail:false,
    errorMesage:""
};

const categoriesReducer = (state=initialState,action)=>{
    switch (action.type) {
        case "FETCH_CATEGORİES_START":
            
            return{
                ...state,
                start:true
            }

        case "FETCH_CATEGORİES_SUCCESS":

            return{
                ...state,
                start:false,
                success:true,
                categories: action.payload
            }

        case "FETCH_CATEGORİES_FAIL":
            
            return{
                ...state,
                fail:true,
                errorMesage: action.payload
            }
    
        default:

            return state

    }
}

export default categoriesReducer