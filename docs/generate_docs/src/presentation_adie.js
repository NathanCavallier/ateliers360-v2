const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  Footer,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  WidthType,
  ShadingType,
  VerticalAlign,
  PageNumber,
  LevelFormat,
  PageBreak,
  TabStopType,
} = require("docx");
const fs = require("fs");

const FONT = "Arial";
const BD = "1F4E78", BM = "2E75B6", BL = "D9E1F2", BP = "EBF3FB";
const GD = "1A5C1A", GB = "E2EFDA";
const OD = "C55A11", OB = "FAE5D3";
const GR = "595959", WH = "FFFFFF";
const TEAL = "0D6E6E", TEALB = "E0F4F4";

const PAGE = { width: 11906, height: 16838 };
const MARGIN = { top: 900, bottom: 800, left: 1300, right: 1300 };
const CW = 9306;

const bNone = { style: BorderStyle.NONE, size: 0, color: WH };
const bCell = { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" };
const bHead = { style: BorderStyle.SINGLE, size: 6, color: BD };
const bAcc = (c) => ({ style: BorderStyle.SINGLE, size: 8, color: c });
const cellBorders = { top: bCell, bottom: bCell, left: bCell, right: bCell };
const headBorders = { top: bHead, bottom: bHead, left: bHead, right: bHead };
const noBorders = { top: bNone, bottom: bNone, left: bNone, right: bNone };

const sh = (f) => ({ fill: f, type: ShadingType.CLEAR });

const cPad = { top: 100, bottom: 100, left: 180, right: 180 };
const cPadLg = { top: 160, bottom: 160, left: 220, right: 220 };

function r(text, o) {
  o = o || {};
  return new TextRun({
    text: text || "",
    font: FONT,
    size: o.size || 21,
    bold: o.bold || false,
    italics: o.italic || false,
    color: o.color || "000000",
  });
}
function sp(b, a) {
  return { spacing: { before: b || 0, after: a === undefined ? 40 : a } };
}
function p(children, o) {
  o = o || {};
  if (typeof children === "string") children = [r(children, o)];
  const props = {
    children,
    alignment: o.align || AlignmentType.LEFT,
    ...sp(o.before || 0, o.after === undefined ? 40 : o.after),
  };
  if (o.heading) props.heading = o.heading;
  if (o.numbering) props.numbering = o.numbering;
  if (o.border) props.border = o.border;
  if (o.shading) props.shading = o.shading;
  if (o.indent) props.indent = o.indent;
  return new Paragraph(props);
}
function h2(text, color) {
  color = color || BD;
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [r(text, { bold: true, size: 23, color })],
    spacing: { before: 240, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color, space: 3 } },
  });
}
function bul(text, o) {
  o = o || {};
  const ch = typeof text === "string"
    ? [r(text, { size: o.size || 21 })]
    : text;
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children: ch,
    spacing: { before: 25, after: 25 },
  });
}
function gap(n) {
  return p("", { after: n === undefined ? 50 : n });
}
function pb() {
  return new Paragraph({
    children: [new PageBreak()],
    spacing: { before: 0, after: 0 },
  });
}

function kpiBox(items) {
  const n = items.length;
  const w = Math.floor(CW / n);
  const last = CW - w * (n - 1);
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: items.map((_, i) => i === n - 1 ? last : w),
    rows: [
      new TableRow({
        children: items.map(function (item, i) {
          return new TableCell({
            borders: cellBorders,
            width: { size: i === n - 1 ? last : w, type: WidthType.DXA },
            shading: sh(item[2] || BP),
            margins: cPadLg,
            children: [
              new Paragraph({
                children: [
                  r(item[0], { bold: true, size: 32, color: item[3] || BD }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 20 },
              }),
              new Paragraph({
                children: [r(item[1], { size: 19, color: GR })],
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 0 },
              }),
            ],
          });
        }),
      }),
    ],
  });
}

function twoCol(left, right, leftW) {
  leftW = leftW || Math.floor(CW * 0.48);
  const rightW = CW - leftW;
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [leftW, rightW],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: cellBorders,
            width: { size: leftW, type: WidthType.DXA },
            shading: sh(BP),
            margins: cPadLg,
            children: left,
          }),
          new TableCell({
            borders: cellBorders,
            width: { size: rightW, type: WidthType.DXA },
            shading: sh(GB),
            margins: cPadLg,
            children: right,
          }),
        ],
      }),
    ],
  });
}

