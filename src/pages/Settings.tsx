import { useRef } from "react";
import { Download, Upload } from "lucide-react";
import type { Gift, Person } from "../types";

export default function Settings({ people, gifts, onRestore }: { people: Person[]; gifts: Gift[]; onRestore: (t: string) => void }) {
  const file = useRef<HTMLInputElement>(null);
  function exportData() {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify({ people, gifts }, null, 2)], { type: "application/json" }));
    a.download = `giftbook-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  }
  return <>
    <h1>Definições</h1>
    <div className="row">
      <div className="grow"><b>Cópia de segurança</b><div className="mu">Os dados ficam guardados neste dispositivo. Exporta para não os perderes.</div></div>
    </div>
    <div className="row2 gap">
      <button className="btn ghost" onClick={exportData}><Download size={16} />Exportar</button>
      <button className="btn ghost" onClick={() => file.current?.click()}><Upload size={16} />Importar</button>
      <input ref={file} type="file" accept="application/json" hidden onChange={e => { e.target.files?.[0]?.text().then(onRestore); e.target.value = ""; }} />
    </div>
  </>;
}
