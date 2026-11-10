import {
  AgeBandId,
  CategoryItem,
  MonthlySessionItem,
  RondoItem,
  UIStrings,
} from './types';
import { RondoMethodologyNote, RondoAgeVariant } from './ageMethodologyData';
import { buildActivationDiagram } from '../data/activationCanonicalGeometry';
import { computeSquadSetup } from '../domain/squadCalculator';

// ============================================================================
// 1. INDEPENDENT ACTIVATION CATEGORIES (EN / DE / RU)
// ============================================================================

export const ACTIVATION_CATEGORIES_EN: CategoryItem[] = [
  { id: 'all', name: 'All 10 Activations', color: 'bg-slate-600', dot: 'bg-slate-400' },
  { id: 'mastery', name: 'Ball Mastery & 1v1 Feints', color: 'bg-emerald-600', dot: 'bg-emerald-400' },
  { id: 'first_touch', name: 'First Touch & Directional Reception', color: 'bg-blue-600', dot: 'bg-blue-400' },
  { id: 'dribbling_space', name: 'Dribbling & Finding Free Zones', color: 'bg-amber-600', dot: 'bg-amber-400' },
  { id: 'passing_scanning', name: 'Passing, Scanning & Combinations', color: 'bg-purple-600', dot: 'bg-purple-400' },
  { id: 'biomotor_duels', name: 'Body Strength, Balance & Explosivity', color: 'bg-rose-600', dot: 'bg-rose-400' },
];

export const ACTIVATION_CATEGORIES_DE: CategoryItem[] = [
  { id: 'all', name: 'Alle 10 Einstiege', color: 'bg-slate-600', dot: 'bg-slate-400' },
  { id: 'mastery', name: 'Ballgefühl & 1-gegen-1-Finten', color: 'bg-emerald-600', dot: 'bg-emerald-400' },
  { id: 'first_touch', name: 'Erster Ballkontakt & Mitnahme', color: 'bg-blue-600', dot: 'bg-blue-400' },
  { id: 'dribbling_space', name: 'Dribbling & Freie Zonen finden', color: 'bg-amber-600', dot: 'bg-amber-400' },
  { id: 'passing_scanning', name: 'Passspiel, Vororientierung & Kombinationen', color: 'bg-purple-600', dot: 'bg-purple-400' },
  { id: 'biomotor_duels', name: 'Körperstabilität, Balance & Explosivität', color: 'bg-rose-600', dot: 'bg-rose-400' },
];

export const ACTIVATION_CATEGORIES_RU: CategoryItem[] = [
  { id: 'all', name: 'Все 10 упражнений активации', color: 'bg-slate-600', dot: 'bg-slate-400' },
  { id: 'mastery', name: 'Чувство мяча и финты 1v1', color: 'bg-emerald-600', dot: 'bg-emerald-400' },
  { id: 'first_touch', name: 'Первое касание и приём в движение', color: 'bg-blue-600', dot: 'bg-blue-400' },
  { id: 'dribbling_space', name: 'Дриблинг и поиск свободных зон', color: 'bg-amber-600', dot: 'bg-amber-400' },
  { id: 'passing_scanning', name: 'Пас, сканирование и комбинаторика', color: 'bg-purple-600', dot: 'bg-purple-400' },
  { id: 'biomotor_duels', name: 'Сила корпуса, баланс и взрыв с мячом', color: 'bg-rose-600', dot: 'bg-rose-400' },
];

// ============================================================================
// 2. 10 ACTIVATION DRILLS — ENGLISH (ACTIVATIONS_EN)
// ============================================================================

export const ACTIVATIONS_EN: RondoItem[] = [
  {
    id: 'act-1',
    number: '1.1',
    title: 'Coerver & Funino 4-Minigoal Team Arena: Traffic Mastery, Color Gates & 1v1 Breakouts',
    shortTitle: 'Coerver & 4-Minigoal Arena',
    category: 'mastery',
    categoryName: 'Ball Mastery & 1v1 Feints',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    format: 'Whole team in 1 shared arena (1 ball per player + 4 internal color gates + 4 outer mini-goals)',
    playersCount: '12–16 players (1 shared arena)',
    dimensionsU15: {
      base: '20 × 20 m (4 outer mini-goals)',
      intensive: '18 × 18 m (4 outer mini-goals)',
    },
    timingU15: '3 progressive phases × 3 min | Rest: 30 sec',
    problemInGame: 'Players glue their eyes to the ball during the first 10 minutes of training, lose balance when changing direction in tight traffic, and execute stiff 1v1 feints.',
    attackGoal: 'Keep the ball close with both feet (sole-inside V-cuts, La Croqueta, Cruyff turns) through the 4 internal color gates while scanning the arena and finishing into the 4 outer mini-goals (M1–M4).',
    defenseGoal: 'Phase 2–3 Body Strength & Explosivity: sink the hips low on every cut, hold a 2-second single-leg balance freeze on the whistle (FIFA 11+ knee alignment), and beat live central Hunters (D1/D2) to score in M1–M4.',
    scoringRule: 'Phase 3 Competition: Attackers score +1 point for beating a central Hunter through a color gate and finishing into any of the 4 outer mini-goals (M1–M4); Hunters score +1 point on counter-goals.',
    coachingCues: [
      'Soft ankles, quiet upper body — touch the ball with every step while keeping your chin up to read the 4 color gates and 4 mini-goals!',
      'Drop your center of gravity before the feint: plant the outside foot wide, sell the shoulder drop, and explode toward an open mini-goal!',
    ],
    progressions: [
      { level: 'Phase 1 (Light Entry • Team Rhythm & 4 Color Gates)', desc: 'All 12–16 players dribble freely inside the shared 20×20 m arena (65% tempo), executing bilateral V-cuts and sole rolls through the 4 internal color gates + dynamic hip mobilization.' },
      { level: 'Phase 2 (Progression • Color Signal Feint + Single-Leg Freeze)', desc: 'Coach raises a color cone: all players accelerate through the matching internal gate with a double-cut feint and hold a 2-second single-leg knee-over-toe freeze on the whistle.' },
      { level: 'Phase 3 (Peak Intensity • Live Hunters & 4-Minigoal Breakout)', desc: '2–3 central Hunters (D1/D2) defend the arena live: dribblers must beat a Hunter with a 1v1 feint through a color gate and finish into any of the 4 outer mini-goals (M1–M4)!' },
    ],
    diagram: buildActivationDiagram('act-1', '20×20 m Team Arena: 4 Internal Color Gates + 4 Outer Mini-Goals (M1–M4)', [
      {
        title: 'Phase 1: Whole-Team Ball Mastery Through 4 Internal Color Gates',
        desc: 'All players carry their own ball inside one shared 20×20 m arena at 65% tempo, executing V-cuts and La Croqueta feints through the 4 colored cone gates.',
        passLabels: [],
        movementLabels: ['V-cut through Yellow gate', 'Cruyff turn at Blue gate', 'Sole drag at Red gate', 'Both-feet rhythm at Green gate'],
      },
      {
        title: 'Phase 2: Visual Color Signal + Single-Leg Deceleration Freeze',
        desc: 'On the visual color signal, every player explodes through a colored gate and sticks a 2-second single-leg stability landing (green zones) with knee stacked over toe.',
        passLabels: [],
        movementLabels: ['Cut + 1-leg freeze (Yellow)', 'Cut + 1-leg freeze (Blue)', 'Cut + 1-leg freeze (Red)', 'Cut + 1-leg freeze (Green)'],
      },
      {
        title: 'Phase 3: Beating Live Hunters D1/D2 to Score in 4 Mini-Goals (100%)',
        desc: 'Central Hunters D1 and D2 press live inside the arena: attackers execute a 1v1 feint to escape pressure and finish into the 4 outer mini-goals (M1–M4)!',
        passLabels: ['Finish into Minitor M1 (+1)', 'Finish into Minitor M2 (+1)'],
        movementLabels: ['Hunter D1 presses A1', 'Burst to Minitor M4', 'Burst to Minitor M3'],
      },
    ]),
  },

  {
    id: 'act-2',
    number: '1.2',
    title: 'DFB Team Shadow Dribbling & 4-Minigoal Duel Hunt (Schattendribbling)',
    shortTitle: 'DFB Team Shadow & 4 Goals',
    category: 'mastery',
    categoryName: 'Ball Mastery & 1v1 Feints',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    format: 'All 6–8 pairs moving freely in 1 shared arena with 4 outer mini-goals',
    playersCount: '12–16 players (6–8 pairs in 1 arena)',
    dimensionsU15: {
      base: '22 × 20 m Shared Arena (4 mini-goals)',
      intensive: '20 × 18 m Shared Arena (4 mini-goals)',
    },
    timingU15: '3 progressive phases × 3 min | Rest: 30 sec',
    problemInGame: 'Wingers and midfielders telegraph their dribbling direction and lack the upper-body deception and low-hip power to unbalance a tight marker.',
    attackGoal: 'Lead your shadow partner across the shared team arena using rhythmic ball mastery and sudden body feints (step-overs, shoulder drops), then burst away on the signal to score in any of the 4 mini-goals.',
    defenseGoal: 'Phase 2–3 Body Strength & Explosivity: shadow 1.5 m behind the leader in a low athletic stance, mirror every eccentric sole-stop freeze in Phase 2, and hunt the ball on the Phase 3 whistle.',
    scoringRule: 'Phase 3 Competition: On the coach’s signal, leaders have 5 seconds to shake off their shadow partner and score into any of the 4 mini-goals (M1–M4, +1 pt); shadow defenders score +1 pt if they win the ball and counter.',
    coachingCues: [
      'Sell the lie with your eyes and shoulders first — your feet and ball explode in the opposite direction a split-second later!',
      'Stay low in the knees while shadowing: if you stand tall, you lose the first meter when the leader breaks for a mini-goal!',
    ],
    progressions: [
      { level: 'Phase 1 (Light Entry • Team Leader-Follower Mirror Glide)', desc: 'All 6–8 pairs glide freely across the 22×20 m arena at 65% tempo: Leader A performs sole rolls, V-cuts, and tempo shifts while Shadow S mirrors every hip movement 1.5 m away.' },
      { level: 'Phase 2 (Progression • Synchronized Step-Over + Split-Stance Freeze)', desc: 'Whenever Leader A stops the ball with the sole after a step-over feint, both partners must sink into a 2-second low eccentric split-stance (FIFA 11+ hip-knee-ankle control).' },
      { level: 'Phase 3 (Peak Intensity • 5-Second 1v1 Breakout to 4 Mini-Goals)', desc: 'On the coach’s signal, all pairs go 100% live for 5 seconds: Leader A drops the shoulder to lose Shadow S and finishes into any of the 4 outer mini-goals (M1–M4)!' },
    ],
    diagram: buildActivationDiagram('act-2', '22×20 m DFB Team Shadow Arena + 4 Outer Mini-Goals (M1–M4)', [
      {
        title: 'Phase 1: All Pairs Moving Freely in Leader-Follower Mirror Rhythm',
        desc: 'Pairs (A1/S1, A2/S2, A3/S3, A4/S4) move freely across the shared arena at 65% tempo: leaders vary ball mastery while shadows mirror their footwork and posture.',
        passLabels: [],
        movementLabels: ['Leader A1 glides + feints', 'Shadow S1 mirrors 1.5m away', 'Pair A2/S2 lateral glide', 'Pair A4/S4 changes tempo'],
      },
      {
        title: 'Phase 2: Double Step-Over Feint + Synchronized Low Stance Hold',
        desc: 'Leaders execute a sharp step-over and sole stop; both leader and shadow partner freeze for 2 seconds in a low eccentric split-stance inside the green stability zones.',
        passLabels: [],
        movementLabels: ['Step-over + low stance hold', 'Reactive shadow mirror stop', 'Low hip-knee-toe alignment'],
      },
      {
        title: 'Phase 3: 100% Live 1v1 Breakout & Finish Into 4 Mini-Goals (+1 Pt)',
        desc: 'On the signal, A1–A4 unbalance their shadow markers S1–S4 with a shoulder drop and burst toward the 4 outer mini-goals (M1–M4) to finish!',
        passLabels: ['Finish into Minitor M1 (+1)', 'Finish into Minitor M4 (+1)'],
        movementLabels: ['S1 reactive pursuit', 'A2 bursts toward M2', 'A3 bursts toward M3'],
      },
    ]),
  },

  {
    id: 'act-3',
    number: '2.1',
    title: 'SFV "Zentrum-Stern" Team Circuit: 6-to-6 Directional Reception (Mitnahme)',
    shortTitle: 'SFV Team Mitnahme (6-to-6)',
    category: 'first_touch',
    categoryName: 'First Touch & Directional Reception',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    format: '6–8 perimeter servers + 6–8 active central players (3–4 balls in simultaneous flow + 4 mini-goals)',
    playersCount: '12–16 players (whole team active)',
    dimensionsU15: {
      base: '20 × 20 m outer square + 8 × 8 m central zone',
      intensive: '18 × 18 m outer square + 7 × 7 m central zone',
    },
    timingU15: '3 progressive phases × 3 min | Rest: 30 sec',
    problemInGame: 'Players stop the ball dead under their feet before looking up, losing 1.5 seconds of tempo and allowing the opponent’s press to trap them.',
    attackGoal: 'Scan over both shoulders while the pass is traveling, open the hips (Perfilación), and take a dynamic first touch (Mitnahme) across the central traffic zone to connect with a free perimeter server.',
    defenseGoal: 'Phase 2–3 Body Strength & Explosivity: brace the core against trailing shoulder/forearm contact inside the central box in Phase 2, then evade live central Hunters (D1/D2) who counter on 4 mini-goals in Phase 3.',
    scoringRule: 'Phase 3 Competition: Central receivers score +1 pt for escaping the 8×8 m box on the 1st touch and connecting a 2nd-touch pass to a perimeter server; Hunters D1/D2 score +2 pts by intercepting and scoring in M1–M4.',
    coachingCues: [
      'SFV Golden Rule: never kill the ball under your sole! Your first touch is your first step across the central zone!',
      'Scan twice BEFORE the ball leaves the server’s foot — cushion across your body with the far foot and swap with the server!',
    ],
    progressions: [
      { level: 'Phase 1 (Light Entry • Simultaneous Multi-Ball Back-Foot Mitnahme)', desc: '6 outside servers (3–4 balls) and 6 inside receivers: check into the 8×8 m box, take a smooth back-foot first touch across the center, pass to a new server, and swap roles!' },
      { level: 'Phase 2 (Progression • Trailing Shoulder Contact Brace + Mitnahme)', desc: 'Central partners D1/D2 apply controlled shoulder/back contact as the entry pass arrives: N1/N2 lower their center of gravity, brace their core, and drive their first touch into space.' },
      { level: 'Phase 3 (Peak Intensity • Live Central Hunters & 4-Minigoal Counter)', desc: 'D1 and D2 hunt live at 100% inside the central box: receivers must escape on the 1st touch and pass out on the 2nd touch, while D1/D2 counter into the 4 outer mini-goals (M1–M4)!' },
    ],
    diagram: buildActivationDiagram('act-3', '20×20 m SFV Team Circuit + 8×8 m Center + 4 Mini-Goals (M1–M4)', [
      {
        title: 'Phase 1: Simultaneous Multi-Ball Entry & Back-Foot Mitnahme',
        desc: 'Perimeter servers S1–S6 feed multiple balls simultaneously into central players N1–N4, who scan early and take a dynamic first touch across the 8×8 m zone.',
        passLabels: ['Entry pass S1 → N1', 'Simultaneous entry S6 → N2'],
        movementLabels: ['N1 dynamic 1st touch right', 'N2 dynamic 1st touch left'],
      },
      {
        title: 'Phase 2: Core Bracing Against Shoulder Contact & Crisp Exit Pass',
        desc: 'As passes arrive in the green 8×8 m zone, D1 and D2 apply controlled shoulder contact. N1 and N2 brace their core and drive their first touch out to S4 and S3.',
        passLabels: ['2nd-touch exit N1 → S4', 'Simultaneous exit N2 → S3'],
        movementLabels: ['D1 shoulder contact brace', 'N1 accelerates out of box'],
      },
      {
        title: 'Phase 3: Beating Live Central Press D1/D2 & 4-Minigoal Transition',
        desc: 'D1 and D2 hunt live inside the center: N1 and N2 escape on the 1st touch to hit S6 and S1 (+1 pt); if D1/D2 win the ball, they finish into outer mini-goals M1–M4!',
        passLabels: ['Rapid 2-touch outlet N1 → S6 (+1)', 'Simultaneous outlet N2 → S1'],
        movementLabels: ['D1 live closing sprint', 'N1 explosive 1st-touch escape'],
      },
    ]),
  },

  {
    id: 'act-4',
    number: '2.2',
    title: 'FC Barcelona Symmetrical Dual-Y Circuit: Double-#6 Reception & Large Goals',
    shortTitle: 'Barça Dual-Y (#6A & #6B + Goals)',
    category: 'first_touch',
    categoryName: 'First Touch & Directional Reception',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    format: 'Symmetrical two-way Y-circuit (2 balls simultaneously, 2 central #6 pivots, 4 wings, 2 large goals)',
    playersCount: '12–16 players (2 balls in continuous flow)',
    dimensionsU15: {
      base: '22 × 16 m Dual-Y Pitch (2 large goals Tor 1 & Tor 2)',
      intensive: '20 × 14 m Dual-Y Pitch (2 large goals)',
    },
    timingU15: '3 progressive phases × 3 min | Rest: 35 sec',
    problemInGame: 'Central midfielders (#6/#8) receive with a flat, closed body shape facing their own goal and play backwards even when they have time to turn forward.',
    attackGoal: 'Run two simultaneous Y-flows: central pivots #6A and #6B check off at 45°, scan over both shoulders, open on the back foot (Perfilación) to feed wide wingers L1/R1 & L2/R2, and finish into the 2 Large Goals.',
    defenseGoal: 'Phase 2–3 Body Strength & Explosivity: central pressers D1 and D2 cue pressing angles on #6A and #6B, forcing the pivots to use their shielding forearm, spin off contact, and attack the opposite wing.',
    scoringRule: 'Phase 3 Competition: Pivots #6A & #6B score +1 point for reading D1/D2’s pressing shoulder, escaping into the free half-space, and combining with the winger to finish into Large Goal Tor 1 or Tor 2.',
    coachingCues: [
      'Check off at a 45° angle so you see both the feeder’s ball and the defender’s hips behind you in one glance!',
      'If D1 gives you 2 meters — open your back hip and glide forward; if D1 is tight on your back — use your forearm sensor and spin him in 1 touch!',
    ],
    progressions: [
      { level: 'Phase 1 (Light Entry • Symmetrical 2-Ball Open-Hip Half-Turn)', desc: 'Two balls start simultaneously from A1 (bottom) and A2 (top) into pivots #6A and #6B, who open on the back foot to feed wing gates L1/R2 and rotate continuously.' },
      { level: 'Phase 2 (Progression • Read the Defender’s Pressing Shoulder Cue)', desc: 'Pressers D1 and D2 step toward the left or right shoulder as the entry pass travels: #6A and #6B must scan during ball flight and take their first touch into the opposite half-space.' },
      { level: 'Phase 3 (Peak Intensity • Live Central Spin Duel & Large-Goal Finish)', desc: 'D1 and D2 press live at 100%: #6A and #6B shield low, spin away on the first touch, and combine with R1/L2 for a fast finish into Large Goals Tor 1 and Tor 2!' },
    ],
    diagram: buildActivationDiagram('act-4', '22×16 m Symmetrical Dual-Y Circuit + 2 Large Goals (Tor 1 & Tor 2)', [
      {
        title: 'Phase 1: Simultaneous 2-Ball Half-Turn (Perfilación) via #6A & #6B',
        desc: 'Feeders A1 (bottom) and A2 (top) pass simultaneously into central pivots 6A and 6B, who check at 45° and cushion on the back foot out to wide wingers L1 and R2.',
        passLabels: ['1. Entry pass A1 → 6A', '2. Open-hip pass 6A → L1', 'Simultaneous entry A2 → 6B'],
        movementLabels: ['6A checks at 45° & opens hips', '6B checks at 45° & opens hips'],
      },
      {
        title: 'Phase 2: Scanning Defender D1/D2’s Shoulder & Escaping Opposite',
        desc: 'As the entry passes travel, D1 screens the left lane behind 6A (red shadow) while D2 screens 6B. Both pivots scan early and drive their first touch into the opposite wing (R1 and L2).',
        passLabels: ['Directional escape pass 6A → R1', 'Simultaneous escape 6B → L2'],
        movementLabels: ['D1 screens left shoulder', '6A drives 1st touch right'],
      },
      {
        title: 'Phase 3: Live Spin Turn & Combination Finish Into Large Goals (+1 Pt)',
        desc: 'Under 100% live pressure from D1/D2, pivots 6A and 6B spin off contact and release wingers R1 and L2 to finish into Large Goals Tor 1 and Tor 2!',
        passLabels: ['Finish into Large Goal Tor 1 (+1)', 'Simultaneous finish into Tor 2'],
        movementLabels: ['6A follows to attack box', 'D1 live pursuit'],
      },
    ]),
  },

  {
    id: 'act-5',
    number: '3.1',
    title: 'SFV & Horst Wein 4-Quadrant Space Explorer on 4 Mini-Goals',
    shortTitle: '4-Quadrant Explorer (4 Goals)',
    category: 'dribbling_space',
    categoryName: 'Dribbling & Finding Free Zones',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    format: '20×20 m arena divided by cross-lines into 4 quadrants + 4 outer mini-goals (Q1–Q4)',
    playersCount: '12–16 players (whole team in 4 quadrants)',
    dimensionsU15: {
      base: '20 × 20 m (4 quadrants of 10 × 10 m + 4 mini-goals)',
      intensive: '18 × 18 m (4 quadrants of 9 × 9 m + 4 mini-goals)',
    },
    timingU15: '3 progressive phases × 3 min | Rest: 30 sec',
    problemInGame: 'Players gravitate toward the ball in a crowd instead of recognizing and accelerating into vacant space (Freilaufen & Raumgewinn).',
    attackGoal: 'Continuously scan all 4 quadrants while carrying or combining, escape congested quadrants immediately, and attack the unguarded quadrant’s outer mini-goal (Q1–Q4 Tor).',
    defenseGoal: 'Phase 2–3 Body Strength & Explosivity: combine low deceleration plants at the cross-lines with 3-step explosive bursts into underloaded quadrants against 3 live Zone Hunters (D1–D3).',
    scoringRule: 'Phase 3 Competition (3 Hunters vs 4 Quadrants): Since D1, D2, and D3 can only occupy 1 quadrant each, 1 quadrant is ALWAYS free! Attackers score +1 pt for finding the free quadrant and finishing in its mini-goal.',
    coachingCues: [
      'Don’t dribble where 3 teammates already are — lift your head and hunt the underloaded quadrant!',
      '3 Defenders vs 4 Quadrants means one zone is ALWAYS open: scan where D1–D3 are and explode into the 4th quadrant to score!',
    ],
    progressions: [
      { level: 'Phase 1 (Light Entry • Dribble & Escape Congested Quadrants)', desc: '12–16 players carry balls across the 4 quadrants at 70% tempo: whenever 4 players enter the same quadrant, one must immediately scan and accelerate into an underloaded quadrant.' },
      { level: 'Phase 2 (Progression • Cross-Zone Pass, Decelerate & Sprint to Space)', desc: 'Pass across a quadrant border, stick a low deceleration plant step, and sprint off the ball into an open quadrant to receive the next combination.' },
      { level: 'Phase 3 (Peak Intensity • 3 Zone Hunters vs 4 Quadrants + Mini-Goal Finish)', desc: '3 live Defenders (D1–D3) each defend 1 quadrant: attackers must identify which of the 4 quadrants has zero defenders, burst into it, and score into its outer mini-goal (Q1–Q4 Tor)!' },
    ],
    diagram: buildActivationDiagram('act-5', '20×20 m 4-Quadrant Cross Grid + 4 Outer Mini-Goals (Q1–Q4 Tor)', [
      {
        title: 'Phase 1: Recognizing Congestion in Q1 & Accelerating Into Open Q2',
        desc: 'When Quadrant 1 (top-left) becomes crowded with A1, A2, and A3, A2 lifts his head, spots Quadrant 2 (top-right, green highlight) empty, and accelerates across.',
        passLabels: [],
        movementLabels: ['A2 bursts into open Quadrant 2!', 'N1 balances into open space'],
      },
      {
        title: 'Phase 2: Cross-Quadrant Pass, Deceleration Stop & Off-Ball Rotation',
        desc: 'A2 plays a vertical cross-line pass to A6 in Q4 while A3 and A5 execute sharp deceleration plants and rotate into open lanes across the 4 quadrants.',
        passLabels: ['Cross-quadrant pass A2 → A6'],
        movementLabels: ['A3 sprints into Quadrant 2', 'A5 rotates into Quadrant 3'],
      },
      {
        title: 'Phase 3: Exploiting the 4th Free Quadrant to Score in Q3 Tor (+1 Pt)',
        desc: 'With D1 in Q1, D2 in Q2, and D3 in Q4, Quadrant 3 (bottom-left, green highlight) is completely undefended! A6 combines via A5 to A4, who scores into Mini-Goal Q3 Tor!',
        passLabels: ['Finish into Mini-Goal Q3 Tor (+1)', 'Quick release A6 → A5'],
        movementLabels: ['A4 attacks free Q3 Tor', 'D3 presses in Quadrant 4'],
      },
    ]),
  },

  {
    id: 'act-6',
    number: '3.2',
    title: 'DFB Two-Way Line-Breaking Carry Through Midline Gates on 4 Mini-Goals',
    shortTitle: 'DFB Two-Way Line-Break (4 Goals)',
    category: 'dribbling_space',
    categoryName: 'Dribbling & Finding Free Zones',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    format: 'Two-way 2-zone arena (3 midline cone gates + 2 mini-goals on left endline + 2 mini-goals on right endline)',
    playersCount: '12–16 players (two-way flow, zero queues)',
    dimensionsU15: {
      base: '24 × 16 m (3 midline gates + 4 endline mini-goals)',
      intensive: '22 × 14 m (3 midline gates + 4 endline mini-goals)',
    },
    timingU15: '3 progressive phases × 3.5 min | Rest: 35 sec',
    problemInGame: 'When central defenders or midfielders have an open corridor ahead of them, they play a slow sideways pass instead of driving forward with the ball to break the line.',
    attackGoal: 'Drive from both halves simultaneously, scan the 3 midline cone gates, burst through an open gate with a sharp tempo change (Tempowechsel), and finish into the 2 far mini-goals (R1/R2 or L1/L2).',
    defenseGoal: 'Phase 2–3 Body Strength & Explosivity: absorb lateral shoulder-to-shoulder contact from midline defenders D1/D2 in Phase 2, then beat 2 live defenders across 3 gates in Phase 3.',
    scoringRule: 'Phase 3 Competition: +2 points for bursting through an open midline gate against live defenders D1/D2 and scoring into a far mini-goal (R1/R2 or L1/L2); D1/D2 score +2 pts on counter-goals.',
    coachingCues: [
      'Small, frequent touches while scanning — long, explosive stride touch the instant one of the 3 midline gates opens!',
      'When D1 steps across to bump your shoulder in the midline gate, drop your inside hip, brace your core, and drive through the contact!',
    ],
    progressions: [
      { level: 'Phase 1 (Light Entry • Simultaneous Two-Way Carry & Midline Burst)', desc: 'Group A (left) and Group B (right) dribble simultaneously at 70% tempo, accelerate at 85% through any of the 3 midline cone gates into the opposite zone, and continue from the new side.' },
      { level: 'Phase 2 (Progression • Midline Shoulder-to-Shoulder Contact Brace)', desc: 'Defenders D1 and D2 apply controlled lateral shoulder contact inside the midline gates: ball-carriers brace their core, keep their balance, and power through into the far zone.' },
      { level: 'Phase 3 (Peak Intensity • 2 Live Defenders vs 3 Midline Gates + 4 Mini-Goals)', desc: 'D1 and D2 defend the 3 midline gates live (1 gate is always free!): attackers fake one gate, burst through the open gate, and score into the far mini-goals (R1/R2 or L1/L2)!' },
    ],
    diagram: buildActivationDiagram('act-6', '24×16 m DFB Two-Way Line-Break Arena: 3 Midline Gates + 4 Mini-Goals', [
      {
        title: 'Phase 1: Simultaneous Two-Way Carry & Tempo Change Through 3 Midline Gates',
        desc: 'Group A (left) and Group B (right) work simultaneously: A1 and A2 accelerate left-to-right while B1 accelerates right-to-left through the 3 colored midline gates.',
        passLabels: [],
        movementLabels: ['A1 bursts through Green gate', 'A2 bursts through Yellow gate', 'B1 bursts right-to-left (Blue gate)'],
      },
      {
        title: 'Phase 2: Absorbing Shoulder Contact in the Midline Gates',
        desc: 'As A1 (top) and B1 (bottom) drive through the midline gates (green stability zones), D1 and D2 apply lateral shoulder contact. Both carriers brace their core and power through.',
        passLabels: [],
        movementLabels: ['A1 drives through contact!', 'D1 lateral shoulder bump', 'B1 drives through contact!', 'D2 lateral shoulder bump'],
      },
      {
        title: 'Phase 3: Live Line-Break & Finish Into Endline Mini-Goals R1 & L2 (+2 Pts)',
        desc: 'After breaking past D1 and D2 at 100% speed, A1 finishes into right mini-goal R1 while B1 finishes in the opposite direction into left mini-goal L2!',
        passLabels: ['A1 scores in Mini-Goal R1 (+2)', 'B1 scores in Mini-Goal L2 (+2)'],
        movementLabels: ['D1 recovery chase', 'D2 recovery chase'],
      },
    ]),
  },

  {
    id: 'act-7',
    number: '4.1',
    title: 'FC Barcelona Symmetrical 2-Ball Diamond (Rueda de Pases): Third-Man & Mini-Goals',
    shortTitle: 'Barça 2-Ball Diamond (Rueda)',
    category: 'passing_scanning',
    categoryName: 'Passing, Scanning & Combinations',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    format: 'Symmetrical team diamond (2 balls circulating simultaneously + dual #6A/#6B pivots + 2 mini-goals)',
    playersCount: '12–16 players (1 unified team diamond, 2 balls)',
    dimensionsU15: {
      base: '18 × 18 m Team Diamond (2 mini-goals M1 & M2)',
      intensive: '16 × 16 m Team Diamond (2 mini-goals)',
    },
    timingU15: '3 progressive phases × 3 min | Rest: 30 sec',
    problemInGame: 'Passes arrive too softly or to the wrong foot, and players admire their pass instead of immediately supporting for the wall-pass (Pared) or Third-Man layoff.',
    attackGoal: 'Circulate 2 balls simultaneously from opposite vertices (A1 and C2) with firm passes to the back foot, synchronize 1-touch Third-Man combinations via dual pivots (#6A & #6B), and finish into M1/M2.',
    defenseGoal: 'Phase 2–3 Body Strength & Explosivity: integrate dynamic header-jump landings (FIFA 11+ knee stability) after every wide bounce pass in Phase 2, then beat live central screening (P1/P2) in Phase 3.',
    scoringRule: 'Phase 3 Competition (2 Balls): +1 point for every Third-Man sequence where #6A/#6B scans live presser P1/P2, bounces 1-touch to the free wing, and finishes into Mini-Goal M1 or M2.',
    coachingCues: [
      'Pass to the back foot with message and pace — both balls must move in perfect mirror rhythm without catching each other!',
      'Follow your pass with an explosive 3-step burst and stick your landing on balanced knees after every aerial jump!',
    ],
    progressions: [
      { level: 'Phase 1 (Light Entry • Simultaneous 2-Ball Diamond Circulation & Mobility)', desc: '2 balls start simultaneously from A1 and C2 (70% tempo): A1 → B1 → C1 and C2 → D1 → A2 on the back foot, following every pass with dynamic running mechanics.' },
      { level: 'Phase 2 (Progression • Synchronized Third-Man Wall Pass via #6A/#6B + Jump-Land)', desc: 'Both sides execute 1-touch bounce passes into central pivots #6A and #6B, who lay off to C1 and A1; wide players B1 and D1 perform a vertical jump + soft 2-foot landing.' },
      { level: 'Phase 3 (Peak Intensity • Live Central Pressers P1/P2 & Mini-Goal Finish)', desc: 'Pressers P1 and P2 screen inside the diamond: #6A and #6B scan early, bounce 1-touch to B1 and D1, who finish first-time into outer Mini-Goals M1 and M2!' },
    ],
    diagram: buildActivationDiagram('act-7', '18×18 m FC Barcelona Symmetrical 2-Ball Diamond + 2 Mini-Goals (M1 & M2)', [
      {
        title: 'Phase 1: Symmetrical 2-Ball Back-Foot Diamond Circulation',
        desc: 'Two balls circulate simultaneously from opposite ends: Bottom A1 → B1 → C1 and Top C2 → D1 → A2, keeping all 12–16 players in continuous motion.',
        passLabels: ['Ball 1: A1 → B1 (back foot)', 'B1 → C1', 'Ball 2: C2 → D1', 'D1 → A2'],
        movementLabels: ['A1 follows pass + mobility', 'C1 follows pass + mobility'],
      },
      {
        title: 'Phase 2: Synchronized Third-Man Bounce via Dual Pivots #6A & #6B',
        desc: 'Wide players B1 and D1 bounce 1-touch inside to central pivots 6A and 6B, who lay off in 1 touch to C1 and A1 while B1/D1 stick a balanced header-jump landing.',
        passLabels: ['1-touch bounce B1 → 6A', 'Layoff 6A → C1', '1-touch bounce D1 → 6B', 'Layoff 6B → A1'],
        movementLabels: ['B1 jump-land & support', 'D1 jump-land & support'],
      },
      {
        title: 'Phase 3: Beating Live Pressers P1/P2 & Finishing Into Mini-Goals M1/M2',
        desc: 'As P1 and P2 press the center, pivots 6A and 6B scan over their shoulders and bounce 1-touch to B1 and D1, who fire first-time into Mini-Goals M1 and M2!',
        passLabels: ['1-touch bounce 6A → B1', 'Finish into Minitor M1 (+1)', '1-touch bounce 6B → D1', 'Finish into Minitor M2 (+1)'],
        movementLabels: ['P1 presses pivot 6A', 'P2 presses pivot 6B'],
      },
    ]),
  },

  {
    id: 'act-8',
    number: '4.2',
    title: 'AFC Ajax 4-Corner Double-Square Scanning Circuit (All 4 Corners + 4 Mini-Goals)',
    shortTitle: 'Ajax 4-Corner Double Box',
    category: 'passing_scanning',
    categoryName: 'Passing, Scanning & Combinations',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    format: '4 active outer corners (2–3 players each) + 2 central pivots in inner box + 2 balls + 4 mini-goals',
    playersCount: '12–16 players (all 4 corners active simultaneously)',
    dimensionsU15: {
      base: '18 × 18 m outer square + 6 × 6 m inner box + 4 mini-goals',
      intensive: '16 × 16 m outer square + 5 × 5 m inner box + 4 mini-goals',
    },
    timingU15: '3 progressive phases × 3.5 min | Rest: 40 sec',
    problemInGame: 'Central players look only at the ball coming toward them and fail to connect quick inter-pivot combinations (#6 to #8) to split the opposition lines.',
    attackGoal: 'Run 2 simultaneous balls from opposite corners into central pivots N1 and N2 inside the 6×6 m box using mandatory double shoulder scans, 1-touch inter-pivot combinations, and exits to all 4 corners / 4 mini-goals.',
    defenseGoal: 'Phase 2–3 Body Strength & Explosivity: pivots execute rapid lateral deceleration cuts inside the 6×6 m box in Phase 2, then evade 2 live inner-box Hunters (D1/D2) in Phase 3.',
    scoringRule: 'Phase 3 Competition: +1 point every time N1/N2 pre-scans live Hunter D1/D2 inside the 6×6 m box and plays a 1-touch exit into any of the 4 outer mini-goals (M1–M4).',
    coachingCues: [
      'Two pivots (N1 & N2): never stand on the same horizontal or vertical line — always stagger diagonally inside the 6×6 m box!',
      'Look at the far corners and mini-goals BEFORE looking back at the ball: your head scan builds the picture!',
    ],
    progressions: [
      { level: 'Phase 1 (Light Entry • Simultaneous 2-Ball Corner-to-Pivot Half-Turn)', desc: '2 balls start simultaneously from Corner 3A (→ N1 → Corner 1A) and Corner 2A (→ N2 → Corner 4A) at 70% speed; every player follows their pass to keep all 4 corners active.' },
      { level: 'Phase 2 (Progression • 1-Touch Inter-Pivot Bounce N1 ↔ N2 + Lateral Cut)', desc: 'Corner passes into N1; N1 bounces 1-touch across the 6×6 m box to partner N2, who splits diagonally to the far corner + rapid lateral deceleration shuffle.' },
      { level: 'Phase 3 (Peak Intensity • Live Inner-Box Hunters D1/D2 & 4-Minigoal Exit)', desc: 'D1 and D2 hunt live inside the 6×6 m box at 100%: N1 and N2 must scan the press early and fire a 1-touch exit pass into the 4 outer mini-goals (M1–M4)!' },
    ],
    diagram: buildActivationDiagram('act-8', '18×18 m Ajax 4-Corner Double-Square + 4 Outer Mini-Goals (M1–M4)', [
      {
        title: 'Phase 1: Simultaneous 2-Ball Flow Across All 4 Corners & Dual Pivots',
        desc: 'Ball 1 plays from Corner 3A → N1 → Corner 1A while Ball 2 plays simultaneously from Corner 2A → N2 → Corner 4A. Both pivots scan twice before opening on the half-turn.',
        passLabels: ['Ball 1: 3A → N1', 'Half-turn N1 → 1A', 'Ball 2: 2A → N2', 'Half-turn N2 → 4A'],
        movementLabels: ['3A follows pass to center', '2A follows pass to center'],
      },
      {
        title: 'Phase 2: 1-Touch Inter-Pivot Combination (N1 → N2 → Corner 2A)',
        desc: 'Inside the green 6×6 m inner box, N1 cushions a 1-touch bounce pass to partner N2, who fires a diagonal split pass out to Corner 2A before executing a lateral deceleration cut.',
        passLabels: ['1-touch inter-pivot N1 → N2', 'Diagonal split pass N2 → 2A'],
        movementLabels: ['N1 lateral deceleration cut', 'N2 opens diagonal window'],
      },
      {
        title: 'Phase 3: Beating Live Inner-Box Press D1/D2 Into 4 Mini-Goals (+1 Pt)',
        desc: 'As D1 and D2 sprint to close down the inner box, N2 and N1 scan the free lanes early and fire 1-touch finishes into outer Mini-Goals M4 and M3!',
        passLabels: ['1-touch finish N2 → M4 (+1)', '1-touch finish N1 → M3 (+1)'],
        movementLabels: ['D1 live press on N2', 'D2 live press on N1'],
      },
    ]),
  },

  {
    id: 'act-9',
    number: '5.1',
    title: 'SFV "Mutig & Stark" + FIFA 11+ Team Duel Arena: Shielding & 4 Mini-Goals',
    shortTitle: 'SFV Mutig & Stark (4 Goals)',
    category: 'biomotor_duels',
    categoryName: 'Body Strength, Balance & Explosivity',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    format: 'All 6–8 pairs working simultaneously in 1 shared 20×20 m arena (1 ball per pair + 4 outer mini-goals)',
    playersCount: '12–16 players (6–8 pairs in 1 arena)',
    dimensionsU15: {
      base: '20 × 20 m Team Duel Arena (4 outer mini-goals)',
      intensive: '18 × 18 m Team Duel Arena (4 outer mini-goals)',
    },
    timingU15: '3 progressive phases × 2.5 min | Rest: 45 sec',
    problemInGame: 'Players get easily nudged off the ball in physical 1v1 duels because their stance is too narrow, their knees collapse inward, and they don’t use their shielding arm.',
    attackGoal: 'Work in matched pairs across the shared arena: anchor a wide, low shielding base (body between opponent and ball, ball on the far foot, forearm sensor up), then spin off contact to score in any of the 4 mini-goals (M1–M4).',
    defenseGoal: 'Phase 1–3 Body Strength & Explosivity: progress from FIFA 11+ mid-air shoulder bumps & 1-leg stick landings (Phase 1) to 3-second rolling shielding pressure (Phase 2) and a 100% live 4-minigoal duel (Phase 3).',
    scoringRule: 'Phase 3 Competition: On the coach’s whistle, all pairs battle live for 6 seconds — score +2 points by spinning off your opponent’s shoulder and finishing into any of the 4 outer mini-goals (M1–M4)!',
    coachingCues: [
      'SFV Mutig & Stark: sink your hips, widen your base, put your body between opponent and ball, and keep the ball on your FAR foot!',
      'Use your bent forearm as a tactile sensor on the defender’s chest — the moment he leans too hard on one shoulder, roll him and explode to a mini-goal!',
    ],
    progressions: [
      { level: 'Phase 1 (Light Entry • FIFA 11+ Partner Hop-Bump & 1-Leg Stick Landing)', desc: 'All 6–8 pairs move across the 20×20 m arena with 1 ball per pair: on the clap, perform a lateral hop with a controlled mid-air shoulder bump and hold a 2-second 1-leg knee-over-toe landing.' },
      { level: 'Phase 2 (Progression • Rolling 3-Second Wide-Base Ball Shielding)', desc: 'Across the whole arena, A1–A4 protect the ball on the far foot in a low, wide stance while B1–B4 apply firm shoulder/back pressure for 3 seconds (switch roles every 30s).' },
      { level: 'Phase 3 (Peak Intensity • Whistle Trigger: Live Spin-Turn & 4-Minigoal Finish)', desc: 'On the whistle during shielding, all pairs go 100% live for 6 seconds: roll off the defender’s pressure and sprint to score into any of the 4 outer mini-goals (M1–M4, +2 pts)!' },
    ],
    diagram: buildActivationDiagram('act-9', '20×20 m SFV "Mutig & Stark" Team Duel Arena + 4 Mini-Goals (M1–M4)', [
      {
        title: 'Phase 1: FIFA 11+ Partner Shoulder-Bump Hop & Single-Leg Landing',
        desc: 'All pairs (A1/B1, A2/B2, A3/B3, A4/B4) move through the shared arena with their ball, executing lateral hops with mid-air shoulder contact and a 2-second single-leg stick landing.',
        passLabels: [],
        movementLabels: ['A1 hop + 1-leg knee stick', 'B1 controlled shoulder bump', 'A4 hop + 1-leg knee stick', 'B4 controlled shoulder bump'],
      },
      {
        title: 'Phase 2: Simultaneous 3-Second Wide-Base Shielding (Far Foot)',
        desc: 'In the 4 green stability zones, A1–A4 drop their hips, raise their forearm sensor, and shield the ball on their far foot against 3 seconds of back/shoulder pressure from B1–B4.',
        passLabels: [],
        movementLabels: ['B1 firm shoulder pressure', 'B2 firm shoulder pressure', 'B3 firm shoulder pressure', 'B4 firm shoulder pressure'],
      },
      {
        title: 'Phase 3: Explosive Spin Off Contact & Finish Into 4 Mini-Goals (+2 Pts)',
        desc: 'On the whistle, A1–A4 feel the defender’s lean, spin sharply off their shoulder, and burst at 100% speed to finish into the 4 outer mini-goals (M1–M4)!',
        passLabels: ['A1 scores in Minitor M1 (+2)', 'A2 scores in Minitor M4 (+2)', 'A3 scores in Minitor M3 (+2)', 'A4 scores in Minitor M2 (+2)'],
        movementLabels: ['A1 roll-turn + 100% sprint', 'A4 roll-turn + 100% sprint'],
      },
    ]),
  },

  {
    id: 'act-10',
    number: '5.2',
    title: 'DFB & RAMP Team Potentiation Waves: Multi-Lane Braking Cut & Mini-Goal Race',
    shortTitle: 'DFB RAMP Waves (Braking & Goals)',
    category: 'biomotor_duels',
    categoryName: 'Body Strength, Balance & Explosivity',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    format: 'Rapid 4-player waves (2 simultaneous 1v1 lanes) + 2 midline braking gates + 2 far mini-goals (M1 & M2)',
    playersCount: '12–16 players (4-player waves every 12 sec)',
    dimensionsU15: {
      base: '22 × 16 m Multi-Lane RAMP Arena (2 braking gates + 2 mini-goals)',
      intensive: '20 × 14 m Multi-Lane RAMP Arena',
    },
    timingU15: '3 progressive phases × 2.5 min | Rest: 45 sec',
    problemInGame: 'Players can sprint in a straight line, but during high-speed braking and 90° cuts they overrun the ball or suffer non-contact knee/hamstring strain.',
    attackGoal: 'Launch in synchronized 4-player waves (2 parallel 1v1 lanes), execute a violent 3-step eccentric braking stop inside the midline gates (Brake 1 & Brake 2), and cut sharply to score in far Mini-Goals M1 & M2.',
    defenseGoal: 'Phase 1–3 Body Strength & Explosivity: master multi-step braking mechanics (hips below knees, zero knee valgus) in Phases 1–2, then win the 100% reactive dual-lane sprint race in Phase 3.',
    scoringRule: 'Phase 3 Competition: Attackers A1 & A2 score +2 points for separating from D1 & D2 at the midline braking gates and finishing into far Mini-Goals M1 & M2 before the defender blocks.',
    coachingCues: [
      'Braking is a weapon of separation: take 3 rapid, low braking steps to drop your hips BEFORE you plant your outside foot in the gate!',
      'Keep your knee stacked directly over your second toe on the plant step — push the ground away and fire into the mini-goal!',
    ],
    progressions: [
      { level: 'Phase 1 (Light Entry • Synchronized 4-Player Wave & 3-Step Braking)', desc: 'Waves of 4 players (A1/D1 top lane, A2/D2 bottom lane) carry at 75% to the midline braking gates, stick a 3-step low-hip stop, and return via the outer mobility lanes while Wave 2 (A3/D3, A4/D4) launches.' },
      { level: 'Phase 2 (Progression • Midline Braking Gate Freeze + 45° Plant Cut)', desc: 'Accelerate at 85% in 4-player waves: inside the midline gates (Brake 1 & Brake 2), hold a 2-second low athletic freeze, then plant the outside foot and cut into Zone 2.' },
      { level: 'Phase 3 (Peak Intensity • 100% Reactive Dual-Lane 1v1 Braking & Mini-Goal Race)', desc: '100% RAMP potentiation: A1 vs D1 and A2 vs D2 sprint toward the midline; A1 and A2 slam on the brakes, cut away from D1/D2, and fire into far Mini-Goals M1 and M2 (+2 pts)!' },
    ],
    diagram: buildActivationDiagram('act-10', '22×16 m DFB Multi-Lane RAMP Wave Arena: 2 Braking Gates + 2 Mini-Goals', [
      {
        title: 'Phase 1: 4-Player Wave Acceleration & 3-Step Braking Mechanics',
        desc: 'Wave 1 (A1/D1 top, A2/D2 bottom) accelerates toward midline gates Brake 1 & Brake 2 at 75% tempo to rehearse low-hip braking, while Wave 2 (A3/D3, A4/D4) prepares on the start line.',
        passLabels: [],
        movementLabels: ['A1 wave carry + 3-step brake', 'D1 parallel braking mechanics', 'A2 wave carry + 3-step brake', 'D2 parallel braking mechanics'],
      },
      {
        title: 'Phase 2: Eccentric Stop in Midline Braking Gates & Outside-Foot Cut',
        desc: 'Inside midline gates Brake 1 & Brake 2 (green zones), A1 and A2 absorb speed with knees aligned over toes, plant their outside foot, and cut sharply into Zone 2.',
        passLabels: [],
        movementLabels: ['A1 low brake + 45° cut', 'D1 reactive defensive plant', 'A2 low brake + 45° cut', 'D2 reactive defensive plant'],
      },
      {
        title: 'Phase 3: Dual-Lane 100% Reactive 1v1 Separation & Mini-Goal Finish (+2 Pts)',
        desc: 'Having created 1.5 m of separation at the braking gates, A1 and A2 explode into Zone 2 and fire into far Mini-Goals M1 and M2 while Wave 2 (A3/A4) launches behind them!',
        passLabels: ['A1 finishes into Minitor M1 (+2)', 'A2 finishes into Minitor M2 (+2)'],
        movementLabels: ['D1 recovery sprint', 'D2 recovery sprint', 'Wave 2 (A3) launches', 'Wave 2 (A4) launches'],
      },
    ]),
  },
];

