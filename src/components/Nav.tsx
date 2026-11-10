import { Gift, House, Settings, TreePine, Users } from "lucide-react";
import type { Page } from "../types";

const items: { id: Page; label: string; Icon: typeof House }[] = [
  { id: "home", label: "Início", Icon: House },
  { id: "people", label: "Pessoas", Icon: Users },
  { id: "gifts", label: "Presentes", Icon: Gift },
  { id: "xmas", label: "Natal", Icon: TreePine },
  { id: "settings", label: "Definições", Icon: Settings }
];

export default function Nav({ page, onNavigate }: { page: Page; onNavigate: (p: Page) => void }) {
  return <nav className="nav" aria-label="Principal">
    <b className="logo">Giftbook<i>.</i></b>
    {items.map(({ id, label, Icon }) =>
      <button key={id} className={page === id ? "on" : ""} onClick={() => onNavigate(id)} aria-current={page === id ? "page" : undefined}>
        <Icon size={20} /><span>{label}</span>
      </button>)}
  </nav>;
}
