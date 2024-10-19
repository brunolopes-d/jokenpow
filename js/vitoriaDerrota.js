const params = new URLSearchParams(window.location.search);

const ganhador = params.get("ganhador");
const perdedor = params.get("perdedor");

const vitoriaDiv = document.querySelector(".vencedor")
const piadinha = document.querySelector(".piadinha")
vitoriaDiv.innerHTML = `A ${ganhador} saiu vitoriosa.`

if (ganhador === "Pedra" && perdedor === "Papel") {
    piadinha.innerHTML = "A pedra era grande demais pro papel abraçar."
}

if (ganhador === "Papel" && perdedor === "Tesoura") {
    piadinha.innerHTML = "Pelo visto o papel tava mais afiado do que a lâmina da tesoura."
}

if (ganhador === "Tesoura" && perdedor === "Pedra") {
    piadinha.innerHTML = "Essa tesoura é mais afiada do que o normal, a pedra não teve chance alguma."
}
