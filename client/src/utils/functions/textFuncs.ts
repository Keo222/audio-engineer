import { TInfoTextTitle } from "types";

export function textAria(name: TInfoTextTitle) {
  const ariaLabel = {
    hire: "Hiring",
    about: "About",
    contact: "Contact",
    services: "Services",
  };
  return ariaLabel[name];
}
