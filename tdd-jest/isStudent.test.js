const isStudent = require("../utils/isStudent");

describe("Verificar se é um aluno do colégio CEMVS", () => {
  it("Deve retornar verdadeiro se a entrada conter Nome, ID, Turma, Data de Nascimento", () => {

    const inputString = `Olá, preciso de ajuda sobre AVA (CEMVS).
Sou aluno(a)
Nome: *Felipe Alves da Silva *
ID: 613112
Turma: 13.04
Data de nascimento: 15/03/2008
Não estou conseguindo entrar
_A senha está dando inválido _
Link: https://cemvs.ltai.com.br`;

    const result = isStudent(inputString);

    expect(result).toBe(true);
  });
});
