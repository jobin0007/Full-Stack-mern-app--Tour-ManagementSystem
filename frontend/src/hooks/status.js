
import { FaClock, FaCheckCircle, FaTimesCircle} from "react-icons/fa";

export  const getStatusIcon = (status) => {
    switch (status) {
        case "pending":
            return <FaClock className="text-yellow-500" />;
        case "rejected":
            return <FaTimesCircle className="text-red-500" />;
        case "accepted":
            return <FaCheckCircle className="text-green-500" />;
        default:
            return <FaClock className="text-gray-500" />;
    }
};