import { Navigate, Outlet } from "react-router-dom";
import { paths } from "@/constants/paths";
import { useAppSelector } from "@/hooks/redux";
import { selectAuth } from "@/store/auth";
import { toast } from "sonner";
import LoadingComp from "@/components/shared/Loading";

const ProfileLayout = () => {
  const { user, loading } = useAppSelector(selectAuth);

  if (loading) {
    return <LoadingComp />;
  }

  if (!user) {
    toast.error("You are not authorized to access this page!");
    return <Navigate to={paths.HOME} />;
  }
  return (
    <main className="w-full px-6 relative pt-4">
      <div className="p-6 rounded-[10px] bg-white w-full">
        <Outlet />
      </div>
    </main>
  );
};

export default ProfileLayout;
