const isCemvs = require("../utils/isCemvs");
const {removeAccents} = require("../utils/removeAccents");

describe("Verificar se a entrada é cemvs", () => {

  it("Deve retornar verdadeiro se a entrada é 'Olá, preciso de ajuda sobre AVA (CEMVS)'", () => {

    const inputString = "Olá, preciso de ajuda sobre AVA (CEMVS)."

    const result = isCemvs(inputString);

    expect(result).toBe(true);
  });

  it("Deve retornar verdadeiro se a entrada é 'Ola, preciso de ajuda sobre AVA (CEMVS)'", () => {

    const inputString = "Ola, preciso de ajuda sobre AVA (CEMVS).";

    const result = isCemvs(inputString);

    expect(result).toBe(true);
  });

  it("Deve retornar verdadeiro: entrada cemvs", () => {
    expect(isCemvs('cemvs')).toBe(true);
    expect(isCemvs('cemvS')).toBe(true);
    expect(isCemvs('cémvs')).toBe(true);
    expect(isCemvs('cEmVs')).toBe(true);
  });

  it("Deve retornar verdadeiro: esqueci minha senha", () => {
    expect(isCemvs('ESQUECI MINHA SENHA')).toBe(true);
    expect(isCemvs('ESQUECI MINHA SENHa')).toBe(true);
    expect(isCemvs('ESQUECI MINHA SENHa')).toBe(true);
    expect(isCemvs('ESQUECI MINHA SENHa')).toBe(true);
    expect(isCemvs('ESQUECí MINHA SENHa')).toBe(true);
  });

  // it("Deve retornar verdadeiro se a entrada é 'Olá, preciso de ajuda sobre AVA (CEMVS)'", () => {

  //   const inputString = "Ola, preciso de ajuda sobre AVA (CEMVS).".toLowerCase();

  //   const result = isCemvs(inputString);

  //   expect(result).toBe(true);
  // });

  // it("Deve retornar falso, porque a string não está em minúscula.", () => {

  //   const inputString = "Ola, preciso de AJUDA sobre AVA (CEMVS).";

  //   const result = isCemvs(inputString);

  //   expect(result).toBe(false);
  // });

});
