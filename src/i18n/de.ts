import { CategoryItem, MonthlySessionItem, RondoItem, UIStrings } from './types';
import { computeSquadSetup } from '../domain/squadCalculator';

export const CATEGORIES_DE: CategoryItem[] = [
  { id: 'all', name: 'Alle', color: 'bg-emerald-600', dot: 'bg-emerald-400' },
  { id: 'retention', name: 'Ballsicherung', color: 'bg-emerald-600', dot: 'bg-emerald-400' },
  { id: 'progression', name: 'Raumgewinn', color: 'bg-blue-600', dot: 'bg-blue-400' },
  { id: 'switch', name: 'Spielverlagerung', color: 'bg-amber-600', dot: 'bg-amber-400' },
  { id: 'defense', name: 'Pressing & 3. Mann', color: 'bg-rose-600', dot: 'bg-rose-400' },
  { id: 'transition', name: 'Umschalten', color: 'bg-purple-600', dot: 'bg-purple-400' }
];

export const RONDOS_DE: RondoItem[] = [
  // 1.1 RONDO 3v1
  {
    id: 'rondo-1',
    number: '1.1',
    title: '3-gegen-1-Rondo: Anspielwinkel & Passlinien',
    shortTitle: 'Anspielwinkel & Passlinien',
    category: 'retention',
    categoryName: 'Ballsicherung',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    format: '3 gegen 1 (4 Außenseiten)',
    playersCount: '4 Spieler (oder 3 Gruppen à 4)',
    dimensionsU15: {
      base: '9 × 9 m (2 Kontakte)',
      intensive: '8 × 8 m (1–2 Kontakte)'
    },
    timingU15: '4 Durchgänge × 1,5 Min. | Pause: 30 Sek.',
    problemInGame: 'Spieler bleiben nach dem Abspiel stehen, verstecken sich im Deckungsschatten des Verteidigers und lassen den Ballführenden ohne Anspielstationen allein.',
    attackGoal: 'Dem Ballführenden durch synchrones Nachrücken auf die freie vierte Quadratseite permanent zwei offene Passlinien (links und rechts im 45°-Winkel) anbieten.',
    defenseGoal: 'Im Bogenlauf anlaufen (Bogenpressing), mit dem eigenen Deckungsschatten einen Passweg zustellen und den Ballführenden in eine Ecke auf den schwachen Fuß lenken.',
    scoringRule: 'Angriff: 1 Punkt für je 8 flüssige Pässe im Rhythmus ohne Ballstoppen. Verteidigung: 1 Punkt für Ballgewinn oder erzwungenes Aus; 2 Punkte bei erzwungenem hohen Pass.',
    coachingCues: [
      'Passen und sofort anbieten — erkenne im Moment des Abspiels die freie Seite und sprinte dorthin!',
      'Ballmitnahme mit dem ballfernen Fuß in offener Spielstellung (Vororientierung zum Zentrum).',
      'Warte nicht, bis der Ball beim Mitspieler ankommt — starte deinen Freilaufimpuls im Moment der Ballabgabe.'
    ],
    progressions: [
      { level: 'Stufe 1 (Basis)', desc: '9×9 m Feld, Pflicht zu 2 Kontakten (Annahme ballferner Fuß + Pass).' },
      { level: 'Stufe 2 (Aufbau)', desc: 'Direkter Rückpass zum Passgeber verboten (Weiterspielen über den dritten Spieler mit Seitenrotation).' },
      { level: 'Stufe 3 (Maximalintensität)', desc: '8×8 m Feld, strikt 1–2 Kontakte, maximal 1,5 Sekunden Ballbesitz pro Spieler.' }
    ],
    diagram: {
      type: 'single_square',
      gridLabel: '9×9 m Quadrat (4 Hütchen)',
      cones: [
        { x: 100, y: 60 }, { x: 400, y: 60 },
        { x: 100, y: 340 }, { x: 400, y: 340 }
      ],
      phases: [
        {
          title: 'Phase 1: Ballannahme & zwei offene Passlinien schaffen',
          desc: 'Spieler A (oben) hat den Ball. Spieler B bietet sich links an, Spieler C unten. Die rechte Linie ist frei. Verteidiger D1 stellt den direkten Diagonalpass zu C mit seinem Deckungsschatten zu.',
          players: [
            { id: 'A', role: 'att', label: 'A', x: 250, y: 55 },
            { id: 'B', role: 'att', label: 'B', x: 95, y: 200 },
            { id: 'V', role: 'att', label: 'C', x: 250, y: 345 },
            { id: 'D1', role: 'def', label: 'D1', x: 220, y: 170 }
          ],
          ball: { x: 250, y: 72 },
          passes: [
            { from: { x: 250, y: 65 }, to: { x: 110, y: 195 }, label: 'Pass 1', primary: true }
          ],
          movements: [
            { from: { x: 220, y: 170 }, to: { x: 155, y: 185 }, role: 'def', label: 'Bogenlauf' },
            { from: { x: 250, y: 55 }, to: { x: 395, y: 180 }, role: 'att', label: 'Sprint auf freie Linie' }
          ],
          shadows: [
            { points: '220,170 210,340 290,340' }
          ]
        },
        {
          title: 'Phase 2: Synchrones Nachrücken auf die freie Linie',
          desc: 'Während der Ball zu B rollt, sprintet A auf die freie rechte Seite. Dadurch hat B sofort wieder zwei sichere Passoptionen: C unten und A rechts außen.',
          players: [
            { id: 'A', role: 'att', label: 'A', x: 405, y: 200 },
            { id: 'B', role: 'att', label: 'B', x: 95, y: 200 },
            { id: 'V', role: 'att', label: 'C', x: 250, y: 345 },
            { id: 'D1', role: 'def', label: 'D1', x: 155, y: 205 }
          ],
          ball: { x: 112, y: 200 },
          passes: [
            { from: { x: 105, y: 205 }, to: { x: 240, y: 335 }, label: 'Pass 2', primary: true },
            { from: { x: 105, y: 195 }, to: { x: 390, y: 200 }, label: 'Option 2', primary: false }
          ],
          movements: [
            { from: { x: 155, y: 205 }, to: { x: 230, y: 295 }, role: 'def', label: 'D1 schiebt nach' },
            { from: { x: 95, y: 200 }, to: { x: 245, y: 55 }, role: 'att', label: 'B rotiert nach oben' }
          ],
          shadows: [
            { points: '155,205 395,150 395,245' }
          ]
        },
        {
          title: 'Phase 3: Zyklusabschluss & neues Passdreieck',
          desc: 'Spieler C ist unten am Ball. Spieler B hat bereits die obere Linie besetzt und A ist rechts offen. Die Dreiecksgeometrie ist ohne Pause wiederhergestellt.',
          players: [
            { id: 'A', role: 'att', label: 'A', x: 405, y: 200 },
            { id: 'B', role: 'att', label: 'B', x: 250, y: 55 },
            { id: 'V', role: 'att', label: 'C', x: 250, y: 345 },
            { id: 'D1', role: 'def', label: 'D1', x: 245, y: 280 }
          ],
          ball: { x: 250, y: 328 },
          passes: [
            { from: { x: 255, y: 335 }, to: { x: 395, y: 210 }, label: 'Pass 3', primary: true },
            { from: { x: 250, y: 330 }, to: { x: 250, y: 70 }, label: 'Schnittstellenpass', primary: false }
          ],
          movements: [
            { from: { x: 250, y: 345 }, to: { x: 95, y: 200 }, role: 'att', label: 'Rotation nach links' }
          ],
          shadows: []
        }
      ]
    }
  },

  // 1.2 RONDO 5v2
  {
    id: 'rondo-2',
    number: '1.2',
    title: '5-gegen-2-Rondo: Anlocken & Schnittstellenpass',
    shortTitle: 'Anlocken & Schnittstellenpass',
    category: 'retention',
    categoryName: 'Ballsicherung',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    format: '5 gegen 2',
    playersCount: '7 Spieler',
    dimensionsU15: {
      base: '11 × 11 m (2 Kontakte)',
      intensive: '10 × 10 m (1 Kontakt)'
    },
    timingU15: '4 Durchgänge × 2 Min. | Pause: 40 Sek.',
    problemInGame: 'Die Ballbesitzspieler lassen den Ball nur sicher außen herum laufen und trauen sich nicht, den scharfen Schnittstellenpass zwischen zwei Verteidigern hindurch zu spielen.',
    attackGoal: 'Beide Verteidiger durch kurze Lockpässe in eine Feldhälfte ziehen und anschließend einen verdeckten Schnittstellenpass zwischen ihnen hindurch zum gegenüberliegenden Mitspieler spielen.',
    defenseGoal: 'Als gestaffeltes Paar verteidigen (der Erste läuft den Ball an, der Zweite sichert diagonal dahinter das Zentrum ab) und niemals flach auf einer Linie stehen.',
    scoringRule: 'Angriff: Außenpässe zählen 0 Punkte (dienen nur der Vorbereitung); 1 Punkt gibt es NUR für einen erfolgreichen Schnittstellenpass zwischen beiden Verteidigern. Verteidigung: 1 Punkt für Ballgewinn.',
    coachingCues: [
      'Der kurze Pass zum Nachbarn ist der Köder, um beide Verteidiger zusammenzuziehen (Anlocken, um zu überspielen).',
      'Ballferner Spieler: passe deinen Winkel ständig an, damit du im offenen Fenster zwischen beiden Verteidigern sichtbar bleibst!',
      'Verteidiger: haltet 3–4 Meter diagonale Tiefenstaffelung und schließt die Schnittstelle zwischen euch.'
    ],
    progressions: [
      { level: 'Stufe 1 (Basis)', desc: '11×11 m, 2 Kontakte, 1 Punkt für einen Schnittstellenpass ODER 10 Pässe in Folge.' },
      { level: 'Stufe 2 (Aufbau)', desc: 'Punkte zählen NUR für Schnittstellenpässe. Der Pass unmittelbar nach dem Schnittstellenpass muss im Direktspiel (1 Kontakt) erfolgen.' },
      { level: 'Stufe 3 (Maximalintensität)', desc: '10×10 m, strikt 1 Kontakt für alle. Wird ein Schnittstellenpass abgefangen, geht der Passgeber sofort in die Mitte.' }
    ],
    diagram: {
      type: 'single_square',
      gridLabel: '11×11 m Quadrat',
      cones: [
        { x: 100, y: 60 }, { x: 400, y: 60 },
        { x: 100, y: 340 }, { x: 400, y: 340 }
      ],
      phases: [
        {
          title: 'Phase 1: Verteidigerpaar durch Kurzpassspiel zusammenziehen',
          desc: 'Spieler 1 und 2 im linken oberen Eck spielen kurze Pässe und locken beide Verteidiger (D1 und D2) zum Ball.',
          players: [
            { id: 'P1', role: 'att', label: '1', x: 170, y: 55 },
            { id: 'P2', role: 'att', label: '2', x: 95, y: 150 },
            { id: 'P3', role: 'att', label: '3', x: 340, y: 55 },
            { id: 'P4', role: 'att', label: '4', x: 405, y: 210 },
            { id: 'P5', role: 'att', label: '5', x: 250, y: 345 },
            { id: 'D1', role: 'def', label: 'D1', x: 165, y: 115 },
            { id: 'D2', role: 'def', label: 'D2', x: 225, y: 165 }
          ],
          ball: { x: 170, y: 72 },
          passes: [
            { from: { x: 165, y: 65 }, to: { x: 108, y: 145 }, label: 'Kurzer Lockpass', primary: true }
          ],
          movements: [
            { from: { x: 165, y: 115 }, to: { x: 135, y: 145 }, role: 'def', label: 'D1 läuft an' },
            { from: { x: 225, y: 165 }, to: { x: 195, y: 135 }, role: 'def', label: 'D2 rückt raus' }
          ],
          shadows: []
        },
        {
          title: 'Phase 2: Scharfer Schnittstellenpass (+1 Punkt)',
          desc: 'D1 und D2 stehen auf einer flachen Linie. Spieler 2 spielt sofort einen scharfen Flachpass genau durch die Schnittstelle zum ballfernen Spieler 5!',
          players: [
            { id: 'P1', role: 'att', label: '1', x: 170, y: 55 },
            { id: 'P2', role: 'att', label: '2', x: 95, y: 150 },
            { id: 'P3', role: 'att', label: '3', x: 340, y: 55 },
            { id: 'P4', role: 'att', label: '4', x: 405, y: 210 },
            { id: 'P5', role: 'att', label: '5', x: 265, y: 345 },
            { id: 'D1', role: 'def', label: 'D1', x: 145, y: 175 },
            { id: 'D2', role: 'def', label: 'D2', x: 195, y: 130 }
          ],
          ball: { x: 112, y: 155 },
          passes: [
            { from: { x: 108, y: 155 }, to: { x: 260, y: 335 }, label: 'SCHNITTSTELLENPASS (+1)', primary: true }
          ],
          movements: [
            { from: { x: 250, y: 345 }, to: { x: 270, y: 345 }, role: 'att', label: 'In die Lücke zeigen' }
          ],
          shadows: [
            { points: '145,175 195,130 330,280 210,335' }
          ]
        },
        {
          title: 'Phase 3: Direktablage (1 Kontakt) in den freien Raum',
          desc: 'Spieler 5 lässt den Schnittstellenpass mit einem Kontakt auf den freien Spieler 4 rechts klatschen, während sich die Verteidiger noch drehen müssen.',
          players: [
            { id: 'P1', role: 'att', label: '1', x: 170, y: 55 },
            { id: 'P2', role: 'att', label: '2', x: 95, y: 180 },
            { id: 'P3', role: 'att', label: '3', x: 340, y: 55 },
            { id: 'P4', role: 'att', label: '4', x: 405, y: 210 },
            { id: 'P5', role: 'att', label: '5', x: 265, y: 345 },
            { id: 'D1', role: 'def', label: 'D1', x: 190, y: 240 },
            { id: 'D2', role: 'def', label: 'D2', x: 235, y: 215 }
          ],
          ball: { x: 265, y: 328 },
          passes: [
            { from: { x: 272, y: 335 }, to: { x: 395, y: 215 }, label: 'Direktablage (1 K.)', primary: true }
          ],
          movements: [
            { from: { x: 235, y: 215 }, to: { x: 330, y: 235 }, role: 'def', label: 'Nachschieben' }
          ],
          shadows: []
        }
      ]
    }
  },

  // 2.1 RONDO 7v3 (FLAGSHIP MODULE RONDO)
  {
    id: 'rondo-3',
    number: '2.1',
    title: '7-gegen-3-Rondo: Spielaufbau über den Sechser (#6)',
    shortTitle: 'Spielaufbau über Sechser (#6)',
    category: 'progression',
    categoryName: 'Raumgewinn & Zentrum',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    format: '6 Außenspieler + 1 zentraler Sechser (#6) gegen 3',
    playersCount: '10 Spieler',
    dimensionsU15: {
      base: '15 × 15 m (2 Kontakte)',
      intensive: '13 × 13 m (#6 mit 1 Kontakt)'
    },
    timingU15: '4 Durchgänge × 2,5 Min. | Pause: 45 Sek.',
    problemInGame: 'Im Spielaufbau trauen sich die Verteidiger unter Gegnerdruck nicht, den zentralen Sechser (#6) anzuspielen, und schlagen stattdessen unkontrollierte lange Bälle die Linie entlang.',
    attackGoal: 'Drei Wege ins Zentrum: Den zentralen Sechser (#6) finden, der aufdreht oder den Ball mit 1–2 Kontakten auf eine freie Außenlinie weiterleitet.',
    defenseGoal: 'Zwei Prioritäten: 1) Zentrum schließen (Passwege auf #6 durch den Deckungsschatten des zentralen Verteidigers blockieren); 2) im kompakten Pressingdreieck verschieben.',
    scoringRule: 'Angriff: 1 Punkt für jede Folge „Außenlinie → Sechser (#6) → neue Außenlinie“ (2 Punkte, wenn #6 mit 1 Kontakt auf die gegenüberliegende Seite verlagert). Verteidigung: 1 Punkt für Ballgewinn innerhalb von 6 Pässen.',
    coachingCues: [
      'Sechser (#6): Schulterblick VOR dem Abspiel! Löse dich ständig im Rücken der Verteidiger in offene Passfenster.',
      'Außenspieler: erzwingt kein Zuspiel auf #6, wenn ihm ein Verteidiger direkt im Rücken steht — verlagert erst kurz zur Seite, um die Lücke zu öffnen.',
      'Verteidiger: Einer läuft den Ballführenden an, der Zweite nimmt #6 in den Deckungsschatten, der Dritte sichert diagonal die ballnahe Seite.'
    ],
    progressions: [
      { level: 'Stufe 1 (Einheiten 1–2)', desc: '15×15 m. Fokus Angriff: über (#6) spielen und auflösen; Fokus Abwehr: Zentrum zustellen.' },
      { level: 'Stufe 2 (Einheiten 3–4)', desc: 'NUR Aktionen über (#6) zählen als Punkt; die 3 Verteidiger arbeiten als synchrones Pressingdreieck.' },
      { level: 'Stufe 3 (Einheiten 5–6)', desc: '13×13 m. Der Sechser (#6) spielt strikt mit 1 Kontakt; die Abwehr muss den Ball innerhalb von 6 Pässen erobern.' }
    ],
    diagram: {
      type: 'single_square',
      gridLabel: '15×15 m Feld (6 außen + #6 innen gegen 3)',
      cones: [
        { x: 90, y: 50 }, { x: 410, y: 50 },
        { x: 90, y: 350 }, { x: 410, y: 350 }
      ],
      phases: [
        {
          title: 'Phase 1: Pressing verschieben, um Passweg auf (#6) zu öffnen',
          desc: '6 Angreifer außen, Sechser (#6) im Zentrum. Das blaue Trio (D1, D2, D3) verdichtet die Mitte. Der Ball läuft unten von (#7) zu (#8), um das Passfenster zu (#6) zu öffnen.',
          players: [
            { id: 'A1', role: 'att', label: '2', x: 180, y: 45 },
            { id: 'A2', role: 'att', label: '3', x: 320, y: 45 },
            { id: 'A3', role: 'att', label: '4', x: 85, y: 200 },
            { id: 'A4', role: 'att', label: '5', x: 415, y: 200 },
            { id: 'A5', role: 'att', label: '7', x: 180, y: 355 },
            { id: 'A6', role: 'att', label: '8', x: 320, y: 355 },
            { id: 'N6', role: 'neutral', label: '6', x: 255, y: 205 },
            { id: 'D1', role: 'def', label: 'D1', x: 165, y: 255 },
            { id: 'D2', role: 'def', label: 'D2', x: 225, y: 235 },
            { id: 'D3', role: 'def', label: 'D3', x: 220, y: 155 }
          ],
          ball: { x: 180, y: 338 },
          passes: [
            { from: { x: 188, y: 345 }, to: { x: 310, y: 345 }, label: 'Pressing locken', primary: true }
          ],
          movements: [
            { from: { x: 255, y: 205 }, to: { x: 285, y: 215 }, role: 'neutral', label: '#6 löst sich aus Schatten' },
            { from: { x: 165, y: 255 }, to: { x: 265, y: 305 }, role: 'def', label: 'D1 schiebt zum Ball' }
          ],
          shadows: [
            { points: '225,235 235,175 280,190 270,250' }
          ]
        },
        {
          title: 'Phase 2: Vertikalpass auf den Sechser (#6) zwischen den Linien',
          desc: 'Spieler 8 erhält den Ball. Während D1 und D2 verschieben, zeigt sich #6 im offenen Fenster zwischen ihnen und nimmt den Ball halb-offen an.',
          players: [
            { id: 'A1', role: 'att', label: '2', x: 180, y: 45 },
            { id: 'A2', role: 'att', label: '3', x: 320, y: 45 },
            { id: 'A3', role: 'att', label: '4', x: 85, y: 200 },
            { id: 'A4', role: 'att', label: '5', x: 415, y: 200 },
            { id: 'A5', role: 'att', label: '7', x: 180, y: 355 },
            { id: 'A6', role: 'att', label: '8', x: 320, y: 355 },
            { id: 'N6', role: 'neutral', label: '6', x: 285, y: 215 },
            { id: 'D1', role: 'def', label: 'D1', x: 270, y: 300 },
            { id: 'D2', role: 'def', label: 'D2', x: 225, y: 240 },
            { id: 'D3', role: 'def', label: 'D3', x: 245, y: 160 }
          ],
          ball: { x: 320, y: 338 },
          passes: [
            { from: { x: 315, y: 335 }, to: { x: 288, y: 228 }, label: 'Zuspiel auf (6)', primary: true }
          ],
          movements: [
            { from: { x: 225, y: 240 }, to: { x: 270, y: 225 }, role: 'def', label: 'Druck auf (6)' }
          ],
          shadows: []
        },
        {
          title: 'Phase 3: Sechser (#6) verlagert auf die freie Linie (+1 Punkt)',
          desc: 'Dank Vororientierung (Schulterblick) leitet (#6) den Ball mit einem Kontakt nach oben zu (3) oder rechts auf (5) weiter — alle drei Verteidiger sind überspielt!',
          players: [
            { id: 'A1', role: 'att', label: '2', x: 180, y: 45 },
            { id: 'A2', role: 'att', label: '3', x: 320, y: 45 },
            { id: 'A3', role: 'att', label: '4', x: 85, y: 200 },
            { id: 'A4', role: 'att', label: '5', x: 415, y: 200 },
            { id: 'A5', role: 'att', label: '7', x: 180, y: 355 },
            { id: 'A6', role: 'att', label: '8', x: 320, y: 355 },
            { id: 'N6', role: 'neutral', label: '6', x: 285, y: 215 },
            { id: 'D1', role: 'def', label: 'D1', x: 285, y: 275 },
            { id: 'D2', role: 'def', label: 'D2', x: 255, y: 225 },
            { id: 'D3', role: 'def', label: 'D3', x: 245, y: 165 }
          ],
          ball: { x: 288, y: 202 },
          passes: [
            { from: { x: 288, y: 205 }, to: { x: 320, y: 60 }, label: 'Auflösen über (6) (+1)', primary: true },
            { from: { x: 295, y: 215 }, to: { x: 400, y: 200 }, label: 'Option außen', primary: false }
          ],
          movements: [],
          shadows: []
        }
      ]
    }
  },

  // 2.2 RONDO 8v4 + 2 NEUTRALS
  {
    id: 'rondo-4',
    number: '2.2',
    title: '8-gegen-4 + 2ZM Rondo: Linien überspielen über #6 & #8',
    shortTitle: 'Linien überspielen (#6 & #8)',
    category: 'progression',
    categoryName: 'Raumgewinn & Zentrum',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    format: '8 Außenspieler + 2 zentrale Mittelfeldspieler (#6 & #8) gegen 4',
    playersCount: '14 Spieler',
    dimensionsU15: {
      base: '22 × 16 m (2 Zonen à 11×16 m)',
      intensive: '20 × 14 m (2 Kontakte)'
    },
    timingU15: '3 Durchgänge × 3 Min. | Pause: 1 Min.',
    problemInGame: 'Sechser (#6) und Achter (#8) stehen im Spielaufbau auf derselben vertikalen oder horizontalen Linie und nehmen sich gegenseitig die Passwege.',
    attackGoal: 'Den Ball von einer Grundlinie (Innenverteidiger) zur gegenüberliegenden Grundlinie (Stürmer) durchspielen und dabei mindestens einen der diagonal gestaffelten Zentrumsspieler (#6 oder #8) einbinden.',
    defenseGoal: 'In zwei kompakten Paaren verteidigen (2 in Zone 1, 2 in Zone 2): das Zentrum verdichten und das Aufdrehen von #6 und #8 verhindern.',
    scoringRule: 'Angriff: 1 Punkt für das Überspielen von Grundlinie zu Grundlinie über einen Zentrumsspieler; 2 Punkte für die Kombination „Grundlinie → #6 → #8 → andere Grundlinie“. Verteidigung: 1 Punkt für Ballgewinn + Konterpass.',
    coachingCues: [
      'Sechser (#6) und Achter (#8) dürfen nie auf einer Linie stehen: kippt #6 tief nach links ab, schiebt #8 höher in den rechten Halbraum (diagonale Tiefenstaffelung)!',
      'Nutzt die Außenspieler in der Breite, um den Viererblock auseinanderzuziehen und vertikale Passfenster zu öffnen.'
    ],
    progressions: [
      { level: 'Stufe 1 (Basis)', desc: 'Die Verteidiger sind an ihre jeweilige Zone gebunden (2 links, 2 rechts).' },
      { level: 'Stufe 2 (Aufbau)', desc: 'Ein Verteidiger aus Zone 1 darf die Mittellinie überqueren, um im Zentrum ein 3-gegen-1-Überzahlpressing zu erzeugen.' },
      { level: 'Stufe 3 (Maximalintensität)', desc: 'Direkte Pässe vom Flügel zur Grundlinie sind verboten, sofern vorher kein zentraler Mittelfeldspieler (#6/#8) am Ball war.' }
    ],
    diagram: {
      type: 'double_zone',
      gridLabel: '22×16 m Doppelzonen-Feld',
      cones: [
        { x: 60, y: 60 }, { x: 250, y: 60 }, { x: 440, y: 60 },
        { x: 60, y: 340 }, { x: 250, y: 340 }, { x: 440, y: 340 }
      ],
      phases: [
        {
          title: 'Phase 1: Spieleröffnung & diagonale Staffelung (#6–#8)',
          desc: 'Der Ball startet bei den Innenverteidigern (CB) links. Im Zentrum besetzen die beiden gelben Mittelfeldspieler (#6 in Zone 1, #8 in Zone 2) diagonale Halbräume gegen zwei Verteidigerpaare.',
          players: [
            { id: 'CB1', role: 'att', label: 'CB', x: 55, y: 140 },
            { id: 'CB2', role: 'att', label: 'CB', x: 55, y: 260 },
            { id: 'W1', role: 'att', label: 'LB', x: 155, y: 55 },
            { id: 'W2', role: 'att', label: 'RB', x: 155, y: 345 },
            { id: 'W3', role: 'att', label: 'LW', x: 345, y: 55 },
            { id: 'W4', role: 'att', label: 'RW', x: 345, y: 345 },
            { id: 'CF1', role: 'att', label: 'CF', x: 445, y: 140 },
            { id: 'CF2', role: 'att', label: 'CF', x: 445, y: 260 },
            { id: 'N6', role: 'neutral', label: '6', x: 175, y: 225 },
            { id: 'N8', role: 'neutral', label: '8', x: 315, y: 155 },
            { id: 'D1', role: 'def', label: 'D1', x: 130, y: 155 },
            { id: 'D2', role: 'def', label: 'D2', x: 140, y: 255 },
            { id: 'D3', role: 'def', label: 'D3', x: 295, y: 195 },
            { id: 'D4', role: 'def', label: 'D4', x: 335, y: 255 }
          ],
          ball: { x: 72, y: 140 },
          passes: [
            { from: { x: 65, y: 140 }, to: { x: 150, y: 65 }, label: 'Breite nutzen', primary: true },
            { from: { x: 155, y: 65 }, to: { x: 175, y: 210 }, label: 'Pass in (6)', primary: true }
          ],
          movements: [
            { from: { x: 175, y: 225 }, to: { x: 185, y: 195 }, role: 'neutral', label: '#6 bietet sich an' }
          ],
          shadows: []
        },
        {
          title: 'Phase 2: Vertikale „6 → 8“-Verbindung zwischen den Linien',
          desc: 'Sechser (#6) nimmt den Ball vom Flügel halb-offen mit und spielt über die Mittellinie den Achter (#8) im Halbraum an, der direkt auf den Stürmer (CF) durchsteckt!',
          players: [
            { id: 'CB1', role: 'att', label: 'CB', x: 55, y: 140 },
            { id: 'CB2', role: 'att', label: 'CB', x: 55, y: 260 },
            { id: 'W1', role: 'att', label: 'LB', x: 155, y: 55 },
            { id: 'W2', role: 'att', label: 'RB', x: 155, y: 345 },
            { id: 'W3', role: 'att', label: 'LW', x: 345, y: 55 },
            { id: 'W4', role: 'att', label: 'RW', x: 345, y: 345 },
            { id: 'CF1', role: 'att', label: 'CF', x: 445, y: 140 },
            { id: 'CF2', role: 'att', label: 'CF', x: 445, y: 260 },
            { id: 'N6', role: 'neutral', label: '6', x: 185, y: 195 },
            { id: 'N8', role: 'neutral', label: '8', x: 315, y: 155 },
            { id: 'D1', role: 'def', label: 'D1', x: 155, y: 135 },
            { id: 'D2', role: 'def', label: 'D2', x: 165, y: 235 },
            { id: 'D3', role: 'def', label: 'D3', x: 285, y: 205 },
            { id: 'D4', role: 'def', label: 'D4', x: 335, y: 255 }
          ],
          ball: { x: 198, y: 192 },
          passes: [
            { from: { x: 195, y: 192 }, to: { x: 305, y: 158 }, label: 'Verbindung 6 → 8', primary: true },
            { from: { x: 325, y: 155 }, to: { x: 432, y: 255 }, label: 'Pass auf CF (+2 Pkt.)', primary: true }
          ],
          movements: [],
          shadows: []
        }
      ]
    }
  },

  // 3.1 RONDO 6v3 IN TWO GRIDS
  {
    id: 'rondo-5',
    number: '3.1',
    title: '6-gegen-3-Doppelfeld-Rondo: Überladen & Spielverlagerung',
    shortTitle: 'Überladen & Verlagern (6v3)',
    category: 'switch',
    categoryName: 'Spielverlagerung',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    format: '6 gegen 3 mit Spielverlagerung ins freie Nachbarfeld',
    playersCount: '9–12 Spieler',
    dimensionsU15: {
      base: '2 Felder à 12 × 12 m (gesamt 24 × 12 m)',
      intensive: '2 Felder à 11 × 11 m mit 2 m Mittelkorridor'
    },
    timingU15: '4 Durchgänge × 2,5 Min. | Pause: 45 Sek.',
    problemInGame: 'Die Mannschaft spielt sich auf einer engen Seite fest, auf der der Gegner bereits Überzahl hat, anstatt schnell auf die ballferne freie Seite zu verlagern.',
    attackGoal: 'Mindestens 4–5 schnelle Pässe in einem Feld spielen, um alle 3 Verteidiger zusammenzuziehen, und dann flach in das freie Nachbarfeld verlagern.',
    defenseGoal: 'Den Gegner im ersten Feld einschnüren und gleichzeitig die Passwege in das zweite Feld zustellen.',
    scoringRule: 'Angriff: 1 Punkt für jede erfolgreiche Spielverlagerung ins zweite Feld nach mindestens 4 Pässen und anschließender Ballsicherung. Verteidigung: 1 Punkt für das Abfangen der Verlagerung.',
    coachingCues: [
      'Ballferner Angreifer: antizipiere beim 3. Pass und löse dich frühzeitig in das zweite Feld, um Breite für die Verlagerung zu geben!',
      'Verlagert nicht schon mit dem ersten Pass ohne Gegnerdruck — zwingt das Verteidigertrio erst dazu, sich im ersten Feld zusammenzuziehen.'
    ],
    progressions: [
      { level: 'Stufe 1 (Basis)', desc: 'Die Verlagerung ist nach 4 Pässen auf jeden Spieler erlaubt, der in das zweite Feld einläuft.' },
      { level: 'Stufe 2 (Aufbau)', desc: 'Die Verlagerung darf NUR erfolgen, nachdem der zentrale Spieler im ersten Feld angespielt wurde.' },
      { level: 'Stufe 3 (Maximalintensität)', desc: 'Nur 2 Verteidiger rücken ins zweite Feld nach, während der 3. Verteidiger auf der Mittellinie bleibt, um den Rückpass abzufangen.' }
    ],
    diagram: {
      type: 'double_zone',
      gridLabel: 'Zwei 12×12 m Felder (24×12 m)',
      cones: [
        { x: 60, y: 60 }, { x: 250, y: 60 }, { x: 440, y: 60 },
        { x: 60, y: 340 }, { x: 250, y: 340 }, { x: 440, y: 340 }
      ],
      phases: [
        {
          title: 'Phase 1: Gegner im linken Feld binden (4 Pässe)',
          desc: 'Im linken Feld halten 6 Angreifer den Ball gegen 3 Verteidiger. Beim 4. Pass setzt sich der ballferne Spieler 6 frühzeitig in das freie rechte Feld ab.',
          players: [
            { id: 'A1', role: 'att', label: '1', x: 65, y: 120 },
            { id: 'A2', role: 'att', label: '2', x: 65, y: 280 },
            { id: 'A3', role: 'att', label: '3', x: 145, y: 55 },
            { id: 'A4', role: 'att', label: '4', x: 155, y: 345 },
            { id: 'A5', role: 'att', label: '5', x: 235, y: 160 },
            { id: 'A6', role: 'att', label: '6', x: 350, y: 270 },
            { id: 'D1', role: 'def', label: 'D1', x: 115, y: 160 },
            { id: 'D2', role: 'def', label: 'D2', x: 135, y: 245 },
            { id: 'D3', role: 'def', label: 'D3', x: 195, y: 190 }
          ],
          ball: { x: 155, y: 328 },
          passes: [
            { from: { x: 75, y: 275 }, to: { x: 148, y: 335 }, label: '4. Pass', primary: false },
            { from: { x: 162, y: 335 }, to: { x: 340, y: 272 }, label: 'VERLAGERUNG FELD 2 (+1)', primary: true }
          ],
          movements: [
            { from: { x: 145, y: 55 }, to: { x: 340, y: 70 }, role: 'att', label: 'Team schiebt nach' },
            { from: { x: 235, y: 160 }, to: { x: 425, y: 190 }, role: 'att', label: 'Breite besetzen' }
          ],
          shadows: []
        },
        {
          title: 'Phase 2: Neue Raumaufteilung im zweiten Feld',
          desc: 'Der Ball ist ins rechte Feld verlagert. Die Angreifer besetzen sofort die neuen Außenlinien, während die 3 Verteidiger hinterhersprinten müssen.',
          players: [
            { id: 'A1', role: 'att', label: '1', x: 260, y: 180 },
            { id: 'A2', role: 'att', label: '2', x: 330, y: 345 },
            { id: 'A3', role: 'att', label: '3', x: 340, y: 55 },
            { id: 'A4', role: 'att', label: '4', x: 435, y: 280 },
            { id: 'A5', role: 'att', label: '5', x: 435, y: 120 },
            { id: 'A6', role: 'att', label: '6', x: 350, y: 270 },
            { id: 'D1', role: 'def', label: 'D1', x: 235, y: 200 },
            { id: 'D2', role: 'def', label: 'D2', x: 275, y: 255 },
            { id: 'D3', role: 'def', label: 'D3', x: 305, y: 175 }
          ],
          ball: { x: 350, y: 255 },
          passes: [
            { from: { x: 355, y: 260 }, to: { x: 425, y: 130 }, label: 'Zirkulation in Zone 2', primary: true }
          ],
          movements: [],
          shadows: []
        }
      ]
    }
  },

  // 3.2 POSITIONAL RONDO 4v4 + 3 NEUTRALS
  {
    id: 'rondo-6',
    number: '3.2',
    title: '4v4 + 3N Positionsspiel-Rondo: Zonenverlagerung',
    shortTitle: '4v4+3N Positionsspiel',
    category: 'switch',
    categoryName: 'Spielverlagerung',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    format: '4 gegen 4 + 3 Neutrale (2 Wandspieler außen & 1 Sechser)',
    playersCount: '11 Spieler',
    dimensionsU15: {
      base: '24 × 16 m (geteilt durch gestrichelte Mittellinie)',
      intensive: '22 × 14 m (2 Kontakte)'
    },
    timingU15: '3 Durchgänge × 4 Min. | Pause: 1 Min.',
    problemInGame: 'Fehlender Transfer vom kleinen Rondo ins 11-gegen-11: Sobald Gleichzahl herrscht, verlieren die Spieler ihre Positionsstruktur (Raute + Breite + Sechser).',
    attackGoal: 'Die 7-gegen-4-Überzahl (durch 3 Neutrale) nutzen, um den Ball vom linken Wandspieler über den zentralen Sechser (#6) zum rechten Wandspieler zu verlagern.',
    defenseGoal: 'Nach Ballverlust sofort ins geordnete 4-gegen-7-Pressing umschalten, den zentralen Neutralen (#6) abschirmen und den Ball zurückerobern.',
    scoringRule: '1 Punkt für die Verlagerung von Wandspieler N1 zu Wandspieler N2; 2 Punkte, wenn die Verlagerung über den zentralen Sechser (#6) läuft. Bei Ballgewinn tauschen Blau und Rot sofort die Rollen!',
    coachingCues: [
      'Je zwei Ballbesitzspieler halten die Breite oben und unten in der linken sowie in der rechten Zone (nicht alle in einer Hälfte knäueln!).',
      'Der zentrale Neutrale (#6) bewegt sich auf der gestrichelten Mittellinie als Bindeglied zwischen beiden Hälften.'
    ],
    progressions: [
      { level: 'Stufe 1 (Basis)', desc: 'Die äußeren Wandspieler bewegen sich frei auf ihrer gesamten Stirnlinie (2 Kontakte).' },
      { level: 'Stufe 2 (Aufbau)', desc: 'Alle 3 Neutralen spielen strikt mit 1 Kontakt (Direktspiel).' },
      { level: 'Stufe 3 (Maximalintensität)', desc: 'Abschlussspiel des Monats (Einheit #8): Punkte zählen kumulativ für Pässe über (#6), Dritter-Mann-Kombinationen und Zonenverlagerungen.' }
    ],
    diagram: {
      type: 'double_zone',
      gridLabel: '24×16 m Feld mit gestrichelter Mittellinie',
      cones: [
        { x: 60, y: 60 }, { x: 250, y: 60 }, { x: 440, y: 60 },
        { x: 60, y: 340 }, { x: 250, y: 340 }, { x: 440, y: 340 }
      ],
      phases: [
        {
          title: 'Phase 1: Aufbau in der linken Hälfte & Einstieg über (#6)',
          desc: 'Rot (4 Spieler) kombiniert mit 3 gelben Neutralen (N1 links, #6 auf der Mittellinie, N2 rechts). Durch Ballzirkulation links öffnet sich der Passweg auf #6.',
          players: [
            { id: 'N1', role: 'neutral', label: 'N1', x: 55, y: 200 },
            { id: 'N6', role: 'neutral', label: '6', x: 250, y: 190 },
            { id: 'N2', role: 'neutral', label: 'N2', x: 445, y: 200 },
            { id: 'R1', role: 'att', label: 'R1', x: 150, y: 65 },
            { id: 'R2', role: 'att', label: 'R2', x: 155, y: 335 },
            { id: 'R3', role: 'att', label: 'R3', x: 345, y: 65 },
            { id: 'R4', role: 'att', label: 'R4', x: 345, y: 335 },
            { id: 'B1', role: 'def', label: 'B1', x: 125, y: 165 },
            { id: 'B2', role: 'def', label: 'B2', x: 165, y: 245 },
            { id: 'B3', role: 'def', label: 'B3', x: 225, y: 145 },
            { id: 'B4', role: 'def', label: 'B4', x: 310, y: 225 }
          ],
          ball: { x: 72, y: 200 },
          passes: [
            { from: { x: 65, y: 195 }, to: { x: 145, y: 75 }, label: 'Pass 1', primary: true },
            { from: { x: 155, y: 75 }, to: { x: 242, y: 182 }, label: 'Zuspiel auf (6)', primary: true }
          ],
          movements: [],
          shadows: []
        },
        {
          title: 'Phase 2: Verlagerung über (#6) in die rechte Zone auf Zielspieler N2',
          desc: 'Der zentrale Sechser (#6) dreht auf und verlagert in die rechte Hälfte auf R4, der sofort den rechten Wandspieler N2 bedient (+2 Punkte).',
          players: [
            { id: 'N1', role: 'neutral', label: 'N1', x: 55, y: 200 },
            { id: 'N6', role: 'neutral', label: '6', x: 250, y: 190 },
            { id: 'N2', role: 'neutral', label: 'N2', x: 445, y: 200 },
            { id: 'R1', role: 'att', label: 'R1', x: 150, y: 65 },
            { id: 'R2', role: 'att', label: 'R2', x: 155, y: 335 },
            { id: 'R3', role: 'att', label: 'R3', x: 345, y: 65 },
            { id: 'R4', role: 'att', label: 'R4', x: 345, y: 335 },
            { id: 'B1', role: 'def', label: 'B1', x: 165, y: 155 },
            { id: 'B2', role: 'def', label: 'B2', x: 205, y: 235 },
            { id: 'B3', role: 'def', label: 'B3', x: 265, y: 160 },
            { id: 'B4', role: 'def', label: 'B4', x: 335, y: 235 }
          ],
          ball: { x: 258, y: 195 },
          passes: [
            { from: { x: 258, y: 198 }, to: { x: 340, y: 325 }, label: 'Zonenwechsel', primary: true },
            { from: { x: 352, y: 325 }, to: { x: 435, y: 208 }, label: 'Zielspieler N2 (+2)', primary: true }
          ],
          movements: [],
          shadows: []
        }
      ]
    }
  },

  // 4.1 DEFENSIVE RONDO 6v3 (CORNER PRESSING TRAP)
  {
    id: 'rondo-7',
    number: '4.1',
    title: '6-gegen-3-Defensiv-Rondo: Pressingfalle im Eck',
    shortTitle: 'Pressingfalle im Eck (6v3)',
    category: 'defense',
    categoryName: 'Pressing & 3. Mann',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    format: '3 Verteidiger (Coaching-Hauptfokus) gegen 6',
    playersCount: '9 Spieler',
    dimensionsU15: {
      base: '14 × 14 m',
      intensive: '13 × 13 m'
    },
    timingU15: '4 Durchgänge × 2 Min. | Pause: 45 Sek.',
    problemInGame: 'Verteidiger laufen einzeln und unkoordiniert hinter dem Ball her, wodurch einfache Schnittstellenpässe offenbleiben.',
    attackGoal: 'Aus der Pressingfalle im Eck über eine schnelle Verlagerung oder ein Direktspiel-Dreieck befreien.',
    defenseGoal: 'HAUPTFOKUS AUF DAS VERTEIDIGERTRIO: Den Pass des Gegners gezielt in eine Feldecke lenken und die Pressingfalle synchron zuschnappen lassen (D1 läuft im Bogen aus dem Zentrum an, D2 & D3 stellen die beiden Nachbarlinien zu).',
    scoringRule: 'Gezählt werden die Punkte des VERTEIDIGERTRIOS: 2 Punkte für Balleroberung in einer Eck-Pressingfalle innerhalb von 6 Pässen; 1 Punkt bei erzwungenem Fehlpass ins Aus.',
    coachingCues: [
      'Erster Verteidiger (D1): nicht geradlinig anlaufen! Laufe im Bogen aus dem Zentrum an, um den Rückpass abzuschneiden und den Ball ins Eck zu zwingen.',
      'Zweiter & dritter Verteidiger (D2 & D3): schaut nicht nur auf den Ball — rückt im Flug des Balles eng auf die beiden nächsten Anspielstationen an den Linien vor!'
    ],
    progressions: [
      { level: 'Stufe 1 (Basis)', desc: 'Vier 2×2 m große Eck-Pressingzonen werden markiert: Ballgewinne dort zählen doppelt.' },
      { level: 'Stufe 2 (Aufbau)', desc: 'Die Verteidiger haben ein Limit von 6 Pässen, um den Ball zu erobern.' },
      { level: 'Stufe 3 (Maximalintensität)', desc: 'Nach Ballgewinn müssen die 3 Verteidiger 1 sicheren Pass untereinander im Feld spielen, um den Punkt zu sichern.' }
    ],
    diagram: {
      type: 'single_square',
      gridLabel: '14×14 m Quadrat (Fokus Eck-Pressingfalle)',
      cones: [
        { x: 90, y: 50 }, { x: 410, y: 50 },
        { x: 90, y: 350 }, { x: 410, y: 350 }
      ],
      phases: [
        {
          title: 'Phase 1: Pass gezielt in die Eck-Pressingfalle lenken',
          desc: 'Spieler 2 (oben) hat den Ball. Verteidiger D1 läuft im Bogen von rechts an, stellt die Verlagerung zu (3) zu und zwingt den Pass in die linke obere Ecke zu Spieler 1.',
          players: [
            { id: 'A1', role: 'att', label: '1', x: 95, y: 65 },
            { id: 'A2', role: 'att', label: '2', x: 240, y: 45 },
            { id: 'A3', role: 'att', label: '3', x: 395, y: 65 },
            { id: 'A4', role: 'att', label: '4', x: 85, y: 225 },
            { id: 'A5', role: 'att', label: '5', x: 415, y: 225 },
            { id: 'A6', role: 'att', label: '6', x: 250, y: 355 },
            { id: 'D1', role: 'def', label: 'D1', x: 255, y: 120 },
            { id: 'D2', role: 'def', label: 'D2', x: 145, y: 165 },
            { id: 'D3', role: 'def', label: 'D3', x: 215, y: 185 }
          ],
          ball: { x: 240, y: 62 },
          passes: [
            { from: { x: 230, y: 52 }, to: { x: 108, y: 62 }, label: 'Erzwungener Pass ins Eck', primary: true }
          ],
          movements: [
            { from: { x: 255, y: 120 }, to: { x: 235, y: 70 }, role: 'def', label: 'D1 Bogenlauf (Rechts zu)' },
            { from: { x: 145, y: 165 }, to: { x: 110, y: 95 }, role: 'def', label: 'D2 springt in die Falle' },
            { from: { x: 215, y: 185 }, to: { x: 125, y: 195 }, role: 'def', label: 'D3 schließt Linie' }
          ],
          shadows: [
            { points: '245,80 410,50 410,160' }
          ]
        },
        {
          title: 'Phase 2: Falle schnappt im Eck zu (+2 Punkte Abwehr)',
          desc: 'Spieler 1 ist im linken oberen Eck isoliert: D2 attackiert den Ball, D1 blockiert den Rückpass zu (2) und D3 stellt den Linienpass zu (4) zu!',
          players: [
            { id: 'A1', role: 'att', label: '1', x: 95, y: 65 },
            { id: 'A2', role: 'att', label: '2', x: 240, y: 45 },
            { id: 'A3', role: 'att', label: '3', x: 395, y: 65 },
            { id: 'A4', role: 'att', label: '4', x: 85, y: 225 },
            { id: 'A5', role: 'att', label: '5', x: 415, y: 225 },
            { id: 'A6', role: 'att', label: '6', x: 250, y: 355 },
            { id: 'D1', role: 'def', label: 'D1', x: 185, y: 70 },
            { id: 'D2', role: 'def', label: 'D2', x: 118, y: 95 },
            { id: 'D3', role: 'def', label: 'D3', x: 115, y: 175 }
          ],
          ball: { x: 105, y: 75 },
          passes: [],
          movements: [
            { from: { x: 118, y: 95 }, to: { x: 102, y: 72 }, role: 'def', label: 'BALLGEWINN IM ECK!' }
          ],
          shadows: [
            { points: '90,50 210,50 150,190 90,190' }
          ]
        }
      ]
    }
  },

  // 4.2 BARTOLINI "THIRD MAN" RONDO
  {
    id: 'rondo-8',
    number: '4.2',
    title: 'Bartolini-Rondo: Spiel über den Dritten Mann (Innenquadrat)',
    shortTitle: 'Bartolini „Dritter Mann“-Rondo',
    category: 'defense',
    categoryName: 'Pressing & 3. Mann',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    format: '7 Außenspieler + 1 Spieler im Innenquadrat gegen 3',
    playersCount: '11 Spieler',
    dimensionsU15: {
      base: 'Außenquadrat 16 × 16 m, Innenquadrat 5 × 5 m',
      intensive: 'Außen 14 × 14 m, Innen 4 × 4 m'
    },
    timingU15: '4 Durchgänge × 2,5 Min. | Pause: 45 Sek.',
    problemInGame: 'Wenn der direkte Passweg zu einem freien Mitspieler durch den Deckungsschatten blockiert ist, brechen Spieler den Angriff ab, statt ihn über eine „Steil-Klatsch“-Kombination (Dritter Mann) freizuspielen.',
    attackGoal: 'Den Spieler im Innenquadrat (oder auf der fernen Linie) bei zugestelltem direkten Passweg über das Muster „Pass A → B (schräg) → Direktablage (1 Kontakt) auf den Dritten Mann C“ anspielen.',
    defenseGoal: 'Einen kompakten Dreierblock rund um das 5×5 m Innenquadrat halten und entweder den ersten Vertikalpass oder die Direktablage abfangen.',
    scoringRule: 'Punkte zählen NUR für „Dritter-Mann“-Kombinationen, bei denen der zweite Spieler (B) mit 1 Kontakt auf den dritten Spieler (C) klatschen lässt, der für (A) im Deckungsschatten stand.',
    coachingCues: [
      'Der Dritte Mann (C) muss seine Auftaktbewegung ins offene Fenster starten, während der Ball noch von A zu B unterwegs ist!',
      'Passschärfe und Fußseite von A an B sind eine Botschaft: Pass auf den linken Fuß heißt Ablage nach links; auf den rechten Fuß heißt Ablage nach rechts.'
    ],
    progressions: [
      { level: 'Stufe 1 (Basis)', desc: 'Der zentrale Spieler im 5×5 m Innenquadrat agiert als „Zweiter Mann“ (lässt nach außen auf den Dritten Mann klatschen).' },
      { level: 'Stufe 2 (Aufbau)', desc: 'Der zentrale Spieler ist der „Dritte Mann“: Direkte Pässe von unten ins Innenquadrat sind verboten — das Anspiel muss über eine Direktablage vom Flügel erfolgen.' },
      { level: 'Stufe 3 (Maximalintensität)', desc: 'Jedes Anspiel in das Innenquadrat und heraus muss strikt mit 1 Kontakt gespielt werden.' }
    ],
    diagram: {
      type: 'concentric_square',
      gridLabel: '16×16 m Außenfeld + 5×5 m Innenquadrat (Bartolini)',
      cones: [
        { x: 80, y: 45 }, { x: 420, y: 45 },
        { x: 80, y: 355 }, { x: 420, y: 355 },
        { x: 195, y: 145 }, { x: 305, y: 145 },
        { x: 195, y: 255 }, { x: 305, y: 255 }
      ],
      phases: [
        {
          title: 'Phase 1: Direkter Weg zu (C) im Deckungsschatten — Pass auf (B)',
          desc: 'Spieler A (unten) möchte C im Innenquadrat anspielen, aber Verteidiger D1 blockiert die direkte Linie. A spielt einen scharfen Diagonalpass auf Außenspieler B!',
          players: [
            { id: 'PA', role: 'att', label: 'A', x: 250, y: 360 },
            { id: 'PB', role: 'att', label: 'B', x: 425, y: 250 },
            { id: 'PC', role: 'neutral', label: 'C', x: 250, y: 200 },
            { id: 'P4', role: 'att', label: '4', x: 75, y: 230 },
            { id: 'P5', role: 'att', label: '5', x: 165, y: 40 },
            { id: 'P6', role: 'att', label: '6', x: 335, y: 40 },
            { id: 'P7', role: 'att', label: '7', x: 425, y: 130 },
            { id: 'D1', role: 'def', label: 'D1', x: 250, y: 285 },
            { id: 'D2', role: 'def', label: 'D2', x: 185, y: 215 },
            { id: 'D3', role: 'def', label: 'D3', x: 305, y: 175 }
          ],
          ball: { x: 250, y: 342 },
          passes: [
            { from: { x: 260, y: 348 }, to: { x: 412, y: 255 }, label: '1. Pass A → B', primary: true }
          ],
          movements: [
            { from: { x: 250, y: 200 }, to: { x: 275, y: 215 }, role: 'neutral', label: 'C bietet sich für Ablage an' }
          ],
          shadows: [
            { points: '250,285 215,190 285,190' }
          ]
        },
        {
          title: 'Phase 2: Direktablage (1 Kontakt) auf den „Dritten Mann“ C (+1 Punkt)',
          desc: 'Spieler B lässt den Ball mit 1 Kontakt am Deckungsschatten vorbei direkt auf den „Dritten Mann“ C im Innenquadrat klatschen, der aufdreht und nach oben verlagert!',
          players: [
            { id: 'PA', role: 'att', label: 'A', x: 250, y: 360 },
            { id: 'PB', role: 'att', label: 'B', x: 425, y: 250 },
            { id: 'PC', role: 'neutral', label: 'C', x: 275, y: 215 },
            { id: 'P4', role: 'att', label: '4', x: 75, y: 230 },
            { id: 'P5', role: 'att', label: '5', x: 165, y: 40 },
            { id: 'P6', role: 'att', label: '6', x: 335, y: 40 },
            { id: 'P7', role: 'att', label: '7', x: 425, y: 130 },
            { id: 'D1', role: 'def', label: 'D1', x: 315, y: 275 },
            { id: 'D2', role: 'def', label: 'D2', x: 195, y: 215 },
            { id: 'D3', role: 'def', label: 'D3', x: 315, y: 175 }
          ],
          ball: { x: 408, y: 248 },
          passes: [
            { from: { x: 410, y: 248 }, to: { x: 285, y: 218 }, label: '2. Ablage B → C (1 K.)', primary: true },
            { from: { x: 275, y: 205 }, to: { x: 170, y: 55 }, label: '3. Ausstieg nach oben', primary: false }
          ],
          movements: [],
          shadows: []
        }
      ]
    }
  },

  // 5.1 TRANSITION RONDO 4v2 (+4 OUTSIDE): 3-SECOND COUNTER-PRESS
  {
    id: 'rondo-9',
    number: '5.1',
    title: '4v2 (+4 außen) Umschalt-Rondo: 3-Sekunden-Gegenpressing',
    shortTitle: '3-Sek.-Gegenpressing (4v2+4)',
    category: 'transition',
    categoryName: 'Umschalten & Gegenpressing',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    format: '4 gegen 2 im Innenquadrat + 4 Mitspieler der Verteidiger im Außenquadrat',
    playersCount: '10 Spieler (5 gegen 5)',
    dimensionsU15: {
      base: '10 × 10 m Innenquadrat in einem 22 × 22 m Außenquadrat',
      intensive: '9 × 9 m Innenquadrat in einem 20 × 20 m Außenquadrat'
    },
    timingU15: '4 Durchgänge × 2 Min. | Pause: 45 Sek.',
    problemInGame: 'Im Moment des Ballverlusts schalten Spieler zu langsam um, bleiben stehen oder weichen sofort zurück, sodass der Gegner ungestört kontern kann.',
    attackGoal: 'Im Innenquadrat 4 gegen 2 den Ball halten. BEI BALLVERLUST: Alle 4 Angreifer müssen innerhalb von 3 Sekunden ins kollektive Gegenpressing gehen und den Ball zurückerobern, bevor er ins Außenquadrat gespielt wird.',
    defenseGoal: 'Nach Ballgewinn müssen die 2 inneren Verteidiger den Ball mit 1–2 Kontakten auf einen ihrer 4 Mitspieler am Rand des 22×22 m Außenquadrats herausspielen.',
    scoringRule: 'Rot: 1 Punkt für 10 Pässe im Innenquadrat; 2 PUNKTE für die sofortige Rückeroberung im Gegenpressing innerhalb von 3 Sekunden! Blau: 1 Punkt für den Befreiungspass nach außen und anschließende Ballsicherung im 6 gegen 4.',
    coachingCues: [
      '3-Sekunden-Regel: Im Moment des Ballverlusts keinen Schritt zurück! Der Ballnächste jagt sofort den Ball, die anderen drei schließen das Netz rundherum.',
      'Innere Verteidiger (Blau): Orientiert euch per Schulterblick nach euren 4 Außenspielern, BEVOR ihr den Ball überhaupt erobert!'
    ],
    progressions: [
      { level: 'Stufe 1 (Basis)', desc: 'Die Sequenz endet, sobald Blau einen sauberen Pass ins Außenquadrat spielt (+1 Punkt für Blau).' },
      { level: 'Stufe 2 (Aufbau)', desc: 'Sobald Blau nach außen spielt, läuft das Spiel ohne Unterbrechung als 6-gegen-4-Rondo im großen 22×22 m Feld weiter.' },
      { level: 'Stufe 3 (Maximalintensität)', desc: 'Statt der 4 Außenspieler stehen 4 Minitore außen: Nach Ballgewinn hat Blau 3 Sekunden Zeit, auf eines der 4 Minitore abzuschließen.' }
    ],
    diagram: {
      type: 'concentric_square',
      gridLabel: '10×10 m Innenquadrat im 22×22 m Außenquadrat',
      cones: [
        { x: 70, y: 40 }, { x: 430, y: 40 },
        { x: 70, y: 360 }, { x: 430, y: 360 },
        { x: 170, y: 120 }, { x: 330, y: 120 },
        { x: 170, y: 280 }, { x: 330, y: 280 }
      ],
      phases: [
        {
          title: 'Phase 1: 4-gegen-2-Ballsicherung im Innenquadrat',
          desc: 'Im 10×10 m Innenquadrat lassen 4 Rote den Ball gegen 2 Blaue (B1, B2) laufen. Am 22×22 m Außenrand warten 4 blaue Mitspieler (B3–B6) auf den Befreiungspass.',
          players: [
            { id: 'R1', role: 'att', label: 'R1', x: 250, y: 118 },
            { id: 'R2', role: 'att', label: 'R2', x: 168, y: 200 },
            { id: 'R3', role: 'att', label: 'R3', x: 332, y: 200 },
            { id: 'R4', role: 'att', label: 'R4', x: 250, y: 282 },
            { id: 'B1', role: 'def', label: 'B1', x: 225, y: 175 },
            { id: 'B2', role: 'def', label: 'B2', x: 265, y: 225 },
            { id: 'B3', role: 'def', label: 'B3', x: 250, y: 42 },
            { id: 'B4', role: 'def', label: 'B4', x: 72, y: 200 },
            { id: 'B5', role: 'def', label: 'B5', x: 428, y: 200 },
            { id: 'B6', role: 'def', label: 'B6', x: 250, y: 358 }
          ],
          ball: { x: 250, y: 132 },
          passes: [
            { from: { x: 245, y: 128 }, to: { x: 225, y: 175 }, label: 'B1 fängt ab!', primary: true }
          ],
          movements: [],
          shadows: []
        },
        {
          title: 'Phase 2: Ballverlust — Explosives Gegenpressing (3 Sekunden!)',
          desc: 'Blau B1 fängt den Pass ab und sucht B3 oder B4. Alle 4 Roten ziehen sofort das Netz um B1 zusammen, um den Ball in unter 3 Sekunden zurückzuerobern (+2 Punkte)!',
          players: [
            { id: 'R1', role: 'att', label: 'R1', x: 245, y: 140 },
            { id: 'R2', role: 'att', label: 'R2', x: 190, y: 185 },
            { id: 'R3', role: 'att', label: 'R3', x: 295, y: 195 },
            { id: 'R4', role: 'att', label: 'R4', x: 245, y: 245 },
            { id: 'B1', role: 'def', label: 'B1', x: 230, y: 180 },
            { id: 'B2', role: 'def', label: 'B2', x: 270, y: 215 },
            { id: 'B3', role: 'def', label: 'B3', x: 250, y: 42 },
            { id: 'B4', role: 'def', label: 'B4', x: 72, y: 200 },
            { id: 'B5', role: 'def', label: 'B5', x: 428, y: 200 },
            { id: 'B6', role: 'def', label: 'B6', x: 250, y: 358 }
          ],
          ball: { x: 225, y: 175 },
          passes: [
            { from: { x: 220, y: 175 }, to: { x: 85, y: 198 }, label: 'Befreiungsversuch Blau', primary: false }
          ],
          movements: [
            { from: { x: 245, y: 140 }, to: { x: 232, y: 170 }, role: 'att', label: 'Gegenpressing!' },
            { from: { x: 190, y: 185 }, to: { x: 218, y: 180 }, role: 'att', label: 'Druck auf Ball' },
            { from: { x: 245, y: 245 }, to: { x: 235, y: 195 }, role: 'att', label: 'Netz schließen!' }
          ],
          shadows: [
            { points: '190,140 285,140 285,235 190,235' }
          ]
        }
      ]
    }
  },

  // 5.2 TWO-ZONE TRANSITION RONDO 5v3 -> 5v3
  {
    id: 'rondo-10',
    number: '5.2',
    title: '5-gegen-3-Doppelzonen-Rondo: Aus der Druckzone befreien',
    shortTitle: 'Aus Druckzone lösen (5v3)',
    category: 'transition',
    categoryName: 'Umschalten & Gegenpressing',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    format: '5 gegen 3 in Zone 1 (+2 wartende Mitspieler in Zone 2)',
    playersCount: '10 Spieler (5 Rot gegen 5 Blau)',
    dimensionsU15: {
      base: '2 angrenzende Felder à 14 × 14 m (28 × 14 m)',
      intensive: '2 angrenzende Felder à 12 × 12 m (24 × 12 m)'
    },
    timingU15: '4 Durchgänge × 2,5 Min. | Pause: 1 Min.',
    problemInGame: 'Nach Ballgewinn spielt die Mannschaft den ersten Pass innerhalb derselben engen Druckzone und verliert den Ball sofort wieder gegen das gegnerische Gegenpressing.',
    attackGoal: 'Im 5-gegen-3-Ballbesitz 8 Pässe für 1 Punkt spielen. Bei Ballverlust verhindern, dass die 3 Verteidiger auf ihre 2 wartenden Mitspieler im Nachbarfeld eröffnen.',
    defenseGoal: 'FOKUS BALLFERNE BEFREIUNG AUS DER DRUCKZONE: Sobald das Trio den Ball erobert, mit dem 1. oder 2. Kontakt in das zweite Feld auf die 2 freien Zielspieler eröffnen und nachrücken, um dort ein neues 5-gegen-3 aufzubauen!',
    scoringRule: '1 Punkt für je 8 Pässe in einer Zone; 2 Punkte für Balleroberung, sofortigen Befreiungspass in die zweite Zone und dortige Ballsicherung (5 Pässe im neuen Feld).',
    coachingCues: [
      'Goldene Regel nach Ballgewinn: Raus aus der engen Druckzone, in der der Ball erobert wurde — sofort in den freien Raum verlagern!',
      'Die 2 wartenden Zielspieler in Zone 2: bewegt euch ständig an der Mittellinie in offene Passfenster zwischen den roten Gegenspielern.'
    ],
    progressions: [
      { level: 'Stufe 1 (Basis)', desc: 'Der Befreiungspass in die zweite Zone darf mit dem 1. oder 2. Pass nach Ballgewinn erfolgen.' },
      { level: 'Stufe 2 (Aufbau)', desc: 'Der Ausstieg in Zone 2 muss zwingend mit dem ERSTEN Pass nach Ballgewinn gespielt werden (oder per Direktablage über den Zielspieler).' },
      { level: 'Stufe 3 (Maximalintensität)', desc: 'Alle 5 Spieler dürfen nach Ballverlust 4 Sekunden lang gegenpressen; sobald der Ball die Mittellinie überquert, rücken nur 3 ins neue Feld nach.' }
    ],
    diagram: {
      type: 'double_zone',
      gridLabel: 'Zwei 14×14 m Felder (Umschalten 5v3 → 5v3)',
      cones: [
        { x: 60, y: 60 }, { x: 250, y: 60 }, { x: 440, y: 60 },
        { x: 60, y: 340 }, { x: 250, y: 340 }, { x: 440, y: 340 }
      ],
      phases: [
        {
          title: 'Phase 1: Ballgewinn des blauen Trios im linken Feld',
          desc: 'Im linken Feld halten 5 Rote den Ball gegen 3 Blaue (B1, B2, B3). Im rechten Feld warten B4 und B5. Blau B2 fängt einen Pass ab!',
          players: [
            { id: 'R1', role: 'att', label: 'R1', x: 70, y: 120 },
            { id: 'R2', role: 'att', label: 'R2', x: 70, y: 280 },
            { id: 'R3', role: 'att', label: 'R3', x: 155, y: 65 },
            { id: 'R4', role: 'att', label: 'R4', x: 155, y: 335 },
            { id: 'R5', role: 'att', label: 'R5', x: 230, y: 200 },
            { id: 'B1', role: 'def', label: 'B1', x: 125, y: 155 },
            { id: 'B2', role: 'def', label: 'B2', x: 165, y: 235 },
            { id: 'B3', role: 'def', label: 'B3', x: 195, y: 145 },
            { id: 'B4', role: 'def', label: 'B4', x: 325, y: 135 },
            { id: 'B5', role: 'def', label: 'B5', x: 325, y: 265 }
          ],
          ball: { x: 175, y: 232 },
          passes: [
            { from: { x: 175, y: 235 }, to: { x: 315, y: 262 }, label: '1. Pass raus aus Druck!', primary: true }
          ],
          movements: [
            { from: { x: 125, y: 155 }, to: { x: 285, y: 80 }, role: 'def', label: 'Blau sprintet in Zone 2' },
            { from: { x: 195, y: 145 }, to: { x: 410, y: 195 }, role: 'def', label: 'Breite geben' }
          ],
          shadows: []
        },
        {
          title: 'Phase 2: Neues 5-gegen-3 für Blau im rechten Feld',
          desc: 'Der Ball ist im rechten Feld bei B5. Das Trio B1–B3 rückt nach und bildet ein neues 5-gegen-3 für Blau, während 3 Rote (R3, R4, R5) ins Pressing nachschieben!',
          players: [
            { id: 'R1', role: 'att', label: 'R1', x: 145, y: 145 },
            { id: 'R2', role: 'att', label: 'R2', x: 145, y: 255 },
            { id: 'R3', role: 'att', label: 'R3', x: 315, y: 165 },
            { id: 'R4', role: 'att', label: 'R4', x: 335, y: 245 },
            { id: 'R5', role: 'att', label: 'R5', x: 285, y: 210 },
            { id: 'B1', role: 'def', label: 'B1', x: 340, y: 65 },
            { id: 'B2', role: 'def', label: 'B2', x: 265, y: 200 },
            { id: 'B3', role: 'def', label: 'B3', x: 430, y: 200 },
            { id: 'B4', role: 'def', label: 'B4', x: 345, y: 120 },
            { id: 'B5', role: 'def', label: 'B5', x: 345, y: 335 }
          ],
          ball: { x: 345, y: 320 },
          passes: [
            { from: { x: 352, y: 325 }, to: { x: 422, y: 208 }, label: 'Ballsicherung 5v3 (+2)', primary: true }
          ],
          movements: [],
          shadows: []
        }
      ]
    }
  }
];

