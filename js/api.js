// API para comunicação com o banco de dados
const API_BASE = 'http://localhost:3000';

class API {
    // Usuários
    static async getUsers() {
        const response = await fetch(`${API_BASE}/users`);
        return response.json();
    }

    static async createUser(userData) {
        const response = await fetch(`${API_BASE}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return response.json();
    }

    static async getUserByEmail(email) {
        const response = await fetch(`${API_BASE}/users?email=${email}`);
        const users = await response.json();
        return users[0] || null;
    }

    // Agendamentos
    static async getAppointments() {
        const response = await fetch(`${API_BASE}/appointments`);
        return response.json();
    }

    static async getAppointmentsByUser(userId) {
        try {
            const response = await fetch(`${API_BASE}/appointments?userId=${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        } catch (error) {
            console.error('Erro na API, usando localStorage:', error);
            // Fallback para localStorage
            const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
            return appointments.filter(apt => apt.userId === userId || apt.userId === userId.toString());
        }
    }

    static async createAppointment(appointmentData) {
        try {
            const response = await fetch(`${API_BASE}/appointments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointmentData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return response.json();
        } catch (error) {
            console.error('Erro na API:', error);
            // Fallback para localStorage se a API falhar
            const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
            appointments.push(appointmentData);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            return appointmentData;
        }
    }

    static async updateAppointment(id, appointmentData) {
        const response = await fetch(`${API_BASE}/appointments/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointmentData)
        });
        return response.json();
    }

    static async deleteAppointment(id) {
        const response = await fetch(`${API_BASE}/appointments/${id}`, {
            method: 'DELETE'
        });
        return response.ok;
    }
}

window.API = API;