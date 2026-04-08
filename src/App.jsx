import { useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import "./App.css";



const TRANSLATIONS = {
  de: {
    languageLabel: "Sprache",
    languages: {
      de: "Deutsch",
      fr: "Französisch",
      it: "Italienisch",
      en: "Englisch",
    },
    appTitle: "Mieterspiegel Generator",
    titleLabel: "Titel",
    objectNameLabel: "Objektname",
    designVariantLabel: "Designvariante",
    footerLabel: "Footer / Zusatztext",
    floorsAndTenants: "Etagen & Parteien",
    sortFloors: "Etagen sortieren",
    addFloor: "+ Etage hinzufügen",
    floorLabel: "Etage",
    textMode: "Text",
    logoMode: "Logo",
    tenantCompanyLabel: "Partei / Firma",
    subtitleLabel: "Unterzeile",
    logoSizeLabel: "Logo-Grösse (%)",
    logoHorizontalLabel: "Logo horizontal",
    logoVerticalLabel: "Logo vertikal",
    logoXLabel: "Logo X-Feintuning",
    logoYLabel: "Logo Y-Feintuning",
    alignLeft: "Links",
    alignCenter: "Zentriert",
    alignRight: "Rechts",
    alignTop: "Oben",
    alignMiddle: "Mitte",
    alignBottom: "Unten",
    uploadLogo: "Logo hochladen",
    logoExists: "Logo vorhanden",
    noLogo: "Kein Logo",
    removeLogo: "Logo entfernen",
    deleteEntry: "Eintrag löschen",
    addTenant: "+ Partei hinzufügen",
    saveProject: "Projekt speichern",
    loadProject: "Projekt laden",
    newProject: "Neues Projekt",
    createPng: "PNG erstellen",
    hintText: "PNG-Export: exakt 1080 × 1920 Pixel. Pro Eintrag ist entweder Text oder Logo möglich.",
    previewTitle: "Live-Vorschau · 9:16",
    exportMeta: "Export: 1080 × 1920 px",
    denseWarning: "Hinweis: Viele Einträge vorhanden. Die Vorschau wurde automatisch kompakter gemacht.",
    veryDenseWarning: "Achtung: Sehr viele Einträge. Die Schrift und Logos wurden stark verkleinert.",
    placeholderTitle: "z. B. Mieterverzeichnis",
    placeholderObject: "z. B. Bahnhofstrasse 10",
    placeholderFooter: "z. B. Willkommen",
    placeholderFloor: "z. B. EG, 1. OG, Attika",
    placeholderTenant: "z. B. Muster AG",
    placeholderSubtitle: "z. B. Beratung / Praxis / Empfang",
    toastFloorDeleted: "Etage gelöscht.",
    toastFloorsSorted: "Etagen automatisch sortiert.",
    toastEntryDeleted: "Eintrag gelöscht.",
    toastLogoUploaded: "Logo hochgeladen.",
    toastLogoError: "Logo konnte nicht geladen werden.",
    toastProjectSaved: "Projekt gespeichert.",
    toastProjectLoaded: "Projekt erfolgreich geladen.",
    toastProjectReset: "Neues Projekt gestartet.",
    toastPngExported: "PNG exportiert (1080 × 1920).",
    toastPngError: "PNG konnte nicht erstellt werden.",
    invalidProject: "Ungültige Projektdatei.",
    invalidFloors: "Die Projektdatei enthält keine gültigen Etagen.",
    loadError: "Die Datei konnte nicht geladen werden.",
    instructionsTitle: "Kurzanleitung:",
    instructionsStep1: "Wähle zuerst Titel, Objektname, Design und Sprache.",
    instructionsStep2: "Füge Etagen hinzu und erfasse pro Eintrag entweder Text oder ein Logo.",
    instructionsStep3: "Mit „Projekt speichern“ wird eine JSON-Datei erstellt. Diese kannst du später wieder laden und weiterbearbeiten.",
    instructionsStep4: "Mit „Projekt laden“ öffnest du eine gespeicherte JSON-Datei erneut im Editor.",
    instructionsStep5: "Mit „PNG erstellen“ exportierst du die aktuelle Vorschau als Bild im Format 1080 × 1920 Pixel.",
  },

  fr: {
    languageLabel: "Langue",
    languages: {
      de: "Allemand",
      fr: "Français",
      it: "Italien",
      en: "Anglais",
    },
    appTitle: "Générateur de répertoire des locataires",
    titleLabel: "Titre",
    objectNameLabel: "Nom de l’objet",
    designVariantLabel: "Variante de design",
    footerLabel: "Pied de page / texte supplémentaire",
    floorsAndTenants: "Étages & locataires",
    sortFloors: "Trier les étages",
    addFloor: "+ Ajouter un étage",
    floorLabel: "Étage",
    textMode: "Texte",
    logoMode: "Logo",
    tenantCompanyLabel: "Locataire / Entreprise",
    subtitleLabel: "Sous-ligne",
    logoSizeLabel: "Taille du logo (%)",
    logoHorizontalLabel: "Logo horizontal",
    logoVerticalLabel: "Logo vertical",
    logoXLabel: "Ajustement X du logo",
    logoYLabel: "Ajustement Y du logo",
    alignLeft: "Gauche",
    alignCenter: "Centré",
    alignRight: "Droite",
    alignTop: "Haut",
    alignMiddle: "Milieu",
    alignBottom: "Bas",
    uploadLogo: "Télécharger le logo",
    logoExists: "Logo disponible",
    noLogo: "Pas de logo",
    removeLogo: "Supprimer le logo",
    deleteEntry: "Supprimer l’entrée",
    addTenant: "+ Ajouter un locataire",
    saveProject: "Enregistrer le projet",
    loadProject: "Charger le projet",
    newProject: "Nouveau projet",
    createPng: "Créer PNG",
    hintText: "Export PNG : exactement 1080 × 1920 pixels. Chaque entrée peut contenir soit du texte, soit un logo.",
    previewTitle: "Aperçu en direct · 9:16",
    exportMeta: "Export : 1080 × 1920 px",
    denseWarning: "Remarque : beaucoup d’entrées. L’aperçu a été automatiquement compacté.",
    veryDenseWarning: "Attention : beaucoup d’entrées. Les textes et logos ont été fortement réduits.",
    placeholderTitle: "p. ex. Répertoire des locataires",
    placeholderObject: "p. ex. Rue de la Gare 10",
    placeholderFooter: "p. ex. Bienvenue",
    placeholderFloor: "p. ex. RDC, 1er étage, Attique",
    placeholderTenant: "p. ex. Société Exemple SA",
    placeholderSubtitle: "p. ex. Conseil / Cabinet / Réception",
    toastFloorDeleted: "Étage supprimé.",
    toastFloorsSorted: "Étages triés automatiquement.",
    toastEntryDeleted: "Entrée supprimée.",
    toastLogoUploaded: "Logo téléchargé.",
    toastLogoError: "Le logo n’a pas pu être chargé.",
    toastProjectSaved: "Projet enregistré.",
    toastProjectLoaded: "Projet chargé avec succès.",
    toastProjectReset: "Nouveau projet démarré.",
    toastPngExported: "PNG exporté (1080 × 1920).",
    toastPngError: "Le PNG n’a pas pu être créé.",
    invalidProject: "Fichier de projet invalide.",
    invalidFloors: "Le fichier de projet ne contient pas d’étages valides.",
    loadError: "Le fichier n’a pas pu être chargé.",
    instructionsTitle: "Guide rapide:",
    instructionsStep1: "Choisissez d’abord le titre, le nom de l’objet, le design et la langue.",
    instructionsStep2: "Ajoutez les étages et saisissez pour chaque entrée soit du texte, soit un logo.",
    instructionsStep3: "Avec « Enregistrer le projet », un fichier JSON est créé. Vous pourrez le recharger plus tard pour continuer la modification.",
    instructionsStep4: "Avec « Charger le projet », vous ouvrez à nouveau un fichier JSON enregistré dans l’éditeur.",
    instructionsStep5: "Avec « Créer PNG », vous exportez l’aperçu actuel comme image au format 1080 × 1920 pixels.",
  },

  it: {
    languageLabel: "Lingua",
    languages: {
      de: "Tedesco",
      fr: "Francese",
      it: "Italiano",
      en: "Inglese",
    },
    appTitle: "Generatore elenco inquilini",
    titleLabel: "Titolo",
    objectNameLabel: "Nome immobile",
    designVariantLabel: "Variante di design",
    footerLabel: "Footer / testo aggiuntivo",
    floorsAndTenants: "Piani & inquilini",
    sortFloors: "Ordina piani",
    addFloor: "+ Aggiungi piano",
    floorLabel: "Piano",
    textMode: "Testo",
    logoMode: "Logo",
    tenantCompanyLabel: "Inquilino / Azienda",
    subtitleLabel: "Sottotitolo",
    logoSizeLabel: "Dimensione logo (%)",
    logoHorizontalLabel: "Logo orizzontale",
    logoVerticalLabel: "Logo verticale",
    logoXLabel: "Regolazione X logo",
    logoYLabel: "Regolazione Y logo",
    alignLeft: "Sinistra",
    alignCenter: "Centrato",
    alignRight: "Destra",
    alignTop: "Alto",
    alignMiddle: "Centro",
    alignBottom: "Basso",
    uploadLogo: "Carica logo",
    logoExists: "Logo presente",
    noLogo: "Nessun logo",
    removeLogo: "Rimuovi logo",
    deleteEntry: "Elimina voce",
    addTenant: "+ Aggiungi inquilino",
    saveProject: "Salva progetto",
    loadProject: "Carica progetto",
    newProject: "Nuovo progetto",
    createPng: "Crea PNG",
    hintText: "Esportazione PNG: esattamente 1080 × 1920 pixel. Per ogni voce è possibile usare solo testo oppure solo logo.",
    previewTitle: "Anteprima live · 9:16",
    exportMeta: "Export: 1080 × 1920 px",
    denseWarning: "Nota: molte voci presenti. L’anteprima è stata resa automaticamente più compatta.",
    veryDenseWarning: "Attenzione: moltissime voci. Testi e loghi sono stati ridotti notevolmente.",
    placeholderTitle: "es. Elenco inquilini",
    placeholderObject: "es. Via Stazione 10",
    placeholderFooter: "es. Benvenuti",
    placeholderFloor: "es. PT, 1° piano, Attico",
    placeholderTenant: "es. Azienda Esempio SA",
    placeholderSubtitle: "es. Consulenza / Studio / Reception",
    toastFloorDeleted: "Piano eliminato.",
    toastFloorsSorted: "Piani ordinati automaticamente.",
    toastEntryDeleted: "Voce eliminata.",
    toastLogoUploaded: "Logo caricato.",
    toastLogoError: "Impossibile caricare il logo.",
    toastProjectSaved: "Progetto salvato.",
    toastProjectLoaded: "Progetto caricato con successo.",
    toastProjectReset: "Nuovo progetto avviato.",
    toastPngExported: "PNG esportato (1080 × 1920).",
    toastPngError: "Impossibile creare il PNG.",
    invalidProject: "File progetto non valido.",
    invalidFloors: "Il file progetto non contiene piani validi.",
    loadError: "Impossibile caricare il file.",
    instructionsTitle: "Guida rapida:",
    instructionsStep1: "Per prima cosa scegli titolo, nome immobile, design e lingua.",
    instructionsStep2: "Aggiungi i piani e inserisci per ogni voce oppure testo oppure un logo.",
    instructionsStep3: "Con « Salva progetto » viene creato un file JSON. Potrai riaprirlo più tardi per continuare a modificarlo.",
    instructionsStep4: "Con « Carica progetto » riapri nell’editor un file JSON salvato in precedenza.",
    instructionsStep5: "Con « Crea PNG » esporti l’anteprima attuale come immagine nel formato 1080 × 1920 pixel.",
  },

  en: {
    languageLabel: "Language",
    languages: {
      de: "German",
      fr: "French",
      it: "Italian",
      en: "English",
    },
    appTitle: "Tenant Directory Generator",
    titleLabel: "Title",
    objectNameLabel: "Building name",
    designVariantLabel: "Design variant",
    footerLabel: "Footer / additional text",
    floorsAndTenants: "Floors & tenants",
    sortFloors: "Sort floors",
    addFloor: "+ Add floor",
    floorLabel: "Floor",
    textMode: "Text",
    logoMode: "Logo",
    tenantCompanyLabel: "Tenant / company",
    subtitleLabel: "Subtitle",
    logoSizeLabel: "Logo size (%)",
    logoHorizontalLabel: "Logo horizontal",
    logoVerticalLabel: "Logo vertical",
    logoXLabel: "Logo X fine-tuning",
    logoYLabel: "Logo Y fine-tuning",
    alignLeft: "Left",
    alignCenter: "Centered",
    alignRight: "Right",
    alignTop: "Top",
    alignMiddle: "Middle",
    alignBottom: "Bottom",
    uploadLogo: "Upload logo",
    logoExists: "Logo available",
    noLogo: "No logo",
    removeLogo: "Remove logo",
    deleteEntry: "Delete entry",
    addTenant: "+ Add tenant",
    saveProject: "Save project",
    loadProject: "Load project",
    newProject: "New project",
    createPng: "Create PNG",
    hintText: "PNG export: exactly 1080 × 1920 pixels. Each entry can contain either text or a logo.",
    previewTitle: "Live preview · 9:16",
    exportMeta: "Export: 1080 × 1920 px",
    denseWarning: "Note: many entries detected. The preview was automatically compacted.",
    veryDenseWarning: "Warning: a very high number of entries. Text and logos were reduced significantly.",
    placeholderTitle: "e.g. Tenant directory",
    placeholderObject: "e.g. Station Street 10",
    placeholderFooter: "e.g. Welcome",
    placeholderFloor: "e.g. Ground floor, 1st floor, Attic",
    placeholderTenant: "e.g. Example Ltd.",
    placeholderSubtitle: "e.g. Consulting / Practice / Reception",
    toastFloorDeleted: "Floor deleted.",
    toastFloorsSorted: "Floors sorted automatically.",
    toastEntryDeleted: "Entry deleted.",
    toastLogoUploaded: "Logo uploaded.",
    toastLogoError: "Logo could not be loaded.",
    toastProjectSaved: "Project saved.",
    toastProjectLoaded: "Project loaded successfully.",
    toastProjectReset: "New project started.",
    toastPngExported: "PNG exported (1080 × 1920).",
    toastPngError: "PNG could not be created.",
    invalidProject: "Invalid project file.",
    invalidFloors: "The project file does not contain valid floors.",
    loadError: "The file could not be loaded.",
    instructionsTitle: "Quick guide:",
    instructionsStep1: "First choose the title, building name, design, and language.",
    instructionsStep2: "Add floors and create each entry using either text or a logo.",
    instructionsStep3: "Use “Save project” to create a JSON file. You can load it again later and continue editing.",
    instructionsStep4: "Use “Load project” to reopen a saved JSON file in the editor.",
    instructionsStep5: "Use “Create PNG” to export the current preview as an image in 1080 × 1920 pixels.",
  },
};



const THEMES = {
  clean: {
    name: "Clean",
    background: "#ffffff",
    text: "#111827",
    subtext: "#6b7280",
    line: "#e5e7eb",
    accent: "#111827",
    cardBorder: "#e5e7eb",
    logoBg: "transparent",
  },
  dark: {
    name: "Dark",
    background: "#020617",
    text: "#f8fafc",
    subtext: "#94a3b8",
    line: "#1e293b",
    accent: "#f8fafc",
    cardBorder: "#1e293b",
    logoBg: "transparent",
  },
  corporate: {
    name: "Corporate",
    background: "#f8fafc",
    text: "#0f172a",
    subtext: "#64748b",
    line: "#cbd5e1",
    accent: "#0369a1",
    cardBorder: "#dbeafe",
    logoBg: "transparent",
  },
};




const makeId = () => Math.random().toString(36).slice(2, 10);


const createTenant = (overrides = {}) => ({
  id: makeId(),
  mode: "text",
  name: "",
  subtitle: "",
  logo: null,
  logoScale: 100,
  logoOffsetX: 0,
  logoOffsetY: 0,
  logoAlignX: "left",
  logoAlignY: "center",
  ...overrides,
});


const createFloor = (label = "", tenants = [createTenant()]) => ({
  id: makeId(),
  label,
  tenants,
});



function createInitialProject() {
  return {
    language: "en",
    title: "Tenant directory",
    buildingName: "Example building",
    theme: "dark",
    footerText: "",
    floors: [
      createFloor("3. OG", [
        createTenant({
          mode: "text",
          name: "Praxis am Park",
          subtitle: "Dr. Meier",
        }),
      ]),
      createFloor("2. OG", [
        createTenant({
          mode: "text",
          name: "Müller Treuhand AG",
          subtitle: "Beratung & Verwaltung",
        }),
      ]),
      createFloor("1. OG", [
        createTenant({
          mode: "text",
          name: "Kanzlei Keller",
          subtitle: "Recht & Notariat",
        }),
      ]),
      createFloor("EG", [
        createTenant({
          mode: "text",
          name: "Empfang",
          subtitle: "Information",
        }),
      ]),
    ],
  };
}



function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function slugify(value) {
  return (value || "mieterspiegel")
    .toLowerCase()
    .trim()
    .replace(/[ä]/g, "ae")
    .replace(/[ö]/g, "oe")
    .replace(/[ü]/g, "ue")
    .replace(/[ß]/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildExportFilename(project, ext) {
  return `${slugify(project.buildingName || "mieterspiegel")}-${getTodayString()}.${ext}`;
}

function getFloorSortValue(label) {
  const normalized = (label || "").trim().toUpperCase();

  if (!normalized) return -9999;
  if (normalized === "EG") return 0;
  if (normalized === "ATTIKA") return 100;
  if (normalized === "DG") return 90;

  const ogMatch = normalized.match(/(\d+)\s*\.?\s*OG/);
  if (ogMatch) return Number(ogMatch[1]);

  const ugMatch = normalized.match(/(\d+)\s*\.?\s*UG/);
  if (ugMatch) return -Number(ugMatch[1]);

  return -5000;
}

function normalizeTenant(rawTenant = {}) {
  const mode =
    rawTenant.mode === "logo" || rawTenant.mode === "text"
      ? rawTenant.mode
      : rawTenant.logo
      ? "logo"
      : "text";

  return createTenant({
    id: rawTenant.id || makeId(),
    mode,
    name: typeof rawTenant.name === "string" ? rawTenant.name : "",
    subtitle: typeof rawTenant.subtitle === "string" ? rawTenant.subtitle : "",
    logo: typeof rawTenant.logo === "string" ? rawTenant.logo : null,
    logoScale:
      typeof rawTenant.logoScale === "number" ? rawTenant.logoScale : 100,
    logoOffsetX:
      typeof rawTenant.logoOffsetX === "number" ? rawTenant.logoOffsetX : 0,
    logoOffsetY:
      typeof rawTenant.logoOffsetY === "number" ? rawTenant.logoOffsetY : 0,
    logoAlignX:
      rawTenant.logoAlignX === "center" || rawTenant.logoAlignX === "right"
        ? rawTenant.logoAlignX
        : "left",
    logoAlignY:
      rawTenant.logoAlignY === "top" ||
      rawTenant.logoAlignY === "bottom" ||
      rawTenant.logoAlignY === "center"
        ? rawTenant.logoAlignY
        : "center",
  });
}

function normalizeFloor(rawFloor = {}) {
  const tenants = Array.isArray(rawFloor.tenants)
    ? rawFloor.tenants.map(normalizeTenant)
    : [createTenant()];

  return createFloor(
    typeof rawFloor.label === "string" ? rawFloor.label : "",
    tenants.length ? tenants : [createTenant()]
  );
}

function validateAndNormalizeProject(raw, lang = "en") {
  const tr = TRANSLATIONS[lang] || TRANSLATIONS.de;

  if (!raw || typeof raw !== "object") {
    throw new Error(tr.invalidProject);
  }

  if (!Array.isArray(raw.floors)) {
    throw new Error(tr.invalidFloors);
  }

  const floors = raw.floors.map(normalizeFloor);

  return {
    language:
      typeof raw.language === "string" && TRANSLATIONS[raw.language]
        ? raw.language
        : "en",
    title: typeof raw.title === "string" ? raw.title : "Mieterverzeichnis",
    buildingName:
      typeof raw.buildingName === "string"
        ? raw.buildingName
        : "Beispielhaus Zürich",
    theme:
      typeof raw.theme === "string" && THEMES[raw.theme]
        ? raw.theme
        : "dark",
    footerText: typeof raw.footerText === "string" ? raw.footerText : "",
    floors,
  };
}

function getLogoJustifyContent(align) {
  if (align === "center") return "center";
  if (align === "right") return "flex-end";
  return "flex-start";
}

function getLogoAlignItems(align) {
  if (align === "top") return "flex-start";
  if (align === "bottom") return "flex-end";
  return "center";
}

function Toast({ toast }) {
  if (!toast) return null;
  return <div className={`toast toast-${toast.type}`}>{toast.message}</div>;
}

function Preview({ project, t }) {
  const theme = THEMES[project.theme];

  const visibleFloors = project.floors
    .map((floor) => ({
      ...floor,
      tenants: floor.tenants.filter((tenant) =>
        tenant.mode === "logo"
          ? !!tenant.logo
          : !!tenant.name || !!tenant.subtitle
      ),
    }))
    .filter((floor) => floor.label || floor.tenants.length > 0);

  const totalEntries = visibleFloors.reduce(
    (sum, floor) => sum + Math.max(floor.tenants.length, 1),
    0
  );

  const useTwoColumns = visibleFloors.length >= 10 || totalEntries >= 16;
  const hasHeader = !!(project.title || project.buildingName);
  const hasFooter = !!project.footerText;
  const previewHeight = 640;

  let layout = {
    padding: 28,
    headerGap: 22,
    floorCol: 54,
    floorFont: 11,
    tenantFont: 15,
    subtitleFont: 11,
    tenantGap: 12,
    tenantInnerGap: 4,
    logoBoxWidth: 138,
    logoBoxHeight: 42,
    footerFont: 11,
    accentWidth: 42,
  };

  if (totalEntries <= 3) {
    layout = {
      padding: 34,
      headerGap: 28,
      floorCol: 58,
      floorFont: 13,
      tenantFont: 28,
      subtitleFont: 17,
      tenantGap: 18,
      tenantInnerGap: 6,
      logoBoxWidth: 220,
      logoBoxHeight: 72,
      footerFont: 13,
      accentWidth: 54,
    };
  } else if (totalEntries <= 5) {
    layout = {
      padding: 32,
      headerGap: 24,
      floorCol: 56,
      floorFont: 12,
      tenantFont: 23,
      subtitleFont: 15,
      tenantGap: 16,
      tenantInnerGap: 5,
      logoBoxWidth: 190,
      logoBoxHeight: 58,
      footerFont: 12,
      accentWidth: 50,
    };
  } else if (totalEntries <= 8) {
    layout = {
      padding: 28,
      headerGap: 22,
      floorCol: 54,
      floorFont: 11,
      tenantFont: 18,
      subtitleFont: 13,
      tenantGap: 14,
      tenantInnerGap: 4,
      logoBoxWidth: 160,
      logoBoxHeight: 48,
      footerFont: 12,
      accentWidth: 46,
    };
  } else if (totalEntries <= 12) {
    layout = {
      padding: 24,
      headerGap: 18,
      floorCol: 50,
      floorFont: 10,
      tenantFont: 15,
      subtitleFont: 11,
      tenantGap: 12,
      tenantInnerGap: 3,
      logoBoxWidth: 138,
      logoBoxHeight: 40,
      footerFont: 11,
      accentWidth: 42,
    };
  } else {
    layout = {
      padding: 18,
      headerGap: 14,
      floorCol: 46,
      floorFont: 9,
      tenantFont: 12,
      subtitleFont: 10,
      tenantGap: 10,
      tenantInnerGap: 2,
      logoBoxWidth: 116,
      logoBoxHeight: 34,
      footerFont: 10,
      accentWidth: 36,
    };
  }

  const headerHeight = hasHeader ? 70 + layout.headerGap : 0;
  const footerHeight = hasFooter ? 28 : 0;
  const availableHeight =
    previewHeight - layout.padding * 2 - headerHeight - footerHeight;

  const rowCount = useTwoColumns
    ? Math.ceil(visibleFloors.length / 2)
    : visibleFloors.length;

  const rowHeight =
    rowCount > 0
      ? Math.max(52, Math.min(110, availableHeight / rowCount))
      : 70;

  const isDense = totalEntries >= 12;
  const isVeryDense = totalEntries >= 16;

  return (
    <div className="preview-wrap">
      <div
        id="preview-capture"
        className="phone-preview"
        style={{
          background: theme.background,
          color: theme.text,
          borderColor: theme.cardBorder,
          padding: `${layout.padding}px`,
        }}
      >
        {hasHeader ? (
          <div style={{ marginBottom: layout.headerGap }}>
            <div
              className="preview-accent"
              style={{
                background: theme.accent,
                width: `${layout.accentWidth}px`,
              }}
            />

            {project.title ? (
              <h1 className="preview-title" style={{ color: theme.text }}>
                {project.title}
              </h1>
            ) : null}

            {project.buildingName ? (
              <div className="preview-building" style={{ color: theme.subtext }}>
                {project.buildingName}
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="preview-body">
          <div className={useTwoColumns ? "floors floors-two-columns" : "floors"}>
            {visibleFloors.map((floor) => (
              <div
                className="floor-row"
                key={floor.id}
                style={{
                  gridTemplateColumns: `${layout.floorCol}px 1fr`,
                  minHeight: `${rowHeight}px`,
                  paddingTop: `${Math.max(6, rowHeight * 0.08)}px`,
                  paddingBottom: `${Math.max(6, rowHeight * 0.08)}px`,
                }}
              >
                <div
                  className="floor-label"
                  style={{
                    color: theme.subtext,
                    fontSize: `${layout.floorFont}px`,
                  }}
                >
                  {floor.label}
                </div>

                <div className="floor-content">
                  {floor.tenants.map((tenant) => {
                    const logoScale = clamp(tenant.logoScale || 100, 30, 300);
                    const logoBoxWidth = layout.logoBoxWidth;
                    const logoBoxHeight = layout.logoBoxHeight;
                    const maxLogoWidth = logoBoxWidth * (logoScale / 100);
                    const maxLogoHeight = logoBoxHeight * (logoScale / 100);

                    return (
                      <div
                        className="tenant-row"
                        key={tenant.id}
                        style={{ gap: `${layout.tenantGap}px` }}
                      >
                        {tenant.mode === "logo" && tenant.logo ? (
                          <div
                            className="tenant-logo-box"
                            style={{
                              width: `${logoBoxWidth}px`,
                              height: `${logoBoxHeight}px`,
                              justifyContent: getLogoJustifyContent(
                                tenant.logoAlignX
                              ),
                              alignItems: getLogoAlignItems(tenant.logoAlignY),
                              transform: `translate(${tenant.logoOffsetX || 0}px, ${
                                tenant.logoOffsetY || 0
                              }px)`,
                            }}
                          >
                            <img
                              src={tenant.logo}
                              alt="Logo"
                              className="tenant-logo"
                              style={{
                                background: theme.logoBg,
                                maxWidth: `${maxLogoWidth}px`,
                                maxHeight: `${maxLogoHeight}px`,
                              }}
                            />
                          </div>
                        ) : null}

                        {tenant.mode === "text" ? (
                          <div
                            className="tenant-text-wrap"
                            style={{ gap: `${layout.tenantInnerGap}px` }}
                          >
                            {tenant.name ? (
                              <div
                                className="tenant-name"
                                style={{
                                  color: theme.text,
                                  fontSize: `${layout.tenantFont}px`,
                                }}
                              >
                                {tenant.name}
                              </div>
                            ) : null}

                            {tenant.subtitle ? (
                              <div
                                className="tenant-subtitle"
                                style={{
                                  color: theme.subtext,
                                  fontSize: `${layout.subtitleFont}px`,
                                }}
                              >
                                {tenant.subtitle}
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}

                  <div
                    className="floor-line"
                    style={{
                      background: theme.line,
                      marginTop: `${Math.max(8, rowHeight * 0.12)}px`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {hasFooter ? (
          <div
            className="preview-footer"
            style={{
              color: theme.subtext,
              fontSize: `${layout.footerFont}px`,
            }}
          >
            {project.footerText}
          </div>
        ) : null}
      </div>

      {isDense ? (
        <div className={`preview-warning ${isVeryDense ? "strong" : ""}`}>
          {isVeryDense ? t.veryDenseWarning : t.denseWarning}
        </div>
      ) : null}
    </div>
  );
}

export default function App() {
  const [project, setProject] = useState(createInitialProject);
  const [toast, setToast] = useState(null);
  const loadInputRef = useRef(null);

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timeout);
  }, [toast]);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  const themeOptions = useMemo(
    () =>
      Object.entries(THEMES).map(([key, value]) => ({
        key,
        name: value.name,
      })),
    []
  );

  const t = TRANSLATIONS[project.language || "en"] || TRANSLATIONS.en;

  const updateProject = (patch) => {
    setProject((prev) => ({ ...prev, ...patch }));
  };

  const updateFloor = (floorId, patch) => {
    setProject((prev) => ({
      ...prev,
      floors: prev.floors.map((floor) =>
        floor.id === floorId ? { ...floor, ...patch } : floor
      ),
    }));
  };

  const updateTenant = (floorId, tenantId, patch) => {
    setProject((prev) => ({
      ...prev,
      floors: prev.floors.map((floor) =>
        floor.id !== floorId
          ? floor
          : {
              ...floor,
              tenants: floor.tenants.map((tenant) =>
                tenant.id === tenantId ? { ...tenant, ...patch } : tenant
              ),
            }
      ),
    }));
  };

  const setTenantMode = (floorId, tenantId, mode) => {
    setProject((prev) => ({
      ...prev,
      floors: prev.floors.map((floor) =>
        floor.id !== floorId
          ? floor
          : {
              ...floor,
              tenants: floor.tenants.map((tenant) => {
                if (tenant.id !== tenantId) return tenant;

                if (mode === "text") {
                  return {
                    ...tenant,
                    mode: "text",
                    logo: null,
                    logoScale: 100,
                    logoOffsetX: 0,
                    logoOffsetY: 0,
                    logoAlignX: "left",
                    logoAlignY: "center",
                  };
                }

                return {
                  ...tenant,
                  mode: "logo",
                  name: "",
                  subtitle: "",
                };
              }),
            }
      ),
    }));
  };

  const addFloor = () => {
    setProject((prev) => {
      let newLabel = "EG";

      if (prev.floors.length > 0) {
        const normalizedLabels = prev.floors.map((f) =>
          (f.label || "").trim().toUpperCase()
        );

        if (normalizedLabels.includes("EG")) {
          const ogNumbers = prev.floors
            .map((f) => {
              const match = (f.label || "").match(/(\d+)\s*\.\s*OG/i);
              return match ? parseInt(match[1], 10) : null;
            })
            .filter((n) => n !== null);

          if (ogNumbers.length > 0) {
            newLabel = `${Math.max(...ogNumbers) + 1}. OG`;
          } else {
            newLabel = "1. OG";
          }
        }
      }

      return {
        ...prev,
        floors: [createFloor(newLabel), ...prev.floors],
      };
    });
  };

  const removeFloor = (floorId) => {
    setProject((prev) => ({
      ...prev,
      floors: prev.floors.filter((floor) => floor.id !== floorId),
    }));
    showToast(t.toastFloorDeleted, "info");
  };

  const moveFloor = (floorId, direction) => {
    setProject((prev) => {
      const idx = prev.floors.findIndex((f) => f.id === floorId);
      const next = [...prev.floors];
      const target = direction === "up" ? idx - 1 : idx + 1;

      if (idx < 0 || target < 0 || target >= next.length) return prev;

      [next[idx], next[target]] = [next[target], next[idx]];
      return { ...prev, floors: next };
    });
  };

  const sortFloors = () => {
    setProject((prev) => ({
      ...prev,
      floors: [...prev.floors].sort(
        (a, b) => getFloorSortValue(b.label) - getFloorSortValue(a.label)
      ),
    }));
    showToast(t.toastFloorsSorted, "success");
  };

  const addTenant = (floorId) => {
    setProject((prev) => ({
      ...prev,
      floors: prev.floors.map((floor) =>
        floor.id === floorId
          ? { ...floor, tenants: [...floor.tenants, createTenant()] }
          : floor
      ),
    }));
  };

  const removeTenant = (floorId, tenantId) => {
    setProject((prev) => ({
      ...prev,
      floors: prev.floors.map((floor) =>
        floor.id === floorId
          ? {
              ...floor,
              tenants: floor.tenants.filter((tenant) => tenant.id !== tenantId),
            }
          : floor
      ),
    }));
    showToast(t.toastEntryDeleted, "info");
  };

  const onLogoUpload = async (floorId, tenantId, file) => {
    if (!file) return;

    try {
      const dataUrl = await fileToDataUrl(file);
      updateTenant(floorId, tenantId, {
        mode: "logo",
        logo: dataUrl,
        name: "",
        subtitle: "",
      });
      showToast(t.toastLogoUploaded, "success");
    } catch {
      showToast(t.toastLogoError, "error");
    }
  };

  const saveProject = () => {
    download(
      buildExportFilename(project, "json"),
      JSON.stringify(project, null, 2),
      "application/json"
    );
    showToast(t.toastProjectSaved, "success");
  };

  const loadProject = async (file) => {
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const fileLang =
        typeof parsed?.language === "string" && TRANSLATIONS[parsed.language]
          ? parsed.language
          : project.language || "en";
      const normalized = validateAndNormalizeProject(parsed, fileLang);
      setProject(normalized);
      const loadedT = TRANSLATIONS[fileLang] || t;
      showToast(loadedT.toastProjectLoaded, "success");
    } catch (error) {
      showToast(error?.message || t.loadError, "error");
    }
  };

  const resetProject = () => {
    setProject(createInitialProject());
    showToast(t.toastProjectReset, "success");
  };

  const exportPng = async () => {
    const element = document.getElementById("preview-capture");
    if (!element) return;

    const targetWidth = 1080;
    const targetHeight = 1920;

    const originalStyles = {
      borderRadius: element.style.borderRadius,
      boxShadow: element.style.boxShadow,
      border: element.style.border,
      margin: element.style.margin,
    };

    element.style.borderRadius = "0";
    element.style.boxShadow = "none";
    element.style.border = "none";
    element.style.margin = "0";

    try {
      const sourceCanvas = await html2canvas(element, {
        scale: 5,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });

      const exportCanvas = document.createElement("canvas");
      exportCanvas.width = targetWidth;
      exportCanvas.height = targetHeight;

      const ctx = exportCanvas.getContext("2d");
      if (!ctx) throw new Error(t.toastPngError);

      ctx.clearRect(0, 0, targetWidth, targetHeight);
      ctx.drawImage(
        sourceCanvas,
        0,
        0,
        sourceCanvas.width,
        sourceCanvas.height,
        0,
        0,
        targetWidth,
        targetHeight
      );

      const dataUrl = exportCanvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = buildExportFilename(project, "png");
      link.click();

      showToast(t.toastPngExported, "success");
    } catch (error) {
      showToast(error?.message || t.toastPngError, "error");
    } finally {
      Object.assign(element.style, originalStyles);
    }
  };

  return (
    <div className="app-shell">
      <Toast toast={toast} />

      <div className="layout">
        <div className="panel">
          <h1 className="editor-title">{t.appTitle}</h1>

          <div className="grid-two">
            <div className="field">
              <label>{t.languageLabel}</label>
              <select
                value={project.language || "de"}
                onChange={(e) => updateProject({ language: e.target.value })}
              >
                <option value="de">{t.languages.de}</option>
                <option value="fr">{t.languages.fr}</option>
                <option value="it">{t.languages.it}</option>
                <option value="en">{t.languages.en}</option>
              </select>
            </div>
          </div>

          <div className="grid-two">
            <div className="field">
              <label>{t.titleLabel}</label>
              <input
                value={project.title}
                onChange={(e) => updateProject({ title: e.target.value })}
                placeholder={t.placeholderTitle}
              />
            </div>

            <div className="field">
              <label>{t.objectNameLabel}</label>
              <input
                value={project.buildingName}
                onChange={(e) => updateProject({ buildingName: e.target.value })}
                placeholder={t.placeholderObject}
              />
            </div>
          </div>

          <div className="grid-two">
            <div className="field">
              <label>{t.designVariantLabel}</label>
              <select
                value={project.theme}
                onChange={(e) => updateProject({ theme: e.target.value })}
              >
                {themeOptions.map((theme) => (
                  <option key={theme.key} value={theme.key}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>{t.footerLabel}</label>
              <input
                value={project.footerText}
                onChange={(e) => updateProject({ footerText: e.target.value })}
                placeholder={t.placeholderFooter}
              />
            </div>
          </div>

          <div className="section-header">
            <h2>{t.floorsAndTenants}</h2>
            <div className="section-header-actions">
              <button className="ghost-btn" onClick={sortFloors}>
                {t.sortFloors}
              </button>
              <button className="primary-btn" onClick={addFloor}>
                {t.addFloor}
              </button>
            </div>
          </div>

          <div className="floor-editor-list">
            {project.floors.map((floor, floorIndex) => (
              <div className="floor-card" key={floor.id}>
                <div className="floor-card-top">
                  <div className="floor-label-edit">
                    <label>{t.floorLabel}</label>
                    <input
                      value={floor.label}
                      onChange={(e) =>
                        updateFloor(floor.id, { label: e.target.value })
                      }
                      placeholder={t.placeholderFloor}
                    />
                  </div>

                  <div className="move-buttons">
                    <button
                      onClick={() => moveFloor(floor.id, "up")}
                      disabled={floorIndex === 0}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveFloor(floor.id, "down")}
                      disabled={floorIndex === project.floors.length - 1}
                    >
                      ↓
                    </button>
                    <button onClick={() => removeFloor(floor.id)}>🗑</button>
                  </div>
                </div>

                <div className="tenant-editor-list">
                  {floor.tenants.map((tenant) => (
                    <div className="tenant-card" key={tenant.id}>
                      <div className="entry-mode-switch">
                        <button
                          className={
                            tenant.mode === "text"
                              ? "mode-btn active"
                              : "mode-btn"
                          }
                          onClick={() =>
                            setTenantMode(floor.id, tenant.id, "text")
                          }
                          type="button"
                        >
                          {t.textMode}
                        </button>
                        <button
                          className={
                            tenant.mode === "logo"
                              ? "mode-btn active"
                              : "mode-btn"
                          }
                          onClick={() =>
                            setTenantMode(floor.id, tenant.id, "logo")
                          }
                          type="button"
                        >
                          {t.logoMode}
                        </button>
                      </div>

                      <div className="grid-two grid-two-tenant">
                        <div className="field">
                          <label>{t.tenantCompanyLabel}</label>
                          <input
                            value={tenant.name}
                            onChange={(e) =>
                              updateTenant(floor.id, tenant.id, {
                                name: e.target.value,
                              })
                            }
                            placeholder={t.placeholderTenant}
                            disabled={tenant.mode !== "text"}
                          />
                        </div>

                        <div className="field">
                          <label>{t.subtitleLabel}</label>
                          <input
                            value={tenant.subtitle}
                            onChange={(e) =>
                              updateTenant(floor.id, tenant.id, {
                                subtitle: e.target.value,
                              })
                            }
                            placeholder={t.placeholderSubtitle}
                            disabled={tenant.mode !== "text"}
                          />
                        </div>

                        <div className="field">
                          <label>{t.logoSizeLabel}</label>
                          <input
                            type="number"
                            min="30"
                            max="300"
                            value={tenant.logoScale || 100}
                            onChange={(e) =>
                              updateTenant(floor.id, tenant.id, {
                                logoScale: clamp(
                                  Number(e.target.value) || 100,
                                  30,
                                  300
                                ),
                              })
                            }
                            placeholder="100"
                            disabled={tenant.mode !== "logo"}
                          />
                        </div>

                        <div className="field">
                          <label>{t.logoHorizontalLabel}</label>
                          <select
                            value={tenant.logoAlignX || "left"}
                            onChange={(e) =>
                              updateTenant(floor.id, tenant.id, {
                                logoAlignX: e.target.value,
                              })
                            }
                            disabled={tenant.mode !== "logo"}
                          >
                            <option value="left">{t.alignLeft}</option>
                            <option value="center">{t.alignCenter}</option>
                            <option value="right">{t.alignRight}</option>
                          </select>
                        </div>

                        <div className="field">
                          <label>{t.logoVerticalLabel}</label>
                          <select
                            value={tenant.logoAlignY || "center"}
                            onChange={(e) =>
                              updateTenant(floor.id, tenant.id, {
                                logoAlignY: e.target.value,
                              })
                            }
                            disabled={tenant.mode !== "logo"}
                          >
                            <option value="top">{t.alignTop}</option>
                            <option value="center">{t.alignMiddle}</option>
                            <option value="bottom">{t.alignBottom}</option>
                          </select>
                        </div>

                        <div className="field">
                          <label>{t.logoXLabel}</label>
                          <input
                            type="number"
                            min="-200"
                            max="200"
                            value={tenant.logoOffsetX || 0}
                            onChange={(e) =>
                              updateTenant(floor.id, tenant.id, {
                                logoOffsetX: clamp(
                                  Number(e.target.value) || 0,
                                  -200,
                                  200
                                ),
                              })
                            }
                            placeholder="0"
                            disabled={tenant.mode !== "logo"}
                          />
                        </div>

                        <div className="field">
                          <label>{t.logoYLabel}</label>
                          <input
                            type="number"
                            min="-200"
                            max="200"
                            value={tenant.logoOffsetY || 0}
                            onChange={(e) =>
                              updateTenant(floor.id, tenant.id, {
                                logoOffsetY: clamp(
                                  Number(e.target.value) || 0,
                                  -200,
                                  200
                                ),
                              })
                            }
                            placeholder="0"
                            disabled={tenant.mode !== "logo"}
                          />
                        </div>
                      </div>

                      <div className="tenant-actions">
                        <label
                          className={`upload-btn ${
                            tenant.mode !== "logo" ? "is-disabled" : ""
                          }`}
                        >
                          {t.uploadLogo}
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            disabled={tenant.mode !== "logo"}
                            onChange={(e) =>
                              onLogoUpload(
                                floor.id,
                                tenant.id,
                                e.target.files?.[0]
                              )
                            }
                          />
                        </label>

                        <span className="logo-status">
                          {tenant.logo ? t.logoExists : t.noLogo}
                        </span>

                        {tenant.logo ? (
                          <div className="editor-logo-preview">
                            <img src={tenant.logo} alt="Logo Vorschau" />
                          </div>
                        ) : null}

                        {tenant.logo ? (
                          <button
                            className="ghost-btn"
                            onClick={() =>
                              updateTenant(floor.id, tenant.id, {
                                logo: null,
                                logoScale: 100,
                                logoOffsetX: 0,
                                logoOffsetY: 0,
                                logoAlignX: "left",
                                logoAlignY: "center",
                              })
                            }
                          >
                            {t.removeLogo}
                          </button>
                        ) : null}

                        <button
                          className="ghost-btn"
                          onClick={() => removeTenant(floor.id, tenant.id)}
                        >
                          {t.deleteEntry}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="secondary-btn"
                  onClick={() => addTenant(floor.id)}
                >
                  {t.addTenant}
                </button>
              </div>
            ))}
          </div>

          <div className="toolbar">
            <button className="primary-btn" onClick={saveProject}>
              {t.saveProject}
            </button>

            <button
              className="ghost-btn"
              onClick={() => loadInputRef.current?.click()}
            >
              {t.loadProject}
            </button>

            <button className="ghost-btn" onClick={resetProject}>
              {t.newProject}
            </button>

            <button className="ghost-btn" onClick={exportPng}>
              {t.createPng}
            </button>

            <input
              ref={loadInputRef}
              type="file"
              accept="application/json"
              hidden
              onChange={(e) => loadProject(e.target.files?.[0])}
            />
          </div>

          <div className="hint-box">{t.hintText}</div>

          <div className="instruction-box">
            <strong>{t.instructionsTitle}</strong>
            <ul className="hint-list">
              <li>{t.instructionsStep1}</li>
              <li>{t.instructionsStep2}</li>
              <li>{t.instructionsStep3}</li>
              <li>{t.instructionsStep4}</li>
              <li>{t.instructionsStep5}</li>
            </ul>
          </div>
        </div>

        <div className="panel preview-panel-sticky">
          <div className="preview-header-row">
            <h2 className="preview-heading">{t.previewTitle}</h2>
            <span className="preview-meta">{t.exportMeta}</span>
          </div>
          <Preview project={project} t={t} />
        </div>
      </div>
    </div>
  );
}