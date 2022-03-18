import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from '../state';

export const useActions = () => {
    const dispatch = useDispatch();


    // bind action creators one single time using useMemo
    return useMemo(() => {
        return bindActionCreators(actionCreators, dispatch);
    }, [dispatch]);
};