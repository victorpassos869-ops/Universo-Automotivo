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
