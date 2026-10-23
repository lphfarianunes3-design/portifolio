/* ==========================================
   MANIPULAÇÃO DO DOM E INTERATIVIDADE (JS)
   ================================---------- */

document.addEventListener('DOMContentLoaded', function() {

    // 1. Alternância de Tema (Dark / Light Mode)
    const botaoTema = document.getElementById('botao-tema');
    const iconeTema = document.getElementById('icone-tema');
    const elementoHtml = document.documentElement;

    // Verificar se já existe preferência salva no navegador
    const temaSalvo = localStorage.getItem('temaPortifolio');
    if (temaSalvo) {
        elementoHtml.setAttribute('data-tema', temaSalvo);
        atualizarIconeTema(temaSalvo);
    }

    botaoTema.addEventListener('click', function() {
        const temaAtual = elementoHtml.getAttribute('data-tema');
        const novoTema = temaAtual === 'light' ? 'dark' : 'light';

        elementoHtml.setAttribute('data-tema', novoTema);
        localStorage.setItem('temaPortifolio', novoTema);
        atualizarIconeTema(novoTema);
    });

    function atualizarIconeTema(tema) {
        if (tema === 'dark') {
            iconeTema.className = 'bi bi-sun-fill';
        } else {
            iconeTema.className = 'bi bi-moon-fill';
        }
    }


    // 2. Menu Hambúrguer (Mobile)
    const botaoMenu = document.getElementById('botao-menu');
    const listaNavegacao = document.getElementById('lista-navegacao');
    const linksNavegacao = document.querySelectorAll('.lista-navegacao a');

    botaoMenu.addEventListener('click', function() {
        listaNavegacao.classList.toggle('ativo');
        const iconeMenu = botaoMenu.querySelector('i');
        
        if (listaNavegacao.classList.contains('ativo')) {
            iconeMenu.className = 'bi bi-x-lg';
        } else {
            iconeMenu.className = 'bi bi-list';
        }
    });

    // Fechar menu ao clicar em um link de navegação
    linksNavegacao.forEach(link => {
        link.addEventListener('click', function() {
            listaNavegacao.classList.remove('ativo');
            botaoMenu.querySelector('i').className = 'bi bi-list';
        });
    });


    // 3. Efeito Máquina de Escrever (Typing Effect)
    const elementoTextoMaquina = document.querySelector('.texto-maquina');
    const frases = [
        "Estudante de Desenvolvimento Full Stack",
        "Desenvolvedor Front-end em Formação",
        "Apaixonado por Tecnologia & Inovação"
    ];
    let indiceFraseAtual = 0;
    let indiceCaractereAtual = 0;
    let estaApagando = false;
    let velocidadeDigitacao = 100;

    function executarMaquinaEscrever() {
        const fraseAtual = frases[indiceFraseAtual];

        if (estaApagando) {
            elementoTextoMaquina.textContent = fraseAtual.substring(0, indiceCaractereAtual - 1);
            indiceCaractereAtual--;
            velocidadeDigitacao = 50;
        } else {
            elementoTextoMaquina.textContent = fraseAtual.substring(0, indiceCaractereAtual + 1);
            indiceCaractereAtual++;
            velocidadeDigitacao = 100;
        }

        if (!estaApagando && indiceCaractereAtual === fraseAtual.length) {
            estaApagando = true;
            velocidadeDigitacao = 2000; // Pausa antes de começar a apagar
        } else if (estaApagando && indiceCaractereAtual === 0) {
            estaApagando = false;
            indiceFraseAtual = (indiceFraseAtual + 1) % frases.length;
            velocidadeDigitacao = 500;
        }

        setTimeout(executarMaquinaEscrever, velocidadeDigitacao);
    }

    if (elementoTextoMaquina) {
        setTimeout(executarMaquinaEscrever, 1000);
    }


    // 4. Botão "Voltar ao Topo" Dinâmico
    const botaoTopo = document.getElementById('botao-topo');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            botaoTopo.classList.add('visivel');
        } else {
            botaoTopo.classList.remove('visivel');
        }
    });

    botaoTopo.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // 5. Geração Dinâmica do Ano Atual no Rodapé
    const elementoAnoAtual = document.getElementById('ano-atual');
    if (elementoAnoAtual) {
        elementoAnoAtual.textContent = new Date().getFullYear();
    }

});