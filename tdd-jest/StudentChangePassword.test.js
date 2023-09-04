const Student = require("../utils/Student");

describe("Extrai dados dos alunos.", () => {

  it("Deve alterar a senha do aluno com sucesso.", async () => {
    const data = await Student.pesquisarAluno(722228);
    const res = await Student.changePasswordStudent(data.data);
    expect(res.status).toEqual(204);
  });

  it("Deve retorna TRUE porque o aluno cujo ID 220819 não existe.", async () => {
    const response = await Student.pesquisarAluno(220819);
    console.log(response.data);
    expect(response.data).toEqual('aluno_not_found');
  });

  it("Deve ser TRUE se a propriedade alu_nome existir.", async () => {
    const data = await Student.pesquisarAluno(722228);
    expect(data.data).toHaveProperty("alu_nome");
  });

  it("Deve ser TRUE se a found existir.", async () => {
    const data = await Student.pesquisarAluno(722228);
    expect(data).toHaveProperty("found");
  });

  it("Deve ser FALSE se a propriedade alu_nome existir.", async () => {
    const { data } = await Student.pesquisarAluno(722228);
    expect(data).not.toHaveProperty("alu_snome");
  });
});
