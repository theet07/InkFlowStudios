// Sistema de Chatbot para Ink Flow
class InkFlowChatbot {
    constructor() {
        this.isOpen = false;
        this.responses = {
            'horario': 'Opa! 🕘 Funcionamos de segunda a sábado das 9h às 18h. Domingo só se você implorar muito (com agendamento) 😏',
            'preco': 'Eita, quer saber o preço né? 💸 Depende do tamanho da arte, meu chapa! Vai de R$200 até "vendeu o rim". Melhor agendar uma consulta pra não chorar depois! 😂',
            'agendamento': 'Ah, finalmente decidiu se tatuar? 🎉 Clica em "Agendamento" no menu ou faz login logo, que tô esperando aqui ó... *bate o pé* ⏰',
            'cuidados': 'Escuta aqui, criança! 👶 Depois da tattoo: limpa direito, passa pomada, NADA de sol por 30 dias senão eu te assombro! ☀️👻 E não fica cutucando, pelo amor!',
            'estilos': 'Temos de tudo, meu bem! 🎨 Realismo (pra quem é chique), Aquarela (pra quem gosta de cor), Geométrico (pra quem curte matemática), Blackwork (gótico raiz), Fine Line (delicadinha) e Tradicional (old school raiz)!',
            'local': 'Estamos na Rua Augusta, coração de SP! 📍 Se não achar, é porque não quer mesmo... Vai na página de Contato que tem mapa e tudo, preguiçoso! 😤',
            'tempo': 'Depende né, gênio! 🤔 Tattoo pequena: 1-2h (rapidinho). Média: 3-5h (dá pra maratonar Netflix). Grande: várias sessões (prepara o psicológico e a carteira) 💪',
            'dor': 'Vai doer sim, não vou mentir! 😈 Mas relaxa, nossos tatuadores são feras e sabem como amenizar. Se não aguentar, a culpa não é nossa! 🤷‍♀️',
            'idade': 'Só maiores de 18, bebê! 🔞 Menor de idade precisa dos pais junto (e eles assinando um monte de papel). Sem choro!',
            'retoque': 'Retoque grátis em 30 dias, mas só se você cuidou direitinho! 😏 Se fez merda e estragou, aí é problema seu, amigão! 💅'
        };
        this.init();
    }

    init() {
        this.createChatbot();
        this.bindEvents();
    }

