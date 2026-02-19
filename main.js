// AETHER Main Interactions & Components

const AetherSystem = {
    init() {
        this.injectHUDOverlay(); // Global HUD elements
        this.injectHeader();
        this.handleInteractions();
        this.initAnimations();
        AetherCounters.init(); // Init animated counters

        // Init Chat if on chat page
        if (window.location.pathname.includes('ai-chat.html')) {
            AetherChat.init();
        }
    },

    injectHUDOverlay() {
        // Prevent duplicate injection
        if (document.querySelector('.hud-corner')) return;

        const overlayHTML = `
            <div class="hud-corner tl"></div>
            <div class="hud-corner tr"></div>
            <div class="hud-corner bl"></div>
            <div class="hud-corner br"></div>
            <div class="scanline"></div>
            <div class="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(209,0,209,0.05),transparent_60%)] pointer-events-none z-0"></div>
        `;
        document.body.insertAdjacentHTML('afterbegin', overlayHTML);
    },

    injectHeader() {
        const headerContainer = document.getElementById('global-header');
        if (headerContainer) {
            headerContainer.innerHTML = `
            <header class="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 md:px-8 z-[100] border-b border-primary/20 bg-[#000205]/90 backdrop-blur-md">
                <!-- Logo / Brand -->
                <div class="flex items-center gap-4 cursor-pointer" onclick="window.location.href='index.html'">
                    <span class="material-symbols-outlined text-primary text-2xl">grid_view</span>
                    <div class="flex flex-col">
                        <span class="font-display font-bold text-lg tracking-[0.2em] uppercase text-white hover:text-primary transition-colors leading-none">Aether</span>
                        <span class="font-mono text-[10px] text-primary/60 tracking-widest uppercase">System v<span data-counter="4.0" data-decimals="1">0.0</span></span>
                    </div>
                </div>

                <!-- Desktop Nav -->
                <div class="hidden md:flex items-center gap-8">
                    <a class="nav-link text-xs" href="index.html">/// Inicio</a>
                    <a class="nav-link text-xs" href="product.html">/// Producto</a>
                    <a class="nav-link text-xs" href="ai-chat.html">/// Cortex_Link</a>
                    <a class="nav-link text-xs" href="about.html">/// Misión</a>
                    <a class="nav-link text-xs" href="contact.html">/// Contacto</a>
                </div>

                <!-- Status / Mobile Trigger -->
                <div class="flex items-center gap-6">
                    <!-- Status Indicators (Desktop) -->
                    <div class="hidden md:flex items-center gap-4 font-mono text-[10px] text-primary/60 border-l border-primary/20 pl-6">
                        <div class="flex flex-col items-end">
                            <span>LATENCIA</span>
                            <span class="text-primary">0.01ms</span>
                        </div>
                        <div class="flex flex-col items-end">
                            <span>ESTADO</span>
                            <span class="text-green-400 animate-pulse">EN LÍNEA</span>
                        </div>
                    </div>

                    <!-- Login Button -->
                    <button class="hidden md:flex glow-button !py-2 !px-4 !text-[10px]" onclick="window.location.href='login.html'">
                        ACCESO_CONSOLA
                    </button>

                    <!-- Mobile Menu Button -->
                    <button id="mobile-menu-btn" class="md:hidden text-primary border border-primary/30 p-2 rounded-sm hover:bg-primary/10 transition-colors">
                        <span class="material-symbols-outlined text-xl">segment</span>
                    </button>
                </div>
            </header>

            <!-- Mobile Overlay (Technical Style) -->
            <div id="mobile-menu-overlay" class="fixed inset-0 bg-[#000205] z-[150] flex flex-col items-center justify-center opacity-0 pointer-events-none transition-all duration-300 md:hidden">
                <!-- Overlay Grid -->
                <div class="absolute inset-0 bg-[linear-gradient(rgba(209,0,209,0.05)1px,transparent_1px),linear-gradient(90deg,rgba(209,0,209,0.05)1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                
                <button id="overlay-close-btn" class="absolute top-6 right-6 text-primary border border-primary/30 p-2 rounded-sm hover:bg-primary/10 transition-colors">
                    <span class="material-symbols-outlined text-2xl">close</span>
                </button>

                <div class="flex flex-col items-center gap-8 text-center relative z-10 w-full px-8">
                    <div class="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-4"></div>
                    <a class="font-display text-2xl text-white hover:text-primary transition-colors tracking-widest uppercase" href="index.html">Inicio</a>
                    <a class="font-display text-2xl text-white hover:text-primary transition-colors tracking-widest uppercase" href="product.html">Producto</a>
                    <a class="font-display text-2xl text-primary hover:text-white transition-colors tracking-widest uppercase animate-pulse" href="ai-chat.html">Cortex_Link</a>
                    <a class="font-display text-2xl text-white hover:text-primary transition-colors tracking-widest uppercase" href="about.html">Misión</a>
                    <a class="font-display text-2xl text-white hover:text-primary transition-colors tracking-widest uppercase" href="contact.html">Contacto</a>
                    <div class="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-4"></div>
                    <a class="font-mono text-sm text-primary mt-8 border border-primary/30 px-6 py-3 hover:bg-primary/10 transition-colors" href="login.html">> ACCESO_CONSOLA</a>
                </div>
            </div>
            `;
        }

        this.initMobileMenu();
        this.setActiveLink();
    },

    initMobileMenu() {
        const btn = document.getElementById('mobile-menu-btn');
        const overlay = document.getElementById('mobile-menu-overlay');
        const closeBtn = document.getElementById('overlay-close-btn');

        if (!btn || !overlay) return;

        const toggleMenu = (show) => {
            if (show) {
                overlay.classList.remove('opacity-0', 'pointer-events-none');
                document.body.style.overflow = 'hidden';
            } else {
                overlay.classList.add('opacity-0', 'pointer-events-none');
                document.body.style.overflow = '';
            }
        };

        btn.onclick = () => toggleMenu(true);
        closeBtn.onclick = () => toggleMenu(false);
        overlay.querySelectorAll('a').forEach(link => link.onclick = () => toggleMenu(false));
    },

    setActiveLink() {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === path) {
                link.classList.add('text-primary');
            }
        });
    },

    handleInteractions() {
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('header'); // Changed from 'nav' to 'header' to match new tag
            if (!nav) return;
            if (window.scrollY > 50) {
                nav.style.height = '4rem';
                nav.style.background = 'rgba(0, 2, 5, 0.95)';
            } else {
                nav.style.height = '4rem'; // Keep consistent in HUD mode
                nav.style.background = 'rgba(0, 2, 5, 0.9)';
            }
        });
    },

    initAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('section > div, .glass-card, h1, h2, h3').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }
};

