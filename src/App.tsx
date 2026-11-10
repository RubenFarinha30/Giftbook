import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Nav from "./components/Nav";
import { GiftForm, PersonForm, Sheet, type GiftDraft } from "./components/Forms";
import Home from "./pages/Home";
import People from "./pages/People";
import Gifts from "./pages/Gifts";
import Christmas from "./pages/Christmas";
import Settings from "./pages/Settings";
import { STATUS, YEAR } from "./lib";
import type { Api, Gift, Page, Person, Status } from "./types";

type Open = null | { k: "person" } | { k: "gift"; gift?: Gift; personId?: number };
const load = <T,>(k: string, d: T): T => { try { return JSON.parse(localStorage.getItem(k) || "null") ?? d; } catch { return d; } };

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [people, setPeople] = useState<Person[]>(() => load<Person[]>("gp3-people", []));
  const [gifts, setGifts] = useState<Gift[]>(() => load<Gift[]>("gp3-gifts", []));
  const [budget, setBudget] = useState<number>(() => load("gp3-budget", 0));
  const [open, setOpen] = useState<Open>(null);
  const [toast, setToast] = useState("");

  // Guardar automaticamente (localStorage no protótipo).
  useEffect(() => { localStorage.setItem("gp3-people", JSON.stringify(people)); }, [people]);
  useEffect(() => { localStorage.setItem("gp3-gifts", JSON.stringify(gifts)); }, [gifts]);
  useEffect(() => { localStorage.setItem("gp3-budget", JSON.stringify(budget)); }, [budget]);

  const say = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2000); };
  const savePerson = (p: Omit<Person, "id">) => { setPeople(o => [...o, { ...p, id: Date.now() }]); setOpen(null); say("Pessoa guardada"); };
  const saveGift = (g: GiftDraft) => {
    setGifts(o => g.id ? o.map(x => x.id === g.id ? { ...x, ...g } as Gift : x) : [...o, { ...g, id: Date.now(), year: YEAR }]);
    setOpen(null); say("Presente guardado");
  };
  const delGift = (id: number) => { if (confirm("Apagar este presente?")) { setGifts(o => o.filter(g => g.id !== id)); setOpen(null); say("Presente apagado"); } };
  const delPerson = (id: number) => {
    if (confirm("Apagar esta pessoa e todos os seus presentes?")) { setPeople(o => o.filter(p => p.id !== id)); setGifts(o => o.filter(g => g.personId !== id)); say("Pessoa apagada"); }
  };
  const restore = (t: string) => {
    try { const d = JSON.parse(t); if (!Array.isArray(d.people) || !Array.isArray(d.gifts)) throw 0; setPeople(d.people); setGifts(d.gifts); say("Cópia restaurada"); } catch { say("Ficheiro inválido"); }
  };

  const api: Api = {
    people, gifts, go: setPage, delPerson,
    advance: id => setGifts(o => o.map(g => g.id === id ? { ...g, status: STATUS[(STATUS.indexOf(g.status) + 1) % STATUS.length] } : g)),
    toggle: id => setGifts(o => o.map(g => g.id === id ? { ...g, status: (g.status === "ideia" ? "escolhido" : "ideia") as Status } : g)),
    edit: g => setOpen({ k: "gift", gift: g }),
    addGift: personId => setOpen({ k: "gift", personId }),
    addPerson: () => setOpen({ k: "person" })
  };

  return <div className={`app ${page === "xmas" ? "xmas" : ""}`}>
    <Nav page={page} onNavigate={setPage} />
    <main>
      <div className="quick">
        <button className="btn ghost" onClick={api.addPerson}><Plus size={16} />Pessoa</button>
        <button className="btn" onClick={() => api.addGift()}><Plus size={16} />Presente</button>
      </div>
      {page === "home" && <Home {...api} />}
      {page === "people" && <People {...api} />}
      {page === "gifts" && <Gifts {...api} />}
      {page === "xmas" && <Christmas {...api} budget={budget} setBudget={setBudget} />}
      {page === "settings" && <Settings people={people} gifts={gifts} onRestore={restore} />}
    </main>
    {open && <Sheet title={open.k === "person" ? "Nova pessoa" : open.gift ? "Editar presente" : "Novo presente"} onClose={() => setOpen(null)}>
      {open.k === "person" ? <PersonForm onSave={savePerson} /> : <GiftForm people={people} initial={open.gift} personId={open.personId} onSave={saveGift} onDelete={delGift} />}
    </Sheet>}
    {toast && <div className="toast" role="status">{toast}</div>}
  </div>;
}
