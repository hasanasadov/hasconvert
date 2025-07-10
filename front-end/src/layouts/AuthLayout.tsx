import { Navigate, Outlet } from "react-router-dom";
import { paths } from "@/constants/paths";
import { useAppSelector } from "@/hooks/redux";
import { selectAuth } from "@/store/auth";
import { DialogTypeEnum, useDialog } from "@/hooks/useDialog";
import LoadingComp from "../components/shared/Loading";

const AuthLayout = () => {
  const { user, loading } = useAppSelector(selectAuth);
  const { openDialog } = useDialog();

  if (loading) {
    return <LoadingComp />;
  }

  if (!user) {
    openDialog(DialogTypeEnum.LOGIN);
    return <Navigate to={paths.HOME} />;
  }

  return <Outlet />;
};

export default AuthLayout;
