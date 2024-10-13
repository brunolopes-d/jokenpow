const params = new URLSearchParams(window.location.search);
const htmlPersonagemP1 = document.querySelector('.personagemP1')
const htmlPersonagemP2 = document.querySelector('.personagemP2')

htmlPersonagemP1.setAttribute('src', `assets/images/personagens/${params.get('personagem1')}.png`)
htmlPersonagemP2.setAttribute('src', `assets/images/personagens/${params.get('personagem2')}.png`)

const barraVidaJogador1 = document.querySelector('.player1-health');
const barraVidaJogador2 = document.querySelector('.player2-health');