function infoRow(label, value, bg) {
  bg = bg || WH;
  const lw = Math.floor(CW * 0.38), vw = CW - lw;
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [lw, vw],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: cellBorders,
            width: { size: lw, type: WidthType.DXA },
            shading: sh(BP),
            margins: cPad,
            children: [
              new Paragraph({
                children: [r(label, { bold: true, size: 20, color: BD })],
              }),
            ],
          }),
          new TableCell({
            borders: cellBorders,
            width: { size: vw, type: WidthType.DXA },
            shading: sh(bg),
            margins: cPad,
            children: [new Paragraph({ children: [r(value, { size: 20 })] })],
          }),
        ],
      }),
    ],
  });
}

function bandTitle(text, color) {
  color = color || BD;
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [CW],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: noBorders,
            width: { size: CW, type: WidthType.DXA },
            shading: sh(color),
            margins: { top: 100, bottom: 100, left: 200, right: 200 },
            children: [
              new Paragraph({
                children: [r(text, { bold: true, size: 24, color: WH })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function budgetTable(rows) {
  const w1 = Math.floor(CW * 0.55),
    w2 = Math.floor(CW * 0.22),
    w3 = CW - w1 - w2;
  const tableRows = [
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({
          borders: headBorders,
          width: { size: w1, type: WidthType.DXA },
          shading: sh(BD),
          margins: cPad,
          children: [
            new Paragraph({
              children: [
                r("Poste de dépense", { bold: true, size: 20, color: WH }),
              ],
            }),
          ],
        }),
        new TableCell({
          borders: headBorders,
          width: { size: w2, type: WidthType.DXA },
          shading: sh(BD),
          margins: cPad,
          children: [
            new Paragraph({
              children: [r("Montant", { bold: true, size: 20, color: WH })],
              alignment: AlignmentType.CENTER,
            }),
          ],
        }),
        new TableCell({
          borders: headBorders,
          width: { size: w3, type: WidthType.DXA },
          shading: sh(BD),
          margins: cPad,
          children: [
            new Paragraph({
              children: [
                r("Justification", { bold: true, size: 20, color: WH }),
              ],
            }),
          ],
        }),
      ],
    }),
  ];
  rows.forEach(function (row, i) {
    const isTotal = row[3];
    const bg = isTotal ? BL : (i % 2 === 0 ? BP : WH);
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({
            borders: cellBorders,
            width: { size: w1, type: WidthType.DXA },
            shading: sh(bg),
            margins: cPad,
            children: [
              new Paragraph({
                children: [
                  r(row[0], {
                    size: 20,
                    bold: isTotal,
                    color: isTotal ? BD : "000000",
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            borders: cellBorders,
            width: { size: w2, type: WidthType.DXA },
            shading: sh(bg),
            margins: cPad,
            children: [
              new Paragraph({
                children: [
                  r(row[1], {
                    size: 20,
                    bold: isTotal,
                    color: isTotal ? BD : "000000",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
          new TableCell({
            borders: cellBorders,
            width: { size: w3, type: WidthType.DXA },
            shading: sh(bg),
            margins: cPad,
            children: [
              new Paragraph({
                children: [
                  r(row[2], {
                    size: 20,
                    italic: !isTotal,
                    color: isTotal ? BD : GR,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    );
  });
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [w1, w2, w3],
    rows: tableRows,
  });
}

function caTable(rows) {
  const w = Math.floor(CW / 4);
  const tableRows = [
    new TableRow({
      tableHeader: true,
      children: ["Mois", "Nb ateliers", "Prix moyen HT", "CA mensuel HT"].map(
        function (h) {
          return new TableCell({
            borders: headBorders,
            width: { size: w, type: WidthType.DXA },
            shading: sh(TEAL),
            margins: cPad,
            children: [
              new Paragraph({
                children: [r(h, { bold: true, size: 20, color: WH })],
                alignment: AlignmentType.CENTER,
              }),
            ],
          });
        },
      ),
    }),
  ];
  rows.forEach(function (row, i) {
    const isTotal = row[4];
    const bg = isTotal ? sh(TEALB) : sh(i % 2 === 0 ? BP : WH);
    tableRows.push(
      new TableRow({
        children: row.slice(0, 4).map(function (val) {
          return new TableCell({
            borders: cellBorders,
            width: { size: w, type: WidthType.DXA },
            shading: bg,
            margins: cPad,
            children: [
              new Paragraph({
                children: [
                  r(val, {
                    size: 20,
                    bold: isTotal,
                    color: isTotal ? TEAL : "000000",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          });
        }),
      }),
    );
  });
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [w, w, w, w],
    rows: tableRows,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
const C = [];

// ── COVER ─────────────────────────────────────────────────────────────────────
C.push(
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [CW],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: noBorders,
            width: { size: CW, type: WidthType.DXA },
            shading: sh(BD),
            margins: { top: 500, bottom: 500, left: 300, right: 300 },
            children: [
              p([
                r("DOSSIER DE PRÉSENTATION", {
                  bold: true,
                  size: 13,
                  color: BL,
                }),
              ], { after: 50, align: AlignmentType.LEFT }),
              p([r("Ateliers 360", { bold: true, size: 56, color: WH })], {
                after: 40,
              }),
              p([
                r(
                  "Ateliers scientifiques & numériques pour les écoles et associations",
                  { size: 22, italic: true, color: BL },
                ),
              ], { after: 80 }),
              new Paragraph({
                border: {
                  bottom: {
                    style: BorderStyle.SINGLE,
                    size: 4,
                    color: BM,
                    space: 8,
                  },
                },
                children: [],
                spacing: { before: 0, after: 60 },
              }),
              p([
                r("Micro-entrepreneur  ·  Metz, Grand Est  ·  Juillet 2026", {
                  size: 19,
                  color: BL,
                }),
              ], { after: 0 }),
            ],
          }),
        ],
      }),
    ],
  }),
);

C.push(gap(50));

// Porteur de projet
C.push(
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [CW],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: {
              top: bAcc(BM),
              bottom: bAcc(BM),
              left: bAcc(BM),
              right: bAcc(BM),
            },
            width: { size: CW, type: WidthType.DXA },
            shading: sh(BP),
            margins: cPadLg,
            children: [
              p([r("Porteur de projet", { bold: true, size: 21, color: BD })], {
                after: 30,
              }),
              p([r("Nathan Imogo", { bold: true, size: 24, color: BD })], {
                after: 20,
              }),
              p([
                r("Développeur full-stack & formateur en numérique", {
                  size: 21,
                  color: GR,
                }),
              ], { after: 20 }),
              p([
                r(
                  "📍 4 rue Marconi, 57070 Metz  ·  📞 07 53 61 24 71  ·  ✉ nathan.imogo@outlook.fr",
                  { size: 20, color: GR },
                ),
              ], { after: 0 }),
            ],
          }),
        ],
      }),
    ],
  }),
);

C.push(gap(40));

// KPI boxes
C.push(kpiBox([
  ["15+", "Disciplines au catalogue", BP, BD],
  ["150 - 390 €", "Par atelier (HT)", GB, GD],
  ["Grand Est", "Zone d'intervention prioritaire", sh(TEALB).fill, TEAL],
  ["LU · BE", "Extension internationale", OB, OD],
]));

C.push(pb());

// ── SECTION 1 — LE PORTEUR ────────────────────────────────────────────────────
C.push(bandTitle("1.  Le porteur de projet"));
C.push(gap(30));

C.push(twoCol(
  [
    p([r("Formation & expérience", { bold: true, size: 21, color: BD })], {
      after: 30,
    }),
    bul("Bachelor Développeur Full-Stack (Bac+3)"),
    bul("BUT3 Informatique — rentrée septembre 2026"),
    bul("5 ans d'expérience en développement web et mobile"),
    bul("Formateur en numérique auprès de différents publics"),
    bul("Maîtrise des outils pédagogiques STEM"),
    gap(20),
    p([r("Compétences clés", { bold: true, size: 21, color: BD })], {
      after: 30,
    }),
    bul("Conception et animation d'ateliers pratiques"),
    bul("Pédagogie différenciée tous niveaux"),
    bul("Robotique, code, IA, sciences, FabLab"),
    bul("Communication et relation client"),
  ],
  [
    p([r("Motivations", { bold: true, size: 21, color: GD })], { after: 30 }),
    p(
      "Rendre les sciences et le numérique accessibles à tous les publics par l'expérimentation pratique — tel est le fil conducteur de ce projet.",
      { after: 30 },
    ),
    p(
      "Fort d'une double compétence technique et pédagogique, j'ai constaté le manque d'offres d'ateliers STEM de qualité, accessibles et pluridisciplinaires dans le Grand Est.",
      { after: 30 },
    ),
    p(
      "Ateliers 360 répond directement à ce besoin : intervenir dans les établissements scolaires, associations et collectivités avec du matériel fourni, des contenus adaptés et une pédagogie engageante.",
      { after: 0 },
    ),
  ],
));

C.push(gap(40));

// ── SECTION 2 — LE PROJET ─────────────────────────────────────────────────────
C.push(bandTitle("2.  Le projet — Ateliers 360"));
C.push(gap(30));

C.push(
  p([
    r(
      "Ateliers 360 est une activité d'animation pédagogique scientifique et numérique, exercée en micro-entreprise. Je conçois et anime des ateliers pratiques dans les établissements scolaires, centres de loisirs, associations et collectivités du Grand Est.",
      { size: 21 },
    ),
  ], { after: 30 }),
);

C.push(h2("Disciplines proposées", BD));
C.push(gap(10));

const disciplines = [
  [
    "Robotique & électronique",
    "Programmation de robots, circuits simples, initiation à l'électronique",
  ],
  [
    "Code & développement",
    "Scratch, Python, création de jeux vidéo, logique algorithmique",
  ],
  [
    "Intelligence artificielle",
    "Machine learning simplifié, éthique de l'IA, applications concrètes",
  ],
  [
    "Chimie ludique",
    "Expériences sécurisées, réactions chimiques, enquête scientifique",
  ],
  [
    "Physique & astronomie",
    "Fusées, système solaire, expériences physique, optique",
  ],
  [
    "FabLab & impression 3D",
    "Conception 3D, fabrication numérique, introduction aux makers",
  ],
  [
    "Écologie & environnement",
    "Biodiversité, microhabitats, numérique responsable",
  ],
  [
    "Cybersécurité",
    "Bonnes pratiques, vie privée, premiers réflexes numériques",
  ],
  [
    "Escape game scientifique",
    "Format immersif mêlant logique, physique et mathématiques",
  ],
];
const discW = Math.floor(CW / 3);
const discRows = [];
for (let i = 0; i < disciplines.length; i += 3) {
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const d = disciplines[i + j] || ["", ""];
    const bg = (i + j) % 2 === 0 ? BP : WH;
    cells.push(
      new TableCell({
        borders: cellBorders,
        width: { size: j === 2 ? CW - 2 * discW : discW, type: WidthType.DXA },
        shading: sh(bg),
        margins: cPad,
        children: [
          new Paragraph({
            children: [r(d[0], { bold: true, size: 20, color: BD })],
            spacing: { before: 0, after: 10 },
          }),
          new Paragraph({
            children: [r(d[1], { size: 19, italic: true, color: GR })],
            spacing: { before: 0, after: 0 },
          }),
        ],
      }),
    );
  }
  discRows.push(new TableRow({ children: cells }));
}
C.push(
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [discW, discW, CW - 2 * discW],
    rows: discRows,
  }),
);

C.push(gap(40));
C.push(h2("Formats d'intervention", BD));
C.push(gap(10));

const formats = [
  [Math.floor(CW / 3), Math.floor(CW / 3), CW - 2 * Math.floor(CW / 3)],
  [
    "Atelier ponctuel\n1h30 à 2h",
    "Module (3 à 6 séances)\nsur plusieurs semaines",
    "Pack annuel\n20 à 30 heures",
  ],
  [
    "Idéal pour une journée\nthématique ou un événement",
    "Intégré dans une séquence\npédagogique annuelle",
    "Projet de fin d'année,\nsemaine intensive",
  ],
  ["150 à 390 € HT", "530 à 1 900 € HT", "3 000 à 3 200 € HT"],
];
C.push(
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: formats[0],
    rows: formats.slice(1).map(function (row, ri) {
      return new TableRow({
        children: row.map(function (val, ci) {
          const bg = ri === 0 ? sh(BD) : (ri === 2 ? sh(GB) : sh(BP));
          const color = ri === 0 ? WH : (ri === 2 ? GD : "000000");
          const bold = ri === 0 || ri === 2;
          return new TableCell({
            borders: ri === 0 ? headBorders : cellBorders,
            width: { size: formats[0][ci], type: WidthType.DXA },
            shading: bg,
            margins: cPad,
            children: val.split("\n").map(function (line) {
              return new Paragraph({
                children: [r(line, { size: 20, bold, color })],
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 10 },
              });
            }),
          });
        }),
      });
    }),
  }),
);

C.push(pb());

// ── SECTION 3 — CLIENTÈLE & MARCHÉ ───────────────────────────────────────────
C.push(bandTitle("3.  Clientèle et marché"));
C.push(gap(30));

C.push(twoCol(
  [
    p([r("Clients cibles", { bold: true, size: 21, color: BD })], {
      after: 30,
    }),
    bul([
      r("Écoles primaires publiques et privées", { bold: true, size: 21 }),
      r(" — ateliers CE2 à CM2", { size: 21 }),
    ]),
    bul([
      r("Collèges et lycées", { bold: true, size: 21 }),
      r(" — projets pédagogiques, semaines thématiques", { size: 21 }),
    ]),
    bul([
      r("Centres de loisirs et MJC", { bold: true, size: 21 }),
      r(" — animations périscolaires et vacances", { size: 21 }),
    ]),
    bul([
      r("Associations socioculturelles", { bold: true, size: 21 }),
      r(" — publics variés, financement CAF/PEDT", { size: 21 }),
    ]),
    bul([
      r("Collectivités et mairies", { bold: true, size: 21 }),
      r(" — animations PEDT et événements", { size: 21 }),
    ]),
    bul([
      r("Universités et BTS/IUT", { bold: true, size: 21 }),
      r(" — ateliers IA et hackathons", { size: 21 }),
    ]),
  ],
  [
    p([
      r("Concurrence et différenciation", { bold: true, size: 21, color: GD }),
    ], { after: 30 }),
    p(
      "Sur le Grand Est, l'offre d'ateliers STEM est fragmentée, peu pluridisciplinaire et rarement clé en main.",
      { after: 25 },
    ),
    p([r("Avantages d'Ateliers 360 :", { bold: true, size: 21 })], {
      after: 15,
    }),
    bul("Matériel fourni — zéro logistique côté établissement"),
    bul("15 disciplines dans un seul catalogue"),
    bul("Formats flexibles (1 atelier à un pack annuel)"),
    bul("Compte-rendu pédagogique après chaque intervention"),
    bul("Alignement sur les programmes scolaires"),
    bul("Tarifs accessibles aux structures publiques"),
  ],
));

C.push(gap(30));
C.push(h2("Zone de chalandise", BD));
C.push(gap(10));
C.push(
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [
      Math.floor(CW * 0.33),
      Math.floor(CW * 0.33),
      CW - 2 * Math.floor(CW * 0.33),
    ],
    rows: [
      new TableRow({
        children: [
          ["Priorité 1\nGrand Est - Moselle (57)", BD, WH],
          ["Priorité 2\nGrand Est - Meurthe-et-Moselle (54)", BM, WH],
          ["Extension An 2\nLuxembourg - Wallonie belge", TEAL, WH],
        ].map(function (item, i) {
          const w = i === 2
            ? CW - 2 * Math.floor(CW * 0.33)
            : Math.floor(CW * 0.33);
          return new TableCell({
            borders: cellBorders,
            width: { size: w, type: WidthType.DXA },
            shading: sh(item[1]),
            margins: cPadLg,
            children: item[0].split("\n").map(function (line, j) {
              return new Paragraph({
                children: [
                  r(line, { bold: j === 0, size: 20, color: item[2] }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: j === 0 ? 10 : 0 },
              });
            }),
          });
        }),
      }),
    ],
  }),
);

C.push(pb());

// ── SECTION 4 — PRÉVISIONNEL ──────────────────────────────────────────────────
C.push(bandTitle("4.  Prévisionnel de chiffre d'affaires — 1ère année"));
C.push(gap(30));

C.push(
  p([
    r(
      "Le modèle économique repose sur des interventions facturées à la mission, sans frais fixes de local. La montée en charge est progressive — 3 ateliers/mois au démarrage pour atteindre 8 ateliers/mois en régime de croisière.",
      { size: 21 },
    ),
  ], { after: 30 }),
);

C.push(caTable([
  ["M1 – M2", "3", "240 €", "720 €"],
  ["M3 – M4", "5", "245 €", "1 225 €"],
  ["M5 – M6", "6", "250 €", "1 500 €"],
  ["M7 – M9", "7", "250 €", "1 750 €"],
  ["M10 – M12", "8", "260 €", "2 080 €"],
  ["TOTAL AN 1", "~72 ateliers", "250 € moy.", "≈ 17 400 € HT", true],
]));

C.push(gap(30));

C.push(twoCol(
  [
    p([r("Charges An 1 (estimation)", { bold: true, size: 21, color: BD })], {
      after: 20,
    }),
    infoRow("Assurance RC Pro", "1 320 €"),
    gap(8),
    infoRow("Consommables pédagogiques", "2 000 €"),
    gap(8),
    infoRow("Déplacements (carburant, péages)", "1 800 €"),
    gap(8),
    infoRow("Communication & supports", "500 €"),
    gap(8),
    infoRow("Divers & imprévus", "380 €"),
    gap(8),
    infoRow("TOTAL CHARGES", "6 000 €"),
  ],
  [
    p([r("Résultat estimé An 1", { bold: true, size: 21, color: GD })], {
      after: 20,
    }),
    p([
      r("CA HT :  ", { bold: true, size: 21, color: GD }),
      r("≈ 17 400 €", { bold: true, size: 24, color: GD }),
    ], { after: 20 }),
    p([
      r("Charges :  ", { bold: true, size: 21 }),
      r("≈ 6 000 €", { size: 21, color: GR }),
    ], { after: 20 }),
    new Paragraph({
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 4, color: GD, space: 4 },
      },
      children: [],
      spacing: { before: 0, after: 20 },
    }),
    p([
      r("Bénéfice net estimé :  ", { bold: true, size: 21, color: GD }),
      r("≈ 11 400 €", { bold: true, size: 26, color: GD }),
    ], { after: 30 }),
    p([
      r("Seuil de rentabilité mensuel : ", { size: 20 }),
      r("500 €", { bold: true, size: 20, color: GD }),
    ], { after: 10 }),
    p([
      r("Soit environ 2 ateliers par mois — atteint dès M1.", {
        size: 20,
        italic: true,
        color: GR,
      }),
    ], { after: 0 }),
  ],
  Math.floor(CW * 0.52),
));

C.push(pb());

// ── SECTION 5 — PLAN DE FINANCEMENT ──────────────────────────────────────────
C.push(bandTitle("5.  Plan de financement et utilisation du microcrédit"));
C.push(gap(30));

C.push(
  p([
    r(
      "Le microcrédit de 5 500 € sollicité auprès de l'ADIE permet de financer intégralement le démarrage opérationnel — matériel pédagogique, équipement et trésorerie initiale. L'activité génère ses propres revenus dès le premier mois.",
      { size: 21 },
    ),
  ], { after: 30 }),
);

C.push(budgetTable([
  [
    "Kits robotique (2× mBot + accessoires + pièces)",
    "400 €",
    "Indispensable — ateliers robotique représentent 30% du catalogue",
  ],
  [
    "Kits Arduino & Raspberry Pi (6 kits complets)",
    "350 €",
    "Ateliers électronique, IA, FabLab",
  ],
  [
    "Matériel chimie légère (réactifs, bacs, EPI, tabliers)",
    "200 €",
    "Ateliers chimie — le plus demandé en primaire",
  ],
  [
    "Imprimante 3D portable (Bambu Lab A1 Mini)",
    "450 €",
    "FabLab mobile — différenciateur fort vs concurrence",
  ],
  [
    "Ordinateur portable dédié interventions",
    "900 €",
    "Ateliers code, IA, cybersécurité — 1 poste min. requis",
  ],
  [
    "Vidéoprojecteur portable",
    "300 €",
    "Nécessaire quand l'établissement n'en dispose pas",
  ],
  [
    "Mallettes de transport (matériel protégé)",
    "150 €",
    "Protection du matériel lors des déplacements",
  ],
  [
    "Communication (flyers, cartes, kit décideur imprimé)",
    "250 €",
    "Prospection commerciale — premier trimestre",
  ],
  [
    "Assurance RC Pro — 1ère année",
    "1 000 €",
    "Obligatoire avant toute intervention en établissement",
  ],
  [
    "Trésorerie de sécurité (2 mois de charges)",
    "1 500 €",
    "Sécurité avant premiers encaissements (30 à 60 jours)",
  ],
  ["TOTAL", "5 500 €", "Microcrédit ADIE sollicité", true],
]));

C.push(gap(30));
C.push(h2("Sources de financement globales", BD));
C.push(gap(10));

const finW = [
  Math.floor(CW * 0.45),
  Math.floor(CW * 0.2),
  CW - Math.floor(CW * 0.65),
];
C.push(
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: finW,
    rows: [
      new TableRow({
        tableHeader: true,
        children: ["Source", "Montant", "Nature"].map(function (h, i) {
          return new TableCell({
            borders: headBorders,
            width: { size: finW[i], type: WidthType.DXA },
            shading: sh(BD),
            margins: cPad,
            children: [
              new Paragraph({
                children: [r(h, { bold: true, size: 20, color: WH })],
              }),
            ],
          });
        }),
      }),
      ...[
        ["Apport personnel", "2 000 €", "Fonds propres disponibles"],
        ["Microcrédit ADIE (demandé)", "5 500 €", "Objet du présent dossier"],
        [
          "Aide embauche apprenti — SNEE",
          "6 000 €/an",
          "Exonération charges + aide État (si alternant)",
        ],
        [
          "ACRE — exonération charges An 1",
          "≈ 1 500 €",
          "Dispositif micro-entrepreneur",
        ],
        [
          "Chèque CREA Microcrédit Grand Est",
          "945 €",
          "Aide accompagnement opérateur (ADIE)",
        ],
      ].map(function (row, i) {
        const bg = i % 2 === 0 ? BP : WH;
        return new TableRow({
          children: row.map(function (val, j) {
            return new TableCell({
              borders: cellBorders,
              width: { size: finW[j], type: WidthType.DXA },
              shading: sh(bg),
              margins: cPad,
              children: [
                new Paragraph({
                  children: [
                    r(val, {
                      size: 20,
                      bold: j === 1,
                      color: j === 1 ? BD : "000000",
                    }),
                  ],
                  alignment: j === 1
                    ? AlignmentType.CENTER
                    : AlignmentType.LEFT,
                }),
              ],
            });
          }),
        });
      }),
    ],
  }),
);

C.push(pb());

// ── SECTION 6 — DÉVELOPPEMENT & PERSPECTIVES ─────────────────────────────────
C.push(bandTitle("6.  Perspectives de développement"));
C.push(gap(30));

C.push(
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [
      Math.floor(CW / 3),
      Math.floor(CW / 3),
      CW - 2 * Math.floor(CW / 3),
    ],
    rows: [
      new TableRow({
        children: [
          ["An 1 — Micro-entrepreneur", BD],
          ["An 2 — Transformation SAS", BM],
          ["An 3+ — Expansion", TEAL],
        ].map(function (item, i) {
          const w = i === 2 ? CW - 2 * Math.floor(CW / 3) : Math.floor(CW / 3);
          return new TableCell({
            borders: headBorders,
            width: { size: w, type: WidthType.DXA },
            shading: sh(item[1]),
            margins: cPad,
            children: [
              new Paragraph({
                children: [r(item[0], { bold: true, size: 20, color: WH })],
                alignment: AlignmentType.CENTER,
              }),
            ],
          });
        }),
      }),
      new TableRow({
        children: [
          [
            [
              "Démarrage Ateliers 360",
              "8 ateliers/mois",
              "Grand Est",
              "CA ≈ 17 400 € HT",
            ],
            BP,
            BD,
          ],
          [
            [
              "+ Passerelle Jeunesse",
              "Local propre Metz",
              "Equipe 3-4 pers.",
              "CA cible > 55 000 €",
            ],
            sh(BL).fill,
            BM,
          ],
          [
            [
              "+ Cavalier Studio",
              "Luxembourg · Wallonie",
              "Apps Bloom Connect",
              "CA cible > 85 000 €",
            ],
            TEALB,
            TEAL,
          ],
        ].map(function (item, i) {
          const w = i === 2 ? CW - 2 * Math.floor(CW / 3) : Math.floor(CW / 3);
          return new TableCell({
            borders: cellBorders,
            width: { size: w, type: WidthType.DXA },
            shading: sh(item[1]),
            margins: cPadLg,
            children: item[0].map(function (line, j) {
              return new Paragraph({
                children: [
                  r(j === 0 ? "→ " + line : line, {
                    size: 20,
                    bold: j === 0,
                    color: item[2],
                  }),
                ],
                spacing: { before: 0, after: 15 },
              });
            }),
          });
        }),
      }),
    ],
  }),
);

