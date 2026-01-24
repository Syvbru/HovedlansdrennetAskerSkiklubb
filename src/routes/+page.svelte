<script>
  import { onMount } from 'svelte';
  
  let currentSection = $state('home');
  let selectedMap = $state(null);

  const navigation = [
    { id: 'omRennet', label: 'Om rennet' },
    { id: 'hytter', label: 'Hytter' },
    { id: 'loypene', label: 'Løypene' },
    { id: 'smoreteam', label: 'Smøreteam' },
    { id: 'rennprogram', label: 'Rennprogram' },
    { id: 'praktisk', label: 'Praktisk info' }
  ];

  const hytter = [
    {
      title: 'HYTTE 1',
      responsible: 'Anders Øpstad',
      location: 'Adresse: Kvikndølåsen 13',
      athletes: ['Anna', 'Helene', 'Emil', 'Julia', 'Nora', '+ foreldre']
    },
    {
      title: 'HYTTE 2',
      responsible: 'Jens Erik Mortensen',
      location: 'Adresse: Savalodden 49',
      athletes: ['Emma', 'Alma', 'Lilje', 'Julie', '+ foreldre']
    },
    {
      title: 'HYTTE 3',
      responsible: 'Nina Windju Christiansen',
      location: 'Koordinater: 6917426N 267361Ø',
      athletes: ['Adrian', 'Knut-Eirik', 'Markus', 'Nathaniel', 'Storm', '+ foreldre']
    },
    {
      title: 'HYTTE 4',
      responsible: 'Thomas Tobro Wøien',
      location: 'Adresse: Savalbotn 67',
      athletes: ['Ida', 'Johanne', 'Ine', '+ foreldre']
    },
    {
      title: 'HYTTE 5',
      responsible: 'Audun Foss Knudsen',
      location: 'Adresse: Klevan nord 69',
      athletes: ['Halvor', 'Oscar', 'Sondre', 'Syver', '+ foreldre']
    }
  ];

  // Oppdatert med mapUrl
  const loypene = [
    {
      title: 'Sprint',
      distance: '1027 m',
      stilart: 'Klassisk',
      mapUrl: '/sprint-kart.png'
    },
    {
      title: 'Skicross',
      distance: 'Ikke oppgitt',
      stilart: 'Fristil',
      mapUrl: '/skicross-kart.png'
    },
    {
      title: 'Distanse 5km',
      distance: '5250 m',
      stilart: 'Fristil',
      mapUrl: '/5km-kart.png'
    },
    {
      title: 'Distanse 7,5km',
      distance: '7295 m',
      stilart: 'Fristil',
      mapUrl: '/7km-kart.png'
    },
    {
      title: 'Stafett jenter',
      distance: 'Ikke oppgitt',
      stilart: '2x Fristil + 2x Klassisk',
      mapUrl: '/stafettJenter-kart.png'
    },
    {
      title: 'Stafett gutter',
      distance: 'Ikke oppgitt',
      stilart: '2x Fristil + 2x Klassisk',
      mapUrl: '/stafettGutter-kart.png'
    }
  ];

  // Smøreteam organisert per dag
  const smoreDager = [
    {
      dag: 'Torsdag',
      personell: [
        { navn: 'Rangvald Lier', rolle: 'Smører', tlf: '412 15 485', tidspunkt: '15:00 - 19:00' },
        { navn: 'Anders Svindland', rolle: 'Smører', tlf: '951 02 504', tidspunkt: '15:00 - 19:00' },
        { navn: 'Andre Waage-Nielsen', rolle: 'Smører', tlf: '484 03 126', tidspunkt: '15:00 - 19:00' },
        { navn: 'Nina Windju Christiansen', rolle: 'Smører', tlf: '930 43 264', tidspunkt: '15:00 - 19:00' },
        { navn: 'Truls Eirik Holm', rolle: 'Logistikk', tlf: '913 28 300', tidspunkt: '15:00 - 19:00' }
      ]
    },
    {
      dag: 'Fredag',
      personell: [
        { navn: 'Thomas Strand', rolle: 'Smører', tlf: '930 85 464', tidspunkt: '07:00 - 12:00' },
        { navn: 'Andre Waage-Nielsen', rolle: 'Smører', tlf: '484 03 126', tidspunkt: '07:00 - 12:00' },
        { navn: 'Anders Øpstad', rolle: 'Smører', tlf: '472 36 388', tidspunkt: '07:00 - 12:00' },
        { navn: 'Petter Mathisen', rolle: 'Smører', tlf: '905 97 950', tidspunkt: '07:00 - 12:00' },
        { navn: 'Siri Bergsmark', rolle: 'Logistikk', tlf: '411 88 151', tidspunkt: '07:00 - 12:00' },
        { navn: 'Anders Svindland', rolle: 'Smører', tlf: '951 02 504', tidspunkt: '12:00 - 19:00' },
        { navn: 'Thomas Tobro Wøien', rolle: 'Smører', tlf: '905 42 471', tidspunkt: '12:00 - 19:00' },
        { navn: 'Jens Erik Mortensen', rolle: 'Smører', tlf: '470 50 563', tidspunkt: '12:00 - 19:00' },
        { navn: 'Audun Foss Knudsen', rolle: 'Smører', tlf: '945 38 058', tidspunkt: '12:00 - 19:00' },
        { navn: 'Harald Mølmen-Nertun', rolle: 'Logistikk', tlf: '909 37 338', tidspunkt: '12:00 - 19:00' },
      ]
    },
    {
      dag: 'Lørdag',
      personell: [
        { navn: 'Rangvald Lier', rolle: 'Smører', tlf: '412 15 485', tidspunkt: '08:00 - 13:00' },
        { navn: 'Andre Waage-Nielsen', rolle: 'Smører', tlf: '484 03 126', tidspunkt: '08:00 - 13:00' },
        { navn: 'Thomas Tobro Wøien', rolle: 'Smører', tlf: '905 42 471', tidspunkt: '08:00 - 13:00' },
        { navn: 'Jens Erik Mortensen', rolle: 'Smører', tlf: '470 50 563', tidspunkt: '08:00 - 13:00' },
        { navn: 'Endre Tjensvold', rolle: 'Logistikk', tlf: '929 95 919', tidspunkt: '08:00 - 13:00' },                
        { navn: 'Anders Svindland', rolle: 'Smører', tlf: '951 02 504', tidspunkt: '14:00 - 19:00' },
        { navn: 'Anders Øpstad', rolle: 'Smører', tlf: '472 36 388', tidspunkt: '14:00 - 19:00' },
        { navn: 'Petter Mathisen', rolle: 'Smører', tlf: '905 97 950', tidspunkt: '14:00 - 19:00' },
        { navn: 'Audun Foss Knudsen', rolle: 'Smører', tlf: '945 38 058', tidspunkt: '14:00 - 19:00' },
        { navn: 'Martin Hesselius', rolle: 'Logistikk', tlf: '473 42 463', tidspunkt: '14:00 - 19:00' }
      ]
    },
    {
      dag: 'Søndag',
      personell: [
        { navn: 'Thomas Strand', rolle: 'Smører', tlf: '930 85 464', tidspunkt: '07:00 - 12:00' },
        { navn: 'Anders Svindland', rolle: 'Smører', tlf: '951 02 504', tidspunkt: '07:00 - 12:00' },
        { navn: 'Andre Waage-Nielsen', rolle: 'Smører', tlf: '484 03 126', tidspunkt: '07:00 - 12:00' },
        { navn: 'Anders Øpstad', rolle: 'Smører', tlf: '472 36 388', tidspunkt: '07:00 - 12:00' },
        { navn: 'Glenn Phillips', rolle: 'Logistikk', tlf: '464 02 425', tidspunkt: '07:00 - 12:00' }
      ]
    }
  ];

  const getDagNavn = () => {
    const dager = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];
    const idag = new Date().getDay(); // 0 = Søndag, 1 = Mandag, osv.
    
    if (idag >= 1 && idag <= 4) {
      return 'Torsdag';
    }
    
    return dager[idag];
  };

  let valgtDag = $state(getDagNavn());

  let menuOpen = $state(false);

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  let visHeleTekstenOmRennet = $state(false);

  function toggleTekstOmRennet() {
    if (visHeleTekstenOmRennet) {
      scrollToSection('omRennet');
    }
    visHeleTekstenOmRennet = !visHeleTekstenOmRennet;
  }

  let visHeleTekstenRensSki = $state(false);
  
  function toggleTekstRensSki() {
    if (visHeleTekstenRensSki) {
      scrollToSection('smoreteam');
    }
    visHeleTekstenRensSki = !visHeleTekstenRensSki;
  }   

  function closeMenuAndScroll(sectionId) {
    menuOpen = false;
    scrollToSection(sectionId);
  }

  function scrollToSection(sectionId) {
    currentSection = sectionId;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Funksjon for å åpne kart-modal
  function openMap(url) {
    selectedMap = url;
  }

  // Funksjon for å lukke kart-modal
  function closeMap() {
    selectedMap = null;
  }
  
  onMount(() => {
    const handleScroll = () => {
      const sections = navigation.map(nav => document.getElementById(nav.id));
      const scrollPosition = window.scrollY + 100;
      
      // Sjekk om vi er helt på toppen
      if (window.scrollY < 100) {
        currentSection = 'home';
        return;
      }
      
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPosition) {
          currentSection = navigation[i].id;
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<svelte:head>
  <title>HL Asker Sk</title>
</svelte:head>

{#if selectedMap}
<div class="fixed inset-0 z-[100] bg-[#1e3a5f]/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
  <button 
    onclick={closeMap}
    class="absolute inset-0 w-full h-full cursor-default"
    aria-label="Lukk kartvisning"
  ></button>
  
  <div class="relative w-full max-w-5xl bg-white rounded-lg p-2 shadow-2xl">
    <button onclick={closeMap} class="absolute -top-12 right-0 text-white hover:text-orange-400 text-lg font-bold flex items-center gap-2">
      LUKK
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
    <img src={selectedMap} alt="Løypekart" class="w-full h-auto rounded object-contain max-h-[85vh]" />
  </div>
</div>
{/if}

<div class="min-h-screen bg-gray-50">
  <nav class="fixed top-0 left-0 right-0 bg-white backdrop-blur-sm shadow-md z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <button
          onclick={() => scrollToSection('home')}
          class="h-10 flex items-center focus:outline-none"
          aria-label="Gå til toppen"
        >
          <img
            src="/AskerSkiklubb.svg"
            alt="Asker Skiklubb HL 2026"
            class="h-full w-auto"
          />
        </button>
        <!-- Desktop meny -->
        <div class="hidden md:flex space-x-4">
          {#each navigation as nav}
            <button
              onclick={() => scrollToSection(nav.id)}
              class="whitespace-nowrap text-[#1e3a5f] hover:text-orange-700 transition-colors text-sm font-medium {currentSection === nav.id ? 'text-orange-500' : ''}"
            >
              {nav.label}
            </button>
          {/each}
        </div>

        <!-- Hamburger knapp (mobil) -->
        <button 
          onclick={toggleMenu}
          class="md:hidden text-[#1e3a5f] hover:text-orange-700 transition-colors"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {#if menuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            {/if}
          </svg>
        </button>
      </div>

      <!-- Mobil meny (dropdown) -->
      {#if menuOpen}
        <div class="md:hidden py-4 border-t border-gray-200">
          {#each navigation as nav}
            <button
              onclick={() => closeMenuAndScroll(nav.id)}
              class="block w-full text-left px-4 py-3 text-[#1e3a5f] hover:bg-orange-50 hover:text-orange-700 transition-colors text-sm font-medium {currentSection === nav.id ? 'text-orange-500 bg-orange-50 rounded-lg' : ''}"
            >
              {nav.label}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </nav>

  <section id="home" class="relative h-screen flex items-center justify-center">
    <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-black/0 z-10"></div>
    <img 
      src="/hero-savalen.jpg" 
      alt="Savalen winter landscape" 
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="relative z-20 text-center text-white px-4 max-w-4xl">
      <div class="text-sm uppercase tracking-widest mb-4 text-white">ASKER SKIKLUBB</div>
      <h1 class="text-4xl md:text-7xl font-bold mb-6">
        Hovedlandsrennet Savalen 2026
      </h1>
      <p class="text-xl md:text-2xl mb-12 text-gray-100">
        Informasjon om Asker Sk sitt opplegg under Hovedlandsrennet
      </p>
      
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>25.02 - 01.03</span>
        </div>
        <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Savalen, Hedmark</span>
        </div>
        <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Asker Skiklubb</span>
        </div>
      </div>
    </div>
    
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M19 14l-7 7m0 0l-7-7 7 7V3" />
      </svg>
    </div>
  </section>

  <section id="omRennet" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-16">
        <div class="text-center">
          <div class="text-orange-500 uppercase tracking-widest text-sm mb-4">VELKOMMEN</div>
          <h2 class="text-3xl md:text-5xl font-bold text-[#1e3a5f] mb-6">Om Hovedlandsrennet</h2>
        </div>
        
        <div class="text-base md:text-xl text-gray-600 max-w-5xl mx-auto">
          <p class="mb-4">
            HL er rett rundt hjørne og vi gleder oss til å levere flotte opplevelser for alle. Ønsker å informere om hvorfor HL er et stort arrangement 
            og hvorfor vi legger inn ekstra ressurser og opplegg rundt dette.
          </p>
          
          <div class:hidden={!visHeleTekstenOmRennet} class="md:block space-y-4">
            <p>
              Hovedlandsrennet er et tradisjonsrikt renn hvor skiløpere fra hele landet i alderen 15-16år møtes for å gå skirenn. Dette er først og fremst 
              en stor opplevelse hvor man deler skiglede og møtes på tvers av alder, kjønn, nivå og bosted. Vi oppfordrer til å skape minner rundt 
              arrangementet også utenom de individuelle prestasjonene og sette fokus på fellesskapet. Likevel er det ikke å komme utenom at dette 
              arrangementet også blir sett på som <span class="text-gray-500 font-light italic"> NM </span> og det store målet i løpet av sesongen hos de ivrigste.
            </p>
            
            <p>
              Arrangementet og opplegget vi lager rundt det, oppleves kanskje som litt <span class="text-gray-500 font-light italic"> ekstra </span>. Grunnen til dette og at vi setter inn ekstra ressurser og 
              opplegg er siden vi ønsker å sette klubb-fellesskapet i fokus, og at alle skal kunne ha like forutsetninger og like godt støtteapparat rundt 
              seg. Det vil alltid være noen som er ekstra ivrige og andre som tar det mer med <span class="text-gray-500 font-light italic"> ro </span>. For å holde oss samlet som klubb og at opplegget ikke 
              blir helt fragmentert og individualisert må vi sørge for at alle nivåer/ambisjoner blir ivaretatt. HL er en del av en <span class="text-gray-500 font-light italic"> aldringsprosess </span> hvor 
              opplegg stadig blir litt og litt mer seriøst frem mot junior og senior nivå hvor man har 4-5 helger med <span class="text-gray-500 font-light italic"> HL-opplegg ++ </span> (Norgescup).
            </p>
            
            <p>
              Vi håper foreldre kan hjelpe med å senke skuldrene til utøverne. I bunn og grunn er dette et helt vanlig skirenn, bare at opplegget er satt 
              mer i system og ivaretatt på klubb- og kretsnivå fremfor individuelt nivå.
            </p>
            
            <p>
              Vi ser frem mot en fantastisk helg!
            </p>
          </div>
          
          <button
            onclick={toggleTekstOmRennet}
            class="md:hidden mt-4 text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-2 mx-auto"
          >
            {visHeleTekstenOmRennet ? 'Les mindre' : 'Les mer'}
            <svg 
              class="w-4 h-4 transition-transform duration-200" 
              class:rotate-180={visHeleTekstenOmRennet}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div class="flex justify-center">        
        <div class="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-sm max-w-xl w-full">
          <div class="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-[#1e3a5f] mb-3">Sammen blir vi best</h3>
          <p class="text-gray-600">
            Lagånd og samhold står i fokus.
            Vi alle heier på, og gratulerer hverandre. Sammen utvikler vi oss, og tar steg som klubb.
            Alle blir igjen på stadion til siste Asker-løper har gått sitt renn ferdig.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section id="hytter" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="text-orange-500 uppercase tracking-widest text-sm mb-4">OVERNATTING</div>
        <h2 class="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-6">Våre hytter</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Vi har sikret fem private hytter med god beliggenhet og korte avstander til stadion. Det er veldig viktig at man behandler hyttene godt, da de vanligvis ikke er utleieobjekter.
        </p>
      </div>
      
      <div class="flex flex-wrap justify-center gap-4 md:gap-6">
        {#each hytter as hytte}
          <div class="w-full md:w-[48%] lg:w-[32%] bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
            <div class="p-4 md:p-8 flex-1">
              <div class="flex items-start justify-between md:mb-4">
                <h3 class="text-xl md:text-2xl font-bold text-[#1e3a5f]">{hytte.title}</h3>
                <div class="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 md:w-6 md:h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>

              <div class="space-y-3 mb-4 md:mb-6">
                <div class="flex items-center gap-3 text-gray-700 text-sm md:text-base">
                  <svg class="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{hytte.location}</span>
                </div>
              </div>
              
              <p class="text-gray-600 mb-6 font-bold">Ansvarlig: <span class="font-normal italic"> {hytte.responsible} </span> </p>
              
              <div class="flex flex-wrap gap-2">
                {#each hytte.athletes as athlete}
                  <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs md:text-sm">
                    {athlete}
                  </span>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>

      <div class="mt-16 bg-white p-2 rounded-2xl shadow-lg max-w-4xl mx-auto">
        <div class="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-xl bg-gray-100">
            <iframe 
                src="https://www.google.com/maps/d/embed?mid=1icimpOVf5iD7aJjyGcPC6xA7XXabHsk&ehbc=2E312F" 
                class="w-full h-[480px] border-0"
                title="Kart over hytter"
                loading="lazy">
            </iframe>
        </div>
      </div>
    </div>
  </section>

  <section id="loypene" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="text-orange-500 uppercase tracking-widest text-sm mb-4">KONKURRANSELØYPER</div>
        <h2 class="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-6">Løypene</h2>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-5">
        {#each loypene as loype}
          <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
            <div class="p-4 md:p-8">
              <div class="flex items-center justify-between mb-1 md:mb-4">
                <h2 class="text-2xl md:text-4xl font-bold text-[#1e3a5f]">{loype.title}</h2>
              </div>
              
              <p class="text-orange-600/80 font-bold mb-4 md:mb-6">Stilart: {loype.stilart}</p>
              
              <div class="flex gap-4">
                <div class="bg-orange-50 rounded-xl p-2 md:p-4 flex-grow">
                  <div class="flex items-center gap-2 text-orange-600 mb-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span class="text-xs font-medium">Distanse</span>
                  </div>
                  <div class="text-lg md:text-2xl font-bold text-[#1e3a5f] whitespace-nowrap">{loype.distance}</div>
                </div>

                <button 
                  onclick={() => openMap(loype.mapUrl)}
                  class="bg-[#1e3a5f] hover:bg-[#2a5285] text-white rounded-xl p-2 md:p-4 flex flex-col items-center justify-center w-24 transition-colors group"
                  title="Se løypekart"
                >
                  <svg class="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span class="text-xs font-medium">Løypekart</span>
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section id="smoreteam" class="py-20 bg-[#1e3a5f] text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="text-orange-400 uppercase tracking-widest text-sm mb-4">SWIX BESTEMMER - FORELEDRENE UTFØRER</div>
          <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">Smøreteamet</h2>
        </div>
          {#if visHeleTekstenRensSki}
            <div class="text-base md:text-xl text-blue-100  mx-auto space-y-4">
              <p> Prosessene som utføres under smøreopplegget på hovedlandsrennet er veldig forenklet, slik at man rekker å preppe 
                  alle ski, og sikre at alle utfører prosessene helt likt. Derfor er det veldig viktig å komme med helt rene ski, 
                  som både er fri for smuss og skitt, i tillegg til være helt fri for glider. Under HL brukes det som regel kun 
                  flytende glider, og det kan være en fordel å ha hatt på hard glider (Swix PS6) rett i forkant.
              </p>
              
              <p class="font-semibold">Her er steg for steg hva man bør gjøre før innlevering av ski (om man ønsker å være ekstra nøye):</p>
              <div class="text-sm">
                <ol class="list-decimal list-inside space-y-3 text-left mx-auto ">
                  <li>Fiberlene med gliderrens (ikke bruk gliderrens i festesonen)</li>
                  <li>La tørke i ca 2min</li>
                  <li>Børst frem og tilbake med hvit stiv nylonbørste</li>
                  <li>Ny runde fiberlene med gliderrens (ikke bruk gliderrens i festesonen)</li>
                  <li>La tørke i ca 2min</li>
                  <li>Børst med stålbørste kun i fartsretning</li>
                  <li>Ny runde fiberlene med gliderrens (ikke bruk gliderrens i festesonen)</li>
                  <li>La tørke i ca 2min</li>
                  <li>Børst med hvit stiv nylon kun i fartsretning</li>
                  <li>Tørk av med tørr fiberlene</li>
                  <li>Varm inn glider: Swix PS6</li>
                  <li>La glideren herde og sørg for at den blir kjølig</li>
                  <li>Sikle skiene med ren og skarp sikle og randsikling</li>
                  <li>Børst med stålbørste i fartsretning</li>
                  <li>Børst deretter med hestehår i fartsretning. Viktig at det ikke skal være noe som helst spor igjen av glider når man er ferdig børstet.</li>
                </ol>
              </div>
              <p>
                Mange ulike varianter av børster og prosesser man kan velge mellom. Jeg og mange andre bruker kun stålbørste og hestehår 
                (ikke nylon) etter gliderprosess. Man kan fint gå over med nylon helt til slutt om man synes det er trygt.
              </p>
    
              <p class="text-white font-semibold bg-orange-500/30 p-4 rounded-lg mt-10">
                NB! Merk skiene tydelig med navn og smøresoner før innlevering av ski. Rennskia må være uten festesmurning og glider. 
                De bør ikke ha blitt brukt til annet enn testing før de leveres inn.
              </p>
            </div>
          {/if}

          <button onclick={toggleTekstRensSki} class="mt-4 mb-4 text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-2 mx-auto"> {visHeleTekstenRensSki ? 'Les mindre' : 'Klargjøring av ski og rens før innlevering'}
            <svg class="w-4 h-4 transition-transform duration-200" class:rotate-180={visHeleTekstenRensSki} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

        <div class="flex flex-col gap-8">
          <div class="max-w-md">
            <label for="dagSelect" class="block text-base font-medium mb-2">Velg dag:</label>
            <select 
              id="dagSelect"
              bind:value={valgtDag}
              class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white text-lg font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer hover:bg-white/20 transition-colors"
            >
              {#each smoreDager as dagData}
                <option value={dagData.dag} class="bg-[#1e3a5f] text-white">{dagData.dag}</option>
              {/each}
            </select>
          </div>

          <div class="grid grid-cols-2 md:flex md:flex-wrap gap-3 md:gap-6">
            {#each smoreDager.find(d => d.dag === valgtDag)?.personell || [] as person}
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 hover:bg-white/20 transition-colors md:flex-1 md:min-w-[calc(33.333%-1rem)]">
                <div class="w-8 h-8 md:w-12 md:h-12 {person.rolle === 'Logistikk' ? 'bg-pink-500' : 'bg-orange-500'} rounded-lg flex items-center justify-center mb-3 md:mb-4 shadow-lg">
                  <svg class="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 class="text-sm md:text-xl font-bold mb-2">{person.navn}</h3>
                <div class="space-y-1">
                  <p class="{person.rolle === 'Logistikk' ? 'text-pink-300' : 'text-orange-300'} text-xs md:text-sm font-semibold uppercase tracking-wider">{person.rolle} </p>
                  <p class="text-xs md:text-sm font-semibold tracking-wider"> kl. {person.tidspunkt}</p>
                    <div class="flex items-center gap-2 text-gray-300 text-sm md:text-base mt-2">
                      <svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>

                      <a
                        href={`tel:${person.tlf}`}
                        class="underline hover:text-white"
                      >
                        {person.tlf}
                      </a>
                    </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
    </div>
  </section>

  <section id="rennprogram" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="text-orange-500 uppercase tracking-widest text-sm mb-4">DETTE ER TIDSPUNKTENE DU MÅ FORHOLDE DEG TIL</div>
        <h2 class="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-6">Rennprogram</h2>
      </div>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-gray-50 rounded-2xl shadow-lg p-8">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg class="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-[#1e3a5f]">Torsdag - 26.02</h3>
          </div>
          
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span class="text-gray-700">12.00 - 16.00 - Offisiell trening sprint/distanse</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span class="text-gray-700">14.00 - 16.00 - Offisiell trening langrennscross</span>
            </li>
          </ul>
        </div>
        
        <div class="bg-gray-50 rounded-2xl shadow-lg p-8">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg class="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-[#1e3a5f]">Fredag - 27.02</h3>
          </div>
          
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span class="text-gray-700">09.00 - Sprint prolog jenter og gutter</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span class="text-gray-700">11.30 - Kvartfinaler</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span class="text-gray-700">12.50 - Semifinaler</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span class="text-gray-700">13.20 - Finaler</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span class="text-gray-700">14.00 - Langrennscross</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span class="text-gray-700">16.15 - Premieutdeling kombicross, sprint og langrennscross</span>
            </li>
          </ul>
        </div>

        <div class="bg-gray-50 rounded-2xl shadow-lg p-8">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg class="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-[#1e3a5f]">Lørdag - 28.02</h3>
          </div>
          
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span class="text-gray-700">10.00 - Distanse skøyting, jenter</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span class="text-gray-700">12.00 - Premieutdeling jenter</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span class="text-gray-700">12.30 - Distanse skøyting, gutter</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span class="text-gray-700">15.00 - Premieutdeling gutter</span>
            </li>
          </ul>
        </div>

        <div class="bg-gray-50 rounded-2xl shadow-lg p-8">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg class="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-[#1e3a5f]">Søndag - 01.03</h3>
          </div>
          
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span class="text-gray-700">09.30 - Stafett jenter</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span class="text-gray-700">10.45 - Premieutdeling jenter</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span class="text-gray-700">11.00 - Stafett gutter</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span class="text-gray-700">12.25 - Premieutdeling gutter</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="praktisk" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="text-orange-500 uppercase tracking-widest text-sm mb-4">ALT DU TRENGER Å VITE</div>
        <h2 class="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-6">Praktisk informasjon</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Her finner du all nødvendig informasjon.
        </p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg class="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-[#1e3a5f]">Avreise & Hjemreise</h3>
          </div>
          
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span class="text-gray-700">Avreise fra Asker onsdag 25. februar</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span class="text-gray-700">Hjemreise søndag etter premieutdeling</span>
            </li>
          </ul>
        </div>
        
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg class="w-7 h-7 text-orange-500" viewBox="0 0 512 512" fill="currentColor">
                <path d="M207 24v109c0 7-6 13-13 13h-3c-7 0-13-6-13-13V23c0-18-12-23-24-23s-24 5-24 23v110c0 7-6 13-13 13h-3c-7 0-13-6-13-13V24c0-32-46-31-46 0v104c0 58 14 73 36 91 19 15 35 23 35 59v232h55V278c0-36 16-44 35-59 23-18 37-33 37-91V24c0-32-46-33-46 0z"/>
                <path d="M385 35c-12 33-46 110-48 178-3 106 62 90 63 160v139h55s0 0 0-1c0-9 0-120 0-232 0-111 0-225 0-244 0-40-52-51-70 0z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-[#1e3a5f]">Måltider</h3>
          </div>
          
          <ul class="space-y-4 mb-8">
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <span class="text-gray-700">Frokost og lunsj organiseres innad i hyttene</span>
            </li>
          </ul>

          <!-- Middagsoversikt per dag -->
          <div class="bg-orange-50 backdrop-blur-sm rounded-2xl p-4 md:p-6">
            <ul>
              <li class="flex items-start gap-3">
                <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <span class="text-gray-700">Middag med to og to hytter</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <span class="text-gray-700">Hytten som står først lager middagen</span>
              </li>
            </ul>
            <div class="space-y-4 mt-8">
              <!-- Onsdag -->
              <details class="group border-l-4 border-orange-400 bg-orange-100 rounded-r-lg overflow-hidden">
                <summary class="flex items-center justify-between cursor-pointer p-4 hover:bg-orange-200 transition-colors">
                  <h4 class="font-bold text-[#1e3a5f]">Onsdag</h4>
                  <svg class="w-5 h-5 text-orange-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div class="px-4 pb-4 text-gray-700">
                  🚗 Spiser på vei opp
                </div>
              </details>

              <!-- Torsdag -->
              <details class="group border-l-4 border-orange-400 bg-orange-100 rounded-r-lg overflow-hidden">
                <summary class="flex items-center justify-between cursor-pointer p-4 hover:bg-orange-200 transition-colors">
                  <h4 class="font-bold text-[#1e3a5f]">Torsdag</h4>
                  <svg class="w-5 h-5 text-orange-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div class="px-4 pb-4 space-y-2">
                  <div class="text-gray-700">
                    <strong>Hytte 1</strong> + <strong> Hytte 4 </strong>
                  </div>
                  <div class="text-gray-700">
                    <strong>Hytte 2</strong> + <strong> Hytte 3 </strong>
                  </div>
                  <div class="text-gray-700">
                    <strong>Hytte 5</strong> spiser alene
                  </div>
                </div>
              </details>

              <!-- Fredag -->
              <details class="group border-l-4 border-orange-400 bg-orange-100 rounded-r-lg overflow-hidden">
                <summary class="flex items-center justify-between cursor-pointer p-4 hover:bg-orange-200 transition-colors">
                  <h4 class="font-bold text-[#1e3a5f]">Fredag</h4>
                  <svg class="w-5 h-5 text-orange-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div class="px-4 pb-4 space-y-2">
                  <div class="text-gray-700">
                    <strong>Hytte 5</strong> + <strong> Hytte 1 </strong>
                  </div>
                  <div class="text-gray-700">
                    <strong>Hytte 3</strong> + <strong> Hytte 4 </strong>
                  </div>
                  <div class="text-gray-700">
                    <strong>Hytte 2</strong> spiser alene
                  </div>
                </div>
              </details>

              <!-- Lørdag -->
              <details class="group border-l-4 border-orange-400 bg-orange-100 rounded-r-lg overflow-hidden">
                <summary class="flex items-center justify-between cursor-pointer p-4 hover:bg-orange-200 transition-colors">
                  <h4 class="font-bold text-[#1e3a5f]">Lørdag</h4>
                  <svg class="w-5 h-5 text-orange-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div class="px-4 pb-4 space-y-2">
                  <div class="text-gray-700">
                    <strong>Hytte 3</strong> + <strong> Hytte 5 </strong>
                  </div>
                  <div class="text-gray-700">
                    <strong>Hytte 4</strong> + <strong> Hytte 2 </strong>
                  </div>
                  <div class="text-gray-700">
                    <strong>Hytte 1</strong> spiser alene
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer class="bg-[#1e3a5f] text-white md:min-h-[500px] lg:min-h-[400px] py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        <div>
          <h4 class="text-xl font-bold mb-6">Lenker</h4>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
            <li><a href="https://www.skiforbundet.no/arrangement/2025-2026/hl2026/" class="hover:text-orange-400 transition-colors flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> Skiforbundet - HL 2026
            </a></li>
            <li><a href="https://www.skiforbundet.no/arrangement/2025-2026/hl2026/parkering/" class="hover:text-orange-400 transition-colors flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> Parkering stadion
            </a></li>
            <li><a href="https://isonen.no/event/cmhm68tvl02cdbj01hegjvrjf/" class="hover:text-orange-400 transition-colors flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> iSonen - idividuelle øvelser
            </a></li>
            <li><a href="https://www.yr.no/nb/værvarsel/daglig-tabell/1-522579/Norge/Innlandet/Tynset/Savalen" class="hover:text-orange-400 transition-colors flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> Været på Savalen
            </a></li>
          </ul>
        </div>

        <div class="md:flex md:justify-end">
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 w-full max-w-md">
            <h4 class="text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">Kontakt</h4>
            <h5 class="text-2xl font-bold mb-1">Rennleder Langrenn:</h5>
            <p class="text-xl font-bold mb-6">Geir Schjølberg</p>
            
            <div class="space-y-4">
              <a href="mailto:gschjolberg@gmail.com" class="flex items-center gap-3 text-gray-300 hover:text-white group transition-colors">
                <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span class="text-sm md:text-base underline">gschjolberg@gmail.com</span>
              </a>
              
              <a href="tel:+4741853814" class="flex items-center gap-3 text-gray-300 hover:text-white group transition-colors">
                <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span class="text-sm md:text-base underline">418 53 814</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </footer>
</div>
