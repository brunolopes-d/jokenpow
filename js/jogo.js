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

const estadoInicial = (personagem1, personagem2) => ({
    player1: {
        personagem: personagem1,
        vida: personagem1 === "Pedra" ? 200 : personagem1 == "Papel" ? 100 : personagem1 == "Tesoura" ? 150 : "Erro",
        // Operador Ternário para decidir qual a vida do personagem baseado no personagem escolhido ^
        x: -600, // Posição inicial no eixo x na arena
        y: 125, // Posição inicial no eixo y na arena (acima do chão)
        vx: 0, // Velocidade no eixo x
        vy: 0, // Velocidade no eixo y (Atrelado a mecânica de pular)
        pulando: false // Usado para verificar se o jogador 1 não já está pulando
    },

    player2: {
        personagem: personagem2,
        vida: personagem2 === "Pedra" ? 200 : personagem2 == "Papel" ? 100 : personagem2 == "Tesoura" ? 150 : "Erro",
        // Operador Ternário para decidir qual a vida do personagem baseado no personagem escolhido ^
        x: 600, // Posição inicial no eixo x na arena
        y: 125, // Posição inicial no eixo y na arena (acima do chão)
        vx: 0, // Velocidade no eixo x
        vy: 0, // Velocidade no eixo y (Atrelado a mecânica de pular)
        pulando: false // Usado para verificar se o jogador 2 não já está pulando
    }
})

// O estado é mutável
// Aqui setamos nosso estado inicial, mandamos como parâmetro
// os dois personagens escolhidos, e então temos o estado inicial
// da aplicação 
let estado = estadoInicial(p1, p2)

// Função mover trata quanto a movimentação horizontal do usuário,
// cada personagem vai ter uma movimentação diferente dependendo do 
// personagem escolhido, o que foi feito utilizando operador ternário.

// Quanto a parte técnica do que está acontecendo, definimos a velocidade
// do jogador, dependendo do personagem que ele escolheu, e da direção
// que ele tá se movimentando, isso se interliga com a o detector de eventos keydown
// que chama mover dependendo dos botões apertados pelo usuário

// Ao final, é retornado um novo estado, com a velocidade do jogador alterada.
const mover = (estado, jogador, direcao) => {
    const velocidade = estado[jogador].personagem === "Pedra" ? 3 : estado[jogador].personagem === "Papel" ? 10 : 5
    const novaVelocidade = direcao === 'esquerda' ? -velocidade : velocidade;
    return {
        ...estado, 
        [jogador]: { // Importante destacar aqui que fazemos uso Computed Property Keys, basicamente nos permite acessar de maneira dinâmica propriedades dentro de um registro
            ...estado[jogador],
            vx: novaVelocidade
        }}
}

// Função responsável por definir a nova posição horizontal do personagem dentro da tela, utilizando como já
// mencionado posteriormente Computed Property Keys pra isso, ao final dela, retorna uma nova posição de X para 
// qualquer um dos jogadores, visto a dinamicidade que só foi possível graças ao Computed Property Keys

const atualizaPos = (estado, jogador) => {
    const novoX = estado[jogador].x + estado[jogador].vx;
    
    const novoEstado = {
        ...estado,
        [jogador]: {
            ...estado[jogador],
            x: limitaPosicao(novoX)
        }
    };

    if (jogador === "player1") {
        const colidiu = verificaColisao(novoEstado.player1, novoEstado.player2);
        if (colidiu) {
            if (estado.player1.x < estado.player2.x) {
                // Player 1 à esquerda, impede o movimento para a direita
                return {
                    ...novoEstado,
                    player1: {
                        ...novoEstado.player1,
                        x: estado.player1.x // Impede de ir para a direita
                    }
                };
            } else {
                // Player 1 à direita, impede o movimento para a esquerda
                return {
                    ...novoEstado,
                    player1: {
                        ...novoEstado.player1,
                        x: estado.player1.x // Impede de ir para a esquerda
                    }
                };
            }
        }
    }

    if (jogador === "player2") {
        const colidiu = verificaColisao(novoEstado.player2, novoEstado.player1);
        if (colidiu) {
            if (estado.player2.x < estado.player1.x) {
                // Player 2 à esquerda, impede o movimento para a direita
                return {
                    ...novoEstado,
                    player2: {
                        ...novoEstado.player2,
                        x: estado.player2.x // Impede de ir para a direita
                    }
                };
            } else {
                // Player 2 à direita, impede o movimento para a esquerda
                return {
                    ...novoEstado,
                    player2: {
                        ...novoEstado.player2,
                        x: estado.player2.x // Impede de ir para a esquerda
                    }
                };
            }
        }
    }

    return novoEstado;
};

