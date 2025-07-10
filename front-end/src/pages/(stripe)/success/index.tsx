import { paths } from "@/constants/paths";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-[85vh] bg-gradient-to-br from-orange-100 to-orange-500 text-white">
        <div className="p-8 bg-white rounded-lg shadow-lg text-center text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-3xl font-bold mt-4">Payment Successful!</h1>
          <p className="mt-2 text-lg">
            Thank you for your purchase. Your transaction has been completed
            successfully.Please check your email for the receipt.
          </p>
          <button
            onClick={() => {
              navigate(paths.HOME);
            }}
            className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
