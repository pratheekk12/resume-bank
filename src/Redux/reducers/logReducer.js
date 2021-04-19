const initialState = false

export const logReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'TOGGLE_STATE':{
            return !state;
        }
        default :{
            return state
        }
    }

}