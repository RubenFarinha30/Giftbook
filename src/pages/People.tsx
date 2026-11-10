import { useState } from "react";
import { Trash2 } from "lucide-react";
import type { Api } from "../types";
import { YEAR, initials } from "../lib";

export default function People({ people, gifts, delPerson }: Api) {
  const [q, setQ] = useState("");
  const list = people.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
  return <>
    <h1>Pessoas</h1>
    <input className="search" placeholder="Procurar pessoa" aria-label="Procurar pessoa" value={q} onChange={e => setQ(e.target.value)} />
    {list.map(p => {
      const n = gifts.filter(g => g.personId === p.id && g.year === YEAR && g.status !== "ideia").length;
      return <div className="row" key={p.id}>
        <div className="av">{initials(p.name)}</div>
        <div className="grow"><b>{p.name}</b><div className="mu">{p.relation}{p.birthday && `, ${new Date(`${p.birthday}T12:00:00`).toLocaleDateString("pt-PT", { day: "numeric", month: "long" })}`}</div></div>
        <span className="mu">{n} {n === 1 ? "escolhido" : "escolhidos"}</span>
        <button className="icon" onClick={() => delPerson(p.id)} aria-label={`Apagar ${p.name}`}><Trash2 size={17} /></button>
      </div>;
    })}
    {!list.length && <p className="mu empty">Ninguém por aqui. Usa “Pessoa” para adicionar.</p>}
  </>;
}
