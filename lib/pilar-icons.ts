import {
  Briefcase,
  Hospital,
  Landmark,
  type LucideIcon,
  Mountain,
  Route,
  Users,
} from "lucide-react";
import type { Pilar } from "@/content/pilares";

export const PILAR_ICONS: Record<Pilar["icon"], LucideIcon> = {
  hospital: Hospital,
  briefcase: Briefcase,
  route: Route,
  users: Users,
  landmark: Landmark,
  mountain: Mountain,
};
