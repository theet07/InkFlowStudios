// Sistema de Autenticação
class AuthSystem {
    constructor() {
        this.initializeDefaultUsers();
    }

    // Inicializar usuários padrão para demonstração
    async initializeDefaultUsers() {
        try {
            const users = await API.getUsers();
            // Usuários já existem no banco
        } catch (error) {
            console.log('Usando localStorage como fallback');
            const users = this.getUsers();
            if (users.length === 0) {
                const defaultUsers = [
                    {
                        id: 1,
                        name: 'Cliente Demo',
                        email: 'demo@inkflow.com',
                        password: '123456',
                        phone: '(11) 99999-9999',
                        birth: '1990-01-01',
                        createdAt: new Date().toISOString()
                    }
                ];
                localStorage.setItem('users', JSON.stringify(defaultUsers));
            }
        }
    }

    // Obter todos os usuários
    async getUsers() {
        try {
            return await API.getUsers();
        } catch (error) {
            return JSON.parse(localStorage.getItem('users') || '[]');
        }
    }

    // Verificar se usuário está logado
    isLoggedIn() {
        const loginData = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
        return loginData !== null;
    }

    // Obter dados do usuário logado
    getCurrentUser() {
        const loginData = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
        if (loginData) {
            const parsed = JSON.parse(loginData);
            return parsed.user || parsed; // Compatibilidade com ambos os formatos
        }
        return null;
    }

    // Fazer logout
    logout() {
        localStorage.removeItem('loginData');
        sessionStorage.removeItem('loginData');
        window.location.href = 'login.html';
    }

    // Proteger páginas que requerem login
    requireAuth(redirectPage = null) {
        if (!this.isLoggedIn()) {
            alert('Você precisa fazer login para acessar esta página.');
            const currentPage = redirectPage || window.location.pathname.split('/').pop();
            window.location.href = `login.html?redirect=${currentPage}`;
            return false;
        }
        return true;
    }

    // Atualizar navegação baseada no status de login
    updateNavigation() {
        const loginLink = document.querySelector('nav a[href="login.html"]');
        const meusAgendamentosLink = document.getElementById('meus-agendamentos-link');
        
        if (this.isLoggedIn()) {
            // Usuário logado - mostrar botão de logout
            if (loginLink) {
                loginLink.textContent = 'Sair';
                loginLink.onclick = (e) => {
                    e.preventDefault();
                    this.logout();
                };
                loginLink.href = '#';
            }
            
            // Mostrar link "Meus Agendamentos" se existir
            if (meusAgendamentosLink) {
                meusAgendamentosLink.style.display = 'block';
            }
        } else {
            // Usuário não logado - mostrar botão de login
            if (loginLink) {
                loginLink.textContent = 'Login';
                loginLink.onclick = null;
                loginLink.href = 'login.html';
            }
            
            // Ocultar link "Meus Agendamentos" se existir
            if (meusAgendamentosLink) {
                meusAgendamentosLink.style.display = 'none';
            }
        }
    }
}

// Inicializar sistema de autenticação globalmente
window.authSystem = new AuthSystem();

// Função global para verificar login antes de agendar
window.checkLoginForBooking = function() {
    if (window.authSystem && window.authSystem.isLoggedIn()) {
        window.location.href = 'agendamento.html';
    } else {
        alert('Você precisa fazer login para agendar uma sessão.');
        window.location.href = 'login.html';
    }
};

// Atualizar navegação quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    window.authSystem.updateNavigation();
});