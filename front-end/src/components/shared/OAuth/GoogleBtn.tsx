import {
  // GoogleLogin,
  GoogleOAuthProvider,
  // GoogleLogin
} from "@react-oauth/google";
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL as string;

function GoogleBtn({ className }: { className?: string }) {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/auth/google`;
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div
        onClick={handleGoogleLogin}
        className={`${className} flex items-center justify-center text-center cursor-pointer hover:bg-orange-100`}
      >
        Sign in with Google
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleBtn;

// import { useAppDispatch } from "@/hooks/redux";
// import authService from "@/services/auth";
// import { getCurrentUserAsync } from "@/store/auth";
// import { AxiosResponseError } from "@/types";
// import { useMutation } from "@tanstack/react-query";
// import { jwtDecode } from "jwt-decode";
// import { toast } from "sonner";

// const dispatch = useAppDispatch();
// const { mutate } = useMutation({
//   mutationFn: authService.googleLogin,
//   onSuccess: (response) => {
//     console.log("response", response);

//     dispatch(getCurrentUserAsync());
//     toast.success(response.data.message);
//   },
//   onError: (err: AxiosResponseError) => {
//     console.error(err);
//     toast.error(err.message);
//   },
// });

// const handleSuccess = (response: any) => {
//   const credential = response.credential;
//   const decoded: { email: string; name: string; picture: string } = jwtDecode(
//     credential
//   );
//   const { email, name, picture } = decoded;
//   console.log(email, name, picture);
//   mutate();
// };

// const handleError = () => {
//   console.error("Login Failed");
// };

{
  /* <div className={`${className} h-full `}>
    <GoogleLogin
      width={300}
      size="large"
      shape="circle"
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap
    />
  </div> */
}
