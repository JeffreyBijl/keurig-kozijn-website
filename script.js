/* ========================================
   KEURIG KOZIJN WEBSITE - JAVASCRIPT
   ========================================
   
   💡 TIP: Deze file bevat alle interactieve functionaliteit van de website.
   Hier kun je animatie snelheden, scroll instellingen en menu gedrag aanpassen.
*/

/* ========================================
   HOOFDFUNCTIE - WEBSITE INITIALISATIE
   ========================================
   
   Deze functie start zodra de pagina geladen is en initialiseert alle features.
*/

document.addEventListener('DOMContentLoaded', function() {
    // Verkrijg referenties naar belangrijke elementen
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // ⭐ Start het ster effect rond het logo
    initSparkleEffect();
    
    // 📱 Start het swipe-in effect (alleen bij navigatie tussen pagina's)
    initPageSwipeIn();
    
    // 🚀 Laad alle pagina's vooraf voor snellere navigatie (na 100ms vertraging)
    setTimeout(() => {
        preloadAllPages();
    }, 100);
    
    // 📜 Start de scroll animaties voor content reveals
    initScrollAnimations();

    // 🍔 HAMBURGER MENU FUNCTIONALITEIT
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 🔗 NAVIGATIE LINK GEDRAG
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Sluit het mobiele menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // ⚡ Start swipe transitie effect (alleen voor echte pagina links)
            if (!link.href.includes('#')) {
                e.preventDefault();
                fadeOutAndNavigate(link.href);
            }
        });
    });

    // 👆 KLIK BUITEN MENU = MENU SLUITEN
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        // Als je ergens anders klikt dan het menu of hamburger, sluit het menu
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

/* ========================================
   LOGO STER EFFECT
   ========================================
   
   💡 TIP: Wil je meer/minder sterren? Verander het aantal in de loop (6).
   Andere ster symbolen? Pas de starSymbols array aan.
*/

function initSparkleEffect() {
    const logo = document.querySelector('.nav-logo');
    if (!logo) return;
    
    // 🌟 Verschillende ster symbolen voor variatie
    const starSymbols = ['✦', '✧', '★', '✦', '✧', '★'];
    
    // Voeg 6 sterren toe rondom het logo
    for (let i = 0; i < 6; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = starSymbols[i];
        logo.appendChild(star);
    }
}

/* ========================================
   PAGINA TRANSITIE EFFECTEN
   ========================================
   
   💡 TIP: Transitie te snel/langzaam? Verander de timeout van 250ms.
   Andere swipe richting? Pas de translateX waarden aan in CSS.
*/

// 🔄 SWIPE NAVIGATIE EFFECT
function fadeOutAndNavigate(url) {
    // 📦 Laad de doelpagina vooraf voor snellere overgang
    preloadPage(url);
    
    // Maak overlay element als deze nog niet bestaat
    let overlay = document.querySelector('.transition-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'transition-overlay';
        document.body.appendChild(overlay);
    }
    
    // ⬅️ Start swipe-out animatie van huidige pagina
    document.body.classList.add('page-swipe-out');
    
    // ➡️ Laat overlay van rechts naar binnen schuiven
    requestAnimationFrame(() => {
        overlay.classList.add('active');
    });
    
    // 🕒 Navigeer naar nieuwe pagina (gereduceerd van 500ms naar 250ms voor snelheid)
    setTimeout(() => {
        window.location.href = url;
    }, 250);
}

// 📥 VOORAF LADEN VAN PAGINA'S
function preloadPage(url) {
    // Maak onzichtbare link voor browser prefetch
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
    
    // 🧹 Ruim link op na 1 seconde om geheugen vrij te maken
    setTimeout(() => {
        document.head.removeChild(link);
    }, 1000);
}

// 📱 SWIPE-IN EFFECT BIJ PAGINA LADEN
function initPageSwipeIn() {
    // Verwijder eventuele oude overlay elementen
    const overlay = document.querySelector('.transition-overlay');
    if (overlay) {
        overlay.remove();
    }
    
    // ✅ Alleen swipe-in als we van een andere pagina op deze site komen
    // Dit voorkomt onnodige animatie bij directe bezoeken of page refresh
    if (document.referrer && document.referrer.includes(window.location.hostname)) {
        // ➡️ Start swipe-in animatie
        document.body.classList.add('page-swipe-in');
        
        // 🧹 Verwijder animatie class na voltooiing
        setTimeout(() => {
            document.body.classList.remove('page-swipe-in');
        }, 300);
    }
}

// 🚀 VOORAF LADEN ALLE PAGINA'S
function preloadAllPages() {
    // Zoek alle navigatie links en CTA buttons
    const navLinks = document.querySelectorAll('.nav-link, .cta-button');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Alleen HTML pagina's vooraf laden
        if (href && href.endsWith('.html')) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'prefetch';
            preloadLink.href = href;
            document.head.appendChild(preloadLink);
        }
    });
}

/* ========================================
   SCROLL ANIMATIES
   ========================================
   
   💡 TIP: Animaties triggeren te vroeg/laat? Pas rootMargin aan.
   Threshold te gevoelig? Verander de 0.1 waarde.
   Stagger timing aanpassen? Wijzig de 100ms in de setTimeout.
*/

