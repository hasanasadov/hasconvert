import { ForgotDialog } from "./Forgot";
import { LanguageDialog } from "./Language";
import { LoginDialog } from "./Login";
import { RegisterDialog } from "./Register";
import { ResetDialog } from "./ResetPassword";

export const Dialogs = () => {
  return (
    <>
      <LoginDialog />
      <RegisterDialog />
      <ForgotDialog />
      <ResetDialog />
      <LanguageDialog />
    </>
  );
};
