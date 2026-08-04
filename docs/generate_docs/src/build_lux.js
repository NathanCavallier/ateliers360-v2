const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, WidthType, ShadingType, BorderStyle, HeadingLevel,
  LevelFormat, ImageRun, PageBreak, VerticalAlign
} = require('docx');
const fs = require('fs');
const path = require('path');

// Colors
const BLUE_DARK = "1B3A6B";
const BLUE_MID = "2D6FAF";
const BLUE_LIGHT = "D6E4F0";
const ORANGE = "E8813A";
const WHITE = "FFFFFF";
const GREY_BG = "F5F7FA";
const GREY_TEXT = "555555";

const border0 = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: border0, bottom: border0, left: border0, right: border0 };

const thinBorder = { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" };
const thinBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

function cell(children, opts = {}) {
  return new TableCell({
    borders: opts.borders || thinBorders,
    width: opts.width ? { size: opts.width, type: WidthType.DXA } : undefined,
    shading: opts.bg ? { fill: opts.bg, type: ShadingType.CLEAR } : undefined,
    verticalAlign: opts.valign || VerticalAlign.TOP,
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    columnSpan: opts.span,
    children
  });
}

function p(text, opts = {}) {
  return new Paragraph({
    alignment: opts.align || AlignmentType.LEFT,
    spacing: { before: opts.before || 0, after: opts.after || 80 },
    children: [new TextRun({
      text,
      bold: opts.bold,
      color: opts.color || "000000",
      size: opts.size || 20,
      font: "Arial",
      italics: opts.italic
    })]
  });
}

function multiRun(runs, opts = {}) {
  return new Paragraph({
    alignment: opts.align || AlignmentType.LEFT,
    spacing: { before: opts.before || 0, after: opts.after || 80 },
    numbering: opts.numbering,
    children: runs.map(r => new TextRun({
      text: r.text,
      bold: r.bold,
      color: r.color || "000000",
      size: r.size || 20,
      font: "Arial",
      italics: r.italic,
      break: r.break
    }))
  });
}

function sectionHeader(text) {
  return new Paragraph({
    spacing: { before: 200, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: BLUE_MID } },
    children: [new TextRun({ text, bold: true, color: BLUE_DARK, size: 24, font: "Arial" })]
  });
}

function bulletPara(text, bold_prefix = null) {
  const runs = [];
  if (bold_prefix) {
    runs.push(new TextRun({ text: bold_prefix, bold: true, size: 20, font: "Arial", color: "000000" }));
    runs.push(new TextRun({ text, size: 20, font: "Arial", color: "000000" }));
  } else {
    runs.push(new TextRun({ text, size: 20, font: "Arial", color: "000000" }));
  }
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 0, after: 60 },
    children: runs
  });
}

const logoData = fs.readFileSync('/Users/nathanimogo/Dev/ateliers360/_core/platform-v2/docs/generate_docs/src/logo_Ateliers360.png');

