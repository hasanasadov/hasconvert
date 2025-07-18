import { DialogTypeEnum, useDialog } from "@/hooks/useDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth";
import { AxiosError } from "axios";
import { RegisterResponse } from "@/services/auth/types";
import { toast } from "sonner";

const formSchema = z
  .object({
    name: z.string().min(2).max(50),
    surname: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
    confirmPassword: z.string().min(2).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export const RegisterDialog = () => {
  const { isOpen, closeDialog, type, openDialog } = useDialog();
  const { mutate, isPending } = useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      toast.success(response.data.message);
      openDialog(DialogTypeEnum.LOGIN);
    },
    onError: (error: AxiosError<RegisterResponse>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  if (isOpen && type !== DialogTypeEnum.REGISTER) {
    return null;
  }

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      name: values.name,
      surname: values.surname,
      email: values.email,
      password: values.password,
    };

    mutate(data);
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="bg-white !rounded-none ">
        <DialogHeader>
          <DialogTitle className="text-xl lg:text-3xl">
            Create An Account
          </DialogTitle>
          <DialogDescription>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => openDialog(DialogTypeEnum.LOGIN)}
              className="text-primary  !text-orange-600"
            >
              Sign In
            </button>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border-b-2 border-gray-500 !shadow-none rounded-none focus:border-orange-600 !focus:outline-none !focus:ring-0 "
                      placeholder="John"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border-b-2 border-gray-500 !shadow-none rounded-none focus:border-orange-600 !focus:outline-none !focus:ring-0 "
                      placeholder="Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent border-b-2 border-gray-500 !shadow-none rounded-none focus:border-orange-600 !focus:outline-none !focus:ring-0 "
                      placeholder="johndoe@example.com"
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700"
              disabled={isPending}
            >
              Register
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
