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

    transfer(produto, local, qnt) {
        const produtoObj = this.produto.find(p => p.produto === produto.name);
        if (produtoObj && produtoObj.quantidade >= qnt) {
            produtoObj.quantidade -= qnt;
            if (produtoObj.quantidade === 0) {
                this.produto = this.produto.filter(p => p.produto !== produto.name);
            }
            local.entrada(qnt);
            console.log(`Transferido ${qnt} ${produto.name} de ${this.local} para ${local.local}`);
        } else {
            console.log(`Não há quantidade suficiente de ${produto.name} para transferir`);
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
const LocalEntreposto = new Local ('entreposto', 0);
const LocalCarro = new Local ('carro', 0);
const LocalCliente = new Local('cliente',0);

const Dezena = new Produto('Dezena', 10);
const Duzia = new Produto('Duzia', 12);
const Bandeja = new Produto('Bandeja', 30);

const produtosMap = {
    'Dezena': Dezena,
    'Duzia': Duzia,
    'Bandeja': Bandeja
};

const locaisMap = {
    'LocalEntreposto': LocalEntreposto,
    'LocalCarro': LocalCarro,
    'LocalCliente': LocalCliente
};

const form = document.getElementById('form-eggs');
const inputQntEggs = document.getElementById('receber-qntd');
const saldoGranja = document.getElementById('saldoGranja');
const submitProducaoBtn = document.getElementById('submitProducao');
const inputProduto = document.getElementById('produtoSelect');
const inputQntProducao = document.getElementById('QntOvos1');
const produtosGranja = document.getElementById('produtosGranja');


const inputTransferencia = document.getElementById('localTransferencia');
const TransProdutoSelect = document.getElementById('TransProdutoSelect');
const BtnTransfer = document.getElementById('submitTransferencia');
const inputQntTransf = document.getElementById('QntTransf');


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
    localStorage.setItem('produtos',JSON.stringify(produto))
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
LocalGranja.producao(Dezena,10);
LocalGranja.transfer(Dezena,LocalEntreposto,1)


console.log(LocalEntreposto)


BtnTransfer.addEventListener('click', (evento)=>{
    evento.preventDefault();
    realizarTransferencia();
    mostrarProdutos()

})

function realizarTransferencia(){
    const produtoSolicitado= TransProdutoSelect.value;
    const localDestino =inputTransferencia.value;
    const quantidade = parseInt(inputQntTransf.value, 10);
    const produtoObj = produtosMap[produtoSolicitado];
    const localObj= locaisMap[localDestino];

    if(produtoObj && localObj){
        LocalGranja.transfer(produtoObj, localObj, quantidade);
        saldoGranja.textContent=LocalGranja.qntOvos
    }else {
        console.log('Produto ou local não encontrado.')
}


}

const btnAdicionarTarefa= document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea');
const tarefas=[];

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
    salvarTexto()
})

function salvarTexto(){
   
    const tarefa = {
        descricao: textarea.value
    }
    tarefas.push(tarefa)
console.log (tarefas)
}