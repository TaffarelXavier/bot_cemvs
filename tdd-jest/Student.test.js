const Student = require("../utils/Student");

describe("Extrai dados dos alunos.", () => {

//   it("Deve pegar o nome do aluno", () => {
//     const inputString = `Olá, preciso de ajuda sobre AVA (CEMVS).
// Sou aluno(a)
// Nome: Isabelly Mesquita de Sousa
// ID: 220819
// Turma: 13.02
// Data de nascimento: 07/10/2007
// Esqueci minha senha
// Link: https://cemvs.ltai.com.br`;

//     Student.input = inputString;
//     expect(Student.nome()).toEqual('*felipe alves da silva *');
//   });

  it("Deve pegar o id do aluno", () => {
    const inputString = `Olá, preciso de ajuda sobre AVA (CEMVS).
Sou aluno(a)
Nome: Isabelly Mesquita de Sousa
ID: 765099
Turma: 13.02
Data de nascimento: 07/10/2007
Esqueci minha senha
Link: https://cemvs.ltai.com.br`;

    Student.input = inputString;

    expect(Student.id()).toEqual('765099');
  });

  it("NÃO Deve pegar o id do aluno", () => {
    const inputString = `Olá, preciso de ajuda sobre AVA (CEMVS).
Sou aluno(a)
Nome: *Felipe Alves da Silva *
ID:  220819
Turma: 13.04
Data de nascimento: 15/03/2008
Não estou conseguindo entrar
_A senha está dando inválido _
Link: https://cemvs.ltai.com.br`;

    Student.input = inputString;
    expect(Student.id()).toEqual('220819');
  });

  it("Deve pegar a turma do aluno", () => {
    const inputString = `Olá, preciso de ajuda sobre AVA (CEMVS).
Sou aluno(a)
Nome: *Felipe Alves da Silva *
ID:  220819
Turma: 13.04
Data de nascimento: 15/03/2008
Não estou conseguindo entrar
_A senha está dando inválido _
Link: https://cemvs.ltai.com.br`;

    Student.input = inputString;
    expect(Student.turma()).toEqual('13.04');
  });


});
