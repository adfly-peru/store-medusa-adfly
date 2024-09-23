import { useEffect, useState } from "react";
import Script from "next/script";
import { useSession } from "next-auth/react";
import { useAccount } from "@context/account-context";
import { useDesign } from "@context/design-context";

declare global {
  interface Window {
    FreshworksWidget: (...args: any[]) => void;
    fwSettings: {
      widget_id: number;
    };
  }
}

const FreshDeskWidget = () => {
  const { data: session } = useSession();
  const { storeDesign } = useDesign();
  const { collaborator } = useAccount();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function showWhenHTML2CanvasIsAvailable() {
      if (!window.FreshworksWidget) {
        setTimeout(showWhenHTML2CanvasIsAvailable, 100);
      } else {
        setReady(true);
      }
    }
    showWhenHTML2CanvasIsAvailable();
  }, []);

  useEffect(() => {
    if (!window.FreshworksWidget || !ready || !storeDesign?.commercialname)
      return;
    window.FreshworksWidget("destroy");
    window.FreshworksWidget("boot");

    let name = "";
    let email = "";
    let cf_tipo_de_documento = "";
    let cf_documento = "";
    const cf_empresa = storeDesign.commercialname;
    let cf_celular = "";
    if (session?.user) {
      name = `${session.user.name ?? ""} ${session.user.lastname ?? ""}`;
      email = session.user.email ?? "";
      cf_tipo_de_documento = session.user.documenttype ?? "";
      cf_documento = session.user.dni ?? "";
    }
    if (collaborator) {
      name = `${collaborator.name ?? ""} ${collaborator.lastname ?? ""}`;
      email = collaborator.email ?? "";
      cf_tipo_de_documento = collaborator.documenttype;
      cf_documento = collaborator.documentnumber;
      cf_celular = collaborator.phonenumber ?? "";
    }

    window.FreshworksWidget("enable", "ticketForm", [
      "name",
      "email",
      "custom_fields.cf_tipo_de_documento",
      "custom_fields.cf_documento",
      "custom_fields.cf_empresa",
      "custom_fields.cf_celular",
    ]);

    window.FreshworksWidget("prefill", "ticketForm", {
      name,
      email,
      custom_fields: {
        cf_tipo_de_documento,
        cf_documento,
        cf_empresa,
        cf_celular,
      },
    });

    window.FreshworksWidget("hide", "ticketForm", [
      "product_id",
      "custom_fields.cf_empresa",
    ]);

    if (!session?.user) {
      window.FreshworksWidget("disable", "ticketForm", [
        "custom_fields.cf_empresa",
      ]);
      return;
    }

    if (!session.user.accessToken && !session.user.completeregistration) {
      // Caso: Identificado pero no registrado
      window.FreshworksWidget("disable", "ticketForm", [
        "name",
        "custom_fields.cf_tipo_de_documento",
        "custom_fields.cf_documento",
        "custom_fields.cf_empresa",
      ]);
    } else if (session.user.completeregistration && !session.user.accessToken) {
      // Caso: Registrado pero no ha iniciado sesión
      window.FreshworksWidget("disable", "ticketForm", [
        "name",
        "email",
        "custom_fields.cf_tipo_de_documento",
        "custom_fields.cf_documento",
        "custom_fields.cf_empresa",
      ]);
    } else if (session.user.accessToken && collaborator) {
      // Caso: Iniciado sesión
      window.FreshworksWidget("disable", "ticketForm", [
        "name",
        "email",
        "custom_fields.cf_tipo_de_documento",
        "custom_fields.cf_documento",
        "custom_fields.cf_empresa",
        "custom_fields.cf_celular",
      ]);
    }
  }, [
    collaborator,
    collaborator?.lastname,
    collaborator?.name,
    session?.user,
    ready,
    storeDesign?.commercialname,
  ]);

  return (
    <>
      <Script
        id="freshdesk-widget"
        src={`https://widget.freshworks.com/widgets/${process.env.NEXT_PUBLIC_FRESH_WIDGET_ID}.js`}
        strategy="lazyOnload"
        onReady={() => {
          if (window.FreshworksWidget) {
            console.log({ data: window.FreshworksWidget });
            // Ahora es seguro usar FreshworksWidget
            console.log("FreshworksWidget is ready");
            window.FreshworksWidget("prefill", "ticketForm", {
              name: "Juan Pérez",
              email: "juan.perez@example.com",
            });
          } else {
            console.log("no widget ");
          }
        }}
        onError={() => {
          console.error("Failed to load Freshdesk widget");
        }}
      />
    </>
  );
};

export default FreshDeskWidget;
