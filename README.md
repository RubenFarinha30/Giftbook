# Giftbook

Planeador de presentes para organizar pessoas, datas e ideias num só sítio. Pensado para ser rápido de usar: adicionas uma pessoa, guardas ideias de presentes, acompanhas o que já compraste e vês quanto vais gastar.

Funciona no computador (sidebar discreta) e no telemóvel (barra de navegação inferior), com tema escuro.

## Funcionalidades

- **Início** com as próximas datas por ordem, aniversários incluídos, e aviso quando alguém faz anos e ainda não tem presente escolhido.
- **Pessoas** com nome, relação e data de aniversário, e pesquisa.
- **Presentes** com estados (ideia, escolhido, comprado, entregue), prioridade, preço estimado e real, link e notas. Podes ter vários presentes por pessoa, filtrar por estado, pesquisar e consultar o histórico de anos anteriores.
- **Natal** com contagem decrescente (dias, horas, minutos e segundos), lista de ideias por pessoa onde escolhes o que vais dar, e orçamento total que se atualiza a cada escolha.
- **Cópia de segurança** em JSON: exportar e importar a partir das Definições.
- Formulários simples (os campos extra ficam em "Mais detalhes"), confirmação antes de apagar e gravação automática.

## Tecnologias

React 18, TypeScript e Vite. Ícones com `lucide-react`. Tipos de letra Fira Code e Fira Sans, carregados do Google Fonts.

## Como correr

Requer Node.js (versão LTS) e npm.

```bash
npm install
npm run dev
```

Abre o endereço local que o Vite mostrar no terminal. Para testar no telemóvel, na mesma rede Wi-Fi:

```bash
npm run dev -- --host 0.0.0.0
```

Build de produção:

```bash
npm run build
npm run preview
```

## Estrutura

```
src/
  App.tsx            estado da aplicação, navegação e gravação
  types.ts           tipos (Person, Gift, Status, Api)
  lib.ts             funções auxiliares (datas, preços, estados)
  components/        Nav, formulários e listas de presentes
  pages/             Home, People, Gifts, Christmas, Settings
  styles/global.css  estilos e tema
```

## Dados

Os dados ficam no `localStorage` do navegador, neste dispositivo, sem conta nem servidor. Para não os perderes ao limpar o navegador ou mudar de dispositivo, usa Definições > Exportar.

## Próximos passos

- Orçamento por pessoa
- Notificações de aniversários
- Fotografias e categorias de presentes
- Eventos personalizados
- Tema claro
- Versão para Android, com armazenamento local próprio

## Licença

Ainda por definir.
