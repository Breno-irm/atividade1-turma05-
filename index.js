// Menu toggle
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
}

// Scroll para seções
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const headerHeight = 70;
    const sectionPosition = section.offsetTop - headerHeight;

    window.scrollTo({ top: sectionPosition, behavior: 'smooth' });

    const menu = document.getElementById('navMenu');
    menu.classList.remove('active');
}

// Formulário
function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('voluntarioForm');
    if (!form) return;

    // Coletando todos os valores
    const formData = {
        nome: form.nome.value.trim(),
        cpf: form.cpf.value.trim(),
        endereco: form.endereco.value.trim(),
        email: form.email.value.trim(),
        telefone: form.telefone.value.trim(),
        idade: form.idade.value.trim(),
        disponibilidade: form.disponibilidade.value.trim(),
        areaInteresse: form['area-interesse'].value.trim(),
        motivacao: form.motivacao.value.trim(),
        dataCadastro: new Date().toLocaleString()
    };

    // Validando campos obrigatórios
    if (!formData.nome || !formData.email || !formData.telefone) {
        alert('Por favor, preencha os campos obrigatórios: Nome, Email e Telefone.');
        return;
    }

    // Salvando no localStorage
    let voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];
    voluntarios.push(formData);
    localStorage.setItem('voluntarios', JSON.stringify(voluntarios));

    // Mostra mensagem de sucesso
    const successMessage = document.getElementById('sucessMensage');
    if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }

    form.reset();
    exibirVoluntarios();
}

// Exibir voluntários
function exibirVoluntarios() {
    const voluntarios = JSON.parse(localStorage.getItem('voluntarios') || '[]');
    const tabelaContainer = document.getElementById('tabelaVoluntarios');
    if (!tabelaContainer) return;

    if (voluntarios.length === 0) {
        tabelaContainer.innerHTML = '<p>Nenhum voluntário cadastrado ainda.</p>';
        return;
    }

    let html = '<table border="1" cellpadding="5" cellspacing="0">';
    html += '<tr><th>Nome</th><th>CPF</th><th>Endereço</th><th>Email</th><th>Telefone</th><th>Idade</th><th>Disponibilidade</th><th>Área de Interesse</th><th>Motivação</th><th>Data Cadastro</th></tr>';

    voluntarios.forEach(v => {
        html += `<tr>
            <td>${v.nome}</td>
            <td>${v.cpf}</td>
            <td>${v.endereco}</td>
            <td>${v.email}</td>
            <td>${v.telefone}</td>
            <td>${v.idade}</td>
            <td>${v.disponibilidade}</td>
            <td>${v.areaInteresse}</td>
            <td>${v.motivacao}</td>
            <td>${v.dataCadastro}</td>
        </tr>`;
    });

    html += '</table>';
    tabelaContainer.innerHTML = html;
}

// Formatação de telefone simples
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value; // salva apenas números, sem validação complexa
    });
}

// Limpar tabela
function limparTabela() {
    const tabelaContainer = document.getElementById('tabelaVoluntarios');
    if (tabelaContainer) tabelaContainer.innerHTML = '<p>Nenhum voluntário cadastrado.</p>';
    localStorage.removeItem('voluntarios');
}

window.limparTabela = limparTabela;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    exibirVoluntarios();
});
