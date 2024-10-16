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

document.addEventListener('keydown', (evento) => {
        teclasApertadas(evento)
})

const teclasApertadas = (evento) => {
    switch(evento.key) {
        case "w": 
            return movimentosP1('pular')
        case "a": 
            return movimentosP1('esquerda')
        case "d":
            return movimentosP1('direita')
        case "ArrowUp": 
            return movimentosP2('pular')
        case "ArrowLeft": 
            return movimentosP2('esquerda')
        case "ArrowRight":
            return movimentosP2('direita')
        default: 
            return 
    }
}

const movimentosP1 = (direcao) => {
    switch(direcao){
        case 'pular': 
            pular(htmlPersonagemP1)     
        case 'esquerda':
            moverParaEsquerda(htmlPersonagemP1)
        case 'direita':
            moverParaDireita(htmlPersonagemP1)
        default:
            return
    }
}

const movimentosP2 = (direcao) => {
    switch(direcao){
        case 'pular':
            pular(htmlPersonagemP2)
        case 'esquerda':
            moverParaEsquerda(htmlPersonagemP2)
        case 'direita':
            moverParaDireita(htmlPersonagemP2)
        default:
            return
    }
}

const pular = (htmlPersonagem) => {
    htmlPersonagem.classList.add('pular');
    htmlPersonagem.addEventListener('animationend', () => {
        htmlPersonagem.classList.remove('pular');
    })
}

const moverParaEsquerda = (htmlPersonagem) => {
    // Pega o valor atual de 'left', convertendo-o para número
    const posicaoAtual = parseInt(getComputedStyle(htmlPersonagem).left) || 0;
    // Subtrai 10px da posição atual para mover para a esquerda
    htmlPersonagem.style.left = `${posicaoAtual - 2}px`;
    console.log(htmlPersonagem.style.left)
}

const moverParaDireita = (htmlPersonagem) => {

    // Pega o valor atual de 'left', convertendo-o para número
    const posicaoAtual = parseInt(getComputedStyle(htmlPersonagem).left) || 0;
    // Soma 10px da posição atual para mover para a direita
    htmlPersonagem.style.left = `${posicaoAtual + 1}px`;
    console.log(htmlPersonagem.style.left)
}




// Lógica de colisão com plataformas
const chao = document.querySelector('.arena-ground')
const plataformaEsquerda = document.querySelector('.left-platform')
const plataformaDireita = document.querySelector('.right-platform')

const checaColisaoP1 = () => {
    const coordChao = chao.getBoundingClientRect();
    const coordPlataformaEsquerda = plataformaEsquerda.getBoundingClientRect();
    const coordPlataformaDireita = plataformaDireita.getBoundingClientRect();
    const coordP1 = htmlPersonagemP1.getBoundingClientRect();
    
    // Verifica colisões com o chão
    if(coordP1.bottom >= coordChao.top){
        console.log('tocou no chão')
    }
    // Verifica colisões com a plataforma esquerda
    else if(coordP1.top >= coordPlataformaEsquerda.bottom){
        console.log('bateu a cabeça na plataforma direita')
    }else if(coordP1.right >= coordPlataformaEsquerda.left){
        console.log('bateu na parte esquerda da plataforma')
    }else if(coordP1.left >= coordPlataformaEsquerda.right){
        console.log('bateu na parte direita da plataforma')
    }else if(coordP1.bottom >= coordPlataformaEsquerda.top){
        console.log('ta em cima da plataforma')
    }
    // Verifica colisões com a plataforma direita
    else if(coordP1.top >= coordPlataformaDireita.bottom){
        console.log('bateu a cabeça na plataforma direita')
    }else if(coordP1.right >= coordPlataformaDireita.left){
        console.log('bateu na parte esquerda da plataforma')
    }else if(coordP1.left >= coordPlataformaDireita.right){
        console.log('bateu na parte direita da plataforma')
    }else if(coordP1.bottom >= coordPlataformaDireita.top){
        console.log('ta em cima da plataforma')
    }

}

const checaColisaoP2 = () => {
    const coordChao = chao.getBoundingClientRect();
    const coordPlataformaEsquerda = plataformaEsquerda.getBoundingClientRect();
    const coordPlataformaDireita = plataformaDireita.getBoundingClientRect();
    const coordP2 = htmlPersonagemP2.getBoundingClientRect();
    
    // Verifica colisões com o chão
    if(coordP2.bottom >= coordChao.top){
        console.log('tocou no chão')
    }
    // Verifica colisões com a plataforma esquerda
    else if(coordP2.top >= coordPlataformaEsquerda.bottom){
        console.log('bateu a cabeça na plataforma direita')
    }else if(coordP2.right >= coordPlataformaEsquerda.left){
        console.log('bateu na parte esquerda da plataforma')
    }else if(coordP2.left >= coordPlataformaEsquerda.right){
        console.log('bateu na parte direita da plataforma')
    }else if(coordP2.bottom >= coordPlataformaEsquerda.top){
        console.log('ta em cima da plataforma')
    }
    // Verifica colisões com a plataforma direita
    else if(coordP2.top >= coordPlataformaDireita.bottom){
        console.log('bateu a cabeça na plataforma direita')
    }else if(coordP2.right >= coordPlataformaDireita.left){
        console.log('bateu na parte esquerda da plataforma')
    }else if(coordP2.left >= coordPlataformaDireita.right){
        console.log('bateu na parte direita da plataforma')
    }else if(coordP2.bottom >= coordPlataformaDireita.top){
        console.log('ta em cima da plataforma')
    }

}


