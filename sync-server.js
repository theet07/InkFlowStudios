const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('.'));

// Endpoint para sincronizar WhatsApp
app.get('/api/sync-whatsapp', (req, res) => {
    try {
        const whatsappFile = path.join(__dirname, 'whatsapp-bot/agendamentos.json');
        
        if (fs.existsSync(whatsappFile)) {
            const whatsappData = JSON.parse(fs.readFileSync(whatsappFile, 'utf8'));
            
            const webFormat = whatsappData.map(apt => ({
                id: `wa_${apt.id || Date.now()}`,
                name: apt.nome,
                phone: apt.telefone,
                service: apt.servico || 'WhatsApp',
                description: apt.descricao,
                date: apt.data,
                status: 'pending',
                source: 'whatsapp',
                userEmail: 'whatsapp-user'
            }));
            
            res.json(webFormat);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.json([]);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log('Sincronização WhatsApp ↔ Web ativa');
});