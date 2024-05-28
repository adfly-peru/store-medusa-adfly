import React, { useEffect, useState } from "react";
import LoginModal from "../components/Verification/login";
import RequestModal from "../components/Verification/request";
import ResponseModal from "../components/Verification/response";
import { Modal, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

const ALLOW_DNI_PAGES = ["search", "product", "home", "cart"];

const AuthenticationModal = React.forwardRef<
  HTMLDivElement,
  {
    closeModal: () => void;
  }
>((props, _) => {
  AuthenticationModal.displayName = "AuthenticationModal";

  const [step, setStep] = useState<
    "login" | "request" | "success" | "access" | "pending"
  >("login");

  switch (step) {
    case "login":
      return (
        <LoginModal
          closeModal={props.closeModal}
          goRequest={() => setStep("request")}
        />
      );
    case "request":
      return <RequestModal goBackLogin={() => setStep("login")} />;
    case "success":
      return (
        <ResponseModal
          title={"¡Solicitud enviada con éxito!"}
          response={
            <Typography
              textAlign="justify"
              variant="body1"
              fontSize={14}
              sx={{
                lineHeight: "19px",
              }}
            >
              Gracias por enviar tu solicitud.{" "}
              <Typography
                display="inline"
                fontWeight={700}
                variant="body1"
                fontSize={14}
              >
                [Nombre de empresa]
              </Typography>{" "}
              revisará tu solicitud. Te estaremos informando sobre el resultado
              a{" "}
              <Typography
                display="inline"
                fontWeight={700}
                variant="body1"
                fontSize={14}
              >
                correo@dominio.com
              </Typography>
              .
            </Typography>
          }
        />
      );
    case "access":
      return (
        <ResponseModal
          title={"¡Ya cuentas con acceso!"}
          response={
            <Typography
              textAlign="justify"
              variant="body1"
              fontSize={14}
              sx={{
                lineHeight: "19px",
              }}
            >
              Hola [Nombre],{" "}
              <Typography
                display="inline"
                fontWeight={700}
                variant="body1"
                fontSize={14}
              >
                [tipo documento]
              </Typography>{" "}
              con n° documento{" "}
              <Typography
                display="inline"
                fontWeight={700}
                variant="body1"
                fontSize={14}
              >
                [# documento]
              </Typography>{" "}
              ya contaba con acceso a la tienda. No es necesario enviar una
              solicitud de acceso.
            </Typography>
          }
        />
      );
    case "pending":
      return (
        <ResponseModal
          title={"Solicitud pendiente"}
          response={
            <Typography
              textAlign="justify"
              variant="body1"
              fontSize={14}
              sx={{
                lineHeight: "19px",
              }}
            >
              Hola [Nombre],{" "}
              <Typography
                display="inline"
                fontWeight={700}
                variant="body1"
                fontSize={14}
              >
                [tipo documento]
              </Typography>{" "}
              con n° documento{" "}
              <Typography
                display="inline"
                fontWeight={700}
                variant="body1"
                fontSize={14}
              >
                [# documento]
              </Typography>{" "}
              ya cuenta con una solicitud pendiente de revisión.
            </Typography>
          }
        />
      );
  }
});

const Authentication: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") setIsModalOpen(true);
  }, [status]);

  if (status === "loading") {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={() => null}
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: "blur(8px)",
            },
          },
        }}
      >
        <AuthenticationModal closeModal={() => setIsModalOpen(false)} />
      </Modal>
      {children}
    </div>
  );
};

export default Authentication;
