const botaoIniciar = document.querySelector(".start-button")
const botaoMusicaAtivar = document.querySelector(".ativarMusica")
const botaoMusicaDesativar = document.querySelector(".desativarMusica")
const telaInicial = document.querySelector(".telainicial")
const telaSelecaoPersonagem = document.querySelector(".selecaopersonagens")
const audio = document.querySelector("#audio")

// Definição dos atributos dos personagens
const pedraAtributos = [0, 0, 0, 0, 0, 1, 1, 2, 2, 2]
const papelAtributos = [0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2]
const tesouraAtributos = [0, 0, 0, 1, 1, 1, 2, 2, 2]

const estrelaVermelha = document.createElement('img').setAttribute('src', `/assets/images/EstrelaVermelha.png`)
const estrelaAzul = document.createElement('img').setAttribute('src', `/assets/images/EstrelaAzul.png`)

// Mudar para tela de seleção de personagem, quando 
// o botaoIniciar for clicado

botaoIniciar.addEventListener('click', () => {
    telaInicial.classList.add('hidden')
    telaSelecaoPersonagem.classList.remove('hidden')
    // Renderizar a nova tela com personagem do indice inicial (pedra)
    render(estado)
})

// Botão de ativar a música
botaoMusicaAtivar.addEventListener('click', () => {
    audio.play()
})

// Botão de desativar a música
botaoMusicaDesativar.addEventListener('click', () => {
    audio.pause()
})



// Abrir dialog quando o botão "instruções for clicado"
const botaoInstrucoes = document.querySelector('.instrucoes')
const dialog = document.querySelector('.instrucoes-modal')

botaoInstrucoes.addEventListener('click', () =>  {
    dialog.showModal()
})

if(dialog){
    const closeModalButton = document.querySelector('.fechar-modal')
    closeModalButton.addEventListener('click', () => {
        dialog.close()
    })
}

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
    const key = evento.key.toLowerCase(); // Converte a tecla pressionada para minúscula
    switch (key) {
        case "w":
            return { ...estado, jogador1: selecionarPersonagem(estado.jogador1, -1) };
        case "s":
            return { ...estado, jogador1: selecionarPersonagem(estado.jogador1, 1) };
        case "i":
            return { ...estado, jogador2: selecionarPersonagem(estado.jogador2, -1) };
        case "k":
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
})

