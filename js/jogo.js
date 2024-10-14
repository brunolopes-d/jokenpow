// Pegar os parâmetros dos personagens na URL
const params = new URLSearchParams(window.location.search);
const p1 = params.get("personagem1");
const p2 = params.get("personagem2");

// Pegar os elementos dos personagens
const htmlPersonagemP1 = document.querySelector('.personagemP1');
const htmlPersonagemP2 = document.querySelector('.personagemP2');

// Definir os nomes dos personagens
const nomeP1 = document.querySelector('.personagemNomeP1');
const nomeP2 = document.querySelector('.personagemNomeP2');

nomeP1.innerText = p1;
nomeP2.innerText = p2;

// Mudar o src das imagens para os personagens escolhidos
htmlPersonagemP1.setAttribute('src', `assets/images/personagens/${p1}.png`);
htmlPersonagemP2.setAttribute('src', `assets/images/personagens/${p2}.png`);

