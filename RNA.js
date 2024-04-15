//função que gera um número aleatório no intervalo entre um mínimo e um máximo
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

//interpolação linear: pega o valor intermediário entre os dois pontos
function lerp(a, b, t) {
  return (a + (b - a) * t);
}

class Neuron {
  constructor(inputs) {
    //inicia o neurônio com um vies/bias no intervalo [-1,1]
    this.bias = randomRange(-1, 1);

    //inicia uma lista de pesos com valores no intervalo [-1,1]
    this.weightList = new Array(inputs)
    .fill()
    .map(() => randomRange(-1, 1));
  }

    //analisa/calcula a saída do neurônio - ativação
  g(signalList = []) {
    let u = 0;

    //calcula a soma ponderada dos sinais e multiplica pelos pesos
    for(let i = 0; i < this.weightList.length; i++) {
      u += signalList[i] * this.weightList[i];
    }

    //verifica se o neurônio está ativado com base na função tangente
    if(Math.tanh(u) > this.bias) {
      return 1; //ativado
    } else {
      return 0; //desativado
    }
  }

  //mutação dos pesos para que a próxima geração seja diferente e evolua
  mutate(rate = 1) {
    //callback function para mutação dos pesos com base na taxa rate
    this.weightList = this.weightList.map(() => {
      return lerp(w, randomRange(-1, 1), rate);
    });

    this.bias = lerp(this.bias, randomRange(-1,1), rate);
  }
}

class RNA {
  constructor(inputCount = 1, levelList = []) {
    //inicializa a pontuação com 0 - a pontuação serve para comparar as gerações e neurônios
    this.score = 0;

    //cria camadas de neurônios
    this.levelList = levelList.map((l, i) => {
      const inputSize = i === 0 ? inputCount : levelList[i - 1];
      return new Array(l).fill().map(() => new Neuron(inputSize));
    });
  }

  //calcula a saída do RNA (output) - saída de ativação ou de não ativação
  compute(list = []) {
    for(let i = 0; i < this.levelList.length; i++) {
      const tempList = [];

      for(const neuron of this.levelList[i]) {
        if(list.length !== neuron.weightList.length) {
          throw new Error('Entrada inválida');
        }
        tempList.push(neuron.g(list));
      }
      list = tempList;
    }
    return list;
  }
}

mutate(rate = 1); {
  for(const level of this.levelList) {
    //mutação no neurônio/geração
    for(const neuron of level) neuron.mutate(rate);
  }
}

load(rna); {
  if(!rna) return;
  try {
    //map cria uma nova lista utilizando a informação de uma lista original
    this.levelList = rna.map((neuronList) => {
      return neuronList.map((neuron) => {
        //cria um novo neurônio com base na RNA carregada, para que herde das gerações anteriores
        const n = new Neuron();
        //aplica o bias ao neurônio
        n.bias = neuron.bias;
        //wightList ajuda a atribuir a importância das diferentes entradas e ajuda a rede a aprender e tomar decisões com base nos dados de entrada
        n.weightList = neuron.weightList;
        return n;
      });
    });
  } catch(e) {
    return;
  }
  save(); {
    return this.levelList;
  }
}

export default RNA;
