const Student = require("../utils/isStudent");

describe("Extrai dados dos alunos.", () => {

  it("Deve pegar o nome do aluno", () => {
    const inputString = `Olá, preciso de ajuda sobre AVA (CEMVS).
Sou aluno(a)
Nome: *Felipe Alves da Silva *
ID: 613112
Turma: 13.04
Data de nascimento: 15/03/2008
Não estou conseguindo entrar
_A senha está dando inválido _
Link: https://cemvs.ltai.com.br`;

    Student.input = inputString;
    expect(Student.nome()).toEqual('*felipe alves da silva *');
  });

  it("Deve pegar o id do aluno", () => {
    const inputString = `Olá, preciso de ajuda sobre AVA (CEMVS).
Sou aluno(a)
Nome: *Felipe Alves da Silva *
ID: 613112
Turma: 13.04
Data de nascimento: 15/03/2008
Não estou conseguindo entrar
_A senha está dando inválido _
Link: https://cemvs.ltai.com.br`;

    Student.input = inputString;
    expect(Student.id()).toEqual('613112');
  });

  it("NÃO Deve pegar o id do aluno", () => {
    const inputString = `Olá, preciso de ajuda sobre AVA (CEMVS).
Sou aluno(a)
Nome: *Felipe Alves da Silva *
ID:  613111
Turma: 13.04
Data de nascimento: 15/03/2008
Não estou conseguindo entrar
_A senha está dando inválido _
Link: https://cemvs.ltai.com.br`;

    Student.input = inputString;
    expect(Student.id()).toEqual('613111');
  });

  it("Deve pegar a turma do aluno", () => {
    const inputString = `Olá, preciso de ajuda sobre AVA (CEMVS).
Sou aluno(a)
Nome: *Felipe Alves da Silva *
ID:  613111
Turma: 13.04
Data de nascimento: 15/03/2008
Não estou conseguindo entrar
_A senha está dando inválido _
Link: https://cemvs.ltai.com.br`;

    Student.input = inputString;
    expect(Student.turma()).toEqual('13.04');
  });


});
