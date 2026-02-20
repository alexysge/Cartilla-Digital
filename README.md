# 🧒 Cartilla Verde Digital - Prototipo de Captura

Un prototipo web interactivo diseñado para la digitalización y captura eficiente de datos clínicos infantiles, basado en los lineamientos de la Cartilla Nacional de Salud. 

Este proyecto fue desarrollado como parte del servicio social en la **Dirección de Innovación y Desarrollo Tecnológico del IMSS**, con el objetivo de modernizar y agilizar el registro médico en el primer nivel de atención. Este prototipo lo recibi iniciado
en html, css y js puro ya que se inicio con Claude para poder tener un prototipo rápido que los doctores pudieran probar e interactuar para mejorar sus requisitos. El proyecto crecia semana a semana por lo que decidí hacer estilos especificos para muchas cosas
ignorando que el proyecto iba a crecer mucho. El proyecto es en un solo archivo para facilitar su uso para los doctores que no conocen las herramientas.

## 📋 Descripción del Proyecto

El sistema consolida múltiples formularios de evaluación pediátrica en una interfaz de una sola página (SPA). Permite a los profesionales de la salud registrar antecedentes, evaluar el desarrollo psicomotor, llevar el control de vacunación y monitorear el estado nutricional mediante cálculos automáticos y lógica condicional.

## ✨ Características Principales

* **Arquitectura Monolítica Funcional:** Todo el prototipo (estructura, estilos y lógica) está contenido en un solo archivo para facilitar su despliegue, prueba y distribución rápida sin necesidad de un servidor local.
* **Navegación Intuitiva:** Sistema de pestañas fluido que separa la información en 8 módulos clínicos (Antecedentes, Promoción, Desarrollo, Nutrición, Vacunación, Prevención, Detección y Derivaciones).
* **Cálculos Clínicos Automatizados:** * Cálculo en tiempo real del Índice de Masa Corporal (IMC).
  * Evaluación automatizada del estado nutricional con alertas visuales.
* **Lógica Condicional Compleja:**
  * **Semáforo de Desarrollo Infantil:** Evalúa los hitos psicomotores del paciente según su edad exacta y genera un diagnóstico visual (Verde, Amarillo, Rojo) basado en signos de alarma.
  * Formularios dinámicos que revelan u ocultan campos según las respuestas previas del usuario (ej. registro de ESAVI en vacunas).
* **Gestión de Estado Local:** Capacidad de guardar "borradores" en tiempo real para evitar la pérdida de información durante la captura prolongada.

## 🎯 Enfoque en Calidad (QA) y Validaciones

Para asegurar la integridad de los datos médicos, el prototipo incluye estrictas reglas de validación en el lado del cliente (Front-end):

* **Validación de Fechas:** Bloqueo de fechas futuras y prevención de registros de agudeza visual/vacunación con fechas anteriores al nacimiento del paciente.
* **Manejo de Casos Límite (Edge Cases):** Prevención de envíos de formularios incompletos, bloqueando interacciones si faltan campos obligatorios críticos como el tipo de parto o el peso al nacer.
* **Consistencia de Datos:** Interfaz reactiva que desmarca y limpia sub-formularios automáticamente si el usuario revierte una decisión principal (ej. desmarcar un tamizaje limpia sus fechas y resultados asociados).

## 🛠️ Tecnologías Utilizadas

El proyecto está construido puramente con tecnologías web nativas (Vanilla Web), asegurando máxima compatibilidad y rendimiento sin dependencias de terceros:

* **HTML5:** Semántica web y estructuración de formularios complejos.
* **CSS3:** Flexbox y CSS Grid para diseño responsivo. Uso intensivo de selectores y variables de interfaz.
* **JavaScript (ES6+):** Manipulación dinámica del DOM, Event Listeners, y manejo de objetos para la simulación de bases de datos locales (historiales de pacientes).

## 🚀 Cómo ejecutar el proyecto

Al ser un prototipo nativo, no requiere instalación de dependencias ni entornos de ejecución (Node.js, servidores locales, etc.).

1. Clona este repositorio:
   ```bash
   git clone https://github.com/alexysge/Cartilla-Digital/

2. Navega a la carpeta del proyecto.

3. Abre el archivo prototipo.html directamente en cualquier navegador web moderno (Chrome, Firefox, Edge, Safari).

## 🔒 Consideraciones de Seguridad y Datos

Este repositorio contiene únicamente el código del prototipo (Front-end).

No está conectado a ninguna base de datos real en producción.

Los datos mostrados en la interfaz (como "Ana Sofía Martínez López") son datos ficticios de prueba (mock data) utilizados con fines demostrativos.

No contiene credenciales, tokens de API, ni información sensible (PHI/PII).

## 👨‍💻 Capturas de pantalla del proyecto
<img width="1032" height="932" alt="readme1" src="https://github.com/user-attachments/assets/8e9e9858-5919-4c53-b156-69ae6886b5aa" />
<img width="1032" height="932" alt="readme2" src="https://github.com/user-attachments/assets/8aaec783-2398-48b6-9eeb-fd934fd62042" />
<img width="1032" height="932" alt="readme3" src="https://github.com/user-attachments/assets/827af8f4-4963-41f0-92eb-8a01d975aca7" />
<img width="1032" height="932" alt="readme4" src="https://github.com/user-attachments/assets/6c774b95-39a7-4fff-b405-eb72f7056d9e" />
<img width="1032" height="932" alt="readme5" src="https://github.com/user-attachments/assets/400770b9-8908-4570-928f-1858574cfe80" />
<img width="1032" height="932" alt="readme6" src="https://github.com/user-attachments/assets/1c306862-9fa4-4aa7-bb57-76f3fdda11f8" />