// ============================================================================
// 3. 10 ACTIVATION DRILLS — GERMAN (ACTIVATIONS_DE)
// ============================================================================

export const ACTIVATIONS_DE: RondoItem[] = [
  {
    id: 'act-1',
    number: '1.1',
    title: 'Coerver & Funino 4-Minitore-Chaosfeld: Team-Ballgefühl & 1gg1-Ausbruch',
    shortTitle: 'Coerver 4-Minitore-Arena',
    category: 'mastery',
    categoryName: 'Ballgefühl & 1-gegen-1-Finten',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    format: 'Gesamte Mannschaft in 1 Feld (1 Ball pro Spieler + 4 interne Dribbeltore + 4 Minitore)',
    playersCount: '12–16 Spieler gemeinsam in 1 Feld',
    dimensionsU15: {
      base: '20 × 20 m Team-Arena (4 Minitore + 4 Hütchentore)',
      intensive: '18 × 18 m Team-Arena',
    },
    timingU15: '3 progressive Phasen × 3 Min. | Pause: 30 Sek.',
    problemInGame: 'In den ersten 10 Trainingsminuten klebt der Blick am Ball, im dichten Mannschaftsverkehr fehlt die Orientierung, und vor dem Richtungswechsel ist der Körperschwerpunkt zu hoch.',
    attackGoal: 'Alle 12–16 Spieler führen ihren Ball gleichzeitig im 20×20 m Feld, dribbeln mit Finten (V-Cut, La Croqueta, Cruyff-Turn) durch die 4 farbigen Innentore und schließen in Phase 3 auf die 4 äußeren Minitore (M1–M4) ab.',
    defenseGoal: 'Phase 2–3 Körperstabilität & Explosivität: Vor jeder Finte an den Innentoren den Schwerpunkt tief absenken, auf Pfiff 2 Sek. Einbein-Stabilitätsstopp (FIFA 11+ Beinachse) halten und in Phase 3 aktiv den Ball jagen.',
    scoringRule: 'Phase 3 Wettkampf: +1 Punkt für jedes durchdribbelte Innentor + 2 Punkte für einen Treffer in eines der 4 äußeren Minitore (M1–M4) gegen die 2–3 zentralen Balljäger.',
    coachingCues: [
      'Ganze Mannschaft im selben Quadrat: Kopf hoch vor jedem Innentor — wenn ein Tor besetzt ist, mit La Croqueta sofort zum nächsten freien Farbtor abdrehen!',
      'Schwerpunkt vor der Finte absenken: äußeren Fuß breit setzen, auf Pfiff stabil auf einem Bein einfrieren und in Phase 3 entschlossen ins freie Minitor abschließen!',
    ],
    progressions: [
      { level: 'Phase 1 (Leichter Einstieg • Team-Ballgefühl & 4 Innentore bei 65 %)', desc: 'Alle 12–16 Spieler dribbeln gleichzeitig im 20×20 m Feld, durchqueren die 4 farbigen Innentore mit Sohlenrollen/V-Cuts und mobilisieren Hüfte sowie Sprunggelenke.' },
      { level: 'Phase 2 (Progression • Farbtor-Finte + FIFA 11+ Einbein-Stopp)', desc: 'An jedem Innentor eine scharfe Doppel-Finte (Übersteiger / La Croqueta) setzen; auf Trainerpfiff sofort 2 Sek. Einbein-Stabilitätsstopp (Knie über Fußspitze) halten.' },
      { level: 'Phase 3 (Spitzenintensität • 2–3 Balljäger + Abschluss auf 4 Minitore)', desc: '2–3 Verteidiger (D1/D2) lassen ihren Ball liegen und jagen im Feld: Dribbler durchqueren erst ein Innentor und schließen dann mit 100 % Tempo in eines der 4 Minitore (M1–M4) ab!' },
    ],
    diagram: buildActivationDiagram('act-1', '20×20 m Coerver & Funino 4-Minitore-Team-Arena', [
      {
        title: 'Phase 1: Gleichzeitiges Team-Ballgefühl durch 4 farbige Innentore',
        desc: 'Die gesamte Mannschaft (12–16 Spieler, dargestellt als A1–A6 & D1–D2, jeder mit Ball) dribbelt bei 65 % Tempo durch das 20×20 m Feld und nutzt V-Cuts durch die 4 farbigen Hütchentore.',
        passLabels: [],
        movementLabels: ['A1 V-Cut durch Tor 1', 'A2 La Croqueta durch Tor 2', 'A5 Sohlenrolle durch Tor 3', 'A6 Innenseiten-Cut durch Tor 4'],
      },
      {
        title: 'Phase 2: Explosiver Finten-Ausbruch am Innentor + Einbein-Stabilitätsstopp',
        desc: 'Auf das visuelle Signal setzen die Spieler eine scharfe Finte durch ihr nächstes Innentor und frieren auf Pfiff für 2 Sekunden in einer tiefen Einbein-Stabilitätsposition (FIFA 11+) ein.',
        passLabels: [],
        movementLabels: ['Finte + Einbein-Stopp (Tor 1)', 'Finte + Einbein-Stopp (Tor 2)', 'Explosiver Ausbruch (Tor 3)', 'Explosiver Ausbruch (Tor 4)'],
      },
      {
        title: 'Phase 3: Aktive Balljäger (D1/D2) & 100 % Abschluss auf 4 Minitore (M1–M4)',
        desc: 'D1 und D2 jagen aktiv im Zentrum: A1 und A6 lösen sich per Finte durch die oberen Innentore und schießen präzise in die äußeren Minitore M1 und M2 (+2 Punkte)!',
        passLabels: ['A1 Abschluss in Minitor M1 (+2)', 'A6 Abschluss in Minitor M2 (+2)'],
        movementLabels: ['D1 presst linken Sektor', 'D2 presst rechten Sektor', 'A5 bricht zu Minitor M3 durch'],
      },
    ]),
  },

  {
    id: 'act-2',
    number: '1.2',
    title: 'DFB Team-Spiegellinie: Synchron-Finten & 4-Minitore-Reaktionsrennen',
    shortTitle: 'DFB Team-Spiegellinie (4 Minitore)',
    category: 'mastery',
    categoryName: 'Ballgefühl & 1-gegen-1-Finten',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    format: 'Gesamte Mannschaft (6–8 Paare gleichzeitig an einer 22 m Mittellinie + 4 Eck-Minitore)',
    playersCount: '12–16 Spieler (6–8 Paare gleichzeitig)',
    dimensionsU15: {
      base: '24 × 16 m Team-Korridor + 4 äußere Minitore',
      intensive: '22 × 14 m Team-Korridor + 4 äußere Minitore',
    },
    timingU15: '3 progressive Phasen × 3 Min. | Pause: 30 Sek.',
    problemInGame: 'Flügel- und Mittelfeldspieler kündigen ihre Dribblingrichtung zu früh an und haben zu wenig Oberkörpertäuschung sowie Hüftkraft, um den Gegenspieler aus der Balance zu bringen.',
    attackGoal: 'Alle Paare arbeiten gleichzeitig entlang der zentralen Spiegellinie, täuschen den Partner mit Körperfinten (Übersteiger, Schulterfinte, Sohlenzieher) und brechen in Phase 3 auf die 4 äußeren Minitore (M1–M4) durch.',
    defenseGoal: 'Phase 2–3 Körperstabilität & Explosivität: Tiefe athletische Grundstellung auf dem Vorfuß halten, seitliche Cuts ohne Kniekollaps abfedern und in Phase 3 den Angreifer vor dem Schusswinkel ablaufen.',
    scoringRule: 'Phase 3 Wettkampf: Angreifer (A1–A4) erhalten +2 Punkte für einen Treffer in die oberen Minitore (M1/M2); erobert der Verteidiger (S1–S4) den Ball, kontert er sofort auf die unteren Minitore (M3/M4)!',
    coachingCues: [
      'Verkaufe die Täuschung zuerst mit Augen und Schultern — Fuß und Ball folgen den Bruchteil einer Sekunde später!',
      'Bleib tief in den Knien entlang der Mittellinie: wer aufrecht steht, verliert den ersten Schritt zum Minitor!',
    ],
    progressions: [
      { level: 'Phase 1 (Leichter Einstieg • Synchroner Team-Spiegelrhythmus bei 65 %)', desc: 'Alle 6–8 Paare stehen sich an der zentralen Hütchenlinie gegenüber: Angreifer führen Ballpendeln, Sohlenrollen und Seitgalopp aus, während die Partner jede Bewegung spiegeln.' },
      { level: 'Phase 2 (Progression • Doppel-Finte + Tiefer Exzentrischer Ausfallschritt)', desc: 'Angreifer setzen 2 schnelle Übersteiger + Seit-Cut und frieren für 2 Sek. in einer tiefen athletischen Landeposition ein, während der Schattenpartner das Abbremsen exakt spiegelt.' },
      { level: 'Phase 3 (Spitzenintensität • Reaktives 1gg1-Ausbruchsrennen auf 4 Minitore)', desc: 'Angreifer starten frei: Gegner mit Körpertäuschung an der Linie verladen, in die freie Spur explodieren und vor dem Verteidiger in Minitor M1 oder M2 treffen!' },
    ],
    diagram: buildActivationDiagram('act-2', '24×16 m DFB Team-Spiegellinie & 4 Minitore', [
      {
        title: 'Phase 1: Synchrones Spiegel-Ballgefühl entlang der Team-Mittellinie',
        desc: 'Alle Paare (A1/S1 bis A4/S4, jeweils mit eigenem Ball) bewegen sich synchron entlang der zentralen Hütchenlinie: A1–A4 variieren das Ballgefühl, S1–S4 spiegeln jede Hüftbewegung.',
        passLabels: [],
        movementLabels: ['A1 seitlicher Spiegel-Rhythmus', 'S1 spiegelt Fußarbeit', 'A3 Synchron-Cuts', 'S3 spiegelt Hüftstellung'],
      },
      {
        title: 'Phase 2: Doppel-Übersteiger + Tiefer Exzentrischer Stabilitäts-Freeze',
        desc: 'Auf der gesamten Linie führen A1–A4 einen scharfen Übersteiger mit Seit-Cut aus; Angreifer und Spiegelpartner sinken gleichzeitig in eine tiefe, stabile Beinachsen-Position.',
        passLabels: [],
        movementLabels: ['A1 Doppel-Cut + tiefer Freeze', 'S1 reaktiver Spiegel-Stopp', 'A4 explosiver Seit-Cut'],
      },
      {
        title: 'Phase 3: Explosiver 1gg1-Ausbruch & Abschluss auf die Minitore (+2 Punkte)',
        desc: 'A1 und A4 verladen ihre Gegenspieler mit einer Schulterfinte, sprinten mit 100 % Tempo zu den Flügeln und schließen in die Minitore M1 und M2 ab, während S1 nachsetzt!',
        passLabels: ['A1 trifft in Minitor M1 (+2)', 'A4 trifft in Minitor M2 (+2)'],
        movementLabels: ['A1 100 % Ausbruch links', 'S1 Verfolgungssprint', 'A4 100 % Ausbruch rechts'],
      },
    ]),
  },

  {
    id: 'act-3',
    number: '2.1',
    title: 'SFV-Stern & 4-Minitore-Quadrat: Dynamische Ballmitnahme mit 2 Bällen',
    shortTitle: 'SFV-Stern (4 Minitore • 2 Bälle)',
    category: 'first_touch',
    categoryName: 'Erster Ballkontakt & Mitnahme',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-300/30',
    format: '4 Eck-Zuspielstationen (je 2–3 Spieler) + 2 Zentrumsspieler + 2 Verfolger + 4 Minitore',
    playersCount: '12–16 Spieler gemeinsam (2 Bälle gleichzeitig)',
    dimensionsU15: {
      base: '20 × 20 m Außenquadrat + 6 × 6 m SFV-Zentrumsstern',
      intensive: '18 × 18 m Außenquadrat + 5 × 5 m SFV-Zentrumsstern',
    },
    timingU15: '3 progressive Phasen × 3 Min. | Pause: 30 Sek.',
    problemInGame: 'Spieler stoppen den Ball tot unter der Sohle, bevor sie den Kopf heben, verlieren 1,5 Sekunden Spieltempo und geraten im Zentrum sofort unter Pressingdruck.',
    attackGoal: 'Mit 2 gleichzeitig laufenden Bällen über die Schulter scannen, Hüfte öffnen (Perfilación) und den Ball mit dem ersten Kontakt (Mitnahme) direkt aus dem Zentrumsstern auf die Außenspieler oder 4 Minitore (M1–M4) mitnehmen.',
    defenseGoal: 'Phase 2–3 Körperstabilität & Explosivität: In Phase 2 Rumpfspannung gegen Schulter-/Rückenkontakt von D1/D2 halten und in Phase 3 mit einer explosiven Mitnahme in die 4 Minitore abschließen.',
    scoringRule: 'Phase 3 Wettkampf: +2 Punkte für jede dynamische Ballmitnahme aus dem 6×6 m Stern mit anschließendem Zweitkontakt-Abschluss in eines der 4 Eck-Minitore (M1–M4) vor Zugriff von D1/D2.',
    coachingCues: [
      'SFV-Goldregel: Stoppe den Ball niemals tot unter der Sohle! Dein erster Kontakt ist dein erster Schritt aus dem Zentrumsstern!',
      '2 Bälle gleichzeitig im Umlauf: Scanne zweimal BEVOR der Pass kommt — sowohl den anderen Zentrumsspieler als auch den Verfolger im Rücken!',
    ],
    progressions: [
      { level: 'Phase 1 (Leichter Einstieg • 2-Ball-Mitnahme über den fernen Fuß bei 70 %)', desc: 'Zuspieler A1 und A4 passen gleichzeitig auf N1 und N2 im 6×6 m Stern; beide öffnen die Hüfte, nehmen den Ball mit dem 1. Kontakt aus dem Stern mit, passen auf A2/A3 und rotieren.' },
      { level: 'Phase 2 (Progression • Rumpfstabilität bei Schulterkontakt im Rücken)', desc: 'Verfolger D1 und D2 setzen beim Ballkontakt dosierten Schulterdruck von hinten: N1 und N2 senken den Schwerpunkt, spannen den Rumpf an und nehmen den Ball explosiv weg vom Kontakt mit.' },
      { level: 'Phase 3 (Spitzenintensität • Aktives 100 %-Pressing & Abschluss auf 4 Minitore)', desc: 'D1 und D2 attackieren beim Pass mit 100 %: N1 und N2 brechen mit dem 1. Kontakt aus dem Stern aus und schießen mit dem 2. Kontakt in die freien Eck-Minitore (M1–M4)!' },
    ],
    diagram: buildActivationDiagram('act-3', '20×20 m SFV-Ballmitnahme-Stern + 4 Eck-Minitore (2 Bälle)', [
      {
        title: 'Phase 1: Gleichzeitiges 2-Ball-Zuspiel & Dynamische Mitnahme (Ferner Fuß)',
        desc: 'Aus den Ecken A1 und A4 laufen 2 Bälle gleichzeitig in N1 und N2 im 6×6 m Stern. Beide öffnen frühzeitig die Hüfte und nehmen den Ball mit dem 1. Kontakt in den freien Raum mit.',
        passLabels: ['Ball 1: Zuspiel A1 → N1', 'Ball 2: Zuspiel A4 → N2'],
        movementLabels: ['N1 Mitnahme nach rechts', 'N2 Mitnahme nach links'],
      },
      {
        title: 'Phase 2: Rumpfstabilität gegen Rückendruck (D1/D2) & Anschluss-Pass',
        desc: 'Während beide Bälle einrollen, setzen D1 und D2 kontrollierten Schulterdruck. N1 und N2 halten über die Rumpfspannung stabil dagegen und spielen scharf hinaus auf A2 und A3.',
        passLabels: ['N1 scharfer Pass zu A2', 'N2 scharfer Pass zu A3'],
        movementLabels: ['D1 Schulterdruck auf N1', 'D2 Schulterdruck auf N2'],
      },
      {
        title: 'Phase 3: Aktiver 100 %-Ausbruch & Abschluss in die 4 Eck-Minitore (+2 Pkt.)',
        desc: 'D1 und D2 sprinten aggressiv in den Zweikampf: N1 und N2 lösen sich mit einer explosiven ersten Ballmitnahme und treffen mit dem 2. Kontakt in die Minitore M2 und M3!',
        passLabels: ['N1 trifft in Minitor M2 (+2)', 'N2 trifft in Minitor M3 (+2)'],
        movementLabels: ['D1 aktiver Pressing-Sprint', 'D2 aktiver Pressing-Sprint'],
      },
    ]),
  },

  {
    id: 'act-4',
    number: '2.2',
    title: 'Doppel-Y-Form Offene Stellung (#6/#8) auf Großtor & 2 Minitore',
    shortTitle: 'Doppel-Y Aufdrehen (Großtor)',
    category: 'first_touch',
    categoryName: 'Erster Ballkontakt & Mitnahme',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    format: 'Synchroner Doppel-Y-Aufbau mit 1 Großtor (inkl. Torwart) + 2 Konter-Minitoren',
    playersCount: '12–16 Spieler (2 Bälle gleichzeitig + Torwart)',
    dimensionsU15: {
      base: '24 × 18 m Doppel-Y vor dem Großtor',
      intensive: '22 × 16 m Doppel-Y vor dem Großtor',
    },
    timingU15: '3 progressive Phasen × 3 Min. | Pause: 35 Sek.',
    problemInGame: 'Zentrale Mittelfeldspieler (#6/#8) empfangen den Ball mit geschlossener Hüfte (Rücken zum gegnerischen Großtor) und klatschen unnötig zurück, obwohl Raum zum Aufdrehen und Durchstecken da ist.',
    attackGoal: 'Zwei Sechser/Achter (N1 & N2) lösen sich gleichzeitig im 45°-Winkel, scannen über die Schulter, drehen auf und bedienen die Flügelläufer (L/R) durch die Hütchentore zum Abschluss aufs Großtor.',
    defenseGoal: 'Phase 2–3 Körperstabilität & Explosivität: D1 und D2 variieren den Druck im Rücken von N1/N2; bei Ballgewinn kontern D1/D2 sofort auf die beiden unteren Minitore (M1/M2).',
    scoringRule: 'Phase 3 Wettkampf: +2 Punkte für Aufdrehen + Steckpass durch die Flügeltore mit Torabschluss gegen den Torwart im Großtor; +2 Punkte für D1/D2 bei Ballgewinn und Kontertor in M1/M2.',
    coachingCues: [
      'Löse dich im 45°-Winkel vom Gegner, sodass du sowohl den Passgeber (A1/A2) als auch die Hüfte des Verteidigers (D1/D2) siehst!',
      'Lässt der Verteidiger Platz — Hüfte öffnen und mit dem fernen Fuß vorwärts zum Großtor aufdrehen; klebt er am Rücken — Schutzarm raus und per Spin-Turn entkommen!',
    ],
    progressions: [
      { level: 'Phase 1 (Leichter Einstieg • Synchrones 2-Ball-Aufdrehen & Großtor-Abschluss)', desc: 'A1 und A2 passen gleichzeitig auf N1 (#6) und N2 (#8); beide drehen bei 70 % Tempo über den fernen Fuß auf, stecken durch die Flügeltore auf L/R durch und L legt zum Abschluss vors Großtor quer.' },
      { level: 'Phase 2 (Progression • Anlaufwinkel von D1/D2 lesen & Schutzarm nutzen)', desc: 'D1 und D2 schieben während des Ballflugs auf eine Schulter von N1/N2: die Zentrumsspieler scannen im Ballflug, spannen den Rumpf an und nehmen den 1. Kontakt weg vom Druck.' },
      { level: 'Phase 3 (Spitzenintensität • Aktives 1gg1 im Zentrum auf Großtor vs. Konter-Minitore)', desc: 'D1 und D2 pressen mit 100 %: N1/N2 müssen sich per Erstkontakt-Drehung lösen und den Angriff aufs Großtor einleiten — bei Ballverlust sofortiges Umschalten auf die Minitore M1/M2!' },
    ],
    diagram: buildActivationDiagram('act-4', '24×18 m Doppel-Y-Aufdrehen mit Großtor (TW) & 2 Konter-Minitoren', [
      {
        title: 'Phase 1: Synchrones 2-Ball-Aufdrehen (#6/#8) & Kombination aufs Großtor',
        desc: 'Startspieler A1 und A2 spielen gleichzeitig auf N1 (#6) und N2 (#8). Beide öffnen die Hüfte, stecken durch die Flügeltore auf L und R durch, und L schließt ins Großtor ab.',
        passLabels: ['Ball 1: A1 → N1 (#6)', 'Ball 2: A2 → N2 (#8)', 'Steckpass N1 → L & Abschluss aufs Großtor'],
        movementLabels: ['N1 öffnet Hüfte (45°)', 'N2 öffnet Hüfte (45°)'],
      },
      {
        title: 'Phase 2: Anlaufwinkel von D1/D2 scannen & Mitnahme mit Rumpfspannung',
        desc: 'Während die Pässe rollen, laufen D1 und D2 die innere Schulter an. N1 und N2 erkennen den Druck im Schulterblick, nutzen den Schutzarm und nehmen den 1. Kontakt durch die Außentore mit.',
        passLabels: ['N1 Steckpass durch linkes Tor zu L', 'N2 Steckpass durch rechtes Tor zu R'],
        movementLabels: ['D1 stellt innere Schulter zu', 'D2 stellt innere Schulter zu'],
      },
      {
        title: 'Phase 3: Explosive Drehung unter 100 % Druck & Abschluss aufs Großtor (+2 Pkt.)',
        desc: 'N1 und N2 drehen sich explosiv um den engen Kontakt von D1/D2 herum und bedienen L/R vor dem Großtor (TW) — während D1/D2 auf Ballgewinn für die Konter-Minitore M1/M2 lauern!',
        passLabels: ['L schließt an TW vorbei ins Großtor ab (+2)', 'N2 steckt auf R durch (+1)'],
        movementLabels: ['N1 explosiver Spin-Turn', 'D1/D2 aktive Verfolgung'],
      },
    ]),
  },

  {
    id: 'act-5',
    number: '3.1',
    title: '4-Quadranten-Freiraum-Explorer mit 4 Eck-Minitoren',
    shortTitle: '4-Quadranten-Explorer (4 Minitore)',
    category: 'dribbling_space',
    categoryName: 'Dribbling & Freie Zonen finden',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    format: '4 Quadranten im 20×20 m Feld + 4 äußere Eck-Minitore (M1–M4)',
    playersCount: '12–16 Spieler gemeinsam (4–5 Bälle im Umlauf)',
    dimensionsU15: {
      base: '20 × 20 m unterteilt in 4 Zonen (je 10 × 10 m) + 4 Minitore',
      intensive: '18 × 18 m unterteilt in 4 Zonen (je 9 × 9 m) + 4 Minitore',
    },
    timingU15: '3 progressive Phasen × 3 Min. | Pause: 30 Sek.',
    problemInGame: 'Spieler ballen sich im Pulk rund um den Ball zusammen, anstatt freie Räume frühzeitig zu erkennen und aktiv mit Tempowechsel hineinzustoßen (Freilaufen & Raumgewinn).',
    attackGoal: 'Während des Dribblings kontinuierlich alle 4 Quadranten scannen, Überzahl-Ballungen sofort verlassen und in Phase 3 aus einem freien Quadranten direkt in das zugehörige Eck-Minitor (M1–M4) treffen.',
    defenseGoal: 'Phase 2–3 Körperstabilität & Explosivität: Scharfe Abbrems-Schritte an den Zonengrenzen mit explosiven 3-Schritt-Antritten in freie Quadranten gegen 2 zentrale Zonen-Jäger (D1/D2) verbinden.',
    scoringRule: 'Phase 3 Wettkampf: Ein Tor in eines der 4 Eck-Minitore (M1–M4) zählt +2 Punkte — darf aber NUR aus einem Quadranten erzielt werden, in dem sich gerade kein Verteidiger (D1/D2) befindet!',
    coachingCues: [
      'Dribble niemals dorthin, wo schon drei Mitspieler stehen — Kopf hoch, leeren Quadranten erkennen und sofort mit Tempowechsel hineinstoßen!',
      'In Phase 3 sind die 2 Minitore im Quadranten der Verteidiger gesperrt: Verlagere per Dribbling oder Pass in den freien Quadranten und schließe sofort ab!',
    ],
    progressions: [
      { level: 'Phase 1 (Leichter Einstieg • Team-Dribbling & Leeren Quadranten besetzen)', desc: 'Alle 12–16 Spieler bewegen sich mit 5–6 Bällen bei 65–70 % Tempo durch die 4 Quadranten: sobald ein Quadrant überfüllt ist, mit 3 explosiven Schritten in eine freie Zone wechseln.' },
      { level: 'Phase 2 (Progression • Passen, Abbremsen & Sprint in die freie Zone)', desc: 'Pass zum Mitspieler, tiefer Abbrems-Abdruck an der Kreuzlinie und explosiver Lauf ohne Ball in den freien Quadranten für das nächste Zuspiel.' },
      { level: 'Phase 3 (Spitzenintensität • 2 Zonen-Jäger + Abschluss auf freie Eck-Minitore)', desc: 'D1 und D2 verteidigen je einen Quadranten: Angreifer müssen innerhalb von 3 Sek. in einen unbesetzten Quadranten einbrechen und ins dortige Eck-Minitor (M1–M4) treffen (+2 Pkt.)!' },
    ],
    diagram: buildActivationDiagram('act-5', '20×20 m 4-Quadranten-Freiraum-Explorer + 4 Eck-Minitore', [
      {
        title: 'Phase 1: Scannen & Tempodribbling in den freien Quadranten (Oben Rechts)',
        desc: 'Als sich mehrere Spieler im linken oberen Quadranten ballen, hebt A2 den Kopf, erkennt den komplett freien Quadranten oben rechts und beschleunigt mit Ball hinein.',
        passLabels: [],
        movementLabels: ['A2 explosiver Antritt in freie Zone!', 'N1 balanciert Quadranten-Besetzung'],
      },
      {
        title: 'Phase 2: Vertikalpass, Abbrems-Plant & Rotation in die offene Zone',
        desc: 'A2 spielt vertikal über die Kreuzlinie auf A4, während A3 die Raumöffnung liest und in den freien Quadranten unten links sprintet, als D1 und D2 das Zentrum verdichten.',
        passLabels: ['Vertikalpass A2 → A4'],
        movementLabels: ['A3 sprintet in freien Quadranten unten links', 'D1 verdichtet das Zentrum'],
      },
      {
        title: 'Phase 3: Kombination in freie Quadranten & Abschluss auf Minitore (+2 Pkt.)',
        desc: 'Da D1 und D2 die rechten Zonen attackieren, verlagern A4 auf A3 (unten links) und A1 auf N1 (oben rechts) zum direkten Abschluss in die freien Minitore M3 und M2!',
        passLabels: ['A4 → A3 Abschluss in Minitor M3 (+2)', 'A1 → N1 Abschluss in Minitor M2 (+2)'],
        movementLabels: ['A3 stößt zum Torabschluss vor!', 'D1 jagt A4 im rechten Sektor'],
      },
    ]),
  },

  {
    id: 'act-6',
    number: '3.2',
    title: '3-Spuren-Tempowechsel: Linienbrechendes Dribbling durch 3 Tore auf 2 Minitore',
    shortTitle: '3-Spuren-Durchbruch (2 Minitore)',
    category: 'dribbling_space',
    categoryName: 'Dribbling & Freie Zonen finden',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    format: '2 Zonen + 3 farbige Mittellinien-Tore + 2 obere Minitore (3 Wellen gleichzeitig)',
    playersCount: '12–16 Spieler (Dreierwellen + 2 Mittellinien-Verteidiger)',
    dimensionsU15: {
      base: '24 × 16 m Zwei-Zonen-Durchbruchsarena (3 Mitteltore + 2 Minitore)',
      intensive: '22 × 14 m Zwei-Zonen-Durchbruchsarena',
    },
    timingU15: '3 progressive Phasen × 3,5 Min. | Pause: 35 Sek.',
    problemInGame: 'Wenn Innenverteidiger oder Sechser freien Raum vor sich haben, spielen sie oft langsam quer, statt mit einem dynamischen Tempodribbling die Pressinglinie zu durchbrechen.',
    attackGoal: 'In 3er-Wellen (A1, A2, A3) den Ball in Zone 1 führen, erkennen, welche 2 der 3 Mittellinien-Tore von D1/D2 zugestellt werden, mit Tempowechsel durch das freie Tor brechen und in die Minitore (M1/M2) treffen.',
    defenseGoal: 'Phase 2–3 Körperstabilität & Explosivität: Seitlichen Schulter-an-Schulter-Kontakt von D1/D2 an den Mittellinien-Toren im vollen Lauf stabil abfedern, ohne aus dem Tritt zu kommen.',
    scoringRule: 'Phase 3 Wettkampf: +2 Punkte für jeden Angreifer, der mit Ball durch eines der 3 Mittellinien-Tore bricht und in Minitor M1 oder M2 verwandelt; +1 Punkt für einen Querpass auf den mitgelaufenen Partner.',
    coachingCues: [
      '3 Angreifer gegen 2 Verteidiger an 3 Mittellinien-Toren: Eines der 3 Tore ist IMMER frei — Kopf hoch in Zone 1 und explodiere durch das offene Fenster!',
      'Wenn D1/D2 am Tor Schulterkontakt suchen: innere Hüfte absenken, Rumpf anspannen und mit vollem Tempo durch den Kontakt ziehen!',
    ],
    progressions: [
      { level: 'Phase 1 (Leichter Einstieg • 3er-Wellen-Rhythmus & Antritt durch 3 Mitteltore)', desc: 'Dreierwellen (A1, A2, A3) dribbeln in Zone 1 bei 65 % Tempo, beschleunigen auf Signal gleichzeitig durch die 3 farbigen Mittellinien-Tore in Zone 2 und die nächste Welle (A4–A6) startet.' },
      { level: 'Phase 2 (Progression • Schulterkontakt an den Mittellinien-Toren + Balance)', desc: 'D1 und D2 geben an den Mittellinien-Toren dosierten seitlichen Schulterdruck: die Dribbler spannen den Rumpf an, halten die Spur und ziehen stabil in Zone 2 durch.' },
      { level: 'Phase 3 (Spitzenintensität • Aktiver 3gg2-Liniendurchbruch & Abschluss auf M1/M2)', desc: 'D1 und D2 verteidigen die 3 Mittellinien-Tore zu 100 % aktiv: A1–A3 müssen eine Spur antäuschen, durch die freie Lücke explodieren und in die Minitore M1/M2 einschießen (+2 Pkt.)!' },
    ],
    diagram: buildActivationDiagram('act-6', '24×16 m 3-Spuren-Durchbruchsarena (3 Mitteltore + 2 Minitore)', [
      {
        title: 'Phase 1: Synchrone 3er-Welle & Tempowechsel durch die 3 Mittellinien-Tore',
        desc: 'Welle 1 (A1, A2, A3) führt den Ball flüssig in Zone 1 und beschleunigt mit klarem Tempowechsel gleichzeitig durch die 3 farbigen Mittellinien-Tore in Zone 2, während Welle 2 (A4–A6) bereitsteht.',
        passLabels: [],
        movementLabels: ['A1 Antritt durch linkes Tor', 'A2 Antritt durch zentrales Tor', 'A3 Antritt durch rechtes Tor'],
      },
      {
        title: 'Phase 2: Schulterkontakt an der Mittellinie stabilisieren & Durchziehen',
        desc: 'Als A1–A3 die Mittellinien-Tore passieren, setzen D1 und D2 seitlichen Schulterdruck. Die Angreifer halten über ihre Rumpfstabilität dagegen und brechen ohne Tempoverlust in Zone 2 durch.',
        passLabels: [],
        movementLabels: ['A1 stabil durch Schulterkontakt!', 'A2 explosiver Zentrumsdurchbruch', 'A3 zieht rechts durch', 'D1 seitlicher Druck am Tor'],
      },
      {
        title: 'Phase 3: Aktiver Liniendurchbruch & Abschluss in die Minitore M1/M2 (+2 Pkt.)',
        desc: 'Nach dem Durchbruch durch die offenen Tore in Zone 2 stabilisieren A1 und A3 ihren letzten Schritt und schießen präzise in die beiden oberen Minitore M1 und M2!',
        passLabels: ['A1 trifft in Minitor M1 (+2)', 'A3 trifft in Minitor M2 (+2)'],
        movementLabels: ['A2 stößt als Anspielstation im Zentrum nach', 'D1 rückt nach'],
      },
    ]),
  },

  {
    id: 'act-7',
    number: '4.1',
    title: 'Barça Doppel-Raute (Rueda de Pases): Synchroner 2-Ball-Dritter-Mann',
    shortTitle: 'Barça-Raute (2 Bälle Synchron)',
    category: 'passing_scanning',
    categoryName: 'Passspiel, Vororientierung & Kombinationen',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    format: 'Große Team-Raute (4 Eckgruppen + Doppel-Pivot #6/#8 + 2 Minitore + 2 Bälle)',
    playersCount: '12–16 Spieler gemeinsam in 1 großen Raute (2 Bälle)',
    dimensionsU15: {
      base: '20 × 20 m Team-Raute + 2 Abschluss-Minitore',
      intensive: '18 × 18 m Team-Raute + 2 Abschluss-Minitore',
    },
    timingU15: '3 progressive Phasen × 3 Min. | Pause: 30 Sek.',
    problemInGame: 'Pässe kommen zu lasch oder auf den falschen Fuß, und Spieler schauen ihrem Pass hinterher, statt sofort für das Klatschenlassen (Pared) oder den Dritten Mann nachzustarten.',
    attackGoal: 'Gleichzeitige 2-Ball-Zirkulation von der unteren (A) und oberen Spitze (C): scharfe Flachpässe in den fernen Fuß, Wandspiel mit beiden Zentrum-Pivots (#6 & #8) und Steckpass auf den Dritten Mann.',
    defenseGoal: 'Phase 2–3 Körperstabilität & Explosivität: In Phase 2 nach jedem Pass einen dynamischen Kopfball-Sprung mit stabiler Landung (FIFA 11+) einbauen; in Phase 3 den Störspieler D1 im Zentrum überspielen.',
    scoringRule: 'Phase 3 Wettkampf (2 Bälle gleichzeitig): Welches Team schafft in 90 Sek. 16 fehlerfreie Dritter-Mann-Sequenzen oder schließt bei Zentrumsdruck von D1 direkt in die Minitore (M1/M2) ab?',
    coachingCues: [
      '2 Bälle laufen gleichzeitig im selben Rauten-System: Pass scharf in den ballfernen Fuß — die Schärfe deines Passes bestimmt das Tempo des nächsten Kontakts!',
      'Beide Zentrum-Pivots (#6 und #8) arbeiten versetzt: Starte deinem Pass mit 3 explosiven Schritten nach und lande nach dem Kopfballsprung stabil auf beiden Beinen!',
    ],
    progressions: [
      { level: 'Phase 1 (Leichter Einstieg • Synchrone 2-Ball-Rautenzirkulation bei 70 %)', desc: 'Ball 1 startet bei A (A → B → C), Ball 2 startet gleichzeitig bei C (C → D → A): offene Stellung über den fernen Fuß an den Flügeln und dynamisches Nachrücken für alle 12–16 Spieler.' },
      { level: 'Phase 2 (Progression • Synchrones Doppel-Pivot-Wandspiel #6 & #8 + Sprung-Landung)', desc: 'A passt auf B, der auf #6 klatschen lässt (Steckpass auf C); gleichzeitig passt C auf D, der auf #8 klatschen lässt (Steckpass auf A) + explosiver Vertikalsprung nach jedem Abspiel.' },
      { level: 'Phase 3 (Spitzenintensität • 2-Ball-Temporennen + Störspieler D1 & Minitore)', desc: 'Störspieler D1 stellt im Zentrum eine Passbahn zu: #6 und #8 müssen vorab scannen und im 1. Kontakt die freie Diagonale oder die äußeren Minitore (M1/M2) finden!' },
    ],
    diagram: buildActivationDiagram('act-7', '20×20 m FC Barcelona Synchron-2-Ball-Raute (Rueda de Pases)', [
      {
        title: 'Phase 1: Synchrone 2-Ball-Rautenzirkulation in den fernen Fuß',
        desc: 'Ball 1 startet unten bei A (A → B → C), während Ball 2 gleichzeitig oben bei C startet (C → D → A). Alle 12–16 Spieler sind im Dauerfluss ohne Warteschlangen.',
        passLabels: ['Ball 1: Scharfer Pass A → B', 'Ball 1: Offener Pass B → C', 'Ball 2: Scharfer Pass C → D', 'Ball 2: Offener Pass D → A'],
        movementLabels: ['A rückt nach zu B', 'C rückt nach zu D'],
      },
      {
        title: 'Phase 2: Doppelter Dritter-Mann über beide Zentrum-Pivots (#6 & #8)',
        desc: 'Flügel B lässt im 1. Kontakt auf #6 klatschen (Steckpass zu C), während Flügel D gleichzeitig auf #8 klatschen lässt (Steckpass zu A) — gefolgt von einem stabilen Sprung-Landung-Impuls.',
        passLabels: ['Ball 1: Klatschpass B → #6', 'Ball 1: Direktpass #6 → C', 'Ball 2: Klatschpass D → #8', 'Ball 2: Direktpass #8 → A'],
        movementLabels: ['B startet explosiv nach', 'D startet explosiv nach'],
      },
      {
        title: 'Phase 3: 1-Kontakt-Lösung gegen Störspieler D1 & Abschluss auf M1/M2',
        desc: 'Als Störspieler D1 das Zentrum attackiert, scannen #6 und #8 über die Schulter und leiten beide Bälle im 1. Kontakt an D1 vorbei zu den Spitzen bzw. Minitoren M1/M2!',
        passLabels: ['Ball 1: A → B → #6', 'Ball 1: #6 Direkt-Exit zu C (+1)', 'Ball 2: C → D → #8', 'Ball 2: #8 Direkt-Exit zu A (+1)'],
        movementLabels: ['D1 stellt zentrales Fenster zu', '#6/#8 verschieben diagonal'],
      },
    ]),
  },

  {
    id: 'act-8',
    number: '4.2',
    title: 'Ajax De Toekomst Doppelquadrat: 2-Ball-Scanning & 4 Eck-Minitore',
    shortTitle: 'Ajax-Doppelquadrat (4 Minitore)',
    category: 'passing_scanning',
    categoryName: 'Passspiel, Vororientierung & Kombinationen',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    format: '4 Eckgruppen + 2 Innen-Pivots (N1/N2) + 2 Störspieler (D1/D2) + 4 Eck-Minitore',
    playersCount: '12–16 Spieler gemeinsam (2 Bälle gleichzeitig)',
    dimensionsU15: {
      base: '20 × 20 m Außenquadrat + 7 × 7 m Innenbox + 4 Minitore',
      intensive: '18 × 18 m Außenquadrat + 6 × 6 m Innenbox + 4 Minitore',
    },
    timingU15: '3 progressive Phasen × 3,5 Min. | Pause: 40 Sek.',
    problemInGame: 'Zentrumsspieler fixieren nur den anrollenden Ball und übersehen schnelle Kurzpass-Kombinationen zwischen #6 und #8, um das gegnerische Zentrumspressing zu überspielen.',
    attackGoal: 'Mit 2 gleichzeitig laufenden Bällen zwischen den 4 Außenecken (1–4) und den beiden Innen-Pivots (N1 & N2) kombinieren, per Doppel-Schulterblick vororientieren und in Phase 3 auf die 4 Eck-Minitore (M1–M4) aussteigen.',
    defenseGoal: 'Phase 2–3 Körperstabilität & Explosivität: Schnelle seitliche Abbrems-Cuts der beiden Pivots in der 7×7 m Innenbox sowie Lösen von den 2 aktiven Störspielern (D1/D2) in Phase 3.',
    scoringRule: 'Phase 3 Wettkampf: +2 Punkte für jede Sequenz Ecke → Pivot N1 → Pivot N2 → Direktabschluss in ein freies Eck-Minitor (M1–M4); +2 Punkte für D1/D2 bei Ballgewinn und Kontertor!',
    coachingCues: [
      'Zwei Zentrumsspieler (N1 & N2): niemals flach auf einer Linie stehen — immer versetzt auf verschiedenen Diagonalen in der 7×7 m Innenbox anbieten!',
      'Schau zuerst zur fernen Ecke und zum Minitor, BEVOR du zurück zum Ball blickst: dein Schulterblick malt das Bild vor dem ersten Kontakt!',
    ],
    progressions: [
      { level: 'Phase 1 (Leichter Einstieg • Synchrones 2-Ball Ecke-zu-Pivot-Aufdrehen)', desc: '2 Bälle starten gleichzeitig aus gegenüberliegenden Ecken (3 und 2): Pass auf N1 und N2 in der Innenbox, die bei 70 % Tempo über den fernen Fuß aufdrehen und die nächsten Ecken (1 und 4) bedienen.' },
      { level: 'Phase 2 (Progression • 1-Kontakt-Doppel-Pivot-Kombination N1 ↔ N2)', desc: 'Ecke 3 passt auf N1; N1 legt im 1. Kontakt diagonal durch die Innenbox auf Partner N2 ab, der sofort durch die Schnittstelle auf Ecke 2 durchsteckt + schneller Seit-Cut.' },
      { level: 'Phase 3 (Spitzenintensität • Aktives Pressing D1/D2 & Abschluss auf 4 Minitore)', desc: 'D1 und D2 jagen aktiv in der 7×7 m Innenbox: N1 und N2 müssen den Druck scannen und per 1-Kontakt-Kombination die freien Außenecken oder direkt die 4 Eck-Minitore (M1–M4) treffen!' },
    ],
    diagram: buildActivationDiagram('act-8', '20×20 m Ajax De Toekomst Doppelquadrat + 4 Eck-Minitore', [
      {
        title: 'Phase 1: Gleichzeitiges 2-Ball-Zuspiel & Vororientierte Pivot-Mitnahme',
        desc: 'Aus den gegenüberliegenden Ecken 3 und 2 rollen 2 Bälle gleichzeitig in N1 und N2 in der 7×7 m Innenbox. Beide scannen über die Schulter und leiten sauber weiter auf Ecke 1 und Ecke 4.',
        passLabels: ['Ball 1: Ecke 3 → N1', 'Ball 1: N1 → Ecke 1', 'Ball 2: Ecke 2 → N2', 'Ball 2: N2 → Ecke 4'],
        movementLabels: ['N1 bietet sich diagonal an & scannt', 'N2 bietet sich auf Gegendiagonale an'],
      },
      {
        title: 'Phase 2: 1-Kontakt-Kombination der Doppel-Sechs (N1 → N2 → Ecke 2)',
        desc: 'N1 legt das Zuspiel von Ecke 3 im 1. Kontakt quer durch die Innenbox auf Partner N2 ab, der sofort einen scharfen Diagonalpass hinaus auf Ecke 2 spielt.',
        passLabels: ['1-Kontakt-Ablage N1 → N2', 'Diagonaler Schnittstellenpass N2 → Ecke 2'],
        movementLabels: ['N2 öffnet diagonales Passfenster', 'D1 verschiebt zur Deckung'],
      },
      {
        title: 'Phase 3: Überspielen des Innenbox-Pressings (D1/D2) & Abschluss auf M2/M3 (+2)',
        desc: 'Als D1 und D2 explosiv in die Innenbox schieben, lösen sich N1 und N2 im 1. Kontakt und bedienen direkt die freien Eck-Minitore M2 und M3 für +2 Punkte!',
        passLabels: ['N2 Direkt-Exit in Minitor M2 (+2)', 'N1 Direkt-Exit in Minitor M3 (+2)'],
        movementLabels: ['D1 presst N2 aktiv', 'D2 presst N1 aktiv'],
      },
    ]),
  },

  {
    id: 'act-9',
    number: '5.1',
    title: 'FIFA 11+ & SFV Mutig & Stark: 4-Minitore-Abschirm- & Spin-Arena',
    shortTitle: 'Mutig & Stark (4 Minitore • 1gg1)',
    category: 'biomotor_duels',
    categoryName: 'Körperstabilität, Balance & Explosivität',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    format: '4 gleichzeitige 1gg1-Abschirmduelle im Zentrum + 4 Zuspieler + 4 äußere Minitore',
    playersCount: '12–16 Spieler gemeinsam in 1 Arena (4 Bälle gleichzeitig)',
    dimensionsU15: {
      base: '20 × 20 m Mutig-&-Stark-Arena + 4 äußere Minitore',
      intensive: '18 × 18 m Mutig-&-Stark-Arena + 4 äußere Minitore',
    },
    timingU15: '3 progressive Phasen × 2,5 Min. | Pause: 45 Sek.',
    problemInGame: 'Spieler lassen sich in körperlichen 1gg1-Duellen zu leicht vom Ball drängen, weil die Standbasis zu schmal ist, die Knie nach innen wegknicken und der Schutzarm fehlt.',
    attackGoal: '4 Angreifer (A1–A4) empfangen im Zentrum gleichzeitig das Zuspiel von außen, verankern gegen ihren Gegenspieler (B1–B4) eine tiefe breite Abschirmbasis und drehen sich in Phase 3 zum Abschluss in eines der 4 Minitore (M1–M4) frei.',
    defenseGoal: 'Phase 1–3 Körperstabilität & Explosivität: Von Einbein-Sprungstabilisation (Phase 1) über 3-Sek.-Schulter-an-Schulter-Abschirmen (Phase 2) bis zum explosiven Spin-Turn mit Minitor-Abschluss (Phase 3).',
    scoringRule: 'Phase 3 Wettkampf: Angreifer (A1–A4) erhalten +2 Punkte für 3 Sek. Ballabschirmen + Spin-Turn und Treffer in ein äußeres Minitor (M1–M4); Verteidiger (B1–B4) erhalten +2 Punkte für Ballgewinn und Kontertor!',
    coachingCues: [
      'SFV Mutig & Stark: Hüfte tief absenken, breite Standbasis, Körper zwischen Gegner und Ball bringen und den Ball strikt am BALLFERNEN Fuß führen!',
      'Nutze deinen angewinkelten Unterarm als Fühler an der Brust des Verteidigers — lehnt er sich zu stark auf eine Seite, roll dich um seine Schulter herum und schieß ins freie Minitor!',
    ],
    progressions: [
      { level: 'Phase 1 (Leichter Einstieg • FIFA 11+ Einbein-Sprünge & Sohlen-Balance)', desc: 'Alle Paare im 20×20 m Feld absolvieren dynamische Einbeinsprünge mit 2 Sek. Stabilitätslandung (Knie über Fußspitze) + leichtes Schulter-an-Schulter-Ausbalancieren mit Ball.' },
      { level: 'Phase 2 (Progression • 4 gleichzeitige 3-Sek.-Abschirmduelle im Zentrum)', desc: 'Auf Pfiff werden 4 Bälle ins Zentrum gespielt: A1–A4 verankern eine tiefe breite Standbasis und schirmen ihren Ball am fernen Fuß für volle 3 Sekunden gegen den Körperdruck von B1–B4 ab.' },
      { level: 'Phase 3 (Spitzenintensität • Aktives 1gg1-Abschirmen + Spin-Abschluss auf 4 Minitore)', desc: 'Nach 2 Sek. aktivem Abschirmen gegen B1–B4 drehen sich A1–A4 explosiv aus dem Kontakt heraus und schließen mit 100 % Tempo in eines der 4 äußeren Minitore (M1–M4) ab (+2 Pkt.)!' },
    ],
    diagram: buildActivationDiagram('act-9', '20×20 m FIFA 11+ & SFV Mutig-&-Stark 4-Minitore-Arena', [
      {
        title: 'Phase 1: FIFA 11+ Einbein-Landestabilität & Partner-Balance im Teamfeld',
        desc: 'Alle 4 Zentrumspaare (A1/B1 bis A4/B4) plus Außenspieler absolvieren dynamische Einbeinsprünge mit 2-Sekunden-Beinachsen-Stabilisierung und rhythmischer Ballkontrolle.',
        passLabels: [],
        movementLabels: ['A1 Einbeinsprung + stabile Landung', 'A2 Beinachsen-Stabilisierung', 'A3 Rumpf- & Sprunggelenk-Balance', 'A4 athletische Landeposition'],
      },
      {
        title: 'Phase 2: 4 gleichzeitige 3-Sekunden-Ballabschirmduelle in tiefer Basis',
        desc: 'In der grünen Stabilitätszone schirmen A1–A4 alle 4 Bälle gleichzeitig gegen den engen Rückendruck von B1–B4 ab: tiefe Hüfte, Schutzarm als Sensor und Ball am fernen Fuß.',
        passLabels: [],
        movementLabels: ['B1 Rückendruck vs. A1 Abschirmen', 'B2 Rückendruck vs. A2 Abschirmen', 'B3 Rückendruck vs. A3 Abschirmen', 'B4 Rückendruck vs. A4 Abschirmen'],
      },
      {
        title: 'Phase 3: Explosiver Spin-Turn aus dem Kontakt & Abschluss auf 4 Minitore (+2)',
        desc: 'Sobald B1–B4 zu stark auf eine Schulter drücken, rollen sich A1–A4 explosiv über die freie Seite ab und treffen in alle 4 äußeren Minitore (M1, M2, M3 und M4)!',
        passLabels: ['A1 Spin & Schuss in Minitor M1 (+2)', 'A2 Spin & Schuss in Minitor M2 (+2)', 'A3 Spin & Schuss in Minitor M3 (+2)', 'A4 Spin & Schuss in Minitor M4 (+2)'],
        movementLabels: ['A1 explosiver Spin-Ausbruch', 'A2 explosiver Spin-Ausbruch'],
      },
    ]),
  },

  {
    id: 'act-10',
    number: '5.2',
    title: 'Doppelspur-RAMP-Bremsstopp & 1gg1-Jagdrennen auf 2 Minitore',
    shortTitle: 'Doppelspur RAMP 1gg1 (2 Minitore)',
    category: 'biomotor_duels',
    categoryName: 'Körperstabilität, Balance & Explosivität',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    format: '2 parallele Sprint- & Brems-Spuren (2 Paare starten gleichzeitig + 2 Minitore M1/M2)',
    playersCount: '12–16 Spieler (2 parallele Wellen, Wechsel alle 20 Sek.)',
    dimensionsU15: {
      base: '22 × 16 m Doppelspur-RAMP-Arena + 2 Minitore',
      intensive: '20 × 14 m Doppelspur-RAMP-Arena + 2 Minitore',
    },
    timingU15: '3 progressive Phasen × 2,5 Min. | Pause: 45 Sek.',
    problemInGame: 'Spieler können zwar geradeaus sprinten, überlaufen aber bei scharfem Abbremsen und 90°-Richtungswechseln den Ball oder riskieren Knie-/Hamstringverletzungen.',
    attackGoal: 'Zwei Angreifer (A1 & A2) sprinten gleichzeitig mit Ball in ihre zentralen Bremstore, stoppen mit 3 tiefen exzentrischen Bremsschritten scharf ab, schneiden weg von D1/D2 und treffen in die Minitore (M1/M2).',
    defenseGoal: 'Phase 1–3 Körperstabilität & Explosivität: Saubere Mehrschritt-Abbremsmechanik (Hüfte tief, stabile Beinachse) in Phase 1–2 beherrschen und in Phase 3 das 100 % reaktive 1gg1-Sprintduell gewinnen.',
    scoringRule: 'Phase 3 Wettkampf: A1 und A2 erzielen +2 Punkte, wenn sie am Mittellinien-Tor scharf abbremsen, wegschneiden und vor D1/D2 in Minitor M1 oder M2 treffen (+3 Punkte beim Kreuzen in das gegenüberliegende Minitor!).',
    coachingCues: [
      'Abbremsen ist deine Waffe für 1,5 m Trennung: Mache 3 kurze, tiefe Bremsschritte, um die Hüfte abzusenken, BEVOR du den äußeren Stemmfuß setzt!',
      'Halte das Knie beim Stemmschritt exakt über der zweiten Fußspitze — drück den Boden aktiv weg und jage den Abschluss ins Minitor!',
    ],
    progressions: [
      { level: 'Phase 1 (Leichter Einstieg • Doppelspur-Steigerungslauf & 3-Schritt-Abbremsen)', desc: 'Welle 1 (A1/D1 links, A2/D2 rechts) führt den Ball bei 70 % Tempo zu den zentralen Bremstoren, übt sauberes 3-Schritt-Abbremsen mit tiefer Hüfte und Welle 2 (A3/D3, A4/D4) folgt sofort.' },
      { level: 'Phase 2 (Progression • Pfiff-Bremsstopp im Tor + 45°-Stemmschritt-Cut)', desc: 'Antritt mit 85 %: Auf Trainerpfiff im zentralen Bremstor 2 Sek. tiefer Abbrems-Freeze, dann druckvoller Stemmschritt über das Außenbein nach außen in Zone 2.' },
      { level: 'Phase 3 (Spitzenintensität • Doppelspur 100 % Reaktives 1gg1-Rennen auf M1/M2)', desc: '100 % RAMP-Potenzierung: Beide Spuren starten gleichzeitig; A1 und A2 bremsen im Tor explosiv ab, lassen D1/D2 ins Leere laufen und schießen in die Minitore M1 und M2 (+2 Pkt.)!' },
    ],
    diagram: buildActivationDiagram('act-10', '22×16 m Doppelspur-RAMP-Brems- & 1gg1-Arena (2 Minitore)', [
      {
        title: 'Phase 1: Synchroner Doppelspur-Antritt & 3-Schritt-Abbremsmechanik',
        desc: 'Zwei Paare (A1/D1 links, A2/D2 rechts) starten gleichzeitig bei 70 % Tempo aus Zone 1 zu den beiden zentralen Bremstoren, während Welle 2 (A3/D3, A4/D4) direkt dahinter bereitsteht.',
        passLabels: [],
        movementLabels: ['A1 Ballführung + 3-Schritt-Bremse', 'D1 Spiegel-Abbremsen', 'A2 Ballführung + 3-Schritt-Bremse', 'D2 Spiegel-Abbremsen'],
      },
      {
        title: 'Phase 2: Exzentrischer Mitteltor-Stopp & Explosiver 45°-Stemmschritt-Cut',
        desc: 'In der grünen Bremszone fangen A1 und A2 ihr Tempo mit stabiler Beinachse ab, setzen den inneren/äußeren Stemmfuß und schneiden scharf nach außen in Zone 2.',
        passLabels: [],
        movementLabels: ['A1 tiefer Stopp + 45°-Cut links!', 'D1 reaktiver Brems-Plant', 'A2 tiefer Stopp + 45°-Cut rechts!', 'D2 reaktiver Brems-Plant'],
      },
      {
        title: 'Phase 3: Doppelspur 100 % Reaktiver 1gg1-Ausbruch & Minitor-Abschluss (+2 Pkt.)',
        desc: 'Durch den scharfen Brems-Cut am Tor gewinnen A1 und A2 1,5 m Vorsprung, explodieren in Zone 2 und treffen in die Minitore M1 und M2, während Welle 2 (A3/A4) nachstartet!',
        passLabels: ['A1 trifft in Minitor M1 (+2)', 'A2 trifft in Minitor M2 (+2)'],
        movementLabels: ['D1 Verfolgungssprint', 'D2 Verfolgungssprint', 'Welle 2 (A3) startet nach', 'Welle 2 (A4) startet nach'],
      },
    ]),
  },
];