const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "\u2022",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 400, hanging: 200 } } }
      }]
    }]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 720, right: 900, bottom: 720, left: 900 }
      }
    },
    children: [

      // ── HEADER TABLE ──────────────────────────────────────────────
      new Table({
        width: { size: 10106, type: WidthType.DXA },
        columnWidths: [1700, 8406],
        rows: [new TableRow({
          children: [
            cell([
              new Paragraph({
                children: [new ImageRun({ data: logoData, transformation: { width: 90, height: 80 }, type: "png" })],
                alignment: AlignmentType.CENTER
              })
            ], { borders: noBorders, width: 1700, bg: WHITE, valign: VerticalAlign.CENTER }),
            cell([
              p("DOSSIER DE PRÉSENTATION", { bold: true, color: GREY_TEXT, size: 16, after: 20 }),
              p("Ateliers 360", { bold: true, color: BLUE_DARK, size: 36, after: 20 }),
              p("Ateliers scientifiques & numériques pour les écoles et structures éducatives", { italic: true, color: GREY_TEXT, size: 20, after: 20 }),
              p("Travailleur indépendant — Luxembourg, Grande Région — 2026", { color: BLUE_MID, size: 18 })
            ], { borders: noBorders, width: 8406, bg: WHITE })
          ]
        })]
      }),

      new Paragraph({ spacing: { after: 120 }, children: [] }),

      // ── PORTEUR BOX ───────────────────────────────────────────────
      new Table({
        width: { size: 10106, type: WidthType.DXA },
        columnWidths: [10106],
        rows: [new TableRow({
          children: [cell([
            p("Porteur de projet", { bold: true, color: BLUE_MID, size: 20, after: 40 }),
            p("Nathan Imogo", { bold: true, color: BLUE_DARK, size: 22, after: 40 }),
            p("Développeur full-stack & formateur en numérique", { size: 20, after: 30 }),
            p("Esch-sur-Alzette, Luxembourg  |  07 53 61 24 71  |  nathan.imogo@outlook.fr  |  www.ateliers360.fr", { size: 18, color: GREY_TEXT })
          ], { borders: thinBorders, width: 10106, bg: BLUE_LIGHT })]
        })]
      }),

      new Paragraph({ spacing: { after: 120 }, children: [] }),

      // ── KEY FIGURES ───────────────────────────────────────────────
      new Table({
        width: { size: 10106, type: WidthType.DXA },
        columnWidths: [2526, 2526, 2527, 2527],
        rows: [new TableRow({
          children: [
            cell([
              p("15+", { bold: true, color: WHITE, size: 36, align: AlignmentType.CENTER, after: 10 }),
              p("Disciplines au catalogue", { color: WHITE, size: 18, align: AlignmentType.CENTER })
            ], { borders: noBorders, width: 2526, bg: BLUE_DARK, valign: VerticalAlign.CENTER }),
            cell([
              p("180 - 450 €", { bold: true, color: WHITE, size: 28, align: AlignmentType.CENTER, after: 10 }),
              p("Par atelier (HT)", { color: WHITE, size: 18, align: AlignmentType.CENTER })
            ], { borders: noBorders, width: 2526, bg: BLUE_MID, valign: VerticalAlign.CENTER }),
            cell([
              p("Luxembourg", { bold: true, color: WHITE, size: 26, align: AlignmentType.CENTER, after: 10 }),
              p("Zone prioritaire", { color: WHITE, size: 18, align: AlignmentType.CENTER })
            ], { borders: noBorders, width: 2527, bg: ORANGE, valign: VerticalAlign.CENTER }),
            cell([
              p("FR / BE", { bold: true, color: WHITE, size: 28, align: AlignmentType.CENTER, after: 10 }),
              p("Extension Grande Région", { color: WHITE, size: 18, align: AlignmentType.CENTER })
            ], { borders: noBorders, width: 2527, bg: BLUE_DARK, valign: VerticalAlign.CENTER })
          ]
        })]
      }),

      new Paragraph({ spacing: { after: 200 }, children: [] }),

      // ── SECTION 1 ─────────────────────────────────────────────────
      sectionHeader("1. Le porteur de projet"),
      new Paragraph({ spacing: { after: 100 }, children: [] }),

      new Table({
        width: { size: 10106, type: WidthType.DXA },
        columnWidths: [4800, 5306],
        rows: [new TableRow({
          children: [
            cell([
              p("Formation & expérience", { bold: true, color: BLUE_MID, size: 20, after: 80 }),
              bulletPara("Bachelor Développeur Full-Stack (Bac+3)"),
              bulletPara("5 ans d'expérience en développement web et mobile"),
              bulletPara("Formateur en numérique auprès de différents publics"),
              bulletPara("Maîtrise des outils pédagogiques STEM"),
              new Paragraph({ spacing: { after: 100 }, children: [] }),
              p("Compétences clés", { bold: true, color: BLUE_MID, size: 20, after: 80 }),
              bulletPara("Conception et animation d'ateliers pratiques"),
              bulletPara("Pédagogie différenciée tous niveaux"),
              bulletPara("Robotique, code, IA, sciences, FabLab"),
              bulletPara("Communication bilingue français / anglais"),
              bulletPara("Relation client et gestion de partenariats")
            ], { borders: thinBorders, width: 4800, bg: GREY_BG }),
            cell([
              p("Motivations", { bold: true, color: BLUE_MID, size: 20, after: 80 }),
              p("Fort d'une double compétence technique et pédagogique, j'ai identifié au Luxembourg un marché porteur et peu couvert : la demande d'ateliers STEM de qualité, pluridisciplinaires et clé en main, y est croissante auprès des écoles fondamentales, lycées et maisons relais, dans un contexte où l'éducation au numérique et aux sciences appliquées est une priorité nationale.", { size: 20, after: 120 }),
              p("Ateliers 360 répond directement à ce besoin : intervenir dans les établissements et structures éducatives luxembourgeois avec du matériel fourni, des contenus adaptés aux programmes (Plan d'études cadre) et une pédagogie engageante, sans contrainte logistique pour l'établissement partenaire.", { size: 20 })
            ], { borders: thinBorders, width: 5306, bg: WHITE })
          ]
        })]
      }),

      new Paragraph({ spacing: { after: 200 }, children: [] }),

      // ── SECTION 2 ─────────────────────────────────────────────────
      sectionHeader("2. Le projet Ateliers 360 — Trois pôles complémentaires"),
      new Paragraph({ spacing: { after: 100 }, children: [] }),

      p("Ateliers 360 est une activité d'animation pédagogique scientifique et numérique exercée en tant que travailleur indépendant. Je conçois et anime des ateliers pratiques dans les écoles fondamentales, lycées, maisons relais, ASBL et communes du Luxembourg, avec une extension naturelle vers la Grande Région (Wallonie et régions limitrophes). Le projet se déploie en deux phases, autour de trois pôles complémentaires.", { size: 20, after: 160 }),

      // Phase 1 label
      new Paragraph({
        spacing: { before: 80, after: 80 },
        children: [new TextRun({ text: "PHASE 1 — Active dès le lancement", bold: true, color: WHITE, size: 20, font: "Arial" })]
      }),

      new Table({
        width: { size: 10106, type: WidthType.DXA },
        columnWidths: [10106],
        rows: [new TableRow({
          children: [cell([
            p("PHASE 1 — Active dès le lancement", { bold: true, color: WHITE, size: 20, after: 0 })
          ], { borders: noBorders, width: 10106, bg: BLUE_DARK })]
        })]
      }),

      new Paragraph({ spacing: { after: 80 }, children: [] }),

      // Pôle 1
      new Table({
        width: { size: 10106, type: WidthType.DXA },
        columnWidths: [200, 9906],
        rows: [new TableRow({
          children: [
            cell([], { borders: noBorders, width: 200, bg: ORANGE }),
            cell([
              p("Pôle 1 — Ateliers 360 Éducation : Sciences, robotique & numérique", { bold: true, color: BLUE_DARK, size: 21, after: 80 }),
              p("Conception et animation d'ateliers pédagogiques pratiques en robotique, programmation, intelligence artificielle, chimie, physique, astronomie, fabrication numérique et cybersécurité. Interventions dans les établissements scolaires (écoles fondamentales, lycées, lycées techniques), maisons relais, ASBL et communes du Luxembourg.", { size: 20, after: 80 }),
              p("Formats : atelier ponctuel (1h30-2h) · module (3 à 6 séances) · pack annuel (20 à 30h)", { size: 19, italic: true, color: GREY_TEXT })
            ], { borders: noBorders, width: 9906, bg: GREY_BG })
          ]
        })]
      }),

      new Paragraph({ spacing: { after: 80 }, children: [] }),

      // Pôle 2
      new Table({
        width: { size: 10106, type: WidthType.DXA },
        columnWidths: [200, 9906],
        rows: [new TableRow({
          children: [
            cell([], { borders: noBorders, width: 200, bg: BLUE_MID }),
            cell([
              p("Pôle 2 — Cavalier Studio : Solutions numériques", { bold: true, color: BLUE_DARK, size: 21, after: 80 }),
              p("Développement de sites internet, d'applications web et mobiles, intégration d'intelligence artificielle et conseil numérique pour les ASBL, communes, PME et startups du Luxembourg et de la Grande Région. Missions réalisables depuis l'espace de coworking sans nécessiter de local propre.", { size: 20 })
            ], { borders: noBorders, width: 9906, bg: GREY_BG })
          ]
        })]
      }),

      new Paragraph({ spacing: { after: 120 }, children: [] }),

      // Phase 2
      new Table({
        width: { size: 10106, type: WidthType.DXA },
        columnWidths: [10106],
        rows: [new TableRow({
          children: [cell([
            p("PHASE 2 — Après constitution d'une trésorerie suffisante (6 à 9 mois)", { bold: true, color: WHITE, size: 20, after: 0 })
          ], { borders: noBorders, width: 10106, bg: BLUE_MID })]
        })]
      }),

      new Paragraph({ spacing: { after: 80 }, children: [] }),

      // Pôle 3 Passerelle Jeunesse Luxembourg
      new Table({
        width: { size: 10106, type: WidthType.DXA },
        columnWidths: [200, 9906],
        rows: [new TableRow({
          children: [
            cell([], { borders: noBorders, width: 200, bg: "4CAF50" }),
            cell([
              p("Pôle 3 — Passerelle Jeunesse : Accueil éducatif & loisirs scientifiques", { bold: true, color: BLUE_DARK, size: 21, after: 80 }),
              p("Accueil périscolaire et parascolaire d'enfants de 4 à 12 ans, en partenariat avec des communes ou sous forme d'ASBL agréée, dans le cadre réglementaire luxembourgeois des Services d'Éducation et d'Accueil (SEA). Activités créatives, ateliers thématiques scientifiques et numériques, stages pendant les vacances scolaires.", { size: 20, after: 80 }),
              p("Cadre légal visé : agrément Ministère de l'Éducation nationale (SEA) — partenariat communal ou création ASBL selon la commune retenue.", { size: 19, italic: true, color: GREY_TEXT, after: 80 }),
              p("Villes cibles pour l'implantation de Passerelle Jeunesse :", { bold: true, size: 20, after: 60 }),
              bulletPara("Esch-sur-Alzette : 2e ville du pays, jeune population, forte densité familiale, pôle universitaire Belval à proximité, loyers plus accessibles qu'en capitale. Idéal pour une première structure SEA."),
              bulletPara("Differdange : ville en pleine transformation, population multiculturelle, besoin fort en offre périscolaire enrichie, communes proactives sur les projets éducatifs."),
              bulletPara("Dudelange : 3e ville du pays, communauté familiale active, proximité frontière française (10 min de Volmerange), bon équilibre accessibilité / densité.")
            ], { borders: noBorders, width: 9906, bg: GREY_BG })
          ]
        })]
      }),

      new Paragraph({ spacing: { after: 200 }, children: [] }),

      // ── DISCIPLINES ───────────────────────────────────────────────
      sectionHeader("Disciplines proposées — Pôle Ateliers 360 Éducation"),
      new Paragraph({ spacing: { after: 100 }, children: [] }),

      new Table({
        width: { size: 10106, type: WidthType.DXA },
        columnWidths: [3368, 3369, 3369],
        rows: [
          new TableRow({ children: [
            cell([p("Robotique & électronique", { bold: true, color: BLUE_DARK, size: 20, after: 40 }), p("Programmation de robots, circuits simples, initiation à l'électronique", { italic: true, size: 18, color: GREY_TEXT })], { borders: thinBorders, width: 3368, bg: GREY_BG }),
            cell([p("Code & développement", { bold: true, color: BLUE_DARK, size: 20, after: 40 }), p("Scratch, Python, création de jeux vidéo, logique algorithmique", { italic: true, size: 18, color: GREY_TEXT })], { borders: thinBorders, width: 3369, bg: GREY_BG }),
            cell([p("Intelligence artificielle", { bold: true, color: BLUE_DARK, size: 20, after: 40 }), p("Machine learning simplifié, éthique de l'IA, applications concrètes", { italic: true, size: 18, color: GREY_TEXT })], { borders: thinBorders, width: 3369, bg: GREY_BG })
          ]}),
          new TableRow({ children: [
            cell([p("Chimie ludique", { bold: true, color: BLUE_DARK, size: 20, after: 40 }), p("Expériences sécurisées, réactions chimiques, enquête scientifique", { italic: true, size: 18, color: GREY_TEXT })], { borders: thinBorders, width: 3368, bg: WHITE }),
            cell([p("Physique & astronomie", { bold: true, color: BLUE_DARK, size: 20, after: 40 }), p("Fusées, système solaire, expériences physique, optique", { italic: true, size: 18, color: GREY_TEXT })], { borders: thinBorders, width: 3369, bg: WHITE }),
            cell([p("FabLab & impression 3D", { bold: true, color: BLUE_DARK, size: 20, after: 40 }), p("Conception 3D, fabrication numérique, introduction aux makers", { italic: true, size: 18, color: GREY_TEXT })], { borders: thinBorders, width: 3369, bg: WHITE })
          ]}),
          new TableRow({ children: [
            cell([p("Écologie & environnement", { bold: true, color: BLUE_DARK, size: 20, after: 40 }), p("Biodiversité, microhabitats, numérique responsable", { italic: true, size: 18, color: GREY_TEXT })], { borders: thinBorders, width: 3368, bg: GREY_BG }),
            cell([p("Cybersécurité", { bold: true, color: BLUE_DARK, size: 20, after: 40 }), p("Bonnes pratiques, vie privée, premiers réflexes numériques", { italic: true, size: 18, color: GREY_TEXT })], { borders: thinBorders, width: 3369, bg: GREY_BG }),
            cell([p("Escape game scientifique", { bold: true, color: BLUE_DARK, size: 20, after: 40 }), p("Format immersif mêlant logique, physique et mathématiques", { italic: true, size: 18, color: GREY_TEXT })], { borders: thinBorders, width: 3369, bg: GREY_BG })
          ]}),
        ]
      }),

      new Paragraph({ spacing: { after: 120 }, children: [] }),

      // Formats
      new Table({
        width: { size: 10106, type: WidthType.DXA },
        columnWidths: [3368, 3369, 3369],
        rows: [
          new TableRow({ children: [
            cell([p("Atelier ponctuel", { bold: true, color: WHITE, size: 20, align: AlignmentType.CENTER, after: 20 }), p("1h30 à 2h", { color: WHITE, size: 18, align: AlignmentType.CENTER })], { borders: noBorders, width: 3368, bg: BLUE_DARK }),
            cell([p("Module (3 à 6 séances)", { bold: true, color: WHITE, size: 20, align: AlignmentType.CENTER, after: 20 }), p("sur plusieurs semaines", { color: WHITE, size: 18, align: AlignmentType.CENTER })], { borders: noBorders, width: 3369, bg: BLUE_MID }),
            cell([p("Pack annuel", { bold: true, color: WHITE, size: 20, align: AlignmentType.CENTER, after: 20 }), p("20 à 30 heures", { color: WHITE, size: 18, align: AlignmentType.CENTER })], { borders: noBorders, width: 3369, bg: ORANGE })
          ]}),
          new TableRow({ children: [
            cell([p("Idéal pour une journée thématique ou un événement", { size: 18, align: AlignmentType.CENTER, color: GREY_TEXT })], { borders: thinBorders, width: 3368, bg: WHITE }),
            cell([p("Intégré dans une séquence pédagogique ou projet de classe", { size: 18, align: AlignmentType.CENTER, color: GREY_TEXT })], { borders: thinBorders, width: 3369, bg: WHITE }),
            cell([p("Projet annuel, semaine intensive ou suivi sur l'année scolaire", { size: 18, align: AlignmentType.CENTER, color: GREY_TEXT })], { borders: thinBorders, width: 3369, bg: WHITE })
          ]}),
          new TableRow({ children: [
            cell([p("180 à 450 € HT", { bold: true, color: BLUE_DARK, size: 20, align: AlignmentType.CENTER })], { borders: thinBorders, width: 3368, bg: GREY_BG }),
            cell([p("620 à 2 200 € HT", { bold: true, color: BLUE_DARK, size: 20, align: AlignmentType.CENTER })], { borders: thinBorders, width: 3369, bg: GREY_BG }),
            cell([p("3 200 à 3 800 € HT", { bold: true, color: BLUE_DARK, size: 20, align: AlignmentType.CENTER })], { borders: thinBorders, width: 3369, bg: GREY_BG })
          ]}),
        ]
      }),

      new Paragraph({ spacing: { after: 200 }, children: [] }),

      // ── SECTION 3 ─────────────────────────────────────────────────
      sectionHeader("3. Clientèle et marché"),
      new Paragraph({ spacing: { after: 100 }, children: [] }),

      new Table({
        width: { size: 10106, type: WidthType.DXA },
        columnWidths: [4800, 5306],
        rows: [new TableRow({
          children: [
            cell([
              p("Clients cibles", { bold: true, color: BLUE_MID, size: 20, after: 80 }),
              bulletPara("Écoles fondamentales (cycles 1 à 4) :", ""),
              bulletPara("ateliers CE2 à CM2 adaptés aux programmes LU"),
              bulletPara("Lycées et lycées techniques : projets pédagogiques, semaines thématiques, options STEM"),
              bulletPara("Maisons relais : animations périscolaires, mercredis et vacances"),
              bulletPara("ASBL et associations socioculturelles : publics variés"),
              bulletPara("Communes et administrations communales : animations dans le cadre des projets éducatifs communaux (PEC)"),
              bulletPara("Université du Luxembourg / BTS / IUT : ateliers IA, hackathons, formations"),
              bulletPara("Entreprises : formations internes, team building scientifique et numérique")
            ], { borders: thinBorders, width: 4800, bg: GREY_BG }),
            cell([
              p("Concurrence et différenciation", { bold: true, color: BLUE_MID, size: 20, after: 80 }),
              p("Au Luxembourg, l'offre d'ateliers STEM itinérants reste limitée et peu structurée. Les intervenants existants sont essentiellement des associations locales aux catalogues restreints ou des prestataires étrangers peu disponibles. Ateliers 360 se positionne comme un opérateur pluridisciplinaire clé en main de la Grande Région.", { size: 20, after: 120 }),
              p("Avantages d'Ateliers 360 :", { bold: true, size: 20, after: 60 }),
              bulletPara("Matériel fourni, zéro logistique côté établissement"),
              bulletPara("15 disciplines dans un seul catalogue, tous niveaux"),
              bulletPara("Formats flexibles (1 atelier à un pack annuel)"),
              bulletPara("Interventions en français et en anglais"),
              bulletPara("Alignement sur le Plan d'études cadre luxembourgeois"),
              bulletPara("Compte-rendu pédagogique après chaque intervention"),
              bulletPara("Tarifs accessibles aux structures publiques et ASBL")
            ], { borders: thinBorders, width: 5306, bg: WHITE })
          ]
        })]
      }),

      new Paragraph({ spacing: { after: 120 }, children: [] }),

      // Zone de chalandise
      new Table({
        width: { size: 10106, type: WidthType.DXA },
        columnWidths: [3368, 3369, 3369],
        rows: [
          new TableRow({ children: [
            cell([p("Priorité 1", { bold: true, color: WHITE, size: 20, align: AlignmentType.CENTER, after: 20 }), p("Luxembourg (tout le territoire)", { color: WHITE, size: 18, align: AlignmentType.CENTER })], { borders: noBorders, width: 3368, bg: BLUE_DARK }),
            cell([p("Priorité 2", { bold: true, color: WHITE, size: 20, align: AlignmentType.CENTER, after: 20 }), p("Grand Est — Moselle (57) et Meurthe-et-Moselle (54)", { color: WHITE, size: 18, align: AlignmentType.CENTER })], { borders: noBorders, width: 3369, bg: BLUE_MID }),
            cell([p("Extension An 2", { bold: true, color: WHITE, size: 20, align: AlignmentType.CENTER, after: 20 }), p("Wallonie (Belgique)", { color: WHITE, size: 18, align: AlignmentType.CENTER })], { borders: noBorders, width: 3369, bg: ORANGE })
          ]}),
        ]
      }),

      new Paragraph({ spacing: { after: 200 }, children: [] }),

      // ── SECTION 4 ─────────────────────────────────────────────────
      sectionHeader("4. Prévisionnel de chiffre d'affaires — 1ère année"),
      new Paragraph({ spacing: { after: 100 }, children: [] }),

      p("Le modèle économique repose sur des interventions facturées à la mission, sans frais fixes de local. Démarrage depuis un espace de coworking à Esch-sur-Alzette (Belval). Montée en charge progressive : 3 ateliers/mois au démarrage pour atteindre 8 ateliers/mois en régime de croisière.", { size: 20, after: 120 }),

      new Table({
        width: { size: 10106, type: WidthType.DXA },
        columnWidths: [2526, 2526, 2527, 2527],
        rows: [
          new TableRow({ children: [
            cell([p("Mois", { bold: true, color: WHITE, size: 20, align: AlignmentType.CENTER })], { borders: noBorders, width: 2526, bg: BLUE_DARK }),
            cell([p("Nb ateliers", { bold: true, color: WHITE, size: 20, align: AlignmentType.CENTER })], { borders: noBorders, width: 2526, bg: BLUE_DARK }),
            cell([p("Prix moyen HT", { bold: true, color: WHITE, size: 20, align: AlignmentType.CENTER })], { borders: noBorders, width: 2527, bg: BLUE_DARK }),
            cell([p("CA mensuel HT", { bold: true, color: WHITE, size: 20, align: AlignmentType.CENTER })], { borders: noBorders, width: 2527, bg: BLUE_DARK })
          ]}),
          ...([
            ["M1 - M2", "3", "290 €", "870 €"],
            ["M3 - M4", "5", "300 €", "1 500 €"],
            ["M5 - M6", "6", "310 €", "1 860 €"],
            ["M7 - M9", "7", "310 €", "2 170 €"],
            ["M10 - M12", "8", "320 €", "2 560 €"]
          ].map((row, i) => new TableRow({ children: row.map((val, j) => cell([p(val, { size: 20, align: AlignmentType.CENTER })], { borders: thinBorders, width: [2526,2526,2527,2527][j], bg: i % 2 === 0 ? GREY_BG : WHITE })) }))),
          new TableRow({ children: [
            cell([p("TOTAL AN 1", { bold: true, size: 20, align: AlignmentType.CENTER, color: WHITE })], { borders: noBorders, width: 2526, bg: BLUE_MID }),
            cell([p("~72 ateliers", { bold: true, size: 20, align: AlignmentType.CENTER, color: WHITE })], { borders: noBorders, width: 2526, bg: BLUE_MID }),
            cell([p("305 € moy.", { bold: true, size: 20, align: AlignmentType.CENTER, color: WHITE })], { borders: noBorders, width: 2527, bg: BLUE_MID }),
            cell([p("≈ 21 000 € HT", { bold: true, size: 20, align: AlignmentType.CENTER, color: WHITE })], { borders: noBorders, width: 2527, bg: BLUE_MID })
          ]})
        ]
      }),

      new Paragraph({ spacing: { after: 120 }, children: [] }),

      new Table({
        width: { size: 10106, type: WidthType.DXA },
        columnWidths: [5053, 5053],
        rows: [new TableRow({
          children: [
            cell([
              p("Charges An 1 (estimation)", { bold: true, color: BLUE_DARK, size: 20, after: 80 }),
              ...([
                ["Assurance RC Pro", "1 500 €"],
                ["Consommables pédagogiques", "1 200 €"],
                ["Déplacements (carburant, transports)", "1 200 €"],
                ["Coworking / domiciliation (6 mois)", "2 400 €"],
                ["Communication & supports", "500 €"],
                ["Divers & imprévus", "400 €"]
              ].map(([label, val]) => new Paragraph({
                spacing: { after: 40 },
                children: [
                  new TextRun({ text: label, bold: true, size: 19, font: "Arial" }),
                  new TextRun({ text: `  ${val}`, size: 19, font: "Arial", color: GREY_TEXT })
                ]
              }))),
              new Paragraph({ spacing: { after: 60 }, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" } }, children: [] }),
              new Paragraph({
                spacing: { after: 0 },
                children: [
                  new TextRun({ text: "TOTAL CHARGES  ", bold: true, size: 20, font: "Arial" }),
                  new TextRun({ text: "7 200 €", bold: true, size: 20, font: "Arial", color: BLUE_DARK })
                ]
              })
            ], { borders: thinBorders, width: 5053, bg: GREY_BG }),
            cell([
              p("Résultat estimé An 1", { bold: true, color: BLUE_DARK, size: 20, after: 80 }),
              p("CA HT : ≈ 21 000 €", { bold: true, size: 20, after: 40 }),
              p("Charges : ≈ 7 200 €", { size: 20, after: 40 }),
              p("Bénéfice net estimé : ≈ 13 800 €", { bold: true, color: BLUE_DARK, size: 22, after: 120 }),
              p("Seuil de rentabilité mensuel : 600 €", { size: 20, after: 40 }),
              p("Soit environ 2 ateliers par mois, atteint dès M1.", { italic: true, size: 18, color: GREY_TEXT })
            ], { borders: thinBorders, width: 5053, bg: WHITE })
          ]
        })]
      }),

      new Paragraph({ spacing: { after: 200 }, children: [] }),

      // ── SECTION 5 ─────────────────────────────────────────────────
      sectionHeader("5. Plan de financement — Ressources mobilisées"),
      new Paragraph({ spacing: { after: 100 }, children: [] }),

      p("Le financement du démarrage repose sur des fonds propres et un microcrédit obtenu en France auprès de l'ADIE, couvrant intégralement le matériel pédagogique, les équipements et la trésorerie initiale. L'activité est conçue pour générer ses propres revenus dès le premier mois d'exploitation.", { size: 20, after: 120 }),

      new Table({
        width: { size: 10106, type: WidthType.DXA },
        columnWidths: [5306, 1600, 3200],
        rows: [
          new TableRow({ children: [
            cell([p("Poste de dépense", { bold: true, color: WHITE, size: 20 })], { borders: noBorders, width: 5306, bg: BLUE_DARK }),
            cell([p("Montant", { bold: true, color: WHITE, size: 20, align: AlignmentType.CENTER })], { borders: noBorders, width: 1600, bg: BLUE_DARK }),
            cell([p("Justification", { bold: true, color: WHITE, size: 20 })], { borders: noBorders, width: 3200, bg: BLUE_DARK })
          ]}),
          ...([
            ["Kits robotique (2× mBot + accessoires)", "400 €", "Ateliers robotique = 30% du catalogue"],
            ["Kits Arduino & Raspberry Pi (6 kits)", "350 €", "Ateliers électronique, IA, FabLab"],
            ["Matériel chimie légère (réactifs, EPI)", "200 €", "Le plus demandé en primaire"],
            ["Imprimante 3D portable (Bambu Lab A1 Mini)", "450 €", "FabLab mobile, différenciateur fort"],
            ["Ordinateur portable dédié interventions", "900 €", "Ateliers code, IA, cybersécurité"],
            ["Vidéoprojecteur portable", "300 €", "Nécessaire si établissement non équipé"],
            ["Mallettes de transport", "150 €", "Protection du matériel"],
            ["Communication (flyers, cartes, kit décideur)", "250 €", "Prospection 1er trimestre"],
            ["Assurance RC Pro 1ère année", "1 000 €", "Obligatoire avant toute intervention"],
            ["Trésorerie de sécurité (2 mois de charges)", "1 500 €", "Avant premiers encaissements (30-60j)"]
          ].map(([label, val, just], i) => new TableRow({ children: [
            cell([p(label, { size: 19 })], { borders: thinBorders, width: 5306, bg: i % 2 === 0 ? GREY_BG : WHITE }),
            cell([p(val, { size: 19, align: AlignmentType.CENTER })], { borders: thinBorders, width: 1600, bg: i % 2 === 0 ? GREY_BG : WHITE }),
            cell([p(just, { size: 18, italic: true, color: GREY_TEXT })], { borders: thinBorders, width: 3200, bg: i % 2 === 0 ? GREY_BG : WHITE })
          ]}))),
          new TableRow({ children: [
            cell([p("TOTAL", { bold: true, size: 20, color: WHITE })], { borders: noBorders, width: 5306, bg: BLUE_MID }),
            cell([p("5 500 €", { bold: true, size: 20, align: AlignmentType.CENTER, color: WHITE })], { borders: noBorders, width: 1600, bg: BLUE_MID }),
            cell([p("Microcrédit ADIE (France)", { size: 19, color: WHITE })], { borders: noBorders, width: 3200, bg: BLUE_MID })
          ]})
        ]
      }),

      new Paragraph({ spacing: { after: 120 }, children: [] }),

      p("Sources de financement globales", { bold: true, color: BLUE_DARK, size: 20, after: 80 }),

      new Table({
        width: { size: 10106, type: WidthType.DXA },
        columnWidths: [5000, 2000, 3106],
        rows: [
          new TableRow({ children: [
            cell([p("Source", { bold: true, color: WHITE, size: 20 })], { borders: noBorders, width: 5000, bg: BLUE_DARK }),
            cell([p("Montant", { bold: true, color: WHITE, size: 20, align: AlignmentType.CENTER })], { borders: noBorders, width: 2000, bg: BLUE_DARK }),
            cell([p("Nature", { bold: true, color: WHITE, size: 20 })], { borders: noBorders, width: 3106, bg: BLUE_DARK })
          ]}),
          ...([
            ["Microcrédit ADIE (France, obtenu)", "5 500 €", "Financement du démarrage opérationnel"],
            ["Fonds propres", "500 €", "Apport personnel"],
            ["ACRE — exonération charges An 1 (France)", "≈ 1 500 €", "Dispositif micro-entrepreneur"]
          ].map(([s, m, n], i) => new TableRow({ children: [
            cell([p(s, { size: 19, bold: i===0 })], { borders: thinBorders, width: 5000, bg: i % 2 === 0 ? GREY_BG : WHITE }),
            cell([p(m, { size: 19, bold: i===0, align: AlignmentType.CENTER })], { borders: thinBorders, width: 2000, bg: i % 2 === 0 ? GREY_BG : WHITE }),
            cell([p(n, { size: 19 })], { borders: thinBorders, width: 3106, bg: i % 2 === 0 ? GREY_BG : WHITE })
          ]}))),
        ]
      }),

      new Paragraph({ spacing: { after: 200 }, children: [] }),

      // ── SECTION 6 ─────────────────────────────────────────────────
      sectionHeader("6. Perspectives de développement"),
      new Paragraph({ spacing: { after: 100 }, children: [] }),

      new Table({
        width: { size: 10106, type: WidthType.DXA },
        columnWidths: [3368, 3369, 3369],
        rows: [
          new TableRow({ children: [
            cell([p("An 1 — Indépendant LU", { bold: true, color: WHITE, size: 20, align: AlignmentType.CENTER })], { borders: noBorders, width: 3368, bg: BLUE_DARK }),
            cell([p("An 2 — Expansion Grande Région", { bold: true, color: WHITE, size: 20, align: AlignmentType.CENTER })], { borders: noBorders, width: 3369, bg: BLUE_MID }),
            cell([p("An 3+ — Structure & Expansion", { bold: true, color: WHITE, size: 20, align: AlignmentType.CENTER })], { borders: noBorders, width: 3369, bg: ORANGE })
          ]}),
          new TableRow({ children: [
            cell([
              p("Ateliers 360 Éducation au Luxembourg", { bold: true, size: 19, after: 60 }),
              p("8 ateliers/mois", { size: 18, color: GREY_TEXT, after: 40 }),
              p("Coworking Esch-sur-Alzette", { size: 18, color: GREY_TEXT, after: 40 }),
              p("CA ≈ 21 000 € HT", { bold: true, size: 19, color: BLUE_DARK })
            ], { borders: thinBorders, width: 3368, bg: GREY_BG }),
            cell([
              p("+ Grand Est (France) + Wallonie (BE)", { bold: true, size: 19, after: 60 }),
              p("+ Cavalier Studio (numérique)", { size: 18, color: GREY_TEXT, after: 40 }),
              p("Équipe 2-3 personnes", { size: 18, color: GREY_TEXT, after: 40 }),
              p("CA cible > 55 000 € HT", { bold: true, size: 19, color: BLUE_DARK })
            ], { borders: thinBorders, width: 3369, bg: GREY_BG }),
            cell([
              p("+ Passerelle Jeunesse (SEA Luxembourg)", { bold: true, size: 19, after: 60 }),
              p("Local propre (Esch / Differdange / Dudelange)", { size: 18, color: GREY_TEXT, after: 40 }),
              p("Équipe 4-5 personnes", { size: 18, color: GREY_TEXT, after: 40 }),
              p("CA cible > 85 000 € HT", { bold: true, size: 19, color: BLUE_DARK })
            ], { borders: thinBorders, width: 3369, bg: GREY_BG })
          ]})
        ]
      }),

      new Paragraph({ spacing: { after: 200 }, children: [] }),

      // ── SECTION 7 ─────────────────────────────────────────────────
      sectionHeader("7. Engagements du porteur de projet"),
      new Paragraph({ spacing: { after: 100 }, children: [] }),

      bulletPara("Consacrer l'intégralité de mon temps professionnel à cette activité dès le lancement. C'est mon activité principale."),
      bulletPara("Maintenir un rythme de prospection actif : minimum 3 nouveaux contacts par semaine auprès d'établissements et structures luxembourgeois."),
      bulletPara("Respecter l'ensemble des obligations fiscales et sociales applicables aux travailleurs indépendants au Luxembourg."),
      bulletPara("M'enregistrer auprès du Centre Commun de la Sécurité Sociale (CCSS) dès l'obtention de l'autorisation de séjour."),
      bulletPara("Produire tout justificatif comptable requis par les autorités luxembourgeoises compétentes."),
      bulletPara("Développer des partenariats durables avec les communes et établissements scolaires du territoire luxembourgeois."),

      new Paragraph({ spacing: { after: 200 }, children: [] }),

      // ── SIGNATURE ─────────────────────────────────────────────────
      new Table({
        width: { size: 10106, type: WidthType.DXA },
        columnWidths: [5053, 5053],
        rows: [new TableRow({
          children: [
            cell([
              p("Fait à Esch-sur-Alzette (Luxembourg), le ________ 2026", { size: 20, after: 80 }),
              p("Signature :", { bold: true, size: 20, after: 120 }),
              p("Nathan Imogo", { bold: true, size: 22, after: 40, color: BLUE_DARK }),
              p("Travailleur indépendant | Ateliers 360", { size: 19, italic: true, color: GREY_TEXT })
            ], { borders: noBorders, width: 5053, bg: WHITE }),
            cell([
              p("Contact", { bold: true, color: BLUE_MID, size: 20, after: 60 }),
              p("07 53 61 24 71", { size: 20, after: 40 }),
              p("nathan.imogo@outlook.fr", { size: 20, after: 40 }),
              p("www.ateliers360.fr", { size: 20, after: 40, color: BLUE_MID }),
              p("Esch-sur-Alzette, Luxembourg", { size: 20, color: GREY_TEXT })
            ], { borders: thinBorders, width: 5053, bg: BLUE_LIGHT })
          ]
        })]
      })

    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("/Users/nathanimogo/Dev/ateliers360/_core/platform-v2/docs/generate_docs/Presentation_Ateliers360_Luxembourg.docx", buf);
  console.log('Done');
});
