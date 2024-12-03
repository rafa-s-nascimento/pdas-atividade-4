const letras = ["B", "I", "N", "G", "O"];

export class Bola {
  constructor(letra, numero) {
    this.letra = letra;
    this.numero = numero;
    this.sorteada = false;
  }
}

export class Cartela {
  constructor(id) {
    this.cartelaId = id;

    this.bolasDaCartela = [];

    this.gerarNumerosCartela();

    this.bingo = false;
  }

  gerarNumerosCartela() {
    let arr = Array.from({ length: 75 }, (_, i) => i + 1);
    for (let i = 0; i < letras.length; i++) {
      let numerosPorLetra = embaralharArray(arr.splice(0, 15)).splice(0, 5);

      this.bolasDaCartela[i] = [];

      for (let z = 0; z < numerosPorLetra.length; z++) {
        if (i === 2 && z === 4) continue;

        this.bolasDaCartela[i][z] = new Bola(letras[i], numerosPorLetra[z]);
      }
    }
  }

  marcarNumero(bolaSorteada) {
    const map = {
      B: 0,
      I: 1,
      N: 2,
      G: 3,
      O: 4,
    };

    const index = map[bolaSorteada.letra];

    for (let i = 0; i < this.bolasDaCartela[index].length; i++) {
      if (
        bolaSorteada.letra === this.bolasDaCartela[index][i].letra &&
        bolaSorteada.numero === this.bolasDaCartela[index][i].numero
      ) {
        this.bolasDaCartela[index][i].sorteada = true;
      }
    }

    this.checarBingo();
  }

  checarBingo() {
    this.bingo = this.bolasDaCartela.flat().every((bola) => {
      return bola.sorteada;
    });

    return this.bingo;
  }
}

export class Jogo {
  constructor() {
    this.cartelas = [];

    this.bolas = Array.from(
      { length: 75 },
      (_, i) =>
        new Bola(
          i + 1 <= 15
            ? "B"
            : i + 1 <= 30
            ? "I"
            : i + 1 <= 45
            ? "N"
            : i + 1 <= 60
            ? "G"
            : "O",
          i + 1
        )
    );

    this.bolasASeremSorteadas = [...this.bolas];
    this.bolasSorteadas = [];
    this.bolaSorteada = null;
    this.jogoFinalizado = false;
  }

  sortearBola() {
    if (this.jogoFinalizado) {
      throw new Error(
        "Uma cartela já completou todos os números. Novas bolas não podem ser sorteadas"
      );
    }

    const bola = this.sortearAleatoria();
    bola.sorteada = true;
    this.atualizarArrays(bola);
    this.atualizarCartelas(bola);
    this.checarVitoria();
    return bola;
  }

  sortearAleatoria() {
    return embaralharArray(this.bolasASeremSorteadas).shift();
  }

  atualizarArrays(bola) {
    this.bolaSorteada = bola;
    this.bolasSorteadas.push(bola);
    this.bolas[bola.numero - 1].sorteada = true;
  }

  atualizarCartelas(bola) {
    this.cartelas.forEach((cartela) => cartela.marcarNumero(bola));
  }

  gerarCartela() {
    const cartela = new Cartela(this.cartelas.length + 1);
    this.cartelas.push(cartela);
    return cartela;
  }

  checarVitoria() {
    const bingo = this.cartelas.some((cartela) => cartela.bingo);

    if (bingo) {
      const cartelaPremiada = this.cartelas.filter((cartela) =>
        cartela.bingo ? cartela : false
      );
      this.jogoFinalizado = true;

      alert("Bingo!");

      console.log(cartelaPremiada);
    }
  }
}

const embaralharArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};