// ============================================================================
// 4. 10 ACTIVATION DRILLS — RUSSIAN (ACTIVATIONS_RU)
// ============================================================================

export const ACTIVATIONS_RU: RondoItem[] = [
  {
    id: 'act-1',
    number: '1.1',
    title: 'Командная арена Coerver и Funino (4 мини-ворот): Чувство мяча и прорыв 1v1',
    shortTitle: 'Арена Coerver (4 мини-ворот)',
    category: 'mastery',
    categoryName: 'Чувство мяча и финты 1v1',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    format: 'Вся команда в 1 квадрате (1 мяч у каждого + 4 внутренних ворот + 4 мини-ворот по периметру)',
    playersCount: '12–16 игроков одновременно в 1 квадрате',
    dimensionsU15: {
      base: '20 × 20 м Командная арена (4 мини-ворот + 4 ворот из фишек)',
      intensive: '18 × 18 м Командная арена',
    },
    timingU15: '3 прогрессивные фазы × 3 мин | Отдых: 30 сек',
    problemInGame: 'В первые 10 минут тренировки игроки смотрят только вниз на мяч, теряют ориентацию в плотном трафике всей команды и делают финты на прямых ногах.',
    attackGoal: 'Все 12–16 игроков одновременно ведут свои мячи внутри квадрата 20×20 м, проходят через 4 внутренних цветных ворот с финтами (V-cut, La Croqueta, разворот Кройфа) и в Фазе 3 завершают в 4 внешних мини-ворот (M1–M4).',
    defenseGoal: 'Фаза 2–3 Сила корпуса и взрыв: опускать центр тяжести перед каждыми внутренними воротами, по свистку фиксировать 2-секундный баланс на одной ноге (ось колена FIFA 11+) и в Фазе 3 активно охотиться за мячами.',
    scoringRule: 'Фаза 3 Соревнование: +1 очко за каждые пройденные внутренние ворота + 2 очка за гол в любые из 4 внешних мини-ворот (M1–M4) мимо 2–3 центральных охотников.',
    coachingCues: [
      'Вся команда работает в одном квадрате: поднимай голову перед каждыми внутренними воротами — если створ занят, мгновенно уходи через La Croqueta к свободным воротам!',
      'Опусти таз перед финтом: поставь внешнюю опорную ногу широко, по свистку замри в балансе на 1 ноге, а в Фазе 3 на 100% скорости завершай в открытые мини-ворота!',
    ],
    progressions: [
      { level: 'Фаза 1 (Лёгкий вход • Командное чувство мяча через 4 внутренних ворот на 65%)', desc: 'Все 12–16 игроков одновременно ведут мячи в квадрате 20×20 м, проходят через 4 внутренних цветных ворот с перекатами подошвой и V-cuts + динамическая мобилизация таза.' },
      { level: 'Фаза 2 (Прогрессия • Двойной финт в воротах + Стоп-баланс FIFA 11+ на 1 ноге)', desc: 'В каждых внутренних воротах резкий двойной финт (переступ / La Croqueta) с взрывным выходом; по свистку тренера — 2-секундная фиксация посадки на одной ноге (колено над носком).' },
      { level: 'Фаза 3 (Пик интенсивности • 2–3 живых охотника + Завершение в 4 мини-ворот)', desc: '2–3 защитника (D1/D2) оставляют мячи и охотятся в центре: атакующие должны пройти внутренние ворота с финтом и пробить в любые из 4 внешних мини-ворот (M1–M4)!' },
    ],
    diagram: buildActivationDiagram('act-1', '20×20 м Командная арена Coerver и Funino (4 мини-ворот)', [
      {
        title: 'Фаза 1: Одновременный командный дриблинг через 4 внутренних цветных ворот',
        desc: 'Вся команда (12–16 игроков, на схеме A1–A6 и D1–D2, каждый со своим мячом) двигается на 65% темпа внутри квадрата 20×20 м, выполняя V-cuts через 4 внутренних ворот.',
        passLabels: [],
        movementLabels: ['A1 V-cut через ворота 1', 'A2 La Croqueta через ворота 2', 'A5 перекат подошвой в ворота 3', 'A6 срез в ворота 4'],
      },
      {
        title: 'Фаза 2: Взрывной финт во внутренних воротах + Стабилизация на одной ноге',
        desc: 'По визуальному сигналу игроки делают резкий финт через ближайшие внутренние ворота и по свистку замирают на 2 секунды в низкой стойке на одной ноге (ось колена FIFA 11+).',
        passLabels: [],
        movementLabels: ['Финт + баланс на 1 ноге (Ворота 1)', 'Финт + баланс на 1 ноге (Ворота 2)', 'Взрывной выход (Ворота 3)', 'Взрывной выход (Ворота 4)'],
      },
      {
        title: 'Фаза 3: Живые охотники (D1/D2) и завершение на 100% в 4 мини-ворот (M1–M4)',
        desc: 'Охотники D1 и D2 активно прессингуют в центре: A1 и A6 обыгрывают через верхние внутренние ворота и точно бьют низом во внешние мини-ворота M1 и M2 (+2 очка)!',
        passLabels: ['A1 удар в мини-ворота M1 (+2)', 'A6 удар в мини-ворота M2 (+2)'],
        movementLabels: ['D1 прессингует левый сектор', 'D2 прессингует правый сектор', 'A5 прорывается к мини-воротам M3'],
      },
    ]),
  },

  {
    id: 'act-2',
    number: '1.2',
    title: 'Командная зеркальная линия DFB: Синхронные финты и гонка в 4 мини-ворот',
    shortTitle: 'Зеркальная линия DFB (4 мини-ворот)',
    category: 'mastery',
    categoryName: 'Чувство мяча и финты 1v1',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    format: 'Вся команда (6–8 пар одновременно вдоль одной 22-метровой линии + 4 угловых мини-ворот)',
    playersCount: '12–16 игроков (6–8 пар одновременно)',
    dimensionsU15: {
      base: '24 × 16 м Командный коридор + 4 внешних мини-ворот',
      intensive: '22 × 14 м Командный коридор + 4 внешних мини-ворот',
    },
    timingU15: '3 прогрессивные фазы × 3 мин | Отдых: 30 сек',
    problemInGame: 'Вингеры и полузащитники заранее выдают направление дриблинга и не обладают обманным движением корпуса и силой низкой посадки, чтобы качнуть плотного опекуна.',
    attackGoal: 'Все пары одновременно работают вдоль центральной зеркальной линии, раскачивают партнёра обманными финтами корпуса (переступ, уход плечом, V-cut) и в Фазе 3 врываются на удар в 4 внешних мини-ворот (M1–M4).',
    defenseGoal: 'Фаза 2–3 Сила корпуса и взрыв: держать низкую атлетическую стойку на передней части стопы, гасить боковые срезы без завала колен внутрь и в Фазе 3 перекрывать линию удара в мини-ворота.',
    scoringRule: 'Фаза 3 Соревнование: Атакующие (A1–A4) получают +2 очка за гол в верхние мини-ворота (M1/M2); если защитник-тень (S1–S4) отбирает мяч, он мгновенно контратакует в нижние мини-ворота (M3/M4)!',
    coachingCues: [
      'Продай обман сначала глазами и плечами — стопа и мяч уходят в другую сторону на долю секунды позже!',
      'Сиди низко в коленях вдоль центральной линии: кто выпрямил ноги — тот проиграл первый шаг к мини-воротам!',
    ],
    progressions: [
      { level: 'Фаза 1 (Лёгкий вход • Синхронный зеркальный ритм всей команды на 65%)', desc: 'Все 6–8 пар стоят друг напротив друга вдоль центральной линии фишек: атакующие выполняют перекаты подошвой и боковые смещения, а партнёры зеркально повторяют каждое движение.' },
      { level: 'Фаза 2 (Прогрессия • Двойной финт + Низкая эксцентрическая фиксация стойки)', desc: 'Атакующие делают 2 быстрых переступа + боковой срез и замирают в низком выпаде на 2 секунды, пока партнёр-тень зеркально фиксирует торможение.' },
      { level: 'Фаза 3 (Пик интенсивности • Реактивная дуэль 1v1 с ударом в 4 мини-ворот)', desc: 'Атакующие взрываются в любой момент: качнуть опекуна ложным выпадом на линии, уйти в открытый коридор и пробить в мини-ворота M1 или M2 до блока!' },
    ],
    diagram: buildActivationDiagram('act-2', '24×16 м Командная зеркальная линия DFB и 4 мини-ворот', [
      {
        title: 'Фаза 1: Синхронная зеркальная работа с мячом вдоль общей средней линии',
        desc: 'Все пары команды (A1/S1 — A4/S4, у каждого свой мяч) двигаются синхронно вдоль центральной оси: A1–A4 меняют ритм касаний, а S1–S4 зеркалят работу ног и таза.',
        passLabels: [],
        movementLabels: ['A1 боковой зеркальный ритм', 'S1 зеркалит работу стоп', 'A3 синхронные срезы', 'S3 зеркалит посадку таза'],
      },
      {
        title: 'Фаза 2: Двойной переступ + Низкая эксцентрическая фиксация стойки',
        desc: 'По всей длине линии A1–A4 выполняют резкий переступ с боковым срезом; атакующие и их партнёры одновременно садятся в низкую стабильную стойку (контроль оси колена).',
        passLabels: [],
        movementLabels: ['A1 двойной срез + низкий стоп', 'S1 реактивный зеркальный упор', 'A4 взрывной боковой срез'],
      },
      {
        title: 'Фаза 3: Взрывной отрыв 1v1 и завершение в мини-ворота M1/M2 (+2 очка)',
        desc: 'A1 и A4 укладывают опекунов ложным уклоном корпуса, на 100% скорости уходят во фланги и поражают мини-ворота M1 и M2, пока S1 летит в подкат!',
        passLabels: ['A1 гол в мини-ворота M1 (+2)', 'A4 гол в мини-ворота M2 (+2)'],
        movementLabels: ['A1 100% рывок влево', 'S1 скоростное преследование', 'A4 100% рывок вправо'],
      },
    ]),
  },

  {
    id: 'act-3',
    number: '2.1',
    title: 'Звезда SFV и квадрат с 4 мини-воротами: Приём в движение с 2 мячами',
    shortTitle: 'Звезда SFV (4 мини-ворот • 2 мяча)',
    category: 'first_touch',
    categoryName: 'Первое касание и приём в движение',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    format: '4 угловые группы подающих (по 2–3 чел.) + 2 принимающих в центре + 2 защитника + 4 мини-ворот',
    playersCount: '12–16 игроков вместе (2 мяча одновременно)',
    dimensionsU15: {
      base: '20 × 20 м внешний квадрат + 6 × 6 м центральная звезда SFV',
      intensive: '18 × 18 м внешний квадрат + 5 × 5 м центральная звезда SFV',
    },
    timingU15: '3 прогрессивные фазы × 3 мин | Отдых: 30 сек',
    problemInGame: 'Игроки останавливают мяч на месте под подошву перед тем, как поднять голову, теряя 1.5 секунды темпа и позволяя прессингу накрыть себя в центре поля.',
    attackGoal: 'При одновременном движении 2 мячей сканировать пространство через плечо, открывать таз (Perfilación) и первым касанием (Mitnahme) выходить из центральной звезды на угловых игроков или в 4 мини-ворот (M1–M4).',
    defenseGoal: 'Фаза 2–3 Сила корпуса и взрыв: в Фазе 2 держать жёсткий кор против контакта в плечо/спину от D1/D2, а в Фазе 3 взрывным первым касанием уходить на удар в 4 мини-ворот.',
    scoringRule: 'Фаза 3 Соревнование: +2 очка за каждый взрывной уход первым касанием из звезды 6×6 м с точным ударом вторым касанием в любые из 4 угловых мини-ворот (M1–M4) до блока от D1/D2.',
    coachingCues: [
      'Золотое правило SFV: никогда не останавливай мяч мёртво под подошвой! Твоё первое касание — это твой первый шаг из центральной звезды!',
      'В игре сразу 2 мяча: дважды просканируй через плечо ДО приёма — оцени позицию и второго центрального игрока, и защитника за спиной!',
    ],
    progressions: [
      { level: 'Фаза 1 (Лёгкий вход • Синхронный приём 2 мячей дальней ногой на 70%)', desc: 'Угловые A1 и A4 одновременно пасуют внутрь звезды 6×6 м на N1 и N2; оба открывают таз, первым касанием выходят из звезды в свободную зону, пасуют на A2/A3 и меняются по цепочке.' },
      { level: 'Фаза 2 (Прогрессия • Сила кора при контакте в плечо/спину от D1/D2)', desc: 'Преследователи D1 и D2 дают дозированный силовой контакт в плечо в момент приёма: N1 и N2 опускают центр тяжести, включают кор и первым касанием уходят от давления.' },
      { level: 'Фаза 3 (Пик интенсивности • 100% живой прессинг и удар в 4 мини-ворот)', desc: 'D1 и D2 атакуют на 100% в момент паса: N1 и N2 обязаны первым касанием вырваться из звезды 6×6 м и вторым касанием пробить в открытые угловые мини-ворота (M1–M4)!' },
    ],
    diagram: buildActivationDiagram('act-3', '20×20 м Звезда первого касания SFV + 4 угловых мини-ворот (2 мяча)', [
      {
        title: 'Фаза 1: Одновременный ввод 2 мячей и направленный приём дальней ногой',
        desc: 'Из противоположных углов A1 и A4 одновременно идут 2 паса внутрь звезды 6×6 м на N1 и N2. Оба заранее открывают таз и первым касанием уводят мячи в свободные коридоры.',
        passLabels: ['Мяч 1: Входной пас A1 → N1', 'Мяч 2: Входной пас A4 → N2'],
        movementLabels: ['N1 приём в движение вправо', 'N2 приём в движение влево'],
      },
      {
        title: 'Фаза 2: Стабилизация кора против давления со спины (D1/D2) и выход пасом',
        desc: 'В момент приёма обоих мячей D1 и D2 оказывают плотное давление в плечо. N1 и N2 держат баланс за счёт кора и вторым касанием отдают чёткие передачи на A2 и A3.',
        passLabels: ['N1 чёткий пас на A2', 'N2 чёткий пас на A3'],
        movementLabels: ['D1 контакт в плечо N1', 'D2 контакт в плечо N2'],
      },
      {
        title: 'Фаза 3: Взрывной уход от 100% прессинга и удар в 4 мини-ворот (+2 очка)',
        desc: 'D1 и D2 на полной скорости летят в отбор: N1 и N2 взрывным первым касанием уходят из-под прессинга и вторым касанием поражают угловые мини-ворота M2 и M3!',
        passLabels: ['N1 удар в мини-ворота M2 (+2)', 'N2 удар в мини-ворота M3 (+2)'],
        movementLabels: ['D1 живой рывок в отбор', 'D2 живой рывок в отбор'],
      },
    ]),
  },

  {
    id: 'act-4',
    number: '2.2',
    title: 'Двойная Y-схема приёма и разворота (#6/#8) на большие ворота и 2 мини-ворот',
    shortTitle: 'Двойная Y-схема (Большие ворота)',
    category: 'first_touch',
    categoryName: 'Первое касание и приём в движение',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    format: 'Синхронная двойная Y-схема с 1 большими воротами (с вратарём) + 2 мини-воротами для контратаки',
    playersCount: '12–16 игроков (2 мяча одновременно + вратарь)',
    dimensionsU15: {
      base: '24 × 18 м Двойная Y-схема перед большими воротами',
      intensive: '22 × 16 м Двойная Y-схема перед большими воротами',
    },
    timingU15: '3 прогрессивные фазы × 3 мин | Отдых: 35 сек',
    problemInGame: 'Центральные полузащитники (#6/#8) принимают мяч с закрытым корпусом (спиной к чужим большим воротам) и отыгрывают назад даже тогда, когда можно развернуться и обострить.',
    attackGoal: 'Два центральных полузащитника (N1 и N2) синхронно отскакивают под углом 45°, сканируют через плечо, разворачиваются с мячом и выводят крайних игроков (L/R) через ворота из фишек на удар по большим воротам.',
    defenseGoal: 'Фаза 2–3 Сила корпуса и взрыв: D1 и D2 меняют угол давления со спины на N1/N2; в случае перехвата D1/D2 мгновенно контратакуют в двое нижних мини-ворот (M1/M2).',
    scoringRule: 'Фаза 3 Соревнование: +2 очка за разворот в центре + проникающий пас через фланговые ворота и гол вратарю в большие ворота; +2 очка защитникам D1/D2 за отбор и гол в мини-ворота M1/M2.',
    coachingCues: [
      'Отскакивай под углом 45°, чтобы одним взглядом видеть и подающего (A1/A2), и бёдра защитника (D1/D2) у себя за спиной!',
      'Если защитник даёт пространство — открывай дальнее бедро и кати к большим воротам; если висит на спине — ставь предплечье-сенсор и крути его на первом касании!',
    ],
    progressions: [
      { level: 'Фаза 1 (Лёгкий вход • Синхронный разворот 2 мячей и завершение в большие ворота)', desc: 'A1 и A2 одновременно пасуют на N1 (#6) и N2 (#8); оба на 70% темпа открываются дальней ногой, разрезают фланговые ворота на L/R с завершением по большим воротам с вратарём.' },
      { level: 'Фаза 2 (Прогрессия • Чтение плеча D1/D2 и защита мяча корпусом)', desc: 'D1 и D2 смещаются к одному из плеч N1/N2 во время качения мяча: опорные обязаны просканировать манёвр, поставить предплечье-сенсор и увести 1-е касание в свободный коридор.' },
      { level: 'Фаза 3 (Пик интенсивности • Живой прессинг 1v1 на большие ворота против мини-ворот)', desc: 'D1 и D2 прессингуют на 100% со спины: N1/N2 должны развернуть опекунов первым касанием и разогнать атаку на большие ворота — а при потере мгновенно закрыть мини-ворота M1/M2!' },
    ],
    diagram: buildActivationDiagram('act-4', '24×18 м Двойная Y-схема с большими воротами (ВР) и 2 мини-воротами', [
      {
        title: 'Фаза 1: Синхронный приём вполоборота (#6/#8) и атака на большие ворота',
        desc: 'Подающие A1 и A2 одновременно играют на N1 (#6) и N2 (#8). Оба открывают таз, разрезающим пасом через фланговые ворота выводят L и R, и L наносит удар в большие ворота.',
        passLabels: ['Мяч 1: A1 → N1 (#6)', 'Мяч 2: A2 → N2 (#8)', 'Проникающий пас N1 → L и удар в большие ворота'],
        movementLabels: ['N1 открывает таз под 45°', 'N2 открывает таз под 45°'],
      },
      {
        title: 'Фаза 2: Сканирование угла атаки D1/D2 и уход первым касанием с работой кора',
        desc: 'Пока катятся передачи, D1 и D2 накрывают внутреннее плечо. N1 и N2 считывают давление боковым зрением, ставят защитную руку и первым касанием выводят мяч во фланговые ворота.',
        passLabels: ['N1 пас через левые ворота на L', 'N2 пас через правые ворота на R'],
        movementLabels: ['D1 закрывает внутреннее плечо', 'D2 закрывает внутреннее плечо'],
      },
      {
        title: 'Фаза 3: Взрывной разворот под 100% прессингом и удар в большие ворота (+2 очка)',
        desc: 'N1 и N2 взрывным разворотом уходят от плотного контакта D1/D2 и выводят L/R один на один с вратарём (GK) — пока D1/D2 охотятся за перехватом для контратаки в мини-ворота M1/M2!',
        passLabels: ['L бьёт мимо вратаря в большие ворота (+2)', 'N2 выводит R на удар (+1)'],
        movementLabels: ['N1 взрывной разворот с плеча', 'D1/D2 живое преследование'],
      },
    ]),
  },

  {
    id: 'act-5',
    number: '3.1',
    title: 'Квадрат 4 зон (Поиск свободных зон) с 4 угловыми мини-воротами',
    shortTitle: 'Поиск свободных зон (4 мини-ворот)',
    category: 'dribbling_space',
    categoryName: 'Дриблинг и поиск свободных зон',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    format: '4 квадранта внутри площадки 20×20 м + 4 угловых мини-ворот (M1–M4)',
    playersCount: '12–16 игроков вместе (4–5 мячей в движении)',
    dimensionsU15: {
      base: '20 × 20 м, разделённый на 4 зоны (по 10 × 10 м) + 4 мини-ворот',
      intensive: '18 × 18 м, разделённый на 4 зоны (по 9 × 9 м) + 4 мини-ворот',
    },
    timingU15: '3 прогрессивные фазы × 3 мин | Отдых: 30 сек',
    problemInGame: 'Игроки сбиваются в кучу вокруг мяча вместо того, чтобы заранее увидеть свободную зону и ворваться в неё за счёт резкой смены ритма (Freilaufen & Raumgewinn).',
    attackGoal: 'Непрерывно сканировать все 4 квадранта во время ведения, мгновенно покидать перегруженные зоны и в Фазе 3 поражать угловые мини-ворота (M1–M4) из свободного квадранта.',
    defenseGoal: 'Фаза 2–3 Сила корпуса и взрыв: сочетать резкое торможение на границах зон с взрывным 3-шаговым стартом в пустой квадрат против 2 живых охотников (D1/D2).',
    scoringRule: 'Фаза 3 Соревнование: Гол в любые из 4 угловых мини-ворот (M1–M4) приносит +2 очка — но засчитывается ТОЛЬКО из того квадранта, где в этот момент нет защитника (D1/D2)!',
    coachingCues: [
      'Никогда не веди мяч туда, где уже собрались три партнёра — подними голову, найди пустой квадрант и ворвись туда со сменой темпа!',
      'В Фазе 3 мини-ворота в зонах защитников D1 и D2 закрыты: быстро переведи мяч пасом или дриблингом в свободный квадрант и бей в открытые мини-ворота!',
    ],
    progressions: [
      { level: 'Фаза 1 (Лёгкий вход • Командное ведение и захват пустого квадранта)', desc: 'Все 12–16 игроков двигаются с 5–6 мячами на 65–70% темпа через 4 квадранта: как только зона перегружается, следует взрывной 3-шаговый переход в свободный квадрат.' },
      { level: 'Фаза 2 (Прогрессия • Пас, стоп-шаг на границе и рывок в свободную зону)', desc: 'Отдай пас партнёру, выполни низкий стоп-шаг на осевой линии и рвани без мяча в пустой квадрант под обратную передачу.' },
      { level: 'Фаза 3 (Пик интенсивности • 2 охотника + Завершение в свободные мини-ворота)', desc: 'D1 и D2 перекрывают по одному квадранту: атакующие должны за 3 сек ворваться в свободную от защитника зону и забить в угловые мини-ворота (M1–M4) (+2 очка)!' },
    ],
    diagram: buildActivationDiagram('act-5', '20×20 м Площадка из 4 квадрантов + 4 угловых мини-ворот', [
      {
        title: 'Фаза 1: Сканирование и рывок с мячом в пустой квадрант (Верхний правый)',
        desc: 'Когда несколько игроков скапливаются в верхнем левом квадранте, A2 поднимает голову, видит подсвеченную пустую зону справа вверху и ускоряется туда с мячом.',
        passLabels: [],
        movementLabels: ['A2 взрывной рывок в свободную зону!', 'N1 балансирует заполнение квадратов'],
      },
      {
        title: 'Фаза 2: Вертикальный пас, стоп-шаг и ротация в открытый квадрант',
        desc: 'A2 отдаёт вертикальный пас через осевую линию на A4, а A3 считывает ротацию и открывается в свободный нижний левый квадрант, пока D1 и D2 сжимают центр.',
        passLabels: ['Вертикальный пас A2 → A4'],
        movementLabels: ['A3 врывается в свободный нижний левый квадрат', 'D1 патрулирует центр'],
      },
      {
        title: 'Фаза 3: Перевод в свободные квадранты и удар в мини-ворота (+2 очка)',
        desc: 'Пока D1 и D2 накрывают правые квадранты, A4 выводит A3 (внизу слева), а A1 выводит N1 (вверху справа) на чистые удары в открытые мини-ворота M3 и M2!',
        passLabels: ['A4 → A3 удар в мини-ворота M3 (+2)', 'A1 → N1 удар в мини-ворота M2 (+2)'],
        movementLabels: ['A3 врывается под удар в M3!', 'D1 атакует A4 в правом секторе'],
      },
    ]),
  },

  {
    id: 'act-6',
    number: '3.2',
    title: 'Прорыв через 3 ворот на средней линии: Смена темпа и удар в 2 мини-ворот',
    shortTitle: 'Прорыв через 3 ворот (2 мини-ворот)',
    category: 'dribbling_space',
    categoryName: 'Дриблинг и поиск свободных зон',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    format: '2 зоны + 3 цветных ворот на средней линии + 2 верхних мини-ворот (волны по 3 игрока)',
    playersCount: '12–16 игроков (волны по 3 атакующих + 2 защитника на линии)',
    dimensionsU15: {
      base: '24 × 16 м Двухзонная арена прорыва (3 ворот на линии + 2 мини-ворот)',
      intensive: '22 × 14 м Двухзонная арена прорыва',
    },
    timingU15: '3 прогрессивные фазы × 3.5 мин | Отдых: 35 сек',
    problemInGame: 'Когда перед центральным защитником или опорным открывается свободный коридор, они делают медленный пас поперёк вместо того, чтобы прорезать линию прессинга на ведении.',
    attackGoal: 'Волнами по 3 игрока (A1, A2, A3) вести мяч в Зоне 1, считывать, какие 2 из 3 ворот на средней линии перекрыты защитниками D1/D2, взрываться через свободные ворота в Зону 2 и забивать в мини-ворота (M1/M2).',
    defenseGoal: 'Фаза 2–3 Сила корпуса и взрыв: выдерживать боковой контакт плечо-в-плечо от защитников D1/D2 в створе средних ворот на полной скорости, не теряя шага и равновесия.',
    scoringRule: 'Фаза 3 Соревнование: +2 очка каждому атакующему, который прорвался с мячом через одни из 3 средних ворот и забил в мини-ворота M1 или M2; +1 очко за пас на пустые ворота партнёру.',
    coachingCues: [
      '3 атакующих против 2 защитников на 3 воротах средней линии: одни из 3 ворот ВСЕГДА свободны — подними голову в Зоне 1 и взорвись в открытое окно!',
      'Когда D1/D2 идут в стык плечом в воротах — опусти ближнее бедро, включи кор и продави линию на максимальной скорости!',
    ],
    progressions: [
      { level: 'Фаза 1 (Лёгкий вход • Ритм тройками и синхронный прорыв через 3 ворот)', desc: 'Волны по 3 игрока (A1, A2, A3) ведут мячи в Зоне 1 на 65% темпа, по сигналу синхронно ускоряются через 3 цветных ворот на средней линии в Зону 2, и тут же стартует Волна 2 (A4–A6).' },
      { level: 'Фаза 2 (Прогрессия • Силовой контакт плечо-в-плечо в воротах средней линии)', desc: 'Защитники D1 и D2 оказывают дозированное боковое давление плечом в створе средних ворот: атакующие держат удар кором и без потери скорости выходят в Зону 2.' },
      { level: 'Фаза 3 (Пик интенсивности • Живой прорыв 3v2 через линию + Удар в M1/M2)', desc: 'D1 и D2 защищают 3 ворот на средней линии на 100%: A1–A3 должны показать ложный уход, ворваться в свободные ворота и поразить верхние мини-ворота M1/M2 (+2 очка)!' },
    ],
    diagram: buildActivationDiagram('act-6', '24×16 м Арена 3-коридорного прорыва (3 средних ворот + 2 мини-ворот)', [
      {
        title: 'Фаза 1: Синхронная волна из 3 игроков и смена темпа через 3 средних ворот',
        desc: 'Волна 1 (A1, A2, A3) плавно контролирует мячи в Зоне 1 и резко ускоряется через все 3 цветных ворот на средней линии в Зону 2, пока Волна 2 (A4–A6) готовится к старту.',
        passLabels: [],
        movementLabels: ['A1 рывок через левые ворота', 'A2 рывок через центральные ворота', 'A3 рывок через правые ворота'],
      },
      {
        title: 'Фаза 2: Силовая устойчивость при контакте плечом на средней линии',
        desc: 'Когда A1–A3 проходят через ворота на средней линии, D1 и D2 вступают в плотный контакт плечо-в-плечо. Атакующие включают кор, держат баланс и вырываются в Зону 2.',
        passLabels: [],
        movementLabels: ['A1 прорыв сквозь контакт плечом!', 'A2 взрывной проход по центру', 'A3 прорыв по правому краю', 'D1 боковое давление у ворот'],
      },
      {
        title: 'Фаза 3: Живой прорыв линии и точный удар в мини-ворота M1/M2 (+2 очка)',
        desc: 'Прорвавшись через открытые ворота в Зону 2 на 100% скорости, A1 и A3 стабилизируют опорный шаг и точно бьют низом в верхние мини-ворота M1 и M2!',
        passLabels: ['A1 гол в мини-ворота M1 (+2)', 'A3 гол в мини-ворота M2 (+2)'],
        movementLabels: ['A2 поддерживает атаку вторым темпом', 'D1 преследует в Зоне 2'],
      },
    ]),
  },

  {
    id: 'act-7',
    number: '4.1',
    title: 'Двойной ромб «Барселоны» (Rueda de Pases): Синхронный «третий лишний» с 2 мячами',
    shortTitle: 'Ромб Барселоны (2 мяча синхронно)',
    category: 'passing_scanning',
    categoryName: 'Пас, сканирование и комбинаторика',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    format: 'Большой командный ромб (4 вершины + двойной центр #6/#8 + 2 мини-ворот + 2 мяча)',
    playersCount: '12–16 игроков вместе в 1 большом ромбе (2 мяча одновременно)',
    dimensionsU15: {
      base: '20 × 20 м Командный ромб + 2 мини-ворот',
      intensive: '18 × 18 м Командный ромб + 2 мини-ворот',
    },
    timingU15: '3 прогрессивные фазы × 3 мин | Отдых: 30 сек',
    problemInGame: 'Передачи идут слишком слабо или под неудобную ногу, а игроки любуются своим пасом вместо мгновенного рывка под стенку (Pared) или скидку на «третьего».',
    attackGoal: 'Синхронная циркуляция 2 мячей с нижней (A) и верхней (C) вершин ромба: хлесткие передачи под дальнюю ногу, стенка через двух центральных опорных (#6 и #8) и вывод «третьего» в касание.',
    defenseGoal: 'Фаза 2–3 Сила корпуса и взрыв: в Фазе 2 после каждого паса выполнять выпрыгивание со стабильным приземлением на две ноги (FIFA 11+); в Фазе 3 обыгрывать активного защитника D1 в центре.',
    scoringRule: 'Фаза 3 Соревнование (2 мяча одновременно): 16 безошибочных комбинаций «на третьего» за 90 секунд или прямое завершение в боковые мини-ворота (M1/M2), если D1 перекрыл возврат в вершину!',
    coachingCues: [
      'В одном ромбе одновременно ходят 2 мяча: отдавай плотный пас строго под дальнюю ногу — скорость твоего паса задаёт скорость следующего касания!',
      'Оба центральных опорных (#6 и #8) работают на разных диагоналях: после паса делай взрывной 3-шаговый старт и мягко гаси приземление согнутыми коленями!',
    ],
    progressions: [
      { level: 'Фаза 1 (Лёгкий вход • Синхронная циркуляция 2 мячей по ромбу на 70%)', desc: 'Мяч 1 стартует от A (A → B → C), Мяч 2 одновременно стартует от C (C → D → A): открытый приём дальней ногой на крыльях и переход за пасом без очередей для всех 12–16 игроков.' },
      { level: 'Фаза 2 (Прогрессия • Синхронная стенка через двух опорных #6 и #8 + Прыжок)', desc: 'A играет на B, который в 1 касание сбрасывает на #6 (пас на ход C); одновременно C играет на D, который сбрасывает на #8 (пас на ход A) + вертикальный прыжок в баланс после паса.' },
      { level: 'Фаза 3 (Пик интенсивности • Скоростная гонка 2 мячей + Защитник D1 и мини-ворота)', desc: 'Защитник D1 активно перекрывает одну из осей в центре: #6 и #8 обязаны просканировать его манёвр до приёма и в 1 касание вывести мяч в вершину или в мини-ворота (M1/M2)!' },
    ],
    diagram: buildActivationDiagram('act-7', '20×20 м Синхронный пасовый ромб ФК «Барселона» с 2 мячами', [
      {
        title: 'Фаза 1: Синхронная циркуляция 2 мячей по ромбу под дальнюю ногу',
        desc: 'Мяч 1 стартует снизу от A (A → B → C), а Мяч 2 одновременно стартует сверху от C (C → D → A). Все 12–16 игроков находятся в непрерывном движении.',
        passLabels: ['Мяч 1: Плотный пас A → B', 'Мяч 1: Открытый пас B → C', 'Мяч 2: Плотный пас C → D', 'Мяч 2: Открытый пас D → A'],
        movementLabels: ['A переходит на станцию B', 'C переходит на станцию D'],
      },
      {
        title: 'Фаза 2: Двойная комбинация «на третьего» через опорных (#6 и #8)',
        desc: 'Левый край B в 1 касание сбрасывает на #6 (вывод C), а правый край D синхронно сбрасывает на #8 (вывод A) — после чего следует прыжок со стабильным приземлением.',
        passLabels: ['Мяч 1: Скидка B → #6', 'Мяч 1: Пас в касание #6 → C', 'Мяч 2: Скидка D → #8', 'Мяч 2: Пас в касание #8 → A'],
        movementLabels: ['B взрывается за пасом', 'D взрывается за пасом'],
      },
      {
        title: 'Фаза 3: Выход в 1 касание мимо защитника D1 и удар в мини-ворота M1/M2',
        desc: 'Когда D1 перекрывает центральный коридор, #6 и #8 сканируют через плечо и в 1 касание направляют оба мяча мимо D1 на вершины или в мини-ворота M1/M2!',
        passLabels: ['Мяч 1: A → B → #6', 'Мяч 1: #6 выход в касание на C (+1)', 'Мяч 2: C → D → #8', 'Мяч 2: #8 выход в касание на A (+1)'],
        movementLabels: ['D1 перекрывает центральную ось', '#6/#8 смещаются по диагонали'],
      },
    ]),
  },

  {
    id: 'act-8',
    number: '4.2',
    title: 'Двойной квадрат «Аякса» (De Toekomst): Сканирование с 2 мячами и 4 мини-ворот',
    shortTitle: 'Двойной квадрат Аякса (4 мини-ворот)',
    category: 'passing_scanning',
    categoryName: 'Пас, сканирование и комбинаторика',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    format: '4 угловые группы + 2 центральных опорных (N1/N2) + 2 защитника (D1/D2) + 4 мини-ворот',
    playersCount: '12–16 игроков вместе (2 мяча одновременно)',
    dimensionsU15: {
      base: '20 × 20 м внешний квадрат + 7 × 7 м внутренний квадрат + 4 мини-ворот',
      intensive: '18 × 18 м внешний квадрат + 6 × 6 м внутренний квадрат + 4 мини-ворот',
    },
    timingU15: '3 прогрессивные фазы × 3.5 мин | Отдых: 40 сек',
    problemInGame: 'Центральные игроки смотрят только на летящий к ним мяч и не видят быструю связку между двумя опорными (#6 и #8) для разрезающего выхода из-под прессинга.',
    attackGoal: 'При одновременной работе 2 мячей комбинировать между внешними углами (1–4) и парой внутренних опорных (N1 и N2), сканировать через оба плеча и в Фазе 3 выводить мяч в 4 угловых мини-ворот (M1–M4).',
    defenseGoal: 'Фаза 2–3 Сила корпуса и взрыв: опорные выполняют резкие боковые торможения и смены углов внутри квадрата 7×7 м, а в Фазе 3 уходят от 2 живых защитников (D1/D2).',
    scoringRule: 'Фаза 3 Соревнование: +2 очка за каждую цепочку Угол → Опорный N1 → Опорный N2 → Гол в открытые угловых мини-ворота (M1–M4); +2 очка защитникам D1/D2 за перехват и гол!',
    coachingCues: [
      'Два опорных (N1 и N2): никогда не стойте на одной линии — всегда открывайтесь в разных диагональных окнах внутри квадрата 7×7 м!',
      'Сначала посмотри на дальний угол и мини-ворота, ПРЕЖДЕ чем вернуть взгляд на мяч: поворот головы рисует картину поля до первого касания!',
    ],
    progressions: [
      { level: 'Фаза 1 (Лёгкий вход • Синхронный приём вполоборота 2 мячей Угол → Опорный)', desc: '2 мяча одновременно стартуют из противоположных углов (3 и 2): пас внутрь на N1 и N2, которые на 70% темпа открываются дальней ногой и выводят мячи на углы 1 и 4.' },
      { level: 'Фаза 2 (Прогрессия • Связка двух опорных N1 ↔ N2 в 1 касание)', desc: 'Угол 3 играет на N1; N1 в 1 касание сбрасывает по диагонали партнёру N2 внутри малого квадрата, а тот разрезающим пасом находит Угол 2 + резкий боковой стоп-шаг.' },
      { level: 'Фаза 3 (Пик интенсивности • Живой прессинг D1/D2 и завершение в 4 мини-ворот)', desc: 'D1 и D2 активно охотятся внутри квадрата 7×7 м: N1 и N2 должны просканировать давление и в 1 касание вывести мяч в свободный угол или прямо в 4 угловых мини-ворот (M1–M4)!' },
    ],
    diagram: buildActivationDiagram('act-8', '20×20 м Двойной квадрат сканирования «Аякса» + 4 угловых мини-ворот', [
      {
        title: 'Фаза 1: Одновременный ввод 2 мячей и приём опорных с предсканированием',
        desc: 'Из противоположных углов 3 и 2 одновременно идут 2 передачи внутрь квадрата 7×7 м на N1 и N2. Оба сканируют через плечо и мягко переводят мячи на Угол 1 и Угол 4.',
        passLabels: ['Мяч 1: Угол 3 → N1', 'Мяч 1: N1 → Угол 1', 'Мяч 2: Угол 2 → N2', 'Мяч 2: N2 → Угол 4'],
        movementLabels: ['N1 открывается по диагонали и сканирует', 'N2 открывается на встречной диагонали'],
      },
      {
        title: 'Фаза 2: Связка двух опорных в 1 касание (N1 → N2 → Угол 2)',
        desc: 'N1 в 1 касание сбрасывает мяч поперёк внутреннего квадрата партнёру N2, который тут же прошивает диагональным разрезающим пасом внешний Угол 2.',
        passLabels: ['Скидка в 1 касание N1 → N2', 'Диагональный разрезающий пас N2 → Угол 2'],
        movementLabels: ['N2 открывает диагональное окно', 'D1 смещается в зону прикрытия'],
      },
      {
        title: 'Фаза 3: Выход из-под прессинга (D1/D2) и удар в мини-ворота M2/M3 (+2 очка)',
        desc: 'Когда D1 и D2 врываются во внутренний квадрат, N1 и N2 в 1 касание отыгрывают прессинг и точно поражают открытые угловые мини-ворота M2 и M3 за +2 очка!',
        passLabels: ['N2 выход в касание в мини-ворота M2 (+2)', 'N1 выход в касание в мини-ворота M3 (+2)'],
        movementLabels: ['D1 активно прессингует N2', 'D2 активно прессингует N1'],
      },
    ]),
  },

  {
    id: 'act-9',
    number: '5.1',
    title: 'Сила корпуса FIFA 11+ и SFV Mutig & Stark: Арена укрывания мяча с 4 мини-воротами',
    shortTitle: 'Сила корпуса и укрывание (4 мини-ворот)',
    category: 'biomotor_duels',
    categoryName: 'Сила корпуса, баланс и взрыв с мячом',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    format: '4 одновременные дуэли 1v1 в центре + 4 подающих по краям + 4 внешних мини-ворот',
    playersCount: '12–16 игроков вместе в 1 арене (4 мяча одновременно)',
    dimensionsU15: {
      base: '20 × 20 м Арена Mutig & Stark + 4 внешних мини-ворот',
      intensive: '18 × 18 м Арена Mutig & Stark + 4 внешних мини-ворот',
    },
    timingU15: '3 прогрессивные фазы × 2.5 мин | Отдых: 45 сек',
    problemInGame: 'Игроков легко оттесняют корпусом от мяча в силовых единоборствах 1v1, потому что они стоят на узких прямых ногах, заваливают колени и не ставят защитную руку.',
    attackGoal: '4 атакующих (A1–A4) одновременно принимают мячи в центре под плотным давлением защитников (B1–B4), якорят широкую низкую стойку укрывания и в Фазе 3 с разворота поражают 4 внешних мини-ворот (M1–M4).',
    defenseGoal: 'Фаза 1–3 Сила корпуса и взрыв: от стабилизации одноногих прыжков FIFA 11+ (Фаза 1) и 3-секундного силового укрывания (Фаза 2) до взрывного разворота с ударом в мини-ворота (Фаза 3).',
    scoringRule: 'Фаза 3 Соревнование: Атакующие (A1–A4) получают +2 очка за 3 сек укрывания мяча + разворот и гол во внешние мини-ворота (M1–M4); Защитники (B1–B4) получают +2 очка за чистый отбор и гол!',
    coachingCues: [
      'SFV Mutig & Stark: опусти таз, поставь ноги шире плеч, вставь корпус между соперником и мячом и держи мяч строго под ДАЛЬНЕЙ ногой!',
      'Используй согнутое предплечье как сенсор на груди защитника — как только он перенёс вес на одно плечо, прокатись по его спине и бей в открытые мини-ворота!',
    ],
    progressions: [
      { level: 'Фаза 1 (Лёгкий вход • Прыжки на одной ноге FIFA 11+ и баланс в парах)', desc: 'Все пары в квадрате 20×20 м выполняют боковые прыжки на одной ноге с 2-секундной фиксацией посадки (колено над носком) + лёгкие толчки плечо-в-плечо с контролем мяча подошвой.' },
      { level: 'Фаза 2 (Прогрессия • 4 одновременные 3-секундные дуэли укрывания мяча)', desc: 'По свистку в центр вводятся 4 мяча: A1–A4 садятся в низкую широкую стойку и чисто укрывают свои мячи дальней ногой 3 полные секунды против силового навала B1–B4.' },
      { level: 'Фаза 3 (Пик интенсивности • Живое укрывание 1v1 + Разворот и удар в 4 мини-ворот)', desc: 'После 2 секунд живой борьбы против B1–B4 атакующие A1–A4 делают взрывной разворот с плеча и на 100% скорости забивают в любые из 4 внешних мини-ворот (M1–M4) (+2 очка)!' },
    ],
    diagram: buildActivationDiagram('act-9', '20×20 м Арена силовой стабилизации FIFA 11+ и укрывания (4 мини-ворот)', [
      {
        title: 'Фаза 1: Стабилизация приземления на одну ногу FIFA 11+ и баланс с мячом',
        desc: 'Все 4 центральные пары (A1/B1 — A4/B4) и игроки периметра выполняют прыжки на одной ноге с 2-секундной фиксацией оси «колено над носком» и контролем мяча.',
        passLabels: [],
        movementLabels: ['A1 прыжок на 1 ноге + фиксация оси', 'A2 стабилизация колена', 'A3 баланс кора и голеностопа', 'A4 низкая атлетическая посадка'],
      },
      {
        title: 'Фаза 2: 4 одновременные 3-секундные дуэли силового укрывания мяча',
        desc: 'В зелёной зоне стабильности A1–A4 одновременно укрывают 4 мяча от плотного давления B1–B4 со спины: низкий таз, предплечье-сенсор и мяч строго под дальней стопой.',
        passLabels: [],
        movementLabels: ['B1 давление со спины vs укрывание A1', 'B2 давление со спины vs укрывание A2', 'B3 давление со спины vs укрывание A3', 'B4 давление со спины vs укрывание A4'],
      },
      {
        title: 'Фаза 3: Взрывной разворот с плеча и завершение во все 4 мини-ворот (+2 очка)',
        desc: 'Почувствовав навал B1–B4 на одно плечо, A1–A4 резко прокручиваются вокруг свободного бедра и забивают во все 4 внешних мини-ворот (M1, M2, M3 и M4)!',
        passLabels: ['A1 разворот и гол в мини-ворота M1 (+2)', 'A2 разворот и гол в мини-ворота M2 (+2)', 'A3 разворот и гол в мини-ворота M3 (+2)', 'A4 разворот и гол в мини-ворота M4 (+2)'],
        movementLabels: ['A1 взрывной уход с плеча', 'A2 взрывной уход с плеча'],
      },
    ]),
  },

  {
    id: 'act-10',
    number: '5.2',
    title: 'Двухкоридорная RAMP-арена торможения и гонки 1v1 в 2 мини-ворот',
    shortTitle: 'Двойной коридор RAMP 1v1 (2 мини-ворот)',
    category: 'biomotor_duels',
    categoryName: 'Сила корпуса, баланс и взрыв с мячом',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    format: '2 параллельных коридора разгона и торможения (2 пары стартуют синхронно + 2 мини-ворот M1/M2)',
    playersCount: '12–16 игроков (2 параллельные волны, смена каждые 20 сек)',
    dimensionsU15: {
      base: '22 × 16 м Двухкоридорная RAMP-арена + 2 мини-ворот',
      intensive: '20 × 14 м Двухкоридорная RAMP-арена + 2 мини-ворот',
    },
    timingU15: '3 прогрессивные фазы × 2.5 мин | Отдых: 45 сек',
    problemInGame: 'Игроки умеют бежать по прямой, но при резком торможении на высокой скорости и смене направления на 90° пролетают мимо мяча или перегружают связки колена.',
    attackGoal: 'Два атакующих (A1 и A2) синхронно разгоняются с мячами в центральные ворота торможения, гасят скорость 3 низкими стоп-шагами, уходят на противоходе от D1/D2 и поражают мини-ворота (M1/M2).',
    defenseGoal: 'Фаза 1–3 Сила корпуса и взрыв: отточить технику 3-шагового гашения скорости без завала колена в Фазах 1–2, а в Фазе 3 выиграть 100% реактивную скоростную дуэль 1v1.',
    scoringRule: 'Фаза 3 Соревнование: A1 и A2 получают +2 очка, если резко затормозят в средних воротах, срежут угол и забьют в мини-ворота M1 или M2 до подката D1/D2 (+3 очка за перекрёстный гол в дальние мини-ворота!).',
    coachingCues: [
      'Торможение — это оружие отрыва на 1.5 метра: сделай 3 частых низких тормозящих шага и опусти таз ДО того, как поставишь опорную ногу на срез!',
      'На стоп-шаге держи колено строго над вторым пальцем стопы — мощно оттолкни газон от себя и бей низом в мини-ворота!',
    ],
    progressions: [
      { level: 'Фаза 1 (Лёгкий вход • Синхронный разгон в 2 коридорах и 3-шаговое торможение)', desc: 'Волна 1 (A1/D1 слева, A2/D2 справа) ведёт мячи на 70% темпа к центральным воротам торможения, отрабатывая мягкую 3-шаговую остановку в низкой посадке, а Волна 2 (A3/D3, A4/D4) стартует следом.' },
      { level: 'Фаза 2 (Прогрессия • Стоп-фиксация в воротах по свистку + Срез под 45°)', desc: 'Разгон на 85%: по свистку тренера в центральных воротах 2-секундная фиксация низкой стойки торможения, затем мощный толчок опорной ногой наружу в Зону 2.' },
      { level: 'Фаза 3 (Пик интенсивности • 100% Реактивная гонка 1v1 в 2 коридорах на M1/M2)', desc: '100% RAMP-потенциация: обе пары стартуют одновременно; A1 и A2 резко бьют по тормозам в средних воротах, уходят от D1/D2 и расстреливают мини-ворота M1 и M2 (+2 очка)!' },
    ],
    diagram: buildActivationDiagram('act-10', '22×16 м Двухкоридорная RAMP-арена торможения и дуэлей 1v1 (2 мини-ворот)', [
      {
        title: 'Фаза 1: Синхронный разгон в 2 коридорах и механика 3-шагового торможения',
        desc: 'Две пары (A1/D1 слева, A2/D2 справа) одновременно двигаются из Зоны 1 к центральным воротам торможения на 70% темпа, пока Волна 2 (A3/D3, A4/D4) готовится на старте.',
        passLabels: [],
        movementLabels: ['A1 ведение + 3-шаговый стоп', 'D1 зеркальное торможение', 'A2 ведение + 3-шаговый стоп', 'D2 зеркальное торможение'],
      },
      {
        title: 'Фаза 2: Эксцентрический стоп в средних воротах и взрывной срез под 45°',
        desc: 'В зелёной зоне торможения A1 и A2 гасят инерцию в низкой стойке, ставят опорную стопу без завала колена и резко срезают угол наружу в Зону 2.',
        passLabels: [],
        movementLabels: ['A1 низкий стоп + срез 45° влево!', 'D1 реактивный упор', 'A2 низкий стоп + срез 45° вправо!', 'D2 реактивный упор'],
      },
      {
        title: 'Фаза 3: Двухкоридорная 100% реактивная гонка 1v1 и удар в мини-ворота (+2 очка)',
        desc: 'Оторвавшись на 1.5 м за счёт резкого торможения в воротах, A1 и A2 взрываются в Зону 2 и поражают мини-ворота M1 и M2, пока Волна 2 (A3/A4) начинает разгон!',
        passLabels: ['A1 удар в мини-ворота M1 (+2)', 'A2 удар в мини-ворота M2 (+2)'],
        movementLabels: ['D1 скоростной возврат', 'D2 скоростной возврат', 'Волна 2 (A3) стартует следом', 'Волна 2 (A4) стартует следом'],
      },
    ]),
  },
];

