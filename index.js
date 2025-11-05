
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
}


function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const headerHeight = 70; 
    const sectionPosition = section.offsetTop - headerHeight;

    window.scrollTo({ top: sectionPosition, behavior: 'smooth' });


    const menu = document.getElementById('navMenu');
    menu.classList.remove('active');
}


function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('volunteerForm');
    if(!form) return;

    
    if(form.dataset.submitting === 'true') return;
    form.dataset.submitting = 'true';

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();

   
    if (!nome || !email) {
        alert('Por favor, preencha os campos Nome e Email.');
        return;
    }

    
    const formData = {
        nome,
        email,
        telefone: form.telefone.value.trim(),
        idade: form.idade.value.trim(),
        disponibilidade: form.disponibilidade.value.trim(),
        areaInteresse: form['area-interesse'].value.trim(),
        experiencia: form.experiencia.value.trim(),
        motivacao: form.motivacao.value.trim(),
        dataCadastro: new Date().toLocaleString()
    };

    let voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];
    voluntarios.push(formData);
    localStorage.setItem('voluntarios', JSON.stringify(voluntarios));

    
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('show');
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    
    setTimeout(() => form.reset(), 2000);

    
    setTimeout(() => successMessage.classList.remove('show'), 5000);

   
    exibirVoluntarios();
}


function exibirVoluntarios() {
    const voluntarios = JSON.parse(localStorage.getItem('voluntarios') || '[]');
    const tabelaContainer = document.getElementById('tabelaVoluntarios');

    if (!tabelaContainer) return;

    if (voluntarios.length === 0) {
        tabelaContainer.innerHTML = '<p>Nenhum voluntário cadastrado ainda.</p>';
        return;
    }

    let html = '<table border="1" cellpadding="5" cellspacing="0">';
    html += '<tr><th>Nome</th><th>Email</th><th>Telefone</th><th>Idade</th><th>Disponibilidade</th><th>Área de Interesse</th><th>Data Cadastro</th></tr>';

    voluntarios.forEach(v => {
        html += `<tr>
            <td>${v.nome}</td>
            <td>${v.email}</td>
            <td>${v.telefone}</td>
            <td>${v.idade}</td>
            <td>${v.disponibilidade}</td>
            <td>${v.areaInteresse}</td>
            <td>${v.dataCadastro}</td>
        </tr>`;
    });

    html += '</table>';
    tabelaContainer.innerHTML = html;
}


window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.card, .project-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (cardTop < windowHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card, .project-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    
    exibirVoluntarios();
});

const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
//Limita a 11 dígitos.
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 6) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }

        e.target.value = value;
    });
}


function limparTabela(){
    const tabelaContainer = document.getElementById('tabelaVoluntarios');

    if(tabelaContainer){
        tabelaContainer.innerHTML = '<p>Nenhum voluntário cadastrado.</p>';
    }

  
    localStorage.removeItem('voluntarios');    
}


window.limparTabela = limparTabela;