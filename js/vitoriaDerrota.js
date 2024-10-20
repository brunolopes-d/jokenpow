const params = new URLSearchParams(window.location.search);

const ganhador = params.get("ganhador");
const perdedor = params.get("perdedor");

const vitoriaDiv = document.querySelector(".vencedor")
const piadinha = document.querySelector(".piadinha")
vitoriaDiv.innerHTML = `A ${ganhador} saiu vitoriosa.`
const vitoriaDiv = document.querySelector(".vencedor");
const piadinha = document.querySelector(".piadinha");

vitoriaDiv.innerHTML = `A ${ganhador} saiu vitoriosa.`;

if (ganhador === "Papel" && perdedor === "Tesoura") {
    piadinha.innerHTML = "Pelo visto o papel tava mais afiado do que a lâmina da tesoura."
}
// Captura o botão 'Voltar para a tela inicial'
document.querySelector('.voltarTelaInicial').addEventListener('click', function() {
    window.location.href = 'index.html'; // Redireciona para index.html ao clicar no botão
});

if (ganhador === "Tesoura" && perdedor === "Pedra") {
    piadinha.innerHTML = "Essa tesoura é mais afiada do que o normal, a pedra não teve chance alguma."
// Ação do botão 'Revanche'
document.querySelector('.revanche').addEventListener('click', function() {
    // Redireciona para arena.html com os personagens e o ganhador
    window.location.href = `arena.html?ganhador=${ganhador}&perdedor=${perdedor}`;
});

// Define a piadinha com base no ganhador e perdedor
if (ganhador === "Pedra" && perdedor === "Papel") {
    piadinha.innerHTML = "A pedra era grande demais pro papel abraçar.";
} else if (ganhador === "Papel" && perdedor === "Tesoura") {
    piadinha.innerHTML = "Pelo visto o papel tava mais afiado do que a lâmina da tesoura.";
} else if (ganhador === "Tesoura" && perdedor === "Pedra") {
    piadinha.innerHTML = "Essa tesoura é mais afiada do que o normal, a pedra não teve chance alguma.";
} else {
    piadinha.innerHTML = "Uma batalha épica aconteceu!";
}
