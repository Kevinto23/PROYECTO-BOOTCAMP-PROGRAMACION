// --- NAVEGACIÓN HORIZONTAL ENTRE SECCIONES ---
let currentSection = 0;
const sections = document.querySelectorAll('main section');
const totalSections = sections.length;
const mainContainer = document.getElementById('contenedor');
const navLinks = document.querySelectorAll('nav a');

function updateNavigation(index) {
  navLinks.forEach(link => link.classList.remove('active'));
  if (navLinks[index]) {
    navLinks[index].classList.add('active');
  }
}

function moveSlide(direction) {
  currentSection += direction;
  if (currentSection < 0) currentSection = 0;
  if (currentSection >= totalSections) currentSection = totalSections - 1;
  mainContainer.style.transform = `translateX(-${currentSection * 100}vw)`;
  updateNavigation(currentSection);
}

navLinks.forEach((link, index) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    currentSection = index;
    mainContainer.style.transform = `translateX(-${index * 100}vw)`;
    updateNavigation(index);
  });
});

// --- TEST EMPRENDEDOR: Mostrar preguntas una por una automáticamente ---
document.addEventListener('DOMContentLoaded', () => {
  const preguntas = document.querySelectorAll('#emprendeTest .pregunta');
  const botonFinal = document.getElementById('botonFinal');

  // Mostrar solo la primera pregunta
  preguntas.forEach((p, i) => {
    p.style.display = i === 0 ? 'block' : 'none';
  });
  botonFinal.style.display = 'none';

  // Avanzar automáticamente al responder
  preguntas.forEach((pregunta, i) => {
    const opciones = pregunta.querySelectorAll('input[type="radio"]');
    opciones.forEach(opcion => {
      opcion.addEventListener('change', () => {
        pregunta.style.display = 'none';
        if (i + 1 < preguntas.length) {
          preguntas[i + 1].style.display = 'block';
        } else {
          botonFinal.style.display = 'block';
        }
      });
    });
  });
});

// --- CÁLCULO DEL TEST DE EMPRENDIMIENTO ---
function calcular() {
  const form = document.getElementById('emprendeTest');
  let total = 0;

  for (let i = 1; i <= 10; i++) {
    const respuesta = form.querySelector(`input[name="q${i}"]:checked`);
    if (respuesta) {
      total += parseInt(respuesta.value, 10);
    } else {
      document.getElementById('resultado').textContent =
        'Para obtener tu resultado, asegúrate de responder todas las afirmaciones del test.';
      return;
    }
  }

  let msg = '';
  if (total >= 45) {
    msg = '¡Excelente actitud emprendedora! Tienes lo necesario para empezar o fortalecer un proyecto. Aprovecha tu impulso para liderar ideas que transformen tu entorno.';
  } else if (total >= 35) {
    msg = 'Tienes muy buenas bases para emprender. Con un poco más de experiencia, formación o apoyo, puedes convertir tus ideas en realidades sostenibles y de impacto.';
  } else if (total >= 25) {
    msg = 'Vas por buen camino. Tienes el interés y algunos rasgos clave. Este es un buen momento para seguir aprendiendo, rodearte de personas emprendedoras y atreverte a dar los primeros pasos.';
  } else {
    msg = 'Tu perfil emprendedor aún está en desarrollo. No pasa nada: todos empezamos en algún punto. Puedes formarte, conocer casos reales en Risaralda y fortalecer tus habilidades paso a paso.';
  }

console.log('Resultado calculado:', total);


  // Mostrar resultado en ventana emergente (modal)
  const resultadoTexto = `Puntaje total: ${total} / 50\n\n${msg}`;
  document.getElementById('contenidoModal').textContent = resultadoTexto;
  document.getElementById('miModal').style.display = 'flex';


  // También lo mostramos como texto debajo del botón, por accesibilidad
  //document.getElementById('resultado').textContent = `Puntaje total: ${total} / 50 → ${msg}`;
}

// --- CERRAR MODAL DEL TEST ---
function cerrarModal() {
  document.getElementById('miModal').style.display = 'none';
}







// --- CARRUSEL AUTOMÁTICO DE ORGANIZACIONES ---
let orgIndex = 0;
let orgAutoScroll;

function showSingleOrg(index) {
  const cards = document.querySelectorAll('.org-card');
  cards.forEach((card, i) => {
    card.style.display = i === index ? 'block' : 'none';
  });
}

