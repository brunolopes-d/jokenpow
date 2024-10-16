// Pegar os parâmetros dos personagens na URL
const params = new URLSearchParams(window.location.search);
const p1 = params.get("personagem1");
const p2 = params.get("personagem2");

// Pegar os elementos dos personagens
const htmlPersonagemP1 = document.querySelector('.personagemP1');
const htmlPersonagemP2 = document.querySelector('.personagemP2');

// Definir os nomes dos personagens
const nomeP1 = document.querySelector('.personagemNomeP1');
const nomeP2 = document.querySelector('.personagemNomeP2');

nomeP1.innerText = p1;
nomeP2.innerText = p2;

// Mudar o src das imagens para os personagens escolhidos
htmlPersonagemP1.setAttribute('src', `assets/images/personagens/${p1}.png`);
htmlPersonagemP2.setAttribute('src', `assets/images/personagens/${p2}.png`);

// Objeto para armazenar o estado das teclas
const teclasPressionadas = {};

// Adicionar eventos de keydown e keyup
document.addEventListener('keydown', (evento) => {
    teclasPressionadas[evento.key] = true;
});

document.addEventListener('keyup', (evento) => {
    teclasPressionadas[evento.key] = false;
});

// Função de movimento contínuo (loop)
const atualizarMovimentos = () => {
    // Movimentos do personagem 1
    if (teclasPressionadas["w"]) {
        movimentosP1('pular');
    }
    if (teclasPressionadas["a"]) {
        movimentosP1('esquerda');
    }
    if (teclasPressionadas["d"]) {
        movimentosP1('direita');
    }

    // Movimentos do personagem 2
    if (teclasPressionadas["ArrowUp"]) {
        movimentosP2('pular');
    }
    if (teclasPressionadas["ArrowLeft"]) {
        movimentosP2('esquerda');
    }
    if (teclasPressionadas["ArrowRight"]) {
        movimentosP2('direita');
    }

    // Chamar o próximo frame
    requestAnimationFrame(atualizarMovimentos);
};

// Inicializar o loop de movimento
atualizarMovimentos();

// Funções de movimento
const movimentosP1 = (direcao) => {
    switch(direcao) {
        case 'pular': 
            pular(htmlPersonagemP1);
            break;
        case 'esquerda':
            moverParaEsquerda(htmlPersonagemP1);
            break;
        case 'direita':
            moverParaDireita(htmlPersonagemP1);
            break;
    }
};

const movimentosP2 = (direcao) => {
    switch(direcao) {
        case 'pular':
            pular(htmlPersonagemP2);
            break;
        case 'esquerda':
            moverParaEsquerda(htmlPersonagemP2);
            break;
        case 'direita':
            moverParaDireita(htmlPersonagemP2);
            break;
    }
};

const pular = (htmlPersonagem) => {
    htmlPersonagem.classList.add('pular');
    htmlPersonagem.addEventListener('animationend', () => {
        htmlPersonagem.classList.remove('pular');
    });
};

const moverParaEsquerda = (htmlPersonagem) => {
    const posicaoAtual = parseInt(getComputedStyle(htmlPersonagem).left) || 0;
    htmlPersonagem.style.left = `${posicaoAtual - 3}px`;
};

const moverParaDireita = (htmlPersonagem) => {
    const posicaoAtual = parseInt(getComputedStyle(htmlPersonagem).left) || 0;
    htmlPersonagem.style.left = `${posicaoAtual + 3}px`;
};
