import { useEffect, useState } from "react";
import { Check, Plus } from "lucide-react";
import type { Api } from "../types";
import { LABEL, PRIO, YEAR, eur, initials } from "../lib";

const sum = (a: { est?: number; real?: number }[]) => a.reduce((s, g) => s + (g.real ?? g.est ?? 0), 0);

export default function Christmas({ people, gifts, advance, toggle, edit, addGift, budget, setBudget }: Api & { budget: number; setBudget: (n: number) => void }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const y = new Date(now).getFullYear();
  let target = new Date(y, 11, 25).getTime();
  if (target < now) target = new Date(y + 1, 11, 25).getTime();
  const d = target - now;
  const units: [number, string][] = [[Math.floor(d / 864e5), "dias"], [Math.floor(d / 36e5) % 24, "horas"], [Math.floor(d / 6e4) % 60, "min"], [Math.floor(d / 1e3) % 60, "seg"]];

  const list = gifts.filter(g => g.year === YEAR);
  const picked = list.filter(g => g.status !== "ideia");
  const planned = sum(picked);
  const spent = sum(picked.filter(g => g.status === "comprado" || g.status === "entregue"));
  const has = budget > 0;
  const left = budget - planned;

  return <>
    <section className="hero">
      <h1><span className="star">✦</span> Natal {new Date(target).getFullYear()}</h1>
      <p>25 de dezembro</p>
      <div className="count" role="timer" aria-label="Contagem decrescente para o Natal">
        {units.map(([n, l]) => <div key={l}><b>{String(n).padStart(2, "0")}</b><small>{l}</small></div>)}
      </div>
    </section>

    <section className={`budget ${has && left < 0 ? "over" : ""}`}>
      <div className="top">
        <div><small>Total das prendas escolhidas</small><div className="big">{eur(planned)}</div></div>
        <span className="mu">Orçamento <input type="number" min="0" placeholder="0" aria-label="Orçamento total" value={budget || ""} onChange={e => setBudget(+e.target.value)} />€</span>
      </div>
      <div className="bar"><i style={{ width: `${has ? Math.min(100, planned / budget * 100) : 0}%` }} /></div>
      <div className="stats">
        <span>Escolhidas<b>{picked.length}</b></span>
        <span>Já gasto<b>{eur(spent)}</b></span>
        {has && <span>{left >= 0 ? "Disponível" : "Acima do limite"}<b>{eur(Math.abs(left))}</b></span>}
      </div>
    </section>

    {people.map(p => {
      const gs = list.filter(g => g.personId === p.id);
      const sel = gs.filter(g => g.status !== "ideia");
      return <section className="person" key={p.id}>
        <header>
          <div className="av">{initials(p.name)}</div>
          <div className="grow"><b>{p.name}</b><div className="mu">{sel.length} de {gs.length} escolhidas</div></div>
          <b className="gold price">{eur(sum(sel))}</b>
        </header>
        {gs.map(g => {
          const on = g.status !== "ideia";
          return <div className={`pick ${on ? "on" : ""}`} key={g.id}>
            <button className="box" role="checkbox" aria-checked={on} disabled={g.status === "comprado" || g.status === "entregue"} onClick={() => toggle(g.id)} aria-label={`Dar ${g.name} no Natal`}>{on && <Check size={15} strokeWidth={3} />}</button>
            <button className="grow name" onClick={() => edit(g)}>{g.name}</button>
            <i className={`pr p-${g.prio}`} title={`Prioridade ${PRIO[g.prio]}`} />
            {on && <button className={`st s-${g.status}`} onClick={() => advance(g.id)} aria-label={`${LABEL[g.status]}, avançar estado`}>{LABEL[g.status]}</button>}
            <span className="price">{g.real != null ? eur(g.real) : g.est != null ? `~${eur(g.est)}` : ""}</span>
          </div>;
        })}
        <button className="add" onClick={() => addGift(p.id)}><Plus size={14} />Nova ideia para {p.name}</button>
      </section>;
    })}
    {!people.length && <p className="mu empty">Adiciona pessoas para começares a planear o Natal.</p>}
  </>;
}
