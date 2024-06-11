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
    }

    saida(qnt) {
        if (this.qntOvos >= qnt) {
            this.qntOvos -= qnt;
        }
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