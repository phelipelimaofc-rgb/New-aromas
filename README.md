# 🌸 New Aromas - Loja de Velas Aromáticas e Sabonetes Personalizados

Um site completo, responsivo e sofisticado para uma loja especializada em velas aromáticas e sabonetes personalizados com esponja.

## ✨ Características Principais

### 🎨 Design Elegante e Moderno
- Interface sofisticada com paleta de cores moderna (Rosa e Roxo)
- Design responsivo que funciona perfeitamente em celulares, tablets e desktops
- Animações suaves e transições elegantes
- Navegação intuitiva e fácil de usar

### 🛍️ Catálogo de Produtos
- **8 produtos pré-carregados** (4 velas e 4 sabonetes)
- Exibição em grid responsivo
- Filtros por categoria (Todos, Velas, Sabonetes)
- Modal com detalhes completos de cada produto
- Preços bem definidos

### 🛒 Carrinho de Compras Avançado
- Adicionar/remover produtos
- Aumentar/diminuir quantidades
- Cálculo automático de subtotal, frete e total
- Frete grátis para compras acima de R$ 100
- Armazenamento local (localStorage) - carrinho persiste após fechar o navegador
- Contador dinâmico de itens na navbar

### 🎁 Personalização de Sabonetes
- **Base de Sabonete**: Natural, Glicerina ou Premium (com preços diferentes)
- **Escolha de Cores**: Seletor de cor principal com prévia visual
- **Cores Secundárias**: Opções para adicionar cores complementares (Branca, Dourada, Prata, Vermelha)
- **Aromas**: 8 opções diferentes (Lavanda, Rosas, Baunilha, Amêndoa, Cítrico, Florestal, Frutas, Especiarias)
- **Tipos de Esponja**: Konjac, Luffa, Bamboo ou sem esponja
- **Texto Personalizado**: Espaço para mensagem (até 30 caracteres)
- **Pré-visualização em Tempo Real**: Sabonete visualizado conforme cores escolhidas

### 💬 Integração WhatsApp
- Botão "Finalizar Pedido no WhatsApp"
- Mensagem formatada e automática com:
  - Todos os produtos do carrinho
  - Quantidades
  - Preços unitários
  - Subtotal
  - Valor do frete
  - Total da compra
- Link direto para conversa no WhatsApp

### 📱 Responsividade Completa
- Totalmente funcional em celulares
- Menu hambúrguer para mobile
- Grid adaptativo de produtos
- Modais responsivos
- Fonte redimensionável para telas pequenas

### 🔔 Notificações de Usuário
- Notificações visuais quando produto é adicionado ao carrinho
- Animações suaves de entrada e saída

## 📁 Estrutura do Projeto

```
New-aromas/
├── index.html      # Arquivo HTML principal
├── styles.css      # Estilos CSS completos
├── script.js       # Lógica JavaScript
└── README.md       # Este arquivo
```

## 🚀 Como Usar

### Instalação
1. Faça o download dos arquivos ou clone o repositório
2. Coloque os 3 arquivos (index.html, styles.css, script.js) na mesma pasta
3. Abra `index.html` em seu navegador

### Configuração do WhatsApp
Para ativar a integração com WhatsApp:

1. Abra o arquivo `script.js`
2. Localize a linha com `const numeroWhatsApp = '5511999999999'`
3. Substitua pelo seu número no formato: `55` + DDD (sem o 0) + 9 + número
   - Exemplo: Para (11) 99999-9999, use: `5511999999999`

### Adicionar Novos Produtos
1. Abra `script.js`
2. Localize o array `const produtos = [`
3. Adicione um novo objeto com a estrutura:
```javascript
{
    id: 9,
    nome: "Nome do Produto",
    categoria: "velas" ou "sabonetes",
    preco: 50.00,
    descricao: "Descrição do produto",
    imagem: "🕯️" ou "🧼"
}
```

## 🎯 Funcionalidades Detalhadas

