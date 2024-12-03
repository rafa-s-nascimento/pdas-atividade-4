import { Jogo } from "./classes.js";

const jogo = new Jogo();
const cartela = jogo.gerarCartela();

const sortearBtn = document.querySelector("#sortear-btn");
const automaticoBtn = document.querySelector("#automatico-btn");

let automatico = null;
let automaticoAtivo = false;

sortearBtn.addEventListener("click", () => {
  jogo.sortearBola();
  atualizaInterface();
});

const atualizaInterface = () => {
  const { bolaSorteada, bolasSorteadas } = jogo;

  const bolasSorteadasSet = new Set(bolasSorteadas.map((obj) => obj.numero));

  const exibeNumeroSorteado = document.querySelector(".exibe-numero-sorteado");
  const bolasSorteadasHtml = [...document.querySelectorAll(".bola-sorteada")];
  const bolasSorteadasHtmlFilter = bolasSorteadasHtml.filter((node) =>
    bolasSorteadasSet.has(Number(node.dataset.id))
  );
  const bolasDaCartelaHtlm = [...document.querySelectorAll(".bola-cartela")];

  exibeNumeroSorteado.innerHTML = `<spam class="exibe-letra-sorteada">${bolaSorteada.letra}</spam>${bolaSorteada.numero}`;
  bolasSorteadasHtmlFilter.map((node) => node.classList.add("sorteada"));
  bolasDaCartelaHtlm.map((node) => {
    if (node.dataset.id === `${bolaSorteada.letra}${bolaSorteada.numero}`) {
      node.innerHTML = node.innerHTML + `<i class="fa-solid fa-x"></i>`;
    }

    return node;
  });
};

const exibirCartela = () => {
  const { bolasDaCartela } = cartela;

  for (let i = 0; i < bolasDaCartela.length; i++) {
    const nodeHtml = [
      ...document.querySelectorAll(
        `.bola-cartela-${bolasDaCartela[i][0].letra}`
      ),
    ];

    nodeHtml.map((node, index) => {
      node.dataset.id = `${bolasDaCartela[i][index].letra}${bolasDaCartela[i][index].numero}`;
      node.innerText = `${bolasDaCartela[i][index].numero}`;
    });
  }
};

exibirCartela();

automaticoBtn.addEventListener("click", () => {
  if (!automaticoAtivo) {
    automatico = setInterval(() => {
      try {
        jogo.sortearBola();
        atualizaInterface();
      } catch (error) {
        clearInterval(automatico);
        alert("Jogo finalizado");
      }
    }, 1500);

    automaticoAtivo = true;
  } else {
    clearInterval(automatico);
    automaticoAtivo = false;
  }
});
