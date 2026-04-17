
    const cities = [
      'Amaral Ferrador RS','Angical BA','Anita Garibaldi SC','Anta Gorda RS','Aracatu BA','Arambaré RS','Armazém SC','Arraias TO','Arroio do Silva SC','Arroio dos Ratos RS','Arvorezinha RS','Baianópolis BA','Barão do Triunfo RS','Barra do Ribeiro RS','Barracão RS','Barros Cassal RS','Bom Jesus da Lapa BA','Botuporã BA','Braço do Norte SC','Brejolândia BA','Brumado BA','Butiá RS','Cacique Doble RS','Caculé BA','Caetité BA','Caibi SC','Caiçara RS','Campos Belos GO','Campos Novos SC','Canápolis BA','Candiba BA','Carinhanha BA','Carlos Gomes RS','Casca RS','Cerro Grande do Sul RS','Charqueadas RS','Chuvisca RS','Ciríaco RS','Cocos BA','Combinado TO','Coribe BA','Correia Pinto SC','Correntina BA','Cotegipe BA','Cotiporã RS','Criciúma SC Quarta Linha','Criciúma SC Rio Maina','Cristal RS','Dois Lajeados RS','Dom Feliciano RS','Eldorado do Sul RS','Encantado RS','Encruzilhada do Sul RS','Ermo SC','Esmeralda RS','Espinosa MG','Fontoura Xavier RS','Forquilhinha SC','General Câmara RS','Guaíba RS Santa Rita','Guanambi BA','Guaporé RS','Horizontina RS','Iaciara GO','Ibiassucê BA','Ibirapuitã RS','Ibotirama BA','Içara SC','Igaporã BA','Ilópolis RS','Imaruí SC','Iraí RS','Jaborandi BA','Jacinto Machado SC','Jaguaruna SC','Júlio de Castilhos RS','Lagoa Real BA','Lagoão RS','Lauro Muller SC','Livramento de Nossa Senhora BA','Macaúbas BA','Machadinho RS','Maracajá SC','Marau RS','Matina BA','Mato verde MG','Maximiliano de Almeida RS','Minas do Leão RS','Mondai SC','Monte Azul MG','Morro da Fumaça SC','Muçum RS','Nova Bassano RS','Nova Veneza SC','Orleans SC','Paim Filho RS','Palmas de Monte Alto BA','Palmitos SC','Pantano Grande RS','Paramirim BA','Paranã TO','Parque Eldorado RS','Pindaí BA','Pinhal da Serra RS','Planalto RS','Ponte Alta SC','Posse GO','Praia Grande SC','Presidente Jânio Quadros BA','Putinga RS','Riachão das Neves BA','Riacho de Santana BA','Rio do Pires BA','Rio Fortuna SC','Rio Pardo RS Ramiz Galvão','Roca Sales RS','Roda Velha BA','Salto do Jacuí RS','Sangão SC','Santa Cecília SC','Santa Clara do Sul RS','Santa Maria da Vitória BA','Santa Rosa do Sul SC','Santana BA','Santo Antônio do Palma RS','São Desidério BA','São Domingos GO','São Jerônimo RS','São João do Sul SC','São José do Ouro RS','São Lourenço do Sul RS','São Ludgero SC','São Miguel do Oeste SC','Segredo RS','Sentinela do Sul RS','Serafina Corrêa RS','Serra do Ramalho BA','Serra Dourada BA','Sertão Santana RS','Siderópolis SC','Sítio do Mato BA','Sombrio SC','Tabocas do Brejo Velho BA','Taguatinga TO','Tanque Novo BA','Tapejara RS','Tapera RS','Tapes RS','Três Passos RS','Triunfo RS','Tupanci do Sul RS','Tupanciretã RS','Turvo SC','União da Serra RS','Urandi BA','Urussanga SC','Brumado BA','Ibicoara BA','Cascavel BA','Barra da Estiva BA'
    ];

    const citiesGrid = document.getElementById('citiesGrid');
    const citySearch = document.getElementById('citySearch');
    const cityCount = document.getElementById('cityCount');
    const activeFilter = document.getElementById('activeFilter');
    const emptyState = document.getElementById('emptyState');
    const stateFilters = document.getElementById('stateFilters');
    const nav = document.getElementById('mainNav');
    const menuToggle = document.getElementById('menuToggle');

    let selectedState = 'ALL';

    function parseCity(item) {
      const validStates = ['RS', 'SC', 'BA', 'GO', 'TO', 'MG'];
      const parts = item.trim().split(' ');

      const last = parts[parts.length - 1];
      if (validStates.includes(last)) {
        return { city: parts.slice(0, -1).join(' '), state: last, full: item };
      }

      const stateIndex = parts.findIndex(part => validStates.includes(part));
      if (stateIndex !== -1) {
        return {
          city: parts.slice(0, stateIndex).join(' '),
          state: parts[stateIndex],
          full: item
        };
      }

      return { city: item, state: '', full: item };
    }

    function renderCities() {
      const query = citySearch.value.trim().toLowerCase();

      const filtered = cities
        .map(parseCity)
        .filter(item => {
          const matchesText = item.full.toLowerCase().includes(query);
          const matchesState = selectedState === 'ALL' || item.state === selectedState;
          return matchesText && matchesState;
        })
        .sort((a, b) => a.city.localeCompare(b.city, 'pt-BR'));

      if (filtered.length === 0) {
        citiesGrid.innerHTML = '';
        citiesGrid.style.display = 'none';
        emptyState.style.display = 'block';
      } else {
        citiesGrid.innerHTML = filtered.map(item => `
          <article class="city-card">
            <strong>${item.city}</strong>
            <span>${item.state || 'BR'}</span>
          </article>
        `).join('');
        citiesGrid.style.display = 'grid';
        emptyState.style.display = 'none';
      }

      cityCount.textContent = `${filtered.length} cidade${filtered.length === 1 ? '' : 's'}`;
      activeFilter.textContent = `Filtro: ${selectedState === 'ALL' ? 'Todos' : selectedState}`;
    }

    stateFilters.addEventListener('click', (e) => {
      const pill = e.target.closest('.pill');
      if (!pill) return;
      selectedState = pill.dataset.state;
      document.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
      pill.classList.add('active');
      renderCities();
    });

    citySearch.addEventListener('input', renderCities);

    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen && window.innerWidth <= 860 ? 'hidden' : '';
    });

    document.querySelectorAll('.nav a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));

    const sections = [...document.querySelectorAll('main section[id]')];
    const navLinks = [...document.querySelectorAll('.nav a')];

    function setActiveLink() {
      const scrollY = window.scrollY + 140;
      let current = sections[0]?.id || '';
      sections.forEach(section => {
        if (scrollY >= section.offsetTop) current = section.id;
      });
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
      });
    }

    window.addEventListener('scroll', setActiveLink, { passive: true });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    renderCities();
    setActiveLink();
