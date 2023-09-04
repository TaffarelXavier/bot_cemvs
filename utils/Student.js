const { removeAccents } = require("./removeAccents");
const axios = require("axios");
const logger = require("./logger");

const BASE_URL = process.env.BASE_URL;

const Student = {
  input: null,
  getValue(regexPattern) {
    const value = removeAccents(Student.input.trim().replace(/\*/g, ""));
    const match = value.toLowerCase().match(regexPattern);
    const data = match ? match[1].trim() : "";
    return data;
  },
  nome() {
    const nome = Student.getValue(/nome:\s*(.*)/);
    logger.info("Nome do aluno:" + nome);
    return nome;
  },
  id() {
    const id = Student.getValue(/id:\s*(\d+)/);
    logger.info("ID do aluno:" + id);
    return id;
  },
  turma() {
    const turma = Student.getValue(/turma:\s*([\d.]+)/);
    logger.info("Turma do aluno:" + turma);
    return turma;
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
    logger.info("É aluno " + Student.input);
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
    let data = {
      aluno_id: alunoId,
    };

    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: "http://cemvs.ltai.local.br/api/alunos/find_aluno.php",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: data,
    };

    try {
      const { data } = await axios.request(config);
      return data;
    } catch (error) {
      return error.response.data;
    }

    return false;
    // try {
    //   const data = await axios.post(
    //     BASE_URL + "/api/alunos/find_aluno.php",
    //     payload,
    //     {
    //       headers: {
    //         Accept: "application/json",
    //       },
    //     }
    //   );
    //   if (data.data) {
    //     return data;
    //   }
    //   logger.info("pesquisarAluno (success): " + JSON.stringify(data));
    //   return false;
    // } catch (error) {
    //   logger.info("pesquisarAluno (fail): " + JSON.stringify(error));
    //   if (error.response.status == 404) {
    //     return error.response.data;
    //   } else {
    //     logger.info("pesquisarAluno (fail 2): " + JSON.stringify(error));
    //     return false;
    //   }
    // }
  },
  async changePasswordStudent(aluno) {

    const payload = {
      aluno_id: aluno.alu_id,
      password: "1234567",
    };

    // BASE_URL
    let config = {
      url:  "http://cemvs.ltai.local.br/api/alunos/alterar_senha.php",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.put(config.url, payload, config.headers);
      return response;
    } catch ({ response }) {
      console.log("Status:", response.status);
      console.log("statusText:", response.statusText);
      console.log("data:", response.data);
    }
  },
};

module.exports = Student;
