import { Collaborator, Preferences } from "@interfaces/collaborator";
import { useEffect, useState } from "react";
import SurveyModalTemplate from "./survey-modal-template";
import SurveyWelcomeModal from "./survey-welcome-modal";
import SurveyFinalModal from "./survey-final-modal";
import { useAccount } from "@context/account-context";

const SurveyModal = () => {
  const { collaborator } = useAccount();
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState<Preferences>({});
  const { survey } = useAccount();

  const updatePreferences = (newPreferences: Preferences) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      ...newPreferences,
    }));
  };

  useEffect(() => {
    if (collaborator && collaborator.preferences) {
      updatePreferences(collaborator.preferences);
    }
  }, [collaborator]);

  if (!collaborator) return <></>;

  switch (step) {
    case 0:
      return (
        <SurveyWelcomeModal
          key="welcome"
          setStep={() => {
            if (!collaborator.preferences) setStep(1);
            else if (!collaborator.preferences.whatdoyouwant) setStep(1);
            else if (!collaborator.preferences.topproducts) setStep(2);
            else if (!collaborator.preferences.topservices) setStep(3);
            else if (!collaborator.preferences.toppromotions) setStep(4);
            else if (!collaborator.preferences.prefercommunication) setStep(5);
            else setStep(5);
          }}
          name={collaborator.name}
        />
      );
    case 1:
      return (
        <SurveyModalTemplate
          key="whatdoyouwant"
          step={step}
          setStep={setStep}
          title={"¿Qué esperas de la tienda?"}
          maxSelections={4}
          subtitle={"Puedes escoger más de una opción"}
          onSelectionComplete={async (options) => {
            const preferences: Preferences = {
              whatdoyouwant: options,
            };
            await survey(preferences);
          }}
          onBefore={(options) => {
            const newpreferences: Preferences = {
              ...preferences,
              whatdoyouwant: options,
            };
            setPreferences(newpreferences);
          }}
          defaultSelectedKeys={preferences?.whatdoyouwant}
          options={[
            {
              title: "Descuentos",
              key: "discounts",
              size: 80,
            },
            {
              title: "Variedad de ofertas",
              key: "variety",
              size: 80,
            },
            {
              title: "Facilidades de pago",
              key: "payment_facilities",
              size: 80,
            },
            {
              title: "Facilidades de entrega",
              key: "shipping_facilities",
              size: 80,
            },
          ]}
        />
      );
    case 2:
      return (
        <SurveyModalTemplate
          key="topproducts"
          step={step}
          setStep={setStep}
          title={"¿Qué productos te gustaría encontrar?"}
          subtitle={"Escoge hasta 5 opciones"}
          maxSelections={5}
          onSelectionComplete={async (options) => {
            const preferences: Preferences = {
              topproducts: options,
            };
            await survey(preferences);
          }}
          onBefore={(options) => {
            const newpreferences: Preferences = {
              topproducts: options,
            };
            updatePreferences(newpreferences);
          }}
          defaultSelectedKeys={preferences?.topproducts}
          options={[
            {
              title: "Alimentos y abarrotes",
              key: "food_and_grocery",
              size: 50,
            },
            {
              title: "Automotriz e industrial",
              key: "automotive_and_industrial",
              size: 50,
            },
            {
              title: "Belleza y salud",
              key: "beauty_and_health",
              size: 50,
            },
            {
              title: "Bebés y niños",
              key: "baby_and_children",
              size: 50,
            },
            {
              title: "Deportes y exterior",
              key: "sports_and_outdoors",
              size: 50,
            },
            {
              title: "Limpieza",
              key: "clean",
              size: 50,
            },
            {
              title: "Electrohogar",
              description: "(Lavadora, refrigeradora)",
              key: "electrohome",
              size: 50,
            },
            {
              title: "Hogar",
              description: "(Cocina, muebles, baño, menaje)",
              key: "home",
              size: 50,
            },
            {
              title: "Libros, películas y música",
              key: "books_movies_and_music",
              size: 50,
            },
            {
              title: "Moda",
              description: "(Ropa, zapatos, accesorios)",
              key: "fashion",
              size: 50,
            },
            {
              title: "Mascotas",
              description: "(Accesorios, comida)",
              key: "pets",
              size: 50,
            },
            {
              title: "Tecnología",
              description: "(Televisores, computadoras)",
              key: "technology",
              size: 50,
            },
          ]}
        />
      );
    case 3:
      return (
        <SurveyModalTemplate
          key="topservices"
          step={step}
          setStep={setStep}
          title={"¿Qué servicios te gustaría encontrar?"}
          subtitle={"Escoge hasta 3 opciones"}
          maxSelections={3}
          onSelectionComplete={async (options) => {
            const preferences: Preferences = {
              topservices: options,
            };
            await survey(preferences);
          }}
          onBefore={(options) => {
            const newpreferences: Preferences = {
              topservices: options,
            };
            updatePreferences(newpreferences);
          }}
          defaultSelectedKeys={preferences?.topservices}
          options={[
            {
              title: "Comidas",
              description: "(Restaurantes, cafés)",
              key: "food",
              size: 60,
            },
            {
              title: "Deportes",
              description: "(Clases yoga, gimnasios)",
              key: "sports",
              size: 60,
            },
            {
              title: "Educación",
              description: "(Cursos, programas)",
              key: "education",
              size: 60,
            },
            {
              title: "Entretenimiento",
              description: "(Cine, teatros, museos)",
              key: "entertainment",
              size: 60,
            },
            {
              title: "Salud",
              description: "(Consulta médica, dentistas)",
              key: "health",
              size: 60,
            },
            {
              title: "Viajes",
              description: "(Pasajes, hoteles)",
              key: "travel",
              size: 60,
            },
          ]}
        />
      );
    case 4:
      return (
        <SurveyModalTemplate
          key="toppromotions"
          step={step}
          setStep={setStep}
          title={"¿Qué promociones te gustaría encontrar?"}
          subtitle={"Puedes marcar más de una opción"}
          maxSelections={5}
          onSelectionComplete={async (options) => {
            const preferences: Preferences = {
              toppromotions: options,
            };
            await survey(preferences);
          }}
          onBefore={(options) => {
            const newpreferences: Preferences = {
              toppromotions: options,
            };
            updatePreferences(newpreferences);
          }}
          defaultSelectedKeys={preferences?.toppromotions}
          options={[
            {
              title: "Envío Gratis",
              key: "free_shipping",
              size: 60,
            },
            {
              title: "Descuentos",
              key: "discounts",
              size: 60,
            },
            {
              title: "Regalos",
              key: "gifts",
              size: 60,
            },
            {
              title: "Sorteos",
              key: "give_aways",
              size: 60,
            },
            {
              title: "2x1",
              key: "promotions_2x1",
              size: 60,
            },
          ]}
        />
      );

    case 5:
      return (
        <SurveyFinalModal
          key="prefercommunication"
          step={step}
          setStep={setStep}
          onSelectionComplete={async (options, other) => {
            const preferences: Preferences = {
              prefercommunication: options,
              otherprefercommunication: other,
            };
            await survey(preferences);
          }}
          onBefore={(options, other) => {
            const newpreferences: Preferences = {
              prefercommunication: options,
              otherprefercommunication: other,
            };
            updatePreferences(newpreferences);
          }}
          defaultOther={preferences?.otherprefercommunication}
          defaultValue={preferences?.prefercommunication}
        />
      );

    default:
      return <></>;
  }
};

export default SurveyModal;
