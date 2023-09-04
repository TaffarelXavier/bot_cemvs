const { removeAccents } = require("../utils/removeAccents");

function isCemvs(texto) {
  const inputs = [
    "olá, preciso de ajuda sobre ava (cemvs).",
    "minha senha está errada",
    "minha senha esta errada",
    "minha senha tá errada",
    "não consigo entrar no ava",
    "não consigo entrar",
    "sou do cemvs",
    "cemvs",
    "manoel vicente de sousa",
    "manoel vicente de souza",
    "esqueci minha senha",
    "esqueci mimha senha",
    "esquecir mimha senha",
    "não estou conseguindo entrar"
  ];

  const normalizedTexto = removeAccents(texto.toLowerCase().trim());

  return inputs.some((input) => {
    const normalizedInput = removeAccents(input.toLowerCase().trim());
    return normalizedInput.includes(normalizedTexto);
  });
}

module.exports = isCemvs;
