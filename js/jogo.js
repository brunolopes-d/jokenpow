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

// Definir posições iniciais
const posP1 = { x: 100, y: 400 }; // Posições iniciais de P1 (10rem, 40rem)
const posP2 = { x: window.innerWidth - 100 - 70, y: 400 }; // Posições iniciais de P2 (ajustando para a largura da imagem)

// Tamanho máximo da arena (ajuste conforme necessário)
const arenaWidth = window.innerWidth;
const arenaHeight = window.innerHeight;

// Função para garantir que o personagem não saia da arena
const limitarPosicao = (pos) => {
    if (pos.x < 0) pos.x = 0; // Limite esquerdo
    if (pos.x > arenaWidth - 70) pos.x = arenaWidth - 70; // Limite direito (considerando a largura da imagem)
    if (pos.y < 0) pos.y = 0; // Limite superior
    if (pos.y > arenaHeight - 70) pos.y = arenaHeight - 70; // Limite inferior (considerando a altura da imagem)
};

// Função para atualizar a posição dos personagens
const atualizarPosicoes = () => {
    limitarPosicao(posP1);
    limitarPosicao(posP2);

    htmlPersonagemP1.style.left = `${posP1.x}px`;
    htmlPersonagemP1.style.top = `${posP1.y}px`;

    htmlPersonagemP2.style.left = `${posP2.x}px`;
    htmlPersonagemP2.style.top = `${posP2.y}px`;
};

// Inicializar as posições ao carregar a página
atualizarPosicoes();

// Variáveis de controle de movimento
const movimento = {
    p1: { cima: false, baixo: false, esquerda: false, direita: false, pulando: false },
    p2: { cima: false, baixo: false, esquerda: false, direita: false, pulando: false }
};

// Variáveis para pulo
const alturaPulo = 150; // Altura do pulo em pixels
const duracaoPulo = 350; // Duração do pulo em milissegundos
const puloTimeout = () => {
    setTimeout(() => {
        posP1.y += alturaPulo; // Retorna à posição original do P1
        movimento.p1.pulando = false; // Permite novos pulos para P1
    }, duracaoPulo);
};
const puloTimeout2 = () => {
    setTimeout(() => {
        posP2.y += alturaPulo; // Retorna à posição original do P2
        movimento.p2.pulando = false; // Permite novos pulos para P2
    }, duracaoPulo);
};

// Atualizar as variáveis de movimento quando uma tecla é pressionada
document.addEventListener('keydown', (event) => {
    // Player 1 (W, A, S, D)
    if (event.key === 'w' && !movimento.p1.pulando) {
        movimento.p1.pulando = true;
        posP1.y -= alturaPulo; // Realiza o pulo
        puloTimeout();
    }
    if (event.key === 's') movimento.p1.baixo = true;
    if (event.key === 'a') movimento.p1.esquerda = true;
    if (event.key === 'd') movimento.p1.direita = true;

    // Player 2 (Setas)
    if (event.key === 'ArrowUp' && !movimento.p2.pulando) {
        movimento.p2.pulando = true;
        posP2.y -= alturaPulo; // Realiza o pulo
        puloTimeout2();
    }
    if (event.key === 'ArrowDown') movimento.p2.baixo = true;
    if (event.key === 'ArrowLeft') movimento.p2.esquerda = true;
    if (event.key === 'ArrowRight') movimento.p2.direita = true;
});

// Atualizar as variáveis de movimento quando uma tecla é liberada
document.addEventListener('keyup', (event) => {
    // Player 1 (W, A, S, D)
    if (event.key === 's') movimento.p1.baixo = false;
    if (event.key === 'a') movimento.p1.esquerda = false;
    if (event.key === 'd') movimento.p1.direita = false;

    // Player 2 (Setas)
    if (event.key === 'ArrowDown') movimento.p2.baixo = false;
    if (event.key === 'ArrowLeft') movimento.p2.esquerda = false;
    if (event.key === 'ArrowRight') movimento.p2.direita = false;
});

// Função para mover os personagens a cada quadro
const moverPersonagens = () => {
    const velocidade = 3; // Pixels por movimento

    // Movimento Player 1 (W, A, S, D)
    if (movimento.p1.baixo) posP1.y += velocidade; // Move para baixo
    if (movimento.p1.esquerda) posP1.x -= velocidade; // Move para a esquerda
    if (movimento.p1.direita) posP1.x += velocidade; // Move para a direita

    // Movimento Player 2 (Setas)
    if (movimento.p2.baixo) posP2.y += velocidade; // Move para baixo
    if (movimento.p2.esquerda) posP2.x -= velocidade; // Move para a esquerda
    if (movimento.p2.direita) posP2.x += velocidade; // Move para a direita

    // Atualizar a posição dos personagens
    atualizarPosicoes();

    // Repetir a função a cada quadro
    requestAnimationFrame(moverPersonagens);
};

// Iniciar o loop de movimento
moverPersonagens();
