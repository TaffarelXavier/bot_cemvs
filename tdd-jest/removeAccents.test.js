const {removeAccents} = require("../utils/removeAccents");

describe("Teste de removeAccentsDiacriticsInAStringInJavaScript", () => {
  it("Deve remover acentos e diacríticos da string (verdadeiro)", () => {

    const inputString = "Isabelly Mesquita de Sousa";
    const expectedString = "Isabelly Mesquita de Sousa"; // Sem acentos

    const result = removeAccents(inputString);

    expect(result).toBe(expectedString);
  });

  it("Deve remover acentos e diacríticos da string (falso)", () => {

    const inputString = "táffarel";
    const expectedString = "taffarel"; // Sem acentos

    const result = removeAccents(inputString);

    expect(result).toBe(expectedString);
  });
});