// Função responsável por verificar se dois personagens colidiram, tanto
// verticalmente como horizontalmente
const verificaColisao = (player1, player2) => {
    const larguraPersonagemP1 = htmlPersonagemP1.offsetWidth;
    const alturaPersonagemP1 = htmlPersonagemP1.offsetHeight;
    const larguraPersonagemP2 = htmlPersonagemP2.offsetWidth;
    const alturaPersonagemP2 = htmlPersonagemP2.offsetHeight;

    return (
        // Se o lado esquerdo do jogador 1 
        player1.x < player2.x + larguraPersonagemP2 &&
        player1.x + larguraPersonagemP1 > player2.x &&
        player1.y < player2.y + alturaPersonagemP2 &&
        player1.y + alturaPersonagemP1 > player2.y
    );
};

const limitaPosicao = (x) => {
    const limiteEsquerda = -850 // Limite para a borda da esquerda da arena
    const limiteDireita = 850 // Limite para a borda da direita da arena
    return Math.max(limiteEsquerda, Math.min(x, limiteDireita)); 
    // Aqui o limitaPosicao usa max e o min da própria engine do js, pra definir os valores posição do x,
    // impedindo ele de passar do -850, travando ele por conta do max, e travando ele de passar para 
    // o limite da boarda da direita por conta do min que retorna o menor valor entre eles
};

// O sistema de coordenadas no eixo y em um navegador é feito de cima pra baixo, essa é a razão pela qual
// usamos valores negativos para a velocidade no eixo y
const pular = (estado, jogador) => {
    // Só vai executar caso o jogador já não esteja pulando
    if (!estado[jogador].pulando) {
        return {
            ...estado, 
            [jogador]: {
            ...estado[jogador], // Copia todo o estado, e retorna um novo estado apenas
            vy: -15,            // com a velocidade vertical e pulando alterados.
            pulando: true
            }
        }
    }
    return estado
}

// A função aplicar gravidade simula a gravidade, a cada frame a gravidade é adicionada a uma variável
// chamada novaVy, somando até que ela chegue fique positiva novamente, quando o personagem
// chegar no chão, visto que ela vai começar a ficar positiva, levando ele pra baixo, ela é setada para zero
const aplicarGravidade = (estado, jogador) => {
    const gravidade = 0.5; // Define o quão rápido o personagem vai cair

    // Função também é responsável por calcular a nova posição do personagem no eixo y
    const novoY = estado[jogador].y + estado[jogador].vy

    const novaVy = estado[jogador].pulando ? estado[jogador].vy + gravidade : 0

    // taNoChao recebe um boleeano que diz se o novoY do jogador está ou não em uma altura maior do que a altura do chão
    const taNoChao = novoY >= 125
    const novoEstado = {
        ...estado,
        [jogador]: {
            ...estado[jogador],
            // Se ele estiver no chão, sua posição no eixo y é 125, se ele não estiver no chão, sua posição é o novo Y
            y: taNoChao ? 125 : novoY,
            // Se ele estiver no chão, sua velocidade no eixo y é igual a 0, ou seja, ele não tem velocidade para cima
            // que seria a ação de pular, caso contrário, atualiza para sua nova velocidade y
            vy: taNoChao ? 0 : novaVy,
            pulando: taNoChao ? false : estado[jogador].pulando // Diz se o personagem está ou não pulando no momento
        }
    }

    const jogadorAtual = novoEstado[jogador]; // Pega o jogador atual que está se realizando a ação de pular
    const outroJogador = jogador === "player1" ? estado.player2 : estado.player1; // Pega o outro jogador que não é o atual

    // Verifica colisão entre os jogadores, o jogador atual e o outro jogador, chamando a função verifica colisão com os dois jogadores
    const colidiu = verificaColisao(jogadorAtual, outroJogador);

    if (colidiu) {
       // Se o jogador colidiu, visto que colidiu é um booleano, ele vai executar esse bloco
        if (jogadorAtual.y < outroJogador.y) {
            // Aqui, vai haver uma verificação se o jogador atual está em cima do outro jogador, 
            // importante lembrar que o quanto menor o y, mais em cima o jogador está, por isso <
            return {
                ...novoEstado,
                [jogador]: {
                    ...novoEstado[jogador],
                    y: estado[jogador].y, // Mantém a última posição de y registrada, ou seja, acima do jogador
                    vy: Math.min(0, estado[jogador].vy)  // Usa Math.min para possibilitar pulos quando o jogador está acima de
                                                        // outro, mas impede a descida, visto que o maior valor possível vai ser 0
                }
            };
        } else {
            // Se o jogador atual está abaixo, ele não pode subir mais
            return {
                ...novoEstado,
                [jogador]: {
                    ...novoEstado[jogador],
                    y: estado[jogador].y, // Mantém a posição Y anterior
                    vy: Math.max(0, estado[jogador].vy)  // Impede que o jogador consiga atravessar de baixo para cima o  outro jogador,
                                                         // retornando sempre valores que sejam positivos por conta do Math.max
                }
            };
        }
    }

    return novoEstado; // Retorna o novo estado caso não tenha acontecido uma colisão
};


