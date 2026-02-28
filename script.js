// ===== Header Scroll Logic =====
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (!header) return;

  if (window.scrollY > 80) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

// ===== FAQ Toggle =====
document.querySelectorAll(".faq-trigger").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    if (!item) return;

    item.classList.toggle("active");
    const icon = btn.querySelector("span");
    if (icon) icon.innerHTML = item.classList.contains("active") ? "&times;" : "+";
  });
});

// ===== Detail Panel Data =====
const details = {
  signature: {
    title: "Signature Line - Aurora Onyx",
    text: "Das Flaggschiff der Kollektion. Die Aurora-Serie ist eine Symbiose aus markanter Architektur und technologischer Exzellenz. Die patentierten Lamellensysteme bieten einen stufenlosen Schwenkbereich, der das Spiel von Licht und Schatten meisterhaft kontrolliert. Konzipiert für Generationen, gefertigt aus korrosionsbeständigem Aluminium der höchsten Güteklasse.",
    features: ["Smarte Sensorsteuerung", "Verdeckte Entwässerung", "Zertifizierte Schneelast", "Flächenbündiges Design"],
    img1: { src: "assets/img/aurora-1.jpg", alt: "Aurora Lamellen – Detail" },
    img2: { src: "assets/img/aurora-2.jpg", alt: "Aurora – Gesamtansicht" }
  },
  essence: {
    title: "Essence Line - Jade Glasdesign",
    text: "Filigrane Linienführung trifft auf maximale Transparenz. Die Jade-Serie schafft fließende Übergänge zwischen Wohnraum und Natur. Dank der Verwendung von thermisch vorgespannten Sicherheitsgläsern und ultraschlanken Profilquerschnitten bleibt das architektonische Bild Ihres Hauses unverfälscht und klar.",
    features: ["Integrierte LED-Ambiente", "VSG-Sicherheitsverglasung", "Modulares Schiebesystem", "UV-Schutz Beschichtung"],
    img1: { src: "assets/img/jade-1.jpg", alt: "Jade Profil – Detail" },
    img2: { src: "assets/img/jade-2.jpg", alt: "Jade – Sommergarten" }
  },
  pure: {
    title: "Pure Line - Coral Carport",
    text: "Ein Statement in Sachen Formensprache. Die Coral-Serie verzichtet auf jede Überflüssigkeit. Die kubische Konstruktion bietet nicht nur Schutz für Ihre Fahrzeuge, sondern wertet die Auffahrt durch eine reduzierte, zeitlose Ästhetik auf. Robust, freistehend und absolut wartungsfrei.",
    features: ["Freistehende Statik", "RAL-Wunschbeschichtung", "Schnee- & Hagelresistent", "Einfache Integration"],
    img1: { src: "assets/img/coral-1.jpg", alt: "Coral Carport – Design" },
    img2: { src: "assets/img/coral-2.jpg", alt: "Coral – Stütze Detail" }
  },
  living: {
    title: "Living Line - Outdoor Kitchen",
    text: "Kochen ohne Grenzen. Unsere Outdoor-Küchenlösungen integrieren sich nahtlos unter Ihre Überdachung. Gefertigt aus wetterfesten Materialien wie Edelstahl und HPL, bieten sie alle Annehmlichkeiten einer Profiküche direkt im Garten. Funktionalität trifft auf exklusives Design.",
    features: ["Wetterfeste Module", "Individuelle Planung", "Gas- & Elektroanschluss", "Hitzebeständige Arbeitsplatten"],
    img1: { src: "assets/img/kitchen-1.jpg", alt: "Outdoor Küche – unter Überdachung" },
    img2: { src: "assets/img/kitchen-2.jpg", alt: "Outdoor Küche – Detail" }
  },
  systeme: {
    title: "Integrierte Systeme - ZIP & LED",
    text: "Vervollkommnen Sie Ihren Komfort. Unsere ZIP-Beschattungen bieten nicht nur Sicht- und Sonnenschutz, sondern sind auch als Windschutz zertifiziert. Kombiniert mit unseren dimmbaren LED-Ambiente-Systemen schaffen Sie die perfekte Atmosphäre für jede Tageszeit.",
    features: ["Windfest bis 80km/h", "Insekten-Schutzfunktion", "Dimmbare LED-Warmweiß", "Fernbedienbar per App"],
    img1: { src: "assets/img/zip-1.jpg", alt: "ZIP Screen – Detail" },
    img2: { src: "assets/img/led-1.jpg", alt: "LED Beleuchtung – Ambiente" }
  }
};

