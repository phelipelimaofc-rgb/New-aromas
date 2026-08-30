// ============ DADOS DE PRODUTOS ============
const produtos = [
    {
        id: 1,
        nome: "Vela Aromática Lavanda",
        categoria: "velas",
        preco: 45.00,
        descricao: "Vela perfumada com essência de lavanda pura. Perfeita para relaxamento.",
        imagem: "🕯️"
    },
    {
        id: 2,
        nome: "Vela Aromática Rosas Vermelhas",
        categoria: "velas",
        preco: 50.00,
        descricao: "Vela luxuosa com aroma de rosas vermelhas nobres.",
        imagem: "🕯️"
    },
    {
        id: 3,
        nome: "Vela Aromática Baunilha",
        categoria: "velas",
        preco: 42.00,
        descricao: "Vela com aroma doce e confortante de baunilha premium.",
        imagem: "🕯️"
    },
    {
        id: 4,
        nome: "Vela Aromática Cítrico",
        categoria: "velas",
        preco: 40.00,
        descricao: "Vela energizante com aromas cítricos refrescantes.",
        imagem: "🕯️"
    },
    {
        id: 5,
        nome: "Sabonete Natural Premium",
        categoria: "sabonetes",
        preco: 25.00,
        descricao: "Sabonete artesanal com ingredientes 100% naturais.",
        imagem: "🧼"
    },
    {
        id: 6,
        nome: "Sabonete Glicerina Hidratante",
        categoria: "sabonetes",
        preco: 30.00,
        descricao: "Sabonete com glicerina pura para máxima hidratação da pele.",
        imagem: "🧼"
    },
    {
        id: 7,
        nome: "Sabonete Esfoliante",
        categoria: "sabonetes",
        preco: 28.00,
        descricao: "Sabonete com propriedades esfoliantes suaves.",
        imagem: "🧼"
    },
    {
        id: 8,
        nome: "Sabonete Antipulgas Pet",
        categoria: "sabonetes",
        preco: 35.00,
        descricao: "Sabonete especial e seguro para banho de animais de estimação.",
        imagem: "🧼"
    }
];

// ============ GERENCIAMENTO DO CARRINHO ============
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarContadorCarrinho();
    atualizarExibicaoCarrinho();
}

function atualizarContadorCarrinho() {
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    document.getElementById('cart-count').textContent = totalItens;
}

function adicionarAoCarrinho(item) {
    const itemExistente = carrinho.find(p => p.id === item.id);
    
    if (itemExistente) {
        itemExistente.quantidade += item.quantidade;
    } else {
        carrinho.push(item);
    }
    
    salvarCarrinho();
    mostrarNotificacao('Produto adicionado ao carrinho!');
}

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    salvarCarrinho();
}

function atualizarQuantidadeCarrinho(id, novaQuantidade) {
    const item = carrinho.find(p => p.id === id);
    if (item) {
        item.quantidade = Math.max(1, novaQuantidade);
        salvarCarrinho();
    }
}

function limparCarrinho() {
    if (carrinho.length > 0 && confirm('Deseja limpar seu carrinho?')) {
        carrinho = [];
        salvarCarrinho();
    }
}

