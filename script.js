const numero = "5598983133886";

let carrinho = {};
let produtos = [];

const container = document.getElementById("produtos");
const containerSanduiches = document.getElementById("sanduiches");
const containerBebidas = document.getElementById("bebidas");

// carregar JSON
fetch("produtos.json")
  .then(response => response.json())
  .then(data => {
    produtos = data;

    const sanduiches = produtos.filter(p => p.categoria === "sanduiches");
    const bebidas = produtos.filter(p => p.categoria === "bebidas");

    renderizarLista(sanduiches, containerSanduiches);
    renderizarLista(bebidas, containerBebidas);

    atualizarTotal(); // 🔥 ADICIONADO
  });

function renderizarLista(lista, container) {
  lista.forEach(produto => {
    carrinho[produto.id] = 0;

    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <img src="${produto.imagem}">
      <h2>${produto.nome}</h2>
      <p>R$ ${produto.preco}</p>

      <div class="controls">
        <button onclick="diminuir(${produto.id})">-</button>
        <span id="qtd-${produto.id}">0</span>
        <button onclick="aumentar(${produto.id})">+</button>
      </div>
    `;

    container.appendChild(div);
  });
}

function atualizarTotal() {
  let total = 0;

  produtos.forEach(produto => {
    const qtd = carrinho[produto.id];
    total += produto.preco * qtd;
  });

  document.getElementById("valor-total").innerText = `R$ ${total}`;
}

function aumentar(id) {
  carrinho[id]++;
  document.getElementById(`qtd-${id}`).innerText = carrinho[id];
  atualizarTotal(); // 🔥 ADICIONADO
}

function diminuir(id) {
  if (carrinho[id] > 0) {
    carrinho[id]--;
    document.getElementById(`qtd-${id}`).innerText = carrinho[id];
    atualizarTotal(); // 🔥 ADICIONADO
  }
}

function enviarPedido() {
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const obs = document.getElementById("obs").value;

  // 🔥 validação primeiro
  if (!nome || !endereco) {
    alert("Preencha nome e endereço!");
    return;
  }

  let mensagem = "🍔 *Pedido:*\n";
  let total = 0;

  produtos.forEach(produto => {
    const qtd = carrinho[produto.id];
    if (qtd > 0) {
      mensagem += `\n${qtd}x ${produto.nome} - R$ ${produto.preco * qtd}`;
      total += produto.preco * qtd;
    }
  });

  if (total === 0) {
    alert("Adicione itens ao pedido!");
    return;
  }

  // 🔥 total antes dos dados
  mensagem += `\n\n💰 Total: R$ ${total}`;

  mensagem += `\n\n👤 Nome: ${nome}`;
  mensagem += `\n📍 Endereço: ${endereco}`;

  if (obs) {
    mensagem += `\n📝 Obs: ${obs}`;
  }

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}

window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    
    setTimeout(function() {
        
        loadingScreen.classList.add('loading-hidden');
        
        setTimeout(function() {
            loadingScreen.remove();
        }, 600); // <-- Tempo do FADE-OUT (deletar do HTML)

    }, 2000); // <-- AQUI! É esse "2000" que você muda para controlar a duração!
});