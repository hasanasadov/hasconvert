import { paths } from "@/constants/paths";
import { useNavigate } from "react-router-dom";

const CancelPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-[85vh] bg-gradient-to-br from-red-100 to-red-500 text-white">
        <div className="p-8 bg-white rounded-lg shadow-lg text-center text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <h1 className="text-3xl font-bold mt-4">Payment Failed!</h1>
          <p className="mt-2 text-lg">
            Unfortunately, your transaction could not be completed. Please try
            again later.
          </p>
          <button
            onClick={() => {
              navigate(paths.HOME);
            }}
            className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
