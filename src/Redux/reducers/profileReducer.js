const profilesInitialState = []

 export const profilesReducer=(state=profilesInitialState,action)=>{
    switch(action.type){
        case 'SET_PROFILES':{
            return action.payload;
        }
        default :{
            return state
        }
    }

}