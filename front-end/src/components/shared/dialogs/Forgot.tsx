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

const formSchema = z.object({
  email: z
    .string()
    .min(2)
    .max(50),
});

export const ForgotDialog = () => {
  const { isOpen, closeDialog, type, openDialog } = useDialog();
  const { mutate, isPending } = useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: (response) => {
      toast.success(response.data.message ?? "Password reset successfully!");
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
    },
  });

  if (isOpen && type !== DialogTypeEnum.FORGOT) {
    return null;
  }

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="bg-white !rounded-none ">
        <DialogHeader>
          <DialogTitle className="text-xl lg:text-3xl">
            Forgot Password
          </DialogTitle>
          <DialogDescription>
            Don't have an account?{"  "}
            <button
              onClick={() => openDialog(DialogTypeEnum.REGISTER)}
              className="text-primary  !text-orange-600"
            >
              Create an account
            </button>
          </DialogDescription>
        </DialogHeader>

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
                      placeholder="name@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700"
              disabled={isPending}
            >
              Send Email for Reset Password
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
