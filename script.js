const canvas = document.getElementById("galaxia");
const ctx = canvas.getContext("2d");

const botao = document.getElementById("botaoSurpresa");
const mensagemInicial = document.getElementById("mensagemInicial");
const cardRomantico = document.getElementById("cardRomantico");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// =====================================
// ESTRELAS DE FUNDO
// =====================================
const estrelas = [];
const quantidadeEstrelas = 1000;

for (let i = 0; i < quantidadeEstrelas; i++) {
    estrelas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        tamanho: Math.random() * 2,
        velocidade: Math.random() * 0.4 + 0.1,
        brilho: Math.random()
    });
}

function desenharEstrelas() {
    for (let estrela of estrelas) {
        ctx.beginPath();
        ctx.arc(estrela.x, estrela.y, estrela.tamanho, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${estrela.brilho})`;
        ctx.fill();
    }
}

function atualizarEstrelas() {
    for (let estrela of estrelas) {
        estrela.y += estrela.velocidade;
        if (estrela.y > canvas.height) {
            estrela.y = 0;
            estrela.x = Math.random() * canvas.width;
        }
    }
}

// =====================================
// HACKER DEBUGGING: CORAÇÃO DE "EU TE AMO"
// =====================================
const particulasTexto = [];
const quantidadeTextos = 300; // Quantidade de blocos de texto
const caracteresHacker = ["Eu Te Amo", "<3", "LOVE", "TE AMO", ];

function criarCoracaoHacker() {
    particulasTexto.length = 0;

    for (let i = 0; i < quantidadeTextos; i++) {
        const t = Math.random() * Math.PI * 2;
        const escala = Math.sqrt(Math.random());

        // Equação paramétrica do coração
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

        const tamanho = Math.min(canvas.width, canvas.height) / 28;

        const destinoX = canvas.width / 2 + x * tamanho * escala;
        const destinoY = canvas.height / 2 - y * tamanho * escala;

        // Escolhe um texto aleatório da lista
        const texto = caracteresHacker[Math.floor(Math.random() * caracteresHacker.length)];

        particulasTexto.push({
            texto: texto,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            destinoX: destinoX,
            destinoY: destinoY,
            tamanhoFonte: Math.floor(Math.random() * 6 + 10), // Tamanhos variados tipo código
            velocidade: Math.random() * 0.05 + 0.02,
            brilho: Math.random(),
            fase: Math.random() * Math.PI * 2
        });
    }
}

function desenharCoracaoHacker() {
    for (let p of particulasTexto) {
        // Movimento de encaixe estilo "suavização de dados"
        p.x += (p.destinoX - p.x) * p.velocidade;
        p.y += (p.destinoY - p.y) * p.velocidade;

        // Pulsação suave dos textos
        const opacidade = 0.4 + Math.sin(Date.now() * 0.005 + p.fase) * 0.4;

        ctx.font = `bold ${p.tamanhoFonte}px monospace`; // Fonte Monospace estilo Terminal/Hacker
        
        // Efeito de iluminação rosa choque / neon
        ctx.fillStyle = `rgba(255, 20, 147, ${opacidade})`;
        ctx.shadowColor = "#ff1493";
        ctx.shadowBlur = 6;
        
        ctx.fillText(p.texto, p.x, p.y);
        ctx.shadowBlur = 0;
    }
}

// =====================================
// LOOP DE ANIMAÇÃO
// =====================================
let coracaoAtivo = false;

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    desenharEstrelas();
    atualizarEstrelas();

    if (coracaoAtivo) {
        desenharCoracaoHacker();
    }

    requestAnimationFrame(animar);
}

// =====================================
// BOTÃO
// =====================================
botao.addEventListener("click", () => {
    coracaoAtivo = true;
    criarCoracaoHacker();

    // Desaparece com a interface inicial
    mensagemInicial.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    mensagemInicial.style.opacity = "0";
    mensagemInicial.style.transform = "translate(-50%, -50%) scale(0.8)";
    mensagemInicial.style.pointerEvents = "none";

    // Mostra o card principal no centro após montar
    setTimeout(() => {
        cardRomantico.classList.add("ativo");
    }, 1200);
});

animar();