// ============================================================================
// 5. MONTHLY PLAN & SQUAD ADVICE GENERATORS (EN / DE / RU)
// ============================================================================

export const generateActivationMonthlyPlanEn = (
  drill: RondoItem,
  ageVariant?: { baseGrid: string; intensiveGrid: string; timing: string }
): MonthlySessionItem[] => {
  const baseGrid = ageVariant?.baseGrid || drill.dimensionsU15.base;
  const intensiveGrid = ageVariant?.intensiveGrid || drill.dimensionsU15.intensive;
  const baseTiming = ageVariant?.timing || drill.timingU15;

  return [
    {
      session: 1,
      week: 'Week 1 (Tuesday)',
      stage: 'Phase 1 • Rhythm & Mobilization',
      stageBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      focusSide: 'Ball Mastery & Joint Prep',
      goal: drill.attackGoal.split('.')[0],
      conditions: `${baseGrid}. Focus on Phase 1 (65–70% tempo): smooth bilateral ball contacts, head-up scanning, and dynamic hip/ankle mobilization.`,
      loadU15: baseTiming,
    },
    {
      session: 2,
      week: 'Week 1 (Thursday)',
      stage: 'Phase 1→2 • Knee-Axis & Balance',
      stageBadge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      focusSide: 'FIFA 11+ Stability',
      goal: drill.defenseGoal.split('.')[0],
      conditions: `${baseGrid}. Introduce 2-second single-leg stick landings (knee over second toe) and low athletic deceleration stops on the whistle.`,
      loadU15: baseTiming,
    },
    {
      session: 3,
      week: 'Week 2 (Tuesday)',
      stage: 'Phase 2 • Cognitive Signals',
      stageBadge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      focusSide: 'Scanning & Colors',
      goal: drill.progressions[1].desc,
      conditions: `${baseGrid}. Coach uses visual color cones (no voice calls) so players must scan over their shoulders before executing their first touch or feint.`,
      loadU15: baseTiming,
    },
    {
      session: 4,
      week: 'Week 2 (Thursday)',
      stage: 'Phase 2 • Body Strength & Contact',
      stageBadge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      focusSide: 'Mutig & Stark (Duels)',
      goal: 'Core bracing, shoulder-to-shoulder stability, and wide-base ball shielding',
      conditions: `${baseGrid}. Controlled physical contact in pairs: lower the center of gravity, use the forearm as a tactile sensor, and protect the ball on the far foot.`,
      loadU15: baseTiming,
    },
    {
      session: 5,
      week: 'Week 3 (Tuesday)',
      stage: 'Phase 3 • Explosive Potentiation',
      stageBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      focusSide: 'RAMP 100% Speed',
      goal: drill.progressions[2].desc,
      conditions: `Tightened to ${intensiveGrid}. Unlock Phase 3 reactive 3-step bursts and 1v1 gate sprints at 100% neuromuscular velocity.`,
      loadU15: baseTiming,
    },
    {
      session: 6,
      week: 'Week 3 (Thursday)',
      stage: 'Phase 3 • Live Scoring Stakes',
      stageBadge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      focusSide: 'Competition',
      goal: drill.scoringRule.split('.')[0],
      conditions: `${intensiveGrid}. Full live competition in the final 4 minutes of the warm-up: track individual/pair scores to prime match mentality.`,
      loadU15: baseTiming,
    },
    {
      session: 7,
      week: 'Week 4 (Tuesday)',
      stage: 'Bridge • Pre-Match Primer (MD-1)',
      stageBadge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      focusSide: 'Neural Sharpness',
      goal: 'Crisp 12-minute pre-match activation with zero lactic accumulation',
      conditions: `${baseGrid}. 4 min smooth rhythm → 5 min cognitive + core stability → 3 min explosive 1v1 reaction bursts with full 45s recovery.`,
      loadU15: '3 phases × 2.5 min | Rest: 45 sec',
    },
    {
      session: 8,
      week: 'Week 4 (Thursday)',
      stage: 'Transfer • Into Rondo & Main Theme',
      stageBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      focusSide: 'Session Flow',
      goal: 'Seamless 15-second transition from Phase 3 Activation into Block 2 (Rondo / Positional Game)',
      conditions: 'Keep the exact same cone setup: immediately after the final Phase 3 duel, merge pairs into the main session Rondo without stopping to rebuild cones.',
      loadU15: '3 phases × 3 min | Direct transition',
    },
  ];
};

