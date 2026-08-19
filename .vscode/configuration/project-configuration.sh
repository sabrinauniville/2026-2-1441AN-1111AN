#!/bin/bash

set -eu

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

if [ "${PROJECT_ADMIN_MODE:-student}" = "admin" ]; then
  echo "Modo administrador detectado. Nenhuma configuração de aluno será aplicada."
  exit 0
fi

TARGET_DIR="${APPDATA:-$HOME/.config}/Code/User"
mkdir -p "$TARGET_DIR"

cat > "$TARGET_DIR/settings.json" <<'JSON'
{
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,
  "editor.tabSize": 2,
  "editor.renderWhitespace": "boundary",
  "editor.detectIndentation": false,
  "workbench.startupEditor": "none",
  "workbench.editor.enablePreview": false,
  "explorer.compactFolders": false,
  "security.workspace.trust.untrustedFiles": "open",
  "terminal.integrated.defaultProfile.windows": "Git Bash",
  "terminal.integrated.profiles.windows": {
    "Git Bash": {
      "source": "Git Bash"
    }
  },
  "extensions.ignoreRecommendations": true,
  "github.copilot.enable": {
    "*": false,
    "plaintext": false,
    "markdown": false
  },
  "github.copilot.editor.enableCodeActions": false,
  "github.copilot.nextEditSuggestions.enabled": false,
  "editor.inlineSuggest.enabled": false,
  "chat.agent.enabled": false,
  "chat.tools.terminal.autoApprove": {},
  "chat.tools.urls.autoApprove": {},
  "workbench.editorAssociations": {}
}
JSON

if [ -f "$PROJECT_ROOT/.vscode/settings.json" ]; then
  cp "$PROJECT_ROOT/.vscode/settings.json" "$PROJECT_ROOT/.vscode/settings.local.json" 2>/dev/null || true
fi

echo "Perfil do aluno aplicado sem expor a política local do ambiente."
