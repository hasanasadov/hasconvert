import { DialogTypeEnum, useDialog } from "@/hooks/useDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { RenderIf } from "../RenderIf";

export const LanguageDialog = () => {
  const { isOpen, closeDialog, type } = useDialog();
  const { t } = useTranslation();

  if (isOpen && type !== DialogTypeEnum.LANGUAGE) {
    return null;
  }

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  const currentLanguage = i18n.language;
  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="bg-white !rounded-[15px] max-w-[1000px] h-[90vh] md:h-fit  min-h-screen md:min-h-fit  overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-xl lg:text-2xl font-bold">
            {t("Language & Region")}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Button
            variant={`${currentLanguage === "en" ? "blacked" : "ghost"}`}
            className=" border-2 !px-10 !py-4 !md:py-8 rounded-lg !flex !justify-between  "
            onClick={() => changeLanguage("en")}
          >
            <div className="flex flex-col text-start">
              <div className="text-lg boldedSpan">{t("English")}</div>
              <div className="text-md">{t("United States")}</div>
            </div>

            <RenderIf condition={currentLanguage === "en"}>
              <div className="!text-white">
                <CheckIcon />
              </div>
            </RenderIf>
          </Button>
          <Button
            variant={`${currentLanguage === "es" ? "blacked" : "ghost"}`}
            className=" border-2 !px-10 !py-4 !md:py-8 rounded-lg !flex !justify-between  "
            onClick={() => changeLanguage("es")}
          >
            <div className="flex flex-col text-start">
              <div className="text-lg boldedSpan">{t("Spanish")}</div>
              <div className="text-md">{t("Argentina")}</div>
            </div>
            <RenderIf condition={currentLanguage === "es"}>
              <div className="!text-white">
                <CheckIcon />
              </div>
            </RenderIf>
          </Button>
          <Button
            variant={`${currentLanguage === "de" ? "blacked" : "ghost"}`}
            className=" border-2 !px-10 !py-4 !md:py-8 rounded-lg !flex !justify-between  "
            onClick={() => changeLanguage("de")}
          >
            <div className="flex flex-col text-start">
              <div className="text-lg boldedSpan">{t("German")}</div>
              <div className="text-md">{t("Deutschland")}</div>
            </div>
            <RenderIf condition={currentLanguage === "de"}>
              <div className="!text-white">
                <CheckIcon />
              </div>
            </RenderIf>
          </Button>
          <Button
            variant={`${currentLanguage === "az" ? "blacked" : "ghost"}`}
            className=" border-2 !px-10 !py-4 !md:py-8 rounded-lg !flex !justify-between  "
            onClick={() => changeLanguage("az")}
          >
            <div className="flex flex-col text-start">
              <div className="text-lg boldedSpan">{t("Azerbaijani")}</div>
              <div className="text-md">{t("Azerbaijan")}</div>
            </div>
            <RenderIf condition={currentLanguage === "az"}>
              <div className="!text-white">
                <CheckIcon />
              </div>
            </RenderIf>
          </Button>
          <Button
            variant={`${currentLanguage === "ena" ? "blacked" : "ghost"}`}
            className=" border-2 !px-10 !py-4 !md:py-8 rounded-lg !flex !justify-between  "
            onClick={() => changeLanguage("ena")}
          >
            <div className="flex flex-col text-start">
              <div className="text-lg boldedSpan">{t("English")}</div>
              <div className="text-md">{t("Canada")}</div>
            </div>
            <RenderIf condition={currentLanguage === "ena"}>
              <div className="!text-white">
                <CheckIcon />
              </div>
            </RenderIf>
          </Button>
          <Button
            variant={`${currentLanguage === "enb" ? "blacked" : "ghost"}`}
            className=" border-2 !px-10 !py-4 !md:py-8 rounded-lg !flex !justify-between  "
            onClick={() => changeLanguage("enb")}
          >
            <div className="flex flex-col text-start">
              <div className="text-lg boldedSpan">{t("English")}</div>
              <div className="text-md">{t("Ireland")}</div>
            </div>
            <RenderIf condition={currentLanguage === "enb"}>
              <div className="!text-white">
                <CheckIcon />
              </div>
            </RenderIf>
          </Button>
          <Button
            variant={`${currentLanguage === "enc" ? "blacked" : "ghost"}`}
            className=" border-2 !px-10 !py-4 !md:py-8 rounded-lg !flex !justify-between  "
            onClick={() => changeLanguage("enc")}
          >
            <div className="flex flex-col text-start">
              <div className="text-lg boldedSpan">{t("English")}</div>
              <div className="text-md">{t("Chile")}</div>
            </div>
            <RenderIf condition={currentLanguage === "enc"}>
              <div className="!text-white">
                <CheckIcon />
              </div>
            </RenderIf>
          </Button>
          <Button
            variant={`${currentLanguage === "end" ? "blacked" : "ghost"}`}
            className=" border-2 !px-10 !py-4 !md:py-8 rounded-lg !flex !justify-between  "
            onClick={() => changeLanguage("end")}
          >
            <div className="flex flex-col text-start">
              <div className="text-lg boldedSpan">{t("English")}</div>
              <div className="text-md">{t("Singapore")}</div>
            </div>
            <RenderIf condition={currentLanguage === "end"}>
              <div className="!text-white">
                <CheckIcon />
              </div>
            </RenderIf>
          </Button>
          <Button
            variant={`${currentLanguage === "enf" ? "blacked" : "ghost"}`}
            className=" border-2 !px-10 !py-4 !md:py-8 rounded-lg !flex !justify-between  "
            onClick={() => changeLanguage("enf")}
          >
            <div className="flex flex-col text-start">
              <div className="text-lg boldedSpan">{t("English")}</div>
              <div className="text-md">{t("Saudi Arabia")}</div>
            </div>
            <RenderIf condition={currentLanguage === "enf"}>
              <div className="!text-white">
                <CheckIcon />
              </div>
            </RenderIf>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
