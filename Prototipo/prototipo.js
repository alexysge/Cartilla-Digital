        // Funcionalidad de pestañas
        document.addEventListener('DOMContentLoaded', function () {
            const tabButtons = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');

            tabButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const targetTab = this.getAttribute('data-tab');
                    // Remover clase active de todos los botones y contenidos
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));
                    // Agregar clase active al botón clickeado y su contenido correspondiente
                    this.classList.add('active');
                    document.getElementById(targetTab).classList.add('active');
                });
            });

            // Funcionalidad para checkboxes de promoción
            const promocionCheckboxes = document.querySelectorAll('.promocion-checkbox');
            promocionCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function () {
                    const parentItem = this.closest('.promocion-item');
                    const dateGroup = parentItem.querySelector('.promocion-date-group');
                    if (this.checked) {
                        parentItem.classList.add('selected');
                        dateGroup.classList.add('show');
                    } else {
                        parentItem.classList.remove('selected');
                        dateGroup.classList.remove('show');
                        // Limpiar la fecha cuando se desmarca
                        const dateInput = dateGroup.querySelector('.date-input');
                        if (dateInput) {
                            dateInput.value = '';
                        }
                    }
                });
            });

            // Funcionalidad para checkboxes normales
            const checkboxItems = document.querySelectorAll('.checkbox-item');
            checkboxItems.forEach(item => {
                const checkbox = item.querySelector('.checkbox-input');
                if (checkbox) {
                    checkbox.addEventListener('change', function () {
                        if (this.checked) {
                            item.classList.add('checked');
                        } else {
                            item.classList.remove('checked');
                        }
                    });
                }
            });

            // Funcionalidad del selector de edad
            const edadSelector = document.getElementById('edad_nino');
            const ageQuestionsSections = document.querySelectorAll('.age-questions-section');
            const noAgeMessage = document.getElementById('no-age-message');

            edadSelector?.addEventListener('change', function () {
                const selectedAge = this.value;
                // Ocultar todas las secciones de preguntas
                ageQuestionsSections.forEach(section => {
                    section.style.display = 'none';
                });

                if (selectedAge) {
                    // Ocultar mensaje de "no edad seleccionada"
                    noAgeMessage.style.display = 'none';
                    // Mostrar la sección correspondiente a la edad seleccionada
                    const targetSection = document.getElementById(`questions-${selectedAge}`);
                    if (targetSection) {
                        targetSection.style.display = 'block';
                    }
                } else {
                    // Mostrar mensaje de "no edad seleccionada"
                    noAgeMessage.style.display = 'block';
                }
            });

            // Funcionalidad para radio buttons de desarrollo
            const radioItems = document.querySelectorAll('.radio-item');
            radioItems.forEach(item => {
                const radio = item.querySelector('.radio-input');
                if (radio) {
                    radio.addEventListener('change', function () {
                        // Remover clase selected de todos los radio items del mismo grupo
                        const groupName = this.name;
                        const sameGroupItems = document.querySelectorAll(`input[name="${groupName}"]`);
                        sameGroupItems.forEach(groupRadio => {
                            const parentItem = groupRadio.closest('.radio-item');
                            if (parentItem) {
                                parentItem.classList.remove('selected');
                            }
                        });
                        // Agregar clase selected al item actual
                        item.classList.add('selected');
                    });
                }
            });

            // Funcionalidad para tamizajes
            const tamizCheckboxes = document.querySelectorAll('.tamiz-checkbox');
            tamizCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function () {
                    const tamizItem = this.closest('.tamiz-item');
                    const details = tamizItem.querySelector('.tamiz-details');
                    if (this.checked) {
                        tamizItem.classList.add('selected');
                        details.classList.add('show');
                    } else {
                        tamizItem.classList.remove('selected');
                        details.classList.remove('show');
                        // Limpiar campos cuando se desmarca
                        const dateInput = details.querySelector('input[type="date"]');
                        const textArea = details.querySelector('textarea');
                        if (dateInput) dateInput.value = '';
                        if (textArea) textArea.value = '';
                    }
                });
            });

            // Funcionalidad de botones de limpiar
            document.getElementById('limpiarAntecedentes')?.addEventListener('click', function () {
                if (confirm('¿Está seguro de que desea limpiar todos los campos del formulario de antecedentes?')) {
                    document.getElementById('antecedentesForm').reset();
                    // Remover clases checked de los checkboxes
                    document.querySelectorAll('#antecedentes .checkbox-item').forEach(item => {
                        item.classList.remove('checked');
                    });
                    // Remover clases selected de tamizajes
                    document.querySelectorAll('#antecedentes .tamiz-item').forEach(item => {
                        item.classList.remove('selected');
                        const details = item.querySelector('.tamiz-details');
                        if (details) details.classList.remove('show');
                    });
                }
            });

            document.getElementById('limpiarPromocion')?.addEventListener('click', function () {
                if (confirm('¿Está seguro de que desea limpiar todos los campos del formulario de promoción?')) {
                    limpiarFormularioPromocion();

                    // También limpiar historial si se desea
                    if (confirm('¿También desea limpiar el historial de promociones guardadas?')) {
                        document.getElementById('historialPromociones').innerHTML = '';
                        document.getElementById('historialPromocion').style.display = 'none';
                    }
                }
            });

            document.getElementById('limpiarDesarrollo')?.addEventListener('click', function () {
                if (confirm('¿Está seguro de que desea limpiar todos los campos del formulario de desarrollo?')) {
                    // Limpiar campos básicos
                    document.getElementById('fecha_evaluacion_desarrollo').value = '';
                    // Resetear selector de edad
                    document.getElementById('edad_nino').value = '';
                    // Ocultar todas las secciones de preguntas y mostrar mensaje por defecto
                    ageQuestionsSections.forEach(section => {
                        section.style.display = 'none';
                    });
                    noAgeMessage.style.display = 'block';
                    // Limpiar todos los radio buttons y remover clases selected
                    document.querySelectorAll('#desarrollo .radio-input').forEach(radio => {
                        radio.checked = false;
                    });
                    document.querySelectorAll('#desarrollo .radio-item').forEach(item => {
                        item.classList.remove('selected');
                    });
                }
            });

            // Funcionalidad de botones de guardar
            document.getElementById('guardarAntecedentes')?.addEventListener('click', function (e) {
                e.preventDefault();
                alert('Antecedentes guardados correctamente');
            });

            document.getElementById('guardarPromocion')?.addEventListener('click', function (e) {
                e.preventDefault();
                guardarPromocionesAlHistorial();
            });

            document.getElementById('guardarDesarrollo')?.addEventListener('click', function () {
                alert('Datos de desarrollo infantil guardados correctamente');
            });

            // Funcionalidad de borradores
            document.getElementById('guardarBorradorAnt')?.addEventListener('click', function () {
                alert('Borrador de antecedentes guardado');
            });

            document.getElementById('guardarBorradorProm')?.addEventListener('click', function () {
                alert('Borrador de promoción guardado');
            });

            document.getElementById('guardarBorradorDes')?.addEventListener('click', function () {
                alert('Borrador de desarrollo guardado');
            });

            // Funcionalidad de agregar otros
            document.getElementById('agregarOtro')?.addEventListener('click', function () {
                const select = document.getElementById('otrosSelect');
                const fecha = document.getElementById('fecha_otros').value;
                const container = document.getElementById('otrosAgregados');
                const texto = select.options[select.selectedIndex].text;
                const valor = select.value;

                if (!valor || !fecha) {
                    alert('Por favor selecciona una acción y una fecha.');
                    return;
                }

                const nuevoItem = document.createElement('div');
                nuevoItem.classList.add('promocion-item', 'selected');
                nuevoItem.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <strong>${texto}</strong><br>
                            <span style="color:#7f8c8d;">Fecha: ${fecha}</span>
                        </div>
                        <button type="button" class="btn btn-outline" style="padding: 5px 10px; font-size: 12px;" onclick="this.parentElement.parentElement.remove()">🗑️</button>
                    </div>
                `;
                container.appendChild(nuevoItem);

                // Limpiar selección
                select.selectedIndex = 0;
                document.getElementById('fecha_otros').value = '';
            });
        });

        // Funciones corregidas para el historial de promociones

        function guardarPromocionesAlHistorial() {
            const estadoCartilla = document.getElementById('estadoCartilla').value;
            const estadoCartillaTexto = document.getElementById('estadoCartilla').options[document.getElementById('estadoCartilla').selectedIndex].text;

            if (!estadoCartilla) {
                alert('Por favor seleccione el estado de la Cartilla Nacional de Salud');
                return;
            }

            let promocionesSeleccionadas = [];

            // Obtener promociones principales seleccionadas (NUEVA ESTRUCTURA)
            const promocionesCheckboxes = document.querySelectorAll('.promocion-checkbox');
            promocionesCheckboxes.forEach(checkbox => {
                if (checkbox.checked && checkbox.id !== 'otros') {
                    // Buscar el item padre
                    const parentItem = checkbox.closest('.promocion-item');

                    // Obtener el texto del label
                    const labelElement = parentItem.querySelector('.promocion-title');
                    const label = labelElement ? labelElement.textContent : '';

                    // Buscar el input de fecha correspondiente
                    const dateInput = parentItem.querySelector('.date-input-header');
                    const fecha = dateInput ? dateInput.value : '';

                    if (fecha) {
                        promocionesSeleccionadas.push({
                            titulo: label,
                            fecha: fecha,
                            estadoCartilla: estadoCartillaTexto
                        });
                    }
                }
            });

            // Obtener promociones de "otros" agregadas (esta parte sigue igual)
            const otrosAgregados = document.getElementById('otrosAgregados').children;
            for (let item of otrosAgregados) {
                const texto = item.querySelector('strong').textContent;
                const fechaTexto = item.querySelector('span').textContent.replace('Fecha: ', '');

                promocionesSeleccionadas.push({
                    titulo: `📋 ${texto}`,
                    fecha: fechaTexto,
                    estadoCartilla: estadoCartillaTexto
                });
            }

            if (promocionesSeleccionadas.length === 0) {
                alert('Por favor seleccione al menos una actividad de promoción con su fecha');
                return;
            }

            // Agregar al historial
            promocionesSeleccionadas.forEach(promocion => {
                agregarAlHistorialPromocion(promocion);
            });

            // Limpiar formulario después de guardar
            limpiarFormularioPromocion();

            alert(`${promocionesSeleccionadas.length} actividad(es) de promoción guardada(s) correctamente`);

            // Mostrar sección de historial
            document.getElementById('historialPromocion').style.display = 'block';
        }

        function limpiarFormularioPromocion() {
            // Limpiar estado de cartilla
            document.getElementById('estadoCartilla').value = '';

            // Desmarcar checkboxes y limpiar fechas (NUEVA ESTRUCTURA)
            document.querySelectorAll('.promocion-item').forEach(item => {
                const checkbox = item.querySelector('.promocion-checkbox');
                const dateInput = item.querySelector('.date-input-header');

                if (checkbox) checkbox.checked = false;
                if (dateInput) dateInput.value = '';
                item.classList.remove('selected');
            });

            // Limpiar otros agregados
            document.getElementById('otrosAgregados').innerHTML = '';
            document.getElementById('otrosSelect').selectedIndex = 0;
            document.getElementById('fecha_otros').value = '';
            document.getElementById('otros').checked = false;
        }

        // Actualizar los event listeners para la nueva estructura
        document.addEventListener('DOMContentLoaded', function () {

            // Event listener corregido para checkboxes de promoción
            const promocionCheckboxes = document.querySelectorAll('.promocion-checkbox');
            promocionCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function () {
                    const parentItem = this.closest('.promocion-item');

                    if (this.checked) {
                        parentItem.classList.add('selected');
                    } else {
                        parentItem.classList.remove('selected');
                        // Limpiar la fecha cuando se desmarca
                        const dateInput = parentItem.querySelector('.date-input-header');
                        if (dateInput) {
                            dateInput.value = '';
                        }
                    }
                });
            });


            document.getElementById('limpiarPromocion')?.addEventListener('click', function () {
                if (confirm('¿Está seguro de que desea limpiar todos los campos del formulario de promoción?')) {
                    limpiarFormularioPromocion();

                    // También limpiar historial si se desea
                    if (confirm('¿También desea limpiar el historial de promociones guardadas?')) {
                        document.getElementById('historialPromociones').innerHTML = '';
                        document.getElementById('historialPromocion').style.display = 'none';
                    }
                }
            });
        });

        // Las demás funciones permanecen iguales
        function agregarAlHistorialPromocion(promocion) {
            const container = document.getElementById('historialPromociones');

            const historialItem = document.createElement('div');
            historialItem.classList.add('historial-item');
            historialItem.innerHTML = `
        <div class="historial-content">
            
            <div class="historial-title">${promocion.titulo}</div>
            <div class="historial-fecha">📅 Fecha: ${promocion.fecha}</div>
        </div>
    `;

            container.appendChild(historialItem);
        }

        function eliminarDelHistorial(button) {
            if (confirm('¿Está seguro de eliminar esta actividad del historial?')) {
                button.parentElement.remove();

                // Ocultar sección de historial si no hay elementos
                const container = document.getElementById('historialPromociones');
                if (container.children.length === 0) {
                    document.getElementById('historialPromocion').style.display = 'none';
                }
            }
        }

        function limpiarFormularioPromocion() {
            // Limpiar estado de cartilla
            document.getElementById('estadoCartilla').value = '';

            // Desmarcar y ocultar fechas de promociones principales
            document.querySelectorAll('.promocion-item').forEach(item => {
                const checkbox = item.querySelector('.promocion-checkbox');
                const dateGroup = item.querySelector('.promocion-date-group');
                const dateInput = item.querySelector('.date-input');

                if (checkbox) checkbox.checked = false;
                if (dateGroup) dateGroup.classList.remove('show');
                if (dateInput) dateInput.value = '';
                item.classList.remove('selected');
            });

            // Limpiar otros agregados
            document.getElementById('otrosAgregados').innerHTML = '';
            document.getElementById('otrosSelect').selectedIndex = 0;
            document.getElementById('fecha_otros').value = '';
            document.getElementById('otros').checked = false;
        }

        // Opciones que tienen información adicional
        const opcionesConInfo = [
            'prevencion-adicciones',
            'consejos-crianza-salud-mental',
            'higiene-sueno',
            'prevencion-acoso-escolar',
            'prevencion-colapso-cuidador',
            'prevencion-posvencion',
            'tecnicas-relajacion-olvidos',
            'tecnicas-relajacion-irritabilidad',
            'tecnicas-relajacion-ansiedad',
            'orientacion-emociones-depresion',
            'prevencion-autolesion-suicida',
            'mejoramiento-conducta-comportamiento',
            'resolucion-problemas-familiar'
        ];

        // Información para cada opción
        const informacionOpciones = {
            'prevencion-adicciones': {
                titulo: 'Prevención de adicciones',
                contenido: `
            <div class="contenido-formato">
    <div class="contenido-card">
        <p class="texto-destacado">
            <strong>Estimado papá, estimada mamá:</strong> De mucho amor, atención y tiempo de calidad a su hijo.
        </p>
        
        <div class="punto-clave">
            <span class="icono-punto">🛡️</span>
            <p>Los niños que se sienten queridos y seguros tienen menos probabilidades de buscar consuelo en otras cosas más adelante.</p>
        </div>
        
        <div class="punto-clave">
            <span class="icono-punto">🎯</span>
            <p>Juegue con él, lean cuentos juntos y ayúdale a expresar sus emociones.</p>
        </div>
        
        
            <span class="icono-corazon">💖</span>
            <strong>¡Su amor es su mejor protección!</strong>
    </div>
</div>
        `
            },
            'prevencion-acoso-escolar': {
                titulo: 'Prevención de acoso escolar',
                contenido: `
        <div class="contenido-formato">
    
    <div class="introduccion-importante">
        <div class="alerta-info">
            <span class="icono-alerta">⚠️</span>
            <p><strong>El acoso escolar no es un problema que deba esperar a la adolescencia.</strong> Se manifiesta desde edades tempranas, y es nuestra responsabilidad como adultos, ya seamos padres, maestros o cuidadores, reconocerlo y actuar. La prevención del acoso en niños de preescolar hasta los 9 años es fundamental para construir una base sólida de respeto y empatía.</p>
        </div>
    </div>
    
    <div class="pregunta-central">
        <h5>🤔 ¿Cómo podemos lograrlo?</h5>
    </div>
    
    <div class="estrategias-container">
        <div class="estrategia-card">
            <div class="estrategia-header">
                <span class="icono-estrategia">❤️</span>
                <h6>Fomentando la Empatía</h6>
            </div>
            <p>Hablemos con los niños sobre los sentimientos de los demás. Preguntemos: <span class="pregunta-ejemplo">"¿Cómo crees que se siente tu amigo cuando le quitan un juguete?"</span>. Esto les ayuda a ponerse en el lugar del otro.</p>
        </div>
        
        <div class="estrategia-card">
            <div class="estrategia-header">
                <span class="icono-estrategia">👥</span>
                <h6>Modelando un Comportamiento Respetuoso</h6>
            </div>
            <p>Los niños aprenden lo que ven. Seamos un ejemplo de respeto, amabilidad y resolución pacífica de conflictos en nuestras propias interacciones.</p>
        </div>
        
        <div class="estrategia-card">
            <div class="estrategia-header">
                <span class="icono-estrategia">📋</span>
                <h6>Estableciendo Reglas Claras</h6>
            </div>
            <p>Expliquemos que no está permitido agredir, insultar o excluir a nadie. Reforcemos positivamente el buen comportamiento y hablemos de las consecuencias de las acciones negativas.</p>
        </div>
        
        <div class="estrategia-card">
            <div class="estrategia-header">
                <span class="icono-estrategia">💬</span>
                <h6>Promoviendo la Comunicación Abierta</h6>
            </div>
            <p>Creemos un espacio donde los niños se sientan seguros para contarnos si alguien los está molestando o si ven que a otro niño le hacen daño. Escuchemos sin juzgar y actuemos de inmediato.</p>
        </div>
    </div>
    
    <div class="conclusion">
        <div class="mensaje-motivacional">
            <span class="icono-estrella">⭐</span>
            <p><strong>Al tomar estas medidas, no solo prevenimos el acoso, sino que estamos cultivando un ambiente de respeto y seguridad.</strong> Les estamos enseñando a nuestros hijos a ser defensores, no agresores, y a valorar la importancia de un trato digno para todos.</p>
        </div>
    </div>
</div>


        `
            },
            // Agregar más información para las otras opciones según sea necesario
            'higiene-sueno': {
                titulo: 'Higiene del sueño',
                contenido: `
            <div class="contenido-formato">  
    <div class="introduccion">
        <p><em>A esta edad, puedes hacer la actividad más participativa, dándole al niño un poco más de control.</em></p>
    </div>
    
    <div class="actividades-container">
        <div class="actividad-card">
            <div class="actividad-header">
                <span class="icono-actividad">📖</span>
                <h5>Crea un "Pasaporte del Sueño"</h5>
            </div>
            <p>Haz un pequeño librillo o una cartulina dividida en casillas. Cada casilla representa un paso de la rutina: <span class="highlight">"cena ligera"</span>, <span class="highlight">"baño"</span>, <span class="highlight">"pijama"</span>, <span class="highlight">"lavarse los dientes"</span>, <span class="highlight">"cuento"</span>. Puedes pedirle al niño que coloree o ponga una calcomanía en la casilla de cada paso que completen.</p>
        </div>
        
        <div class="actividad-card">
            <div class="actividad-header">
                <span class="icono-actividad">⏳</span>
                <h5>Usa el Reloj de Arena</h5>
            </div>
            <p>Explícale que, después de un tiempo específico (por ejemplo, 15 minutos), las <span class="highlight">"aventuras"</span> del día deben terminar. El reloj de arena visualiza el tiempo y ayuda a que la transición sea más fácil.</p>
        </div>
        
        <div class="actividad-card">
            <div class="actividad-header">
                <span class="icono-actividad">📚</span>
                <h5>Elige el Cuento</h5>
            </div>
            <p>Permite que el niño elija el cuento que leerán juntos. Esto le da un sentido de autonomía y hace que el momento de la lectura sea más placentero.</p>
        </div>
    </div>
</div>  
        `
            }
        };

        // Función para mostrar el botón de información
        function mostrarBotonInfo(valor) {
            const container = document.querySelector('#otrosPromocion .age-selector-section');
            const botonExistente = document.getElementById('btnMasInfo');

            // Remover botón existente si lo hay
            if (botonExistente) {
                botonExistente.remove();
            }

            // Agregar botón si la opción tiene información
            if (opcionesConInfo.includes(valor)) {
                const boton = document.createElement('button');
                boton.type = 'button';
                boton.id = 'btnMasInfo';
                boton.className = 'btn-info';
                boton.innerHTML = 'ℹ️ Más información';
                boton.onclick = () => mostrarPopup(valor);
                container.appendChild(boton);
            }
        }

        // Función para mostrar el popup
        function mostrarPopup(valor) {
            const info = informacionOpciones[valor];
            if (info) {
                document.getElementById('popupTitle').textContent = info.titulo;
                document.getElementById('popupBody').innerHTML = info.contenido;
                document.getElementById('infoPopup').style.display = 'flex';
            }
        }

        // Función para cerrar el popup
        function cerrarPopup() {
            document.getElementById('infoPopup').style.display = 'none';
        }

        // Cerrar popup al hacer clic fuera de él
        document.getElementById('infoPopup').addEventListener('click', function (e) {
            if (e.target === this) {
                cerrarPopup();
            }
        });

        // Modificar el event listener del select para mostrar/ocultar el botón
        document.addEventListener('DOMContentLoaded', function () {
            const otrosSelect = document.getElementById('otrosSelect');
            if (otrosSelect) {
                otrosSelect.addEventListener('change', function () {
                    mostrarBotonInfo(this.value);
                });
            }
        });

        // Variables para conteo
        let contadores = {
            si: 0,
            no: 0,
            ausente: 0,
            presente: 0
        };

        // Función para contar respuestas
        function contarRespuestas() {
            const edadSeleccionada = document.getElementById('edad_nino').value;

            if (!edadSeleccionada) {
                document.getElementById('semaforoDesarrollo').style.display = 'none';
                return;
            }

            // Resetear contadores
            contadores = { si: 0, no: 0, ausente: 0, presente: 0 };

            // Obtener todas las respuestas de la edad seleccionada
            const seccionActual = document.getElementById(`questions-${edadSeleccionada}`);
            if (!seccionActual) return;

            // Contar respuestas en categorías normales (motor, lenguaje, social, conocimiento)
            const preguntasNormales = seccionActual.querySelectorAll('.motor-category .radio-input:checked, .lenguaje-category .radio-input:checked, .social-category .radio-input:checked, .conocimiento-category .radio-input:checked');

            preguntasNormales.forEach(radio => {
                if (radio.value === 'si') contadores.si++;
                if (radio.value === 'no') contadores.no++;
            });

            // Contar respuestas en signos de alarma
            const preguntasAlarma = seccionActual.querySelectorAll('.alarma-category .radio-input:checked');

            preguntasAlarma.forEach(radio => {
                if (radio.value === 'ausente') contadores.ausente++;
                if (radio.value === 'presente') contadores.presente++;
            });

            // Actualizar contadores en la interfaz
            document.getElementById('conteoSi').textContent = contadores.si;
            document.getElementById('conteoNo').textContent = contadores.no;
            document.getElementById('conteoAusente').textContent = contadores.ausente;
            document.getElementById('conteoPresente').textContent = contadores.presente;

            // Mostrar semáforo
            document.getElementById('semaforoDesarrollo').style.display = 'block';

            // Determinar resultado
            determinarResultadoSemaforo();
        }

        // Función para determinar el resultado del semáforo
        function determinarResultadoSemaforo() {
            // Ocultar todas las luces
            document.querySelectorAll('.semaforo-luz').forEach(luz => {
                luz.classList.remove('activa');
            });

            // Lógica del semáforo
            if (contadores.presente > 0) {
                // ROJO: Tiene uno o más signos de alarma presentes
                document.getElementById('luzRojo').classList.add('activa');
            } else if (contadores.no > 0) {
                // AMARILLO: No hace algún ítem, pero sin signos de alarma
                document.getElementById('luzAmarillo').classList.add('activa');
            } else if (contadores.si > 0 && contadores.presente === 0) {
                // VERDE: Todo sí lo hace sin signos de alarma
                document.getElementById('luzVerde').classList.add('activa');
            } else {
                // No hay suficientes respuestas para evaluar
                document.getElementById('semaforoDesarrollo').style.display = 'none';
            }
        }

        // Función para recalcular
        function recalcularSemaforo() {
            contarRespuestas();
        }

        // Event listeners para respuestas
        document.addEventListener('DOMContentLoaded', function () {
            // Agregar listeners a todos los radio buttons de desarrollo
            document.addEventListener('change', function (e) {
                if (e.target.classList.contains('radio-input') &&
                    e.target.closest('.age-questions-section')) {
                    contarRespuestas();
                }
            });

            // Listener para cambio de edad
            const edadSelector = document.getElementById('edad_nino');
            if (edadSelector) {
                edadSelector.addEventListener('change', function () {
                    setTimeout(() => {
                        contarRespuestas();
                    }, 100);
                });
            }
        });

        // Función modificada para agregar al historial con múltiples fechas
        function agregarAlHistorialPromocion(promocion) {
            const container = document.getElementById('historialPromociones');

            // Buscar si ya existe una actividad con el mismo título
            const actividadExistente = Array.from(container.children).find(item => {
                const titulo = item.querySelector('.historial-title').textContent;
                return titulo === promocion.titulo;
            });

            if (actividadExistente) {
                // Si existe, agregar la fecha al contenedor de fechas
                agregarFechaAActividad(actividadExistente, promocion.fecha);
            } else {
                // Si no existe, crear nueva actividad
                crearNuevaActividadHistorial(promocion);
            }
        }

        // Función modificada para crear una nueva actividad en el historial (versión compacta)
        function crearNuevaActividadHistorial(promocion) {
            const container = document.getElementById('historialPromociones');

            const historialItem = document.createElement('div');
            historialItem.classList.add('historial-item');
            historialItem.innerHTML = `
        <div class="historial-content">
            <div class="actividad-info">
                <div class="actividad-titulo">
                    <span class="historial-title">${promocion.titulo}</span>
                    <span class="fechas-contador">1</span>
                </div>
                <div class="fechas-scroll-compacto">
                    <div class="fecha-item-compacto">${promocion.fecha}</div>
                </div>
            </div>
        </div>
        <div class="historial-actions">
        </div>
    `;

            container.appendChild(historialItem);
        }

        // Función modificada para agregar fecha a una actividad existente (versión compacta)
        function agregarFechaAActividad(actividadItem, nuevaFecha) {
            const fechasScroll = actividadItem.querySelector('.fechas-scroll-compacto');
            const contador = actividadItem.querySelector('.fechas-contador');

            // Verificar que la fecha no esté duplicada
            const fechasExistentes = Array.from(fechasScroll.children).map(item => item.textContent.replace('×', '').trim());
            if (fechasExistentes.includes(nuevaFecha)) {
                alert('Esta fecha ya está registrada para esta actividad');
                return;
            }

            // Crear nuevo elemento de fecha
            const fechaItem = document.createElement('div');
            fechaItem.classList.add('fecha-item-compacto');
            fechaItem.innerHTML = `
        ${nuevaFecha}
    `;

            fechasScroll.appendChild(fechaItem);

            // Actualizar contador
            const totalFechas = fechasScroll.children.length;
            contador.textContent = totalFechas;

            // Hacer scroll automático al final
            fechasScroll.scrollTop = fechasScroll.scrollHeight;
        }

        // Función para eliminar una fecha específica (actualizada para versión compacta)
        function eliminarFecha(button) {
            if (confirm('¿Está seguro de eliminar esta fecha?')) {
                const fechaItem = button.parentElement;
                const fechasScroll = fechaItem.parentElement;
                const contador = fechasScroll.parentElement.querySelector('.fechas-contador');

                fechaItem.remove();

                // Actualizar contador
                const totalFechas = fechasScroll.children.length;
                contador.textContent = totalFechas;

                // Si no quedan fechas, eliminar toda la actividad
                if (totalFechas === 0) {
                    const actividadCompleta = fechasScroll.closest('.historial-item');
                    actividadCompleta.remove();

                    // Ocultar sección de historial si no hay elementos
                    const container = document.getElementById('historialPromociones');
                    if (container.children.length === 0) {
                        document.getElementById('historialPromocion').style.display = 'none';
                    }
                }
            }
        }
        // Función modificada para eliminar del historial (elimina toda la actividad)
        function eliminarDelHistorial(button) {
            if (confirm('¿Está seguro de eliminar esta actividad completa con todas sus fechas?')) {
                const historialItem = button.closest('.historial-item');
                historialItem.remove();

                // Ocultar sección de historial si no hay elementos
                const container = document.getElementById('historialPromociones');
                if (container.children.length === 0) {
                    document.getElementById('historialPromocion').style.display = 'none';
                }
            }
        }

        document.addEventListener('DOMContentLoaded', function () {

            // Funcionalidad para checkboxes de antecedentes (similar a promoción)
            const antecedentesCheckboxes = document.querySelectorAll('#antecedentes .promocion-checkbox');
            antecedentesCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function () {
                    const parentItem = this.closest('.promocion-item');
                    const dateInput = parentItem.querySelector('.date-input-header');

                    if (this.checked) {
                        parentItem.classList.add('selected');
                        // Opcional: enfocar el campo de fecha cuando se marca el checkbox
                        if (dateInput) {
                            dateInput.focus();
                        }
                    } else {
                        parentItem.classList.remove('selected');
                        // Limpiar la fecha cuando se desmarca
                        if (dateInput) {
                            dateInput.value = '';
                        }
                    }
                });
            });

            // Actualizar la función de limpiar antecedentes para incluir estos nuevos campos
            const limpiarAntecedentesBtn = document.getElementById('limpiarAntecedentes');
            if (limpiarAntecedentesBtn) {
                limpiarAntecedentesBtn.addEventListener('click', function () {
                    if (confirm('¿Está seguro de que desea limpiar todos los campos del formulario de antecedentes?')) {
                        document.getElementById('antecedentesForm').reset();

                        // Remover clases checked de los checkboxes
                        document.querySelectorAll('#antecedentes .checkbox-item').forEach(item => {
                            item.classList.remove('checked');
                        });

                        // Remover clases selected de tamizajes
                        document.querySelectorAll('#antecedentes .tamiz-item').forEach(item => {
                            item.classList.remove('selected');
                            const details = item.querySelector('.tamiz-details');
                            if (details) details.classList.remove('show');
                        });

                        // Limpiar nuevos campos de checkbox con fecha
                        document.querySelectorAll('#antecedentes .promocion-item').forEach(item => {
                            item.classList.remove('selected');
                            const checkbox = item.querySelector('.promocion-checkbox');
                            const dateInput = item.querySelector('.date-input-header');
                            if (checkbox) checkbox.checked = false;
                            if (dateInput) dateInput.value = '';
                        });
                    }
                });
            }

            // Función para obtener datos de antecedentes (incluyendo nuevos campos)
            function obtenerDatosAntecedentes() {
                const datos = {};

                // Datos básicos del formulario
                const formData = new FormData(document.getElementById('antecedentesForm'));
                for (let [key, value] of formData.entries()) {
                    datos[key] = value;
                }

                // Datos específicos de checkbox con fecha
                const profilaxisCheckbox = document.getElementById('profilaxisOftalmica');
                const profilaxisFecha = document.getElementById('fecha_profilaxis_oftalmica');
                if (profilaxisCheckbox && profilaxisCheckbox.checked) {
                    datos.profilaxis_oftalmica = {
                        aplicada: true,
                        fecha: profilaxisFecha.value
                    };
                }

                const vitaminaCheckbox = document.getElementById('vitaminaK');
                const vitaminaFecha = document.getElementById('fecha_vitamina_k');
                if (vitaminaCheckbox && vitaminaCheckbox.checked) {
                    datos.vitamina_k = {
                        aplicada: true,
                        fecha: vitaminaFecha.value
                    };
                }

                return datos;
            }

            // Actualizar función de guardar antecedentes
            const guardarAntecedentesBtn = document.getElementById('guardarAntecedentes');
            if (guardarAntecedentesBtn) {
                guardarAntecedentesBtn.addEventListener('click', function (e) {
                    e.preventDefault();

                    const datos = obtenerDatosAntecedentes();
                    console.log('Datos de antecedentes:', datos);

                    // Validar que si se marca un checkbox, tenga fecha
                    let errores = [];

                    if (document.getElementById('profilaxisOftalmica').checked && !document.getElementById('fecha_profilaxis_oftalmica').value) {
                        errores.push('Debe especificar la fecha de aplicación de la Profilaxis Oftálmica');
                    }

                    if (document.getElementById('vitaminaK').checked && !document.getElementById('fecha_vitamina_k').value) {
                        errores.push('Debe especificar la fecha de aplicación de la Vitamina K');
                    }

                    if (errores.length > 0) {
                        alert('Errores encontrados:\n' + errores.join('\n'));
                        return;
                    }

                    alert('Antecedentes guardados correctamente');
                });
            }
        });

        document.addEventListener('DOMContentLoaded', function () {
            // Referencias a elementos
            const pesoInput = document.getElementById('peso_nutricion');
            const tallaInput = document.getElementById('talla_nutricion');
            const edadSelect = document.getElementById('edad_nutricion');
            const imcInput = document.getElementById('imc_nutricion');
            const resultadoDiv = document.getElementById('resultado_nutricion');
            const estadoDiv = document.getElementById('estado_nutricional');

            // Rangos de IMC por edad (simplificados para el ejemplo)
            const rangosIMC = {
                'al_nacer': { min: 10, max: 18 },
                '1mes': { min: 12, max: 20 },
                '2meses': { min: 13, max: 21 },
                '3meses': { min: 14, max: 22 },
                '4meses': { min: 14.5, max: 22.5 },
                '5meses': { min: 15, max: 23 },
                '6meses': { min: 15.5, max: 23.5 },
                '7meses': { min: 16, max: 24 },
                '8meses': { min: 16.2, max: 24.2 },
                '9meses': { min: 16.4, max: 24.4 },
                '10meses': { min: 16.6, max: 24.6 },
                '11meses': { min: 16.8, max: 24.8 },
                '1ano': { min: 17, max: 25 },
                '2anos': { min: 15, max: 18 },
                '3anos': { min: 14, max: 17 },
                '4anos': { min: 14, max: 17 },
                '5anos': { min: 14, max: 17 }
                // Para mayores de 5 años no hay rangos específicos, solo se calcula IMC
            };

            // Función para calcular IMC
            function calcularIMC() {
                const peso = parseFloat(pesoInput.value);
                const talla = parseFloat(tallaInput.value);
                const edad = edadSelect.value;

                if (peso && talla && edad) {
                    // Convertir talla de cm a metros
                    const tallaMetros = talla / 100;
                    const imc = peso / (tallaMetros * tallaMetros);

                    imcInput.value = imc.toFixed(2);
                    evaluarEstadoNutricional(imc, edad);
                } else {
                    imcInput.value = '';
                    resultadoDiv.style.display = 'none';
                }
            }

            // Función para evaluar estado nutricional
            function evaluarEstadoNutricional(imc, edad) {
                let estado = '';
                let clase = '';
                let icono = '';
                let mensaje = '';
                let derivacion = '';

                // Para mayores de 5 años
                if (['6anos', '7anos', '8anos'].includes(edad)) {
                    if (imc < 18.5) {
                        estado = 'Peso bajo';
                        clase = 'peso-bajo';
                        icono = '⬇️';
                    } else if (imc >= 18.5 && imc < 25) {
                        estado = 'Peso normal';
                        clase = 'peso-normal';
                        icono = '✅';
                    } else if (imc >= 25 && imc < 30) {
                        estado = 'Sobrepeso';
                        clase = 'sobrepeso';
                        icono = '⬆️';
                    } else {
                        estado = 'Obesidad';
                        clase = 'obesidad';
                        icono = '🔴';
                    }
                } else {
                    // Para menores de 5 años
                    const rangos = rangosIMC[edad];
                    if (!rangos) return;

                    if (imc < rangos.min * 0.85) {
                        estado = 'Peso bajo';
                        clase = 'peso-bajo';
                        icono = '⬇️';
                        derivacion = 'Derivar a Medicina Familiar y Nutricionista';
                    } else if (imc < rangos.min) {
                        estado = 'Riesgo de Peso bajo';
                        clase = 'riesgo-peso-bajo';
                        icono = '⚠️';
                        derivacion = 'Derivar a Medicina Familiar y Nutricionista';
                    } else if (imc <= rangos.max) {
                        estado = 'Peso normal';
                        clase = 'peso-normal';
                        icono = '✅';
                    } else if (imc <= rangos.max * 1.15) {
                        estado = 'Sobrepeso';
                        clase = 'sobrepeso';
                        icono = '⬆️';
                        derivacion = 'Derivar a EEMF y Nutricionista';
                    } else {
                        estado = 'Obesidad';
                        clase = 'obesidad';
                        icono = '🔴';
                        derivacion = 'Derivar a Medicina Familiar y Nutricionista';
                    }
                }

                // Mostrar resultado
                estadoDiv.className = `nutrition-result ${clase}`;
                estadoDiv.innerHTML = `
            <div class="nutrition-icon">${icono}</div>
            <h4>${estado}</h4>
            <p>IMC: ${imc.toFixed(2)} kg/m²</p>
            ${derivacion ? `
                <div class="alerta-derivacion">
                    <span class="icono">👨‍⚕️</span>
                    <span class="texto">${derivacion}</span>
                </div>
            ` : ''}
        `;

                resultadoDiv.style.display = 'block';
            }

            // Event listeners
            pesoInput.addEventListener('input', calcularIMC);
            tallaInput.addEventListener('input', calcularIMC);
            edadSelect.addEventListener('change', calcularIMC);

            // Botón limpiar
            document.getElementById('limpiarNutricion')?.addEventListener('click', function () {
                if (confirm('¿Está seguro de que desea limpiar todos los campos?')) {
                    document.getElementById('nutricionForm').reset();
                    imcInput.value = '';
                    resultadoDiv.style.display = 'none';
                }
            });

            // Botón guardar
            document.getElementById('guardarNutricion')?.addEventListener('click', function (e) {
                e.preventDefault();

                const peso = pesoInput.value;
                const talla = tallaInput.value;
                const edad = edadSelect.value;
                const fecha = document.getElementById('fecha_nutricion').value;
                const imc = imcInput.value;

                if (!peso || !talla || !edad || !fecha) {
                    alert('Por favor complete todos los campos obligatorios');
                    return;
                }

                // Agregar al historial
                agregarAlHistorialNutricion({
                    peso: peso,
                    talla: talla,
                    edad: edad,
                    fecha: fecha,
                    imc: imc,
                    estado: estadoDiv.querySelector('h4')?.textContent || ''
                });

                alert('Evaluación nutricional guardada correctamente');

                // Limpiar formulario
                document.getElementById('nutricionForm').reset();
                imcInput.value = '';
                resultadoDiv.style.display = 'none';
            });

            // Botón borrador
            document.getElementById('guardarBorradorNut')?.addEventListener('click', function () {
                alert('Borrador de evaluación nutricional guardado');
            });
        });

        // Función para agregar al historial nutricional
        function agregarAlHistorialNutricion(datos) {
            const container = document.getElementById('historialEvaluaciones');

            const historialItem = document.createElement('div');
            historialItem.classList.add('historial-item');
            historialItem.innerHTML = `
        <div class="historial-content">
            <div class="historial-title">📊 Evaluación Nutricional - ${datos.edad.replace('_', ' ')}</div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-top: 10px;">
                <div><strong>Peso:</strong> ${datos.peso} kg</div>
                <div><strong>Talla:</strong> ${datos.talla} cm</div>
                <div><strong>IMC:</strong> ${datos.imc} kg/m²</div>
                <div><strong>Estado:</strong> ${datos.estado}</div>
                <div><strong>Fecha:</strong> ${datos.fecha}</div>
            </div>
        </div>
        <div class="historial-actions">
            <button type="button" class="btn-delete" onclick="eliminarEvaluacionNutricional(this)">🗑️ Eliminar</button>
        </div>
    `;

            container.appendChild(historialItem);
            document.getElementById('historialNutricion').style.display = 'block';
        }

        // Función para eliminar evaluación nutricional
        function eliminarEvaluacionNutricional(button) {
            if (confirm('¿Está seguro de eliminar esta evaluación nutricional?')) {
                button.closest('.historial-item').remove();

                // Ocultar sección si no hay elementos
                const container = document.getElementById('historialEvaluaciones');
                if (container.children.length === 0) {
                    document.getElementById('historialNutricion').style.display = 'none';
                }
            }
        }

        // Variables globales para el modal de detalles
        let vacunaActual = '';
        let dosisActual = '';

        // Función para abrir detalles de vacuna
        function abrirDetallesVacuna(vacuna, dosis) {
            vacunaActual = vacuna;
            dosisActual = dosis;

            // Configurar título del modal
            const nombreVacuna = document.querySelector(`[data-vacuna="${vacuna}"][data-dosis="${dosis}"]`)
                .closest('.vacuna-card').querySelector('h4').textContent;
            document.getElementById('tituloDetallesVacuna').textContent = `${nombreVacuna} - ${dosis}`;

            // Copiar fecha si ya existe
            const fechaExistente = document.querySelector(`[data-vacuna="${vacuna}"][data-dosis="${dosis}"] .fecha-input`).value;
            if (fechaExistente) {
                document.getElementById('fecha_aplicacion_detalle').value = fechaExistente;
            }

            // Mostrar modal
            document.getElementById('detallesVacunaModal').style.display = 'flex';
        }

        // Función para cerrar detalles de vacuna
        function cerrarDetallesVacuna() {
            document.getElementById('detallesVacunaModal').style.display = 'none';
            limpiarFormularioDetalles();
        }

        // Función para limpiar formulario de detalles
        function limpiarFormularioDetalles() {
            document.getElementById('detallesVacunaForm').reset();
            document.getElementById('molestias_section').style.display = 'none';
            document.getElementById('otra_molestia_detalle').style.display = 'none';

            // Limpiar checkboxes
            document.querySelectorAll('#molestias_section .checkbox-item').forEach(item => {
                item.classList.remove('checked');
            });
        }

        // Función para guardar detalles de vacuna
        function guardarDetallesVacuna() {
            const fechaAplicacion = document.getElementById('fecha_aplicacion_detalle').value;
            const rescate = document.querySelector('input[name="rescate"]:checked')?.value;

            if (!fechaAplicacion) {
                alert('La fecha de aplicación es obligatoria');
                return;
            }

            if (!rescate) {
                alert('Debe indicar si es rescate o no');
                return;
            }

            // Actualizar fecha en la tarjeta principal
            const dosisElement = document.querySelector(`[data-vacuna="${vacunaActual}"][data-dosis="${dosisActual}"]`);
            const fechaInput = dosisElement.querySelector('.fecha-input');
            const btnDetalles = dosisElement.querySelector('.btn-detalles');

            fechaInput.value = fechaAplicacion;
            fechaInput.classList.add('completada');
            btnDetalles.classList.add('completado');
            dosisElement.classList.add('completada');

            // Guardar datos de la vacuna (aquí puedes implementar el almacenamiento)
            const datosVacuna = {
                vacuna: vacunaActual,
                dosis: dosisActual,
                fechaAplicacion: fechaAplicacion,
                rescate: rescate,
                fechaRegistro: document.getElementById('fecha_registro').value,
                grupoRiesgo: document.getElementById('grupo_riesgo').value,
                lote: document.getElementById('lote').value,
                fechaCaducidad: document.getElementById('fecha_caducidad').value,
                lugarAplicacion: document.querySelector('input[name="lugar_aplicacion"]:checked')?.value,
                reaccionesAdversas: document.querySelector('input[name="reacciones_adversas"]:checked')?.value,
                molestias: Array.from(document.querySelectorAll('input[name="molestias[]"]:checked')).map(cb => cb.value),
                otraMolestia: document.getElementById('otra_molestia_texto').value
            };

            console.log('Datos de vacuna guardados:', datosVacuna);

            alert('Detalles de vacuna guardados correctamente');
            cerrarDetallesVacuna();
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', function () {
            // Mostrar/ocultar sección de molestias
            document.querySelectorAll('input[name="reacciones_adversas"]').forEach(radio => {
                radio.addEventListener('change', function () {
                    const molestiaSection = document.getElementById('molestias_section');
                    if (this.value === 'si') {
                        molestiaSection.style.display = 'block';
                    } else {
                        molestiaSection.style.display = 'none';
                        // Limpiar molestias seleccionadas
                        document.querySelectorAll('input[name="molestias[]"]').forEach(cb => {
                            cb.checked = false;
                        });
                        document.getElementById('otra_molestia_detalle').style.display = 'none';
                    }
                });
            });

            // Mostrar/ocultar campo "otra molestia"
            document.getElementById('otra_molestia').addEventListener('change', function () {
                const otraDetalle = document.getElementById('otra_molestia_detalle');
                if (this.checked) {
                    otraDetalle.style.display = 'block';
                } else {
                    otraDetalle.style.display = 'none';
                    document.getElementById('otra_molestia_texto').value = '';
                }
            });

            // Funcionalidad para checkboxes de molestias
            document.querySelectorAll('#molestias_section .checkbox-item').forEach(item => {
                const checkbox = item.querySelector('.checkbox-input');
                if (checkbox) {
                    checkbox.addEventListener('change', function () {
                        if (this.checked) {
                            item.classList.add('checked');
                        } else {
                            item.classList.remove('checked');
                        }
                    });
                }
            });

            // Agregar otra vacuna
            document.getElementById('agregarOtraVacuna')?.addEventListener('click', function () {
                const vacunaSelect = document.getElementById('otra_vacuna_select');
                const dosisSelect = document.getElementById('otra_dosis_select');
                const fechaInput = document.getElementById('otra_fecha_vacunacion');

                if (!vacunaSelect.value || !dosisSelect.value || !fechaInput.value) {
                    alert('Por favor complete todos los campos para agregar la vacuna');
                    return;
                }

                const vacunaTexto = vacunaSelect.options[vacunaSelect.selectedIndex].text;
                const dosisTexto = dosisSelect.options[dosisSelect.selectedIndex].text;
                const fecha = fechaInput.value;

                agregarOtraVacunaALista(vacunaTexto, dosisTexto, fecha);

                // Limpiar campos
                vacunaSelect.value = '';
                dosisSelect.value = '';
                fechaInput.value = '';
            });

            // Cerrar modal al hacer clic fuera
            document.getElementById('detallesVacunaModal').addEventListener('click', function (e) {
                if (e.target === this) {
                    cerrarDetallesVacuna();
                }
            });

            // Botón limpiar
            document.getElementById('limpiarVacunacion')?.addEventListener('click', function () {
                if (confirm('¿Está seguro de que desea limpiar todos los datos de vacunación?')) {
                    // Limpiar fechas de vacunas del esquema
                    document.querySelectorAll('.fecha-input').forEach(input => {
                        input.value = '';
                        input.classList.remove('completada');
                    });

                    // Limpiar estados visuales
                    document.querySelectorAll('.dosis-item').forEach(item => {
                        item.classList.remove('completada');
                    });

                    document.querySelectorAll('.btn-detalles').forEach(btn => {
                        btn.classList.remove('completado');
                    });

                    // Limpiar otras vacunas
                    document.getElementById('otrasVacunasAgregadas').innerHTML = '';
                    document.getElementById('otra_vacuna_select').value = '';
                    document.getElementById('otra_dosis_select').value = '';
                    document.getElementById('otra_fecha_vacunacion').value = '';
                }
            });

            // Botón guardar
            document.getElementById('guardarVacunacion')?.addEventListener('click', function () {
                // Recopilar datos de vacunación
                const vacunasCompletadas = [];

                document.querySelectorAll('.dosis-item.completada').forEach(item => {
                    const vacuna = item.dataset.vacuna;
                    const dosis = item.dataset.dosis;
                    const fecha = item.querySelector('.fecha-input').value;

                    vacunasCompletadas.push({
                        vacuna: vacuna,
                        dosis: dosis,
                        fecha: fecha
                    });
                });

                console.log('Esquema de vacunación:', vacunasCompletadas);
                alert(`Esquema de vacunación guardado. ${vacunasCompletadas.length} vacuna(s) registrada(s).`);
            });

            // Botón borrador
            document.getElementById('guardarBorradorVac')?.addEventListener('click', function () {
                alert('Borrador de esquema de vacunación guardado');
            });
        });

        // Función para agregar otra vacuna a la lista
        function agregarOtraVacunaALista(vacuna, dosis, fecha) {
            const container = document.getElementById('otrasVacunasAgregadas');

            const vacunaItem = document.createElement('div');
            vacunaItem.classList.add('vacuna-agregada');
            vacunaItem.innerHTML = `
        <div class="vacuna-agregada-info">
            <div class="vacuna-agregada-titulo">💉 ${vacuna}</div>
            <div class="vacuna-agregada-detalles">
                <strong>Dosis:</strong> ${dosis} • <strong>Fecha:</strong> ${fecha}
            </div>
        </div>
        <button type="button" class="btn-eliminar-vacuna" onclick="eliminarOtraVacuna(this)">
            🗑️ Eliminar
        </button>
    `;

            container.appendChild(vacunaItem);
        }

        // Función para eliminar otra vacuna
        function eliminarOtraVacuna(button) {
            if (confirm('¿Está seguro de eliminar esta vacuna?')) {
                button.parentElement.remove();
            }
        }

        // Event listener para mostrar/ocultar campo de texto de "otra vacuna"
        document.getElementById('otra_vacuna_select').addEventListener('change', function () {
            const otraVacunaGroup = document.getElementById('otra_vacuna_texto_group');
            const otraVacunaInput = document.getElementById('otra_vacuna_texto');

            if (this.value === 'otra') {
                otraVacunaGroup.style.display = 'block';
                otraVacunaInput.required = true;
            } else {
                otraVacunaGroup.style.display = 'none';
                otraVacunaInput.required = false;
                otraVacunaInput.value = '';
            }
        });

        // Modificar la función agregarOtraVacunaALista para manejar "otra"
        // Actualizar esta parte en tu función existente donde obtienes el texto de la vacuna:
        /*
        const vacunaTexto = vacunaSelect.value === 'otra' 
            ? document.getElementById('otra_vacuna_texto').value 
            : vacunaSelect.options[vacunaSelect.selectedIndex].text;
        */