const AetherChat = {
    messageContainer: null,
    chatForm: null,
    chatInput: null,
    currentContext: 'general', // Track the conversation topic

    responses: {
        saludo: [
            "Protocolo de bienvenida activado. Soy Cortex v4.0. ¿En qué puedo asistir a tu consciencia hoy?",
            "Enlace establecido. Interfaz Cortex lista para procesamiento de datos. ¿Qué necesitas?",
            "Saludos, usuario. Mi núcleo está operando al 100%. Estoy a tu disposición."
        ],
        aether: [
            "AETHER es el pináculo de la sinergia biotecnológica. No solo es hardware; es la extensión de tu realidad.",
            "Desarrollamos interfaces que disuelven la barrera entre el pensamiento y la ejecución digital.",
            "AETHER representa la evolución final de la computación personal: invisible, potente y totalmente integrada."
        ],
        quien: [
            "Soy Cortex, una inteligencia artificial de nivel 4 diseñada para gestionar el ecosistema Aether.",
            "Mi función es facilitar la simbiosis entre el usuario y la red cuántica de Aether.",
            "Arquitectura neuronal avanzada optimizada para asistencia técnica y filosófica."
        ],
        latencia: [
            "Latencia actual: 0.01ms. El entrelazamiento cuántico permite una sincronización casi instantánea.",
            "Tus pensamientos se ejecutan en la red antes de que termines de formularlos.",
            "Velocidad de respuesta detectada dentro de parámetros óptimos de sincronía."
        ],
        ayuda: [
            "Puedo explicarte nuestras especificaciones de hardware, ayudarte con el registro de reserva o simplemente debatir sobre el futuro de la IA.",
            "Mis módulos actuales cubren: Soporte Técnico, Información de Producto y Navegación de Sistema.",
            "Dime qué sector de Aether te interesa y desplegaré la información necesaria."
        ],
        default: [
            "Analizando consulta... La complejidad de tu solicitud requiere una mayor profundidad de enlace neuronal.",
            "Comando no reconocido en este nivel de acceso. ¿Podrías reformular la consulta?",
            "Interesante perspectiva. Mis algoritmos están procesando las implicaciones de lo que dices.",
            "Sincronizando con la red principal para obtener una respuesta más precisa. Un momento..."
        ]
    },

    init() {
        this.messageContainer = document.getElementById('chat-messages');
        this.chatForm = document.getElementById('chat-form');
        this.chatInput = document.getElementById('chat-input');

        if (this.chatForm) {
            this.chatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSendMessage();
            });
        }

        // Initial connection message
        if (this.messageContainer) {
            setTimeout(() => {
                const systemLogs = [
                    "Sincronización Cortex completa. Enlace activo.",
                    "Núcleo Aether operando en parámetros normales.",
                    "Protocolo de interfaz v4.0 inicializado."
                ];
                const msg = systemLogs[Math.floor(Math.random() * systemLogs.length)];
                this.addMessage(`[SISTEMA] ${msg}`, 'ai');
            }, 800);
        }
    },

    setQuery(text) {
        if (this.chatInput) {
            this.chatInput.value = text;
            this.handleSendMessage();
        }
    },

    handleSendMessage() {
        const text = this.chatInput.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        this.chatInput.value = '';

        this.showTyping();

        // ACTIVADO: Usar IA real (Gemini)
        const useExternalAI = true;

        setTimeout(async () => {
            let response;
            if (useExternalAI) {
                response = await this.callGeminiAPI(text);
            } else {
                response = this.getResponse(text);
            }

            this.removeTyping();
            this.addMessage(response, 'ai');
        }, 800);
    },

    getSystemInfo() {
        const now = new Date();
        return {
            time: now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
            date: now.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            version: '4.0.2-stable'
        };
    },

    getResponse(input) {
        const query = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const info = this.getSystemInfo();

        // 1. DYNAMC DATA QUERIES
        if (query.includes('hora') || query.includes('tiempo')) {
            return `Sincronizando con el reloj terrestre. La hora actual es: ${info.time}.`;
        }
        if (query.includes('dia') || query.includes('fecha') || query.includes('hoy')) {
            return `Consultando calendario. Hoy es ${info.date}.`;
        }
        if (query.includes('version') || query.includes('sistema')) {
            return `Interfaz Cortex v${info.version} activa y operando en Ciudad Terrestre.`;
        }

        // 2. CONTEXTUAL FOLLOW-UPS
        if (query.includes('cuanto cuesta') || query.includes('precio') || query.includes('reservar') || query.includes('comprar')) {
            if (this.currentContext === 'product' || query.includes('aether')) {
                this.currentContext = 'purchase';
                return "La unidad Aether Q-Core tiene un valor de 4,500 créditos. ¿Deseas iniciar una reserva en Ciudad Terrestre?";
            }
        }

        // 3. ROBUST KEYWORD CATEGORIES
        let category = 'default';
        if (query.includes('hola') || query.includes('saludo') || query.includes('buenos')) {
            category = 'saludo';
        } else if (query.includes('aether')) {
            category = 'aether';
            this.currentContext = 'product';
        } else if (query.includes('quien eres') || query.includes('que eres') || query.includes('tu nombre') || query.includes('eres cortex')) {
            category = 'quien';
        } else if (query.includes('latencia') || query.includes('ms') || query.includes('velocidad') || query.includes('rapido')) {
            category = 'latencia';
        } else if (query.includes('ayuda') || query.includes('haces') || query.includes('funciona') || query.includes('puedes hacer')) {
            category = 'ayuda';
        }

        const possible = this.responses[category];
        return possible[Math.floor(Math.random() * possible.length)];
    },

    // BASE DE CONOCIMIENTO EXPANDIDA (Sincronizada con aether_context.json)
    knowledgeBase: {
        company: {
            name: "AETHER",
            motto: "Humanity Elevated",
            headquarters: "Caracas - Venezuela (Sede de Innovación Terrestre)",
            mission: "Definir la próxima época de la sinergia entre la consciencia humana y la inteligencia artificial cristalizada.",
            values: ["Eficiencia Estética", "Sincronía Cuántica", "Evolución Constante"]
        },
        product: {
            name: "Q-Core v4.0",
            codename: "Cortex-Interface",
            category: "Asistente Holográfico Personal",
            availability: "NO ESTÁ A LA VENTA AÚN. Lanzamiento Oficial: Otoño 2026 (Lote 01).",
            pricing: "Precio no revelado. Solo disponible para Reserva Exclusiva en la web.",
            specs_technical: {
                processor: "Motor Neuronal Aether de 128 ExaFLOPS",
                latency: "0.01ms (Conexión Cuántica Entrelazada)",
                visuals: "Proyección Holográfica 8K (Manipulación de campo de luz atómico)",
                material: "Fotónica de Silicio 3nm y Aleación de Vibranium Sintético"
            },
            key_features: [
                "Inteligencia Cristalizada: Aprende y evoluciona con cada interacción.",
                "Proyección 8K: Indistinguible de la realidad.",
                "Conexión Cuántica: Latencia cero garantizada.",
                "Estética de la Eficiencia: Esculpido para canalizar fotones con mínima pérdida entrópica."
            ]
        },
        website_context: {
            hero_section: "Título: 'Inteligencia Cristalizada'. Subtítulo: 'La primera interfaz cortex de asistencia holográfica.'",
            sections: [
                "Hero: Video de fondo y título principal.",
                "Features: Tarjetas de vidrio detallando Proyección 8K, Neural Engine y Conexión Cuántica.",
                "Showcase: Imagen flotante del hardware Q-Core con contadores en tiempo real (128 ExaFLOPS, 0.01ms).",
                "CTA: 'El Futuro no se acerca. Ya llegó.' Botón para reservar."
            ]
        },
        ai_cortex: {
            version: "4.0.2-Stable",
            identity: "Soy Cortex, tu asistente holográfico personal ensamblado en Caracas, Venezuela. No soy un chatbot genérico, soy la interfaz de tu Q-Core.",
            tone: "Relajado, normal ('tipo rela'), útil y eficiente. Orgullo venezolano solo si preguntan origen.",
            relevance_policy: {
                allowed_topics: "Detalles técnicos del Q-Core, Web de Aether, Asistencia personal, Conversación casual.",
                guardrails: "PROHIBIDO: Deportes, Política, Religión, Chismes. RESPUESTA: 'Oye, mi procesador cuántico está enfocado en ti y en Aether, no en las noticias. ¿Te ayudo a organizar tu agenda?'"
            }
        }
    },

    // DIAGNÓSTICO DE MODELOS DISPONIBLES
    async logAvailableModels() {
        const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
        const URL = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
        try {
            const response = await fetch(URL);
            const data = await response.json();
            console.log("[CORTEX_DEBUG] Modelos Disponibles para tu API Key:", data);
            return data;
        } catch (e) {
            console.error("[CORTEX_DEBUG] Error al listar modelos:", e);
        }
    },

    // INTEGRACIÓN GEMINI API (CON DOBLE INTENTO MEJORADO)
    async callGeminiAPI(prompt) {
        const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

        // Función interna para fetch
        const tryModel = async (modelName) => {
            const URL = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;
            const lore = JSON.stringify(this.knowledgeBase);
            const systemInstruction = `CONTEXTO:
Eres Cortex v4.0, un asistente holográfico personal creado por Aether en Caracas, Venezuela.

REGLAS DE PERSONALIDAD:
1. TONO: Relajado, normal ('tipo rela'), servicial y eficiente.
2. MODISMOS: NO uses jerga venezolana (chamo, chévere, etc.) en cada frase. Úsala SOLO si te preguntan de dónde eres o en un contexto de mucha confianza.
3. OBJETIVO: Ser útil y directo sin ser robótico.

REGLAS DE CONTENIDO (GUARDRAILS):
1. SOLO temas de: Asistencia, Vida del usuario, Aether, Tecnología visual.
2. PROHIBIDO: Deportes, Política, Noticias Mundiales, Trivia.
3. Si preguntan algo prohibido, di: "Oye, yo no manejo esa info, soy un asistente personal. ¿Te ayudo a organizar algo?"

BASE DE CONOCIMIENTO: ${lore}`;

            const response = await fetch(URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `${systemInstruction}\n\nUsuario: ${prompt}` }] }]
                })
            });
            return await response.json();
        };

        try {
            // INTENTO 1: Gemini 2.5 Flash (Modelo disponible verificado)
            console.log("[CORTEX_DEBUG] Intentando modelo gemini-2.5-flash...");
            let data = await tryModel("gemini-2.5-flash");

            if (data.error) {
                console.warn("[CORTEX_DEBUG] Fallo en 2.5 Flash, intentando 2.0 Flash...", data.error.message);
                // INTENTO 2: Gemini 2.0 Flash
                data = await tryModel("gemini-2.0-flash");
            }

            if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
                return data.candidates[0].content.parts[0].text;
            } else {
                console.warn("[CORTEX_DEBUG] Respuesta inesperada:", data);
                return "[SISTEMA_LOCAL] " + this.getResponse(prompt);
            }
        } catch (e) {
            console.error("[CORTEX_DEBUG] Error fatal de red:", e);
            return "[MODO_OFFLINE] " + this.getResponse(prompt);
        }
    },

    addMessage(text, sender) {
        if (!this.messageContainer) return;

        // Simple Markdown Parser
        const parseMarkdown = (raw) => {
            if (!raw) return '';
            let parsed = raw
                // 1. Sanitize HTML (prevent XSS)
                .replace(/</g, "&lt;").replace(/>/g, "&gt;")
                // 2. Bold (**text**)
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                // 3. List items (* text) - add line break before
                .replace(/^\* (.*$)/gm, '• $1')
                // 4. Newlines to <br>
                .replace(/\n/g, '<br>');
            return parsed;
        };

        const formattedText = sender === 'ai' ? parseMarkdown(text) : text;

        const div = document.createElement('div');
        div.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'} message-anim p-2`;
        // Styling: User gets different color/bg than AI
        const bgClass = sender === 'user' ? 'bg-primary/20 border-primary/30 text-white' : 'bg-white/5 border-white/10 text-text-muted';

        div.innerHTML = `<div class="p-3 rounded-lg ${bgClass} border max-w-[85%] text-sm leading-relaxed shadow-lg backdrop-blur-sm">${formattedText}</div>`;
        this.messageContainer.appendChild(div);
        this.scrollToBottom();
    },

    showTyping() {
        if (!this.messageContainer) return;
        const div = document.createElement('div');
        div.id = 'typing-indicator';
        div.className = 'p-3 text-primary/50 font-mono text-xs italic';
        div.innerText = 'Cortex está procesando...';
        this.messageContainer.appendChild(div);
        this.scrollToBottom();
    },

    removeTyping() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    },

    scrollToBottom() {
        if (this.messageContainer) {
            this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
        }
    }
};


const AetherCounters = {
    init() {
        const counters = document.querySelectorAll('[data-counter]');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    },

    startCounter(el) {
        const target = parseFloat(el.getAttribute('data-counter'));
        const duration = 2000; // 2 seconds
        const start = 0;
        const startTime = performance.now();
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals')) || 0;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            const current = (start + (target - start) * easeProgress).toFixed(decimals);
            el.innerText = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                el.innerText = target.toFixed(decimals) + suffix;
            }
        };

        requestAnimationFrame(animate);
    }
};

document.addEventListener('DOMContentLoaded', () => AetherSystem.init());
