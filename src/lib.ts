import type { Gift, Prio, Status } from "./types";
export const YEAR = new Date().getFullYear();
export const STATUS: Status[] = ["ideia", "escolhido", "comprado", "entregue"];
export const LABEL: Record<Status, string> = { ideia: "Ideia", escolhido: "Escolhido", comprado: "Comprado", entregue: "Entregue" };
export const PRIO: Record<Prio, string> = { baixa: "baixa", media: "média", alta: "alta" };
export const eur = (n: number) => n.toLocaleString("pt-PT", { style: "currency", currency: "EUR", minimumFractionDigits: Number.isInteger(n) ? 0 : 2 });
export const cost = (g: Gift) => g.real ?? g.est ?? 0;
export const initials = (n: string) => n.trim().split(/\s+/).map(s => s[0]).join("").slice(0, 2).toUpperCase();
export function nextDate(m: number, d: number) {
  const t = new Date(); t.setHours(0, 0, 0, 0);
  const x = new Date(t.getFullYear(), m, d);
  return x < t ? new Date(t.getFullYear() + 1, m, d) : x;
}
export const daysTo = (x: Date) => Math.round((x.getTime() - new Date().setHours(0, 0, 0, 0)) / 864e5);
