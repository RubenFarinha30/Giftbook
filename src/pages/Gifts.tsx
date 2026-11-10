import { useState } from "react";
import type { Api } from "../types";
import { YEAR } from "../lib";
import GiftGroups from "../components/GiftGroups";

const F = [["all", "Todos"], ["ideia", "Ideias"], ["escolhido", "Por comprar"], ["comprado", "Comprados"], ["entregue", "Entregues"], ["hist", "Histórico"]];

export default function Gifts({ people, gifts, advance, edit }: Api) {
  const [f, setF] = useState("all");
  const [q, setQ] = useState("");
  const name = (id: number) => people.find(p => p.id === id)?.name ?? "";
  const list = gifts.filter(g => (f === "hist" ? g.year < YEAR : g.year === YEAR && (f === "all" || g.status === f)) && `${g.name} ${name(g.personId)}`.toLowerCase().includes(q.toLowerCase()));
  const years = Array.from(new Set(list.map(g => g.year))).sort().reverse();
  const props = { people, advance, edit };
  return <>
    <h1>Presentes</h1>
    <input className="search" placeholder="Procurar presente ou pessoa" aria-label="Procurar" value={q} onChange={e => setQ(e.target.value)} />
    <div className="chips">{F.map(([k, l]) => <button key={k} className={`chip ${f === k ? "on" : ""}`} onClick={() => setF(k)}>{l}</button>)}</div>
    {f === "hist"
      ? years.map(y => <div key={y}><h3 className="yr">{y}</h3><GiftGroups {...props} list={list.filter(g => g.year === y)} /></div>)
      : <GiftGroups {...props} list={list} />}
    {!list.length && <p className="mu empty">Nada por aqui. Usa “Presente” para adicionar.</p>}
  </>;
}
