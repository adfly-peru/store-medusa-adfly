import { Address } from "@interfaces/address-interface";
import { CollaboratorAddress } from "generated/graphql";
import ubigeoPeru from "ubigeo-peru";

export const formatAddress = (add: CollaboratorAddress) => {
  const d =
    ubigeoPeru.reniec.find(
      (v) =>
        v.departamento == add?.department &&
        v.provincia == "00" &&
        v.distrito == "00"
    )?.nombre ?? "";
  const p =
    ubigeoPeru.reniec.find(
      (v) =>
        v.departamento == add?.department &&
        v.provincia == add?.province &&
        v.distrito == "00"
    )?.nombre ?? "";
  const c =
    ubigeoPeru.reniec.find(
      (v) =>
        v.departamento == add?.department &&
        v.provincia == add?.province &&
        v.distrito == add?.district
    )?.nombre ?? "";
  return `${c} - ${p} - ${d}`;
};
