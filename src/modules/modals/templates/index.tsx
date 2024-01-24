import React, { useEffect } from "react";
import { useAccount } from "@context/account-context";
import { modals } from "@mantine/modals";
import SurveyModal from "./components/survey-modal";

const CollaboratorModals: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { collaborator } = useAccount();

  useEffect(() => {
    if (!collaborator) return;
    if (!collaborator.emailVerify || !collaborator.changePassword) return;

    const lastOpened = localStorage.getItem("surveyModalTime");
    const now = new Date().getTime();

    // const fiveHoursInMs = 5 * 60 * 60 * 1000;
    const fiveHoursInMs = 10 * 60 * 1000;

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
      children: <SurveyModal collaborator={collaborator} />,
    });
  }, [collaborator]);

  return <>{children}</>;
};

export default CollaboratorModals;
