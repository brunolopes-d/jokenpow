const params = new URLSearchParams(window.location.search);

const ganhador = params.get("ganhador");
const perdedor = params.get("perdedor");

const personagemJogador1 = params.get("jogador1");
const personagemJogador2 = params.get("jogador2");

const playerGanhador = params.get("pg")

const vitoriaDiv = document.querySelector(".vencedor");

if (ganhador !== perdedor) {
    if (ganhador === "Papel") {
        vitoriaDiv.innerHTML = `O ${ganhador} saiu vitorioso.`;
    } else if (ganhador === "Pedra" || ganhador === "Tesoura") {
        vitoriaDiv.innerHTML = `A ${ganhador} saiu vitoriosa.`;
    }
} else {
    if (playerGanhador === 'p1') {
        vitoriaDiv.innerHTML = `O jogador 1 venceu.`
    } else {
        vitoriaDiv.innerHTML = `O jogador 2 venceu.`
    }    
}


const piadinha = document.querySelector(".piadinha");

// Captura o botão 'Voltar para a tela inicial'
document.querySelector('.voltarTelaInicial').addEventListener('click', () => {
    window.location.href = 'index.html'; // Redireciona para index.html ao clicar no botão
});

document.querySelector('.revanche').addEventListener('click', () => {
    // Redireciona para arena.html com personagem1 como o ganhador e personagem2 como o perdedor
    window.location.href = `arena.html?personagem1=${personagemJogador1}&personagem2=${personagemJogador2}`;
});

// Define a piadinha com base no ganhador e perdedor
if (ganhador === "Pedra" && perdedor === "Papel") {
    piadinha.innerHTML = "Pedra dura e papel mole...";
} else if (ganhador === "Papel" && perdedor === "Tesoura") {
    piadinha.innerHTML = "Essa tesoura tá muito cega pelo visto.";
} else if (ganhador === "Tesoura" && perdedor === "Pedra") {
    piadinha.innerHTML = "Essa tesoura tá muito corta brita...";
} else if (ganhador === "Tesoura" && perdedor === "Papel"){
    piadinha.innerHTML = "Esperava algo diferente?";
} else if (ganhador === "Papel" && perdedor === "Pedra"){
    piadinha.innerHTML = "Deu a lógica.";
} else if (ganhador === "Pedra" && perdedor === "Tesoura"){
    piadinha.innerHTML = "Perfeitamente condizente.";
} else {
    piadinha.innerHTML = "Uma batalha épica aconteceu.";
}

