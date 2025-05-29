const fs = require("fs");
const path = require("path");

const FILES = [
  "package.json",
  "tsconfig.json",
  "src/pages/index.tsx",
  "src/components/SimulacionMain/SimulacionMain.tsx",
  "src/components/Dashboard/Dashboard.tsx",
  "src/utils/enviroMonteCarlo.ts",
  "src/utils/generadoresSimulacion.ts",
];

let allOk = true;

FILES.forEach((filePath) => {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ FALTA EL ARCHIVO: ${filePath}`);
    allOk = false;
    return;
  }

  const content = fs.readFileSync(fullPath, "utf-8").trim();
  if (content.length < 50) {
    console.warn(`⚠️  ARCHIVO SOSPECHOSAMENTE VACÍO o corrupto: ${filePath}`);
  } else {
    console.log(`✅ ${filePath} OK`);
  }
});

if (allOk) {
  console.log("\n🎉 Todos los archivos clave están presentes.");
} else {
  console.log("\n🚨 Faltan o están dañados algunos archivos clave. Revísalos.");
}