export const generateActivationMonthlyPlanDe = (
  drill: RondoItem,
  ageVariant?: { baseGrid: string; intensiveGrid: string; timing: string }
): MonthlySessionItem[] => {
  const baseGrid = ageVariant?.baseGrid || drill.dimensionsU15.base;
  const intensiveGrid = ageVariant?.intensiveGrid || drill.dimensionsU15.intensive;
  const baseTiming = ageVariant?.timing || drill.timingU15;

  return [
    {
      session: 1,
      week: 'Woche 1 (Dienstag)',
      stage: 'Phase 1 • Rhythmus & Mobilisation',
      stageBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      focusSide: 'Ballgefühl & Gelenke',
      goal: drill.attackGoal.split('.')[0],
      conditions: `${baseGrid}. Fokus auf Phase 1 (65–70 % Tempo): flüssige beidfüßige Kontakte, Vororientierung mit erhobenem Kopf und dynamische Hüftmobilisation.`,
      loadU15: baseTiming,
    },
    {
      session: 2,
      week: 'Woche 1 (Donnerstag)',
      stage: 'Phase 1→2 • Beinachse & Balance',
      stageBadge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      focusSide: 'FIFA 11+ Stabilität',
      goal: drill.defenseGoal.split('.')[0],
      conditions: `${baseGrid}. 2-Sekunden-Einbeinlandungen (Knie über Fußspitze) und tiefe athletische Abbremsstopps auf Pfiff integrieren.`,
      loadU15: baseTiming,
    },
    {
      session: 3,
      week: 'Woche 2 (Dienstag)',
      stage: 'Phase 2 • Kognitive Signale',
      stageBadge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      focusSide: 'Scanning & Farben',
      goal: drill.progressions[1].desc,
      conditions: `${baseGrid}. Trainer nutzt visuelle Farbhütchen (keine Zurufe), damit die Spieler vor dem ersten Kontakt oder der Finte aktiv über die Schulter scannen müssen.`,
      loadU15: baseTiming,
    },
    {
      session: 4,
      week: 'Woche 2 (Donnerstag)',
      stage: 'Phase 2 • Rumpfkraft & Kontakt',
      stageBadge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      focusSide: 'Mutig & Stark (Duelle)',
      goal: 'Rumpfspannung, Schulter-an-Schulter-Stabilität und breite Abschirmbasis',
      conditions: `${baseGrid}. Dosierter Körperkontakt in Paaren: Schwerpunkt absenken, Unterarm als Fühler nutzen und den Ball am ballfernen Fuß schützen.`,
      loadU15: baseTiming,
    },
    {
      session: 5,
      week: 'Woche 3 (Dienstag)',
      stage: 'Phase 3 • Explosive Potenzierung',
      stageBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      focusSide: 'RAMP 100 % Speed',
      goal: drill.progressions[2].desc,
      conditions: `Verengt auf ${intensiveGrid}. Phase 3 mit reaktiven 3-Schritt-Antritten und 1gg1-Torsprints bei 100 % neuromuskulärer Geschwindigkeit.`,
      loadU15: baseTiming,
    },
    {
      session: 6,
      week: 'Woche 3 (Donnerstag)',
      stage: 'Phase 3 • Wettkampf um Punkte',
      stageBadge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      focusSide: 'Wettkampf',
      goal: drill.scoringRule.split('.')[0],
      conditions: `${intensiveGrid}. Voller Punktewettkampf in den letzten 4 Minuten des Einstiegs für maximale Spielbereitschaft.`,
      loadU15: baseTiming,
    },
    {
      session: 7,
      week: 'Woche 4 (Dienstag)',
      stage: 'Brücke • Abschlusstraining (MD-1)',
      stageBadge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      focusSide: 'Neuronale Frische',
      goal: 'Spritziger 12-Minuten-Einstieg vor dem Spieltag ohne Laktatanhäufung',
      conditions: `${baseGrid}. 4 Min. lockerer Rhythmus → 5 Min. Kognition & Rumpf → 3 Min. explosive 1gg1-Reaktionsstarts mit 45 Sek. Pause.`,
      loadU15: '3 Phasen × 2,5 Min. | Pause: 45 Sek.',
    },
    {
      session: 8,
      week: 'Woche 4 (Donnerstag)',
      stage: 'Transfer • Übergang ins Hauptthema',
      stageBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      focusSide: 'Trainingsfluss',
      goal: 'Nahtloser 15-Sekunden-Übergang von Phase 3 in Teil 2 (Rondo / Positionsspiel)',
      conditions: 'Exakt gleiches Hütchen-Setup beibehalten: direkt nach dem letzten Phase-3-Duell starten die Gruppen im selben Quadrat ins Rondo.',
      loadU15: '3 Phasen × 3 Min. | Direkter Übergang',
    },
  ];
};

