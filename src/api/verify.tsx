import { ProfileForm, SecurityForm } from "@interfaces/collaborator";
import axios from "axios";
import { getExtension, uploadImage } from "./commons";

export const verifyAccount = async (
  profileForm?: ProfileForm,
  securityForm?: SecurityForm
): Promise<string | null> => {
  try {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("collaboratortoken");
      if (storedToken) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/collaborators/verify`,
          {
            email: profileForm?.email ?? "",
            old_password: securityForm?.oldpassword ?? "",
            new_password: securityForm?.newpassword ?? "",
            phone: profileForm?.phone ?? "",
            extension: getExtension(profileForm?.image?.type ?? "") ?? "",
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
          if (response.data) {
            if (profileForm?.image) {
              const url = response.data.data.url;
              const respImg = await uploadImage(url, profileForm.image);
              console.log(respImg);
            }
            return null;
          }
        }
      }
    }
    return "Error in account verification";
  } catch (error) {
    return "Error in account verification";
  }
};