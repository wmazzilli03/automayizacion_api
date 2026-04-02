import { spawn, spawnSync } from "child_process";
import fs from "fs";
import path from "path";
// CAMBIO 1: Usamos Playwright en lugar de Puppeteer
import { chromium } from "playwright"; 

// ============================
// Configuración base
// ============================

const tagArg = process.argv[2] || "@sprint5"; 

// Limpiamos el tag para usarlo en nombres de archivo
const safeName = tagArg.replace(/[^a-zA-Z0-9]/g, "_");

const reportDir = path.join("report");
const screenshotDir = path.join("report", "screenshots");
const logsDir = path.join(reportDir, "logs");

// Asegurar directorios
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

const pngPath = path.join(screenshotDir, `Captura_${safeName}.png`);
const logPath = path.join(logsDir, `Log_${safeName}.txt`);

// ============================
// Comando Cucumber
// ============================

console.log(`🚀 Iniciando pruebas para tag: ${tagArg}`);

const command = `npx cucumber-js -p test_api --tags "${tagArg}" --format json:report/cucumber_report.json --format junit:report/junit_report.xml`;

const cucumber = spawn(command, { shell: true });

// ============================
// Captura TOTAL de la terminal
// ============================

let output = "";

const capture = (data) => {
  const text = data.toString();
  process.stdout.write(text);
  output += text;
};

cucumber.stdout.on("data", capture);
cucumber.stderr.on("data", capture);

// ============================
// Al finalizar ejecución
// ============================
cucumber.on("close", async (code) => {
  console.log(`\n🏁 Ejecución finalizada con código: ${code}`);

  try {
    // 1️⃣ Guardar LOG Texto
    fs.writeFileSync(logPath, output, "utf-8");
    console.log(`📄 Log guardado en: ${logPath}`);

    // --- AGREGADO: Ejecución de tu reporte HTML ---
    console.log(`📊 Generando reporte HTML con report.js...`);
    spawnSync("node", ["report.js", safeName], { stdio: "inherit" });
    // ----------------------------------------------

    // 2️⃣ Screenshot tipo terminal (Usando PLAYWRIGHT)
    const browser = await chromium.launch(); 
    const page = await browser.newPage();

    await page.setViewportSize({ width: 1400, height: 2000 });

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
        <meta charset="UTF-8" />
        <style>
          body { margin: 0; background: #000000; padding: 20px; } /* Fondo Negro */
          #terminal {
            background: #000000;
            color: #ffffff; /* Letras Blancas */
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 14px;
            white-space: pre-wrap;
            line-height: 1.5;
          }
          .header { color: #569cd6; font-weight: bold; margin-bottom: 20px; display: block;}
        </style>
        </head>
        <body>
          <span class="header">Execution Log: ${tagArg} | Exit Code: ${code}</span>
          <pre id="terminal">${output
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</pre>
        </body>
        </html>
    `;

    await page.setContent(htmlContent);
    await page.screenshot({ path: pngPath, fullPage: true });
    
    await browser.close();
    console.log(`📸 Screenshot generado en: ${pngPath}`);

  } catch (error) {
    console.error("❌ Error generando reportes visuales:", error);
  }

  process.exit(code);
});