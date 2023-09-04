require("dotenv").config();
const isCemvs = require("../utils/isCemvs");
const isStudent = require("../utils/isStudent");
const Student = require("../utils/Student");
const eCemvs = isCemvs("cemvs");


// const Data  = {
//   setData(content){
//     this.content = content;
//   }
// }

//   const entradaAluno = `Olá, preciso de ajuda sobre AVA (CEMVS).
// Sou aluno(a)
// Nome: Isabelly Mesquita de Sousa
// ID: 723801
// Turma: 13.02
// Data de nascimento: 07/10/2007
// Esqueci minha senha
// Link: https://cemvs.ltai.com.br`;

  if (eCemvs && isStudent(entradaAluno)) {

    Student.input = entradaAluno;

    const maria = Student;

    const student = await Student.pesquisarAluno(maria.id());

    if (student.data == "aluno_not_found" || student.found == false) {
      console.log("Aluno não encontrado");
      return;
    } else {
      if (student.found) {
        const result = await Student.changePasswordStudent(student.data);
        if (result.status == 204) {
          console.log("Senha alterada com sucesso");
          return;
        }
        if (result.data == "bad_request") {
          console.log("Aluno não encontrado");
          return;
        }
      }
    }
  }
