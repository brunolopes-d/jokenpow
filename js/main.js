const botaoIniciar = document.querySelector(".start-button")
const telaInicial = document.querySelector(".telainicial")
const telaSelecaoPersonagem = document.querySelector(".selecaopersonagens")
const audio = document.querySelector("#audio")

// Mudar para tela de seleção de personagem, quando 
// o botaoIniciar for clicado

botaoIniciar.addEventListener('click', () => {
    telaInicial.classList.add('hidden')
    telaSelecaoPersonagem.classList.remove('hidden')
    // Renderizar a nova tela com personagem do indice inicial (pedra)
    render(estado)
})

document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio("/assets/music/Under Fire.mp3")
    audio.play()
    audio.loop = true;
})

// Criação de um estado inicial para a aplicação, a cada interação
// com a tela de seleção de personagens, um novo estado é criado, 
// e é então renderizado na tela

const estadoInicial = () => ({
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
});


// O estado é mutável
let estado = estadoInicial();

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
    switch (evento.key) {
        case "w":
            return { ...estado, jogador1: selecionarPersonagem(estado.jogador1, -1) };
        case "s":
            return { ...estado, jogador1: selecionarPersonagem(estado.jogador1, 1) };
        case "ArrowUp":
            return { ...estado, jogador2: selecionarPersonagem(estado.jogador2, -1) };
        case "ArrowDown":
            return { ...estado, jogador2: selecionarPersonagem(estado.jogador2, 1) };
        default:
            return estado; // Retorna o estado original caso nenhuma tecla relevante seja pressionada
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
    const quadradoPedra = document.querySelector(".pedra")
    const quadradoPapel = document.querySelector(".papel")
    const quadradoTesoura = document.querySelector(".tesoura")

    // Para o Jogador 1
    switch(personagemJogador1) {
        case "Pedra":
            espacoPersonagem1.src = `./assets/images/personagens/Pedra.png`
            if (quadradoPedra) quadradoPedra.classList.add('escurecendo')
            if (quadradoPapel) quadradoPapel.classList.remove("escurecendo")
            if (quadradoTesoura) quadradoTesoura.classList.remove('escurecendo')
            break

        case "Papel": 
            espacoPersonagem1.src = `./assets/images/personagens/Papel.png`

            if (quadradoPapel) quadradoPapel.classList.add('escurecendo')
            if (quadradoPedra) quadradoPedra.classList.remove('escurecendo')
            if (quadradoTesoura) quadradoTesoura.classList.remove('escurecendo')
            break

        case "Tesoura": 
            espacoPersonagem1.src = `./assets/images/personagens/Tesoura.png`

            if (quadradoTesoura) quadradoTesoura.classList.add('escurecendo')
            if (quadradoPedra) quadradoPedra.classList.remove('escurecendo')
            if (quadradoPapel) quadradoPapel.classList.remove('escurecendo')
            break
    }

    // Para o Jogador 2
    switch(personagemJogador2) {
        case "Pedra":
            espacoPersonagem2.src = `./assets/images/personagens/Pedra.png`

            if (quadradoPedra) quadradoPedra.classList.add('p2select')
            if (quadradoTesoura) quadradoTesoura.classList.remove("p2select")
            if (quadradoPapel) quadradoPapel.classList.remove('p2select')

            if (quadradoPedra) quadradoPedra.classList.add('escurecendoP2')
            if (quadradoTesoura) quadradoTesoura.classList.remove("escurecendoP2")
            if (quadradoPapel) quadradoPapel.classList.remove('escurecendoP2')
            break
        case "Papel": 
            espacoPersonagem2.src = `./assets/images/personagens/Papel.png`

            if (quadradoPapel) quadradoPapel.classList.add('p2select')
            if (quadradoPedra) quadradoPedra.classList.remove('p2select')
            if (quadradoTesoura) quadradoTesoura.classList.remove('p2select')

            if (quadradoPapel) quadradoPapel.classList.add('escurecendoP2')
            if (quadradoPedra) quadradoPedra.classList.remove('escurecendoP2')
            if (quadradoTesoura) quadradoTesoura.classList.remove('escurecendoP2')
            break
        case "Tesoura": 
            espacoPersonagem2.src = `./assets/images/personagens/Tesoura.png`

            if (quadradoTesoura) quadradoTesoura.classList.add('p2select')
            if (quadradoPedra) quadradoPedra.classList.remove('p2select')
            if (quadradoPapel) quadradoPapel.classList.remove('p2select')

            if (quadradoTesoura) quadradoTesoura.classList.add('escurecendoP2')
            if (quadradoPedra) quadradoPedra.classList.remove('escurecendoP2')
            if (quadradoPapel) quadradoPapel.classList.remove('escurecendoP2') 
            break
    }

    // Checa se os dois jogadores estão no mesmo personagem, se estiverem no mesmo
    // personagem, ele troca a cor do quadrado pra roxo (azul + vermelho)

    if (estado.jogador1.indiceAtual === estado.jogador2.indiceAtual) {
        if (personagemJogador1 === "Pedra") {
            quadradoPedra.classList.add('escurecendoBoth')
            quadradoPedra.classList.remove('escurecendo')
            quadradoPedra.classList.remove('p2select')
        } else if (personagemJogador1 === "Papel") {
            quadradoPapel.classList.add('escurecendoBoth')
            quadradoPapel.classList.remove('escurecendo')
            quadradoPapel.classList.remove('p2select')
        } else if (personagemJogador1 === "Tesoura") {
            quadradoTesoura.classList.add('escurecendoBoth')
            quadradoTesoura.classList.remove('escurecendo')
            quadradoTesoura.classList.remove('p2select')
        }
    } else {
        quadradoPedra.classList.remove('escurecendoBoth')
        quadradoPapel.classList.remove('escurecendoBoth')
        quadradoTesoura.classList.remove('escurecendoBoth')
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
    // Redireciona para a página arena.html, com os personagens escolhidos no formato de query params.
    const personagemJogador1 = estado.jogador1.personagens[estado.jogador1.indiceAtual]
    const personagemJogador2 = estado.jogador2.personagens[estado.jogador2.indiceAtual]
        
    window.location.href = `arena.html?personagem1=${personagemJogador1}&personagem2=${personagemJogador2}`;
}

