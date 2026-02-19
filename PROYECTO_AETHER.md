# 🌌 AETHER: El Futuro de la Interacción Humano-IA

> **Proyecto Final: Desarrollo Web Avanzado**
> **Nombre del Producto:** Q-Core v4.0 (Interfaz Cortex)

---

## 🚀 1. Visión General del Proyecto

**AETHER** es una plataforma web futurista diseñada para presentar el **Q-Core v4.0**, el primer asistente holográfico personal del mundo. El proyecto combina un diseño visual impactante (estética Cyberpunk/HUD) con tecnología de IA real de última generación para ofrecer una experiencia inmersiva única.

El objetivo central es demostrar cómo una interfaz de usuario altamente visual puede coexistir con una lógica de asistencia inteligente, creando la sensación de estar operando un sistema informático del futuro.

---

## ✨ 2. Características Principales

### 🧠 Cortex AI (El Cerebro)

Cortex no es un simple chatbot. Es una integración directa con el modelo **Gemini 1.5/2.0 Flash** de Google, dotado de una personalidad única:

- **Identidad Local:** Fue concebido con raíces venezolanas, lo que le permite interactuar de forma relajada y empática (_tipo rela_).
- **Conocimiento del Producto:** Conoce cada especificación técnica del Q-Core (128 ExaFLOPS, Latencia de 0.01ms, etc.).
- **Guardrails:** Incluye protocolos de seguridad para mantenerse enfocado en asistencia y evitar temas irrelevantes (deportes, política).

### 🖥️ Interfaz HUD (Heads-Up Display)

- **Diseño Futurista:** Uso de cuadrículas visuales, líneas de escaneo y una paleta de colores neón (Púrpura y Rojo Aether).
- **Contadores Animados:** Las especificaciones técnicas cobran vida con animaciones de conteo rápido al cargar las secciones.
- **Responsive Pro:** Adaptado para funcionar perfectamente tanto en ordenadores de alta gama como en dispositivos móviles.

---

## 🛠️ 3. Especificaciones Técnicas

| Tecnología        | Descripción                                          |
| :---------------- | :--------------------------------------------------- |
| **Frontend**      | HTML5, CSS3, JavaScript (Vanilla)                    |
| **Framework CSS** | Tailwind CSS (Configuración personalizada)           |
| **Motor de IA**   | Google Gemini API (Model fallback system)            |
| **Diseño**        | Glassmorphism, HUD Framework, Animaciones por Scroll |
| **Localización**  | Soporte para contextos regionales (Venezuela/Global) |

---

## 🕹️ 4. Guía de Interacción para Evaluación

Para interactuar con el sistema y verificar su funcionamiento, siga estos pasos:

1.  **Exploración Visual:** Navegue por la página de inicio para observar los efectos de _parallax_ y los contadores de potencia.
2.  **Interfaz de Chat:** Diríjase a la sección de chat (Cortex).
3.  **Pruebas de Inteligencia:**
    - Pregúntele: _"¿Qué es Aether?"_ (Verificará el conocimiento de marca).
    - Pregúntele: _"¿De dónde eres?"_ (Verificará su identidad personalizada).
    - Pregúntele por el precio: _"¿Cuánto cuesta?"_ (Verificará la información de disponibilidad actualizada).
4.  **Formateo:** Observe cómo Cortex responde usando negritas y listas claras para facilitar la lectura.

---

## ⚙️ Configuración y Seguridad

Para garantizar la seguridad del proyecto y proteger las claves de API, se ha implementado un sistema de variables de entorno:

1.  **Archivo `.env`**: Las claves sensibles se almacenan en la raíz en un archivo `.env` (no incluido en el repositorio).
2.  **Referencia**: `VITE_GEMINI_API_KEY=tu_api_key`.
3.  **Seguridad**: El archivo `.gitignore` ha sido configurado para excluir archivos `.env` de cualquier commit público.

---

## 📂 5. Estructura de Archivos

- `index.html`: Portal principal y Hero Section.
- `product.html`: Detalles técnicos del hardware.
- `main.js`: Lógica central, integración de API y animaciones.
- `style.css`: Definición del sistema visual HUD y variables de color.
- `aether_context.json`: Base de conocimiento que alimenta a la IA.

---

> _"El futuro no se acerca. Ya llegó."_
> **Aether Corp - 2026**
