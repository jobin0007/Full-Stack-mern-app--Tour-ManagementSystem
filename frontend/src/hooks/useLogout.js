import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { userLogOutAPI } from "../services/userServices";


const useLogout = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["logout"],
        mutationFn: userLogOutAPI,
        onSuccess: () => {
            navigate("/");
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        },
    });
};

export default useLogout;