const detailPanel = document.getElementById("detailPanel");
const detailContent = document.getElementById("detailContent");
const detailCloseBtn = document.querySelector(".detail-close");

function openDetail(key) {
  const data = details[key] || {
    title: "Detail",
    text: "Informationen folgen.",
    features: [],
    img1: null,
    img2: null
  };

  const imgBox = (img) => {
    if (!img || !img.src) return `<div class="detail-img-box">[Bild folgt]</div>`;
    return `
      <div class="detail-img-box">
        <img src="${img.src}" alt="${img.alt || ""}">
      </div>
    `;
  };

  const content = `
    <div class="detail-header">
      <span style="color:var(--gold); letter-spacing:5px; text-transform:uppercase; font-size:12px;">Detailansicht</span>
      <h2 style="font-size: clamp(30px, 5vw, 60px); text-transform:uppercase; font-weight:900;">${data.title}</h2>
    </div>

    <div class="detail-grid">
      ${imgBox(data.img1)}
      ${imgBox(data.img2)}
    </div>

    <div class="detail-text">
      <h4>Produktbeschreibung</h4>
      <p>${data.text}</p>

      <h4>Exklusive Merkmale</h4>
      <ul class="feature-list">
        ${(data.features || []).map(f => `<li>${f}</li>`).join("")}
      </ul>

      <br><br>
      <a href="#kontakt" class="btn btn-gold" id="detailCta">Dieses Modell anfragen</a>
    </div>
  `;

  detailContent.innerHTML = content;
  detailPanel.classList.add("active");
  detailPanel.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const cta = document.getElementById("detailCta");
  if (cta) {
    cta.addEventListener("click", () => closeDetail(), { once: true });
  }
}

function closeDetail() {
  detailPanel.classList.remove("active");
  detailPanel.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto";
}

if (detailCloseBtn) detailCloseBtn.addEventListener("click", closeDetail);

// Klicks auf Karten
document.querySelectorAll("[data-detail]").forEach((el) => {
  el.addEventListener("click", () => {
    const key = el.getAttribute("data-detail");
    openDetail(key);
  });
});

// Footer Links (ohne javascript:)
document.querySelectorAll("[data-detail-link]").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const key = a.getAttribute("data-detail-link");
    openDetail(key);
  });
});

// ESC schließt Detail/Modal
window.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  closeDetail();
  closeModal();
});

// ===== Legal Modal =====
const legalModal = document.getElementById("legalModal");
const modalBody = document.getElementById("modalBody");
const modalCloseBtn = document.querySelector(".modal-close");

