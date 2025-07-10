import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DialogTypeEnum, useDialog } from "@/hooks/useDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth";
import { AxiosError } from "axios";
import { RegisterResponse } from "@/services/auth/types";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux";
import { getCurrentUserAsync } from "@/store/auth";
import GitHubLogin from "../OAuth/GithubLogin";
import GoogleLoginComponent from "../OAuth/GoogleBtn";

const formSchema = z.object({
  email: z
    .string()
    .min(2)
    .max(50),
  password: z
    .string()
    .min(2)
    .max(50),
});

export const LoginDialog = () => {
  const { isOpen, closeDialog, type, openDialog } = useDialog();
  const dispatch = useAppDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      dispatch(getCurrentUserAsync());
      toast.success(response.data.message);
      closeDialog();
      form.reset();
    },
    onError: (error: AxiosError<RegisterResponse>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (isOpen && type !== DialogTypeEnum.LOGIN) {
    return null;
  }

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="bg-white !rounded-none  ">
        <DialogHeader>
          <DialogTitle className="text-xl lg:text-2xl font-bold ">
            Create account or sign in
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4  w-full">
          <GoogleLoginComponent className="w-full h-16 border-2 border-black flex items-center justify-center  " />
          <GitHubLogin className="w-full h-16 border-2 border-black" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border-b-2 border-gray-500 !shadow-none rounded-none focus:border-orange-600 !focus:outline-none !focus:ring-0 "
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border-b-2 border-gray-500 !shadow-none rounded-none focus:border-orange-600 !focus:outline-none !focus:ring-0 "
                      type="password"
                      placeholder="***********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2 justify-center text-center">
              <DialogDescription className="">
                Forgot your password?{"  "}
                <button
                  type="button"
                  onClick={() => openDialog(DialogTypeEnum.FORGOT)}
                  className="text-primary bg-transparent !text-orange-600 !p-0  "
                >
                  Reset password
                </button>
              </DialogDescription>
              <DialogDescription>
                <button
                  onClick={() => openDialog(DialogTypeEnum.REGISTER)}
                  type="button"
                  className="text-primary bg-transparent !text-orange-600 !p-0 "
                >
                  No business rate yet? Register your company here
                </button>
              </DialogDescription>
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700"
              disabled={isPending}
            >
              Next
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
