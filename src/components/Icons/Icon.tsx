import React from "react";
import {
  LuArrowUpRight,
  LuCalendar,
  LuCheck,
  LuChevronDown,
  LuChevronUp,
  LuCreditCard,
  LuIdCard,
  LuInfo,
  LuMapPin,
  LuMinus,
  LuPhone,
  LuPlus,
  LuRefreshCcw,
  LuUser
} from "react-icons/lu";

export type IconName =
  | "ArrowUpRight"
  | "Refresh"
  | "Info"
  | "Calendar"
  | "Check"
  | "ChevronDown"
  | "ChevronUp"
  | "CreditCard"
  | "IdCard"
  | "MapPin"
  | "Minus"
  | "Phone"
  | "Plus"
  | "User";

interface IconUIProps extends React.SVGProps<SVGSVGElement> {
  icon: IconName;
  size?: number | string;
}

const IconUI = ({ icon, size, ...props }: IconUIProps) => {
  const icons = {
    ArrowUpRight: LuArrowUpRight,
    Refresh: LuRefreshCcw,
    Calendar: LuCalendar,
    Check: LuCheck,
    ChevronDown: LuChevronDown,
    ChevronUp: LuChevronUp,
    CreditCard: LuCreditCard,
    IdCard: LuIdCard,
    MapPin: LuMapPin,
    Minus: LuMinus,
    Phone: LuPhone,
    Plus: LuPlus,
    User: LuUser,
    Info: LuInfo,
  };

  const SelectedIcon = icons[icon];

  if (!SelectedIcon) {
    console.warn(`O ícone "${icon}" não foi encontrado.`);
    return null;
  }

  return <SelectedIcon size={size} {...props} />;
};

export default IconUI;