const render = (estado) => {
    const espacoPersonagem1 = document.querySelector(".personagem1")
    const espacoPersonagem2 = document.querySelector(".personagem2")
    const personagemJogador1 = estado.jogador1.personagens[estado.jogador1.indiceAtual]
    const personagemJogador2 = estado.jogador2.personagens[estado.jogador2.indiceAtual]
    const quadradoPedra = document.querySelector(".pedra")
    const quadradoPapel = document.querySelector(".papel")
    const quadradoTesoura = document.querySelector(".tesoura")

    const resistenciaP1 = document.querySelector(".resistenciaP1")
    const velocidadeP1 = document.querySelector(".velocidadeP1")
    const letalidadeP1 = document.querySelector(".letalidadeP1")

    const resistenciaP2 = document.querySelector(".resistenciaP2")
    const velocidadeP2 = document.querySelector(".velocidadeP2")
    const letalidadeP2 = document.querySelector(".letalidadeP2")

    // Para o Jogador 1
    switch(personagemJogador1) {
        case "Pedra":
            espacoPersonagem1.src = `./assets/images/personagens/Pedra.png`
            if (quadradoPedra) quadradoPedra.classList.add('bordaVermelha')
            if (quadradoPapel) quadradoPapel.classList.remove("bordaVermelha")
            if (quadradoTesoura) quadradoTesoura.classList.remove('bordaVermelha')
            
            // Antes de realizar o map, limpa os outros, para evitar uma acúmulo de estrelas
            resistenciaP1.innerHTML = ''
            velocidadeP1.innerHTML = ''
            letalidadeP1.innerHTML = ''

            // Os atributos dos personagens foram definidos anteriormente, com 0
            // para resistência, 1 para velocidade, e 2 para letalidade
            // Aqui, fazemos um map nos atributos, em que a cada vez que 
            // encontrar um numero, 0, 1, ou 2, vai adicionar estrelas
            // indicando a proeficiência do personagem naquele aspecto

            // Isso foi feito para que no caso de futuros balanceamentos, não seja preciso
            // recriar todo o layout
            pedraAtributos.map((valor) => {
                if (valor === 0) {
                    const novaEstrela = document.createElement('img');
                    novaEstrela.src = './assets/images/EstrelaVermelha.png';
                    resistenciaP1.appendChild(novaEstrela);
                }
            });
            
            pedraAtributos.map((valor) => {
                if (valor === 1) {
                    const novaEstrela = document.createElement('img');
                    novaEstrela.src = './assets/images/EstrelaVermelha.png';
                    velocidadeP1.appendChild(novaEstrela);
                }
            });
            
            pedraAtributos.map((valor) => {
                if (valor === 2) {
                    const novaEstrela = document.createElement('img');
                    novaEstrela.src = './assets/images/EstrelaVermelha.png';
                    letalidadeP1.appendChild(novaEstrela);
                }
            });

            break

        case "Papel": 
            espacoPersonagem1.src = `./assets/images/personagens/Papel.png`

            if (quadradoPapel) quadradoPapel.classList.add('bordaVermelha')
            if (quadradoPedra) quadradoPedra.classList.remove('bordaVermelha')
            if (quadradoTesoura) quadradoTesoura.classList.remove('bordaVermelha')

            resistenciaP1.innerHTML = ''
            velocidadeP1.innerHTML = ''
            letalidadeP1.innerHTML = ''

            papelAtributos.map((valor) => {
                if (valor === 0) {
                    const novaEstrela = document.createElement('img');
                    novaEstrela.src = './assets/images/EstrelaVermelha.png';
                    resistenciaP1.appendChild(novaEstrela);
                }
            });
            
            papelAtributos.map((valor) => {
                if (valor === 1) {
                    const novaEstrela = document.createElement('img');
                    novaEstrela.src = './assets/images/EstrelaVermelha.png';
                    velocidadeP1.appendChild(novaEstrela);
                }
            });
            
            papelAtributos.map((valor) => {
                if (valor === 2) {
                    const novaEstrela = document.createElement('img');
                    novaEstrela.src = './assets/images/EstrelaVermelha.png';
                    letalidadeP1.appendChild(novaEstrela);
                }
            });
            break

        case "Tesoura": 
            espacoPersonagem1.src = `./assets/images/personagens/Tesoura.png`

            if (quadradoTesoura) quadradoTesoura.classList.add('bordaVermelha')
            if (quadradoPedra) quadradoPedra.classList.remove('bordaVermelha')
            if (quadradoPapel) quadradoPapel.classList.remove('bordaVermelha')
            resistenciaP1.innerHTML = ''
            velocidadeP1.innerHTML = ''
            letalidadeP1.innerHTML = ''

            tesouraAtributos.map((valor) => {
                if (valor === 0) {
                    const novaEstrela = document.createElement('img');
                    novaEstrela.src = './assets/images/EstrelaVermelha.png';
                    resistenciaP1.appendChild(novaEstrela);
                }
            });
            
            tesouraAtributos.map((valor) => {
                if (valor === 1) {
                    const novaEstrela = document.createElement('img');
                    novaEstrela.src = './assets/images/EstrelaVermelha.png';
                    velocidadeP1.appendChild(novaEstrela);
                }
            });
            
            tesouraAtributos.map((valor) => {
                if (valor === 2) {
                    const novaEstrela = document.createElement('img');
                    novaEstrela.src = './assets/images/EstrelaVermelha.png';
                    letalidadeP1.appendChild(novaEstrela);
                }
            });
            break
    }

    // Para o Jogador 2
    switch(personagemJogador2) {
        case "Pedra":
            espacoPersonagem2.src = `./assets/images/personagens/Pedra.png`

            if (quadradoPedra) quadradoPedra.classList.add('boardaAzul')
            if (quadradoTesoura) quadradoTesoura.classList.remove("boardaAzul")
            if (quadradoPapel) quadradoPapel.classList.remove('boardaAzul')

            // Antes de realizar o map, limpa os outros, para evitar uma acúmulo de estrelas
            resistenciaP2.innerHTML = ''
            velocidadeP2.innerHTML = ''
            letalidadeP2.innerHTML = ''

            // Faz um map nos valores dos atributos para decidir quantas estrelas vão ser renderizadas, a mesma coisa se repete para os outros personagens
            pedraAtributos.map((valor) => {
                if (valor === 0) {
                    const novaEstrela = document.createElement('img');
                    novaEstrela.src = './assets/images/EstrelaAzul.png';
                    resistenciaP2.appendChild(novaEstrela);
                }
            });
            
            pedraAtributos.map((valor) => {
                if (valor === 1) {
                    const novaEstrela = document.createElement('img');
                    novaEstrela.src = './assets/images/EstrelaAzul.png';
                    velocidadeP2.appendChild(novaEstrela);
                }
            });
            
            pedraAtributos.map((valor) => {
                if (valor === 2) {
                    const novaEstrela = document.createElement('img');
                    novaEstrela.src = './assets/images/EstrelaAzul.png';
                    letalidadeP2.appendChild(novaEstrela);
                }
            });
            break
        case "Papel": 
            espacoPersonagem2.src = `./assets/images/personagens/Papel.png`

            
            resistenciaP2.innerHTML = ''
            velocidadeP2.innerHTML = ''
            letalidadeP2.innerHTML = ''

            if (quadradoPapel) quadradoPapel.classList.add('boardaAzul')
            if (quadradoPedra) quadradoPedra.classList.remove('boardaAzul')
            if (quadradoTesoura) quadradoTesoura.classList.remove('boardaAzul')

            papelAtributos.map((valor) => {
                if (valor === 0) {
                    const novaEstrela = document.createElement('img');
                    novaEstrela.src = './assets/images/EstrelaAzul.png';
                    resistenciaP2.appendChild(novaEstrela);
                }
            });
            
            papelAtributos.map((valor) => {
                if (valor === 1) {
                    const novaEstrela = document.createElement('img');
                    novaEstrela.src = './assets/images/EstrelaAzul.png';
                    velocidadeP2.appendChild(novaEstrela);
                }
            });
            
            papelAtributos.map((valor) => {
                if (valor === 2) {
                    const novaEstrela = document.createElement('img');
                    novaEstrela.src = './assets/images/EstrelaAzul.png';
                    letalidadeP2.appendChild(novaEstrela);
                }
            });
            break
        case "Tesoura": 
            espacoPersonagem2.src = `./assets/images/personagens/Tesoura.png`

            
            resistenciaP2.innerHTML = ''
            velocidadeP2.innerHTML = ''
            letalidadeP2.innerHTML = ''

            if (quadradoTesoura) quadradoTesoura.classList.add('boardaAzul')
            if (quadradoPedra) quadradoPedra.classList.remove('boardaAzul')
            if (quadradoPapel) quadradoPapel.classList.remove('boardaAzul')

            tesouraAtributos.map((valor) => {
                if (valor === 0) {
                    const novaEstrela = document.createElement('img');
                    novaEstrela.src = './assets/images/EstrelaAzul.png';
                    resistenciaP2.appendChild(novaEstrela);
                }
            });
            
            tesouraAtributos.map((valor) => {
                if (valor === 1) {
                    const novaEstrela = document.createElement('img');
                    novaEstrela.src = './assets/images/EstrelaAzul.png';
                    velocidadeP2.appendChild(novaEstrela);
                }
            });
            
            tesouraAtributos.map((valor) => {
                if (valor === 2) {
                    const novaEstrela = document.createElement('img');
                    novaEstrela.src = './assets/images/EstrelaAzul.png';
                    letalidadeP2.appendChild(novaEstrela);
                }
            });
            break
    }

    // Checa se os dois jogadores estão no mesmo personagem, se estiverem no mesmo
    // personagem, ele aplica uma borda dupla no elemento

    if (estado.jogador1.indiceAtual === estado.jogador2.indiceAtual) {
        if (personagemJogador1 === "Pedra") {
            quadradoPedra.classList.add('dualBorder')
            quadradoPedra.classList.remove('bordaVermelha')
            quadradoPedra.classList.remove('bordaAzul')
        } else if (personagemJogador1 === "Papel") {
            quadradoPapel.classList.add('dualBorder')
            quadradoPapel.classList.remove('bordaVermelha')
            quadradoPapel.classList.remove('bordaAzul')
        } else if (personagemJogador1 === "Tesoura") {
            quadradoTesoura.classList.add('dualBorder')
            quadradoTesoura.classList.remove('bordaVermelha')
            quadradoTesoura.classList.remove('bordaAzul')
        }
    } else {
        quadradoPedra.classList.remove('dualBorder')
        quadradoPapel.classList.remove('dualBorder')
        quadradoTesoura.classList.remove('dualBorder')
    }
}



