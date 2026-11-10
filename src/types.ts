export type Page = "home" | "people" | "gifts" | "xmas" | "settings";
export type Status = "ideia" | "escolhido" | "comprado" | "entregue";
export type Prio = "baixa" | "media" | "alta";
export type Person = { id: number; name: string; relation: string; birthday: string };
export type Gift = { id: number; personId: number; name: string; status: Status; prio: Prio; est?: number; real?: number; link?: string; note?: string; year: number };
export type Api = {
  people: Person[]; gifts: Gift[];
  advance: (id: number) => void; edit: (g: Gift) => void;
  addGift: (personId?: number) => void; toggle: (id: number) => void; addPerson: () => void; delPerson: (id: number) => void; go: (p: Page) => void;
};
