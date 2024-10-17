const produtos = [
    { nome: 'Bolsa Gucci', preco: 3200, quantidade: 15 },
    { nome: 'Sapatinho Gucci', preco: 2930, quantidade: 18 },
    { nome: 'Óculos MIUMIU', preco: 1290, quantidade: 33 },
    { nome: 'Relógio Rolex Submariner', preco: 85000, quantidade: 14 },
    { nome: 'Óculos de Sol Cartier', preco: 9500, quantidade: 10 },
    { nome: 'Sapatos Christian Louboutin', preco: 6800, quantidade: 10 },
    { nome: 'Jaqueta Balmain', preco: 25000, quantidade: 10 },
    { nome: 'Perfume Clive Christian No.1', preco: 15500, quantidade: 10 }
];
let carrinho = [];
function mostrarProdutos() {
    const listaProdutos = document.getElementById('productList');
    listaProdutos.innerHTML = produtos.map(prod => 
        `<li>${prod.nome} - R$ ${prod.preco} (Estoque: ${prod.quantidade})</li>`
    ).join('');
}
function addToCart() {
    const nomeProduto = document.getElementById('productSearch').value.trim().toLowerCase();
    const produto = produtos.find(p => p.nome.toLowerCase() === nomeProduto && p.quantidade > 0);
    
    if (produto) {
        carrinho.push({ ...produto });
        produto.quantidade--;
        atualizarInterface();
    } else {
        alert('Vixi estamos sem esse item no estoque.');
    }
}
function mostrarCarrinho() {
    const listaCarrinho = document.getElementById('cartList');
    listaCarrinho.innerHTML = carrinho.map((item, index) => 
        `<li>${item.nome} - R$ ${item.preco} <button onclick="removerDoCarrinho(${index})">Remover</button></li>`
    ).join('');

    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    document.getElementById('totalPrice').innerText = `Total: R$ ${total.toFixed(2)}`;
}
function removerDoCarrinho(index) {
    const produtoRemovido = carrinho.splice(index, 1)[0];
    const produtoEstoque = produtos.find(p => p.nome === produtoRemovido.nome);
    produtoEstoque.quantidade++;
    atualizarInterface();
}
function atualizarInterface() {
    mostrarProdutos();
    mostrarCarrinho();
}
function ordenarCarrinho() {
    carrinho.sort((a, b) => a.preco - b.preco);
    mostrarCarrinho();
}
window.onload = function() {
    mostrarProdutos();
    mostrarCarrinho();
};