export const generateActivationMonthlyPlanRu = (
  drill: RondoItem,
  ageVariant?: { baseGrid: string; intensiveGrid: string; timing: string }
): MonthlySessionItem[] => {
  const baseGrid = ageVariant?.baseGrid || drill.dimensionsU15.base;
  const intensiveGrid = ageVariant?.intensiveGrid || drill.dimensionsU15.intensive;
  const baseTiming = ageVariant?.timing || drill.timingU15;

  return [
    {
      session: 1,
      week: 'Неделя 1 (Вторник)',
      stage: 'Фаза 1 • Ритм и мобилизация',
      stageBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      focusSide: 'Чувство мяча и суставы',
      goal: drill.attackGoal.split('.')[0],
      conditions: `${baseGrid}. Акцент на Фазу 1 (65–70% темпа): плавная работа двумя ногами, поднятая голова и динамическая мобилизация таза и голеностопа.`,
      loadU15: baseTiming,
    },
    {
      session: 2,
      week: 'Неделя 1 (Четверг)',
      stage: 'Фаза 1→2 • Ось колена и баланс',
      stageBadge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      focusSide: 'Стабилизация FIFA 11+',
      goal: drill.defenseGoal.split('.')[0],
      conditions: `${baseGrid}. Включаем 2-секундную фиксацию приземления на одной ноге (колено над носком) и низкие стоп-шаги по свистку.`,
      loadU15: baseTiming,
    },
    {
      session: 3,
      week: 'Неделя 2 (Вторник)',
      stage: 'Фаза 2 • Когнитивные сигналы',
      stageBadge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      focusSide: 'Сканирование и цвета',
      goal: drill.progressions[1].desc,
      conditions: `${baseGrid}. Тренер поднимает цветные фишки молча (без голоса), чтобы игроки сканировали поле через плечо ДО первого касания или финта.`,
      loadU15: baseTiming,
    },
    {
      session: 4,
      week: 'Неделя 2 (Четверг)',
      stage: 'Фаза 2 • Сила корпуса и контакт',
      stageBadge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      focusSide: 'Mutig & Stark (Борьба)',
      goal: 'Жёсткий кор, устойчивость плечо-в-плечо и укрывание мяча в широкой стойке',
      conditions: `${baseGrid}. Дозированный силовой контакт в парах: низкий таз, предплечье как тактильный сенсор и контроль мяча дальней ногой.`,
      loadU15: baseTiming,
    },
    {
      session: 5,
      week: 'Неделя 3 (Вторник)',
      stage: 'Фаза 3 • Взрывная потенциация',
      stageBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      focusSide: 'RAMP 100% Скорость',
      goal: drill.progressions[2].desc,
      conditions: `Сужение зоны до ${intensiveGrid}. Выход на Фазу 3 с реактивными 3-шаговыми стартами и дуэлями 1v1 на 100% скорости.`,
      loadU15: baseTiming,
    },
    {
      session: 6,
      week: 'Неделя 3 (Четверг)',
      stage: 'Фаза 3 • Игра на счёт',
      stageBadge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      focusSide: 'Соревнование',
      goal: drill.scoringRule.split('.')[0],
      conditions: `${intensiveGrid}. Полноценное соревнование на очки в последние 4 минуты активации для включения боевого тонуса.`,
      loadU15: baseTiming,
    },
    {
      session: 7,
      week: 'Неделя 4 (Вторник)',
      stage: 'Мост • Предыгровая активация (MD-1)',
      stageBadge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      focusSide: 'Нейро-свежесть',
      goal: 'Короткая 12-минутная предыгровая активация без закисления',
      conditions: `${baseGrid}. 4 мин плавный ритм → 5 мин когниция и стабильность кора → 3 мин взрывные старты 1v1 с полным отдыхом 45 сек.`,
      loadU15: '3 фазы × 2.5 мин | Отдых: 45 сек',
    },
    {
      session: 8,
      week: 'Неделя 4 (Четверг)',
      stage: 'Трансфер • Переход в основную часть',
      stageBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      focusSide: 'Поток тренировки',
      goal: 'Бесшовный 15-секундный переход из Фазы 3 активации во 2-й блок (Рондо / Позиционная игра)',
      conditions: 'Используем ту же самую разметку фишек: сразу после финальной дуэли Фазы 3 пары объединяются в квадрат для основной темы тренировки.',
      loadU15: '3 фазы × 3 мин | Прямой переход',
    },
  ];
};

export const getActivationSquadAdviceEn = (count: number, drill: RondoItem): string => {
  const setup = computeSquadSetup(count, drill.id);
  switch (setup.type) {
    case 'activation_diamond_circuits':
      return setup.circuits === 1
        ? `For ${setup.playersCount} players: keep the entire squad in 1 unified Team Diamond (${setup.playersPerCircuit} players, 2–3 balls circulating simultaneously from top & bottom apexes) — zero splitting and max 1-player queue.`
        : `For ${setup.playersCount} players: run ${setup.circuits} parallel Team Diamonds (${setup.playersPerCircuit} players per diamond, 2 balls in flow) so waiting lines never exceed 1 player.`;
    case 'activation_duel_stations':
      return setup.stations === 1
        ? `For ${setup.playersCount} players: keep all ${setup.pairsCount} matched-size duel pairs together in 1 shared Team Arena (all pairs active simultaneously or in rapid 20s dual-lane waves).`
        : `For ${setup.playersCount} players: pair up into ${setup.pairsCount} matched-size duel pairs across ${setup.stations} arenas — swap roles every 45 seconds for 100% explosive quality.`;
    case 'activation_parallel_boxes':
      return setup.boxes === 1
        ? `For ${setup.playersCount} players: run 1 unified Team Arena (${setup.playersPerBox} players together, multiple balls & 4 Mini-Goals active simultaneously) so every player gets 60+ touches without splitting the squad.`
        : `For ${setup.playersCount} players: run ${setup.boxes} active Team Arenas (${setup.playersPerBox} players per arena) so every player gets 60+ ball touches and zero standing queues.`;
    default:
      return `For ${setup.playersCount} players: organize into ${drill.playersCount} with continuous 3-phase progression.`;
  }
};

export const getActivationSquadAdviceDe = (count: number, drill: RondoItem): string => {
  const setup = computeSquadSetup(count, drill.id);
  switch (setup.type) {
    case 'activation_diamond_circuits':
      return setup.circuits === 1
        ? `Für ${setup.playersCount} Spieler: Gesamte Mannschaft gemeinsam in 1 großen Team-Raute (${setup.playersPerCircuit} Spieler, 2–3 Bälle gleichzeitig von oben & unten) — kein Aufteilen nötig!`
        : `Für ${setup.playersCount} Spieler: ${setup.circuits} parallele Pass-Rauten aufbauen (je ${setup.playersPerCircuit} Spieler, 2 Bälle gleichzeitig im Umlauf) — null Standzeiten!`;
    case 'activation_duel_stations':
      return setup.stations === 1
        ? `Für ${setup.playersCount} Spieler: Alle ${setup.pairsCount} gleich großen 1gg1-Duellpaare gemeinsam in 1 Team-Arena (gleichzeitig an der Linie oder in schnellen 20-Sek.-Doppelwellen).`
        : `Für ${setup.playersCount} Spieler: ${setup.pairsCount} gleich große 1gg1-Duellpaare auf ${setup.stations} Felder verteilen — Wechsel alle 45 Sek. für 100 % Explosivität.`;
    case 'activation_parallel_boxes':
      return setup.boxes === 1
        ? `Für ${setup.playersCount} Spieler: 1 gemeinsames Team-Aktivierungsfeld (${setup.playersPerBox} Spieler zusammen, mehrere Bälle & 4 Minitore gleichzeitig) — über 60 Ballkontakte ohne Gruppenaufteilung.`
        : `Für ${setup.playersCount} Spieler: ${setup.boxes} parallele Team-Felder (je ${setup.playersPerBox} Spieler) — über 60 Ballkontakte pro Spieler ohne Warteschlangen.`;
    default:
      return `Für ${setup.playersCount} Spieler: Einteilung in ${drill.playersCount} mit fließender 3-Phasen-Progression.`;
  }
};

export const getActivationSquadAdviceRu = (count: number, drill: RondoItem): string => {
  const setup = computeSquadSetup(count, drill.id);
  switch (setup.type) {
    case 'activation_diamond_circuits':
      return setup.circuits === 1
        ? `Для ${setup.playersCount} игроков: вся команда работает вместе в 1 большом ромбе (${setup.playersPerCircuit} чел., 2–3 мяча одновременно с двух вершин) — без дробления состава и очередей!`
        : `Для ${setup.playersCount} игроков: организуйте ${setup.circuits} параллельных ромба (по ${setup.playersPerCircuit} чел. в ромбе, 2 мяча одновременно в движении) — без простоев!`;
    case 'activation_duel_stations':
      return setup.stations === 1
        ? `Для ${setup.playersCount} игроков: все ${setup.pairsCount} равные по габаритам пары работают вместе в 1 общей командной арене (одновременно на линии или быстрыми волнами по 20 сек).`
        : `Для ${setup.playersCount} игроков: разбейте на ${setup.pairsCount} равные по габаритам пары на ${setup.stations} площадок — смена ролей каждые 45 сек для 100% взрывной свежести.`;
    case 'activation_parallel_boxes':
      return setup.boxes === 1
        ? `Для ${setup.playersCount} игроков: 1 общая командная арена (${setup.playersPerBox} игроков вместе, несколько мячей и 4 мини-ворот одновременно) — более 60 касаний у каждого без разделения команды.`
        : `Для ${setup.playersCount} игроков: запустите ${setup.boxes} параллельных командных квадрата (по ${setup.playersPerBox} игроков) — более 60 касаний мяча у каждого без ожидания.`;
    default:
      return `Для ${setup.playersCount} игроков: работа в формате ${drill.playersCount} с плавной прогрессией из 3 фаз.`;
  }
};

// ============================================================================
// 6. FULL TRILINGUAL UI DICTIONARIES FOR ACTIVATION (EN / DE / RU)
// ============================================================================

export const UI_ACTIVATION_EN: UIStrings = {
  header: {
    moduleBadge: 'Module 02 • Activation & Einstieg',
    ageBadge: 'U15 (14–15 yrs)',
    title: 'Session Activation (Einstieg): Ball Mastery, First Touch & Body Strength',
    langToggleTitle: 'Switch Language (EN / DE / RU)',
    roleSwitcherLabel: 'View Mode:',
    roles: {
      coach: 'Coach',
      players: 'Players',
      parents: 'Parents',
    },
    roleDescriptions: {
      coach: 'Full Pro Coach mode: SFV Einstieg + RAMP + FIFA 11+ progressive warm-ups, PHV knee-axis stability cues, and 3-phase progressive intensity timer.',
      players: 'Player mode: see how each warm-up drill progresses from Phase 1 (Rhythm) to Phase 2 (Coordination & Body Strength) and Phase 3 (100% Explosive Duel).',
      parents: 'Parent Overview mode: how our 15-minute ball-integrated warm-up combines technical mastery with FIFA 11+ injury prevention and growth-spurt protection.',
    },
  },
  nav: {
    catalog: 'Activations',
    catalogShort: 'Drills',
    monthly: 'Monthly Plan',
    monthlyShort: 'Plan',
    methodology: 'Methodology',
    methodologyShort: 'Guide',
    timer: 'Timer',
    timerShort: 'Timer',
    printCard: 'Print Card',
    printCardShort: 'Print',
    printCardTooltip: 'Open printable Activation coach card or save as PDF',
  },
  catalog: {
    filterTitle: 'Practice: 10 Progressive Activations Across 5 Entry Themes',
    filterSubtitle: 'Every card is ONE cohesive exercise on a single grid that progresses through Phase 1 (Light Rhythm) → Phase 2 (Body Strength & Cognition) → Phase 3 (Explosive Competition)',
    numberPrefix: '#',
    metersSuffix: 'm',
    exerciseLabel: 'Activation',
    openMonthlyPlanBtn: 'Monthly Plan',
    stepByStepTitle: '3-Phase Progressive Drill Animation:',
    phaseLabel: 'Phase',
    prevPhase: 'Prev Phase',
    nextPhase: 'Next Phase',
    fullscreenEnter: 'Fullscreen Board',
    fullscreenExit: 'Exit Fullscreen',
    boardLayersLabel: 'Tactical Board Layers:',
    layerPassesOn: '✓ Passing & Target Lanes',
    layerPassesOff: '× Passing & Target Lanes',
    layerMovementsOn: '✓ Dribbling & Explosive Runs',
    layerMovementsOff: '× Dribbling & Explosive Runs',
    layerShadowsOn: '✓ Stability / Free Zones',
    layerShadowsOff: '× Stability / Free Zones',
    legendPossession: 'Attackers / Ball Carriers',
    legendDefenders: 'Shadow / Duel Partner',
    legendNeutral: 'Pivot (#6) / Target Gate',
    squadCalcTitle: 'Squad Attendance Setup:',
    playersTodayLabel: 'Players today:',
    playersUnit: 'pl.',
    pitchSizeLabel: 'Grid Size',
    intensivePrefix: 'Intensive:',
    dosageLabel: '3-Phase Dosage',
    formatPrefix: 'Format:',
    problemTitle: 'Warm-Up Problem → Why We Use This Progressive Einstieg',
    conditionsAndGoalsTitle: 'Technical & Biomotor Objectives Across the 3 Phases',
    attackGoalTitle: 'Technical & Cognitive Focus (Ball Mastery, First Touch & Space)',
    defenseGoalTitle: 'Body Strength, Stability & Explosive Progression (Phase 2–3)',
    scoringRuleTitle: 'Phase 3 Competition & Potentiation Rule',
    progressionsTitle: '3 Progressive Phases of This Exercise (Light → Strength → Explosive)',
    coachingCuesTitle: 'Coaching Cues:',
  },
  monthly: {
    matrixBadge: '4 Weeks • 8 Sessions',
    planTitlePrefix: 'Monthly Activation Plan:',
    planSubtitle: 'How to progress this single Activation structure over 8 sessions: from clean technical rhythm and FIFA 11+ joint stability to high-speed RAMP duels.',
    selectRondoLabel: 'Select Primary Activation of the Month:',
    progressPrefix: 'Cycle Progress:',
    progressMiddle: 'of',
    progressSuffix: 'sessions completed',
    progressHint: 'Click any session card to mark or unmark it as completed',
    sessionLabel: 'Session',
    loadPrefix: '',
    completedBadge: 'Completed',
    markCompletedBtn: 'Mark done',
    sessionStructureTitle: '90-Minute Session Structure (Block 1 Highlighted)',
    sessionBlocks: [
      {
        step: '1. ACTIVATION / EINSTIEG (15 min)',
        title: '3-Phase Progressive Warm-Up',
        desc: 'One cohesive drill on a single grid: Phase 1 Light Rhythm (4m) → Phase 2 Cognition & Body Strength (6m) → Phase 3 Explosive Duel (5m).',
        highlighted: true,
        accentColor: 'text-emerald-400',
      },
      {
        step: '2. Rondo (15–18 min)',
        title: 'Tactical Decision Bridge',
        desc: 'High cognitive density in tight spaces building on the pre-scanning and first-touch habits activated in Block 1.',
        accentColor: 'text-blue-400',
      },
      {
        step: '3. Positional Game (25 min)',
        title: '4v4+3 / 6v6+2',
        desc: 'Applying directional reception, line-breaking carries, and third-man combinations in positional roles.',
        accentColor: 'text-purple-400',
      },
      {
        step: '4. Game with Goals (30 min)',
        title: '8v8 / 11v11',
        desc: 'Free match play with bonus points for executing the session’s core technical-tactical theme.',
        accentColor: 'text-amber-400',
      },
    ],
  },
  methodology: {
    tabAll: 'All',
    tabPrinciples: 'Principles',
    tabGeometry: 'Biomechanics & Touch',
    tabInterventions: 'Freeze Cues',
    tabCheatSheet: 'Master Table',
    cards: [
      {
        title: '1. SFV Einstieg & 3-Phase Single-Drill Progression',
        icon: 'eye',
        iconBg: 'bg-emerald-500/20 text-emerald-400',
        bullets: [
          {
            title: 'One Exercise, Three Progressive Gears:',
            text: 'Never waste 5 minutes rebuilding cones during warm-up. Start in Phase 1 (smooth rhythm & joint mobility), layer cognitive signals + body stability in Phase 2, and unlock 100% competitive speed in Phase 3.',
            accentColor: 'text-emerald-400',
          },
          {
            title: 'Visual Signals Over Whistle Blows:',
            text: 'In Phase 2, hold up colored cones silently so players must lift their chins and scan BEFORE the ball touches their boot (SFV Spielintelligenz).',
            accentColor: 'text-emerald-400',
          },
          {
            title: 'First Touch = First Step Into Space:',
            text: 'Forbid stopping the ball dead under the sole in passing warm-ups. Every reception (Mitnahme) must carry the player dynamically away from pressure.',
            accentColor: 'text-emerald-400',
          },
        ],
      },
      {
        title: '2. FIFA 11+ & SFV "Mutig & Stark" Body Strength',
        icon: 'award',
        iconBg: 'bg-rose-500/20 text-rose-400',
        bullets: [
          {
            title: 'Knee-Over-Toe Deceleration Axis:',
            text: 'Embed single-leg stick landings and 3-step braking stops directly inside Phase 2 ball drills — reducing non-contact knee and ankle injuries by up to 50%.',
            accentColor: 'text-rose-400',
          },
          {
            title: 'Low Center of Gravity & Shielding Base:',
            text: 'Teach players to drop their hips, widen their stance, place their body between opponent and ball, and use a bent forearm as a tactile sensor.',
            accentColor: 'text-amber-400',
          },
          {
            title: 'Shoulder-to-Shoulder Contact Preparation:',
            text: 'Players cannot enter full-speed Rondos or games without rehearsing physical contact in Phase 2: brace the core on impact and keep stride rhythm.',
            accentColor: 'text-purple-400',
          },
        ],
      },
      {
        title: '3. RAMP Neural Potentiation & PHV Protection',
        icon: 'zap',
        iconBg: 'bg-amber-500/20 text-amber-400',
        bullets: [
          {
            title: 'Peak Height Velocity (U13–U15 Growth Spurt):',
            text: 'During rapid adolescent limb growth, prioritize Phase 2 balance, eccentric braking, and ankle stabilization; avoid high-volume repetitive drop-jumps.',
            accentColor: 'text-amber-400',
          },
          {
            title: 'Phase 3 Post-Activation Potentiation (PAP):',
            text: 'The final 3–4 minutes of warm-up must reach 95–100% sprint/reaction velocity (1v1 gate races, live escapes) so the nervous system is fully primed for Block 2.',
            accentColor: 'text-amber-400',
          },
          {
            title: 'Zero Static Stretching Before Explosivity:',
            text: 'Use only dynamic mobilization (hip openers, walking lunges, hamstring sweeps) integrated between active ball repetitions.',
            accentColor: 'text-amber-400',
          },
        ],
      },
    ],
    geometrySectionTitle: 'Interactive Biomechanics & First-Touch Geometry (4 Core Concepts)',
    geometrySectionSubtitle: 'Toggle each diagram between the common warm-up mistake and the correct biomechanical/technical execution.',
    geometryModeMistakeBtn: '✗ Common Warm-Up Mistake',
    geometryModeSolutionBtn: '✓ Correct Execution',
    geometryCueLabel: 'Live Voice Prompt:',
    geometryConcepts: [
      {
        id: 'first-touch-escape',
        title: '1. Directional First Touch (Mitnahme) vs Dead-Ball Stop',
        subtitle: 'Why stopping the ball under the sole kills tempo and how a back-foot directional touch breaks pressure in 1 step',
        mistakeLabel: '✗ Mistake: Dead-Ball Sole Stop in Place',
        mistakeDesc: 'Receiver N1 stops the ball dead under his foot inside the central zone and only then looks up, allowing Defender D1 to close the 3-meter gap and trap him.',
        solutionLabel: '✓ Solution: Dynamic First Touch Into Free Space (Mitnahme)',
        solutionDesc: 'N1 opens his hips before the ball arrives and cushions his very first touch 2 meters diagonally away from D1 into open space, accelerating in one fluid motion.',
        coachingCue: '“Never stop the ball dead! Your first touch IS your first step into the open gate!”',
      },
      {
        id: 'scan-before-touch',
        title: '2. Pre-Scanning & Color Gate Orientation',
        subtitle: 'Building the mental picture while the ball is traveling so the first touch is automatic',
        mistakeLabel: '✗ Mistake: Ball-Watching & Late Head Lift',
        mistakeDesc: 'Receiver stares solely at the incoming pass and only checks the target gates AFTER trapping the ball, turning straight into the defender’s pressing lane.',
        solutionLabel: '✓ Solution: Double Shoulder Scan During Ball Flight',
        solutionDesc: 'While the pass is halfway across the grass, the receiver scans over his shoulder to read D1 and the open color gate, taking a 1-touch escape into the free lane.',
        coachingCue: '“Scan the color gate while the ball is rolling — know your exit door before the ball touches your shoe!”',
      },
      {
        id: 'deceleration-axis',
        title: '3. Eccentric Braking & Knee-Over-Toe Axis (FIFA 11+)',
        subtitle: 'How multi-step low-hip braking prevents knee valgus and fuels a 2× faster cut',
        mistakeLabel: '✗ Mistake: High-Hip Single-Step Stop & Knee Valgus',
        mistakeDesc: 'Player tries to brake at high speed with a tall torso and straight legs; the plant knee collapses inward (valgus), causing a slip and dangerous joint shear.',
        solutionLabel: '✓ Solution: 3-Step Low-Hip Brake & Stacked Knee Axis',
        solutionDesc: 'Player drops his center of gravity with 3 rapid braking steps and plants the outside foot with hip, knee, and second toe stacked in one strong vertical line.',
        coachingCue: '“Drop your hips to brake! Three quick steps, knee over toe — push the ground away!”',
      },
      {
        id: 'shielding-base',
        title: '4. Wide-Base Ball Shielding & Tactile Forearm Sensor',
        subtitle: 'SFV Mutig & Stark: absorbing back-pressure and spinning the defender',
        mistakeLabel: '✗ Mistake: Narrow Upright Stance & Near-Foot Exposure',
        mistakeDesc: 'Attacker stands tall with feet close together and keeps the ball on the foot closest to the defender, allowing an easy poke-tackle or nudge off balance.',
        solutionLabel: '✓ Solution: Low Wide Stance, Far-Foot Ball & Forearm Sensor',
        solutionDesc: 'Attacker sinks his hips, widens his base, places his torso between defender and ball (ball on far foot), and uses his bent forearm to feel and roll off pressure.',
        coachingCue: '“Sink low, wide base, forearm up as a sensor, ball on the far foot — feel which way he leans and spin!”',
      },
    ],
    interventionsSectionTitle: 'Coach “Freeze” & Live Activation Corrections (6 Scenarios)',
    interventionsSectionSubtitle: 'How to correct technical rhythm, body posture, and explosive intent in 15 seconds without letting players cool down.',
    symptomLabel: 'On-Pitch Symptom',
    freezeTriggerLabel: 'When to Shout “FREEZE!”',
    guidedQuestionLabel: 'Guided Question (Ask Players)',
    microCorrectionLabel: '15-Second Micro-Fix',
    openRondoInCatalogBtn: 'Open Activation on Board',
    interventions: [
      {
        rondoId: 'act-1',
        rondoNumber: '1.1',
        title: 'Coerver Traffic Box: Eyes Glued to the Grass',
        symptom: 'Players execute fast ball touches but stare straight down at their boots, bumping into teammates and missing visual color cues.',
        freezeTrigger: 'Hold up a colored cone silently for 3 seconds — blow the whistle if half the group hasn’t reacted.',
        guidedQuestion: '“Freeze! Without looking down at your ball — what color cone am I holding up right now, and which perimeter gate is completely empty?”',
        microCorrection: 'Switch to silent visual coaching for 90 seconds: every time the coach raises a red/blue cone, players must shout the color out loud while doing a V-cut.',
      },
      {
        rondoId: 'act-3',
        rondoNumber: '2.1',
        title: 'SFV Star: Stopping the Ball Dead Under the Sole',
        symptom: 'Central receivers trap the ball stationary inside the 5×5 m box and take an extra step before passing out.',
        freezeTrigger: 'Freeze the instant a central receiver puts his sole on top of a stationary ball inside the 5×5 m star.',
        guidedQuestion: '“Hold there! If D1 is sprinting at your back in a real match and you stop the ball dead inside this box, how many seconds did you just gift the defender?”',
        microCorrection: 'Enforce the “1-Touch Exit Rule”: the ball must exit the 5×5 m cone square on the receiver’s VERY FIRST touch.',
      },
      {
        rondoId: 'act-4',
        rondoNumber: '2.2',
        title: 'Y-Shape Pivot (#6): Receiving Flat Without Scanning',
        symptom: 'Pivot #6 checks toward the ball in a straight line with his back completely square, failing to see which shoulder D1 is pressing.',
        freezeTrigger: 'Freeze while the entry pass from A1 is halfway to #6 and #6 has not turned his head once.',
        guidedQuestion: '“Number 6, freeze! Don’t turn around — which shoulder is D1 attacking right now, left or right?”',
        microCorrection: 'Require #6 to check off at a 45° angle and tap his own left or right shoulder to signal where D1 is BEFORE the ball touches his foot.',
      },
      {
        rondoId: 'act-5',
        rondoNumber: '3.1',
        title: 'Dynamic Square Explorer: Bunching 3 Players in One Quadrant',
        symptom: 'Three or four players dribble into the same 9×9 m quadrant while an adjacent quadrant sits completely empty.',
        freezeTrigger: 'Blow the whistle the moment 3 ball-carriers are inside the same quadrant while another quadrant has zero players.',
        guidedQuestion: '“Freeze and look around! How many of you are crowded into this tiny box — and which quadrant is wide open begging for an attacker?”',
        microCorrection: 'Add the “Lava Zone” rule: if 3 players are caught in the same quadrant, the last player in must do a 3-step explosive burst into the farthest empty zone.',
      },
      {
        rondoId: 'act-7',
        rondoNumber: '4.1',
        title: 'Barça Diamond: Soft Passes to the Wrong Foot',
        symptom: 'Passes roll slowly to the receiver’s near foot, forcing a clunky 3-touch adjustment that breaks the Third-Man timing.',
        freezeTrigger: 'Freeze when a soft pass forces Vertex B to reach backward across his body.',
        guidedQuestion: '“Look at B’s hips — which foot wants the ball so he can play #6 in one touch, and what did that slow pass to his front foot force him to do?”',
        microCorrection: 'Point to the target back foot before passing: demand crisp, firm ground passes that arrive with “a message”.',
      },
      {
        rondoId: 'act-10',
        rondoNumber: '5.2',
        title: 'RAMP Gate Race: Upright Braking & Overrunning the Cut',
        symptom: 'Players sprint fast to the midline but stay upright when braking, sliding past the turn line and losing the 1v1 cutback.',
        freezeTrigger: 'Freeze right at the midline when an attacker’s chest is tall and his knees are straight during the stop.',
        guidedQuestion: '“Look at your posture at the braking line — can you change direction at 100% speed with straight knees, or where does your center of gravity need to be?”',
        microCorrection: 'Rehearse the “3-Step Drumroll” brake: 3 rapid, low steps dropping the hips below the defender’s shoulder level before planting the outside foot.',
      },
    ],
    tableTitle: 'Master Cheat-Sheet: Grid Sizes & 3-Phase Dosages for All 10 Activations',
    tableHeaders: {
      num: '#',
      rondo: 'Activation Drill',
      goal: 'Primary Theme',
      baseArea: 'Base Grid (U15)',
      intensiveArea: 'Intensive (U15)',
      setsAndRest: '3-Phase Dosage',
    },
  },
  timer: {
    badge: 'On-Pitch Activation Tool',
    title: '3-Phase Progressive Activation Timer (with Whistle)',
    whistleOn: 'Whistle ON',
    whistleOff: 'Muted',
    presets: {
      small: '3 Phases × 2:30 / 0:30 (11+ & Duels)',
      medium: '3 Phases × 3:00 / 0:30 (Standard Einstieg)',
      positional: '3 Phases × 3:30 / 0:40 (Scanning Circuits)',
    },
    setLabel: 'Phase',
    ofLabel: 'of',
    workPhaseText: 'ACTIVE PHASE (PROGRESS INTENSITY!)',
    restPhaseText: '30s TRANSITION: ADD NEXT PHASE RULE!',
    pauseBtn: 'Pause',
    startBtn: 'Start Phase',
    resetBtn: 'Reset',
    customWorkLabel: 'Phase (sec)',
    customRestLabel: 'Transition (sec)',
    customSetsLabel: 'Phases',
    secondsUnit: 's',
  },
  printModal: {
    badge: 'Activation / Einstieg Drill Card • U15 (14–15 yrs)',
    printBtn: 'Print / Save PDF',
    closeBtn: 'Close',
    dimensionsLabel: 'Grid Size:',
    intensiveLabel: 'Intensive:',
    dosageLabel: '3-Phase Dosage:',
    attackGoalLabel: 'Technical & Cognitive Focus:',
    defenseGoalLabel: 'Body Strength & Explosivity:',
    scoringRuleLabel: 'Phase 3 Competition Rule:',
    monthlyProgressionTitle: '8-Session Monthly Progression Plan for This Activation:',
    sessionShortPrefix: 'Sess.',
  },
};

