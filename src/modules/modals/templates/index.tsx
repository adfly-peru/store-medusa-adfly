import React, { useEffect } from "react";
import { useAccount } from "@context/account-context";
import { modals } from "@mantine/modals";
import SurveyModal from "../components/survey-modal";
import ValentinesModal from "../components/valentines/valentines-modal";
import { Image } from "@mantine/core";
import TadaMarchModal from "../components/tada/tada-march-modal";

function isTodayValentinesDay(): boolean {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  return day === 14 && month === 2;
}

function isMonth(m: number): boolean {
  const today = new Date();
  const month = today.getMonth() + 1;
  return month === m;
}

const CollaboratorModals: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { collaborator } = useAccount();

  useEffect(() => {
    if (!collaborator) return;
    if (!collaborator.emailVerify || !collaborator.changePassword) return;
    if (!(typeof window !== undefined)) return;
    if ((collaborator.preferences?.prefercommunication ?? []).length === 0) {
      const lastOpened = localStorage.getItem("surveyModalTime");
      const now = new Date().getTime();

      const fiveHoursInMs = 1 * 60 * 60 * 1000;

      if (lastOpened && now - parseInt(lastOpened) < fiveHoursInMs) {
        return;
      }

      localStorage.setItem("surveyModalTime", now.toString());

      modals.open({
        withCloseButton: false,
        closeOnClickOutside: false,
        closeOnEscape: false,
        size: 680,
        styles: {
          body: {
            paddingLeft: 0,
            paddingRight: 0,
          },
          content: {
            borderRadius: "0.5rem",
          },
        },
        children: <SurveyModal />,
      });
    }
    // Tada March Modal
    const valentinesmodal = localStorage.getItem("tadamarchmodal");
    if (isMonth(3) && valentinesmodal === null) {
      modals.open({
        onClose: () => {
          localStorage.setItem("tadamarchmodal", "closed");
          modals.closeAll();
        },
        closeOnClickOutside: false,
        closeOnEscape: false,
        size: 880,
        title: (
          <Image
            src="/fridays_coupon/Regalo.png"
            alt="Regalo"
            style={{
              width: "200px",
              height: "200px",
            }}
          ></Image>
        ),
        styles: {
          body: {
            padding: 0,
          },
          title: {
            "@media (max-width: 62em)": {
              position: "relative",
              top: -15,
              left: "25%",
            },
          },
          close: {
            marginRight: "1rem",
            marginTop: 30,
            color: "#31658E",
          },
          header: {
            position: "relative",
            backgroundColor: "transparent",
            width: 800,
            height: 110,
            top: 60,
            left: 80,
            "@media (max-width: 62em)": {
              position: "relative",
              backgroundColor: "transparent",
              width: "100%",
              height: 110,
              top: 60,
              left: 0,
            },
          },
          content: {
            borderRadius: "2.5rem",
            backgroundColor: "transparent",
            boxShadow: "unset",
          },
        },
        children: <TadaMarchModal />,
      });
    }
  }, [collaborator]);

  return <>{children}</>;
};

export default CollaboratorModals;
