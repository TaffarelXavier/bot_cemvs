const { removeAccents } = require("../utils/removeAccents");

function isCemvs(texto) {
  let input = removeAccents(texto).toLowerCase().trim();

  const contemCEMVS = input.includes("cemvs.ltai.com.br");
  const contemID = input.includes("id:");
  const contemTurma = input.includes("turma:");
  const contemDataNascimento = input.includes("data de nascimento:");

 return contemCEMVS && contemID && contemTurma && contemDataNascimento;

}

module.exports = isCemvs;
