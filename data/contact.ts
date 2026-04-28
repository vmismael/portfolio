import { Mail, Linkedin, MessageCircle, ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Channel = {
  icon: LucideIcon;
  label: string;
  val: string;
  href: string;
  copyable?: boolean;
};

export const CHANNELS: Channel[] = [
  { icon: Mail,          label: "Email",    val: "vitor.montemor.ismael@gmail.com", href: "mailto:vitor.montemor.ismael@gmail.com", copyable: true },
  { icon: Linkedin,      label: "LinkedIn", val: "/in/vitormontemorismael",          href: "https://linkedin.com/in/vitormontemorismael/" },
  { icon: MessageCircle, label: "WhatsApp", val: "+55 (19) 98105-7925",              href: "https://wa.me/5519981057925" },
  { icon: ExternalLink,  label: "GitHub",   val: "github.com/vmismael",              href: "https://github.com/vmismael" },
];