// Início de lógica para confirmação de personagens
const botaoConfirmaP1 = document.querySelector('.left-confirm-character')
const botaoConfirmaP2 = document.querySelector('.right-confirm-character')

// Ao apertarem espaço ou enter, ele altera o texto interno do botão, depois há uma verificação
// se o conteúdo de dentro dos botões de ambos é cancelar, caso sejam, levam eles para a arena,
// isso foi feito de modo a evitar uma variável apenas saber quando eles estão prontos.
const confirmaPlayer1 =  () => {
    botaoConfirmaP1.innerText === 'Pronto' ? botaoConfirmaP1.innerText = 'Cancelar' : botaoConfirmaP1.innerText = 'Pronto'
    
    verificaSeJogadoresEstaoProntos()
}

const confirmaPlayer2 = () => {
    botaoConfirmaP2.innerText === 'Pronto' ? botaoConfirmaP2.innerText = 'Cancelar' : botaoConfirmaP2.innerText = 'Pronto'
    verificaSeJogadoresEstaoProntos()
}

const verificaSeJogadoresEstaoProntos = () => {
    const botaoConfirmaP1 = document.querySelector('.left-confirm-character')
    const botaoConfirmaP2 = document.querySelector('.right-confirm-character')
    const taNaSelecao = document.querySelector(".telainicial").classList.contains("hidden") // Retorna um booleano

    if(botaoConfirmaP1.innerText === 'Cancelar' && botaoConfirmaP2.innerText === 'Cancelar' && taNaSelecao) renderizarArena()
}

const renderizarArena = () => {
    // Redireciona para a página arena.html, com os personagens escolhidos no formato de query params.
    const personagemJogador1 = estado.jogador1.personagens[estado.jogador1.indiceAtual]
    const personagemJogador2 = estado.jogador2.personagens[estado.jogador2.indiceAtual]
    window.location.href = `arena.html?personagem1=${personagemJogador1}&personagem2=${personagemJogador2}`;
}


