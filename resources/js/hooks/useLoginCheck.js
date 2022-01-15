import { useCallback } from "react";
import axios from "axios"; 

import { useLoginUser } from "./useLoginUser";

export const useLoginCheck = () => {
    const { setLoginUser } = useLoginUser();
    
    const loginCheck = useCallback(() => {
        axios.get("/api/user")
            .then((res) => {
                setLoginUser(res.data);
            })
            .catch((err) => {
                alert('ログインチェックに失敗しました。');
                console.log(err.response);
            });
        },
        [setLoginUser]
    );

    return { loginCheck };
};