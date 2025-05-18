# Plan de realismo y normativa para la rama feature/more-realism

## Reflexión inicial

En el modo "simulacro" (coordinación real), la tarjeta de preguntas y decisiones de fase pierde relevancia, ya que está orientada al entrenamiento de roles operativos. En este modo, lo importante es:

- El seguimiento de los checkpoints normativos (checks de cumplimiento).
- Las anotaciones y observaciones sobre la gestión real de cada fase.
- La trazabilidad de quién realiza cada acción (roles activos).
- La referencia normativa asociada a cada acción o fase.

Por tanto, en modo "simulacro":

- **Se eliminará la tarjeta de preguntas/decisiones de fase**.
- Se dará protagonismo a los checks, anotaciones y trazabilidad de roles.

En modo "entrenamiento":

- Se mantiene la tarjeta de preguntas/decisiones para guiar el aprendizaje y la toma de decisiones.

## Pasos de la rama

### Paso 1: Planificación y documentación inicial

- Este documento resume los cambios previstos y su justificación normativa y de experiencia de usuario.
- Se prioriza la seguridad, funcionalidad, minimalismo UI y experiencia de usuario (ver CopilotGuidelines.json).

### Paso 2: Eventos aleatorios/normativos

- Se implementará un sistema de eventos aleatorios (alertas, inspecciones, cambios de condiciones ambientales) que puedan surgir durante la simulación.
- Cada evento irá acompañado de su referencia normativa (ej: "según RD 1695/2012, art. X").
- Los eventos serán accesibles y no bloquearán la UI.

### Paso 3: Gestión del tiempo y presión realista

- Se añadirá un temporizador visible (cuenta atrás o tiempo real).
- Algunos eventos o fases podrán estar condicionados al tiempo.
- Se documentará la relación entre el tiempo y la normativa.

### Paso 4: Referencias normativas en fases/decisiones

- Se mostrará un enlace, tooltip o icono en cada fase/decisión con la referencia normativa aplicable.
- Será accesible y no intrusivo.

### Paso 5: Validación y feedback

- Se validará la experiencia en móvil y escritorio.
- Se documentarán las decisiones y cambios estructurales relevantes.

## Nota sobre condiciones meteorológicas y gestión del tiempo

- La tarjeta de condiciones meteorológicas será siempre visible y dinámica.
- En **entrenamiento**, cada avance de fase simula un salto en el tiempo y condiciones (se actualizan automáticamente).
- En **simulacro**, la tarjeta muestra la hora real y las condiciones iniciales (o reales si se implementa en el futuro).
- La evolución de la mancha y los eventos se basan en estos datos.
- La UI será minimalista: solo se muestra la información relevante y se evita sobrecargar al usuario.

---

**Justificación:**

- Todo cambio se basa en la normativa aplicable y en la mejora de la experiencia y trazabilidad para auditoría y formación.
- Se documentará cada decisión relevante en este archivo y en los comentarios de los PR.
