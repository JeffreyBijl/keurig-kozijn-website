# 🏢 Keurig Kozijn Website

Een moderne, responsive website voor een kozijnenbedrijf met professionele animaties en een clean design.

## 🎯 Features

- ✨ **Custom CSS Logo** - Geen externe afbeeldingen, volledig CSS gebaseerd
- ⭐ **Subtiele Ster Animaties** - Zakelijke grijstinten rond het logo
- 📱 **Volledig Responsive** - Ziet er perfect uit op alle apparaten
- 🔄 **Swipe Navigatie** - Vloeiende overgangen tussen pagina's
- 📜 **Scroll Animaties** - Content wordt geanimeerd in beeld
- 🍔 **Hamburger Menu** - Voor mobiele navigatie
- 📧 **Werkend Contactformulier** - Met validatie
- 🚀 **Performance Optimized** - Preloading en smooth animaties

## 📁 Bestanden Structuur

```
/
├── index.html          # Hoofdpagina (home)
├── kozijnen.html       # Portfolio pagina
├── contact.html        # Contact pagina met formulier
├── styles.css          # Alle styling en animaties
├── script.js           # Alle JavaScript functionaliteit
├── README.md           # Dit bestand
└── img/                # Afbeeldingen map
    ├── logo.jpg        # Origineel logo (niet meer gebruikt)
    ├── logo-spark.jpg  # Inspiratie voor sterren effect
    ├── kozijn-1.jpg    # Portfolio afbeelding 1
    ├── kozijn-2.jpg    # Portfolio afbeelding 2
    ├── kozijn-3.jpg    # Portfolio afbeelding 3
    └── kozijn-4.jpg    # Portfolio afbeelding 4
```

## 🎨 Kleuren Aanpassen

Alle kleuren kun je eenvoudig aanpassen in `styles.css` bovenaan in de `:root` sectie:

```css
:root {
    /* Hoofdkleuren */
    --primary-color: #000000;      /* Zwart - hoofdkleur */
    --secondary-color: #ffffff;    /* Wit - achtergronden */
    --accent-color: #333333;       /* Donkergrijs - hover effecten */
    
    /* Ster kleuren (zakelijke grijstinten) */
    --star-color-1: #666666;
    --star-color-2: #888888;
    /* etc... */
}
```

### 💡 Veelgebruikte Kleurcombinaties

**Blauw Thema:**
```css
--primary-color: #1e3a8a;
--secondary-color: #ffffff;
--accent-color: #3b82f6;
```

**Groen Thema:**
```css
--primary-color: #166534;
--secondary-color: #ffffff; 
--accent-color: #22c55e;
```

## 🔧 Logo Aanpassingen

Het logo is volledig CSS gebaseerd. Aanpassingen maken in `styles.css`:

```css
/* Logo grootte */
.logo-icon {
    width: 50px;    /* Verander voor grootte */
    height: 50px;   /* Verander voor grootte */
}

/* Logo tekst */
.logo-text .brand-name {
    font-size: 1.8rem;  /* Hoofdtekst grootte */
}
```

## ⭐ Sterren Effect Aanpassen

### Sterren Uitschakelen
```css
.nav-logo::before,
.nav-logo::after,
.star {
    display: none;
}
```

### Meer/Minder Sterren
In `script.js`, wijzig het aantal:
```javascript
for (let i = 0; i < 6; i++) {  // Verander 6 naar gewenst aantal
```

### Andere Ster Symbolen
```javascript
const starSymbols = ['✦', '✧', '★', '✨', '⭐', '💫'];
```

## 🚀 Animatie Snelheden

### Page Transitions
In `script.js`:
```javascript
setTimeout(() => {
    window.location.href = url;
}, 250);  // Verander 250ms voor snellere/langzamere transitie
```

### Scroll Animaties
In `styles.css`:
```css
.scroll-animate {
    transition: all 0.8s ease-out;  /* Verander 0.8s */
}
```

## 📱 Responsive Breakpoints

Aanpassingen maken in de `@media` queries in `styles.css`:

```css
/* Tablet */
@media (max-width: 768px) { /* Verander breakpoint */ }

/* Mobiel */
@media (max-width: 480px) { /* Verander breakpoint */ }
```

## 📧 Contact Formulier

### Validatie Regels Aanpassen
In `script.js` bij `validateContactForm()`:

```javascript
// Email regex aanpassen
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Telefoon regex aanpassen
const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;  // Min 10 cijfers
```

### Formulier Velden Toevoegen
1. Voeg HTML toe in `contact.html`
2. Voeg validatie toe in `validateContactForm()`

## 🎯 SEO Optimalisatie

### Meta Tags Toevoegen
In elke HTML file in de `<head>`:

```html
<meta name="description" content="Keurig Kozijn - Maatwerk kozijnen met 20 jaar ervaring door Klaas-Jan">
<meta name="keywords" content="kozijnen, ramen, deuren, maatwerk, Klaas-Jan">
<meta property="og:title" content="Keurig Kozijn - Klaas-Jan">
<meta property="og:description" content="Professionele kozijnen op maat door Klaas-Jan">
```

## 🐛 Veel Voorkomende Problemen

### Animaties Werken Niet
- Check of JavaScript enabled is
- Controleer browser console op errors
- Test op verschillende browsers

### Menu Blijft Open op Mobiel
- Check of `hamburger` en `navMenu` elementen bestaan
- Controleer of JavaScript correct geladen wordt

### Afbeeldingen Laden Niet
- Controleer of pad correct is (`img/kozijn-1.jpg`)
- Check bestandsnamen (hoofdlettergevoelig op servers)

## 🔄 Updates & Onderhoud

### Nieuwe Pagina Toevoegen
1. Kopieer een bestaande HTML file
2. Pas titel en content aan
3. Voeg link toe in navigatie menu's
4. Update `preloadAllPages()` in script.js als nodig

### Nieuwe Sectie Toevoegen
1. Voeg HTML structuur toe
2. Kopieer styling van vergelijkbare sectie in CSS
3. Pas kleuren/spacing aan naar wens

### Performance Optimalisatie
- Optimaliseer afbeeldingen (WebP formaat)
- Minify CSS en JavaScript voor productie
- Gebruik CDN voor snellere laadtijden

## 📞 Support

Voor technische vragen of aanpassingen:
1. Check eerst de comments in de CSS en JavaScript files
2. Zoek naar relevante secties met Ctrl+F
3. Test wijzigingen eerst lokaal voordat je online zet

## 🚀 Deployment

### Lokaal Testen
1. Open `index.html` in browser
2. Test alle links en animaties
3. Check responsive design met browser dev tools

### Online Zetten
1. Upload alle bestanden naar webserver
2. Zorg dat de `img/` map mee geüpload wordt
3. Test alle functionaliteit online

---

**Happy coding! 🎉**

*Deze website is gebouwd met liefde voor vakmanschap en aandacht voor detail - net zoals Klaas-Jan van Keurig Kozijn zijn kozijnen maakt.*