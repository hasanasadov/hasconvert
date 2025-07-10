import { Navigate, Outlet } from "react-router-dom";
import { DashboardSidebar } from "../components/shared/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserRole } from "@/types";
import { paths } from "@/constants/paths";
import { useAppSelector } from "@/hooks/redux";
import { selectAuth } from "@/store/auth";
import { toast } from "sonner";
import LoadingComp from "../components/shared/Loading";

const DashboardLayout = () => {
  const { user, loading } = useAppSelector(selectAuth);

  if (loading) {
    return <LoadingComp />;
  }

  if (!user || user.role !== UserRole.Admin) {
    toast.error("You are not authorized to access this page!");
    return <Navigate to={paths.HOME} />;
  }
  return (
    <SidebarProvider className="bg-black border">
      <DashboardSidebar />
      <main className="w-full px-6 relative pt-4">
        <SidebarTrigger className="absolute left-3 top-3" />
        <div className="p-6 rounded-[10px] text-white  w-full">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
