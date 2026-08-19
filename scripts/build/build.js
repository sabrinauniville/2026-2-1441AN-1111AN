const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "../..");
const publicDir = path.join(projectRoot, "public");
const requestedMode = (
  process.env.NODE_ENV ||
  process.argv[2] ||
  "development"
).toLowerCase();
const selectedMode =
  requestedMode === "production" ? "production" : "development";

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const values = {};

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    values[key] = value.replace(/^['"]|['"]$/g, "");
  }

  return values;
}

function resolveEnv() {
  const envFiles = [
    selectedMode === "production" ? ".env.production" : ".env.local",
    ".env",
  ];

  const env = {};
  for (const fileName of envFiles) {
    const filePath = path.join(projectRoot, fileName);
    Object.assign(env, loadEnvFile(filePath));
  }

  if (!env.NASA_API_KEY) {
    if (selectedMode === "production") {
      throw new Error(
        `NASA_API_KEY ausente. Crie o arquivo ${
          selectedMode === "production" ? ".env.production" : ".env.local"
        } (ou .env) com a chave da API da NASA.`,
      );
    }

    console.warn(
      "[BUILD] NASA_API_KEY ausente no ambiente local; o build continuará com valor vazio.",
    );
    env.NASA_API_KEY = "";
  }

  return env;
}

function writeEnvironmentFile(targetPath, values) {
  const content = `export const environment = {
  production: ${selectedMode === "production"},
  nasaApiUrl: "${values.NASA_API_URL || "https://api.nasa.gov/planetary/apod"}",
  nasaNeoWsUrl: "${values.NASA_NEO_WS_URL || "https://api.nasa.gov/neo/rest/v1/feed"}",
  nasaInsightWeatherUrl: "${
    values.NASA_INSIGHT_WEATHER_URL || "https://api.nasa.gov/insight_weather/"
  }",
  nasaApiKey: "${values.NASA_API_KEY}",
};\n`;

  fs.writeFileSync(targetPath, content, "utf8");
}

const env = resolveEnv();

writeEnvironmentFile(path.join(projectRoot, "environment.js"), env);

fs.rmSync(publicDir, { recursive: true, force: true });
fs.mkdirSync(publicDir, { recursive: true });

const requiredFiles = ["index.html", "index.css"];
const optionalFiles = [
  "styles/styles.css",
  "styles/design-tokens.css",
  "styles/components/header.css",
  "styles/components/footer.css",
  "styles/components/accordion.css",
  "styles/components/buttons.css",
  "styles/components/cards.css",
  "styles/components/forms.css",
  "styles/components/layout.css",
  "styles/components/search-page.css",
  "pages/apod/apod.html",
  "pages/apod/apod.css",
  "pages/apod/apod.js",
  "pages/neows/neows.html",
  "pages/neows/neows.css",
  "pages/neows/neows.js",
  "pages/insight/insight.html",
  "pages/insight/insight.css",
  "pages/insight/insight.js",
  "pages/contact/contact.html",
  "pages/contact/contact.css",
  "pages/contact/contact.js",
  "scripts/services/service.js",
  "scripts/shared/date.js",
  "scripts/shared/page-state.js",
  "scripts/shared/validation.js",
];
const filesToCopy = [...requiredFiles, ...optionalFiles, "environment.js"];

for (const fileName of filesToCopy) {
  const sourcePath = path.join(projectRoot, fileName);
  const targetPath = path.join(publicDir, fileName);

  if (fileName.includes("..") || path.isAbsolute(fileName)) {
    throw new Error(`Caminho inválido para build: ${fileName}`);
  }

  if (!fs.existsSync(sourcePath)) {
    if (requiredFiles.includes(fileName)) {
      throw new Error(`Arquivo obrigatório ausente para build: ${sourcePath}`);
    }

    console.warn(`Arquivo ausente para build, ignorando: ${sourcePath}`);
    continue;
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(sourcePath, targetPath);
}

console.log(`Build do ambiente ${selectedMode} concluído: ${publicDir}`);
