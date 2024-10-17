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
    },

    player2: {
        personagem: personagem2,
        vida: personagem2 === "Pedra" ? 200 : personagem2 == "Papel" ? 100 : personagem2 == "Tesoura" ? 150 : "Erro",
        // Operador Ternário para decidir qual a vida do personagem baseado no personagem escolhido ^
        x: 600, // Posição inicial no eixo x na arena
        y: 125, // Posição inicial no eixo y na arena (acima do chão)
        vx: 0, // Velocidade no eixo x
        vy: 0, // Velocidade no eixo y (Atrelado a mecânica de pular)
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

// Função responsável por definir a nova posição do personagem dentro da tela, utilizando como já
// mencionado posteriormente Computed Property Keys pra isso, ao final dela, retorna uma nova posição de X para 
// qualquer um dos jogadores, visto a dinamicidade que só foi possível graças ao Computed Property Keys

const atualizaPos = (estado, jogador) => {
    const novoX = estado[jogador].x + estado[jogador].vx

    return {
        ...estado,
        [jogador]: {
            ...estado[jogador],
            x: novoX
        }
    }
}

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

    // Comandos para o player 2

    if (e.key === "ArrowLeft") {
        estado = mover(estado, "player2", "esquerda")
    }
    if (e.key === "ArrowRight") {
        estado = mover(estado, "player2", "direita")
    }
    
})

// Aqui, verificamos se o jogador soltou a tecla, para então definirmos sua velocidade para 0, caso contrário,
// o personagem ficaria andando infinitamente para um dos lados, pois o vx continuaria sendo somado a posição
// do x
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
// para que o usuário consiga saber o que acontecei
const loopDeJogo = () => {
    // Recebe o novo estado tanto do jogador1, como do jogador2, a cada repintura da tela com requestAnimationFrame
    estado = atualizaPos(estado, 'player1')
    estado = atualizaPos(estado, 'player2')

    if (htmlPersonagemP1) {
        htmlPersonagemP1.style.transform = `translate(${estado.player1.x}px, ${estado.player1.y}px)`
    }

    if (htmlPersonagemP2) {
        htmlPersonagemP2.style.transform = `translate(${estado.player2.x}px, ${estado.player2.y}px)`
    }
    // Aqui o requestAnimationFrame, chama de novo a função loopDeJogo, a executando assim que o navegador
    // tiver a próxima oortunidade, ou seja, na proxima atualização de frame
    requestAnimationFrame(loopDeJogo)
}

// Aqui iniciamos o loopDeJogo, e o requestAnimationFrame o mantém acontecendo.
loopDeJogo()
