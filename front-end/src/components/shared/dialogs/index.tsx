import { AvailabilityDialog } from "./Availability";
import { FilterDialog } from "./Filter";
import { ForgotDialog } from "./Forgot";
import { LanguageDialog } from "./Language";
import { LoginDialog } from "./Login";
import { PriceDialog } from "./Price";
import { RegisterDialog } from "./Register";
import { ResetDialog } from "./ResetPassword";

export const Dialogs = () => {
  return (
    <>
      <FilterDialog />
      <LoginDialog />
      <RegisterDialog />
      <ForgotDialog />
      <ResetDialog />
      <AvailabilityDialog />
      <PriceDialog />
      <LanguageDialog />
    </>
  );
};
