import axios from 'axios'

export const login =() =>{
    return {type : 'TOGGLE_STATE'}
}


const addProfiles =(data)=>{
    return {type : 'SET_PROFILES' , payload : data }
}

export const getProfiles =()=>{
    return(dispatch)=>{
        axios.get('http://192.168.3.45:3056/api/profiles')
            .then((response)=>{
                const result = response.data
                dispatch(addProfiles(result))
            })
            .catch((error)=>{
                console.log(error)
            })
    }
}