#!/bin/bash

set -eu

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
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
    "*": true,
    "plaintext": true,
    "markdown": true
  },
  "github.copilot.editor.enableCodeActions": true,
  "github.copilot.nextEditSuggestions.enabled": true,
  "editor.inlineSuggest.enabled": true,
  "chat.agent.enabled": true,
  "chat.tools.terminal.autoApprove": {},
  "chat.tools.urls.autoApprove": {},
  "workbench.editorAssociations": {}
}
JSON

cp "$PROJECT_ROOT/.vscode/settings.json" "$PROJECT_ROOT/.vscode/settings.admin.json" 2>/dev/null || true

echo "Configuração de administrador aplicada."
