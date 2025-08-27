const fs = require('fs');
const path = require('path');

const WHATSAPP_FILE = path.join(__dirname, '../whatsapp-bot/agendamentos.json');

// Sincronizar agendamentos WhatsApp → Web
function syncAppointments() {
    try {
        if (fs.existsSync(WHATSAPP_FILE)) {
            const whatsappData = JSON.parse(fs.readFileSync(WHATSAPP_FILE, 'utf8'));
            
            // Converter formato WhatsApp para Web
            const webFormat = whatsappData.map(apt => ({
                id: apt.id || Date.now(),
                name: apt.nome,
                phone: apt.telefone,
                service: apt.servico,
                description: apt.descricao,
                date: apt.data,
                status: 'pending',
                source: 'whatsapp',
                userEmail: 'whatsapp-user'
            }));
            
            return webFormat;
        }
    } catch (error) {
        console.error('Erro na sincronização:', error);
    }
    return [];
}

module.exports = { syncAppointments };