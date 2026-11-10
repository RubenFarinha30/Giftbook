import { Link2 } from "lucide-react";
import type { Api, Gift } from "../types";
import { LABEL, PRIO, cost, eur } from "../lib";

export default function GiftGroups({ people, list, advance, edit }: Pick<Api, "people" | "advance" | "edit"> & { list: Gift[] }) {
  return <>{people.map(p => {
    const gs = list.filter(g => g.personId === p.id);
    if (!gs.length) return null;
    return <section key={p.id}>
      <div className="grp"><span>{p.name}</span><small>{eur(gs.reduce((s, g) => s + cost(g), 0))}</small></div>
      {gs.map(g => <div className="row" key={g.id}>
        <button className={`st s-${g.status}`} onClick={() => advance(g.id)} aria-label={`${LABEL[g.status]}, avançar estado`}>{LABEL[g.status]}</button>
        <button className="grow name" onClick={() => edit(g)}>{g.name}</button>
        {g.link && <a className="icon" href={g.link} target="_blank" rel="noreferrer" aria-label="Abrir link"><Link2 size={16} /></a>}
        <i className={`pr p-${g.prio}`} title={`Prioridade ${PRIO[g.prio]}`} />
        <span className="price">{g.real != null ? eur(g.real) : g.est != null ? `~${eur(g.est)}` : ""}</span>
      </div>)}
    </section>;
  })}</>;
}
