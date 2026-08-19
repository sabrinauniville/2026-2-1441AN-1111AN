# NASA Open APIs

Projeto didático em HTML, CSS e JavaScript (sem framework) para consumir APIs públicas da NASA em uma estrutura de front-end estático, organizada por páginas, estilos e utilitários reutilizáveis.

## Visão geral

Este projeto desenvolve uma aplicação web integrada com serviços públicos da NASA:

- **APOD**: Astronomy Picture of the Day
- **NeoWs**: Near Earth Object Web Service
- **InSight**: dados meteorológicos de Marte

O projeto reforça conceitos de:

- organização por responsabilidade de arquivos
- separação de estilos globais e específicos
- uso de design tokens e componentes reutilizáveis
- validação de formulários e tratamento de erros
- modularização da lógica em páginas e serviços
- deploy em ambiente estático

## Funcionalidades atuais

- página home com apresentação da aplicação
- navegação compartilhada entre páginas
- página de consulta de APOD
- página de consulta de asteroides NeoWs
- página de clima marciano da NASA InSight
- página de contato com validação de formulário
- componentes compartilhados para rodapé, cabeçalho, campos e cards

## Estrutura do projeto

A organização foi separada por responsabilidade para deixar o ciclo de build, execução local e integração com a API mais legível e fácil de manter.

```text
.
├── README.md
├── package.json
├── firebase.json
├── .firebaserc
├── .env.example
├── .env.local
├── .gitignore
├── index.html
├── index.css
├── pages/
│   ├── apod/
│   ├── neows/
│   ├── insight/
│   └── contact/
├── scripts/
│   ├── build/
│   │   └── build.js
│   ├── dev/
│   │   └── dev-server.js
│   ├── services/
│   │   └── service.js
│   ├── shared/
│   │   ├── date.js
│   │   ├── page-state.js
│   │   └── validation.js
│   └── features/
│       ├── contact/
│       └── nasa/
├── styles/
│   ├── design-tokens.css
│   ├── styles.css
│   └── components/
```

### Organização por responsabilidade

- `scripts/build/`: gera o ambiente de build e copia os arquivos para `public/`
- `scripts/dev/`: executa o servidor local para desenvolvimento
- `scripts/services/`: encapsula a comunicação com as APIs da NASA
- `scripts/utils/`: funções reutilizáveis de data, validação e status da página
- `pages/`: cada página da aplicação com seu HTML, CSS e JS específicos
- `styles/`: design tokens e componentes compartilhados
- `public/`: artefatos gerados para execução/produção

## Quick start

### 1) Instalar dependências

```bash
npm install
```

### 2) Rodar o projeto localmente

```bash
npm run dev
```

Se a porta `8080` estiver ocupada, o servidor tenta automaticamente as próximas portas livres (`8081`, `8082`, etc.).

### 3) Forçar uma porta específica

#### Git Bash / bash

```bash
PORT=8080 npm run dev
```

#### PowerShell / Windows

```powershell
$env:PORT = "8080"
npm run dev
```

### 4) Limpar a porta 8080

```bash
npm run kill:8080
```

Se quiser fazer isso manualmente:

```powershell
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### 5) Preparar a chave da NASA

```bash
cp .env.example .env.local
# edite .env.local e informe a sua NASA_API_KEY
```

### 6) Abrir no navegador

Se não houver conflito de porta, normalmente será:

```text
http://localhost:8080
```

Se a porta estiver ocupada, o projeto usa a próxima disponível.

## Requisitos

- Node.js 18+
- npm
- Git
- VS Code

## APIs consumidas

### APOD

- URL: <https://api.nasa.gov/planetary/apod>
- Exibe a imagem ou vídeo astronômico do dia.
- Permite consulta por datas.
- Apresenta descrição e conteúdo visual associado à data selecionada.

### Parâmetros

- Obrigatórios:
  - api_key

- Opcionais:
  - date (YYYY-MM-DD)
  - start_date
  - end_date
  - count
  - thumbs

### NeoWs

- URL: <https://api.nasa.gov/neo/rest/v1/feed>
- Consulta objetos próximos da Terra.
- Apresenta dados de distância, magnitude, velocidade relativa, diâmetro estimado e risco potencial.

Parâmetros:

- Obrigatórios:
  - api_key

- Opcionais:
  - start_date (YYYY-MM-DD)
  - end_date (YYYY-MM-DD)
  - detailed
  - page

### InSight

- URL: <https://api.nasa.gov/insight_weather/>
- Mostra dados meteorológicos de Marte.
- Exibe temperatura, pressão e velocidade do vento por sol marciano.

Parâmetros:

- Obrigatórios:
  - api_key

- Opcionais:
  - feedtype
  - ver
  - format

## Licença

Uso educacional e didático.

## Requisitos

- Node.js 18+
- npm
- Git
- VS Code

## Como executar localmente

### via package.json (recomendado)

Na raiz do projeto:

```bash
npm install
npm run dev
```

O comando de desenvolvimento serve a aplicação localmente sem depender do build. Se quiser definir a porta manualmente:

```bash
PORT=8080 npm run dev
```

Se o servidor estiver bloqueado pela porta ocupada, use:

```bash
npm run kill:8080
```

ou:

```powershell
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

Antes do uso de API da NASA, prepare o arquivo de ambiente local:

```bash
cp .env.example .env.local
# edite .env.local e informe a sua NASA_API_KEY
```

A URL local normalmente será:

```text
http://localhost:8080
```

## APIs consumidas

### APOD

- URL: <https://api.nasa.gov/planetary/apod>
- Exibe a imagem ou vídeo astronômico do dia.
- Permite consulta por datas.
- Apresenta descrição e conteúdo visual associado à data selecionada.

### Parâmetros

- Obrigatórios:
  - api_key

- Opcionais:
  - date (YYYY-MM-DD)
  - start_date
  - end_date
  - count
  - thumbs

### NeoWs

- URL: <https://api.nasa.gov/neo/rest/v1/feed>
- Consulta objetos próximos da Terra.
- Apresenta dados de distância, magnitude, velocidade relativa, diâmetro estimado e risco potencial.

Parâmetros:

- Obrigatórios:
  - api_key

- Opcionais:
  - start_date (YYYY-MM-DD)
  - end_date (YYYY-MM-DD)
  - detailed
  - page

### InSight

- URL: <https://api.nasa.gov/insight_weather/>
- Mostra dados meteorológicos de Marte.
- Exibe temperatura, pressão e velocidade do vento por sol marciano.

Parâmetros:

- Obrigatórios:
  - api_key

- Opcionais:
  - feedtype
  - ver
  - format

## Licença

Uso educacional e didático.