export const generateMonthlyPlanDe = (
  rondo: RondoItem,
  ageVariant?: { baseGrid: string; intensiveGrid: string; timing: string }
): MonthlySessionItem[] => {
  const baseGrid = ageVariant?.baseGrid || rondo.dimensionsU15.base;
  const intensiveGrid = ageVariant?.intensiveGrid || rondo.dimensionsU15.intensive;
  const baseTiming = ageVariant?.timing || rondo.timingU15;

  return [
    {
      session: 1,
      week: 'Woche 1 (Dienstag)',
      stage: 'Stufe 1 • Basis',
      stageBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      focusSide: 'Angriff',
      goal: rondo.id === 'rondo-3'
        ? 'Den zentralen Sechser (#6) anspielen und auf eine freie Außenlinie auflösen'
        : rondo.attackGoal.split('.')[0],
      conditions: `${baseGrid}. Kontaktbegrenzung: 2–3 Kontakte. Noch kein Punktabzug — Fokus auf offene Spielstellung (Vororientierung) und frühe Anspielwinkel vor der Ballannahme.`,
      loadU15: baseTiming
    },
    {
      session: 2,
      week: 'Woche 1 (Donnerstag)',
      stage: 'Stufe 1 • Basis',
      stageBadge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      focusSide: 'Pressing & Abwehr',
      goal: rondo.id === 'rondo-3'
        ? 'Verteidiger: Zentrum schließen (Sechser #6 im Deckungsschatten halten)'
        : rondo.defenseGoal.split('.')[0],
      conditions: `${baseGrid}. Der Trainer nutzt „Freeze“-Coaching, sobald die Verteidiger flach auf einer Linie stehen und die Schnittstelle öffnen.`,
      loadU15: baseTiming
    },
    {
      session: 3,
      week: 'Woche 2 (Dienstag)',
      stage: 'Stufe 2 • Aufbau',
      stageBadge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      focusSide: 'Ziel-Wertung Angriff',
      goal: rondo.id === 'rondo-3'
        ? 'NUR Sequenzen über den zentralen Sechser (#6) zählen als Punkt'
        : rondo.scoringRule.split('.')[0],
      conditions: `${baseGrid}, strikt 2 Kontakte. Reine Außenzirkulation bringt 0 Punkte — Punkte gibt es ausschließlich für das taktische Kernprinzip.`,
      loadU15: baseTiming
    },
    {
      session: 4,
      week: 'Woche 2 (Donnerstag)',
      stage: 'Stufe 2 • Aufbau',
      stageBadge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      focusSide: 'Kollektives Pressing',
      goal: rondo.id === 'rondo-3'
        ? 'Verteidiger: Als geschlossene Einheit pressen (1 läuft an, 2 schließen Passwege & #6)'
        : 'Synchrones Pressing-Signal bei geschlossenem Körper oder unsauberem ersten Kontakt',
      conditions: `Doppelte Punktwertung aktiv: Sowohl Angreifer als auch Verteidiger sammeln Punkte. Wechsel der Verteidigergruppe alle 1,5–2 Minuten für maximale Intensität.`,
      loadU15: baseTiming
    },
    {
      session: 5,
      week: 'Woche 3 (Dienstag)',
      stage: 'Stufe 3 • Tempo',
      stageBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      focusSide: 'Handlungsschnelligkeit',
      goal: rondo.id === 'rondo-3'
        ? 'Zentraler Sechser (#6) agiert handlungsschnell (strikt 1 Kontakt)'
        : rondo.progressions[2].desc,
      conditions: `Feld verengt auf ${intensiveGrid}. Zentrumsspieler mit 1 Kontakt, Außenspieler 1–2 Kontakte.`,
      loadU15: baseTiming
    },
    {
      session: 6,
      week: 'Woche 3 (Donnerstag)',
      stage: 'Stufe 3 • Wettkampf',
      stageBadge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      focusSide: 'Wettkampfdruck',
      goal: rondo.id === 'rondo-3'
        ? 'Verteidiger: Ballgewinn oder erzwungener Fehler innerhalb von 6 Pässen'
        : '6-Pässe-Limit für die Abwehr + Wettkampf-Konsequenz für das Verliererteam',
      conditions: `Die Technik sitzt — jetzt folgt der Wettkampfmodus (kurzer Antritt/Reaktionssprint für die unterlegene Gruppe). Ballgewinn unter 6 Pässen bringt +2 Punkte für die Abwehr.`,
      loadU15: baseTiming
    },
    {
      session: 7,
      week: 'Woche 4 (Dienstag)',
      stage: 'Nächste Stufe • 3. Mann',
      stageBadge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      focusSide: 'Positionsspiel-Brücke',
      goal: 'Übergang ins Bartolini-Rondo „Dritter Mann“ (A → B Direktablage → C)',
      conditions: '16×16 m Außenfeld mit 5×5 m Innenquadrat. Ist der direkte Passweg verstellt, wird der Zielspieler über eine 1-Kontakt-Ablage (Steil-Klatsch) freigespielt.',
      loadU15: '4 Durchgänge × 2,5 Min. | Pause: 45 Sek.'
    },
    {
      session: 8,
      week: 'Woche 4 (Donnerstag)',
      stage: 'Nächste Stufe • Transfer',
      stageBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      focusSide: '4v4+3 Spiel',
      goal: 'Positionsspiel 4 gegen 4 + 3 Neutrale (Synthese aller Monatsziele)',
      conditions: '24×16 m Feld mit gestrichelter Mittellinie. Punkte addieren sich für jedes gelernte Monatsprinzip: Pass über (#6), Dritter Mann, Zonenverlagerung und 3-Sek.-Gegenpressing.',
      loadU15: '3 Durchgänge × 4 Min. | Pause: 1 Min.'
    }
  ];
};

