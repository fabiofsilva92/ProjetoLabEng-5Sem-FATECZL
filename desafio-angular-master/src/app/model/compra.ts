import { Produto } from "./produto";

export class Compra {
    produto!: Produto;
    quantidade !: number;
    valorTotal !: number;

    constructor(produto: Produto, quantidade: number, valorTotal: number){}
}