// ============ ATUALIZAÇÃO DA EXIBIÇÃO DO CARRINHO ============
function atualizarExibicaoCarrinho() {
    const carrinhoVazio = document.getElementById('carrinho-vazio');
    const carrinhoConteudo = document.getElementById('carrinho-conteudo');
    const carrinhoItens = document.getElementById('carrinho-itens');

    if (carrinho.length === 0) {
        carrinhoVazio.style.display = 'flex';
        carrinhoConteudo.style.display = 'none';
        return;
    }

    carrinhoVazio.style.display = 'none';
    carrinhoConteudo.style.display = 'grid';
    carrinhoItens.innerHTML = '';

    carrinho.forEach(item => {
        const itemHTML = document.createElement('div');
        itemHTML.className = 'carrinho-item';
        itemHTML.innerHTML = `
            <div class="carrinho-item-img">
                ${item.imagem || '📦'}
            </div>
            <div class="carrinho-item-info">
                <div class="carrinho-item-nome">${item.nome}</div>
                <div class="carrinho-item-descricao">${item.descricao || ''}</div>
                <div class="carrinho-item-preco">R$ ${item.preco.toFixed(2)}</div>
                <div class="carrinho-item-controles">
                    <button onclick="diminuirQuantidade(${item.id})">−</button>
                    <span class="carrinho-item-qtd">${item.quantidade}</span>
                    <button onclick="aumentarQuantidade(${item.id})">+</button>
                    <button class="carrinho-item-remover" onclick="removerDoCarrinho(${item.id})">Remover</button>
                </div>
            </div>
        `;
        carrinhoItens.appendChild(itemHTML);
    });

    atualizarResumoCarrinho();
}

function aumentarQuantidade(id) {
    const item = carrinho.find(p => p.id === id);
    if (item) {
        item.quantidade++;
        salvarCarrinho();
    }
}

function diminuirQuantidade(id) {
    const item = carrinho.find(p => p.id === id);
    if (item && item.quantidade > 1) {
        item.quantidade--;
        salvarCarrinho();
    }
}

// ============ RESUMO DO CARRINHO ============
function atualizarResumoCarrinho() {
    const subtotal = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    const frete = subtotal > 100 ? 0 : 15.00;
    const total = subtotal + frete;

    document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById('frete').textContent = frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2)}`;
    document.getElementById('total').textContent = `R$ ${total.toFixed(2)}`;
}

// ============ EXIBIÇÃO DOS PRODUTOS ============
function exibirProdutos(filtro = 'todos') {
    const grid = document.getElementById('produtos-grid');
    grid.innerHTML = '';

    const produtosFiltrados = filtro === 'todos' 
        ? produtos 
        : produtos.filter(p => p.categoria === filtro);

    produtosFiltrados.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'produto-card';
        card.innerHTML = `
            <div class="produto-img">
                ${produto.imagem}
            </div>
            <div class="produto-info">
                <div class="produto-nome">${produto.nome}</div>
                <div class="produto-descricao">${produto.descricao}</div>
                <div class="produto-preco">R$ ${produto.preco.toFixed(2)}</div>
                <button class="produto-btn" onclick="abrirModalProduto(${produto.id})">Ver Detalhes</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ============ MODAL DO PRODUTO ============
const modal = document.getElementById('modal-produto');
const closeBtn = document.querySelector('.close');
let produtoSelecionado = null;

function abrirModalProduto(id) {
    produtoSelecionado = produtos.find(p => p.id === id);
    
    if (produtoSelecionado) {
        document.getElementById('modal-titulo').textContent = produtoSelecionado.nome;
        document.getElementById('modal-descricao').textContent = produtoSelecionado.descricao;
        document.getElementById('modal-preco').textContent = `R$ ${produtoSelecionado.preco.toFixed(2)}`;
        document.getElementById('modal-img').textContent = produtoSelecionado.imagem;
        document.getElementById('quantidade').value = 1;
        
        modal.style.display = 'block';
    }
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

document.getElementById('btn-adicionar-carrinho').onclick = function() {
    const quantidade = parseInt(document.getElementById('quantidade').value);
    
    if (produtoSelecionado) {
        adicionarAoCarrinho({
            id: produtoSelecionado.id,
            nome: produtoSelecionado.nome,
            preco: produtoSelecionado.preco,
            descricao: produtoSelecionado.descricao,
            imagem: produtoSelecionado.imagem,
            quantidade: quantidade
        });
        
        modal.style.display = 'none';
    }
}

// ============ FILTRO DE PRODUTOS ============
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        exibirProdutos(this.dataset.filter);
    });
});