C.push(gap(40));

// Engagements
C.push(bandTitle("7.  Engagements du porteur de projet", GD));
C.push(gap(20));
[
  "Consacrer l'intégralité de mon temps à cette activité dès le lancement — c'est mon activité principale.",
  "Maintenir un rythme de prospection actif : minimum 3 nouveaux contacts par semaine dès le démarrage.",
  "Rembourser le microcrédit selon l'échéancier convenu avec l'ADIE — le prévisionnel de CA est conservateur et sécurisé.",
  "Participer aux rendez-vous de suivi proposés par l'opérateur ADIE pendant toute la durée de l'accompagnement.",
  "Transmettre les justificatifs de dépenses et bilans d'activité aux dates convenues.",
].forEach(function (line) {
  C.push(bul(line));
});

C.push(gap(40));

// Signature
C.push(
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [Math.floor(CW / 2), CW - Math.floor(CW / 2)],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: cellBorders,
            width: { size: Math.floor(CW / 2), type: WidthType.DXA },
            shading: sh(BP),
            margins: cPadLg,
            children: [
              p([
                r("Fait à Metz, le " + new Date().toLocaleDateString("fr-FR"), {
                  size: 20,
                  color: GR,
                }),
              ], { after: 60 }),
              p([r("Signature :", { bold: true, size: 20, color: BD })], {
                after: 120,
              }),
              p([r("Nathan Imogo", { bold: true, size: 21 })], { after: 10 }),
              p([
                r("Micro-entrepreneur | Ateliers 360", { size: 20, color: GR }),
              ], { after: 0 }),
            ],
          }),
          new TableCell({
            borders: cellBorders,
            width: { size: CW - Math.floor(CW / 2), type: WidthType.DXA },
            shading: sh(GB),
            margins: cPadLg,
            children: [
              p([
                r("Chèque CREA n° 00220319", {
                  bold: true,
                  size: 20,
                  color: GD,
                }),
              ], { after: 20 }),
              p([
                r("Émis le 17/07/2026 · Valide jusqu'au 17/09/2026", {
                  size: 20,
                  color: GD,
                }),
              ], { after: 20 }),
              p([r("Territoire : METZ", { size: 20, color: GD })], {
                after: 20,
              }),
              p([
                r("Microcrédit ADIE demandé : 5 500 €", {
                  bold: true,
                  size: 21,
                  color: GD,
                }),
              ], { after: 0 }),
            ],
          }),
        ],
      }),
    ],
  }),
);

