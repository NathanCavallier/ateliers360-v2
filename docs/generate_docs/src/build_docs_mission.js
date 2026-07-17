const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Footer, Header, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, LevelFormat, PageBreak,
  TabStopType, TabStopPosition
} = require('docx');
const fs = require('fs');

const FONT = "Arial";
const BD   = "1F4E78"; // Blue Dark
const BM   = "2E75B6"; // Blue Mid
const BL   = "D9E1F2";
const BP   = "EBF3FB";
const GD   = "1A5C1A";
const GB   = "E2EFDA";
const OD   = "C55A11";
const OB   = "FAE5D3";
const PD   = "5B2C8D"; // Purple (Cavalier Studio)
const GR   = "595959";
const WH   = "FFFFFF";

const PAGE  = { width: 11906, height: 16838 };
const MAR   = { top: 1000, bottom: 900, left: 1200, right: 1200 };
const CW    = PAGE.width - MAR.left - MAR.right; // 9506

function fnt(o) {
  o = o || {};
  return new TextRun({
    text: o.text !== undefined ? o.text : "",
    font: FONT, size: o.size || 21,
    bold: o.bold || false, italics: o.italic || false,
    color: o.color || "000000",
    underline: o.underline ? {} : undefined,
    break: o.break || undefined
  });
}

function run(text, o) { o = o || {}; o.text = text; return fnt(o); }
function br() { return fnt({ text: "", break: 1 }); }

function sp(b, a) { return { spacing: { before: b || 0, after: a === undefined ? 40 : a } }; }

function p(children, o) {
  o = o || {};
  if (typeof children === 'string') children = [run(children, o)];
  const props = {
    children: children,
    alignment: o.align || AlignmentType.LEFT,
    spacing: { before: o.before || 0, after: o.after === undefined ? 40 : o.after },
  };
  if (o.numbering) props.numbering = o.numbering;
  if (o.heading)   props.heading   = o.heading;
  if (o.border)    props.border    = o.border;
  if (o.shading)   props.shading   = o.shading;
  if (o.indent)    props.indent    = o.indent;
  if (o.tabStops)  props.tabStops  = o.tabStops;
  return new Paragraph(props);
}

function h2(text, color) {
  color = color || BD;
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [run(text, { bold: true, size: 24, color })],
    spacing: { before: 280, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color, space: 3 } }
  });
}

const thin = { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" };
const thickB = { style: BorderStyle.SINGLE, size: 6, color: BD };
const none = { style: BorderStyle.NONE, size: 0, color: WH };
const cellBdr = { top: thin, bottom: thin, left: thin, right: thin };
const headBdr = { top: thickB, bottom: thickB, left: thickB, right: thickB };
const noBdr   = { top: none, bottom: none, left: none, right: none };

function shade(f) { return { fill: f, type: ShadingType.CLEAR }; }

const cPad   = { top: 80, bottom: 80, left: 160, right: 160 };
const cPadSm = { top: 60, bottom: 60, left: 120, right: 120 };

function tc(text, w, o) {
  o = o || {};
  const bg = o.bg || WH;
  const fg = o.color || "000000";
  const bold = o.bold || false;
  const align = o.align || AlignmentType.LEFT;
  const bdr = o.header ? headBdr : cellBdr;
  const children = o.children || [new Paragraph({
    children: [run(text || "", { bold, size: o.size || 20, color: fg })],
    alignment: align,
    spacing: { before: 0, after: 0 }
  })];
  return new TableCell({
    borders: bdr,
    width: { size: w, type: WidthType.DXA },
    shading: shade(bg),
    margins: o.pad || cPad,
    verticalAlign: VerticalAlign.CENTER,
    children
  });
}

function table(rows, colWidths, hBg) {
  hBg = hBg || BD;
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: rows.map(function(row, ri) {
      return new TableRow({
        tableHeader: ri === 0,
        children: row.map(function(cell, ci) {
          const isH = ri === 0;
          const txt  = typeof cell === 'string' ? cell : cell.text;
          const bg   = isH ? hBg : (cell.bg || WH);
          const bold = isH ? true : (cell.bold || false);
          const color = isH ? WH : (cell.color || "000000");
          const align = cell.align || AlignmentType.LEFT;
          return new TableCell({
            borders: isH ? headBdr : cellBdr,
            width: { size: colWidths[ci], type: WidthType.DXA },
            shading: shade(bg), margins: cPad,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({
              children: [run(txt || "", { bold, size: 20, color })],
              alignment: align, spacing: { before: 0, after: 0 }
            })]
          });
        })
      });
    })
  });
}

