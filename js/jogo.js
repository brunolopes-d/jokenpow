// Os nomes dos personagens vêm em query params, aqui pegamos todas elas.
const params = new URLSearchParams(window.location.search);
// Pegar os elementos html que correspondem aos personagens.
const htmlPersonagemP1 = document.querySelector('.personagemP1')
const htmlPersonagemP2 = document.querySelector('.personagemP2')

const p1 = params.get("personagem1")
const p2 = params.get("personagem2")

const nomeP1 = document.querySelector('.personagemNomeP1')
const nomeP2 = document.querySelector('.personagemNomeP2')

nomeP1.innerText = p1
nomeP2.innerText = p2


// Mudar o src dos personagens para as imagens corresponderem aos personagens escolhidos, com
// os query params que pegamos da url.
htmlPersonagemP1.setAttribute('src', `assets/images/personagens/${p1}.png`)
htmlPersonagemP2.setAttribute('src', `assets/images/personagens/${p2}.png`)

const barraVidaJogador1 = document.querySelector('.player1-health');
const barraVidaJogador2 = document.querySelector('.player2-health');

