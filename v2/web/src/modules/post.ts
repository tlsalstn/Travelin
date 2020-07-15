import { getPost } from "../api/post";

// Action Types
const GET_DATA = "post/GET_DATA" as const;


// Actions
export function getData() {
    return {
        type: GET_DATA
    }
}

// Action Object Types
type PostAction = | ReturnType<typeof getData>;

// Initailize State
type PostState = {

}

const initState = {

}

// Reducers
function test(action: PostAction) {
    switch (action.type) {
        case GET_DATA:
            return getPost();
        default:
            return "error";
    }
}

export default test;