function bul(text, o) {
  o = o || {};
  const parts = typeof text === 'string' ? [run(text, { size: o.size || 21 })] : text;
  return new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: parts, spacing: { before: 30, after: 30 } });
}

function gap(n) { return p("", { after: n === undefined ? 60 : n }); }
function pb()   { return new Paragraph({ children: [new PageBreak()], spacing: { before: 0, after: 0 } }); }

function note(text, color, bg) {
  color = color || OD; bg = bg || OB;
  return new Paragraph({
    children: [run("⚠  ", { bold: true, color }), run(text, { size: 20, italic: true, color })],
    shading: shade(bg), indent: { left: 200, right: 200 },
    spacing: { before: 80, after: 60 },
    border: { left: { style: BorderStyle.SINGLE, size: 12, color } }
  });
}

function checkbox(text, checked) {
  checked = checked || false;
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children: [
      run(checked ? "☑  " : "☐  ", { bold: true, size: 21, color: BD }),
      run(text, { size: 21 })
    ],
    spacing: { before: 30, after: 30 }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED HEADER BLOCK (letterhead)
// ─────────────────────────────────────────────────────────────────────────────
function letterhead(docTitle, subtitle) {
  const leftW  = Math.floor(CW * 0.55);
  const rightW = CW - leftW;
  return [
    new Table({
      width: { size: CW, type: WidthType.DXA },
      columnWidths: [leftW, rightW],
      rows: [new TableRow({ children: [
        new TableCell({
          borders: noBdr, width: { size: leftW, type: WidthType.DXA },
          shading: shade(BD), margins: { top: 160, bottom: 160, left: 240, right: 160 },
          children: [
            new Paragraph({ children: [run("ATELIERS 360 LAB", { bold: true, size: 32, color: WH })], spacing: { before: 0, after: 30 } }),
            new Paragraph({ children: [run("Éducation · Jeunesse · Numérique", { size: 18, color: BL })], spacing: { before: 0, after: 0 } }),
          ]
        }),
        new TableCell({
          borders: noBdr, width: { size: rightW, type: WidthType.DXA },
          shading: shade(BD), margins: { top: 160, bottom: 160, left: 160, right: 240 },
          children: [
            new Paragraph({ children: [run("Metz Technopôle — Grand Est (57)", { size: 18, color: BL })], alignment: AlignmentType.RIGHT, spacing: { before: 0, after: 20 } }),
            new Paragraph({ children: [run("ateliers@ateliers360.fr", { size: 18, color: BL })], alignment: AlignmentType.RIGHT, spacing: { before: 0, after: 20 } }),
            new Paragraph({ children: [run("www.ateliers360.fr", { size: 18, color: BL })], alignment: AlignmentType.RIGHT, spacing: { before: 0, after: 0 } }),
          ]
        })
      ]})]
    }),
    gap(40),
    new Paragraph({ children: [run(docTitle, { bold: true, size: 32, color: BD })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 20 } }),
    subtitle ? new Paragraph({ children: [run(subtitle, { size: 21, italic: true, color: GR })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 60 } }) : gap(20),
    new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BM, space: 1 } }, children: [], spacing: { before: 0, after: 40 } }),
  ];
}

// ═════════════════════════════════════════════════════════════════════════════
// DOCUMENT 1 — DEVIS STANDARDISÉ
// ═════════════════════════════════════════════════════════════════════════════
const D1 = [];

D1.push(...letterhead("DEVIS N° [XXXX-YYYY]", "Intervention pédagogique — Ateliers 360"));

