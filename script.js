
// Evento disparado assim que toda a árvore estrutural do HTML carregar na tela
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();        // Executa controle de rolagem e links ativos
    initMobileMenu();    // Controle do menu hambúrguer responsivo
    initContactForm();   // Executa escuta e simulação de envio do form
    initServiceModal();  // Abre o modal de detalhes ao clicar nos cards de soluções
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
 * 2. CONTROLE DO MENU HAMBÚRGUER RESPONSIVO
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');

    if (menuToggle && navLinks) {
        // Abre ou fecha o menu ao clicar no botão hambúrguer
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');

            // Muda o ícone entre barras (bars) e fechar (xmark)
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Fecha o menu automaticamente ao clicar em qualquer link
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').className = 'fa-solid fa-bars';
            });
        });

        // Fecha o menu se clicar em qualquer outra parte da tela
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    }
}

/**
 * 3. BASE DE DADOS COM AS INFORMAÇÕES DETALHADAS DE CADA SERVIÇO
 * Usada para preencher o modal que abre ao clicar em um card de solução.
 */
const serviceDetails = {
    mecanica: {
        icon: 'fa-solid fa-wrench',
        title: 'Mecânica Geral',
        description: 'Reparos completos e preventivos em motor, transmissão, suspensão e freios, com revisão minuciosa de todos os sistemas mecânicos vitais do seu veículo para garantir máxima durabilidade e segurança.',
        features: [
            'Substituição técnica de correias dentadas e correntes de comando',
            'Troca de juntas de cabeçote e coxins do motor',
            'Revisão completa do sistema de suspensão e freios',
            'Inspeção minuciosa de todos os sistemas mecânicos vitais',
            'Plano de manutenção preventiva personalizado'
        ]
    },
    motor: {
        icon: 'fa-solid fa-cogs',
        title: 'Motor e Câmbio',
        description: 'Diagnóstico computadorizado preciso e manutenção especializada em motores e transmissões automáticas, automatizadas e manuais, feita por profissionais certificados.',
        features: [
            'Retífica completa de blocos e cabeçotes',
            'Manutenção de câmbios automáticos, CVT, Dualogic e Powershift',
            'Substituição técnica de embreagens',
            'Ajustes de sincronismo e correntes/correias',
            'Diagnóstico computadorizado completo do conjunto motriz'
        ]
    },
    freios: {
        icon: 'fa-solid fa-car-battery',
        title: 'Sistema de Freios',
        description: 'Manutenção essencial e corretiva do sistema de freios, com calibração eletrônica avançada dos sistemas de segurança ativa para garantir a máxima proteção do seu veículo.',
        features: [
            'Troca de discos, pastilhas, tambores e sapatas',
            'Fluidos de freio de alta performance (DOT 4 / DOT 5.1)',
            'Sangria computadorizada do sistema hidráulico',
            'Calibração eletrônica de ABS e EBD',
            'Verificação de controles de tração (ESP)'
        ]
    },
    eletrica: {
        icon: 'fa-solid fa-bolt',
        title: 'Elétrica Automotiva',
        description: 'Soluções completas em elétrica automotiva, da bateria à injeção eletrônica, com equipamentos modernos para localizar e resolver falhas com precisão.',
        features: [
            'Baterias de alta performance, incluindo tecnologia AGM/EFB',
            'Testes de alternadores e motores de partida',
            'Mapeamento e reparo de chicotes elétricos',
            'Reparo de painéis e módulos eletrônicos',
            'Diagnóstico detalhado de injeção eletrônica'
        ]
    },
    diagnostico: {
        icon: 'fa-solid fa-gauge-high',
        title: 'Diagnóstico Digital',
        description: 'Leitura em tempo real via scanner automotivo de última geração, conectado diretamente à ECU do veículo, para identificar falhas ocultas com precisão.',
        features: [
            'Leitura de códigos de falha da injeção eletrônica',
            'Verificação de sensores de estabilidade e airbags',
            'Análise de sensores de emissão de poluentes',
            'Diagnóstico de redes CAN e módulos integrados',
            'Relatório completo com recomendações técnicas'
        ]
    },
    suspensao: {
        icon: 'fa-solid fa-compact-disc',
        title: 'Suspensão e Direção',
        description: 'Substituição técnica de componentes de suspensão e direção com alinhamento computadorizado de alta precisão, para conforto, estabilidade e segurança.',
        features: [
            'Amortecedores pressurizados e molas helicoidais',
            'Buchas de poliuretano, pivôs, bandejas e terminais',
            'Alinhamento computadorizado 3D de alta precisão',
            'Ajuste de cambagem e cáster',
            'Balanceamento de rodas dinâmico a laser'
        ]
    }
};

/**
 * 4. MODAL DE DETALHES DO SERVIÇO
 * Abre um card com mais informações ao clicar em qualquer solution-card,
 * e permite ir direto ao formulário de contato já com o serviço selecionado.
 */
function initServiceModal() {
    const modal = document.getElementById('serviceModal');
    const modalClose = document.getElementById('modalClose');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalCta = document.getElementById('modalCta');
    const cards = document.querySelectorAll('.solution-card');

    if (!modal) return;

    function openServiceModal(service) {
        const data = serviceDetails[service];
        if (!data) return;

        modalIcon.innerHTML = `<i class="${data.icon}"></i>`;
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;

        modalFeatures.innerHTML = '';
        data.features.forEach(feature => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fa-solid fa-check"></i><span>${feature}</span>`;
            modalFeatures.appendChild(li);
        });

        modalCta.setAttribute('data-service', service);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeServiceModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Cada card, ao ser clicado (ou ativado via teclado), abre o modal com seus detalhes
    cards.forEach(card => {
        card.addEventListener('click', function() {
            openServiceModal(card.getAttribute('data-service'));
        });
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openServiceModal(card.getAttribute('data-service'));
            }
        });
    });

    // Fecha ao clicar no X
    modalClose.addEventListener('click', closeServiceModal);

    // Fecha ao clicar fora do card do modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeServiceModal();
    });

    // Fecha com a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeServiceModal();
        }
    });

    // Botão "Solicitar Este Serviço" dentro do modal: fecha, seleciona o serviço no form e rola até o contato
    modalCta.addEventListener('click', function() {
        const service = modalCta.getAttribute('data-service');
        const serviceSelect = document.getElementById('formServiceSelect');
        if (serviceSelect && service) {
            serviceSelect.value = service;
        }
        closeServiceModal();
        setTimeout(() => {
            const contato = document.getElementById('contato');
            if (contato) contato.scrollIntoView({ behavior: 'smooth' });
        }, 200);
    });
}

/**
 * 5. SUBMISSÃO E VALIDAÇÃO DO FORMULÁRIO (SEM INPUT DE TELEFONE)
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
 * 6. FUNÇÃO GLOBAL DE RETORNO SUAVE AO TOPO
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Força comportamento de scroll ameno
    });
}
