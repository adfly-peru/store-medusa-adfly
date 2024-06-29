import React, { useEffect, useState } from "react";
import LoginModal from "../components/Verification/login";
import RequestModal from "../components/Verification/request";
import ResponseModal from "../components/Verification/response";
import { Box, Modal, Typography } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import Loader from "@modules/components/LoadingScreen/Loader";
import { useDesign } from "@context/design-context";

const AuthenticationModal = React.forwardRef<
  HTMLDivElement,
  {
    closeModal: () => void;
  }
>((props, _) => {
  AuthenticationModal.displayName = "AuthenticationModal";
  const { storeDesign } = useDesign();

  const [step, setStep] = useState<
    "login" | "request" | "success" | "access" | "pending"
  >("login");
  const [form, setForm] = useState<{
    name: string;
    doctype: string;
    doc: string;
    email: string;
  }>({
    name: "",
    doctype: "",
    doc: "",
    email: "",
  });

  switch (step) {
    case "login":
      return (
        <LoginModal
          closeModal={props.closeModal}
          goRequest={() => setStep("request")}
        />
      );
    case "request":
      return (
        <RequestModal
          goBackLogin={() => setStep("login")}
          goNext={(value, newForm) => {
            setForm({
              name: `${newForm.name} ${newForm.lastname}`,
              doctype: newForm.documenttype?.value ?? "",
              doc: newForm.documentnumber,
              email: newForm.email,
            });
            setStep(value);
          }}
        />
      );
    case "success":
      return (
        <ResponseModal
          goBack={async () => setStep("login")}
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
                {storeDesign?.commercialname ?? "[Nombre de empresa]"}
              </Typography>{" "}
              revisará tu solicitud.
              <br /> Te estaremos informando sobre el resultado a{" "}
              <Typography
                display="inline"
                fontWeight={700}
                variant="body1"
                fontSize={14}
              >
                {form.email ?? "correo@dominio.com"}
              </Typography>
              .
            </Typography>
          }
        />
      );
    case "access":
      return (
        <ResponseModal
          goBack={async () => {
            const result = await signIn("dni", {
              redirect: false,
              callbackUrl: "/",
              doc: form.doc,
              docType: form.doctype,
            });
            if (!result?.ok)
              console.error(
                "Lo sentimos, el número de documento ingresado no es válido, verifica que los datos sean correctos o solicita acceso para continuar."
              );
            else props.closeModal();
          }}
          buttonText="Ingresar"
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
              Hola {form.name ?? "[Nombre]"},{" "}
              <Typography
                display="inline"
                fontWeight={700}
                variant="body1"
                fontSize={14}
              >
                {form.doctype ?? "[tipo documento]"}
              </Typography>{" "}
              con n° documento{" "}
              <Typography
                display="inline"
                fontWeight={700}
                variant="body1"
                fontSize={14}
              >
                {form.doc ?? "[# documento]"}
              </Typography>{" "}
              ya contaba con acceso a la plataforma de beneficios. No es
              necesario enviar una solicitud de acceso.
            </Typography>
          }
        />
      );
    case "pending":
      return (
        <ResponseModal
          goBack={async () => setStep("login")}
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
              Hola {form.name ?? "[Nombre]"},{" "}
              <Typography
                display="inline"
                fontWeight={700}
                variant="body1"
                fontSize={14}
              >
                {form.doctype ?? "[tipo documento]"}
              </Typography>{" "}
              con n° documento{" "}
              <Typography
                display="inline"
                fontWeight={700}
                variant="body1"
                fontSize={14}
              >
                {form.doc ?? "[# documento]"}
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
    return <Loader />;
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
        <Box
          sx={{
            position: "absolute",
            inset: "0px",
            height: "100%",
            overflow: "hidden auto",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            padding: "1.5rem",
          }}
        >
          <Box
            sx={(theme) => ({
              position: "relative",
              margin: "auto",
              height: "max-content",
              maxHeight: "unset",
              transform: "none",
              top: "unset",
              left: "unset",
            })}
          >
            <AuthenticationModal closeModal={() => setIsModalOpen(false)} />
          </Box>
        </Box>
      </Modal>
      {children}
    </div>
  );
};

export default Authentication;
