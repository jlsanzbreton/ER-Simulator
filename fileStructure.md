/components
RoleSelector/
RoleSelector.tsx
RoleCard.tsx // UI de cada rol con descripción
EnviroGenerator/
EnviroGenerator.tsx
CondicionCard.tsx // Card/resumen de condiciones ambientales
SimulacionMain/
SimulacionMain.tsx
Fase.tsx // Cada fase de la simulación (detectar, notificar, etc.)
Decision.tsx // Lógica y UI para cada decisión crítica
Feedback.tsx // Feedback educativo y consecuencias
UI/
Button.tsx
Modal.tsx
// Otros componentes reutilizables
/context
SimulacroContext.tsx // Contexto global con estado y helpers
/types
simulacro.ts
/utils
enviroMonteCarlo.ts // Lógica de generación ambiental aleatoria
rolesData.ts // Constantes/arrays con información de roles
/pages
index.tsx // Secuencia: Selector de rol → condiciones → simulación
\_app.tsx // Configuración de contexto, PWA, etc.
/public
manifest.json
icons/ // Iconos PWA
