/* ============================================
   UNIVERSO AUTOMOTIVO - ARQUIVO LÓGICO (JS)
   ============================================ */

// Evento disparado assim que toda a árvore estrutural do HTML carregar na tela
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();       // Executa controle de rolagem e links ativos
    initContactForm();  // Executa escuta e simulação de envio do form
    initSolutionLinks();// Conecta os cards de soluções diretamente aos selects
});

/**
 * 1. CONTROLE DINÂMICO DA NAVBAR E ROLAGEM DE PÁGINA
 * Muda a opacidade do cabeçalho e aplica classe ativa baseada no scroll real do usuário.
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        // Se desceu mais de 50 pixels, escurece a barra para dar leitura sobre conteúdos de fundo
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
            navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.5)";
        } else {
            navbar.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
            navbar.style.boxShadow = "none";
        }
        
        // Identificação automática de qual seção está visível no monitor do cliente
        let currentSection = 'inicio';
        const sections = ['inicio', 'sobre', 'por-que', 'solucoes', 'comentarios', 'contato'];
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop - 160; // Desconto da altura da barra fixa
                if (window.scrollY >= sectionTop) {
                    currentSection = sectionId;
                }
            }
        });

        // Remove a classe de destaque de todos os links e aplica apenas na seção ativa atual
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * 2. INTEGRAÇÃO INTELIGENTE DOS CARDS DE SOLUÇÃO COM O SELECT
 * Captura o clique do card e muda o valor do formulário automaticamente.
 */
function initSolutionLinks() {
    const cards = document.querySelectorAll('.solution-card');
    const serviceSelect = document.getElementById('formServiceSelect');

    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Pega o valor armazenado no atributo customizado 'data-service' do card
            const serviceValue = card.getAttribute('data-service');
            if (serviceSelect && serviceValue) {
                // Modifica o input de seleção para coincidir com o serviço clicado
                serviceSelect.value = serviceValue;
            }
        });
    });
}

/**
 * 3. SUBMISSÃO E VALIDAÇÃO DO FORMULÁRIO (SEM INPUT DE TELEFONE)
 * Previne recarregamento de página e emite caixa de sucesso.
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio nativo que recarrega a página
            
            // Reúne todos os dados digitados e selecionados nos inputs atuais
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Console de monitoramento de desenvolvedor técnico
            console.log('Dados recebidos e validados via JS:', data);
            
            // Bloqueia temporariamente o botão para evitar cliques duplicados errôneos
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando Solicitação...';
            submitBtn.disabled = true;
            
            // Simulação assíncrona de envio para servidor (1.5 segundos de resposta simulada)
            setTimeout(() => {
                form.style.display = 'none';      // Esconde o formulário
                formSuccess.style.display = 'block'; // Apresenta a mensagem de sucesso
                
                // Reseta os estados e limpa o formulário após 4 segundos em tela
                setTimeout(() => {
                    form.style.display = 'flex';
                    formSuccess.style.display = 'none';
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 4000);
            }, 1500);
        });
    }
}

/**
 * 4. FUNÇÃO GLOBAL DE RETORNO SUAVE AO TOPO
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Força comportamento de scroll ameno
    });
}