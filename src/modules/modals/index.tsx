import { Modal } from "@mui/material";
import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import RegisterBenefitsModal from "./RegisterBenefits";

const ModalsManager = () => {
  const { data: session } = useSession();
  const [registerBenefitsModal, setRegisterBenefitsModal] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) return;
    if (!session.user.accessToken && !session.user.completeregistration)
      setRegisterBenefitsModal(true);
  }, [
    session?.user?.accessToken,
    session?.user?.completeregistration,
    session?.user?.id,
  ]);

  return (
    <Fragment>
      <Modal
        open={registerBenefitsModal}
        onClose={() => setRegisterBenefitsModal(false)}
      >
        <RegisterBenefitsModal
          onClose={() => setRegisterBenefitsModal(false)}
        />
      </Modal>
    </Fragment>
  );
};

export default ModalsManager;
