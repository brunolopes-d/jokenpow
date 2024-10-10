const button = document.querySelector(".button")
const telaInicial = document.querySelector(".telainicial")
const telaSelecaoPersonagem = document.querySelector(".selecaopersonagens")

button.addEventListener('click', () => {
    telaInicial.classList.add('hidden')
    telaSelecaoPersonagem.classList.remove('hidden')
})

// Criação de um estado inicial para a aplicação, a cada interação
// com a tela de seleção de personagens, um novo estado é criado, 
// e é então renderizado na tela

const initialState = {
    player1: {
        name: "Jogador 1",
        characters: ["Pedra", "Papel", "Tesoura"],
        currentIndex: 0
    },

    player2: {
        name: "Jogador 2",
        characters: ["Pedra", "Papel", "Tesoura"],
        currentIndex: 0
    }
}

// Função responsável por criar um novo estado, com a nova posição
// dentro do range de possibilidades, ou pedra, ou papel, ou tesoura

const selectCharacter = (player, direction) => {
    const newIndex = (player.currentIndex + direction)
    return {...player, currentIndex: newIndex}
}