### Carrinho de Compras
- **Adicionar**: Clique em "Ver Detalhes" do produto → "Adicionar ao Carrinho"
- **Modificar Quantidade**: Use os botões +/− no carrinho
- **Remover**: Clique em "Remover"
- **Limpar Tudo**: Clique em "Limpar Carrinho"

### Personalização
1. Preencha o formulário de personalização
2. Veja a pré-visualização do sabonete em tempo real
3. Clique em "Adicionar ao Carrinho"
4. O item personalizado aparecerá com todos os detalhes no carrinho

### Finalizar Compra
1. Revise os itens do seu carrinho
2. Verifique o total (subtotal + frete)
3. Clique em "Finalizar Pedido no WhatsApp"
4. Você será redirecionado para iniciar uma conversa no WhatsApp

## 🎨 Paleta de Cores

- **Primária**: #d4639f (Rosa)
- **Secundária**: #8b4789 (Roxo)
- **Terciária**: #f5e6d3 (Bege)
- **Sucesso**: #27ae60 (Verde)
- **Perigo**: #e74c3c (Vermelho)
- **Fundo**: #f9f7f4 (Bege claro)
- **Branco**: #ffffff

## 📊 Preços Predefinidos

### Velas Aromáticas
- Lavanda: R$ 45,00
- Rosas Vermelhas: R$ 50,00
- Baunilha: R$ 42,00
- Cítrico: R$ 40,00

### Sabonetes Prontos
- Natural Premium: R$ 25,00
- Glicerina Hidratante: R$ 30,00
- Esfoliante: R$ 28,00
- Antipulgas Pet: R$ 35,00

### Personalização de Sabonetes
**Bases:**
- Natural: R$ 25,00
- Glicerina: R$ 30,00
- Premium: R$ 40,00

**Esponjas (adicionais):**
- Konjac: +R$ 15,00
- Luffa Natural: +R$ 12,00
- Bamboo: +R$ 10,00
- Sem Esponja: Grátis

### Frete
- Frete padrão: R$ 15,00
- Frete grátis: Acima de R$ 100,00 de compra

## 💻 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com variáveis CSS, Grid, Flexbox
- **JavaScript Vanilla**: Sem dependências, código puro
- **Font Awesome**: Ícones bonitos
- **LocalStorage API**: Persistência de dados

## 🔐 Segurança e Performance

- Nenhuma dependência externa (exceto Font Awesome para ícones)
- Código otimizado e minimalista
- Dados salvos localmente no navegador
- Sem comunicação com servidor (totalmente client-side)
- Rápido carregamento

## 📱 Compatibilidade

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ iOS Safari
- ✅ Chrome Mobile
- ✅ Firefox Mobile

## 🎓 Aprendizados e Recursos

Este projeto utiliza conceitos modernos de desenvolvimento web:
- Manipulação do DOM com JavaScript
- Eventos e listeners
- LocalStorage para persistência
- CSS Grid e Flexbox
- Media Queries responsivas
- Integração com APIs externas (WhatsApp)

## 📝 Notas Importantes

1. **WhatsApp**: Certifique-se de atualizar o número do WhatsApp no código
2. **Produtos**: Você pode adicionar quantos produtos quiser
3. **Preços**: Todos os preços são facilmente editáveis no código
4. **Cores**: Você pode personalizar a paleta de cores no CSS (variáveis CSS)
5. **Imagens**: Os produtos usam emojis, mas você pode substituir por URLs de imagens

## 🤝 Contribuições

Sinta-se livre para:
- Adicionar novos recursos
- Melhorar o design
- Corrigir bugs
- Otimizar o código

## 📄 Licença

Este projeto é de código aberto e livre para uso pessoal e comercial.

## ✉️ Suporte

Para dúvidas ou sugestões, entre em contato através do WhatsApp integrado no site!

---

**Desenvolvido com ❤️ para New Aromas**

Versão: 1.0.0  
Data: 2024
