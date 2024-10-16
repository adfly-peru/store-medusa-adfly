import { Preferences } from "@interfaces/collaborator";
import axios from "axios";

export const recoverPasswordQuery = async (
  credential: string,
  subdomain: string
): Promise<string | null> => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/collaborators/auth/password`,
      {
        credential,
        sub_domain: subdomain,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const status = response.status;
    if (status == 201 || status == 200) {
      return null;
    }
    return "Error recovering password";
  } catch (error) {
    return "Error recovering password";
  }
};

export const requestAccessQuery = async ({
  name,
  lastname,
  documenttype,
  documentnumber,
  termsconditions,
  sub_domain,
  email,
}: {
  name: string;
  lastname: string;
  documenttype: string;
  documentnumber: string;
  termsconditions: boolean;
  sub_domain: string;
  email: string;
}): Promise<void> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/business-partners/collaborators/access`,
    {
      name,
      lastname,
      documenttype,
      document_type: documenttype,
      documentnumber,
      termsconditions,
      sub_domain,
      email,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const status = response.status;
  if (status == 201 || status == 200) {
    return;
  }
  throw new Error("Error requesting access");
};

export const surveyQuery = async ({
  preferences,
}: {
  preferences: Preferences;
}): Promise<string | null> => {
  try {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("collaboratortoken");
      if (storedToken) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/collaborators/survey`,
          {
            what_do_you_want: preferences.whatdoyouwant,
            top_products: preferences.topproducts,
            top_services: preferences.topservices,
            top_promotions: preferences.toppromotions,
            prefer_communication: preferences.prefercommunication,
            other_prefer_communication: preferences.otherprefercommunication,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: storedToken,
            },
          }
        );
        const status = response.status;
        if (status == 201 || status == 200) {
          return null;
        }
      }
    }
    return "Error sending survey";
  } catch (error) {
    return "Error sending survey";
  }
};

export interface RegisterForm {
  email: string;
  registerForm: string;
  old_password: string;
  new_password: string;
  phone: string;
  newsletters: boolean;
  terms: boolean;
  mode: string;
  token: string;
  uuidbusiness: string;
  document_number: string;
  document_type: string;
}

export const registerRequest = async (form: RegisterForm): Promise<void> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/collaborators/verify`,
    form,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const status = response.status;
  if (status == 201 || status == 200) {
    if (response.data) {
      if (response.data.data.errors) {
        throw new Error((response.data.data.errors as []).join("-"));
      }
      return;
    }
  }
  throw new Error("Error in account verification");
};
