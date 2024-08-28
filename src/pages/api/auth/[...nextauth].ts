import axios from "axios";
import jwtDecode from "jwt-decode";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export interface IToken {
  uuid_collaborator: string;
  uuid_business: string;
  creation_date: string;
  exp: number;
}

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 17 * 60 * 60,
    updateAge: 17 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      id: "dni",
      name: "Dni",
      credentials: {
        docType: {
          label: "Tipo Documento",
          type: "text",
          placeholder: "Ingresa el tipo de Documento",
        },
        doc: { label: "DNI", type: "text", placeholder: "Ingresa tu DNI" },
      },
      authorize: async (credentials, req) => {
        const host = req.headers?.host;
        const subdomain = (host as string).split(".")[0];
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/collaborators/checkaccess`,
            {
              documenttype: credentials?.docType,
              document_type: credentials?.docType,
              documentnumber: credentials?.doc,
              sub_domain: subdomain,
            }
          );
          if (response.status === 200 || response.status === 201) {
            const {
              uuid_collaborator,
              uuid_business,
              name,
              last_name,
              document_type,
              document_number,
              complete_registration,
              email,
            } = response.data.data.data;
            return {
              id: uuid_collaborator,
              uuidbusiness: uuid_business,
              name,
              lastname: last_name,
              documenttype: document_type,
              dni: document_number,
              completeregistration: complete_registration,
              sub_domain: subdomain,
              email,
            };
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error("DNI authorization error:", error);
          return null;
        }
      },
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        docType: {
          type: "text",
        },
        credential: {
          label: "credential",
          type: "text",
          placeholder: "Ingresa tu DNI",
        },
        password: {
          label: "password",
          type: "text",
          placeholder: "Ingresa tu contrasena",
        },
        mode: {
          type: "text",
        },
        token: {
          type: "text",
        },
      },
      authorize: async (credentials, req) => {
        const host = req.headers?.host;
        const subdomain = (host as string).split(".")[0];
        if (credentials?.mode === "token") {
          const decodedToken: IToken = jwtDecode(credentials.token);
          return {
            accessToken: credentials.credential,
            id: decodedToken.uuid_collaborator,
            uuidbusiness: decodedToken.uuid_business,
          };
        }
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/collaborators/auth/signin`,
            {
              credential: credentials?.credential,
              document_type: credentials?.docType,
              password: credentials?.password,
              sub_domain: subdomain,
              mode: credentials?.mode,
              google_token: credentials?.token,
            }
          );
          if (response.status === 200 || response.status === 201) {
            const accessToken = response.data.data.data.token;
            const decodedToken: IToken = jwtDecode(accessToken);
            return {
              accessToken,
              id: decodedToken.uuid_collaborator,
              uuidbusiness: decodedToken.uuid_business,
            };
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error("Custom credentials authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.lastname = user.lastname;
        token.dni = user.dni;
        token.documenttype = user.documenttype;
        token.credential = user.credential;
        token.accessToken = user.accessToken;
        token.uuidbusiness = user.uuidbusiness;
        token.completeregistration = user.completeregistration;
        token.email = user.email;
        token.provider = account?.provider || token.provider;
        token.sub_domain = user.sub_domain;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
});
