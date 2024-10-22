# jokenpow
Jokenpow, jogo desenvolvido para o projeto de Programação Funcional.

O jogo é um jogo de luta, em que você pode escolher entre três personagens, pedra, papel ou tesoura, e realizar um duelo, de maneira local, usando teclas pré-definidas. Cada personagem possuí seus próprios atributos e isso influencia diretamente no duelo, o papel por exemplo, é muito mais rápido que os demais, enquanto a pedra é mais resistente que os outros dois, cada um é forte em dados aspectos e isso é refletido na hora da batalha.

Atributos dos Personagens:

Pedra
  Resistência: ⭐⭐⭐⭐⭐
  Velocidade: ⭐⭐
  Letalidade:⭐⭐⭐

Papel:
  Resistência: ⭐⭐
  Velocidade: ⭐⭐⭐⭐⭐
  Letalidade:⭐⭐⭐⭐

Tesoura:
  Resistência: ⭐⭐⭐
  Velocidade: ⭐⭐⭐
  Letalidade:⭐⭐⭐

--------------------

Importante perceber que o jogo não é estritamente funcional, visto o uso de uma variável de estado, no entanto, essa variável é atualizada de maneira controlada, sempre retornando um novo estado de jogo que será posteriormente renderizado na tela, mantendo a estrutura base do jogo imutável (estadoInicial) e fazendo posteriores atribuições ao estado do jogo no requestAnimationFrame (que fica responsável por redesenhar os quadros dependendo da frequência de hz do seu monitor). A prática do uso de estados é comum dentro da programação funcional, sendo seu uso com uma única variável de estado uma exceção dentro do paradigma, usando uma espécie de "imutabilidade controlada", permitindo o controle de quando e como o estado vai ser atualizado, minimizando assim a chance de ocorrerem efeitos colaterais indesejados. 

Com esse encapsulamento da mutabilidade a uma única variável, é possível de certa forma prever como o estado será mudado ao ser encaminhado para funções puras que o manipulem, assim, é facilitado perceber como o estado do jogo muda com o tempo.

Materiais sobre o uso de estados (caso calouros futuros venham a precisar):

https://gamedev.stackexchange.com/questions/74015/pure-functional-programming-and-game-state
https://www.quora.com/Is-functional-programming-suitable-for-game-development
https://prog21.dadgum.com/23.html
https://hendrikdcomp.github.io/pf/conteudo/estudocaso/ec_snake.html


Jogo desenvolvido por:

Bruno Lopes dos Santos (@bruno.lopeess)
Luis Fabiano Carvalho Leite (@luisfabianocl)
Jefferson Gonzaga dos Santos Filho  (@je.ferson2368)

Artes por: @aaaaarthu

(Qualquer dúvida, podem mandar mensagem para qualquer um dos membros e vamos ter prazer em ajudar.)


