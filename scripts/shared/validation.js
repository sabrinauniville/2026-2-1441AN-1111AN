export function validateName(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return { valid: false, message: "O nome é obrigatório." };
  }

  if (trimmed.length < 2) {
    return { valid: false, message: "Digite um nome válido." };
  }

  return { valid: true, message: "" };
}

export function validateEmail(value) {
  const trimmed = value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!trimmed) {
    return { valid: false, message: "O e-mail é obrigatório." };
  }

  if (!emailPattern.test(trimmed)) {
    return { valid: false, message: "Digite um e-mail válido." };
  }

  return { valid: true, message: "" };
}

export function validateSubject(value) {
  const trimmed = value.trim();
  const allowedValues = ["suporte", "sugestao", "outro"];

  if (!trimmed) {
    return { valid: false, message: "Selecione um assunto." };
  }

  if (!allowedValues.includes(trimmed)) {
    return { valid: false, message: "Selecione uma opção válida." };
  }

  return { valid: true, message: "" };
}

export function validateMessage(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return { valid: false, message: "A mensagem é obrigatória." };
  }

  if (trimmed.length < 10) {
    return {
      valid: false,
      message: "A mensagem deve ter pelo menos 10 caracteres.",
    };
  }

  return { valid: true, message: "" };
}
