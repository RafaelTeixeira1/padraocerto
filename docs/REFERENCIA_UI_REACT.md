# Referência UI - Código React Original

**Arquivo de referência para transformar código React → Vue**

Este documento contém todo o código React original das telas do PadrãoCerto que já foram desenhadas e prototipadas. Quando for trabalhar nas issues #9-13 (telas estáticas) e posteriores, use este arquivo como base para transformar de React/TypeScript para Vue 3/JavaScript.

---

## 📋 Estrutura React Original

```
src/app/
├── App.tsx (Roteamento)
├── components/
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── ProgressBar.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   ├── modals/
│   │   ├── NewProjectModal.tsx
│   │   ├── NewChecklistModal.tsx
│   │   ├── VinculateChecklistModal.tsx
│   │   └── ReportModal.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── SignUp.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── Dashboard.tsx
│   │   └── ProjectDetails.tsx
│   └── checklist/
│       └── ChecklistExecution.tsx
└── styles/
    ├── fonts.css
    └── theme.css
```

---

## 🎨 Paleta de Cores

```css
--primary: #1E3A5F          /* Azul institucional */
--secondary: #2F80ED        /* Azul destaque */
--background: #F5F7FA       /* Fundo cinza claro */
--foreground: #1E3A5F       /* Texto escuro */
--success: #10B981          /* Verde conformidade */
--destructive: #EF4444      /* Vermelho não-conforme */
--muted: #E5E7EB            /* Cinza suave */
--border: #E5E7EB           /* Bordas */
```

---

## 🔄 Mapeamento React → Vue

### Button.tsx → Button.vue
```
React Props → Vue Props
variant: 'primary' | 'secondary' | 'outline'
fullWidth: boolean
className: string
onClick handler → @click

ClassNames com condicional → :class com objeto
<button className={`...base ${variants[variant]} ...`}> 
→
<button :class="[baseStyles, variantClass]">
```

### Input.tsx → Input.vue (forwardRef)
```
React forwardRef → v-model em Vue
label prop
error prop
InputHTMLAttributes → HTML input attributes diretos
className → :class

Diferença: Vue não precisa forwardRef, usar v-model direto
```

### Modal.tsx → Modal.vue (Teleport)
```
React: ReactPortal / createPortal
Vue: <Teleport to="body">

isOpen prop → v-if
onClose callback → @close event
Transition em React → <transition name="modal"> em Vue
```

### Sidebar.tsx → Sidebar.vue
```
React Router Link → Vue Router RouterLink
useLocation() → $route.path
Icon components (lucide-react) → Use emojis ou ícones SVG inline

Map array → v-for
Active class condicional → :class ternário
```

### Dashboard.tsx → Dashboard.vue
```
useState multiple → ref() ou reactive()
useNavigate() → useRouter() push()
Charts (Recharts) → Usar Chart.js ou semelhante para Vue
Mock data → Mesma estrutura

Modal state management
Filter/map arrays
Calcular métricas (compliance, etc)
```

---

## ✅ Checklist Transformação React → Vue

- [ ] Converter props (React interface → Vue defineProps)
- [ ] Converter state (useState → ref/reactive)
- [ ] Converter hooks (useRouter, useNavigate → useRouter do Vue)
- [ ] Converter eventos (onClick → @click)
- [ ] Converter condicional render (ternário → v-if/v-show)
- [ ] Converter arrays (map → v-for)
- [ ] Converter classNames (className → :class)
- [ ] Converter estilos (CSS-in-JS → scoped CSS)
- [ ] Converter componentes (import → import, mas estrutura Vue)
- [ ] Testar no navegador

---

## 📄 Código Completo React

[Veja acima o arquivo completo com todos os componentes React/TypeScript]

---

## 🎯 Como Usar Este Arquivo

1. **Quando for fazer issue #9** (telas estáticas de autenticação):
   - Leia `Login.tsx` e `SignUp.tsx`
   - Transforme em `Login.vue` e `SignUp.vue`
   - Use a mesma lógica, estrutura HTML, mas em Vue 3

2. **Quando for fazer issue #10** (dashboard estático):
   - Leia `Dashboard.tsx`
   - Transforme em `Dashboard.vue` com `src/pages/Dashboard.vue`
   - Note: Recharts (gráficos) precisará de alternativa em Vue

3. **Quando for fazer issue #11-13** (telas de obras/checklists):
   - Leia `ProjectDetails.tsx` e `ChecklistExecution.tsx`
   - Adapte para Vue

---

**Nota**: Este arquivo é uma referência pura. O código JavaScript/TypeScript do React não será usado diretamente, apenas como referência de estrutura, lógica e design.