function initScrollAnimations() {
    // ⚙️ Instellingen voor wanneer animaties triggeren
    const observerOptions = {
        threshold: 0.1,              // Element moet 10% zichtbaar zijn
        rootMargin: '0px 0px -50px 0px'  // Trigger 50px voordat element volledig zichtbaar is
    };

    // 👀 Observer die kijkt wanneer elementen in beeld komen
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // ✨ Voeg 'animate' class toe voor CSS transitie
                entry.target.classList.add('animate');
                
                // 🎭 STAGGER EFFECT: animeer child elementen met vertraging
                const children = entry.target.querySelectorAll('.stagger-animation');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate');
                    }, index * 100); // 100ms vertraging tussen elk element
                });
            }
        });
    }, observerOptions);

    // 🎯 Zoek alle elementen die geanimeerd moeten worden
    const animateElements = document.querySelectorAll(
        '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
    );
    
    // 📝 Registreer elk element bij de observer
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

/* ========================================
   VERBETERDE SCROLL EFFECTEN
   ========================================
   
   💡 TIP: Header schaduw te subtiel/prominent? Pas de shadow waardes aan.
   Blur effect niet gewenst? Verwijder de backdropFilter regel.
*/

function initEnhancedScrollEffects() {
    let ticking = false; // Voorkomt te veel scroll events
    
    // 📊 Update effecten gebaseerd op scroll positie
    function updateScrollEffects() {
        const scrollY = window.scrollY;
        const header = document.querySelector('.header');
        
        // 🎨 DYNAMISCHE HEADER STYLING bij scrollen
        if (scrollY > 100) {
            // Meer prominente schaduw en blur effect bij scrollen
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            // Standaard styling bovenaan pagina
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'var(--secondary-color)';
            header.style.backdropFilter = 'none';
        }
        
        ticking = false;
    }
    
    // 🎮 PERFORMANCE OPTIMALISATIE: gebruik requestAnimationFrame
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    // 📜 Luister naar scroll events
    window.addEventListener('scroll', requestTick);
}

/* ========================================
   CONTACT FORMULIER VALIDATIE
   ========================================
   
   💡 TIP: Andere validatie regels nodig? Pas de regex patterns aan.
   Andere foutmeldingen? Wijzig de alert teksten.
*/

function validateContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return true; // Geen formulier = geen validatie nodig
    
    // 📋 Haal alle form waarden op
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // ✅ VALIDATIE CHECKS
    
    // Naam controle
    if (name === '') {
        alert('Vul alstublieft uw naam in.');
        return false;
    }
    
    // Email controle
    if (email === '') {
        alert('Vul alstublieft uw e-mailadres in.');
        return false;
    }
    
    // Email format controle
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Vul alstublieft een geldig e-mailadres in.');
        return false;
    }
    
    // Telefoon controle
    if (phone === '') {
        alert('Vul alstublieft uw telefoonnummer in.');
        return false;
    }
    
    // Telefoon format controle (minimaal 10 cijfers)
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        alert('Vul alstublieft een geldig telefoonnummer in.');
        return false;
    }
    
    // Bericht controle
    if (message === '') {
        alert('Vul alstublieft uw bericht in.');
        return false;
    }
    
    // 🎉 Alles is valid!
    alert('Bedankt voor uw bericht! Wij nemen zo spoedig mogelijk contact met u op.');
    return true;
}

// 📨 FORMULIER SUBMIT HANDLER
function handleFormSubmit(event) {
    event.preventDefault(); // Voorkom standaard form submit
    
    // Valideer en reset formulier bij succes
    if (validateContactForm()) {
        document.getElementById('contact-form').reset();
    }
}

/* ========================================
   ACTIEVE NAVIGATIE LINK
   ========================================
   
   Deze functie zorgt ervoor dat de juiste menu link gemarkeerd is als 'active'
   afhankelijk van welke pagina je bekijkt.
*/

function setActiveNavLink() {
    // 📍 Bepaal huidige pagina
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 🔗 Update alle navigatie links
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Markeer de juiste link als actief
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* ========================================
   WEBSITE INITIALISATIE
   ========================================
   
   Start alle functies zodra de DOM geladen is.
*/

// 🚀 Start verbeterde scroll effecten
window.addEventListener('DOMContentLoaded', function() {
    initEnhancedScrollEffects();
});

// 🎯 Zet actieve navigatie link
document.addEventListener('DOMContentLoaded', setActiveNavLink);

/* ========================================
   EINDE JAVASCRIPT
   ========================================
   
   🎉 Gefeliciteerd! Je hebt het einde van het JavaScript bestand bereikt.
   
   📝 ONDERHOUD TIPS:
   - Animatie snelheden: zoek naar setTimeout waardes (250ms, 300ms, etc.)
   - Scroll gevoeligheid: pas threshold en rootMargin aan in initScrollAnimations
   - Formulier validatie: wijzig de regex patterns voor andere eisen
   - Ster effect: pas starSymbols array aan voor andere symbolen
   
   🔧 VEEL VOORKOMENDE AANPASSINGEN:
   - Snellere page transitions: verklein de 250ms timeout in fadeOutAndNavigate
   - Meer sterren: verhoog het aantal in de for loop (6)
   - Andere scroll trigger punt: wijzig de 100 in scrollY > 100
   - Stagger timing: pas de 100ms aan in children.forEach timeout
   
   🐛 DEBUGGEN:
   - Console.log toevoegen om te zien welke functies worden aangeroepen
   - Check of elementen bestaan met document.querySelector voordat je ze gebruikt
   - Test op verschillende schermgroottes en browsers
   
   Happy coding! 🚀
*/