export const UI_ACTIVATION_DE: UIStrings = {
  header: {
    moduleBadge: 'Modul 02 • Einstieg & Aktivierung',
    ageBadge: 'U15 (14–15 J.)',
    title: 'Trainingseinstieg (SFV Einstieg): Ballgefühl, 1. Kontakt & Körperstabilität',
    langToggleTitle: 'Sprache wechseln (EN / DE / RU)',
    roleSwitcherLabel: 'Ansichtsmodus:',
    roles: {
      coach: 'Trainer',
      players: 'Spieler',
      parents: 'Eltern',
    },
    roleDescriptions: {
      coach: 'Pro-Trainer-Modus: SFV-Einstieg + RAMP + FIFA 11+ Progressionen, PHV-Beinachsen-Stabilität und 3-Phasen-Intervalltimer.',
      players: 'Spieler-Modus: Erlebe, wie jede Übung im selben Feld von Phase 1 (Rhythmus) über Phase 2 (Rumpfkraft & Kognition) bis Phase 3 (100 % Explosiv-Duell) ansteigt.',
      parents: 'Eltern-Modus: Wie unser 15-minütiges Aufwärmen mit Ball Technik, Spielintelligenz und FIFA 11+ Verletzungsprävention im Wachstum verbindet.',
    },
  },
  nav: {
    catalog: 'Einstiege',
    catalogShort: 'Übungen',
    monthly: 'Monatsplan',
    monthlyShort: 'Plan',
    methodology: 'Methodik',
    methodologyShort: 'Theorie',
    timer: 'Timer',
    timerShort: 'Timer',
    printCard: 'Druckkarte',
    printCardShort: 'Drucken',
    printCardTooltip: 'Druckbare Trainerkarte öffnen oder als PDF speichern',
  },
  catalog: {
    filterTitle: 'Praxis: 10 Progressive Einstiege über 5 Trainingsthemen',
    filterSubtitle: 'Jede Karte ist EINE zusammenhängende Übung im selben Aufbau mit 3 progressiven Phasen: Phase 1 (Rhythmus) → Phase 2 (Körperstabilität & Kognition) → Phase 3 (Explosivität & Wettkampf)',
    numberPrefix: 'Nr.',
    metersSuffix: 'm',
    exerciseLabel: 'Einstieg',
    openMonthlyPlanBtn: 'Monatsplan',
    stepByStepTitle: '3-Phasen-Progression auf dem Taktikboard:',
    phaseLabel: 'Phase',
    prevPhase: 'Vorherige Phase',
    nextPhase: 'Nächste Phase',
    fullscreenEnter: 'Vollbild-Board',
    fullscreenExit: 'Vollbild beenden',
    boardLayersLabel: 'Taktiktafel-Ebenen:',
    layerPassesOn: '✓ Pass- & Ziellinien',
    layerPassesOff: '× Pass- & Ziellinien',
    layerMovementsOn: '✓ Dribbling- & Explosivläufe',
    layerMovementsOff: '× Dribbling- & Explosivläufe',
    layerShadowsOn: '✓ Stabilitäts- / Freie Zonen',
    layerShadowsOff: '× Stabilitäts- / Freie Zonen',
    legendPossession: 'Angreifer / Ballführer',
    legendDefenders: 'Schatten- / Duellpartner',
    legendNeutral: 'Pivot (#6) / Zieltor',
    squadCalcTitle: 'Teamgrößen-Rechner:',
    playersTodayLabel: 'Spieler heute:',
    playersUnit: 'Sp.',
    pitchSizeLabel: 'Feldgröße',
    intensivePrefix: 'Intensiv:',
    dosageLabel: '3-Phasen-Dauer',
    formatPrefix: 'Format:',
    problemTitle: 'Problem im Spiel → Warum dieser progressive Einstieg?',
    conditionsAndGoalsTitle: 'Technik- & Athletik-Ziele über die 3 Phasen',
    attackGoalTitle: 'Technik & Kognition (Ballgefühl, 1. Kontakt & Raum)',
    defenseGoalTitle: 'Körperstabilität, Balance & Explosivität (Phase 2–3)',
    scoringRuleTitle: 'Phase 3 Wettkampf- & Potenzierungsregel',
    progressionsTitle: '3 Progressive Phasen dieser Übung (Leicht → Kraft → Explosiv)',
    coachingCuesTitle: 'Coaching-Punkte:',
  },
  monthly: {
    matrixBadge: '4 Wochen • 8 Einheiten',
    planTitlePrefix: 'Monatsplan Einstieg:',
    planSubtitle: 'Methodischer Aufbau über 8 Einheiten: Vom sauberen Technik-Rhythmus und FIFA 11+ Beinachsen-Stabilität bis zu explosiven RAMP-Wettkämpfen.',
    selectRondoLabel: 'Haupt-Einstieg des Monats wählen:',
    progressPrefix: 'Zyklus-Fortschritt:',
    progressMiddle: 'von',
    progressSuffix: 'Einheiten absolviert',
    progressHint: 'Klicke auf eine Karte, um die Einheit als erledigt zu markieren',
    sessionLabel: 'Einheit',
    loadPrefix: '',
    completedBadge: 'Erledigt',
    markCompletedBtn: 'Abhaken',
    sessionStructureTitle: 'Struktur der 90-Minuten-Einheit (Teil 1 hervorgehoben)',
    sessionBlocks: [
      {
        step: '1. EINSTIEG / AKTIVIERUNG (15 Min.)',
        title: '3-Phasen-Aufwärmen mit Ball',
        desc: 'Eine Übung im selben Feld: Phase 1 Rhythmus (4 Min.) → Phase 2 Kognition & Rumpfkraft (6 Min.) → Phase 3 Explosiv-Duell (5 Min.).',
        highlighted: true,
        accentColor: 'text-emerald-400',
      },
      {
        step: '2. Rondo (15–18 Min.)',
        title: 'Brücke zum Hauptthema',
        desc: 'Hohe Entscheidungsdichte auf engem Raum, aufbauend auf Vororientierung und Ballmitnahme aus dem Einstieg.',
        accentColor: 'text-blue-400',
      },
      {
        step: '3. Positionsspiel (25 Min.)',
        title: '4gg4+3 / 6gg6+2',
        desc: 'Übertragung von Ballmitnahme, Tempodribbling und Dritter-Mann-Kombinationen in feste Positionen.',
        accentColor: 'text-purple-400',
      },
      {
        step: '4. Spiel auf Tore (30 Min.)',
        title: '8gg8 / 11gg11',
        desc: 'Abschlussspiel mit Bonuspunkten für das Umsetzen des Tagesthemas.',
        accentColor: 'text-amber-400',
      },
    ],
  },
  methodology: {
    tabAll: 'Alle',
    tabPrinciples: 'Prinzipien',
    tabGeometry: 'Biomechanik & Kontakt',
    tabInterventions: 'Freeze-Coaching',
    tabCheatSheet: 'Master-Tabelle',
    cards: [
      {
        title: '1. SFV-Einstieg & 3-Phasen-Progression in 1 Aufbau',
        icon: 'eye',
        iconBg: 'bg-emerald-500/20 text-emerald-400',
        bullets: [
          {
            title: 'Eine Übung, drei progressive Gänge:',
            text: 'Kein zeitraubendes Umbauen im Aufwärmen! Starte in Phase 1 (lockerer Rhythmus & Gelenkmobilisation), ergänze in Phase 2 Farbsignale + Rumpfstabilität und schalte in Phase 3 auf 100 % Wettkampf-Sprints.',
            accentColor: 'text-emerald-400',
          },
          {
            title: 'Visuelle Signale statt Dauer-Pfiffe:',
            text: 'Halte in Phase 2 stumm Farbhütchen hoch, damit die Spieler den Kopf heben und scannen müssen, BEVOR der Ball ihren Fuß berührt (SFV Spielintelligenz).',
            accentColor: 'text-emerald-400',
          },
          {
            title: 'Erster Kontakt = Erster Schritt in den Raum:',
            text: 'Verbiete das Totstoppen unter der Sohle. Jede Ballannahme (Mitnahme) muss dynamisch in den freien Raum weg vom Druck führen.',
            accentColor: 'text-emerald-400',
          },
        ],
      },
      {
        title: '2. FIFA 11+ & SFV „Mutig & Stark“ Körperstabilität',
        icon: 'award',
        iconBg: 'bg-rose-500/20 text-rose-400',
        bullets: [
          {
            title: 'Knie-über-Fußspitze Beinachse beim Abbremsen:',
            text: 'Einbein-Stabilitätslandungen und 3-Schritt-Abbremsstopps direkt in Phase 2 integrieren — senkt das Risiko für Knie- und Sprunggelenksverletzungen um bis zu 50 %.',
            accentColor: 'text-rose-400',
          },
          {
            title: 'Tiefer Schwerpunkt & Abschirm-Basis:',
            text: 'Hüfte absenken, breite Standbasis, Körper zwischen Gegner und Ball bringen und den angewinkelten Unterarm als taktilen Sensor nutzen.',
            accentColor: 'text-amber-400',
          },
          {
            title: 'Schulter-an-Schulter-Kontakt vorbereiten:',
            text: 'Niemand geht kalt in Zweikämpfe: In Phase 2 lernen die Spieler, seitlichen Körperkontakt über die Rumpfspannung abzufedern, ohne den Laufrhythmus zu verlieren.',
            accentColor: 'text-purple-400',
          },
        ],
      },
      {
        title: '3. RAMP-Potenzierung & PHV-Wachstumsschutz',
        icon: 'zap',
        iconBg: 'bg-amber-500/20 text-amber-400',
        bullets: [
          {
            title: 'Peak Height Velocity (U13–U15 Wachstumsschub):',
            text: 'Während des Längenwachstums hat Phase 2 (Balance, exzentrisches Abbremsen, Sprunggelenksstabilität) höchste Priorität.',
            accentColor: 'text-amber-400',
          },
          {
            title: 'Phase 3 Post-Activation Potentiation (PAP):',
            text: 'Die letzten 3–4 Minuten des Einstiegs müssen 95–100 % Sprint- und Reaktionsgeschwindigkeit erreichen (1gg1-Torrennen), um das Nervensystem für das Rondo zu zünden.',
            accentColor: 'text-amber-400',
          },
          {
            title: 'Kein statisches Dehnen vor Sprints:',
            text: 'Ausschließlich dynamische Mobilisation (Hüftöffner, Ausfallschritte, Skippings) fließend zwischen den Ballaktionen nutzen.',
            accentColor: 'text-amber-400',
          },
        ],
      },
    ],
    geometrySectionTitle: 'Interaktive Biomechanik & Ballmitnahme-Geometrie (4 Konzepte)',
    geometrySectionSubtitle: 'Schalte jedes Diagramm zwischen dem typischen Fehler im Aufwärmen und der sauberen technischen/athletischen Lösung um.',
    geometryModeMistakeBtn: '✗ Typischer Aufwärm-Fehler',
    geometryModeSolutionBtn: '✓ Richtige Ausführung',
    geometryCueLabel: 'Trainer-Kommando:',
    geometryConcepts: [
      {
        id: 'first-touch-escape',
        title: '1. Dynamische Ballmitnahme vs. Totstoppen unter der Sohle',
        subtitle: 'Warum das Stoppen auf der Stelle Tempo kostet und wie der ballferne Fuß mit dem 1. Kontakt Raum gewinnt',
        mistakeLabel: '✗ Fehler: Ball tot unter der Sohle stoppen',
        mistakeDesc: 'Zentrumsspieler N1 stoppt den Ball auf der Stelle im Zentrum und hebt erst danach den Kopf — Verteidiger D1 schließt die 3-Meter-Lücke sofort.',
        solutionLabel: '✓ Lösung: Dynamische Mitnahme in den freien Raum',
        solutionDesc: 'N1 öffnet vorab die Hüfte und nimmt den Ball mit dem allerersten Kontakt 2 Meter diagonal weg von D1 in den freien Raum mit.',
        coachingCue: '„Stopp den Ball nie tot! Dein erster Kontakt IST dein erster Schritt durch das freie Tor!“',
      },
      {
        id: 'scan-before-touch',
        title: '2. Vororientierung (Scanning) & Farbtor-Wahrnehmung',
        subtitle: 'Das Bild im Kopf aufbauen, während der Ball noch rollt',
        mistakeLabel: '✗ Fehler: Nur auf den Ball starren & spät schauen',
        mistakeDesc: 'Der Spieler fixiert nur den anrollenden Pass und sucht erst NACH der Ballannahme nach dem freien Tor — genau in den Laufweg des Verteidigers.',
        solutionLabel: '✓ Lösung: Doppelter Schulterblick während des Ballflugs',
        solutionDesc: 'Während der Pass unterwegs ist, scannt der Spieler über die Schulter nach D1 und dem Farbsignal und löst sich im 1. Kontakt in die freie Bahn.',
        coachingCue: '„Scanne das Farbtor, solange der Ball rollt — kenne deinen Ausgang vor dem ersten Kontakt!“',
      },
      {
        id: 'deceleration-axis',
        title: '3. Exzentrisches Abbremsen & Beinachse (FIFA 11+)',
        subtitle: 'Wie 3 tiefe Bremsschritte Knie-Valgus verhindern und den Richtungswechsel beschleunigen',
        mistakeLabel: '✗ Fehler: Aufrechtes Abstoppen & Knie knickt nach innen',
        mistakeDesc: 'Abbremsen mit hohem Oberkörper und fast gestrecktem Bein; das Knie kollabiert nach innen (Valgus) — Rutsch- und Verletzungsgefahr.',
        solutionLabel: '✓ Lösung: 3 tiefe Bremsschritte & stabile Beinachse',
        solutionDesc: 'Schwerpunkt mit 3 kurzen Bremsschritten absenken; beim Stemmschritt stehen Hüfte, Knie und zweite Fußspitze in einer stabilen Linie.',
        coachingCue: '„Hüfte runter beim Bremsen! Drei schnelle Schritte, Knie über Fußspitze — Boden wegdrücken!“',
      },
      {
        id: 'shielding-base',
        title: '4. Breite Abschirm-Basis & Unterarm-Sensor (Mutig & Stark)',
        subtitle: 'Körperdruck im Rücken absorbieren und den Verteidiger abrollen',
        mistakeLabel: '✗ Fehler: Schmaler aufrechter Stand & Ball am nahen Fuß',
        mistakeDesc: 'Angreifer steht aufrecht mit engen Füßen und führt den Ball am gegnernahen Fuß — leichter Ballverlust bei jedem Rempler.',
        solutionLabel: '✓ Lösung: Tiefer breiter Stand, ferner Fuß & Schutzarm',
        solutionDesc: 'Hüfte tief, breite Basis, Körper zwischen Gegner und Ball (Ball am fernen Fuß) und angewinkelter Unterarm als Fühler an der Brust des Gegners.',
        coachingCue: '„Tief sitzen, breite Basis, Unterarm als Fühler raus, Ball an den fernen Fuß — spür den Druck und dreh dich weg!“',
      },
    ],
    interventionsSectionTitle: 'Trainer „Freeze“ & Live-Korrekturen im Einstieg (6 Szenarien)',
    interventionsSectionSubtitle: 'Wie du Technik, Körperspannung und Explosivität in 15 Sekunden korrigierst, ohne dass die Gruppe auskühlt.',
    symptomLabel: 'Symptom auf dem Platz',
    freezeTriggerLabel: 'Wann „FREEZE!“ rufen?',
    guidedQuestionLabel: 'Leitfrage (an die Spieler)',
    microCorrectionLabel: '15-Sekunden-Korrektur',
    openRondoInCatalogBtn: 'Übung auf dem Board öffnen',
    interventions: [
      {
        rondoId: 'act-1',
        rondoNumber: '1.1',
        title: 'Coerver-Quadrat: Blick klebt am Rasen',
        symptom: 'Schnelle Ballkontakte, aber der Blick geht starr nach unten auf die Schuhe — Zusammenstöße und übersehene Farbsignale.',
        freezeTrigger: 'Halte 3 Sekunden lang stumm ein Farbhütchen hoch — Pfeife, wenn die Hälfte der Gruppe nicht reagiert.',
        guidedQuestion: '„Freeze! Ohne nach unten zu schauen — welche Farbe halte ich gerade hoch, und welches Außentor ist komplett frei?“',
        microCorrection: '90 Sekunden stummes Visuell-Coaching: Jedes Mal, wenn der Trainer ein Hütchen hebt, rufen alle laut die Farbe während des V-Cuts.',
      },
      {
        rondoId: 'act-3',
        rondoNumber: '2.1',
        title: 'SFV-Stern: Ball tot unter der Sohle stoppen',
        symptom: 'Zentrumsspieler stoppen den Ball im 5×5 m Stern komplett ab und brauchen einen Extraschritt vor dem Abspiel.',
        freezeTrigger: 'Freeze in der Sekunde, in der ein Spieler im 5×5 m Quadrat die Sohle auf den ruhenden Ball stellt.',
        guidedQuestion: '„Stopp! Wenn D1 im Spiel mit vollem Tempo in deinen Rücken sprintet und du den Ball hier totstoppst — wie viel Zeit schenkst du dem Verteidiger?“',
        microCorrection: '„1.-Kontakt-Ausbruchsregel“: Der Ball muss bereits mit dem ALLERERSTEN Kontakt die 5×5 m Hütchenzone verlassen.',
      },
      {
        rondoId: 'act-4',
        rondoNumber: '2.2',
        title: 'Y-Form (#6): Flaches Anbieten ohne Schulterblick',
        symptom: 'Der Sechser (#6) läuft gerade auf den Passgeber zu, hat den Rücken komplett zum Feld und sieht nicht, welche Schulter D1 attackiert.',
        freezeTrigger: 'Freeze, während der Pass von A1 auf halbem Weg zu #6 ist und #6 noch keinen einzigen Schulterblick gemacht hat.',
        guidedQuestion: '„Nummer 6, Freeze! Nicht umdrehen — welche deiner Schultern greift D1 gerade an, links oder rechts?“',
        microCorrection: '#6 muss sich im 45°-Winkel absetzen und vor der Ballannahme kurz auf seine eigene linke oder rechte Schulter tippen, um D1 anzuzeigen.',
      },
      {
        rondoId: 'act-5',
        rondoNumber: '3.1',
        title: 'Zonen-Explorer: Knäuelbildung in einem Quadranten',
        symptom: 'Drei oder vier Spieler dribbeln in denselben 9×9 m Quadranten, während ein Nachbarquadrant komplett leer steht.',
        freezeTrigger: 'Pfeife sofort, wenn 3 Ballführer im selben Quadranten stehen und ein anderes Feld leer ist.',
        guidedQuestion: '„Freeze und umschauen! Wie viele von euch stehen hier auf engstem Raum — und welches Quadrat steht komplett leer?“',
        microCorrection: '„Lava-Zonen-Regel“: Sind 3 Spieler im selben Feld, muss der letzte sofort mit einem 3-Schritt-Explosiv-Antritt ins fernste freie Feld sprinten.',
      },
      {
        rondoId: 'act-7',
        rondoNumber: '4.1',
        title: 'Barça-Raute: Zu lasche Pässe in den falschen Fuß',
        symptom: 'Pässe rollen langsam in den vorderen Fuß von Spieler B, sodass das Timing für das Direktspiel auf #6 verloren geht.',
        freezeTrigger: 'Freeze, wenn ein zu weicher Pass Spieler B zwingt, den Ball umständlich umzulegen.',
        guidedQuestion: '„Schaut auf die Hüfte von B — welcher Fuß braucht den Ball für das Direktspiel auf #6, und was hat dieser lasche Pass bewirkt?“',
        microCorrection: 'Vor dem Pass mit der Hand den ballfernen Zielfuß anfordern: Scharfe, druckvolle Flachpässe mit klarer Botschaft!',
      },
      {
        rondoId: 'act-10',
        rondoNumber: '5.2',
        title: 'RAMP-Torrennen: Aufrechtes Bremsen & Überlaufen der Linie',
        symptom: 'Spieler sprinten schnell zur Mittellinie, bleiben beim Abstoppen aber aufrecht und rutschen über die Wendelinie hinaus.',
        freezeTrigger: 'Freeze exakt an der Mittellinie, wenn ein Spieler mit hohem Oberkörper und gestreckten Knien bremst.',
        guidedQuestion: '„Schau auf deine Haltung an der Bremslinie — kannst du mit gestreckten Knien bei 100 % Tempo die Richtung wechseln?“',
        microCorrection: '„3-Schritt-Trommelwirbel“ üben: 3 kurze, tiefe Bremsschritte mit Absenken der Hüfte vor dem explosiven Stemmschritt.',
      },
    ],
    tableTitle: 'Master-Tabelle: Feldgrößen & 3-Phasen-Dosierung für alle 10 Einstiege',
    tableHeaders: {
      num: 'Nr.',
      rondo: 'Einstiegs-Übung',
      goal: 'Schwerpunkt',
      baseArea: 'Basis-Feld (U15)',
      intensiveArea: 'Intensiv (U15)',
      setsAndRest: '3-Phasen-Dosierung',
    },
  },
  timer: {
    badge: 'Platz-Coaching-Tool',
    title: '3-Phasen-Aktivierungs-Timer (mit Trainerpfiff)',
    whistleOn: 'Pfiff AN',
    whistleOff: 'Stumm',
    presets: {
      small: '3 Phasen × 2:30 / 0:30 (11+ & Duelle)',
      medium: '3 Phasen × 3:00 / 0:30 (Standard-Einstieg)',
      positional: '3 Phasen × 3:30 / 0:40 (Scanning-Rundlauf)',
    },
    setLabel: 'Phase',
    ofLabel: 'von',
    workPhaseText: 'AKTIVE PHASE (INTENSITÄT STEIGERN!)',
    restPhaseText: '30s ÜBERGANG: NÄCHSTE PHASEN-REGEL!',
    pauseBtn: 'Pause',
    startBtn: 'Phase starten',
    resetBtn: 'Reset',
    customWorkLabel: 'Phase (Sek.)',
    customRestLabel: 'Übergang (Sek.)',
    customSetsLabel: 'Phasen',
    secondsUnit: 's',
  },
  printModal: {
    badge: 'Einstieg / Aktivierungs-Karte • U15 (14–15 J.)',
    printBtn: 'Drucken / Als PDF speichern',
    closeBtn: 'Schließen',
    dimensionsLabel: 'Feldgröße:',
    intensiveLabel: 'Intensiv:',
    dosageLabel: '3-Phasen-Dauer:',
    attackGoalLabel: 'Technik- & Kognitions-Ziel:',
    defenseGoalLabel: 'Körperstabilität & Explosivität:',
    scoringRuleLabel: 'Phase-3-Wettkampfregel:',
    monthlyProgressionTitle: '8-Einheiten-Monatsplan für diesen Einstieg:',
    sessionShortPrefix: 'Einh.',
  },
};

export const UI_ACTIVATION_RU: UIStrings = {
  header: {
    moduleBadge: 'Модуль 02 • Активация и Разминка (Einstieg)',
    ageBadge: 'U15 (14–15 лет)',
    title: 'Блок 1: Активация (SFV Einstieg) — Чувство мяча, Первое касание и Сила корпуса',
    langToggleTitle: 'Сменить язык (EN / DE / RU)',
    roleSwitcherLabel: 'Режим просмотра:',
    roles: {
      coach: 'Тренер',
      players: 'Игроки',
      parents: 'Родители',
    },
    roleDescriptions: {
      coach: 'Профессиональный режим тренера: прогрессии SFV Einstieg + RAMP + FIFA 11+, биомеханика торможения (защита в фазе роста PHV) и таймер 3 фаз.',
      players: 'Режим игрока: как каждое упражнение развивается на одной разметке от Фазы 1 (Ритм) к Фазе 2 (Координация и Сила корпуса) и Фазе 3 (100% Взрывная дуэль).',
      parents: 'Режим для родителей: как 15-минутная разминка с мячом объединяет технику, игровое мышление и профилактику травм FIFA 11+ в период скачка роста.',
    },
  },
  nav: {
    catalog: 'Активация',
    catalogShort: 'Упражнения',
    monthly: 'План на месяц',
    monthlyShort: 'План',
    methodology: 'Методика',
    methodologyShort: 'Теория',
    timer: 'Таймер',
    timerShort: 'Таймер',
    printCard: 'Печать карточки',
    printCardShort: 'Печать',
    printCardTooltip: 'Открыть печатную карточку активации или сохранить в PDF',
  },
  catalog: {
    filterTitle: 'Практика: 10 упражнений активации по 5 универсальным темам',
    filterSubtitle: 'Каждая карточка — это ОДНО цельное упражнение на одной разметке с 3 фазами прогрессии: Фаза 1 (Лёгкий вход) → Фаза 2 (Сила корпуса и когниция) → Фаза 3 (Взрыв и соревнование)',
    numberPrefix: '№',
    metersSuffix: 'м',
    exerciseLabel: 'Упражнение',
    openMonthlyPlanBtn: 'План на месяц',
    stepByStepTitle: 'Пошаговая анимация 3 фаз прогрессии:',
    phaseLabel: 'Фаза',
    prevPhase: 'Пред. фаза',
    nextPhase: 'След. фаза',
    fullscreenEnter: 'На весь экран',
    fullscreenExit: 'Свернуть',
    boardLayersLabel: 'Слои тактической доски:',
    layerPassesOn: '✓ Линии передач и целей',
    layerPassesOff: '× Линии передач и целей',
    layerMovementsOn: '✓ Ведение и взрывные рывки',
    layerMovementsOff: '× Ведение и взрывные рывки',
    layerShadowsOn: '✓ Зоны стабильности / Свободные зоны',
    layerShadowsOff: '× Зоны стабильности / Свободные зоны',
    legendPossession: 'Атакующие / С мячом',
    legendDefenders: 'Партнёр-тень / Защитник',
    legendNeutral: 'Опорный (#6) / Целевые ворота',
    squadCalcTitle: 'Калькулятор под состав сегодня:',
    playersTodayLabel: 'Игроков на поле:',
    playersUnit: 'чел.',
    pitchSizeLabel: 'Размеры зоны',
    intensivePrefix: 'Интенсив:',
    dosageLabel: 'Дозировка (3 фазы)',
    formatPrefix: 'Формат:',
    problemTitle: 'Проблема в игре → Зачем мы даём эту активацию',
    conditionsAndGoalsTitle: 'Технические и атлетические задачи по 3 фазам',
    attackGoalTitle: 'Техника и мышление (Чувство мяча, 1-е касание и поиск зон)',
    defenseGoalTitle: 'Сила корпуса, баланс и взрывная прогрессия (Фаза 2–3)',
    scoringRuleTitle: 'Правило соревнования в Фазе 3 (Выход на пик)',
    progressionsTitle: '3 прогрессивные фазы этого упражнения (Лёгкий вход → Сила → Взрыв)',
    coachingCuesTitle: 'Подсказки тренера (Коучинг):',
  },
  monthly: {
    matrixBadge: '4 Недели • 8 Тренировок',
    planTitlePrefix: 'План активации на месяц:',
    planSubtitle: 'Как развивать это упражнение активации на протяжении 8 тренировок: от плавного ритма и стабилизации суставов FIFA 11+ до скоростных дуэлей RAMP.',
    selectRondoLabel: 'Выберите базовую активацию месяца:',
    progressPrefix: 'Прогресс цикла:',
    progressMiddle: 'из',
    progressSuffix: 'тренировок выполнено',
    progressHint: 'Нажмите на карточку тренировки, чтобы отметить её выполнение',
    sessionLabel: 'Тренировка',
    loadPrefix: '',
    completedBadge: 'Выполнено',
    markCompletedBtn: 'Отметить',
    sessionStructureTitle: 'Структура 90-минутной тренировки (Блок 1 выделен)',
    sessionBlocks: [
      {
        step: '1. АКТИВАЦИЯ / РАЗМИНКА (15 мин)',
        title: 'Прогрессия из 3 фаз с мячом',
        desc: 'Одно упражнение на одной разметке: Фаза 1 Лёгкий ритм (4 мин) → Фаза 2 Когниция и Сила корпуса (6 мин) → Фаза 3 Взрыв и дуэль (5 мин).',
        highlighted: true,
        accentColor: 'text-emerald-400',
      },
      {
        step: '2. Рондо (15–18 мин)',
        title: 'Мост к главной теме',
        desc: 'Высокая плотность решений в сжатом пространстве на базе предсканирования и первого касания из Блока 1.',
        accentColor: 'text-blue-400',
      },
      {
        step: '3. Позиционная игра (25 мин)',
        title: '4v4+3 / 6v6+2',
        desc: 'Перенос приёма в движение, прорыва линий на ведении и игры «на третьего» в позиционные роли.',
        accentColor: 'text-purple-400',
      },
      {
        step: '4. Игра с воротами (30 мин)',
        title: '8v8 / 11v11',
        desc: 'Двусторонняя игра с бонусными очками за выполнение ключевых элементов тренировки.',
        accentColor: 'text-amber-400',
      },
    ],
  },
  methodology: {
    tabAll: 'Все разделы',
    tabPrinciples: 'Принципы',
    tabGeometry: 'Биомеханика и Касание',
    tabInterventions: 'Стоп-кадры (Freeze)',
    tabCheatSheet: 'Сводная таблица',
    cards: [
      {
        title: '1. Школа SFV (Einstieg) и прогрессия 3 фаз в 1 упражнении',
        icon: 'eye',
        iconBg: 'bg-emerald-500/20 text-emerald-400',
        bullets: [
          {
            title: 'Одно упражнение — три ступени сложности:',
            text: 'Не объединяйте 3 разных упражнения и не тратьте время на перестановку фишек. Начинайте лайтово в Фазе 1 (ритм и мобилизация), добавляйте когнитивный сигнал и баланс корпуса в Фазе 2 и включайте 100% взрыв в Фазе 3.',
            accentColor: 'text-emerald-400',
          },
          {
            title: 'Визуальные сигналы вместо свистка:',
            text: 'В Фазе 2 молча поднимайте цветные фишки, чтобы игроки держали голову поднятой и сканировали пространство ДО касания мяча (SFV Spielintelligenz).',
            accentColor: 'text-emerald-400',
          },
          {
            title: 'Первое касание = Первый шаг в свободную зону:',
            text: 'Запретите останавливать мяч подошвой на месте. Каждый приём (Mitnahme) должен сразу уводить игрока от давления в открытый коридор.',
            accentColor: 'text-emerald-400',
          },
        ],
      },
      {
        title: '2. Сила корпуса FIFA 11+ и принцип SFV «Mutig & Stark»',
        icon: 'award',
        iconBg: 'bg-rose-500/20 text-rose-400',
        bullets: [
          {
            title: 'Ось «Таз — Колено — Второй палец стопы» при торможении:',
            text: 'Встраивайте 2-секундные фиксации приземления на одной ноге и 3-шаговые остановки прямо внутрь Фазы 2 — это снижает риск бесконтактных травм колена и голеностопа до 50%.',
            accentColor: 'text-rose-400',
          },
          {
            title: 'Низкий центр тяжести и база укрывания мяча:',
            text: 'Учите игроков садиться ниже в ногах, ставить широкую базу, вставлять корпус между соперником и мячом и использовать согнутое предплечье как сенсор.',
            accentColor: 'text-amber-400',
          },
          {
            title: 'Готовность к силовому контакту плечо-в-плечо:',
            text: 'Игроки не должны входить в жёсткие рондо и единоборства «холодными»: в Фазе 2 они включают мышцы кора в контролируемом контакте плечом с партнёром.',
            accentColor: 'text-purple-400',
          },
        ],
      },
      {
        title: '3. Нейро-потенциация RAMP и защита в фазе роста (PHV)',
        icon: 'zap',
        iconBg: 'bg-amber-500/20 text-amber-400',
        bullets: [
          {
            title: 'Скачок роста PHV (13–15 лет):',
            text: 'В период быстрого роста костей у подростков временно страдает координация: делайте повышенный акцент на Фазу 2 (баланс, торможение, стабилизация голеностопа).',
            accentColor: 'text-amber-400',
          },
          {
            title: 'Пост-активационная потенциация (Фаза 3):',
            text: 'Последние 3–4 минуты разминки должны выходить на 95–100% взрывной скорости (реактивные гонки 1v1 в ворота), чтобы ЦНС была полностью заряжена перед основной частью.',
            accentColor: 'text-amber-400',
          },
          {
            title: 'Никакой статической растяжки перед взрывной работой:',
            text: 'Используйте только динамическую мобилизацию суставов (раскрытие таза, выпады в движении, махи), встроенную между сериями с мячом.',
            accentColor: 'text-amber-400',
          },
        ],
      },
    ],
    geometrySectionTitle: 'Интерактивная биомеханика и геометрия первого касания (4 концепта)',
    geometrySectionSubtitle: 'Переключайте каждую схему между типичной ошибкой на разминке и правильным техническим/биомеханическим решением.',
    geometryModeMistakeBtn: '✗ Типичная ошибка',
    geometryModeSolutionBtn: '✓ Правильное решение',
    geometryCueLabel: 'Живая подсказка голосом:',
    geometryConcepts: [
      {
        id: 'first-touch-escape',
        title: '1. Направленное первое касание (Mitnahme) против остановки на месте',
        subtitle: 'Почему остановка мяча под подошву убивает темп и как приём дальней ногой в движение отрезает прессинг за 1 шаг',
        mistakeLabel: '✗ Ошибка: Мёртвая остановка мяча подошвой на месте',
        mistakeDesc: 'Игрок N1 останавливает мяч под собой в центральной зоне и только потом поднимает голову — защитник D1 успевает съесть 3 метра дистанции и накрыть.',
        solutionLabel: '✓ Решение: Динамический уход первым касанием в свободную зону',
        solutionDesc: 'N1 заранее открывает таз и самым первым касанием пробрасывает мяч на 2 метра по диагонали от D1 в свободную зону, ускоряясь одним слитным движением.',
        coachingCue: '«Не останавливай мяч мёртво! Твоё первое касание — это уже твой первый шаг в свободные ворота!»',
      },
      {
        id: 'scan-before-touch',
        title: '2. Предсканирование и ориентация на цветные ворота',
        subtitle: 'Как собрать картину поля во время качения мяча, чтобы первое касание было автоматическим',
        mistakeLabel: '✗ Ошибка: Взгляд прикован к мячу и поздний поворот головы',
        mistakeDesc: 'Принимающий смотрит только на катящийся пас и ищет свободные ворота ПОСЛЕ остановки мяча, разворачиваясь прямо в защитника.',
        solutionLabel: '✓ Решение: Двойное сканирование через плечо во время полёта мяча',
        solutionDesc: 'Пока мяч ещё на полпути, принимающий сканирует через плечо позицию D1 и цветной сигнал, уходя первым касанием в открытый коридор.',
        coachingCue: '«Сканируй цветные ворота, пока мяч катится — знай свою дверь выхода до того, как мяч коснётся бутсы!»',
      },
      {
        id: 'deceleration-axis',
        title: '3. Эксцентрическое торможение и ось колена (FIFA 11+)',
        subtitle: 'Как 3 низких тормозящих шага защищают крестообразные связки и дают взрывной срез угла',
        mistakeLabel: '✗ Ошибка: Высокий корпус при остановке и завал колена внутрь (Вальгус)',
        mistakeDesc: 'Игрок пытается затормозить на прямых ногах с высоким тазом; опорное колено проваливается внутрь (вальгус), приводя к проскальзыванию и риску травмы.',
        solutionLabel: '✓ Решение: 3 низких тормозящих шага и жёсткая ось «Таз-Колено-Носок»',
        solutionDesc: 'Игрок опускает центр тяжести за 3 частых шага торможения и ставит внешнюю стопу так, что таз, колено и второй палец стопы образуют единую сильную линию.',
        coachingCue: '«Садись ниже на торможении! Три частых шага, колено над носком — оттолкни газон от себя!»',
      },
      {
        id: 'shielding-base',
        title: '4. Широкая база укрывания мяча и предплечье-сенсор',
        subtitle: 'Принцип SFV Mutig & Stark: как выдержать силовое давление со спины и развернуть опекуна',
        mistakeLabel: '✗ Ошибка: Узкая прямая стойка и мяч под ближней к защитнику ногой',
        mistakeDesc: 'Атакующий стоит на прямых узких ногах и оставляет мяч под ближней к защитнику стопой — любой толчок в плечо ведёт к потере.',
        solutionLabel: '✓ Решение: Низкая широкая стойка, мяч под дальней ногой и предплечье-сенсор',
        solutionDesc: 'Атакующий опускает таз, ставит ноги широко, вставляет корпус между защитником и мячом (мяч под дальней ногой) и предплечьем считывает навал для разворота.',
        coachingCue: '«Сядь низко, широкая база, предплечье как сенсор, мяч под дальней ногой — почувствуй, куда он давит, и крути!»',
      },
    ],
    interventionsSectionTitle: 'Картотека «Стоп-кадров» (Freeze) для разминки и активации (6 сценариев)',
    interventionsSectionSubtitle: 'Как за 15 секунд поправить технику, посадку корпуса и взрывную резкость, не давая игрокам остыть.',
    symptomLabel: 'Симптом на поле',
    freezeTriggerLabel: 'Момент для свистка «СТОП!»',
    guidedQuestionLabel: 'Наводящий вопрос игрокам',
    microCorrectionLabel: 'Микро-коррекция за 15 секунд',
    openRondoInCatalogBtn: 'Открыть упражнение на доске',
    interventions: [
      {
        rondoId: 'act-1',
        rondoNumber: '1.1',
        title: 'Квадрат Coerver: Взгляд приклеен к газону',
        symptom: 'Игроки быстро перебирают мяч ногами, но смотрят строго вниз на бутсы, сталкиваясь друг с другом и не видя цветных фишек.',
        freezeTrigger: 'Молча поднимите цветную фишку на 3 секунды — свистните, если половина группы не отреагировала.',
        guidedQuestion: '«Стоп! Не опуская глаз на мяч — какого цвета фишку я сейчас держу, и какие внешние ворота полностью свободны?»',
        microCorrection: 'Включите 90 секунд «немого визуального коучинга»: каждый раз, когда тренер меняет цвет фишки, игроки обязаны громко крикнуть цвет во время V-cut.',
      },
      {
        rondoId: 'act-3',
        rondoNumber: '2.1',
        title: 'Звезда SFV: Остановка мяча на месте под подошву',
        symptom: 'Принимающие в центре останавливают мяч мёртво внутри квадрата 5×5 м и делают лишнее касание перед пасом.',
        freezeTrigger: 'Остановите игру в ту секунду, когда игрок в центральном квадрате 5×5 м наступил подошвой на стоячий мяч.',
        guidedQuestion: '«Замри! Если в матче защитник D1 летит тебе в спину, а ты остановил мяч на месте в этом квадрате — сколько секунд ты только что подарил сопернику?»',
        microCorrection: 'Введите «Правило выхода с 1-го касания»: мяч обязан покинуть границы квадрата 5×5 м уже ПЕРВЫМ касанием принимающего.',
      },
      {
        rondoId: 'act-4',
        rondoNumber: '2.2',
        title: 'Y-схема (#6): Открывание по прямой без сканирования',
        symptom: 'Опорный (#6) бежит навстречу пасу по прямой спиной к полю и не видит, на какое плечо смещается D1.',
        freezeTrigger: 'Свистните, когда пас от A1 прошёл полпути к #6, а опорный ни разу не повернул голову через плечо.',
        guidedQuestion: '«Шестой номер, стоп! Не оборачиваясь — какое твоё плечо сейчас атакует D1: левое или правое?»',
        microCorrection: 'Потребуйте от #6 отскакивать под углом 45° и до касания мяча хлопнуть себя по левому или правому плечу, показывая, где находится D1.',
      },
      {
        rondoId: 'act-5',
        rondoNumber: '3.1',
        title: 'Динамический квадрат: Скученность 3 игроков в одной зоне',
        symptom: 'Три или четыре игрока сбиваются с мячами в один квадрант 9×9 м, пока соседний квадрант пустует.',
        freezeTrigger: 'Свистните в момент, когда 3 игрока оказались в одном квадранте при наличии полностью пустого соседнего.',
        guidedQuestion: '«Стоп, оглянитесь! Сколько вас собралось в этом маленьком квадрате — и какая зона сейчас стоит совершенно пустой?»',
        microCorrection: 'Включите правило «Раскалённая лава»: если 3 игрока оказались в одной зоне, последний вошедший обязан сделать взрывной рывок из 3 шагов в самый дальний пустой квадрат.',
      },
      {
        rondoId: 'act-7',
        rondoNumber: '4.1',
        title: 'Ромб Барселоны: Слабый пас под ближнюю ногу',
        symptom: 'Передача катится слишком медленно и под ближнюю ногу игрока B, ломая тайминг скидки в 1 касание на #6.',
        freezeTrigger: 'Остановите эпизод, когда слабый пас заставил игрока B перекладывать мяч под другую ногу.',
        guidedQuestion: '«Посмотрите на корпус B — под какую ногу ему нужен мяч для игры в касание на #6, и к чему привёл этот мягкий пас под ближнюю?»',
        microCorrection: 'Перед пасом принимающий указывает рукой на дальнюю ногу: требуйте плотной передачи низом с «посланием».',
      },
      {
        rondoId: 'act-10',
        rondoNumber: '5.2',
        title: 'Гонка RAMP: Торможение на прямых ногах и пролёт мимо линии',
        symptom: 'Игроки быстро бегут к средней линии, но тормозят с высоким корпусом и проскальзывают на метр дальше точки среза.',
        freezeTrigger: 'Остановите в момент торможения на средней линии, когда грудь игрока высоко поднята, а ноги почти прямые.',
        guidedQuestion: '«Посмотри на свою стойку на линии торможения — можно ли сменить направление на 100% скорости на прямых коленях, или где должен быть твой таз?»',
        microCorrection: 'Отработайте «барабанную дробь из 3 шагов»: 3 частых низких шага с опусканием таза перед жёстким упором внешней стопой.',
      },
    ],
    tableTitle: 'Сводная таблица (Мастер-лист): Размеры зон и дозировка 3 фаз для всех 10 активаций',
    tableHeaders: {
      num: '№',
      rondo: 'Упражнение активации',
      goal: 'Главная задача',
      baseArea: 'Базовая зона (U15)',
      intensiveArea: 'Интенсив (U15)',
      setsAndRest: 'Дозировка 3 фаз',
    },
  },
  timer: {
    badge: 'Полевой инструмент тренера',
    title: 'Таймер 3 фаз активации (со свистком)',
    whistleOn: 'Свисток ВКЛ',
    whistleOff: 'Без звука',
    presets: {
      small: '3 фазы × 2:30 / 0:30 (11+ и дуэли)',
      medium: '3 фазы × 3:00 / 0:30 (Стандарт Einstieg)',
      positional: '3 фазы × 3:30 / 0:40 (Пасовые квадраты)',
    },
    setLabel: 'Фаза',
    ofLabel: 'из',
    workPhaseText: 'РАБОЧАЯ ФАЗА (ПОВЫШАЕМ ИНТЕНСИВНОСТЬ!)',
    restPhaseText: '30с ПЕРЕХОД: ВВОДИМ ПРАВИЛО СЛЕДУЮЩЕЙ ФАЗЫ!',
    pauseBtn: 'Пауза',
    startBtn: 'Старт фазы',
    resetBtn: 'Сброс',
    customWorkLabel: 'Фаза (сек)',
    customRestLabel: 'Переход (сек)',
    customSetsLabel: 'Фаз',
    secondsUnit: 'с',
  },
  printModal: {
    badge: 'Карточка активации / разминки • U15 (14–15 лет)',
    printBtn: 'Печать / Сохранить PDF',
    closeBtn: 'Закрыть',
    dimensionsLabel: 'Размеры зоны:',
    intensiveLabel: 'Интенсив:',
    dosageLabel: 'Дозировка 3 фаз:',
    attackGoalLabel: 'Техника и мышление:',
    defenseGoalLabel: 'Сила корпуса и взрыв:',
    scoringRuleLabel: 'Соревнование (Фаза 3):',
    monthlyProgressionTitle: 'План прогрессии этой активации на 8 тренировок месяца:',
    sessionShortPrefix: 'Трен.',
  },
};

