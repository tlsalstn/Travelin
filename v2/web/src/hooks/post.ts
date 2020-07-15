import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { getData } from "../modules/post";
import { useCallback } from "react";

export default function usePost() {
    const dispatch = useDispatch();

    console.log(dispatch);
    const onGetData = useCallback(() => dispatch(getData()), [dispatch]);

    return {
        onGetData
    };
}