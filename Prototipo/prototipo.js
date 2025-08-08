        // Funcionalidad de pestañas
        document.addEventListener('DOMContentLoaded', function() {
          const tabButtons = document.querySelectorAll('.tab-btn');
          const tabContents = document.querySelectorAll('.tab-content');
          tabButtons.forEach(button => {
            button.addEventListener('click', function() {
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
            checkbox.addEventListener('change', function() {
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
              checkbox.addEventListener('change', function() {
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
          edadSelector?.addEventListener('change', function() {
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
              radio.addEventListener('change', function() {
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
          // Funcionalidad de botones de limpiar
          document.getElementById('limpiarAntecedentes')?.addEventListener('click', function() {
            if (confirm('¿Está seguro de que desea limpiar todos los campos del formulario de antecedentes?')) {
              document.getElementById('antecedentesForm').reset();
              // Remover clases checked de los checkboxes
              document.querySelectorAll('#antecedentes .checkbox-item').forEach(item => {
                item.classList.remove('checked');
              });
            }
          });
          document.getElementById('limpiarPromocion')?.addEventListener('click', function() {
            if (confirm('¿Está seguro de que desea limpiar todos los campos del formulario de promoción?')) {
              document.getElementById('promocionForm').reset();
              // Ocultar grupos de fechas y remover selección
              document.querySelectorAll('.promocion-item').forEach(item => {
                item.classList.remove('selected');
                item.querySelector('.promocion-date-group').classList.remove('show');
              });
            }
          });
          document.getElementById('limpiarDesarrollo')?.addEventListener('click', function() {
            if (confirm('¿Está seguro de que desea limpiar todos los campos del formulario de desarrollo?')) {
              // Limpiar campos básicos
              document.getElementById('fecha_evaluacion_desarrollo').value = '';
              document.getElementById('fecha_orientacion_1').value = '';
              document.getElementById('fecha_orientacion_2').value = '';
              document.getElementById('fecha_orientacion_3').value = '';
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
          document.getElementById('guardarAntecedentes')?.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Antecedentes guardados correctamente');
          });
          document.getElementById('guardarPromocion')?.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Datos de promoción de la salud guardados correctamente');
          });
          document.getElementById('guardarDesarrollo')?.addEventListener('click', function() {
            alert('Datos de desarrollo infantil guardados correctamente');
          });
          // Funcionalidad de borradores
          document.getElementById('guardarBorradorAnt')?.addEventListener('click', function() {
            alert('Borrador de antecedentes guardado');
          });
          document.getElementById('guardarBorradorProm')?.addEventListener('click', function() {
            alert('Borrador de promoción guardado');
          });
          document.getElementById('guardarBorradorDes')?.addEventListener('click', function() {
            alert('Borrador de desarrollo guardado');
          });
        });
        document.getElementById('agregarOtro')?.addEventListener('click', function() {
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
            </div>
        `;
          container.appendChild(nuevoItem);
          // Limpiar selección
          select.selectedIndex = 0;
          document.getElementById('fecha_otros').value = '';
        });
        // Funcionalidad para tamizajes
        const tamizCheckboxes = document.querySelectorAll('.tamiz-checkbox');
        tamizCheckboxes.forEach(checkbox => {
          checkbox.addEventListener('change', function() {
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