import { TreePine } from "lucide-react";
import type { Api } from "../types";
import { YEAR, daysTo, nextDate } from "../lib";

export default function Home({ people, gifts, go }: Api) {
  const ready = (id: number) => gifts.some(g => g.personId === id && g.year === YEAR && g.status !== "ideia");
  const ev = [
    ...people.filter(p => p.birthday).map(p => ({ key: p.id, title: `Aniversário de ${p.name}`, date: nextDate(+p.birthday.slice(5, 7) - 1, +p.birthday.slice(8, 10)), warn: !ready(p.id), xmas: false })),
    { key: 0, title: "Natal", date: nextDate(11, 25), warn: false, xmas: true }
  ].sort((a, b) => +a.date - +b.date).slice(0, 5);
  const toBuy = gifts.filter(g => g.year === YEAR && g.status === "escolhido").length;
  const when = (n: number) => n === 0 ? "hoje" : n === 1 ? "amanhã" : `em ${n} dias`;
  return <>
    <h1>Próximas datas</h1>
    {ev.map(e => <div className="row" key={e.key}>
      <div className={`date ${e.xmas ? "xm" : ""}`}><b>{e.date.getDate()}</b><small>{e.date.toLocaleDateString("pt-PT", { month: "short" }).replace(".", "")}</small></div>
      <div className="grow"><b>{e.title}</b><div className="mu">{when(daysTo(e.date))}</div></div>
      {e.warn && <span className="flag">Sem presente escolhido</span>}
      {e.xmas && <button className="btn ghost" onClick={() => go("xmas")}><TreePine size={15} />Abrir</button>}
    </div>)}
    {!people.length && <p className="mu empty">Ainda sem pessoas. Começa por adicionar quem queres presentear.</p>}
    {toBuy > 0 && <button className="note" onClick={() => go("gifts")}>{toBuy} {toBuy === 1 ? "presente escolhido por comprar" : "presentes escolhidos por comprar"}</button>}
  </>;
}