// ============================================================================
// 7. SCIENTIFIC METHODOLOGY & AGE MATRIX FOR ACTIVATION (act-1..10)
// ============================================================================

export const ACTIVATION_METHODOLOGY_EN: Record<string, RondoMethodologicalBasis> = {
  'act-1': {
    originSchool: 'Wiel Coerver Ball Mastery × SFV Footeco + FIFA 11+',
    scientificBasis: 'High-frequency bilateral ball touches combined with peripheral vision cues and single-leg landing stabilization wake up ankle proprioceptors and the visual-motor cortex.',
    matchTransfer: 'Allows players to manipulate the ball in congested central traffic while keeping their chin up to spot open passing or dribbling lanes.',
  },
  'act-2': {
    originSchool: 'Ajax ASM (Athletic Skills Model) & Coerver 1v1 Mirror Duels',
    scientificBasis: 'Synchronous mirror movement trains reactive agility, low center-of-gravity hip abduction, and deceptive upper-body dissociation before 100% first-step acceleration.',
    matchTransfer: 'Directly transfers to 1v1 wing and half-space duels where a sudden shoulder drop freezes the full-back for 0.3 seconds.',
  },
  'act-3': {
    originSchool: 'SFV UEFA C / J+S Lernbaustein „Erster Ballkontakt“ (Mitnahme)',
    scientificBasis: 'Coupling pre-reception shoulder scanning with a dynamic first touch reduces visuo-motor processing time by ~400ms and integrates core anti-rotation bracing.',
    matchTransfer: 'Prevents central players from stopping the ball dead under pressure, turning the very first touch into a line-breaking step.',
  },
  'act-4': {
    originSchool: 'FC Barcelona (Perfilación) & SFV Spielintelligenz',
    scientificBasis: 'Training the central pivot (#6) to read the pressing defender’s hip vector during ball flight builds ecological affordance perception and back-foot orientation.',
    matchTransfer: 'Equips #6 and #8 midfielders to either open seamlessly on the half-turn or spin tight markers in 1 touch.',
  },
  'act-5': {
    originSchool: 'SFV Einstieg „Freilaufen“ & DFB Dynamic Space Exploration',
    scientificBasis: 'Constraining quadrant occupancy forces continuous spatial scanning, self-organization, and rapid tempo changes (Tempowechsel) from 65% glide to 100% burst.',
    matchTransfer: 'Eliminates ball-swarming in youth squads and builds the habit of accelerating into vacant pockets of space.',
  },
  'act-6': {
    originSchool: 'DFB / RB Leipzig Dynamic Line-Breaking Carry & Contact Prep',
    scientificBasis: 'Combines high-speed dribbling tempo shifts across a tactical line with controlled lateral shoulder-to-shoulder impact bracing.',
    matchTransfer: 'Trains center-backs and midfielders to drive aggressively through open corridors and absorb physical challenges without losing stride.',
  },
  'act-7': {
    originSchool: 'FC Barcelona „Rueda de Pases“ (Joan Vilà / Paco Seirul·lo)',
    scientificBasis: 'Synchronizes passing weight, back-foot body shape, Third-Man timing, and FIFA 11+ aerial jump-landing knee alignment in one continuous diamond flow.',
    matchTransfer: 'Automates the A → B → #6 wall-pass rhythm so players execute 1-touch Third-Man combinations effortlessly in Rondos and matches.',
  },
  'act-8': {
    originSchool: 'Ajax Amsterdam Double-Box Scanning & Inter-Pivot Circuit',
    scientificBasis: 'Requires mandatory head turns before ball arrival inside a congested 6×6 m inner box, priming working memory and fast 1-touch split passes.',
    matchTransfer: 'Directly prepares the double-pivot (#6/#8) to combine through the opponent’s central pressing block.',
  },
  'act-9': {
    originSchool: 'FIFA 11+ Injury Prevention × SFV „Mutig & Stark“ (Big 4)',
    scientificBasis: 'Progresses from single-leg neuromuscular knee stabilization to isometric/eccentric core bracing and tactile forearm shielding under live physical pressure.',
    matchTransfer: 'Builds physical robustness in 1v1 duels so players protect the ball on the far foot and roll off aggressive defenders.',
  },
  'act-10': {
    originSchool: 'Ian Jeffreys RAMP Protocol & Eccentric Deceleration Mechanics',
    scientificBasis: 'Multi-step eccentric braking with low hips protects the ACL/hamstrings during high-speed cuts and triggers Post-Activation Potentiation (PAP) for peak sprint velocity.',
    matchTransfer: 'Creates 1.5 meters of separation on sharp cutbacks and primes 100% reactive speed for the main session.',
  },
};

export const ACTIVATION_METHODOLOGY_DE: Record<string, RondoMethodologicalBasis> = {
  'act-1': {
    originSchool: 'Wiel Coerver Ballgefühl × SFV Footeco + FIFA 11+',
    scientificBasis: 'Hochfrequente beidfüßige Ballkontakte kombiniert mit peripherem Scanning und Einbein-Stabilitätslandungen aktivieren die Propriozeption im Sprunggelenk sowie den visuell-motorischen Kortex.',
    matchTransfer: 'Befähigt Spieler, den Ball im dichten Zentrum eng zu führen und gleichzeitig mit erhobenem Kopf freie Pass- und Dribblingwege zu erkennen.',
  },
  'act-2': {
    originSchool: 'Ajax ASM (Athletic Skills Model) & Coerver 1gg1-Spiegelduelle',
    scientificBasis: 'Synchrones Spiegel-Bewegen schult reaktive Agilität, tiefen Körperschwerpunkt und Oberkörpertäuschungen vor dem 100 %-Explosiv-Antritt.',
    matchTransfer: 'Direkter Übertrag auf 1gg1-Flügel- und Halbraumduelle, in denen eine schnelle Schulterfinte den Verteidiger für 0,3 Sekunden einfriert.',
  },
  'act-3': {
    originSchool: 'SFV UEFA C / J+S Lernbaustein „Erster Ballkontakt“ (Mitnahme)',
    scientificBasis: 'Die Kopplung von Schulterblicken im Ballflug mit einer dynamischen Ballmitnahme verkürzt die Entscheidungszeit um ~400 ms und integriert Rumpfstabilität bei Gegnerkontakt.',
    matchTransfer: 'Verhindert das Totstoppen des Balls unter Druck und macht den ersten Kontakt zum raumgewinnenden Schritt.',
  },
  'act-4': {
    originSchool: 'FC Barcelona (Perfilación) & SFV Spielintelligenz',
    scientificBasis: 'Schult den Sechser (#6), den Anlaufwinkel des Verteidigers während des Ballflugs zu lesen und zwischen offenem Aufdrehen und enger Haken-Drehung zu wählen.',
    matchTransfer: 'Rüstet zentrale Mittelfeldspieler (#6/#8) aus, unter Gegnerdruck im Rücken sicher aufzudrehen.',
  },
  'act-5': {
    originSchool: 'SFV Einstieg „Freilaufen“ & DFB Raum-Exploration',
    scientificBasis: 'Die Begrenzung der Spielerzahl pro Quadrant erzwingt permanentes Scannen, Selbstorganisation und scharfe Tempowechsel von 65 % auf 100 %.',
    matchTransfer: 'Beseitigt die typische Rudelbildung um den Ball und automatisiert das Beschleunigen in freie Räume.',
  },
  'act-6': {
    originSchool: 'DFB / RB Leipzig Linienbrechendes Tempodribbling & Körperkontakt',
    scientificBasis: 'Verbindet explosive Tempowechsel über eine taktische Linie mit kontrollierter Rumpfspannung bei seitlichem Schulter-an-Schulter-Kontakt.',
    matchTransfer: 'Trainiert Innenverteidiger und Mittelfeldspieler, offene Korridore mutig im Dribbling zu durchbrechen und Körperkontakt stabil abzufedern.',
  },
  'act-7': {
    originSchool: 'FC Barcelona „Rueda de Pases“ (Joan Vilà / Paco Seirul·lo)',
    scientificBasis: 'Synchronisiert Passschärfe, offene Stellung über den fernen Fuß, Dritter-Mann-Timing und FIFA 11+ Landestabilität nach Kopfbällen in einem Rauten-Fluss.',
    matchTransfer: 'Automatisiert das Wandspiel über #6, sodass 1-Kontakt-Kombinationen auf den Dritten Mann im Rondo und Spiel mühelos gelingen.',
  },
  'act-8': {
    originSchool: 'Ajax Amsterdam Doppelquadrat-Scanning & Doppel-Sechs-Rundlauf',
    scientificBasis: 'Erzwingt doppelte Schulterblicke vor der Ballannahme in einer engen 6×6 m Innenbox und schärft das Arbeitsgedächtnis für 1-Kontakt-Schnittstellenpässe.',
    matchTransfer: 'Bereitet die Doppel-Sechs (#6/#8) direkt darauf vor, durch das gegnerische Zentrumspressing zu kombinieren.',
  },
  'act-9': {
    originSchool: 'FIFA 11+ Prävention × SFV „Mutig & Stark“ (Big 4)',
    scientificBasis: 'Führt von einbeiniger Knie-Stabilisation über isometrische Rumpfspannung bis zum physischen Ballabschirmen mit Unterarm-Sensor.',
    matchTransfer: 'Baut Zweikampfhärte im 1gg1 auf, damit Spieler den Ball am fernen Fuß behaupten und Gegenspieler explosiv abrollen.',
  },
  'act-10': {
    originSchool: 'Ian Jeffreys RAMP-Protokoll & Exzentrische Abbremsmechanik',
    scientificBasis: 'Mehrschrittiges exzentrisches Abbremsen mit tiefer Hüfte schützt Kreuzband/Hamstrings bei scharfen Cuts und löst Post-Activation Potentiation (PAP) für 100 % Sprintspeed aus.',
    matchTransfer: 'Schafft 1,5 Meter Vorsprung bei scharfen Richtungswechseln und zündet die maximale Aktionsschnelligkeit für den Hauptteil.',
  },
};

export const ACTIVATION_METHODOLOGY_RU: Record<string, RondoMethodologicalBasis> = {
  'act-1': {
    originSchool: 'Школа Wiel Coerver × SFV Footeco + FIFA 11+',
    scientificBasis: 'Частые двуногие касания мяча в сочетании с периферическим сканированием и фиксацией одноногих приземлений включают проприоцепцию голеностопа и зрительно-моторную кору.',
    matchTransfer: 'Позволяет игрокам плотно контролировать мяч в насыщенном трафике с поднятой головой, мгновенно находя коридоры для прорыва.',
  },
  'act-2': {
    originSchool: 'Ajax ASM (Athletic Skills Model) и зеркальные дуэли Coerver 1v1',
    scientificBasis: 'Синхронная зеркальная работа тренирует реактивную ловкость, низкую посадку таза и обманную диссоциацию корпуса перед 100% стартовым взрывом.',
    matchTransfer: 'Прямой перенос в фланговые дуэли 1v1, где резкий уклон плечом «замораживает» защитника на 0.3 секунды.',
  },
  'act-3': {
    originSchool: 'SFV UEFA C / Модуль J+S «Erster Ballkontakt» (Первое касание)',
    scientificBasis: 'Связка предсканирования через плечо с направленным первым касанием сокращает время принятия решения на ~400 мс и включает антиротационную стабильность кора.',
    matchTransfer: 'Исключает мёртвую остановку мяча под прессингом, превращая первое касание в шаг прорыва линии.',
  },
  'act-4': {
    originSchool: 'ФК «Барселона» (Perfilación) и SFV Spielintelligenz',
    scientificBasis: 'Обучает опорного (#6) считывать вектор движения защитника во время качения мяча и выбирать между приёмом вполоборота и резким разворотом на спине соперника.',
    matchTransfer: 'Даёт центральным полузащитникам (#6/#8) навык безошибочного разворота вперёд под плотным давлением.',
  },
  'act-5': {
    originSchool: 'SFV Einstieg «Freilaufen» и динамический поиск зон DFB',
    scientificBasis: 'Ограничение числа игроков в квадранте заставляет непрерывно сканировать поле, самоорганизовываться и включать резкую смену темпа (65% → 100%).',
    matchTransfer: 'Убирает сбивание игроков в кучу вокруг мяча и формирует рефлекс мгновенного рывка в пустую зону.',
  },
  'act-6': {
    originSchool: 'DFB / РБ Лейпциг: Прорыв линии на ведении и контактная готовность',
    scientificBasis: 'Сочетает скоростную смену ритма ведения через тактическую линию с силовой стабилизацией корпуса при боковом контакте плечо-в-плечо.',
    matchTransfer: 'Учит центральных защитников и хавбеков смело разрезать линии на ведении и держать силовой удар без потери шага.',
  },
  'act-7': {
    originSchool: 'ФК «Барселона» — «Rueda de Pases» (Жоан Вила / Пако Сейрульо)',
    scientificBasis: 'Синхронизирует силу паса, открытый корпус под дальнюю ногу, тайминг «третьего» и стабилизацию приземления после прыжка (FIFA 11+) в едином потоке.',
    matchTransfer: 'Доводит до автоматизма стенку через #6 и комбинации в 1 касание на «третьего» перед переходом к рондо.',
  },
  'act-8': {
    originSchool: 'Аякс (Амстердам): Двойной квадрат сканирования и связка опорных',
    scientificBasis: 'Требует обязательного двойного поворота головы до приёма мяча внутри тесного квадрата 6×6 м, активируя рабочую память и разрезающий пас в 1 касание.',
    matchTransfer: 'Готовит пару опорных (#6/#8) к быстрому выходу из-под центрального прессинга соперника.',
  },
  'act-9': {
    originSchool: 'Профилактика FIFA 11+ × SFV «Mutig & Stark» (Big 4)',
    scientificBasis: 'Ведёт от одноногой стабилизации оси колена к изометрическому упору кора и тактильному укрыванию мяча с предплечьем-сенсором в живой борьбе.',
    matchTransfer: 'Формирует силовую устойчивость в единоборствах 1v1, позволяя сохранять мяч под дальней ногой и разворачивать агрессивного опекуна.',
  },
  'act-10': {
    originSchool: 'Протокол RAMP (Иэн Джеффрис) и биомеханика эксцентрического торможения',
    scientificBasis: 'Многошаговое торможение с низким тазом защищает крестообразные связки и заднюю поверхность бедра при резких срезах и запускает пост-активационную потенциацию (PAP).',
    matchTransfer: 'Даёт 1.5 метра отрыва на резком торможении и выводит ЦНС на 100% скоростной готовности к основной части тренировки.',
  },
};

const buildAgeVariants = (
  lang: 'en' | 'de' | 'ru',
  baseU10: string,
  baseU12: string,
  baseU14: string,
  baseU16: string,
  baseU18: string
): Record<AgeBandId, RondoAgeVariant> => {
  if (lang === 'de') {
    return {
      u10: {
        baseGrid: baseU10,
        intensiveGrid: baseU10,
        timing: '3 Phasen × 2,5 Min. | Pause: 30 Sek.',
        touchesRule: 'Freie Kontakte (Spielerisch & Beidfüßig)',
        ageCoachingFocus: 'Koordination, Freude am Ball, Fang- & Orientierungsspiele; Farbsignale als spielerische Jagd und tierische Gleichgewichts-Stops (Flamingo) in Phase 2.',
      },
      u12: {
        baseGrid: baseU12,
        intensiveGrid: baseU10,
        timing: '3 Phasen × 3 Min. | Pause: 30 Sek.',
        touchesRule: 'Phase 1–2 frei, Phase 3 max. 2 Kontakte beim Passen',
        ageCoachingFocus: 'Goldenes Lernalter: Hochfrequente Ballkontakte, Beidfüßigkeit strikt einfordern & erste 1gg1-Wettkämpfe um Hütchentore in Phase 3.',
      },
      u14: {
        baseGrid: baseU14,
        intensiveGrid: baseU12,
        timing: '3 Phasen (3m / 5m / 3m) | Pause: 45 Sek.',
        touchesRule: 'Saubere Mitnahme (1. Kontakt in Bewegung)',
        ageCoachingFocus: 'PHV-Wachstumsschub-Schutz: Fokus auf Phase 2 (Knie-über-Fußspitze, exzentrisches Bremsen, Rumpfkraft); Paare bei Schulterkontakt strikt nach Körpergröße einteilen!',
      },
      u16: {
        baseGrid: baseU16,
        intensiveGrid: baseU14,
        timing: '3 Phasen × 3 Min. | Pause: 30 Sek.',
        touchesRule: '1–2 Kontakte unter aktivem Zeit- & Gegnerdruck',
        ageCoachingFocus: 'RAMP-Potenzierung, Zweikampfhärte (Mutig & Stark) in Phase 2 und 100 % Explosiv-Sprints in Phase 3 mit Punktewertung.',
      },
      u18_pro: {
        baseGrid: baseU18,
        intensiveGrid: baseU16,
        timing: '3 Phasen × 3 Min. | Pause: 30 Sek.',
        touchesRule: 'Kompromissloses 1-Kontakt- & Hochgeschwindigkeits-Tempospiel',
        ageCoachingFocus: 'Maximale neuromuskuläre PAP-Aktivierung (95–100 % Speed), gegensätzliche Farbkommandos und maximaler Gegnerdruck.',
      },
    };
  }

  if (lang === 'ru') {
    return {
      u10: {
        baseGrid: baseU10,
        intensiveGrid: baseU10,
        timing: '3 фазы × 2.5 мин | Отдых: 30 сек',
        touchesRule: 'Свободные касания (игра двумя ногами)',
        ageCoachingFocus: 'Ловкость, радость работы с мячом, пространственная ориентация без муштры; в Фазе 2 — игровые стоп-балансы на одной ноге по свистку.',
      },
      u12: {
        baseGrid: baseU12,
        intensiveGrid: baseU10,
        timing: '3 фазы × 3 мин | Отдых: 30 сек',
        touchesRule: 'Фаза 1–2 свободно, Фаза 3 — выход за 2 касания',
        ageCoachingFocus: '«Золотой возраст техники»: максимальная частота касаний обеими ногами, арсенал финтов и азартные гонки 1v1 в цветные ворота.',
      },
      u14: {
        baseGrid: baseU14,
        intensiveGrid: baseU12,
        timing: '3 фазы (3м / 5м / 3м) | Отдых: 45 сек',
        touchesRule: 'Направленный приём в движение (Mitnahme)',
        ageCoachingFocus: 'Защита в скачке роста (PHV): приоритет Фазы 2 (контроль оси колена, мягкое торможение, стабилизация кора); в силовых парах подбирать партнёров строго по росту и весу!',
      },
      u16: {
        baseGrid: baseU16,
        intensiveGrid: baseU14,
        timing: '3 фазы × 3 мин | Отдых: 30 сек',
        touchesRule: '1–2 касания под реальным давлением соперника',
        ageCoachingFocus: 'Нейро-потенциация RAMP, плотный силовой контакт плечо-в-плечо в Фазе 2 и 100% взрывные дуэли на счёт в Фазе 3.',
      },
      u18_pro: {
        baseGrid: baseU18,
        intensiveGrid: baseU16,
        timing: '3 фазы × 3 мин | Отдых: 30 сек',
        touchesRule: 'Максимальная скорость: 1 касание и взрывной уход',
        ageCoachingFocus: 'Пиковая потенциация ЦНС (PAP 95–100%), инверсные цветовые сигналы и максимальное сопротивление защитника в финальной фазе.',
      },
    };
  }

  return {
    u10: {
      baseGrid: baseU10,
      intensiveGrid: baseU10,
      timing: '3 phases × 2.5 min | Rest: 30 sec',
      touchesRule: 'Unlimited touches (bilateral ball mastery & joy)',
      ageCoachingFocus: 'Multilateral coordination, spatial awareness, and playful agility; frame Phase 2 color cues as a treasure game with fun 2-second statue balance freezes.',
    },
    u12: {
      baseGrid: baseU12,
      intensiveGrid: baseU10,
      timing: '3 phases × 3 min | Rest: 30 sec',
      touchesRule: 'Phases 1–2 free mastery, Phase 3 crisp 2-touch exit',
      ageCoachingFocus: 'Golden age of motor learning: demand both left and right foot execution, directional touch, and an exciting 1v1 gate race in Phase 3.',
    },
    u14: {
      baseGrid: baseU14,
      intensiveGrid: baseU12,
      timing: '3 phases (3m / 5m / 3m) | Rest: 45 sec',
      touchesRule: 'Dynamic first touch into space (Mitnahme)',
      ageCoachingFocus: 'PHV Growth-Spurt Protection: emphasize Phase 2 (knee-over-toe axis, multi-step braking, core stability); pair players by biological maturity for contact!',
    },
    u16: {
      baseGrid: baseU16,
      intensiveGrid: baseU14,
      timing: '3 phases × 3 min | Rest: 30 sec',
      touchesRule: '1–2 touches under live closing pressure',
      ageCoachingFocus: 'RAMP neural potentiation, full physical shoulder bracing (Mutig & Stark) in Phase 2, and 100% competitive sprint duels in Phase 3.',
    },
    u18_pro: {
      baseGrid: baseU18,
      intensiveGrid: baseU16,
      timing: '3 phases × 3 min | Rest: 30 sec',
      touchesRule: '1-touch combinational speed & explosive 1v1 separation',
      ageCoachingFocus: 'Peak Post-Activation Potentiation (95–100% velocity), opposite/stroop visual cues in Phase 2, and unscripted 100% live duels in Phase 3.',
    },
  };
};

export const ACTIVATION_AGE_MATRIX_EN: Record<string, Record<AgeBandId, RondoAgeVariant>> = {
  'act-1': buildAgeVariants('en', '16 × 16 m', '18 × 18 m', '22 × 22 m', '20 × 20 m', '18 × 18 m'),
  'act-2': buildAgeVariants('en', '20 × 14 m', '22 × 15 m', '26 × 18 m', '24 × 16 m', '22 × 14 m'),
  'act-3': buildAgeVariants('en', '16 × 16 m', '18 × 18 m', '22 × 22 m', '20 × 20 m', '18 × 18 m'),
  'act-4': buildAgeVariants('en', '20 × 15 m', '22 × 16 m', '26 × 20 m', '24 × 18 m', '22 × 16 m'),
  'act-5': buildAgeVariants('en', '16 × 16 m', '18 × 18 m', '22 × 22 m', '20 × 20 m', '18 × 18 m'),
  'act-6': buildAgeVariants('en', '20 × 14 m', '22 × 15 m', '26 × 18 m', '24 × 16 m', '22 × 14 m'),
  'act-7': buildAgeVariants('en', '16 × 16 m', '18 × 18 m', '22 × 22 m', '20 × 20 m', '18 × 18 m'),
  'act-8': buildAgeVariants('en', '16 × 16 m', '18 × 18 m', '22 × 22 m', '20 × 20 m', '18 × 18 m'),
  'act-9': buildAgeVariants('en', '16 × 16 m', '18 × 18 m', '22 × 22 m', '20 × 20 m', '18 × 18 m'),
  'act-10': buildAgeVariants('en', '18 × 14 m', '20 × 15 m', '24 × 18 m', '22 × 16 m', '20 × 14 m'),
};

export const ACTIVATION_AGE_MATRIX_DE: Record<string, Record<AgeBandId, RondoAgeVariant>> = {
  'act-1': buildAgeVariants('de', '16 × 16 m', '18 × 18 m', '22 × 22 m', '20 × 20 m', '18 × 18 m'),
  'act-2': buildAgeVariants('de', '20 × 14 m', '22 × 15 m', '26 × 18 m', '24 × 16 m', '22 × 14 m'),
  'act-3': buildAgeVariants('de', '16 × 16 m', '18 × 18 m', '22 × 22 m', '20 × 20 m', '18 × 18 m'),
  'act-4': buildAgeVariants('de', '20 × 15 m', '22 × 16 m', '26 × 20 m', '24 × 18 m', '22 × 16 m'),
  'act-5': buildAgeVariants('de', '16 × 16 m', '18 × 18 m', '22 × 22 m', '20 × 20 m', '18 × 18 m'),
  'act-6': buildAgeVariants('de', '20 × 14 m', '22 × 15 m', '26 × 18 m', '24 × 16 m', '22 × 14 m'),
  'act-7': buildAgeVariants('de', '16 × 16 m', '18 × 18 m', '22 × 22 m', '20 × 20 m', '18 × 18 m'),
  'act-8': buildAgeVariants('de', '16 × 16 m', '18 × 18 m', '22 × 22 m', '20 × 20 m', '18 × 18 m'),
  'act-9': buildAgeVariants('de', '16 × 16 m', '18 × 18 m', '22 × 22 m', '20 × 20 m', '18 × 18 m'),
  'act-10': buildAgeVariants('de', '18 × 14 m', '20 × 15 m', '24 × 18 m', '22 × 16 m', '20 × 14 m'),
};

export const ACTIVATION_AGE_MATRIX_RU: Record<string, Record<AgeBandId, RondoAgeVariant>> = {
  'act-1': buildAgeVariants('ru', '16 × 16 м', '18 × 18 м', '22 × 22 м', '20 × 20 м', '18 × 18 м'),
  'act-2': buildAgeVariants('ru', '20 × 14 м', '22 × 15 м', '26 × 18 м', '24 × 16 м', '22 × 14 м'),
  'act-3': buildAgeVariants('ru', '16 × 16 м', '18 × 18 м', '22 × 22 м', '20 × 20 м', '18 × 18 м'),
  'act-4': buildAgeVariants('ru', '20 × 15 м', '22 × 16 м', '26 × 20 м', '24 × 18 м', '22 × 16 м'),
  'act-5': buildAgeVariants('ru', '16 × 16 м', '18 × 18 м', '22 × 22 м', '20 × 20 м', '18 × 18 м'),
  'act-6': buildAgeVariants('ru', '20 × 14 м', '22 × 15 м', '26 × 18 м', '24 × 16 м', '22 × 14 м'),
  'act-7': buildAgeVariants('ru', '16 × 16 м', '18 × 18 м', '22 × 22 м', '20 × 20 м', '18 × 18 м'),
  'act-8': buildAgeVariants('ru', '16 × 16 м', '18 × 18 м', '22 × 22 м', '20 × 20 м', '18 × 18 м'),
  'act-9': buildAgeVariants('ru', '16 × 16 м', '18 × 18 м', '22 × 22 м', '20 × 20 м', '18 × 18 м'),
  'act-10': buildAgeVariants('ru', '18 × 14 м', '20 × 15 м', '24 × 18 м', '22 × 16 м', '20 × 14 м'),
};