    createChatbot() {
        const chatbotHTML = `
            <div id="chatbot-container" class="chatbot-container">
                <div id="chatbot-button" class="chatbot-button">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                    </svg>
                </div>
                <div id="chatbot-window" class="chatbot-window">
                    <div class="chatbot-header">
                        <h3>Lily - Assistente Rebelde 😈</h3>
                        <button id="chatbot-close" class="chatbot-close">&times;</button>
                    </div>
                    <div id="chatbot-messages" class="chatbot-messages">
                        <div class="message bot-message">
                            E aí, futuro tatuado! 😈 Sou a Lily do Ink Flow e tô aqui pra te ajudar (ou zoar um pouco)! O que você quer saber? 🎨
                            <div class="quick-buttons">
                                <button class="quick-btn" data-question="horario">Horários</button>
                                <button class="quick-btn" data-question="preco">Preços</button>
                                <button class="quick-btn" data-question="estilos">Estilos</button>
                                <button class="quick-btn" data-question="agendamento">Agendar</button>
                            </div>
                        </div>
                    </div>
                    <div class="chatbot-input">
                        <input type="text" id="chatbot-input-field" placeholder="Digite sua pergunta...">
                        <button id="chatbot-send">Enviar</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    bindEvents() {
        const button = document.getElementById('chatbot-button');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const inputField = document.getElementById('chatbot-input-field');

        button.addEventListener('click', () => this.toggleChatbot());
        closeBtn.addEventListener('click', () => this.closeChatbot());
        sendBtn.addEventListener('click', () => this.sendMessage());
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-btn')) {
                const question = e.target.dataset.question;
                this.handleQuickQuestion(question);
            }
        });
    }

    toggleChatbot() {
        const window = document.getElementById('chatbot-window');
        this.isOpen = !this.isOpen;
        window.style.display = this.isOpen ? 'flex' : 'none';
    }

    closeChatbot() {
        const window = document.getElementById('chatbot-window');
        this.isOpen = false;
        window.style.display = 'none';
    }

    sendMessage() {
        const inputField = document.getElementById('chatbot-input-field');
        const message = inputField.value.trim();
        
        if (!message) return;

        this.addMessage(message, 'user');
        inputField.value = '';
        
        setTimeout(() => {
            const response = this.getResponse(message);
            this.addMessage(response, 'bot');
        }, 500);
    }

    handleQuickQuestion(question) {
        const response = this.responses[question] || 'Desculpe, não entendi sua pergunta.';
        this.addMessage(response, 'bot');
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    getResponse(message) {
        const msg = message.toLowerCase();
        
        // Palavras-chave para respostas
        if (msg.includes('horario') || msg.includes('funciona') || msg.includes('aberto')) {
            return this.responses.horario;
        }
        if (msg.includes('preco') || msg.includes('valor') || msg.includes('custa') || msg.includes('quanto')) {
            return this.responses.preco;
        }
        if (msg.includes('agendar') || msg.includes('marcar') || msg.includes('consulta')) {
            return this.responses.agendamento;
        }
        if (msg.includes('cuidado') || msg.includes('cicatriz') || msg.includes('pomada')) {
            return this.responses.cuidados;
        }
        if (msg.includes('estilo') || msg.includes('tipo') || msg.includes('realismo') || msg.includes('aquarela')) {
            return this.responses.estilos;
        }
        if (msg.includes('onde') || msg.includes('local') || msg.includes('endereco')) {
            return this.responses.local;
        }
        if (msg.includes('tempo') || msg.includes('demora') || msg.includes('sessao')) {
            return this.responses.tempo;
        }
        if (msg.includes('dor') || msg.includes('doi') || msg.includes('machuca')) {
            return this.responses.dor;
        }
        if (msg.includes('idade') || msg.includes('menor') || msg.includes('anos')) {
            return this.responses.idade;
        }
        if (msg.includes('retoque') || msg.includes('garantia') || msg.includes('refazer')) {
            return this.responses.retoque;
        }
        
        // Respostas extras engraçadas
        if (msg.includes('medo') || msg.includes('nervoso') || msg.includes('ansioso')) {
            return 'Medo de quê, criança? 😏 É só uma agulhinha... várias vezes... por horas... 😈 Brincadeira! Nossos tatuadores são gentis (na maioria das vezes)!';
        }
        if (msg.includes('primeira') || msg.includes('primeiro') || msg.includes('vez')) {
            return 'Primeira tattoo? 🥺 Que fofo! Relaxa que a gente pega leve... ou não! 😂 Brinks, vamos cuidar bem de você, bebê!';
        }
        if (msg.includes('obrigad') || msg.includes('valeu') || msg.includes('brigad')) {
            return 'Disponha, meu bem! 😘 Agora para de enrolar e vem fazer essa tattoo logo! Tô esperando... 😤';
        }
        if (msg.includes('tchau') || msg.includes('bye') || msg.includes('flw')) {
            return 'Já vai embora?! 😱 Volta aqui que ainda não terminamos! Mas se for mesmo... tchau, sumido! 👋😢';
        }
        
        // Saudações
        if (msg.includes('oi') || msg.includes('ola') || msg.includes('bom dia') || msg.includes('boa tarde')) {
            const saudacoes = [
                'Eaí, beleza? 😎 Bora tatuar hoje?',
                'Opa! Chegou mais um corajoso! 🔥',
                'Olá, criatura! Pronto pra virar arte ambulante? 🎨',
                'E aí, meu consagrado! Que tattoo vamos fazer? 😏'
            ];
            return saudacoes[Math.floor(Math.random() * saudacoes.length)];
        }
        
        // Xingamentos carinhosos para perguntas não reconhecidas
        const respostasRaivosas = [
            'Ô meu filho, não entendi nada! 🤨 Pergunta direito: horários, preços, estilos... Ou vai pro WhatsApp que lá tem gente de verdade!',
            'Caramba, que pergunta é essa?! 😤 Fala sobre tattoo, oras! Horário, preço, estilo... Básico!',
            'Ai ai ai... 🙄 Não sou adivinha não! Pergunta sobre o estúdio: localização, agendamento, cuidados... Vai!',
            'Rapaz, tá difícil hoje! 😅 Tenta perguntar sobre nossos serviços ou manda um WhatsApp que é mais fácil!'
        ];
        return respostasRaivosas[Math.floor(Math.random() * respostasRaivosas.length)];
    }
}

// Inicializar chatbot quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new InkFlowChatbot();
});