// FOOTER
const footer = new Footer({
  children: [
    new Paragraph({
      children: [
        r(
          "Ateliers 360 — Nathan Imogo | Metz, Grand Est | nathan.imogo@outlook.fr | 07 53 61 24 71",
          { size: 16, color: GR },
        ),
        new TextRun({
          children: ["\t", PageNumber.CURRENT],
          font: FONT,
          size: 16,
          color: GR,
        }),
      ],
      border: {
        top: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC", space: 4 },
      },
      tabStops: [{ type: TabStopType.RIGHT, position: CW }],
    }),
  ],
});

const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0,
        format: LevelFormat.BULLET,
        text: "•",
        alignment: AlignmentType.LEFT,
        style: {
          paragraph: {
            indent: { left: 440, hanging: 220 },
            spacing: { before: 20, after: 20 },
          },
        },
      }],
    }],
  },
  styles: {
    default: { document: { run: { font: FONT, size: 21 } } },
    paragraphStyles: [
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 23, bold: true, font: FONT, color: BD },
        paragraph: { spacing: { before: 240, after: 80 }, outlineLevel: 1 },
      },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE.width, height: PAGE.height },
        margin: MARGIN,
      },
    },
    footers: { default: footer },
    children: C,
  }],
});

Packer.toBuffer(doc).then(function (buf) {
  fs.writeFileSync("/Users/nathanimogo/Dev/ateliers360/_core/platform-v2/docs/generate_docs/Presentation_Ateliers360_ADIE.docx", buf);
  console.log("Done.");
}).catch(function (e) {
  console.error(e);
  process.exit(1);
});
