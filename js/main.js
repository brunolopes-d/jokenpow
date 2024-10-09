const button = document.querySelector(".button")
const telaInicial = document.querySelector(".telainicial")
const telaSelecaoPersonagem = document.querySelector(".selecaopersonagens")

button.addEventListener('click', () => {
    telaInicial.classList.add('hidden')
    telaSelecaoPersonagem.classList.remove('hidden')
})