const legalData = {
  impressum: `
    <h2>Impressum</h2>
    <p><strong>Angaben gemäß § 5 TMG</strong></p>
    <p>
      Smart Überdachung<br>
      Inhaber: Saiman Talwar<br>
      Bebelsbergstraße 1<br>
      71088 Holzgerlingen<br>
      Deutschland
    </p>

    <p><strong>Kontakt</strong></p>
    <p>
      E-Mail: <a href="mailto:info@smart-ueberdachung.de">info@smart-ueberdachung.de</a><br>
      Telefon: [Telefonnummer ergänzen]
    </p>

    <p><strong>Umsatzsteuer</strong></p>
    <p>
      Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [falls vorhanden]
    </p>

    <p><strong>Redaktionell verantwortlich (§ 18 Abs. 2 MStV)</strong></p>
    <p>
      Saiman Talwar, Anschrift wie oben
    </p>

    <p><strong>Haftung für Inhalte</strong></p>
    <p>
      Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
      Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
      oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
    </p>

    <p><strong>Haftung für Links</strong></p>
    <p>
      Unser Angebot enthält ggf. Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
      Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
      oder Betreiber der Seiten verantwortlich.
    </p>

    <p><strong>Urheberrecht</strong></p>
    <p>
      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
    </p>
  `,

  datenschutz: `
    <h2>Datenschutzerklärung</h2>

    <p><strong>1. Verantwortlicher</strong></p>
    <p>
      Smart Überdachung<br>
      Inhaber: Saiman Talwar<br>
      Bebelsbergstraße 1, 71088 Holzgerlingen, Deutschland<br>
      E-Mail: <a href="mailto:info@smart-ueberdachung.de">info@smart-ueberdachung.de</a>
    </p>

    <p><strong>2. Allgemeine Hinweise</strong></p>
    <p>
      Wir verarbeiten personenbezogene Daten nur, soweit dies erforderlich ist, um diese Website bereitzustellen,
      Anfragen zu beantworten oder gesetzliche Pflichten zu erfüllen. Wir nutzen kein Tracking, keine Analyse-Tools
      und keine Werbung/Marketing-Pixel.
    </p>

    <p><strong>3. Hosting</strong></p>
    <p>
      <u>Produktiv-Hosting (ALL-INKL):</u> Beim Aufruf der Website werden aus technischen Gründen Server-Logdaten verarbeitet
      (z. B. IP-Adresse, Datum/Uhrzeit, abgerufene Datei, Referrer, Browser/OS), um Betrieb und Sicherheit zu gewährleisten.
      Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem, stabilem Betrieb).
      Logdaten werden in der Regel zeitlich begrenzt gespeichert und danach gelöscht.
    </p>

    <p>
      <u>Demo/Entwicklung (GitHub Pages):</u> Für eine Vorführversion kann die Website auf GitHub Pages gehostet werden.
      Dabei verarbeitet GitHub im Rahmen der Bereitstellung technische Nutzungs-/Logdaten (u. a. IP-Adresse, Geräteinformationen,
      Zeitpunkt der Anfrage).
    </p>

    <p><strong>4. Kontaktaufnahme / Kontaktformular</strong></p>
    <p>
      Wenn du uns kontaktierst (z. B. per E-Mail oder Formular), verarbeiten wir deine Angaben (z. B. Name, E-Mail, Nachricht),
      um deine Anfrage zu bearbeiten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche/vertragliche Maßnahmen)
      oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Kommunikation).
      Die Daten werden gelöscht, sobald sie für den Zweck nicht mehr erforderlich sind und keine Aufbewahrungspflichten bestehen.
    </p>

    <p>
      Hinweis: Das Formular auf dieser Website ist aktuell eine Demo-Funktion (ohne tatsächliche Übertragung).
      Sobald eine echte Übermittlung (E-Mail/Backend/CRM) eingebunden wird, wird diese Datenschutzerklärung entsprechend konkretisiert.
    </p>

    <p><strong>5. Cookies / Local Storage</strong></p>
    <p>
      Wir setzen keine Tracking-Cookies ein. Technisch notwendige Cookies können je nach Hosting/Plattform
      für den sicheren Betrieb erforderlich sein.
    </p>

    <p><strong>6. Deine Rechte</strong></p>
    <p>
      Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch
      gegen bestimmte Verarbeitungen. Außerdem hast du das Recht, dich bei einer Datenschutzaufsichtsbehörde zu beschweren.
    </p>

    <p><strong>7. SSL/TLS-Verschlüsselung</strong></p>
    <p>
      Diese Website nutzt HTTPS-Verschlüsselung, um Datenübertragungen zu schützen.
    </p>
  `
};

function openModal(type) {
  if (!legalData[type]) return;
  modalBody.innerHTML = legalData[type];
  legalModal.style.display = "flex";
  legalModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  legalModal.style.display = "none";
  legalModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto";
}

if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);

// Links öffnen Modal
document.querySelectorAll("[data-legal]").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const type = a.getAttribute("data-legal");
    openModal(type);
  });
});

// Klick auf Overlay schließt Modal
legalModal.addEventListener("click", (e) => {
  if (e.target === legalModal) closeModal();
});

// ===== Contact Form (Demo) =====
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Anfrage erfolgreich (Demo) – es wurde nichts übertragen.");
    contactForm.reset();
  });
}
