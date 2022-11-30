import {HIDE_MESSAGE} from "../constants/user"
import {SUCCESS,FAILURE,CLIENT_SIDE} from "../constants/message"
const initialState={
    text:"",
    severity:"",
    scenario:false,
    errors:[],
    isOpen:false,
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case SUCCESS:
            return{
            text:action.message.text,
            severity:action.message.severity,
            errors:[],
            scenario:true,
            isOpen:true
            }
        case FAILURE:
            console.log(state)
            return{
                text:action.message.text,
                scenario:false,
                severity:action.message.severity,
                errors:action.errors,
                isOpen:true
            }
        case CLIENT_SIDE:
            return{
                text:"",
                scenario:false,
                severity:"",
                errors:action.errors,
                isOpen:false
            }
        case HIDE_MESSAGE:
            return{
                text:"",
                severity:"",
                scenario:false,
                isOpen:false,
                errors:[]
            }
        default: 
        return state;
    }

}

export default reducer