// Info bloc
const infoW = Math.floor(CW / 2);
D1.push(new Table({
  width: { size: CW, type: WidthType.DXA },
  columnWidths: [infoW, infoW],
  rows: [new TableRow({ children: [
    new TableCell({
      borders: { top: thin, bottom: thin, left: thin, right: thin },
      width: { size: infoW, type: WidthType.DXA },
      shading: shade(BP), margins: cPad,
      children: [
        new Paragraph({ children: [run("ÉMETTEUR", { bold: true, size: 20, color: BD })], spacing: { before: 0, after: 30 } }),
        new Paragraph({ children: [run("Ateliers 360 Lab SAS", { bold: true, size: 20 })], spacing: { before: 0, after: 10 } }),
        new Paragraph({ children: [run("Nathan Imogo — Président", { size: 19 })], spacing: { before: 0, after: 10 } }),
        new Paragraph({ children: [run("SIRET : [À COMPLÉTER]", { size: 19, color: GR })], spacing: { before: 0, after: 10 } }),
        new Paragraph({ children: [run("TVA : [FR XX XXXXXXXXX]", { size: 19, color: GR })], spacing: { before: 0, after: 10 } }),
        new Paragraph({ children: [run("Metz Technopôle, Grand Est (57)", { size: 19 })], spacing: { before: 0, after: 10 } }),
        new Paragraph({ children: [run("ateliers@ateliers360.fr", { size: 19 })], spacing: { before: 0, after: 0 } }),
      ]
    }),
    new TableCell({
      borders: { top: thin, bottom: thin, left: thin, right: thin },
      width: { size: infoW, type: WidthType.DXA },
      shading: shade(WH), margins: cPad,
      children: [
        new Paragraph({ children: [run("DESTINATAIRE", { bold: true, size: 20, color: BD })], spacing: { before: 0, after: 30 } }),
        new Paragraph({ children: [run("[Nom de l'établissement / structure]", { bold: true, size: 20, color: GR, italic: true })], spacing: { before: 0, after: 10 } }),
        new Paragraph({ children: [run("[À l'attention de : Prénom NOM]", { size: 19, color: GR, italic: true })], spacing: { before: 0, after: 10 } }),
        new Paragraph({ children: [run("[Fonction du contact]", { size: 19, color: GR, italic: true })], spacing: { before: 0, after: 10 } }),
        new Paragraph({ children: [run("[Adresse complète]", { size: 19, color: GR, italic: true })], spacing: { before: 0, after: 10 } }),
        new Paragraph({ children: [run("[Code postal] [Ville]", { size: 19, color: GR, italic: true })], spacing: { before: 0, after: 10 } }),
        new Paragraph({ children: [run("[SIRET si établissement public]", { size: 19, color: GR, italic: true })], spacing: { before: 0, after: 0 } }),
      ]
    })
  ]})]
}));
D1.push(gap(40));

// Dates et validité
D1.push(table([
  ["", ""],
  [{ text: "Date d'émission", bg: BP, bold: true }, { text: "[JJ/MM/AAAA]" }],
  [{ text: "Valable jusqu'au", bg: BP, bold: true }, { text: "[JJ/MM/AAAA] (30 jours)" }],
  [{ text: "Référence interne", bg: BP, bold: true }, { text: "[NOM-ÉTABLISSEMENT-AAAA-MM]" }],
], [Math.floor(CW*0.4), Math.floor(CW*0.6)], BD));
D1.push(gap(50));

// Ligne prestation
D1.push(h2("Détail de la prestation"));
D1.push(table([
  ["Description", "Qté", "Prix unit. HT", "Total HT"],
  [
    { text: "[Nom de l'atelier — ex. Robotique Ludique]\nPublic : [Niveau — ex. Classe de 5e]\nEffectif : [XX élèves]\nDurée : [2h]\nLieu : [Adresse de l'établissement ou Metz Technopôle]\nDate : [JJ/MM/AAAA] de [HH:MM] à [HH:MM]\nMatériel : Fourni par Ateliers 360 Lab", bg: WH },
    { text: "1", align: AlignmentType.CENTER },
    { text: "[250,00 €]", align: AlignmentType.RIGHT },
    { text: "[250,00 €]", align: AlignmentType.RIGHT, bold: true }
  ],
  [
    { text: "[Atelier supplémentaire si applicable]", bg: WH },
    { text: "1", align: AlignmentType.CENTER },
    { text: "[XXX,00 €]", align: AlignmentType.RIGHT },
    { text: "[XXX,00 €]", align: AlignmentType.RIGHT }
  ],
  [
    { text: "Déplacement (si hors rayon 50 km de Metz)", bg: WH },
    { text: "[XX km]", align: AlignmentType.CENTER },
    { text: "0,45 €/km", align: AlignmentType.RIGHT },
    { text: "[XX,00 €]", align: AlignmentType.RIGHT }
  ],
], [Math.floor(CW*0.5), Math.floor(CW*0.15), Math.floor(CW*0.175), Math.floor(CW*0.175)]));
D1.push(gap(20));

