const botaoIniciar = document.querySelector(".start-button")
const telaInicial = document.querySelector(".telainicial")
const telaSelecaoPersonagem = document.querySelector(".selecaopersonagens")

// Mudar para tela de seleção de personagem, quando 
// o startButton for clicado

botaoIniciar.addEventListener('click', () => {
    telaInicial.classList.add('hidden')
    telaSelecaoPersonagem.classList.remove('hidden')
    
})

// Criação de um estado inicial para a aplicação, a cada interação
// com a tela de seleção de personagens, um novo estado é criado, 
// e é então renderizado na tela

let estado = {
    jogador1: {
        nome: "Jogador 1",
        personagens: ["Pedra", "Papel", "Tesoura"],
        indiceAtual: 0
    },

    jogador2: {
        nome: "Jogador 2",
        personagens: ["Pedra", "Papel", "Tesoura"],
        indiceAtual: 0
    }
}

// Função responsável por criar um novo estado, com a nova posição
// dentro do range de possibilidades, ou pedra, ou papel, ou tesoura

const selecionarPersonagem = (jogador, direcao) => {
    // Cálculo para o novoIndex, somamos com a direction que será passado posteriormente
    // dependendo de arrowUp or arrowDown ou W e S, e depois, como método de
    // de restringir ao intervalo dos possíveis personagens (0, 1, 2)
    // somamos e usamos mod pra descobrir o resto inteiro pela
    // quantidade total de personagens, assim mantendo sempre dentro
    // do intervalo
    const novoIndex = ((jogador.indiceAtual + direcao + jogador.personagens.length) % jogador.personagens.length)
    return {...jogador, indiceAtual: novoIndex}
}

const teclasApertadas = (evento, estado) => {
    switch(evento.key) {
        case "w": 
        return {...estado, jogador1: selecionarPersonagem(estado.jogador1, -1)}
        case "s":
        return {...estado, jogador1: selecionarPersonagem(estado.jogador1, 1)}
        case "ArrowUp": 
        return {...estado, jogador2: selecionarPersonagem(estado.jogador2, -1)}
        case "ArrowDown":
        return {...estado, jogador2: selecionarPersonagem(estado.jogador2, 1)}
        default: 
        return estado
    }
}

document.addEventListener('keydown', (e) => {
    // Cada vez que uma tecla é afundada, isso é, "keydown", 
    // essa função é acionada, acionando então a teclasApertadas
    // que por sua vez altera o estado da aplicação
    // No final, render fica responsável por colocar na tela o personagem
    estado = teclasApertadas(e, estado)
    console.log(estado.jogador1.indiceAtual)
    console.log(estado.jogador2.indiceAtual)
    render(estado)
} )

const render = (estado) => {
    const espacoPersonagem1 = document.querySelector(".personagem1")
    const espacoPersonagem2 = document.querySelector(".personagem2")
    const personagemJogador1 = estado.jogador1.personagens[estado.jogador1.indiceAtual]
    const personagemJogador2 = estado.jogador2.personagens[estado.jogador2.indiceAtual]

    switch(personagemJogador1) {
        case "Pedra":
            espacoPersonagem1.src = `./assets/images/personagens/Pedra.png`
            break
        case "Papel": 
            espacoPersonagem1.src = `./assets/images/personagens/Papel.png`
            break
        case "Tesoura": 
            espacoPersonagem1.src = `./assets/images/personagens/Tesoura.png`
            break
    }

    switch(personagemJogador2) {
        case "Pedra":
            espacoPersonagem2.src = `./assets/images/personagens/Pedra.png`
            break
        case "Papel": 
            espacoPersonagem2.src = `./assets/images/personagens/Papel.png`
            break
        case "Tesoura": 
            espacoPersonagem2.src = `./assets/images/personagens/Tesoura.png`
            break
    }
}