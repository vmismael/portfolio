# VMI · Portfolio v2

Portfolio pessoal de Vitor Montemor Ismael — desenvolvido com Next.js 15, TypeScript e Tailwind CSS.

**Live:** [vmismael.github.io/portfolio](https://github.com/vmismael/portfolio) <!-- substituir pela URL do Vercel após deploy -->

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS + CSS custom properties |
| Animações | Framer Motion |
| Ícones | Lucide React |
| Email | Resend |
| Deploy | Vercel |

---

## Design

Estética **técnica-editorial** — inspirada em IDEs e terminais.

- Tema dark/light com troca sem re-render (CSS variables)
- Acento terracota (`#B8552E`) com variantes amber e teal
- Tipografia: Geist Sans + Geist Mono + Newsreader
- Efeitos canvas: grid interativo com cursor e esfera 3D wireframe
- Animações `whileInView` com respeito ao `prefers-reduced-motion`

---

## Estrutura

```
├── app/
│   ├── api/contact/route.ts   # Endpoint de envio de email (Resend)
│   ├── globals.css            # Importa tokens/globals.css
│   ├── layout.tsx             # Root layout + ThemeProvider
│   └── page.tsx               # Página principal
├── components/
│   ├── hero/                  # Hero + SystemInfoBar
│   ├── nav/                   # TopNav com theme toggle
│   ├── sections/              # AboutSkills + ProjectsContact
│   └── ui/                    # Button, Card, Badge, FadeUp
├── fx/
│   ├── InteractiveGrid.tsx    # Grid canvas com highlight por cursor
│   └── WireframeSphere.tsx    # Esfera 3D wireframe (Canvas 2D, sem Three.js)
├── hooks/
│   ├── useTheme.tsx           # Context de tema/acento/densidade
│   └── useReducedMotion.ts    # Respeita prefers-reduced-motion
├── lib/
│   └── cn.ts                  # Utilitário de classnames
└── tokens/
    ├── globals.css            # CSS custom properties (dark/light/accents)
    └── tokens.ts              # Tokens TypeScript espelhando o CSS
```

---

## Seções

- **Hero** — apresentação com esfera 3D, grid interativo e status badge
- **Sobre** — trajetória editorial em 3 blocos + milestone log (Medicina → Adm → FIAP → Labsync)
- **Habilidades** — stack técnica e domínio de negócio em chips, + idiomas
- **Projetos** — Labsync (case study), Portfólio e próximo projeto
- **Contato** — canais diretos + formulário com envio real via Resend

---

## Rodando localmente

```bash
# Instalar dependências
npm install

# Criar arquivo de variáveis de ambiente
cp .env.example .env.local
# preencher RESEND_API_KEY

# Iniciar servidor de desenvolvimento
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

---

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `RESEND_API_KEY` | Chave da API do [Resend](https://resend.com) para envio de emails |

> O formulário de contato usa `onboarding@resend.dev` como remetente por padrão (plano gratuito). Para uso em produção com domínio próprio, verifique o domínio no painel do Resend e atualize o campo `from` em `app/api/contact/route.ts`.

---

## Deploy (Vercel)

1. Importe o repositório no [Vercel](https://vercel.com)
2. Adicione a variável `RESEND_API_KEY` nas configurações do projeto
3. Deploy automático — Next.js é detectado sem configuração extra

---

## Contato

**Vitor Montemor Ismael**  
[vitor.montemor.ismael@gmail.com](mailto:vitor.montemor.ismael@gmail.com) · [linkedin.com/in/vitormontemorismael](https://linkedin.com/in/vitormontemorismael/) · [github.com/vmismael](https://github.com/vmismael)