// Aqui adicionamos um escutador de eventos, para que sempre que uma tecla seja apertada, um evento seja
// acionado, alterando o estado, de maneiras diferentes dependendo da tecla apertada, variando o valor
// do vx da função mover por exemplo, e o personagem que se movimenta 
document.addEventListener('keydown', (e) => {
    // Comandos para o player 1

    if (e.key === "a") {
        estado = mover(estado, "player1", "esquerda")
    }

    if (e.key === "d") {
        estado = mover(estado, 'player1', "direita")
    }

    if (e.key === "w") {
        estado = pular(estado, 'player1')
    }

    // Comandos para o player 2

    if (e.key === "ArrowLeft") {
        estado = mover(estado, "player2", "esquerda")
    }

    if (e.key === "ArrowRight") {
        estado = mover(estado, "player2", "direita")
    }

    if (e.key === "ArrowUp") {
        estado = pular(estado, "player2")
    }
    
})

// Aqui, verificamos se o jogador soltou a tecla, para então definirmos sua velocidade para 0, caso contrário,
// o personagem ficaria andando infinitamente para um dos lados, pois o vx continuaria sendo somado a posição
// do x

// Detalhe: Isso acaba causando um pequeno atraso ao mudar de posições, mas é o único jeito que encontramos
// usando apenas o estado
document.addEventListener("keyup", (e) => {
    if (e.key === "a" || e.key === "d") {
        estado = {...estado, player1: {
            ...estado.player1,
            vx: 0
        }}
    }

    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        estado = {...estado, player2: {
            ...estado.player2,
            vx: 0
        }}
    }
})

// Loop de jogo, a parte mais importante da aplicação, usando o requestAnimationFrame, tudo que estiver
// aqui dentro vai ser executado a pelo menos 60fps, o que possibilita que toda a questão de animações
// seja realizada de maneira fluída, facilitando a realização da renderização dos movimentos de fato,
// recebendo o novo estado com atualização de posição realizada, e posteriormente realizando o transform
// para que o usuário consiga saber o que aconteceu
const loopDeJogo = () => {
    // Recebe o novo estado tanto do jogador1, como do jogador2, a cada repintura da tela com requestAnimationFrame
    estado = atualizaPos(estado, 'player1')
    estado = atualizaPos(estado, 'player2')
    estado = aplicarGravidade(estado, 'player1')
    estado = aplicarGravidade(estado, 'player2')

    // Translada o jogador 1 dentro da arena, dependendo do eixo x que foi definido e atualizado no estado
    if (htmlPersonagemP1) {
        htmlPersonagemP1.style.transform = `translate(${estado.player1.x}px, ${estado.player1.y}px)`
    }

    // Translada o jogador 2 dentro da arena, dependendo do eixo x que foi definido e atualizado no estado
    if (htmlPersonagemP2) {
        htmlPersonagemP2.style.transform = `translate(${estado.player2.x}px, ${estado.player2.y}px)`
    }
    // Aqui o requestAnimationFrame, chama de novo a função loopDeJogo, a executando assim que o navegador
    // tiver a próxima oortunidade, ou seja, na proxima atualização de frame
    requestAnimationFrame(loopDeJogo)
    console.log(estado)
}

// Aqui iniciamos o loopDeJogo, e o requestAnimationFrame o mantém acontecendo.
loopDeJogo()