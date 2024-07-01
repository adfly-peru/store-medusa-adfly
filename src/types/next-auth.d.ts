import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string | null;
    documenttype?: string;
    dni?: string;
    credential?: string;
    lastname?: string;
    dni?: string;
    accessToken?: string;
    uuidbusiness?: string;
    completeregistration?: boolean;
    sub_domain?: string;
    provider?: string;
  }

  interface Session {
    user?: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      dni?: string;
      credential?: string;
      lastname?: string;
      documenttype?: string;
      accessToken?: string;
      uuidbusiness?: string;
      completeregistration?: boolean;
      sub_domain?: string;
      provider?: string;
    };
  }
}