// Totaux
const totW = Math.floor(CW * 0.35);
const totW2 = Math.floor(CW * 0.20);
const totLeft = CW - totW - totW2;
D1.push(new Table({
  width: { size: CW, type: WidthType.DXA },
  columnWidths: [totLeft, totW, totW2],
  rows: [
    new TableRow({ children: [
      new TableCell({ borders: noBdr, width: { size: totLeft, type: WidthType.DXA }, children: [p("")] }),
      new TableCell({ borders: cellBdr, width: { size: totW, type: WidthType.DXA }, shading: shade(BP), margins: cPad,
        children: [new Paragraph({ children: [run("Total HT", { bold: true, size: 21, color: BD })], alignment: AlignmentType.RIGHT })] }),
      new TableCell({ borders: cellBdr, width: { size: totW2, type: WidthType.DXA }, shading: shade(BP), margins: cPad,
        children: [new Paragraph({ children: [run("[XXX,00 €]", { bold: true, size: 21, color: BD })], alignment: AlignmentType.RIGHT })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ borders: noBdr, width: { size: totLeft, type: WidthType.DXA }, children: [p("")] }),
      new TableCell({ borders: cellBdr, width: { size: totW, type: WidthType.DXA }, shading: shade(WH), margins: cPad,
        children: [new Paragraph({ children: [run("TVA (20 %)", { size: 20 })], alignment: AlignmentType.RIGHT })] }),
      new TableCell({ borders: cellBdr, width: { size: totW2, type: WidthType.DXA }, shading: shade(WH), margins: cPad,
        children: [new Paragraph({ children: [run("[XX,00 €]", { size: 20 })], alignment: AlignmentType.RIGHT })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ borders: noBdr, width: { size: totLeft, type: WidthType.DXA }, children: [p("")] }),
      new TableCell({ borders: headBdr, width: { size: totW, type: WidthType.DXA }, shading: shade(BD), margins: cPad,
        children: [new Paragraph({ children: [run("TOTAL TTC", { bold: true, size: 22, color: WH })], alignment: AlignmentType.RIGHT })] }),
      new TableCell({ borders: headBdr, width: { size: totW2, type: WidthType.DXA }, shading: shade(BD), margins: cPad,
        children: [new Paragraph({ children: [run("[XXX,00 €]", { bold: true, size: 22, color: WH })], alignment: AlignmentType.RIGHT })] }),
    ]}),
  ]
}));
D1.push(gap(50));

D1.push(h2("Conditions et modalités"));
D1.push(table([
  ["Condition", "Détail"],
  [{ text: "Acompte", bold: true, bg: BP }, { text: "30 % du montant HT à la confirmation (commandes > 500 € HT)" }],
  [{ text: "Solde", bold: true, bg: BP }, { text: "Sous 30 jours après la date d'intervention, sur présentation de la facture" }],
  [{ text: "Pénalités de retard", bold: true, bg: BP }, { text: "Taux légal en vigueur + indemnité forfaitaire de 40 € (art. L.441-10 C. com.)" }],
  [{ text: "Modes de paiement", bold: true, bg: BP }, { text: "Virement bancaire · Chèque à l'ordre d'Ateliers 360 Lab · Lien de paiement sécurisé" }],
  [{ text: "Annulation", bold: true, bg: BP }, { text: "Gratuite > 15 jours | Retenue 20 % entre 7 et 15 jours | Retenue 50 % < 7 jours | 100 % le jour même" }],
  [{ text: "Validité du devis", bold: true, bg: BP }, { text: "30 jours à compter de la date d'émission" }],
  [{ text: "Documents joints", bold: true, bg: BP }, { text: "Attestation RC Pro · CGV Ateliers 360 Lab · Fiche pédagogique de l'atelier" }],
], [Math.floor(CW*0.3), Math.floor(CW*0.7)]));
D1.push(gap(50));

D1.push(h2("Signature et acceptation"));
D1.push(p([
  run("Pour valider ce devis, retournez-le signé avec la mention ", { size: 20 }),
  run("« Bon pour accord »", { size: 20, bold: true }),
  run(" par l'un des moyens suivants :", { size: 20 }),
]));
D1.push(bul("Signature électronique via le lien YouSign joint à cet email (recommandé)"));
D1.push(bul("PDF scanné retourné par email à ateliers@ateliers360.fr"));
D1.push(bul("Signature physique lors d'un rendez-vous à Metz Technopôle"));
D1.push(gap(40));

const sigW = Math.floor(CW / 2) - 20;
D1.push(new Table({
  width: { size: CW, type: WidthType.DXA },
  columnWidths: [sigW, 40, sigW],
  rows: [new TableRow({ children: [
    new TableCell({
      borders: cellBdr, width: { size: sigW, type: WidthType.DXA }, shading: shade(BP), margins: cPad,
      children: [
        new Paragraph({ children: [run("Pour Ateliers 360 Lab", { bold: true, size: 20, color: BD })], spacing: { before: 0, after: 20 } }),
        new Paragraph({ children: [run("Nathan Imogo — Président SAS", { size: 19 })], spacing: { before: 0, after: 60 } }),
        new Paragraph({ children: [run("Signature :", { size: 19, color: GR })], spacing: { before: 0, after: 80 } }),
        new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA", space: 1 } }, children: [], spacing: { before: 0, after: 0 } }),
      ]
    }),
    new TableCell({ borders: noBdr, width: { size: 40, type: WidthType.DXA }, children: [p("")] }),
    new TableCell({
      borders: cellBdr, width: { size: sigW, type: WidthType.DXA }, shading: shade(WH), margins: cPad,
      children: [
        new Paragraph({ children: [run("Pour le client", { bold: true, size: 20, color: BD })], spacing: { before: 0, after: 20 } }),
        new Paragraph({ children: [run("Nom, prénom, qualité :", { size: 19, color: GR })], spacing: { before: 0, after: 20 } }),
        new Paragraph({ children: [run("___________________________", { size: 19 })], spacing: { before: 0, after: 20 } }),
        new Paragraph({ children: [run("Date et mention « Bon pour accord » :", { size: 19, color: GR })], spacing: { before: 0, after: 80 } }),
        new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA", space: 1 } }, children: [], spacing: { before: 0, after: 0 } }),
      ]
    }),
  ]})]
}));

// ═════════════════════════════════════════════════════════════════════════════
// DOCUMENT 2 — COMPTE-RENDU PÉDAGOGIQUE
// ═════════════════════════════════════════════════════════════════════════════
const D2 = [pb()];

D2.push(...letterhead("COMPTE-RENDU PÉDAGOGIQUE", "Bilan de l'intervention — Ateliers 360 Éducation"));
D2.push(note("Ce document est transmis à l'enseignant référent sous 48h après l'intervention. Il est confidentiel et destiné à l'équipe pédagogique de l'établissement."));
D2.push(gap(40));

D2.push(h2("Identification de l'intervention"));
D2.push(table([
  ["Champ", "Information"],
  [{ text: "Établissement", bg: BP, bold: true }, { text: "[Nom de l'établissement]" }],
  [{ text: "Classe(s) concernée(s)", bg: BP, bold: true }, { text: "[ex. 5e B — 28 élèves]" }],
  [{ text: "Enseignant(e) référent(e)", bg: BP, bold: true }, { text: "[Prénom NOM]" }],
  [{ text: "Atelier réalisé", bg: BP, bold: true }, { text: "[Nom de l'atelier]" }],
  [{ text: "Date et horaires", bg: BP, bold: true }, { text: "[JJ/MM/AAAA] de [HH:MM] à [HH:MM]" }],
  [{ text: "Lieu", bg: BP, bold: true }, { text: "[Salle X — Établissement / Metz Technopôle]" }],
  [{ text: "Animateur(trice)", bg: BP, bold: true }, { text: "Nathan Imogo — Ateliers 360 Lab" }],
  [{ text: "Effectif présent", bg: BP, bold: true }, { text: "[XX élèves présents / XX inscrits]" }],
], [Math.floor(CW*0.35), Math.floor(CW*0.65)]));
D2.push(gap(50));

D2.push(h2("Déroulement de l'atelier"));
D2.push(table([
  ["Phase", "Durée", "Description", "Observations"],
  [{ text: "Introduction / mise en contexte" }, { text: "15 min", align: AlignmentType.CENTER }, { text: "[Description de l'introduction — accroche, question fil rouge, présentation du matériel]" }, { text: "[Observations : niveau d'attention, réactions initiales]" }],
  [{ text: "Activité principale (manipulation / expérimentation)" }, { text: "60 min", align: AlignmentType.CENTER }, { text: "[Description de l'activité centrale — étapes, consignes, matériel utilisé]" }, { text: "[Observations : engouement, difficultés rencontrées, groupes performants]" }],
  [{ text: "Mise en commun / débriefing" }, { text: "20 min", align: AlignmentType.CENTER }, { text: "[Description de la restitution — présentation par groupes, questions/réponses]" }, { text: "[Observations : qualité des restitutions, questions des élèves]" }],
  [{ text: "Conclusion et ouverture" }, { text: "5 min", align: AlignmentType.CENTER }, { text: "[Synthèse, lien avec les programmes, perspectives]" }, { text: "[Observations finales]" }],
], [Math.floor(CW*0.22), Math.floor(CW*0.1), Math.floor(CW*0.34), Math.floor(CW*0.34)]));
D2.push(gap(50));

D2.push(h2("Compétences travaillées"));
D2.push(p([run("Référentiel : programmes scolaires en vigueur. Les compétences ci-dessous ont été actives pendant l'atelier.", { size: 20, italic: true, color: GR })]));
D2.push(table([
  ["Compétence", "Domaine", "Niveau observé"],
  [{ text: "[ex. Concevoir et réaliser une solution à un problème technique]" }, { text: "[Sciences & Techno / Cycle 4]" }, { text: "☑ Atteint  ☐ En cours  ☐ Non atteint" }],
  [{ text: "[ex. Programmer et utiliser des objets numériques]" }, { text: "[Informatique / Cycle 4]" }, { text: "☑ Atteint  ☐ En cours  ☐ Non atteint" }],
  [{ text: "[ex. Travailler en équipe, s'organiser et coopérer]" }, { text: "[Compétences sociales]" }, { text: "☑ Atteint  ☐ En cours  ☐ Non atteint" }],
  [{ text: "[Ajouter selon l'atelier réalisé]" }, { text: "[Domaine]" }, { text: "☐ Atteint  ☐ En cours  ☐ Non atteint" }],
], [Math.floor(CW*0.45), Math.floor(CW*0.25), Math.floor(CW*0.30)]));
D2.push(gap(50));

D2.push(h2("Bilan et observations générales"));
D2.push(new Table({
  width: { size: CW, type: WidthType.DXA },
  columnWidths: [CW],
  rows: [
    ...[
      ["Points forts de l'atelier", "[Ce qui a particulièrement bien fonctionné — moments de déclic, réactions positives, activités phares]\n\n\n"],
      ["Points d'amélioration", "[Ce qui pourrait être amélioré — rythme, niveau, configuration de salle, consignes]\n\n\n"],
      ["Comportement général du groupe", "[Niveau d'attention, dynamique de groupe, élèves en difficulté identifiés, élèves particulièrement engagés]\n\n\n"],
      ["Observations spécifiques à signaler à l'enseignant(e)", "[Tout élément utile à l'enseignant : difficultés spécifiques, comportements inhabituels, besoins particuliers identifiés]\n\n"],
    ].map(function([label, placeholder]) {
      return new TableRow({ children: [new TableCell({
        borders: cellBdr, width: { size: CW, type: WidthType.DXA },
        shading: shade(WH), margins: cPad,
        children: [
          new Paragraph({ children: [run(label, { bold: true, size: 21, color: BD })], spacing: { before: 0, after: 20 } }),
          new Paragraph({ children: [run(placeholder, { size: 20, italic: true, color: GR })], spacing: { before: 0, after: 0 } }),
        ]
      })]}); }
    )
  ]
}));
D2.push(gap(50));

D2.push(h2("Ressources pour prolonger l'atelier en classe"));
D2.push(table([
  ["Type de ressource", "Description / Lien"],
  [{ text: "Fiche prolongement élève", bg: BP, bold: true }, { text: "[Jointe en annexe ou disponible sur ateliers360.fr/fr/familles]" }],
  [{ text: "Ressources numériques recommandées", bg: BP, bold: true }, { text: "[ex. Code.org pour la programmation / Scratch.mit.edu / PhET Colorado pour les sciences]" }],
  [{ text: "Projet complémentaire suggéré", bg: BP, bold: true }, { text: "[ex. Mini-projet Arduino à réaliser en club ou en option SI]" }],
  [{ text: "Module de suivi disponible", bg: BP, bold: true }, { text: "[Si un module (3 ou 6 séances) est proposé sur cette thématique — lien vers le catalogue]" }],
], [Math.floor(CW*0.35), Math.floor(CW*0.65)]));
D2.push(gap(50));

D2.push(h2("Prochaines étapes suggérées"));
D2.push(bul("Retour de l'enseignant(e) sur ce compte-rendu bienvenu — répondre à cet email"));
D2.push(bul("Proposition d'un module de suivi (3 ou 6 séances) sur la même thématique"));
D2.push(bul("Autre atelier de notre catalogue adapté à ce groupe"));
D2.push(bul("Partage de ce compte-rendu avec la direction si utile pour un dossier PEDT ou de financement"));
D2.push(gap(40));
D2.push(p([
  run("Merci pour votre confiance. Pour toute question, Nathan Imogo est joignable à ", { size: 20 }),
  run("ateliers@ateliers360.fr", { size: 20, bold: true }),
  run(".", { size: 20 }),
], { after: 0 }));

// ═════════════════════════════════════════════════════════════════════════════
// DOCUMENT 3 — CHECKLIST MATÉRIEL
// ═════════════════════════════════════════════════════════════════════════════
const D3 = [pb()];

D3.push(...letterhead("LISTE DE CONTRÔLE MATÉRIEL", "À vérifier avant chaque départ en intervention"));
D3.push(new Paragraph({
  children: [
    run("Atelier : ", { bold: true, size: 21, color: BD }),
    run("[Nom de l'atelier]", { size: 21, italic: true, color: GR }),
    run("     Date : ", { bold: true, size: 21, color: BD }),
    run("[JJ/MM/AAAA]", { size: 21, italic: true, color: GR }),
    run("     Lieu : ", { bold: true, size: 21, color: BD }),
    run("[Établissement]", { size: 21, italic: true, color: GR }),
  ],
  shading: shade(BP),
  spacing: { before: 0, after: 60 },
  indent: { left: 200, right: 200 },
  border: { left: { style: BorderStyle.SINGLE, size: 12, color: BD } }
}));

// Section helper
function checkSection(ws3, title, items, bg) {
  bg = bg || BD;
  const els = [];
  els.push(new Paragraph({
    children: [run(title, { bold: true, size: 22, color: WH })],
    shading: shade(bg),
    spacing: { before: 40, after: 40 },
    indent: { left: 200 },
  }));
  items.forEach(function(item) {
    const isNote = item.startsWith("//");
    if (isNote) {
      els.push(new Paragraph({
        children: [run(item.substring(2).trim(), { size: 19, italic: true, color: GR })],
        spacing: { before: 10, after: 10 },
        indent: { left: 560 }
      }));
    } else {
      els.push(new Paragraph({
        numbering: { reference: "check", level: 0 },
        children: [run(item, { size: 21 })],
        spacing: { before: 25, after: 25 }
      }));
    }
  });
  els.push(gap(20));
  return els;
}

D3.push(...checkSection(null, "1 — DOCUMENTS À EMPORTER", [
  "Devis signé ou bon de commande (copie imprimée ou PDF sur téléphone)",
  "Attestation RC Pro (originale ou PDF)",
  "Fiche pédagogique de l'atelier (version imprimée pour référence)",
  "Fiche de présence élèves (vierge — à faire signer par l'enseignant)",
  "Autorisations parentales (si atelier avec manipulation chimique, outils ou droit à l'image)",
  "Consignes de sécurité plastifiées (adaptées à l'atelier)",
  "Protocole d'urgence (numéros : SAMU 15 / Pompiers 18 / Police 17 / Médecin référent établissement)",
  "Fiche d'observation vierge (pour rédiger le compte-rendu après)",
  "Cartes de visite Ateliers 360 Lab (5 à 10)",
], BD));

D3.push(...checkSection(null, "2 — MATÉRIEL COMMUN (tous les ateliers)", [
  "Sac/mallette de transport robuste",
  "Multi-prises (4 à 6 prises + rallonge 5 m)",
  "Marqueurs effaçables + chiffon (pour tableau blanc si présent)",
  "Scotch + ciseaux",
  "Stylos (3 minimum) + bloc-notes",
  "Montre ou minuterie (chronomètre pour les séquences)",
  "Appareil photo ou téléphone pour photos (si autorisation droit à l'image obtenue)",
  "Eau + collation légère (journée complète)",
], BM));

D3.push(...checkSection(null, "3 — MATÉRIEL SPÉCIFIQUE — ROBOTIQUE", [
  "Kits robots (mBot, Bee-Bot, Cubetto…) — vérifier charge des batteries la veille",
  "// Nombre de kits : 1 pour 2 élèves minimum",
  "Câbles USB de recharge (1 par robot + 2 de secours)",
  "Ordinateurs portables ou tablettes (si programmation par interface graphique)",
  "Câbles USB/micro-USB pour connexion robots-PC",
  "Logiciels préinstallés vérifiés la veille (Scratch, mBlock, Arduino IDE…)",
  "Tapis de jeu ou repères au sol (pour les défis de navigation)",
  "Pièces de rechange (roues, câbles, capteurs en état de marche)",
], "0D6E6E"));

D3.push(...checkSection(null, "4 — MATÉRIEL SPÉCIFIQUE — CHIMIE & SCIENCES", [
  "Tabliers enfant (1 par élève — vérifier lavés et en bon état)",
  "Lunettes de protection (1 par élève — vérifier propres)",
  "Gants (boîte de 50 paires latex ou nitrile)",
  "Réactifs et produits (liste exhaustive par atelier — vérifier quantités)",
  "// Transporter les produits dans un bac fermé hermétiquement",
  "Béchers, tubes à essais, pipettes (compter + 20% de marge)",
  "Bacs de récupération (pour les déchets liquides)",
  "Papier absorbant (rouleau cuisine)",
  "Extincteur de poche (si manipulation avec flamme — rare mais obligatoire)",
  "Trousse de premiers secours (pansements, eau oxygénée, sérum physiologique)",
], OD));

D3.push(...checkSection(null, "5 — MATÉRIEL SPÉCIFIQUE — FABLAB & IMPRESSION 3D", [
  "Imprimante(s) 3D + câble d'alimentation",
  "Bobines de filament PLA (couleurs variées — vérifier niveau)",
  "Fichiers STL de démonstration préchargés sur la carte SD",
  "PC avec logiciel de tranchage (Bambu Studio / PrusaSlicer) préinstallé",
  "Outils de manipulation (spatule, pince brucelles, cutter)",
  "Kits Arduino (breadboard, câbles, LEDs, résistances, capteurs)",
  "Panneaux perforés ou surface de rangement des outils",
  "Lunettes de protection (pour opérations avec outils coupants)",
], "5B2C8D"));

D3.push(...checkSection(null, "6 — MATÉRIEL SPÉCIFIQUE — CODE & NUMÉRIQUE", [
  "Ordinateurs portables (1 pour 2 élèves — vérifier batteries chargées la veille)",
  "Souris filaires (1 par poste — facilite le travail en Scratch)",
  "Connexion internet vérifiée (demander le code Wi-Fi à l'établissement à l'avance)",
  "// Prévoir un mode hors-ligne (ressources téléchargées) si Wi-Fi instable",
  "Clé USB avec tous les fichiers de l'atelier (même si cloud prévu)",
  "Câble HDMI + adaptateur (pour projeter l'écran de l'enseignant)",
  "Casques audio (si atelier avec son — IA vocale, musique algorithmique)",
  "Logiciels/accès vérifiés la veille : Scratch, Code.org, Thonny, IDE…",
], BD));

D3.push(...checkSection(null, "7 — VÉRIFICATIONS FINALES AVANT DÉPART", [
  "Tout le matériel est dans le véhicule",
  "L'adresse exacte de l'établissement est dans le GPS (vérifier parking)",
  "Le contact sur place a été confirmé par email/SMS (nom + téléphone)",
  "L'heure d'arrivée est prévue 20 min avant le début de l'atelier",
  "La fiche de présence élèves est accessible facilement",
  "Le téléphone est chargé (pour photos + urgences)",
  "Les CGV et l'attestation RC Pro sont accessibles (PDF sur téléphone)",
], GD));

D3.push(gap(40));
D3.push(new Paragraph({
  children: [
    run("Contrôlé par : ", { bold: true, size: 20 }),
    run("___________________________", { size: 20 }),
    run("     Date : ", { bold: true, size: 20 }),
    run("___________________", { size: 20 }),
    run("     Signature : ", { bold: true, size: 20 }),
    run("___________________", { size: 20 }),
  ],
  border: { top: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC", space: 4 } },
  spacing: { before: 40, after: 0 }
}));

// ═════════════════════════════════════════════════════════════════════════════
// ASSEMBLE DOCUMENT
// ═════════════════════════════════════════════════════════════════════════════
const footer = new Footer({
  children: [new Paragraph({
    children: [
      run("Ateliers 360 Lab SAS  ·  ateliers@ateliers360.fr  ·  ateliers360.fr", { size: 16, color: GR }),
      new TextRun({ children: ["\t", PageNumber.CURRENT, " / ", PageNumber.TOTAL_PAGES], font: FONT, size: 16, color: GR }),
    ],
    border: { top: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC", space: 4 } },
    tabStops: [{ type: TabStopType.RIGHT, position: CW }],
  })]
});

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 480, hanging: 240 }, spacing: { before: 30, after: 30 } } } }]
      },
      {
        reference: "check",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "☐", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 480, hanging: 240 }, spacing: { before: 25, after: 25 } } } }]
      }
    ]
  },
  styles: {
    default: { document: { run: { font: FONT, size: 21 } } },
    paragraphStyles: [
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: FONT, color: BD },
        paragraph: { spacing: { before: 280, after: 100 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    properties: { page: { size: { width: PAGE.width, height: PAGE.height }, margin: MAR } },
    footers: { default: footer },
    children: [...D1, ...D2, ...D3]
  }]
});

Packer.toBuffer(doc).then(function(buf) {
  fs.writeFileSync("/home/claude/Documents_Mission_A360.docx", buf);
  console.log("Done.");
}).catch(function(err) { console.error(err); process.exit(1); });
