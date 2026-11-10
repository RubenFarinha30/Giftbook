import { useState, type ReactNode } from "react";
import { X } from "lucide-react";
import type { Gift, Person, Prio, Status } from "../types";
import { LABEL, PRIO, STATUS } from "../lib";

export function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return <div className="veil" onClick={onClose}>
    <section className="sheet" onClick={e => e.stopPropagation()} role="dialog" aria-label={title}>
      <header><h2>{title}</h2><button className="icon" onClick={onClose} aria-label="Fechar"><X size={18} /></button></header>
      {children}
    </section>
  </div>;
}

export function PersonForm({ onSave }: { onSave: (p: Omit<Person, "id">) => void }) {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("Família");
  const [birthday, setBirthday] = useState("");
  return <form onSubmit={e => { e.preventDefault(); if (name.trim()) onSave({ name: name.trim(), relation, birthday }); }}>
    <label>Nome<input autoFocus value={name} onChange={e => setName(e.target.value)} /></label>
    <div className="row2">
      <label>Relação<select value={relation} onChange={e => setRelation(e.target.value)}>{["Família", "Amigos", "Namoro", "Trabalho", "Outro"].map(r => <option key={r}>{r}</option>)}</select></label>
      <label>Aniversário<input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} /></label>
    </div>
    <button className="btn wide">Guardar pessoa</button>
  </form>;
}

export type GiftDraft = Omit<Gift, "id" | "year"> & { id?: number };

export function GiftForm({ people, initial, personId, onSave, onDelete }: { people: Person[]; initial?: Gift; personId?: number; onSave: (g: GiftDraft) => void; onDelete: (id: number) => void }) {
  const [g, setG] = useState<GiftDraft>(initial ?? { personId: personId ?? people[0]?.id ?? 0, name: "", status: "ideia", prio: "media" });
  const set = <K extends keyof GiftDraft>(k: K, v: GiftDraft[K]) => setG(o => ({ ...o, [k]: v }));
  const num = (v: string) => v === "" ? undefined : Number(v);
  if (!people.length) return <p className="mu">Adiciona primeiro uma pessoa para lhe associares presentes.</p>;
  return <form onSubmit={e => { e.preventDefault(); if (g.name.trim()) onSave({ ...g, name: g.name.trim() }); }}>
    <label>Para quem<select value={g.personId} onChange={e => set("personId", +e.target.value)}>{people.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
    <label>Presente<input autoFocus value={g.name} onChange={e => set("name", e.target.value)} /></label>
    <details>
      <summary>Mais detalhes</summary>
      <div className="row2">
        <label>Estado<select value={g.status} onChange={e => set("status", e.target.value as Status)}>{STATUS.map(s => <option key={s} value={s}>{LABEL[s]}</option>)}</select></label>
        <label>Prioridade<select value={g.prio} onChange={e => set("prio", e.target.value as Prio)}>{(Object.keys(PRIO) as Prio[]).map(p => <option key={p} value={p}>{PRIO[p]}</option>)}</select></label>
        <label>Preço estimado (€)<input type="number" min="0" step="0.01" value={g.est ?? ""} onChange={e => set("est", num(e.target.value))} /></label>
        <label>Preço real (€)<input type="number" min="0" step="0.01" value={g.real ?? ""} onChange={e => set("real", num(e.target.value))} /></label>
      </div>
      <label>Link<input type="url" placeholder="https://" value={g.link ?? ""} onChange={e => set("link", e.target.value || undefined)} /></label>
      <label>Notas<textarea rows={2} value={g.note ?? ""} onChange={e => set("note", e.target.value || undefined)} /></label>
    </details>
    <div className="row2">
      {initial ? <button type="button" className="btn ghost danger" onClick={() => onDelete(initial.id)}>Apagar</button> : <span />}
      <button className="btn">Guardar</button>
    </div>
  </form>;
}
