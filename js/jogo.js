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
        direcao: 'direita', // Personagem que está a esquerda, inicialmente começa olhando para a direita
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
        direcao: 'esquerda', // Personagem que está a direita, inicialmente começa olhando para a esquerda
        pulando: false // Usado para verificar se o jogador 2 não já está pulando
    }
})

// O estado é mutável
// Aqui setamos nosso estado inicial, mandamos como parâmetro
// os dois personagens escolhidos, e então temos o estado inicial
// da aplicação 
let estado = estadoInicial(p1, p2)

// Audio do temporizador

// Construção para temporizador antes da luta
const temporizador = document.querySelector('.temporizador')

// Essa função só vai ser chamada ao fim do temporizador,
// possibilitando ao usuário se movimentar.
const adicionarEventListeners = () => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
};

// Com o passar do tempo, o paragrafo de classe '.temporizador'
// muda seu innerText, dando feedback visual do tempo pro usuário.
setTimeout( () => {
    temporizador.innerText = '2'
}, 1000)

setTimeout( () => {
    temporizador.innerText = '1'
}, 2000)

// Aqui o temporizador acaba e os eventListeners são acionados
setTimeout( () => {
    temporizador.innerText = 'LUTEM'
    adicionarEventListeners();
}, 3000)

// Após isso, tem uma animação até a string 'LUTEM' sair da tela
setTimeout( () => {
    temporizador.innerText = ''
}, 3300)

setTimeout( () => {
    temporizador.innerText = 'LUTEM'
}, 3600)

setTimeout( () => {
    temporizador.innerText = ''
}, 3900)

setTimeout( () => {
    temporizador.innerText = 'LUTEM'
}, 4200)

setTimeout( () => {
    temporizador.innerText = ''
}, 4500)

const vidaMaximaP1 = estado.player1.vida
const vidaMaximaP2 = estado.player2.vida

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
            direcao: direcao,
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
        // Se o lado esquerdo do jogador1 estiver a esquerda do lado direito jogador2, e o lado direito do jogador1
        // estiver do lado direito da esquerda do jogador2, então houve sobreposição horizontal 
        player1.x < player2.x + larguraPersonagemP2 &&
        player1.x + larguraPersonagemP1 > player2.x &&

        // Aqui, pro eixo y, se o topo do jogador1, estiver acima do fundo do jogador2, e o 
        // o fundo do jogador1 estiver abaixo do topo do jogador2, há sobreposição horizontal
        player1.y < player2.y + alturaPersonagemP2 &&
        player1.y + alturaPersonagemP1 > player2.y
    );

    // Se todas as condições forem cumpridas, ele retorna true, caso mesmo que uma não seja cumprida (visto o operador &&) ele retorna falso
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

// Função de ataque, é válida para ambos os players, diz respeito ao ataque básico que todo personagem tem, isso retorna um novo estado, com o a vida
// daquele que sofreu o ataque atualizada
const atacar = (estado, jogador) => {
    const direcao = estado[jogador].direcao; // Aqui identificamos a direção que o personagem está olhando para realizar o ataque
    const oponente = jogador === "player1" ? "player2" : "player1"; // Identificamos quem é o oponente que sofrerá o ataque
    const distanciaDeAtaque = 200; // Definimos a distância do ataque básico

    // Aqui, há uma verificação se o oponente está na direção do ataque, se ele estiver na 
    // direção correta do ataque, o bloco dentro do if pode ser executado
    if ((direcao === "direita" && estado[jogador].x <= estado[oponente].x) ||
        (direcao === "esquerda" && estado[jogador].x >= estado[oponente].x)) {

        const distanciaAtual = Math.abs(estado[jogador].x - estado[oponente].x); // Calcula a distância no eixo x (horizontal) entre o jogador e seu oponente (retorna em módulo)

        // Dentro desse bloco, verificamos se a distância entre os dois personagens é menor ou igual a distância de ataque
        if (distanciaAtual <= distanciaDeAtaque) {

            // Caso seja, o ataque será bem-sucedido, e o oponente sofrerá dano

            // Definimos o dano base de cada ataque
            const dano = 10;

            // Chama a função atualizar a barra HP para atualizar o dano sofrido
            atualizarBarraHP()


            // Retorna um novo estado, com a sua vida alterada
            return {
                ...estado,
                [oponente]: {
                    ...estado[oponente],
                    vida: Math.max(0, estado[oponente].vida - dano) // Uso de Math.max para evitar que seja retornada uma vida negativa, ela sempre vai ser positiva, ou 0
                }
            };
        } 
    }

    return estado; // Retorna o estado sem alterações se o ataque não foi bem-sucedido
};

const atualizarBarraHP = () => {
    const barraDeVidaP1 = document.querySelector(".player1-health");
    const barraDeVidaP2 = document.querySelector(".player2-health");

    // Calcula o percentual de vida restante de cada jogador
    const percentualVidaP1 = (estado.player1.vida / vidaMaximaP1) * 100;
    const percentualVidaP2 = (estado.player2.vida / vidaMaximaP2) * 100;

    // Atualiza o width da barra de vida do jogador 1 e 2 com o percentual calculado
    barraDeVidaP1.style.width = `${percentualVidaP1}%`;
    barraDeVidaP2.style.width = `${percentualVidaP2}%`;
    verificarVitoria()
}


// Aqui adicionamos um escutador de eventos, para que sempre que uma tecla seja apertada, um evento seja
// acionado, alterando o estado, de maneiras diferentes dependendo da tecla apertada, variando o valor
// do vx da função mover por exemplo, e o personagem que se movimenta 
const handleKeyDown =  (e) => {
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

    // Teclas de ataque do player 1 

    if (e.key === "q") {
        estado = atacar(estado, "player1")
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

    // Teclas de ataque do player 2

    if (e.key === "Shift") {
        estado = atacar(estado, "player2")
    }

    
}

// Aqui, verificamos se o jogador soltou a tecla, para então definirmos sua velocidade para 0, caso contrário,
// o personagem ficaria andando infinitamente para um dos lados, pois o vx continuaria sendo somado a posição
// do x

// Detalhe: Isso acaba causando um pequeno atraso ao mudar de posições, mas é o único jeito que encontramos
// usando apenas o estado
const handleKeyUp =  (e) => {
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
}

const verificarVitoria = () => {
    const barraDeVidaP1 = document.querySelector(".player1-health")
    const barraDeVidaP2 = document.querySelector(".player2-health")

    if (barraDeVidaP1.style.width === `0%`) {
        window.location.href = `vitoria.html?ganhador=${p2}&perdedor=${p1}`;
    }

    if (barraDeVidaP2.style.width === `0%`) {
        window.location.href = `vitoria.html?ganhador=${p1}&perdedor=${p2}`;
    }
}

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
}

// Aqui iniciamos o loopDeJogo, e o requestAnimationFrame o mantém acontecendo.
loopDeJogo()