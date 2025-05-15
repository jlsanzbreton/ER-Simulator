#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys

def crear_estructura():
    # Directorio base
    BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    
    # Estructura de carpetas
    carpetas = [
        'components/RoleSelector',
        'components/EnviroGenerator',
        'components/SimulacionMain',
        'components/UI',
        'context',
        'types',
        'utils',
        'pages',
        'public/icons'
    ]
    
    # Archivos a crear con comentarios básicos
    archivos = {
        'components/RoleSelector/RoleSelector.tsx': '// Componente principal para selección de roles',
        'components/RoleSelector/RoleCard.tsx': '// UI de cada rol con descripción',
        'components/EnviroGenerator/EnviroGenerator.tsx': '// Generador de entorno de simulación',
        'components/EnviroGenerator/CondicionCard.tsx': '// Card/resumen de condiciones ambientales',
        'components/SimulacionMain/SimulacionMain.tsx': '// Componente principal de la simulación',
        'components/SimulacionMain/Fase.tsx': '// Cada fase de la simulación (detectar, notificar, etc.)',
        'components/SimulacionMain/Decision.tsx': '// Lógica y UI para cada decisión crítica',
        'components/SimulacionMain/Feedback.tsx': '// Feedback educativo y consecuencias',
        'components/UI/Button.tsx': '// Componente de botón reutilizable',
        'components/UI/Modal.tsx': '// Componente de modal reutilizable',
        'context/SimulacroContext.tsx': '// Contexto global con estado y helpers',
        'types/simulacro.ts': '// Definiciones de tipos para el simulacro',
        'utils/enviroMonteCarlo.ts': '// Lógica de generación ambiental aleatoria',
        'utils/rolesData.ts': '// Constantes/arrays con información de roles',
        'pages/index.tsx': '// Secuencia: Selector de rol → condiciones → simulación',
        'pages/_app.tsx': '// Configuración de contexto, PWA, etc.',
        'public/manifest.json': '{\n  "name": "ER-Simulator",\n  "short_name": "ER-Sim",\n  "display": "standalone"\n}'
    }
    
    print(f"Creando estructura en: {BASE_DIR}")
    
    # Crear carpetas
    for carpeta in carpetas:
        ruta_completa = os.path.join(BASE_DIR, carpeta)
        try:
            os.makedirs(ruta_completa, exist_ok=True)
            print(f"✅ Carpeta creada: {carpeta}")
        except Exception as e:
            print(f"❌ Error al crear carpeta {carpeta}: {str(e)}")
    
    # Crear archivos
    for archivo, contenido in archivos.items():
        ruta_completa = os.path.join(BASE_DIR, archivo)
        try:
            with open(ruta_completa, 'w', encoding='utf-8') as f:
                f.write(contenido)
            print(f"✅ Archivo creado: {archivo}")
        except Exception as e:
            print(f"❌ Error al crear archivo {archivo}: {str(e)}")
    
    print("\n✅ Estructura creada con éxito!")

if __name__ == "__main__":
    crear_estructura()