// ============ PERSONALIZAÇÃO DE SABONETES ============
const corNomes = {
    '#ff69b4': 'Rosa',
    '#ff1493': 'Rosa Profundo',
    '#ff69b4': 'Rosa',
    '#ff0000': 'Vermelho',
    '#ff6347': 'Tomate',
    '#ffa500': 'Laranja',
    '#ffff00': 'Amarelo',
    '#00ff00': 'Verde',
    '#00ced1': 'Turquesa',
    '#0000ff': 'Azul',
    '#9370db': 'Roxo',
    '#9932cc': 'Roxo Escuro',
    '#ffffff': 'Branco',
    '#c0c0c0': 'Prata',
    '#ffd700': 'Dourado',
    '#000000': 'Preto'
};

document.getElementById('cor-principal').addEventListener('change', function() {
    const cor = this.value;
    const saboneteBase = document.getElementById('sabonete-base-preview');
    saboneteBase.style.background = `linear-gradient(135deg, ${cor} 0%, ${cor} 100%)`;
    
    const corNome = corNomes[cor] || 'Personalizada';
    document.getElementById('cor-nome').textContent = corNome;
});

// Atualizar preview do sabonete ao mudar a base
document.getElementById('sabonete-base').addEventListener('change', function() {
    const baseColorMap = {
        'natural': '#f5e6d3',
        'glicerina': '#ffd700',
        'premium': '#c0c0c0'
    };
    
    const cor = document.getElementById('cor-principal').value;
    const saboneteBase = document.getElementById('sabonete-base-preview');
    
    if (baseColorMap[this.value]) {
        saboneteBase.style.background = `linear-gradient(135deg, ${cor} 0%, ${baseColorMap[this.value]} 100%)`;
    }
});

// Inicializar preview
document.getElementById('sabonete-base-preview').style.background = 'linear-gradient(135deg, #ff69b4 0%, #ff1493 100%)';

document.getElementById('form-personalizacao').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const base = document.getElementById('sabonete-base').value;
    const cor = document.getElementById('cor-principal').value;
    const aroma = document.getElementById('sabonete-aroma').value;
    const esponja = document.getElementById('esponja-tipo').value;
    const texto = document.getElementById('sabonete-texto').value;
    
    // Validar campos obrigatórios
    if (!base || !aroma || !esponja) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }
    
    // Calcular preço da personalização
    const precoBase = {
        'natural': 25.00,
        'glicerina': 30.00,
        'premium': 40.00
    };
    
    const precoEsponja = {
        'konjac': 15.00,
        'luffa': 12.00,
        'bamboo': 10.00,
        'nenhuma': 0
    };
    
    const preco = precoBase[base] + precoEsponja[esponja];
    
    // Coletar cores secundárias selecionadas
    const coresSelecionadas = Array.from(document.querySelectorAll('.cor-secundaria:checked'))
        .map(cb => cb.value)
        .join(', ');
    
    const descricaoPersonalizacao = `
        Base: ${base.charAt(0).toUpperCase() + base.slice(1)} | 
        Cor: ${corNomes[cor] || 'Personalizada'} |
        Aroma: ${aroma.charAt(0).toUpperCase() + aroma.slice(1)} |
        Esponja: ${esponja.charAt(0).toUpperCase() + esponja.slice(1)}
        ${texto ? ` | Texto: "${texto}"` : ''}
        ${coresSelecionadas ? ` | Cores Sec: ${coresSelecionadas}` : ''}
    `;
    
    const itemPersonalizado = {
        id: Date.now(),
        nome: 'Sabonete Personalizado',
        preco: preco,
        descricao: descricaoPersonalizacao,
        imagem: '🧼',
        quantidade: 1,
        personalizado: true
    };
    
    adicionarAoCarrinho(itemPersonalizado);
    
    // Limpar formulário
    this.reset();
    document.getElementById('sabonete-base-preview').style.background = 'linear-gradient(135deg, #ff69b4 0%, #ff1493 100%)';
    document.getElementById('cor-nome').textContent = 'Rosa';
    
    // Scroll para o carrinho
    setTimeout(() => {
        document.getElementById('carrinho').scrollIntoView({ behavior: 'smooth' });
    }, 300);
});

