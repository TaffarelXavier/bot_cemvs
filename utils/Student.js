const { removeAccents } = require("./removeAccents");
const axios = require("axios");

const BASE_URL = process.env.BASE_URL;

const Student = {
  input: null,
  getValue(regexPattern) {
    const value = removeAccents(Student.input.trim());
    const match = value.toLowerCase().match(regexPattern);
    return match ? match[1].trim() : "";
  },
  nome() {
    return Student.getValue(/nome:\s*(.*)/);
  },
  id() {
    return Student.getValue(/id:\s*(\d+)/);
  },
  turma() {
    return Student.getValue(/turma:\s*([\d.]+)/);
  },
  dataNascimento() {
    return Student.getValue(/data de nascimento:\s*([\d/]+)/);
  },
  isStudent() {
    const requiredKeys = [
      "cemvs.ltai.com.br",
      "id:",
      "turma:",
      "data de nascimento:",
    ];
    return requiredKeys.every((key) =>
      Student.input.includes(key.toLowerCase())
    );
  },
  getStudent() {
    return {
      nome: Student.nome(),
      id: Student.id(),
      turma: Student.turma(),
      dataNascimento: Student.dataNascimento(),
    };
  },
  async pesquisarAluno(alunoId) {
    const payload = {
      aluno_id: alunoId,
    };

    try {
      const { data } = await axios.post(
        BASE_URL + "/api/alunos/find_aluno.php",
        payload,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (data) {
        return data;
      }
      return false;
    } catch (error) {
      if(error.response.status==404){
        return error.response.data
      }
      else{
        return false;
      }
    }
  },
   async changePasswordStudent(aluno) {
    const payload = {
      aluno_id: aluno.alu_id,
      password: "chkdsk",
    };
    try {
      const data = await axios.put(
        BASE_URL + "/api/alunos/alterar_senha.php",
        payload
      );
      return data;
    } catch (error) {
      return false;
    }
  }
};

module.exports = Student;