export const getSquadOrganizationAdviceDe = (count: number, rondo: RondoItem): string => {
  const setup = computeSquadSetup(count, rondo.id);
  switch (setup.type) {
    case 'rondo_1_parallel_squares':
      return `Bei ${setup.playersCount} Spielern: ${setup.squares} parallele 3-gegen-1-Felder (9×9 m) aufbauen. Die übrigen (${setup.rotatingDefenders} Spieler) rotieren alle 60 Sek. als frische Verteidiger ein.`;
    case 'rondo_2_dual_grids':
      return `Bei ${setup.playersCount} Spielern: 2 parallele 5-gegen-2-Felder (11×11 m) — alle Spieler sind gleichzeitig ohne Standzeiten aktiv!`;
    case 'rondo_2_single_with_neutrals':
      return `Bei ${setup.playersCount} Spielern: 1 Hauptfeld 5-gegen-2 + übrige Spieler als rotierende Außenspieler.`;
    case 'rondo_3_dual_grids':
      return `Bei ${setup.playersCount} Spielern: 2 Felder parallel aufbauen (einmal 7 gegen 3 und einmal 6 gegen 2 mit Sechser #6).`;
    case 'rondo_3_single_with_pressing_unit':
      return `Bei ${setup.playersCount} Spielern: 1 Hauptfeld 7 gegen 3 (10 Spieler) + eine zweite Pressinggruppe (${setup.extraPressers} Spieler), die alle 75 Sekunden mit maximaler Frische einrotiert.`;
    default:
      return `Bei ${setup.playersCount} Spielern: Kader in die Hauptgruppe (${rondo.playersCount}) plus ein rotierendes Pressing-Trio aufteilen (Wechsel alle 90 Sek. für konstante 85 % HFmax).`;
  }
};

