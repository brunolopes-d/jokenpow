
const botaoIniciar = document.querySelector(".start-button")
const telaInicial = document.querySelector(".telainicial")
const telaSelecaoPersonagem = document.querySelector(".selecaopersonagens")

// Mudar para tela de seleção de personagem, quando 
// o botaoIniciar for clicado

botaoIniciar.addEventListener('click', () => {
    telaInicial.classList.add('hidden')
    telaSelecaoPersonagem.classList.remove('hidden')
    // Renderizar a nova tela com personagem do indice inicial (pedra)
    render(estado)
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
    // essa função é acionada primeiro ela verifica se a tecla apertada
    // foi space-bar ou enter, que estão relacionadas à lógica
    // de confirmação de personagens, se não for, 
    // ela passa pelos ifs, acionando então a teclasApertadas
    // que por sua vez altera o estado da aplicação
    // No final, render fica responsável por colocar na tela o personagem

    if(e.key === ' ') {
        confirmaPlayer1()
    }else if(e.key === 'Enter'){
        confirmaPlayer2()
    }

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

    // Para o Jogador 1
    switch(personagemJogador1) {
        case "Pedra":
            espacoPersonagem1.src = `./assets/images/personagens/Pedra.png`
            const quadradoPedraP1 = document.querySelector(".pedraP1")
            const quadradoPapelP1 = document.querySelector(".papelP1")
            const quadradoTesouraP1 = document.querySelector(".tesouraP1")

            if (quadradoPedraP1) quadradoPedraP1.classList.add('escurecendo')
            if (quadradoTesouraP1) quadradoTesouraP1.classList.remove("escurecendo")
            if (quadradoPapelP1) quadradoPapelP1.classList.remove('escurecendo')
            break

        case "Papel": 
            espacoPersonagem1.src = `./assets/images/personagens/Papel.png`
            const quadradoPapelP1b = document.querySelector(".papelP1")
            const quadradoPedraP1b = document.querySelector(".pedraP1")
            const quadradoTesouraP1b = document.querySelector(".tesouraP1")

            if (quadradoPapelP1b) quadradoPapelP1b.classList.add('escurecendo')
            if (quadradoPedraP1b) quadradoPedraP1b.classList.remove('escurecendo')
            if (quadradoTesouraP1b) quadradoTesouraP1b.classList.remove('escurecendo')
            break

        case "Tesoura": 
            espacoPersonagem1.src = `./assets/images/personagens/Tesoura.png`
            const quadradoTesouraP1c = document.querySelector(".tesouraP1")
            const quadradoPedraP1c = document.querySelector(".pedraP1")
            const quadradoPapelP1c = document.querySelector(".papelP1")

            if (quadradoTesouraP1c) quadradoTesouraP1c.classList.add('escurecendo')
            if (quadradoPedraP1c) quadradoPedraP1c.classList.remove('escurecendo')
            if (quadradoPapelP1c) quadradoPapelP1c.classList.remove('escurecendo')
            break
    }

    switch(personagemJogador2) {
        case "Pedra":
            espacoPersonagem2.src = `./assets/images/personagens/Pedra.png`
            const quadradoPedraP2 = document.querySelector(".pedraP2")
            const quadradoTesouraP2 = document.querySelector(".tesouraP2")
            const quadradoPapelP2 = document.querySelector(".papelP2")

            if (quadradoPedraP2) quadradoPedraP2.classList.add('escurecendo')
            if (quadradoTesouraP2) quadradoTesouraP2.classList.remove("escurecendo")
            if (quadradoPapelP2) quadradoPapelP2.classList.remove('escurecendo')
            break
        case "Papel": 
            espacoPersonagem2.src = `./assets/images/personagens/Papel.png`
            const quadradoPapelP2b = document.querySelector(".papelP2")
            const quadradoPedraP2b = document.querySelector(".pedraP2")
            const quadradoTesouraP2b = document.querySelector(".tesouraP2")

            if (quadradoPapelP2b) quadradoPapelP2b.classList.add('escurecendo')
            if (quadradoPedraP2b) quadradoPedraP2b.classList.remove('escurecendo')
            if (quadradoTesouraP2b) quadradoTesouraP2b.classList.remove('escurecendo')
            break
        case "Tesoura": 
            espacoPersonagem2.src = `./assets/images/personagens/Tesoura.png`
            const quadradoTesouraP2c = document.querySelector(".tesouraP2")
            const quadradoPedraP2c = document.querySelector(".pedraP2")
            const quadradoPapelP2c = document.querySelector(".papelP2")

            if (quadradoTesouraP2c) quadradoTesouraP2c.classList.add('escurecendo')
            if (quadradoPedraP2c) quadradoPedraP2c.classList.remove('escurecendo')
            if (quadradoPapelP2c) quadradoPapelP2c.classList.remove('escurecendo')
            break
    }
}


// Início de lógica para confirmação de personagens
const botaoConfirmaP1 = document.querySelector('.left-confirm-character')
const botaoConfirmaP2 = document.querySelector('.right-confirm-character')

const confirmaPlayer1 =  () => {
    // Muda o texto do botão
    botaoConfirmaP1.innerText === 'Pronto' ? botaoConfirmaP1.innerText = 'Cancelar' : botaoConfirmaP1.innerText = 'Pronto'
    verificaSeJogadoresEstaoProntos()
}

const confirmaPlayer2 = () => {
    // Muda o texto do botão
    botaoConfirmaP2.innerText === 'Pronto' ? botaoConfirmaP2.innerText = 'Cancelar' : botaoConfirmaP2.innerText = 'Pronto'
    verificaSeJogadoresEstaoProntos()
}

const verificaSeJogadoresEstaoProntos = () => {
    const botaoConfirmaP1 = document.querySelector('.left-confirm-character')
    const botaoConfirmaP2 = document.querySelector('.right-confirm-character')

    if(botaoConfirmaP1.innerText === 'Cancelar' && botaoConfirmaP2.innerText === 'Cancelar') renderizarArena()
}

const renderizarArena = () => {
    console.log('oi')
}