function moveOrg(direction) {
  const cards = document.querySelectorAll('.org-card');
  const total = cards.length;

  orgIndex += direction;
  if (orgIndex < 0) orgIndex = total - 1;
  if (orgIndex >= total) orgIndex = 0;

  showSingleOrg(orgIndex);
}

function startAutoScroll() {
  orgAutoScroll = setInterval(() => {
    moveOrg(1);
  }, 4000);
}

function stopAutoScroll() {
  clearInterval(orgAutoScroll);
}

document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    showSingleOrg(orgIndex);
    startAutoScroll();
    sliderContainer.addEventListener('mouseenter', stopAutoScroll);
    sliderContainer.addEventListener('mouseleave', startAutoScroll);
  }
});

// --- GRÁFICOS SIMULADOS ---
const select = document.getElementById('graficoSelect');
  const contenedor = document.getElementById('contenidoGrafico');
  const titulo = document.getElementById('tituloGrafico');
  const descripcion = document.getElementById('descripcionGrafico');
  const imagen = document.getElementById('imagenGrafico');

  select.addEventListener('change', () => {
    const tipo = select.value;
    contenedor.style.display = tipo ? 'block' : 'none';

    if (tipo) {
      imagen.classList.remove('fade-in'); // Reinicia animación
      void imagen.offsetWidth;            // Fuerza reflow
      imagen.classList.add('fade-in');
    } else {
      imagen.classList.remove('fade-in');
      imagen.style.display = 'none';
    }

    

    switch (tipo) {
      case 'barras':
        titulo.textContent = 'Emprendimiento Femenino en Risaralda';
        descripcion.textContent = 'El liderazgo femenino es vital para el desarrollo inclusivo...';
        imagen.src = 'Grafica_registro_emprendimiento.png';
        break;
      case 'torta':
        titulo.textContent = 'Participación por tipo de Sector';
        descripcion.textContent = 'La diversidad económica se refleja en los distintos tipos...';
        imagen.src = 'Grafica_torta.png';
        break;
      case 'lineas':
        titulo.textContent = 'Evolución del Emprendimiento';
        descripcion.textContent = 'Este gráfico de líneas ilustra la evolución anual...';
        imagen.src = 'Grafica_linea.png';
        break;
      case 'area':
        titulo.textContent = 'Cantidad de Emprendedores por Género';
        descripcion.textContent = 'Comparar cómo crecen los distintos tipos...';
        imagen.src = 'Grafica_area.png';
        break;
      default:
        imagen.style.display = 'none';
        break;
    }
  });


// --- CARGA Y FILTRADO DE DATOS DE EMPRENDIMIENTO ---
let data = [];

window.addEventListener('DOMContentLoaded', () => {
  fetch('Emprendimientos_Filtrables_Modificado.json')
    .then(response => response.json())
    .then(json => {
      data = json;
      poblarOpciones();
      mostrarTabla(data);
    });

  document.getElementById('tipoSelect').addEventListener('change', () => {
    const seleccion = document.getElementById('tipoSelect').value;
    const filtrado = seleccion === "" ? data : data.filter(item => item.tipo_emprendimiento === seleccion);
    mostrarTabla(filtrado);
  });
});

function poblarOpciones() {
  const select = document.getElementById('tipoSelect');
  const tipos = [...new Set(data.map(item => item.tipo_emprendimiento))].sort();
  tipos.forEach(tipo => {
    const option = document.createElement('option');
    option.value = tipo;
    option.textContent = tipo;
    select.appendChild(option);
  });
}

function mostrarTabla(lista) {
  const tbody = document.querySelector('#tabla tbody');
  tbody.innerHTML = '';
  lista.forEach(item => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${item.edad}</td>
      <td>${item.tipo_trabajo}</td>
      <td>${item.tipo_emprendimiento}</td>
      <td>${item.sexo}</td>
      <td>${item.mes}</td>
    `;
    tbody.appendChild(fila);
  });
}

fila.innerHTML = `
  <td data-label="Edad">${item.edad}</td>
  <td data-label="Tipo de trabajo">${item.tipo_trabajo}</td>
  <td data-label="Tipo de emprendimiento">${item.tipo_emprendimiento}</td>
  <td data-label="Sexo">${item.sexo}</td>
  <td data-label="Mes">${item.mes}</td>
`;