// ============ WHATSAPP ============
document.getElementById('btn-whatsapp').addEventListener('click', function() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    let mensagem = '🛍️ *Olá! Gostaria de fazer um pedido na New Aromas*\n\n';
    mensagem += '*DETALHES DO PEDIDO:*\n';
    mensagem += '─────────────────────\n';
    
    carrinho.forEach((item, index) => {
        mensagem += `\n${index + 1}. ${item.nome}\n`;
        mensagem += `   Quantidade: ${item.quantidade}\n`;
        mensagem += `   Preço unitário: R$ ${item.preco.toFixed(2)}\n`;
        if (item.descricao) {
            mensagem += `   Detalhes: ${item.descricao}\n`;
        }
    });
    
    const subtotal = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    const frete = subtotal > 100 ? 0 : 15.00;
    const total = subtotal + frete;
    
    mensagem += '\n─────────────────────\n';
    mensagem += `📦 Subtotal: R$ ${subtotal.toFixed(2)}\n`;
    mensagem += `🚚 Frete: ${frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2)}`}\n`;
    mensagem += `💰 *TOTAL: R$ ${total.toFixed(2)}*\n\n`;
    mensagem += '💬 Aguardo seu retorno para confirmar o pedido!';
    
    // Número de WhatsApp (substitua pelo seu)
    const numeroWhatsApp = '5511999999999'; // Formato: 55 + DD + 9 + número
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(urlWhatsApp, '_blank');
});

// ============ MENU MOBILE ============
document.getElementById('menu-toggle').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('mobile-menu').classList.remove('active');
    });
});

// ============ NOTIFICAÇÃO ============
function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: bold;
    `;
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

// Adicionar animação de notificação ao CSS dinâmico
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============ INICIALIZAÇÃO ============
document.addEventListener('DOMContentLoaded', function() {
    // Exibir produtos iniciais
    exibirProdutos('todos');
    
    // Atualizar carrinho ao carregar página
    atualizarContadorCarrinho();
    atualizarExibicaoCarrinho();
    
    // Fazer scroll suave funcionar em navegadores antigos
    if (!window.CSS || !window.CSS.supports('scroll-behavior', 'smooth')) {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
});

// ============ FUNÇÃO DE BUSCA (EXTRA) ============
function buscarProdutos(termo) {
    const grid = document.getElementById('produtos-grid');
    grid.innerHTML = '';
    
    const produtosEncontrados = produtos.filter(p => 
        p.nome.toLowerCase().includes(termo.toLowerCase()) ||
        p.descricao.toLowerCase().includes(termo.toLowerCase())
    );
    
    if (produtosEncontrados.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">Nenhum produto encontrado</p>';
        return;
    }
    
    produtosEncontrados.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'produto-card';
        card.innerHTML = `
            <div class="produto-img">
                ${produto.imagem}
            </div>
            <div class="produto-info">
                <div class="produto-nome">${produto.nome}</div>
                <div class="produto-descricao">${produto.descricao}</div>
                <div class="produto-preco">R$ ${produto.preco.toFixed(2)}</div>
                <button class="produto-btn" onclick="abrirModalProduto(${produto.id})">Ver Detalhes</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ============ VALIDAÇÃO DE CARRINHO ============
function validarCarrinho() {
    return carrinho.length > 0;
}

// ============ SALVAR CARRINHO ANTES DE SAIR ============
window.addEventListener('beforeunload', function() {
    salvarCarrinho();
});

// ============ DADOS DE TESTE (COMENTADO) ============
/*
// Descomente para adicionar itens de teste ao carrinho
function adicionarTestesCarrinho() {
    adicionarAoCarrinho({
        id: 999,
        nome: 'Teste',
        preco: 50.00,
        descricao: 'Produto de teste',
        imagem: '🛍️',
        quantidade: 1
    });
}
*/
