class Local {
    constructor(local, qntOvos = 0) {
        this.local = local;
        this.qntOvos = qntOvos;
        this.produto = [];
    }

    entrada(qnt) {
        if (qnt >= 0) {
            this.qntOvos += qnt;
        }
        return qnt;
    }

    saida(qnt) {
        if (this.qntOvos >= qnt) {
            this.qntOvos -= qnt;
        } return qnt; 
    }

    producao(produto, quantidade) {
        const QntNecessaria = produto.qntEggsTray * quantidade;
        if (this.qntOvos >= QntNecessaria) {
            this.qntOvos -= QntNecessaria;

            const existingProduct = this.produto.find(p => p.produto === produto.name);
            if (existingProduct) {
                existingProduct.quantidade += quantidade;
            } else {
                this.produto.push({ produto: produto.name, quantidade: quantidade });
            }
        } else {
            console.log(`Não há ovos suficientes para produzir ${quantidade} ${produto.name}`);
        }
    }

    listarProdutos() {
        return this.produto;
    }
}

class Produto {
    constructor(name, qntEggsTray) {
        this.name = name;
        this.qntEggsTray = qntEggsTray;
    }
}

const LocalGranja = new Local('granja', 0);

const Dezena = new Produto('Dezena', 10);
const Duzia = new Produto('Duzia', 12);
const Bandeja = new Produto('Bandeja', 30);

const produtosMap = {
    'Dezena': Dezena,
    'Duzia': Duzia,
    'Bandeja': Bandeja
};

const form = document.getElementById('form-eggs');
const inputQntEggs = document.getElementById('receber-qntd');
const saldoGranja = document.getElementById('saldoGranja');
const submitProducaoBtn = document.getElementById('submitProducao');
const inputProduto = document.getElementById('produtoSelect');
const inputQntProducao = document.getElementById('QntOvos1');
const produtosGranja = document.getElementById('produtosGranja');

function mostrarProdutos() {
    const produtos = LocalGranja.listarProdutos();
    produtosGranja.innerHTML = produtos.map(produto => `<li>${produto.produto}: ${produto.quantidade}</li>`).join('');
}

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    salvarQndAdc();
});

function salvarQndAdc() {
    const valor = parseInt(inputQntEggs.value, 10);
    LocalGranja.entrada(valor);
    saldoGranja.textContent = LocalGranja.qntOvos;
    inputQntEggs.value = '';
}

submitProducaoBtn.addEventListener('click', (evento) => {
    evento.preventDefault();
    salvarProducaoSolicitada();
    mostrarProdutos();
});

function salvarProducaoSolicitada() {
    const produtoSolicitado = inputProduto.value;
    const quantidade = parseInt(inputQntProducao.value, 10);

    const produtoObj = produtosMap[produtoSolicitado];

    if (produtoObj) {
        LocalGranja.producao(produtoObj, quantidade);
        saldoGranja.textContent = LocalGranja.qntOvos;
    } else {
        console.log('Produto não encontrado:', produtoSolicitado);
    }
}

LocalGranja.entrada(2000);

document.addEventListener('DOMContentLoaded', () => {
    saldoGranja.textContent = LocalGranja.qntOvos;
    mostrarProdutos();
});

console.log(LocalGranja);