export const UI_DE: UIStrings = {
  header: {
    moduleBadge: 'Modul 01 • Taktischer Leitfaden',
    ageBadge: 'U15 (14–15 J.)',
    title: 'Anatomie des Rondos: Taktik-Playbook & Monatsplan',
    langToggleTitle: 'Sprache wählen (EN / DE / RU)',
    roleSwitcherLabel: 'Ansicht:',
    roles: {
      coach: 'Trainer',
      players: 'Spieler',
      parents: 'Eltern'
    },
    roleDescriptions: {
      coach: 'UEFA-Pro-Trainermodus: Detaillierte Coaching-Punkte, altersspezifische Belastungssteuerung, 8-Einheiten-Periodisierung und Platz-Timer mit Pfeife.',
      players: 'Spielermodus: Schritt-für-Schritt-Phasenanimationen, Mikro-Prinzipien (Schulterblick & offene Stellung) und klare Punkteregeln.',
      parents: 'Eltern-Überblick: Transparente Erklärung der Monatsziele, des Aufbaus einer 90-Minuten-Einheit und der Wachstumssteuerung (PHV).'
    }
  },
  nav: {
    catalog: 'Rondos',
    catalogShort: 'Rondos',
    monthly: 'Monatsplan',
    monthlyShort: 'Plan',
    methodology: 'Methodik',
    methodologyShort: 'Methodik',
    timer: 'Timer',
    timerShort: 'Timer',
    printCard: 'Druckkarte',
    printCardShort: 'Druck',
    printCardTooltip: 'Trainingskarte drucken oder als PDF speichern'
  },
  catalog: {
    filterTitle: 'Praxis: 10 Rondos für 5 taktische Spielprinzipien',
    filterSubtitle: 'Wähle ein taktisches Schwerpunktziel oder ein konkretes Rondo — die interaktive Taktiktafel zeigt alle Phasen, Laufwege und Deckungsschatten',
    numberPrefix: '#',
    metersSuffix: 'm',
    exerciseLabel: 'Übungsform',
    openMonthlyPlanBtn: 'Monatsplan',
    stepByStepTitle: 'Schritt-für-Schritt-Phasenanimation:',
    phaseLabel: 'Phase',
    prevPhase: 'Vorherige Phase',
    nextPhase: 'Nächste Phase',
    fullscreenEnter: 'Vollbild-Tafel',
    fullscreenExit: 'Vollbild beenden',
    boardLayersLabel: 'Ebenen der Taktiktafel:',
    layerPassesOn: '✓ Passwege',
    layerPassesOff: '× Passwege',
    layerMovementsOn: '✓ Freilauf- & Pressingwege',
    layerMovementsOff: '× Freilauf- & Pressingwege',
    layerShadowsOn: '✓ Deckungsschatten / Pressingfallen',
    layerShadowsOff: '× Deckungsschatten / Pressingfallen',
    legendPossession: 'Ballbesitz',
    legendDefenders: 'Verteidiger',
    legendNeutral: 'Sechser (6) / Neutral',
    squadCalcTitle: 'Feldaufbau nach Kaderstärke:',
    playersTodayLabel: 'Spieler heute:',
    playersUnit: 'Sp.',
    pitchSizeLabel: 'Feldgröße',
    intensivePrefix: 'Intensiv:',
    dosageLabel: 'Belastung',
    formatPrefix: 'Format:',
    problemTitle: 'Spielproblem → Warum wir dieses Rondo trainieren',
    conditionsAndGoalsTitle: 'Regeln & Coaching-Ziele für beide Teams',
    attackGoalTitle: 'Mit Ball (Ballbesitz)',
    defenseGoalTitle: 'Gegen den Ball (Pressing)',
    scoringRuleTitle: 'Punktesystem (Lernziel → Wertung)',
    progressionsTitle: '3 Methodische Progressionsstufen (Basis bis Maximalintensität)',
    coachingCuesTitle: 'Coaching-Kommandos:'
  },
  monthly: {
    matrixBadge: '4 Wochen • 8 Einheiten',
    planTitlePrefix: 'Monatsplan:',
    planSubtitle: 'Methodischer Aufbau: Die Einheiten 1–6 wechseln den Fokus zwischen Ballbesitz und Pressing über 3 Komplexitätsstufen; die Einheiten 7–8 übertragen das Prinzip in das Spiel über den Dritten Mann und das 4v4+3-Positionsspiel.',
    selectRondoLabel: 'Schwerpunkt-Rondo des Monats wählen:',
    progressPrefix: 'Zyklus-Fortschritt:',
    progressMiddle: 'von',
    progressSuffix: 'Einheiten abgeschlossen',
    progressHint: 'Klicke auf eine Trainingskarte, um sie als erledigt zu markieren',
    sessionLabel: 'Einheit',
    loadPrefix: '',
    completedBadge: 'Absolviert',
    markCompletedBtn: 'Abhaken',
    sessionStructureTitle: 'Aufbau einer 90-Minuten-Einheit',
    sessionBlocks: [
      {
        step: '1. Aktivierung (15 Min.)',
        title: 'Technik + Offene Stellung',
        desc: 'Ballgewöhnung und Passformen zu dritt mit Fokus auf Schulterblick (Vororientierung) und Mitnahme mit dem ballfernen Fuß.',
        accentColor: 'text-slate-400'
      },
      {
        step: '2. RONDO (15–18 Min.)',
        title: 'Brücke zum Tagesthema',
        desc: '4 Durchgänge × 2–2,5 Min. Hohe kognitive und neuromuskuläre Dichte. Verankert das taktische Leitprinzip der Einheit.',
        highlighted: true,
        accentColor: 'text-emerald-400'
      },
      {
        step: '3. Positionsspiel (25 Min.)',
        title: '4v4+3 / 6v6+2',
        desc: 'Übertragung der Rondo-Regel auf ein größeres, gerichtetes Feld mit festen Positionsrollen.',
        accentColor: 'text-blue-400'
      },
      {
        step: '4. Abschlussspiel (30 Min.)',
        title: '8 gegen 8 / 11 gegen 11',
        desc: 'Spiel auf Tore mit Bonuspunkten für die Umsetzung des im Rondo trainierten taktischen Prinzips.',
        accentColor: 'text-amber-400'
      }
    ]
  },
  methodology: {
    tabAll: 'Alle',
    tabPrinciples: 'Prinzipien',
    tabGeometry: 'Geometrie',
    tabInterventions: 'Freeze-Coaching',
    tabCheatSheet: 'Master-Tabelle',
    cards: [
      {
        title: '1. Mikro-Prinzipien („La-Masia-Schule“)',
        icon: 'eye',
        iconBg: 'bg-emerald-500/20 text-emerald-400',
        bullets: [
          {
            title: 'Entscheidung VOR der Annahme (Schulterblick):',
            text: 'Fordere vor jedem ersten Kontakt mindestens 1–2 Schulterblicke (Vororientierung), bevor der Ball den Fuß berührt.',
            accentColor: 'text-emerald-400'
          },
          {
            title: 'Offene Spielstellung (Perfilación):',
            text: 'Ballannahme konsequent mit dem ballfernen Fuß in halb-offener Stellung zum Feldzentrum. Kein Totstoppen mit der Sohle mit dem Rücken zum Spielfeld!',
            accentColor: 'text-emerald-400'
          },
          {
            title: 'Zwei sichere Winkel + Tiefe:',
            text: 'Die Mitspieler ohne Ball müssen dem Ballführenden permanent 2 breite Anspielwinkel (45°) sowie 1 zentrale Option in der Tiefe anbieten.',
            accentColor: 'text-emerald-400'
          }
        ]
      },
      {
        title: '2. System „Lernziel → Punktwertung → Wettkampf“',
        icon: 'award',
        iconBg: 'bg-blue-500/20 text-blue-400',
        bullets: [
          {
            title: 'LERNZIEL (Für beide Teams gleichzeitig):',
            text: 'Lass die Verteidiger niemals sinnlos hinterherlaufen („Schweinchen in der Mitte“). Sucht der Angriff den Sechser (#6), lernt die Abwehr, das Zentrum mit dem Deckungsschatten zu schließen.',
            accentColor: 'text-blue-400'
          },
          {
            title: 'PUNKTWERTUNG (Mut belohnen statt Sicherheitspässe):',
            text: 'Wenn nur 20 Pässe in Folge belohnt werden, spielen die Spieler mutlos außen herum. Vergib Punkte NUR für den taktischen Zielpass (über #6, Schnittstellenpass, Dritter Mann).',
            accentColor: 'text-amber-400'
          },
          {
            title: 'WETTKAMPF (Erst nach sicherer Technik):',
            text: 'Setze Wettkampf-Konsequenzen erst in den Einheiten 5–6 ein, wenn der Ablauf sitzt. Kurze, explosive Antritte statt Strafübungen.',
            accentColor: 'text-purple-400'
          }
        ]
      },
      {
        title: '3. Sportphysiologie & Belastungssteuerung',
        icon: 'zap',
        iconBg: 'bg-amber-500/20 text-amber-400',
        bullets: [
          {
            title: 'Wachstumsschub (PHV) & Relativfläche:',
            text: 'Passe die Fläche pro Spieler (m²/Spieler) an das biologische Alter an: Größere Felder in der U10–U14 für saubere Technik, verengte Räume ab U16/Pro für maximalen Zeitdruck.',
            accentColor: 'text-amber-400'
          },
          {
            title: 'Knackige Intervalle (1,5–2,5 Min. Durchgänge):',
            text: 'Ein endloses 12-Minuten-Rondo zerstört die Pressing-Intensität. Steuere präzise Sätze bei 85–90 % HFmax mit 30–45 Sek. Coaching-Pause.',
            accentColor: 'text-amber-400'
          },
          {
            title: 'Positionsspezifische Besetzung:',
            text: 'Positioniere im 7v3 und 4v4+3 deine echten zentralen Mittelfeldspieler (#6, #8, #10) im Zentrum und deine Außenverteidiger/Flügelspieler auf den Außenlinien.',
            accentColor: 'text-amber-400'
          }
        ]
      }
    ],
    geometrySectionTitle: 'Interaktive Spielgeometrie: Offene Stellung, Winkel & Deckungsschatten',
    geometrySectionSubtitle: 'Schalte jedes Diagramm zwischen dem typischen Fehlerbild und der korrekten taktischen Lösung um, um Mikro-Details direkt auf der Tafel zu zeigen.',
    geometryModeMistakeBtn: '✗ Typisches Fehlerbild',
    geometryModeSolutionBtn: '✓ Taktische Ideallösung',
    geometryCueLabel: 'Trainer-Kommando:',
    geometryConcepts: [
      {
        id: 'angles-45',
        title: '1. 45°-Anspielwinkel vs. Flache Linie',
        subtitle: 'Warum das Stehen auf einer flachen Linie den Ballbesitz abwürgt und wie 45°-Dreiecke automatische Lösungen schaffen',
        mistakeLabel: '✗ Fehler: Flaches Anbieten im Deckungsschatten',
        mistakeDesc: 'Die Mitspieler B und C stehen zu hoch auf einer Linie, sodass ein einziger Verteidiger (D1) mit einem geraden Lauf beide Passwege gleichzeitig zustellen kann.',
        solutionLabel: '✓ Lösung: Diagonales Anbieten im 45°-Winkel außerhalb des Hütchens',
        solutionDesc: 'B und C setzen sich auf ihren Außenlinien im 45°-Winkel zum Ballführenden (A) ab. Egal wohin sich D1 dreht — mindestens eine Passlinie bleibt immer frei.',
        coachingCue: '„Raus aus dem Deckungsschatten! Gebt dem Ball zwei 45-Grad-Winkel — niemals flach auf einer Höhe stehen!“'
      },
      {
        id: 'body-shape',
        title: '2. Offene Spielstellung (Perfilación) & Ballferner Fuß',
        subtitle: 'Wie die halb-offene Hüftstellung 0,8 Sekunden spart und mit dem ersten Kontakt das gesamte Feld öffnet',
        mistakeLabel: '✗ Fehler: Geschlossene Stellung & Annahme mit ballnahem Fuß',
        mistakeDesc: 'Empfänger B steht frontal zum Passgeber und stoppt den Ball mit dem ballnahen Fuß. Sein Rücken zeigt zum Zentrum, wodurch ihm nur der vorhersehbare Rückpass in den Druck bleibt.',
        solutionLabel: '✓ Lösung: Halb-offene Stellung & Mitnahme mit ballfernem Fuß',
        solutionDesc: 'Noch bevor der Ball ankommt, öffnet B seine Hüfte im 45°-Winkel zum Zentrum und nimmt den Ball mit dem ballfernen Fuß nach vorne mit — er sieht alle drei Linien gleichzeitig.',
        coachingCue: '„Hüfte vor dem Pass zum Zentrum öffnen! Mitnahme mit dem fernen Fuß — sieh das ganze Quadrat!“'
      },
      {
        id: 'cover-shadow',
        title: '3. Deckungsschatten (Cover Shadow) & Bogenpressing',
        subtitle: 'Wie Verteidiger durch einen gebogenen Anlaufweg aus einer 1-gegen-2-Unterzahl ein 1-gegen-1 machen',
        mistakeLabel: '✗ Fehler: Geradliniger Sprint auf den Ball',
        mistakeDesc: 'Verteidiger D1 sprintet in gerader Linie auf den Ballführenden (A) zu. Dadurch bleibt die zentrale Schnittstelle zum Sechser (#6) völlig offen.',
        solutionLabel: '✓ Lösung: Bogenlauf hält den Sechser im Deckungsschatten',
        solutionDesc: 'D1 läuft den Ballführenden im Bogen an, hält den zentralen Sechser (#6) permanent in seinem Deckungsschatten und lenkt das Spiel auf eine vorhersehbare Seite.',
        coachingCue: '„Im Bogen anlaufen! Nimm die Nummer 6 in deinen Deckungsschatten und lenk ihn auf eine Seite!“'
      },
      {
        id: 'third-man',
        title: '4. Spiel über den Dritten Mann (Steil-Klatsch A → B → C)',
        subtitle: 'Wie man einen Mitspieler freispielt, dessen direkter Passweg durch den Deckungsschatten blockiert ist',
        mistakeLabel: '✗ Fehler: Erzwungener Direktpass durch den Gegner (A → C)',
        mistakeDesc: 'Passgeber A versucht den direkten Vertikalpass auf C zu erzwingen, obwohl Verteidiger D1 genau in der Passlinie steht — sofortiger Ballverlust.',
        solutionLabel: '✓ Lösung: Steil-Klatsch über den Zweiten Mann (A → B → C)',
        solutionDesc: 'A spielt schräg auf Außenspieler B („Zweiter Mann“). Während D1 sich zum Ball dreht, lässt B mit 1 Kontakt am Deckungsschatten vorbei auf den freien „Dritten Mann“ C klatschen!',
        coachingCue: '„C ist zugestellt? Nutze B als Spiegel! Scharf auf den äußeren Fuß — klatschen lassen auf den Dritten Mann!“'
      }
    ],
    interventionsSectionTitle: '„Freeze“-Coaching & Live-Korrekturen auf dem Platz (6 Szenarien)',
    interventionsSectionSubtitle: 'Wann du abpfeifst („Einfrieren!“), welches Symptom du erkennst, welche Leitfrage du stellst und wie die 15-Sekunden-Korrektur aussieht.',
    symptomLabel: 'Symptom auf dem Platz',
    freezeTriggerLabel: 'Auslöser für „FREEZE!“',
    guidedQuestionLabel: 'Sokratische Leitfrage an die Spieler',
    microCorrectionLabel: '15-Sekunden-Mikrokorrektur',
    openRondoInCatalogBtn: 'Rondo auf der Taktiktafel öffnen',
    interventions: [
      {
        rondoId: 'rondo-1',
        rondoNumber: '1.1',
        title: '3-gegen-1-Rondo: Die verwaiste 4. Quadratseite',
        symptom: 'Nach dem Abspiel schaut der Passgeber seinem Pass hinterher und bleibt stehen, während der Mitspieler im Eck nur noch eine Anspielstation hat.',
        freezeTrigger: 'Pfiff in dem Moment, in dem der Ball beim Mitspieler ankommt und eine der 4 Quadratseiten noch komplett unbesetzt ist.',
        guidedQuestion: '„Einfrieren! Schaut auf die vier Seiten unseres Quadrats — welche Linie ist gerade komplett leer, und wer hatte den kürzesten Weg dorthin?“',
        microCorrection: '3 Sekunden zurückspulen: Der Passgeber muss seinen Sprint auf die freie Linie in der Sekunde starten, in der der Ball seinen Fuß verlässt.'
      },
      {
        rondoId: 'rondo-2',
        rondoNumber: '1.2',
        title: '5-gegen-2-Rondo: Beide Verteidiger flach auf einer Linie',
        symptom: 'Beide Verteidiger jagen nebeneinander auf derselben Höhe dem Ball hinterher und werden durch einen einfachen Schnittstellenpass überspielt.',
        freezeTrigger: 'Rufe „Freeze!“, sobald beide Verteidiger auf einer flachen Linie stehen und der Ballführende zum Schnittstellenpass ausholt.',
        guidedQuestion: '„Verteidiger, Stopp! Schaut auf die Lücke zwischen euren Schultern — wenn ihr nebeneinander auf einer Linie steht, wer sichert dann das Zentrum hinter euch?“',
        microCorrection: 'Den zweiten Verteidiger 2,5 m tiefer und 1,5 m diagonal nach innen staffeln („Einer stellt, einer sichert die Schnittstelle“). Neustart ab Lockpass.'
      },
      {
        rondoId: 'rondo-3',
        rondoNumber: '2.1',
        title: '7-gegen-3-Rondo: Sechser (#6) versteckt sich im Schatten',
        symptom: 'Die Außenspieler passen endlos im Kreis herum, weil der zentrale Sechser (#6) statisch im Rücken eines Verteidigers stehen bleibt.',
        freezeTrigger: 'Unterbreche nach 4 Außenpässen in Folge, wenn (#6) keinen Schulterblick gemacht hat und sich nicht aus dem Deckungsschatten gelöst hat.',
        guidedQuestion: '„Nummer 6, ohne dich umzudrehen — wo stehen die drei Verteidiger genau jetzt? Und kann dich der Ballführende anspielen, wenn du hinter D2 stehst?“',
        microCorrection: 'Zeige (#6), wie er während des Ballflugs mit 2 schnellen Seitwärtsschritten ins offene Passfenster zwischen zwei Verteidiger gleitet und vorab zweimal über die Schulter schaut.'
      },
      {
        rondoId: 'rondo-5',
        rondoNumber: '3.1',
        title: '6-gegen-3-Doppelfeld: Fehlende Breite bei der Verlagerung',
        symptom: 'Die Angreifer schaffen 4 Pässe unter Druck in Feld 1, aber niemand ist rechtzeitig in Feld 2 ausgewichen.',
        freezeTrigger: 'Freeze beim 4. Pass in Feld 1, wenn noch alle 6 Angreifer im ersten Quadrat zusammengedrängt stehen.',
        guidedQuestion: '„Wir haben 4 Pässe geschafft und alle drei Verteidiger hierher gezogen — schaut rüber in Feld 2: Wer ist dort bereit für die Verlagerung?“',
        microCorrection: 'Regel des „3. Passes“ einführen: Beim 3. Pass muss der ballfernste Angreifer bereits mit offener Stellung über die Mittellinie in Feld 2 einlaufen.'
      },
      {
        rondoId: 'rondo-8',
        rondoNumber: '4.2',
        title: 'Bartolini-Rondo: Verpasste Direktablage auf den Dritten Mann',
        symptom: 'Der „Zweite Mann“ (B) nimmt den Ball mit 2 Kontakten an, anstatt ihn mit 1 Kontakt direkt in das Innenquadrat auf den „Dritten Mann“ (C) klatschen zu lassen.',
        freezeTrigger: 'Freeze in dem Moment, in dem B den Ball stoppt, obwohl C perfekt ins offene Fenster im 5×5 m Quadrat gestartet war.',
        guidedQuestion: '„B, als A dir den scharfen Pass auf den rechten Fuß gespielt hat, wo war das Fenster für C offen — und was ist durch deinen zweiten Kontakt passiert?“',
        microCorrection: 'Prinzip „Der Pass als Botschaft“ demonstrieren: Ein scharfes Zuspiel auf den fernen Fuß von B ist das Signal für die sofortige 1-Kontakt-Ablage ins Zentrum.'
      },
      {
        rondoId: 'rondo-9',
        rondoNumber: '5.1',
        title: '4v2+4-Umschalt-Rondo: Zu langsames Gegenpressing',
        symptom: 'Nach Ballverlust setzt nur 1 Spieler nach, während die anderen 3 Angreifer kurz abschalten oder zurückweichen.',
        freezeTrigger: 'Pfiff 1,5 Sekunden nach Ballverlust, wenn auch nur einer der 4 inneren Angreifer auf den Fersen steht.',
        guidedQuestion: '„Freeze! Schaut auf die Abstände zum Ball — wenn nur einer presst und drei zuschauen, wie viele freie Passwege nach außen hat Blau dann?“',
        microCorrection: 'Ballverlust auf Klatschen des Trainers wiederholen: Alle 4 Angreifer müssen innerhalb von 1 Sekunde nach innen sprinten (1 jagt den Ball, 3 schließen das 360°-Netz).'
      }
    ],
    tableTitle: 'Master-Übersicht: Feldgrößen, Kontakte & Belastungssteuerung aller 10 Rondos',
    tableHeaders: {
      num: '#',
      rondo: 'Rondo & Methodik-Schule',
      goal: 'Kategorie',
      baseArea: 'Basis-Feld',
      intensiveArea: 'Intensiv-Feld',
      setsAndRest: 'Belastung & Kontakte'
    }
  },
  timer: {
    badge: 'Trainer-Tool für den Platz',
    title: 'Rondo-Intervall-Timer (mit Trainerpfeife)',
    whistleOn: 'Pfeife AN',
    whistleOff: 'Lautlos',
    presets: {
      small: '3v1 / 5v2 (4 × 1:30 / 0:30)',
      medium: '7v3 / Bartolini (4 × 2:30 / 0:45)',
      positional: 'Positionsspiel 4v4+3 (3 × 4:00 / 1:00)'
    },
    setLabel: 'Satz',
    ofLabel: 'von',
    workPhaseText: 'RONDO-BELASTUNGSPHASE (MAXIMALES TEMPO!)',
    restPhaseText: 'PAUSE / ROTATION & COACHING-IMPULS',
    pauseBtn: 'Pause',
    startBtn: 'Satz starten',
    resetBtn: 'Reset',
    customWorkLabel: 'Arbeit (Sek.)',
    customRestLabel: 'Pause (Sek.)',
    customSetsLabel: 'Sätze',
    secondsUnit: 's'
  },
  printModal: {
    badge: 'Trainingskarte für den Platz',
    printBtn: 'Drucken / PDF speichern',
    closeBtn: 'Schließen',
    dimensionsLabel: 'Feldgröße (Basis):',
    intensiveLabel: 'Intensiv-Feld:',
    dosageLabel: 'Belastung / Kontakte:',
    attackGoalLabel: 'Ziel mit Ball (Angriff):',
    defenseGoalLabel: 'Ziel gegen den Ball (Pressing):',
    scoringRuleLabel: 'Punktwertung:',
    monthlyProgressionTitle: '8-Einheiten-Monatsprogression für dieses Rondo:',
    sessionShortPrefix: 'Einh.'
  }
};
