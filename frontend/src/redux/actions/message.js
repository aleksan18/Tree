import {CLIENT_SIDE} from "../constants/message";

export const formErrorAction = (errors)=>{
    return {
        type:CLIENT_SIDE,
        errors:errors
    }

}