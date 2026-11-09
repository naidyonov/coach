import { CategoryItem, MonthlySessionItem, RondoItem, UIStrings } from './types';
import { computeSquadSetup } from '../domain/squadCalculator';

export const CATEGORIES_EN: CategoryItem[] = [
  { id: 'all', name: 'All', color: 'bg-emerald-600', dot: 'bg-emerald-400' },
  { id: 'retention', name: 'Ball Retention', color: 'bg-emerald-600', dot: 'bg-emerald-400' },
  { id: 'progression', name: 'Progression', color: 'bg-blue-600', dot: 'bg-blue-400' },
  { id: 'switch', name: 'Switching Play', color: 'bg-amber-600', dot: 'bg-amber-400' },
  { id: 'defense', name: 'Pressing & 3rd Man', color: 'bg-rose-600', dot: 'bg-rose-400' },
  { id: 'transition', name: 'Transition', color: 'bg-purple-600', dot: 'bg-purple-400' }
];

export const RONDOS_EN: RondoItem[] = [
  // 1.1 RONDO 3v1
  {
    id: 'rondo-1',
    number: '1.1',
    title: '3v1 Rondo: Support Angles & Passing Lanes',
    shortTitle: 'Support Angles & Passing Lanes',
    category: 'retention',
    categoryName: 'Ball Retention',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    format: '3v1 (4 sides)',
    playersCount: '4 players (or 3 groups of 4)',
    dimensionsU15: {
      base: '9 × 9 m (2 touches)',
      intensive: '8 × 8 m (1–2 touches)'
    },
    timingU15: '4 sets × 1.5 min | Rest: 30 sec',
    problemInGame: 'Players stand still after passing, hide in the defender’s cover shadow, and leave the ball-carrier isolated without passing options.',
    attackGoal: 'Always provide the ball-carrier with 2 open passing lanes (left and right at 45° angles) by synchronously rotating onto the vacant side of the square.',
    defenseGoal: 'Press on a curved run (arc), using your Cover Shadow to block one option while forcing the ball-carrier into a corner onto their weaker foot.',
    scoringRule: 'Attack: 1 point for every 8 rhythm passes without stopping the ball. Defense: 1 point for a clean interception or forcing the ball out of bounds; 2 points if you force an aerial pass.',
    coachingCues: [
      'Pass and move — immediately scan which of the 4 sides is vacant and sprint to occupy it!',
      'Receive with your back foot (furthest from the defender) with an open body shape facing the center.',
      'Don’t wait for the ball to reach your teammate — trigger your support run the moment the pass is struck.'
    ],
    progressions: [
      { level: 'Stage 1 (Foundation)', desc: '9×9 m grid, mandatory 2 touches (back-foot reception + pass).' },
      { level: 'Stage 2 (Complexity)', desc: 'No return pass to the same player (must play through the third man while rotating sides).' },
      { level: 'Stage 3 (High Intensity)', desc: '8×8 m grid, strictly 1–2 touches, max 1.5 seconds on the ball per player.' }
    ],
    diagram: {
      type: 'single_square',
      gridLabel: '9×9 m Grid (4 cones)',
      cones: [
        { x: 100, y: 60 }, { x: 400, y: 60 },
        { x: 100, y: 340 }, { x: 400, y: 340 }
      ],
      phases: [
        {
          title: 'Phase 1: Reception & Finding Two Passing Lanes',
          desc: 'Player A (top) has the ball. Player B offers support on the left, Player C at the bottom. The right side of the grid is vacant. Defender D1 blocks the direct diagonal pass to C with his cover shadow.',
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
            { from: { x: 220, y: 170 }, to: { x: 155, y: 185 }, role: 'def', label: 'Curved press' },
            { from: { x: 250, y: 55 }, to: { x: 395, y: 180 }, role: 'att', label: 'Run to vacant line' }
          ],
          shadows: [
            { points: '220,170 210,340 290,340' }
          ]
        },
        {
          title: 'Phase 2: Synchronous Rotation to the Vacant Line',
          desc: 'While the ball travels to B, Player A sprints onto the vacant right line. Now B immediately has two safe passing options again: C at the bottom and A wide right.',
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
            { from: { x: 155, y: 205 }, to: { x: 230, y: 295 }, role: 'def', label: 'D1 shifts' },
            { from: { x: 95, y: 200 }, to: { x: 245, y: 55 }, role: 'att', label: 'B rotates top' }
          ],
          shadows: [
            { points: '155,205 395,150 395,245' }
          ]
        },
        {
          title: 'Phase 3: Completing the Cycle & New Triangle',
          desc: 'Player C has the ball at the bottom. Player B has already occupied the top line, and A is open on the right. The support triangle geometry is fully restored without pause.',
          players: [
            { id: 'A', role: 'att', label: 'A', x: 405, y: 200 },
            { id: 'B', role: 'att', label: 'B', x: 250, y: 55 },
            { id: 'V', role: 'att', label: 'C', x: 250, y: 345 },
            { id: 'D1', role: 'def', label: 'D1', x: 245, y: 280 }
          ],
          ball: { x: 250, y: 328 },
          passes: [
            { from: { x: 255, y: 335 }, to: { x: 395, y: 210 }, label: 'Pass 3', primary: true },
            { from: { x: 250, y: 330 }, to: { x: 250, y: 70 }, label: 'Split pass', primary: false }
          ],
          movements: [
            { from: { x: 250, y: 345 }, to: { x: 95, y: 200 }, role: 'att', label: 'Rotate left after pass' }
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
    title: '5v2 Rondo: Support Play & Split Pass',
    shortTitle: 'Support Play & Split Pass',
    category: 'retention',
    categoryName: 'Ball Retention',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    format: '5v2',
    playersCount: '7 players',
    dimensionsU15: {
      base: '11 × 11 m (2 touches)',
      intensive: '10 × 10 m (1 touch)'
    },
    timingU15: '4 sets × 2 min | Rest: 40 sec',
    problemInGame: 'Possession players circulate the ball safely around the perimeter, afraid to play penetrative passes that split the two pressing defenders.',
    attackGoal: 'Draw both defenders into one half of the grid with short combination passes, then thread a disguised split pass between them to the far-side teammate.',
    defenseGoal: 'Work in a staggered pair (first defender presses the ball, second covers diagonally behind), never getting caught flat on the same line.',
    scoringRule: 'Attack: perimeter passes score 0 points (only keep possession alive); 1 point is awarded ONLY for an accurate split pass between the two defenders. Defense: 1 point for an interception.',
    coachingCues: [
      'A short pass to your nearest teammate is bait to draw the two defenders closer together.',
      'Far-side player: constantly adjust your angle to stay in the window between the two defenders!',
      'Defenders: maintain a 3–4 meter staggered distance and protect the central gap between you.'
    ],
    progressions: [
      { level: 'Stage 1 (Foundation)', desc: '11×11 m, 2 touches, 1 point for a split pass OR 10 consecutive passes.' },
      { level: 'Stage 2 (Complexity)', desc: 'ONLY split passes between the defenders count for points. The pass immediately following a split pass must be 1-touch.' },
      { level: 'Stage 3 (High Intensity)', desc: '10×10 m, strictly 1 touch for all players. If defenders intercept a split pass, the passer immediately defends.' }
    ],
    diagram: {
      type: 'single_square',
      gridLabel: '11×11 m Grid',
      cones: [
        { x: 100, y: 60 }, { x: 400, y: 60 },
        { x: 100, y: 340 }, { x: 400, y: 340 }
      ],
      phases: [
        {
          title: 'Phase 1: Drawing the Defensive Pair Together',
          desc: 'Players 1 and 2 in the top-left corner exchange short passes, drawing both defenders (D1 and D2) toward the ball.',
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
            { from: { x: 165, y: 65 }, to: { x: 108, y: 145 }, label: 'Short bait pass', primary: true }
          ],
          movements: [
            { from: { x: 165, y: 115 }, to: { x: 135, y: 145 }, role: 'def', label: 'D1 presses' },
            { from: { x: 225, y: 165 }, to: { x: 195, y: 135 }, role: 'def', label: 'D2 steps up' }
          ],
          shadows: []
        },
        {
          title: 'Phase 2: Penetrative Split Pass (+1 Point)',
          desc: 'Defenders D1 and D2 get caught flat. Player 2 instantly fires a firm ground pass right between them to far-side Player 5!',
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
            { from: { x: 108, y: 155 }, to: { x: 260, y: 335 }, label: 'SPLIT PASS (+1 pt)', primary: true }
          ],
          movements: [
            { from: { x: 250, y: 345 }, to: { x: 270, y: 345 }, role: 'att', label: 'Adjust into gap' }
          ],
          shadows: [
            { points: '145,175 195,130 330,280 210,335' }
          ]
        },
        {
          title: 'Phase 3: One-Touch Layoff into Space',
          desc: 'Player 5 receives the split pass and plays a 1-touch layoff to free Player 4 on the right while the defenders are turning.',
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
            { from: { x: 272, y: 335 }, to: { x: 395, y: 215 }, label: '1-touch layoff', primary: true }
          ],
          movements: [
            { from: { x: 235, y: 215 }, to: { x: 330, y: 235 }, role: 'def', label: 'Recovery run' }
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
    title: '7v3 Rondo: Progression Through Pivot (#6)',
    shortTitle: 'Progression Through Pivot (#6)',
    category: 'progression',
    categoryName: 'Progression',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    format: '6 on perimeter + 1 central pivot (#6) vs 3',
    playersCount: '10 players',
    dimensionsU15: {
      base: '15 × 15 m (2 touches)',
      intensive: '13 × 13 m (#6 on 1 touch)'
    },
    timingU15: '4 sets × 2.5 min | Rest: 45 sec',
    problemInGame: 'During build-up, defenders are afraid to play into the central defensive midfielder (#6) under pressure and resort to aimless long balls down the channels.',
    attackGoal: 'Three pathways to the center: feed the central pivot (#6), who must turn or bounce the ball in 1–2 touches to a teammate on a free perimeter line.',
    defenseGoal: 'Two priorities: 1) screen the center (block passing lanes into #6 using the central defender’s cover shadow); 2) press cohesively as a triangle.',
    scoringRule: 'Attack: 1 point for every "Perimeter → Pivot (#6) → New Perimeter Line" sequence (2 points if #6 switches to the opposite line in 1 touch). Defense: 1 point for winning the ball within 6 passes.',
    coachingCues: [
      'Pivot (#6): scan over your shoulder BEFORE the ball is played! Continuously drift into pockets behind the pressing line.',
      'Perimeter players: don’t force the pass into #6 if he is flat-footed with a defender tight on his back — shift the press sideways first.',
      'Defenders: one presses the ball, the second screens #6 in his cover shadow, the third tucks in to protect the near flank.'
    ],
    progressions: [
      { level: 'Stage 1 (Sessions 1–2)', desc: '15×15 m. Connect through (#6) and out; defense focuses on screening the center.' },
      { level: 'Stage 2 (Sessions 3–4)', desc: 'ONLY sequences through (#6) score points; defense works as a coordinated pressing triangle.' },
      { level: 'Stage 3 (Sessions 5–6)', desc: '13×13 m. Central pivot (#6) plays strictly 1-touch; defense must regain the ball within 6 passes.' }
    ],
    diagram: {
      type: 'single_square',
      gridLabel: '15×15 m Grid (6 outside + #6 inside vs 3)',
      cones: [
        { x: 90, y: 50 }, { x: 410, y: 50 },
        { x: 90, y: 350 }, { x: 410, y: 350 }
      ],
      phases: [
        {
          title: 'Phase 1: Shifting the Press to Open the Lane to (#6)',
          desc: '6 attackers on the perimeter, pivot (#6) in the center. The blue trio (D1, D2, D3) screens the middle. The ball is moved from bottom-left (#7) to (#8) to open the passing lane into (#6).',
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
            { from: { x: 188, y: 345 }, to: { x: 310, y: 345 }, label: 'Shift the press', primary: true }
          ],
          movements: [
            { from: { x: 255, y: 205 }, to: { x: 285, y: 215 }, role: 'neutral', label: '#6 drifts out of shadow' },
            { from: { x: 165, y: 255 }, to: { x: 265, y: 305 }, role: 'def', label: 'D1 shifts to ball' }
          ],
          shadows: [
            { points: '225,235 235,175 280,190 270,250' }
          ]
        },
        {
          title: 'Phase 2: Finding the Pivot (#6) Between the Lines',
          desc: 'Player 8 receives the ball. As D1 and D2 shift across, #6 steps into the open window between them and receives a vertical pass on the half-turn.',
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
            { from: { x: 315, y: 335 }, to: { x: 288, y: 228 }, label: 'Entry pass to (6)', primary: true }
          ],
          movements: [
            { from: { x: 225, y: 240 }, to: { x: 270, y: 225 }, role: 'def', label: 'Collapse on (6)' }
          ],
          shadows: []
        },
        {
          title: 'Phase 3: Pivot (#6) Switches Attack to Free Line (+1 Point)',
          desc: 'Having pre-scanned the pitch, (#6) plays a 1-touch pass to the top line (Player 3) or wide right (Player 5), bypassing all three defenders!',
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
            { from: { x: 288, y: 205 }, to: { x: 320, y: 60 }, label: 'Exit via (6) (+1 pt)', primary: true },
            { from: { x: 295, y: 215 }, to: { x: 400, y: 200 }, label: 'Wide option', primary: false }
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
    title: '8v4 + 2CM Rondo: Breaking Lines via #6 & #8',
    shortTitle: 'Breaking Lines via #6 & #8',
    category: 'progression',
    categoryName: 'Progression',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    format: '8 on perimeter + 2 central midfielders (#6 & #8) vs 4',
    playersCount: '14 players',
    dimensionsU15: {
      base: '22 × 16 m (2 zones of 11×16 m)',
      intensive: '20 × 14 m (2 touches)'
    },
    timingU15: '3 sets × 3 min | Rest: 1 min',
    problemInGame: 'The holding (#6) and box-to-box (#8) midfielders stand on the same vertical or horizontal line, blocking each other’s passing lanes during build-up.',
    attackGoal: 'Progress the ball from one endline (center-backs) to the opposite endline (strikers), engaging at least one of the two staggered central midfielders (#6 or #8).',
    defenseGoal: 'Defend in two compact pairs (2 in the first zone, 2 in the second): squeeze central spaces and prevent #6 and #8 from turning.',
    scoringRule: 'Attack: 1 point for progressing endline-to-endline through one central midfielder; 2 points for combining "Endline → #6 → #8 → Opposite Endline". Defense: 1 point for regain + pass to coach/mini-goals.',
    coachingCues: [
      'Midfielders #6 and #8 must never stand on the same line: if #6 drops left, #8 pushes higher and right (diagonal staggering)!',
      'Use the wide players on the sidelines to stretch the defensive four horizontally and open central passing lanes.'
    ],
    progressions: [
      { level: 'Stage 1 (Foundation)', desc: 'Defenders are locked to their respective halves (2 in left zone, 2 in right zone).' },
      { level: 'Stage 2 (Complexity)', desc: 'One defender from the first zone may cross the midline to create a 3v1 pressing overload in the center.' },
      { level: 'Stage 3 (High Intensity)', desc: 'Direct passes from wing to endline are forbidden unless a central midfielder (#6 or #8) touches the ball in that phase.' }
    ],
    diagram: {
      type: 'double_zone',
      gridLabel: '22×16 m Double-Zone Grid',
      cones: [
        { x: 60, y: 60 }, { x: 250, y: 60 }, { x: 440, y: 60 },
        { x: 60, y: 340 }, { x: 250, y: 340 }, { x: 440, y: 340 }
      ],
      phases: [
        {
          title: 'Phase 1: Build-Up from Endline & Diagonal Staggering (#6–#8)',
          desc: 'The ball starts with the Center-Backs (CB) on the left endline. Inside, two yellow midfielders (#6 in Zone 1, #8 in Zone 2) occupy staggered diagonals against two defensive pairs.',
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
            { from: { x: 65, y: 140 }, to: { x: 150, y: 65 }, label: 'Out wide', primary: true },
            { from: { x: 155, y: 65 }, to: { x: 175, y: 210 }, label: 'Entry to (6)', primary: true }
          ],
          movements: [
            { from: { x: 175, y: 225 }, to: { x: 185, y: 195 }, role: 'neutral', label: '#6 checks to ball' }
          ],
          shadows: []
        },
        {
          title: 'Phase 2: Vertical "6 → 8" Link Between the Lines',
          desc: 'Pivot (#6) receives from the flank, turns on the half-turn, and threads a line-breaking pass across the midline to (#8), who feeds the Striker (CF)!',
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
            { from: { x: 195, y: 192 }, to: { x: 305, y: 158 }, label: 'Link 6 → 8', primary: true },
            { from: { x: 325, y: 155 }, to: { x: 432, y: 255 }, label: 'Feed CF (+2 pts)', primary: true }
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
    title: '6v3 Two-Grid Rondo: Overload to Isolate & Switch',
    shortTitle: 'Overload & Switch (6v3)',
    category: 'switch',
    categoryName: 'Switching Play',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    format: '6v3 with switch of play into the vacant grid',
    playersCount: '9–12 players',
    dimensionsU15: {
      base: '2 grids of 12 × 12 m (total 24 × 12 m)',
      intensive: '2 grids of 11 × 11 m with a 2 m central channel'
    },
    timingU15: '4 sets × 2.5 min | Rest: 45 sec',
    problemInGame: 'The team gets bogged down forcing play on a congested flank where the opponent has numerical superiority, instead of quickly switching to the weak side.',
    attackGoal: 'Complete at least 4–5 quick passes in one grid to draw all 3 defenders in, then switch the ball along the ground to a teammate expanding into the adjacent vacant grid.',
    defenseGoal: 'Lock the opponent inside the first grid while screening the internal passing lanes into the second grid.',
    scoringRule: 'Attack: 1 point for every successful switch into the second grid after a minimum of 4 passes and retaining control in the new zone. Defense: 1 point for intercepting the switch.',
    coachingCues: [
      'Far-side attacker: as soon as the 3rd pass is made, anticipate and move early into the second grid to provide width for the switch!',
      'Don’t switch on the first pass without drawing pressure — force the defensive trio to compact in the first zone first.'
    ],
    progressions: [
      { level: 'Stage 1 (Foundation)', desc: 'Switch is unlocked after 4 passes to any player breaking into the second grid.' },
      { level: 'Stage 2 (Complexity)', desc: 'Switch is allowed ONLY after playing through the central player inside the first grid.' },
      { level: 'Stage 3 (High Intensity)', desc: 'Only 2 fresh defenders sprint across into the second grid, while the 3rd stays on the midline to screen any return switch.' }
    ],
    diagram: {
      type: 'double_zone',
      gridLabel: 'Two 12×12 m Grids (24×12 m)',
      cones: [
        { x: 60, y: 60 }, { x: 250, y: 60 }, { x: 440, y: 60 },
        { x: 60, y: 340 }, { x: 250, y: 340 }, { x: 440, y: 340 }
      ],
      phases: [
        {
          title: 'Phase 1: Drawing the Trio into the Left Grid (4 Passes)',
          desc: 'In the left grid, 6 attackers keep possession against 3 defenders. On the 4th pass, far-side Player 6 expands early into the vacant right grid.',
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
            { from: { x: 75, y: 275 }, to: { x: 148, y: 335 }, label: '4th pass', primary: false },
            { from: { x: 162, y: 335 }, to: { x: 340, y: 272 }, label: 'SWITCH TO GRID 2 (+1)', primary: true }
          ],
          movements: [
            { from: { x: 145, y: 55 }, to: { x: 340, y: 70 }, role: 'att', label: 'Unit shifts across' },
            { from: { x: 235, y: 160 }, to: { x: 425, y: 190 }, role: 'att', label: 'Fill wide lane' }
          ],
          shadows: []
        },
        {
          title: 'Phase 2: Re-Establishing Shape in the Second Grid',
          desc: 'The ball is switched into the right grid. Attackers quickly occupy the new perimeter lines while the 3 defenders are forced to sprint across the pitch.',
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
            { from: { x: 355, y: 260 }, to: { x: 425, y: 130 }, label: 'Circulate in new zone', primary: true }
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
    title: '4v4 + 3N Positional Rondo: Switching Zones',
    shortTitle: '4v4+3N Positional Switch',
    category: 'switch',
    categoryName: 'Switching Play',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    format: '4v4 + 3 Neutrals (2 endline targets & 1 central pivot)',
    playersCount: '11 players',
    dimensionsU15: {
      base: '24 × 16 m (bisected by a dashed midline)',
      intensive: '22 × 14 m (2 touches)'
    },
    timingU15: '3 sets × 4 min | Rest: 1 min',
    problemInGame: 'Lack of transfer between small rondos and the 11v11 match: players lose positional structure (diamond + width + pivot) when facing equal numbers.',
    attackGoal: 'Using the 7v4 numerical superiority (via 3 neutrals), transfer the ball from one endline neutral to the opposite endline neutral through the central pivot (#6).',
    defenseGoal: 'Upon losing possession, transition immediately into an organized 4v7 press, screening the central neutral (#6) and forcing a turnover.',
    scoringRule: '1 point for transferring from left neutral to right neutral; 2 points if the switch goes through the central pivot (#6). On a regain, Blue and Red immediately swap roles!',
    coachingCues: [
      'Two in-possession players hold width top and bottom in the left zone, two in the right zone (do not bunch up in one half!).',
      'The central neutral (#6) patrols along the dashed midline, linking both halves of the pitch.'
    ],
    progressions: [
      { level: 'Stage 1 (Foundation)', desc: 'Endline neutrals move freely along their entire endline (2 touches).' },
      { level: 'Stage 2 (Complexity)', desc: 'All 3 neutrals play strictly 1-touch.' },
      { level: 'Stage 3 (High Intensity)', desc: 'Capstone Game of the Month (Session #8): points stack for passes via (#6), third-man combinations, and zone switches.' }
    ],
    diagram: {
      type: 'double_zone',
      gridLabel: '24×16 m Pitch with Dashed Midline (Module Diagram)',
      cones: [
        { x: 60, y: 60 }, { x: 250, y: 60 }, { x: 440, y: 60 },
        { x: 60, y: 340 }, { x: 250, y: 340 }, { x: 440, y: 340 }
      ],
      phases: [
        {
          title: 'Phase 1: Build-Up in Left Half & Entry into Central Pivot (#6)',
          desc: 'Red (4 players) combines with 3 yellow neutrals (N1 left, #6 on the midline, N2 right). Possession on the left opens an entry pass into #6.',
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
            { from: { x: 155, y: 75 }, to: { x: 242, y: 182 }, label: 'Entry to (6)', primary: true }
          ],
          movements: [],
          shadows: []
        },
        {
          title: 'Phase 2: Switch via (#6) into Right Zone to Far Target N2',
          desc: 'Central neutral (#6) turns and switches play into the right half to R4, who connects with far target neutral N2 (+2 points).',
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
            { from: { x: 258, y: 198 }, to: { x: 340, y: 325 }, label: 'Switch zone', primary: true },
            { from: { x: 352, y: 325 }, to: { x: 435, y: 208 }, label: 'Target N2 (+2)', primary: true }
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
    title: '6v3 Defensive Rondo: Corner Pressing Trap',
    shortTitle: 'Corner Pressing Trap (6v3)',
    category: 'defense',
    categoryName: 'Pressing & 3rd Man',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    format: '3 Defenders (primary coaching focus) vs 6',
    playersCount: '9 players',
    dimensionsU15: {
      base: '14 × 14 m',
      intensive: '13 × 13 m'
    },
    timingU15: '4 sets × 2 min | Rest: 45 sec',
    problemInGame: 'Defenders chase the ball individually one by one, leaving easy split-pass lanes wide open.',
    attackGoal: 'Escape the corner pressing trap via a long switch or a rapid 1-touch triangle.',
    defenseGoal: 'PRIMARY FOCUS ON THE DEFENSIVE TRIO: funnel the opponent’s pass into a corner of the grid and synchronously spring the trap (D1 presses on an arc from the center, D2 & D3 lock on to both adjacent line options).',
    scoringRule: 'Score is tracked by the DEFENSIVE TRIO: 2 points for a tackle or interception inside a corner trap within 6 passes; 1 point if they force an error out of bounds.',
    coachingCues: [
      'First defender (D1): don’t run in a straight line! Curve your run from the center to cut off the switch back and funnel the ball into the corner.',
      'Second & third defenders (D2 & D3): don’t ball-watch — step tight onto the nearest support players on the lines as the ball travels into the corner!'
    ],
    progressions: [
      { level: 'Stage 1 (Foundation)', desc: 'Four 2×2 m corner trap zones are marked with cones: regains inside them score double points.' },
      { level: 'Stage 2 (Complexity)', desc: 'Defenders have a 6-pass limit to win the ball back.' },
      { level: 'Stage 3 (High Intensity)', desc: 'After winning the ball, the 3 defenders must complete 1 accurate pass among themselves inside the grid to lock in the point.' }
    ],
    diagram: {
      type: 'single_square',
      gridLabel: '14×14 m Grid (Focus on Corner Pressing Trap)',
      cones: [
        { x: 90, y: 50 }, { x: 410, y: 50 },
        { x: 90, y: 350 }, { x: 410, y: 350 }
      ],
      phases: [
        {
          title: 'Phase 1: Funneling the Pass into the Corner Trap',
          desc: 'Top player (2) has the ball. Defender D1 curves his run from the right, cutting off the switch to (3) and forcing the pass into the top-left corner to Player 1.',
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
            { from: { x: 230, y: 52 }, to: { x: 108, y: 62 }, label: 'Forced pass to corner', primary: true }
          ],
          movements: [
            { from: { x: 255, y: 120 }, to: { x: 235, y: 70 }, role: 'def', label: 'D1 arc (cuts off right)' },
            { from: { x: 145, y: 165 }, to: { x: 110, y: 95 }, role: 'def', label: 'D2 jumps into trap' },
            { from: { x: 215, y: 185 }, to: { x: 125, y: 195 }, role: 'def', label: 'D3 locks sideline' }
          ],
          shadows: [
            { points: '245,80 410,50 410,160' }
          ]
        },
        {
          title: 'Phase 2: Springing the Trap in the Corner (+2 Defense Points)',
          desc: 'Player 1 is trapped in the top-left corner: D2 engages the ball, D1 blocks the return pass to (2), and D3 blocks the line pass down to (4). The trap snaps shut!',
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
            { from: { x: 118, y: 95 }, to: { x: 102, y: 72 }, role: 'def', label: 'REGAIN IN TRAP!' }
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
    title: 'Bartolini "Third-Man" Rondo (Inner Box)',
    shortTitle: 'Bartolini "Third-Man" Rondo',
    category: 'defense',
    categoryName: 'Pressing & 3rd Man',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    format: '7 on perimeter + 1 in inner box vs 3',
    playersCount: '11 players',
    dimensionsU15: {
      base: 'Outer grid 16 × 16 m, inner box 5 × 5 m',
      intensive: 'Outer 14 × 14 m, inner 4 × 4 m'
    },
    timingU15: '4 sets × 2.5 min | Rest: 45 sec',
    problemInGame: 'When the direct passing lane to a free teammate is blocked by a defender’s cover shadow, players abort progressive play instead of finding him via a "Third-Man" bounce pass.',
    attackGoal: 'Find the player inside the inner box (or on the far line) when the direct lane is blocked by using the "Pass A → B (angled) → 1-Touch Layoff to Third Man C" combination.',
    defenseGoal: 'Maintain a compact defensive block around the 5×5 m inner box, looking to intercept either the first vertical pass or the 1-touch layoff.',
    scoringRule: 'ONLY "Third-Man" combinations count toward the score, where the second player (B) lays the ball off in 1 touch to the third player (C) who was initially screened from (A).',
    coachingCues: [
      'The Third Man (C) must time his movement into the window while the ball is still traveling from A to B!',
      'The weight and angle of A’s pass to B tells B where to bounce it in 1 touch: pass to the left foot means layoff left; to the right foot means layoff right.'
    ],
    progressions: [
      { level: 'Stage 1 (Foundation)', desc: 'The central player in the 5×5 m inner box acts as the "Second Man" (bouncing the ball out to the Third Man).' },
      { level: 'Stage 2 (Complexity)', desc: 'The central player acts as the "Third Man": direct passes from the bottom line into the box are forbidden — entry must come via a 1-touch layoff from a wide player.' },
      { level: 'Stage 3 (High Intensity)', desc: 'Every entry and exit pass involving the inner box must be played strictly in 1 touch.' }
    ],
    diagram: {
      type: 'concentric_square',
      gridLabel: '16×16 m Outer Grid + 5×5 m Inner Box (Bartolini)',
      cones: [
        { x: 80, y: 45 }, { x: 420, y: 45 },
        { x: 80, y: 355 }, { x: 420, y: 355 },
        { x: 195, y: 145 }, { x: 305, y: 145 },
        { x: 195, y: 255 }, { x: 305, y: 255 }
      ],
      phases: [
        {
          title: 'Phase 1: Direct Lane to (C) Blocked — Pass to Second Man (B)',
          desc: 'Player A at the bottom wants to find central player C inside the inner box, but defender D1 blocks the direct lane. A plays a firm diagonal pass to wide player B!',
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
            { from: { x: 250, y: 200 }, to: { x: 275, y: 215 }, role: 'neutral', label: 'C angles for layoff' }
          ],
          shadows: [
            { points: '250,285 215,190 285,190' }
          ]
        },
        {
          title: 'Phase 2: 1-Touch Layoff to "Third Man" C (+1 Point)',
          desc: 'Player B Cushions a 1-touch layoff past the cover shadow directly to "Third Man" C inside the inner box, who turns and switches the attack to the top line!',
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
            { from: { x: 410, y: 248 }, to: { x: 285, y: 218 }, label: '2. Layoff B → C (1-touch)', primary: true },
            { from: { x: 275, y: 205 }, to: { x: 170, y: 55 }, label: '3. Exit to top', primary: false }
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
    title: '4v2 (+4 Outside) Transition Rondo: 3-Sec Counter-Press',
    shortTitle: '3-Sec Counter-Press (4v2+4)',
    category: 'transition',
    categoryName: 'Transition',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    format: '4v2 in inner grid + 4 teammates of defenders on outer perimeter',
    playersCount: '10 players (5v5)',
    dimensionsU15: {
      base: '10 × 10 m inner grid inside a 22 × 22 m outer grid',
      intensive: '9 × 9 m inner grid inside a 20 × 20 m outer grid'
    },
    timingU15: '4 sets × 2 min | Rest: 45 sec',
    problemInGame: 'At the moment of ball loss, players freeze, throw their hands up, or immediately drop off, allowing the opponent to launch an uncontested counter-attack.',
    attackGoal: 'Keep possession 4v2 inside the small grid. ON BALL LOSS: all 4 attackers must swarm the ball within 3 seconds (Gegenpressing) and win it back before it exits to the outer grid.',
    defenseGoal: 'Upon interception, the 2 central defenders must play the ball out in 1–2 touches to one of their 4 teammates stationed around the 22×22 m outer perimeter.',
    scoringRule: 'Red: 1 point for 10 passes in the inner grid; 2 POINTS for an immediate counter-press regain within 3 seconds! Blue: 1 point for breaking out of the inner grid and keeping possession 6v4 in the large grid.',
    coachingCues: [
      '3-Second Rule: the instant you lose the ball — zero steps backward! Nearest player hunts the ball, the other three collapse the funnel around him.',
      'Central Blue defenders: scan and locate your 4 outer teammates BEFORE you even win the ball!'
    ],
    progressions: [
      { level: 'Stage 1 (Foundation)', desc: 'Play stops as soon as Blue connects a pass into the outer grid (+1 point to Blue).' },
      { level: 'Stage 2 (Complexity)', desc: 'Once Blue plays out to the perimeter, play continues live as a 6v4 rondo across the entire 22×22 m grid.' },
      { level: 'Stage 3 (High Intensity)', desc: 'Replace the 4 outer teammates with 4 mini-goals: after winning the ball, Blue has 3 seconds to score in any mini-goal.' }
    ],
    diagram: {
      type: 'concentric_square',
      gridLabel: '10×10 m Inner Grid Inside 22×22 m Outer Grid',
      cones: [
        { x: 70, y: 40 }, { x: 430, y: 40 },
        { x: 70, y: 360 }, { x: 430, y: 360 },
        { x: 170, y: 120 }, { x: 330, y: 120 },
        { x: 170, y: 280 }, { x: 330, y: 280 }
      ],
      phases: [
        {
          title: 'Phase 1: 4v2 Retention Inside the Inner Grid',
          desc: 'Inside the 10×10 m inner grid, 4 Red players circulate the ball against 2 Blue defenders (B1, B2). Outside on the 22×22 m perimeter, 4 Blue teammates (B3–B6) wait for the breakout pass.',
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
            { from: { x: 245, y: 128 }, to: { x: 225, y: 175 }, label: 'B1 intercepts!', primary: true }
          ],
          movements: [],
          shadows: []
        },
        {
          title: 'Phase 2: Moment of Loss — Explosive Counter-Press (3 Seconds!)',
          desc: 'Blue B1 intercepts the pass and looks to play out to B3 or B4. All 4 Red players immediately collapse the net around B1 to win the ball back within 3 seconds (+2 points)!',
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
            { from: { x: 220, y: 175 }, to: { x: 85, y: 198 }, label: 'Blue breakout attempt', primary: false }
          ],
          movements: [
            { from: { x: 245, y: 140 }, to: { x: 232, y: 170 }, role: 'att', label: 'Counter-press!' },
            { from: { x: 190, y: 185 }, to: { x: 218, y: 180 }, role: 'att', label: 'Swarm the ball' },
            { from: { x: 245, y: 245 }, to: { x: 235, y: 195 }, role: 'att', label: 'Close the net!' }
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
    title: '5v3 Two-Zone Transition Rondo: Escape the Pressure Zone',
    shortTitle: 'Escape Pressure Zone (5v3)',
    category: 'transition',
    categoryName: 'Transition',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    format: '5v3 in Zone 1 (+2 teammates waiting in Zone 2)',
    playersCount: '10 players (5 Red vs 5 Blue)',
    dimensionsU15: {
      base: '2 adjacent grids of 14 × 14 m (28 × 14 m)',
      intensive: '2 adjacent grids of 12 × 12 m (24 × 12 m)'
    },
    timingU15: '4 sets × 2.5 min | Rest: 1 min',
    problemInGame: 'After winning the ball deep, teams make their first pass inside the same congested pressure zone and immediately turn it back over against counter-pressing.',
    attackGoal: 'In 5v3 possession — complete 8 passes for 1 point. On ball loss — prevent the 3 defenders from playing out to their 2 waiting teammates in the second grid.',
    defenseGoal: 'FOCUS ON EXITING THE PRESSURE ZONE: as soon as the trio wins the ball, play out on the 1st or 2nd pass into the second grid to the 2 free waiting teammates, then sprint across to establish a new 5v3 rondo!',
    scoringRule: '1 point for every 8 passes inside a grid; 2 points for a clean regain, first-time exit pass into the second zone, and consolidating possession there (5 passes in the new grid).',
    coachingCues: [
      'Golden rule after winning the ball: get the ball out of the pressure zone where you just won it into open space!',
      'Two waiting target players in Zone 2: move constantly along the midline, checking into windows between Red players to receive the first breakout pass.'
    ],
    progressions: [
      { level: 'Stage 1 (Foundation)', desc: 'Exit into the second zone is allowed within 2 passes after winning the ball.' },
      { level: 'Stage 2 (Complexity)', desc: 'Exit into the second zone must be played on the FIRST pass after regain (or via a 1-touch bounce from a waiting target player to a third man).' },
      { level: 'Stage 3 (High Intensity)', desc: 'All 5 players who lost the ball may counter-press for 4 seconds before the ball crosses the midline; once it crosses, only 3 enter the new zone.' }
    ],
    diagram: {
      type: 'double_zone',
      gridLabel: 'Two 14×14 m Grids (Transition 5v3 → 5v3)',
      cones: [
        { x: 60, y: 60 }, { x: 250, y: 60 }, { x: 440, y: 60 },
        { x: 60, y: 340 }, { x: 250, y: 340 }, { x: 440, y: 340 }
      ],
      phases: [
        {
          title: 'Phase 1: Regain by the Blue Trio in the Left Grid',
          desc: 'In the left grid, 5 Red players keep the ball against 3 Blue defenders (B1, B2, B3). In the right grid, free teammates B4 and B5 wait. Blue B2 intercepts a pass!',
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
            { from: { x: 175, y: 235 }, to: { x: 315, y: 262 }, label: '1st pass out of pressure!', primary: true }
          ],
          movements: [
            { from: { x: 125, y: 155 }, to: { x: 285, y: 80 }, role: 'def', label: 'Blue sprints to Zone 2' },
            { from: { x: 195, y: 145 }, to: { x: 410, y: 195 }, role: 'def', label: 'Expand wide' }
          ],
          shadows: []
        },
        {
          title: 'Phase 2: New 5v3 Blue Possession in the Right Grid',
          desc: 'The ball is played out into the right grid to B5. Trio B1–B3 sprints across to form a new 5v3 rondo for Blue, while 3 Red players (R3, R4, R5) transition to press!',
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
            { from: { x: 352, y: 325 }, to: { x: 422, y: 208 }, label: 'Consolidate 5v3 (+2)', primary: true }
          ],
          movements: [],
          shadows: []
        }
      ]
    }
  }
];

export const generateMonthlyPlanEn = (
  rondo: RondoItem,
  ageVariant?: { baseGrid: string; intensiveGrid: string; timing: string }
): MonthlySessionItem[] => {
  const baseGrid = ageVariant?.baseGrid || rondo.dimensionsU15.base;
  const intensiveGrid = ageVariant?.intensiveGrid || rondo.dimensionsU15.intensive;
  const baseTiming = ageVariant?.timing || rondo.timingU15;

  return [
    {
      session: 1,
      week: 'Week 1 (Tuesday)',
      stage: 'Stage 1 • Foundation',
      stageBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      focusSide: 'Attack',
      goal: rondo.id === 'rondo-3'
        ? 'Feed the central pivot (#6) and switch play onto a vacant perimeter line'
        : rondo.attackGoal.split('.')[0],
      conditions: `${baseGrid}. Touch limit: 2–3 touches. No score penalties yet — focus on open body shape (Perfilación) and early support angles before receiving.`,
      loadU15: baseTiming
    },
    {
      session: 2,
      week: 'Week 1 (Thursday)',
      stage: 'Stage 1 • Foundation',
      stageBadge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      focusSide: 'Defense',
      goal: rondo.id === 'rondo-3'
        ? 'Defenders: screen the center (keep pivot #6 in your cover shadow)'
        : rondo.defenseGoal.split('.')[0],
      conditions: `${baseGrid}. Coach uses "Freeze" interventions whenever defenders get caught flat on one line and expose the central lane.`,
      loadU15: baseTiming
    },
    {
      session: 3,
      week: 'Week 2 (Tuesday)',
      stage: 'Stage 2 • Complexity',
      stageBadge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      focusSide: 'Attack Scoring',
      goal: rondo.id === 'rondo-3'
        ? 'ONLY sequences played through the central pivot (#6) count for points'
        : rondo.scoringRule.split('.')[0],
      conditions: `${baseGrid}, strictly 2 touches. Perimeter circulation scores 0 points — points are awarded solely for executing the primary tactical objective.`,
      loadU15: baseTiming
    },
    {
      session: 4,
      week: 'Week 2 (Thursday)',
      stage: 'Stage 2 • Complexity',
      stageBadge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      focusSide: 'Synchronized Press',
      goal: rondo.id === 'rondo-3'
        ? 'Defenders: press as a coordinated unit (1 presses ball, 2 screen lines & #6)'
        : 'Synchronized pressing trigger on a firm pass or closed-body reception',
      conditions: `Dual scoring system active: both attackers and defenders track points. Rotate pressing pairs/trios every 1.5–2 minutes to maintain peak intensity.`,
      loadU15: baseTiming
    },
    {
      session: 5,
      week: 'Week 3 (Tuesday)',
      stage: 'Stage 3 • Speed',
      stageBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      focusSide: 'Decision Speed',
      goal: rondo.id === 'rondo-3'
        ? 'Central pivot (#6) plays faster and sharper (strictly 1-touch)'
        : rondo.progressions[2].desc,
      conditions: `Grid tightened to ${intensiveGrid}. Central/target player restricted to 1 touch, perimeter players 1–2 touches.`,
      loadU15: baseTiming
    },
    {
      session: 6,
      week: 'Week 3 (Thursday)',
      stage: 'Stage 3 • Stakes',
      stageBadge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      focusSide: 'Competition',
      goal: rondo.id === 'rondo-3'
        ? 'Defenders: regain possession or force an error within 6 passes'
        : '6-pass limit for defense + competitive "Stakes" for the losing group',
      conditions: `Rondo mechanics are now mastered — introduce competitive stakes (short explosive sprint/reaction drill for the losing group). Regain within 6 passes awards +2 points to defense.`,
      loadU15: baseTiming
    },
    {
      session: 7,
      week: 'Week 4 (Tuesday)',
      stage: 'Next Level • 3rd Man',
      stageBadge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      focusSide: 'Positional Bridge',
      goal: 'Progression into Bartolini "Third-Man" Rondo (A → B 1-touch layoff → C)',
      conditions: '16×16 m outer grid with a 5×5 m inner box. When the direct passing lane is blocked, unlock the target player via a 1-touch third-man bounce pass.',
      loadU15: '4 sets × 2.5 min | Rest: 45 sec'
    },
    {
      session: 8,
      week: 'Week 4 (Thursday)',
      stage: 'Next Level • Transfer',
      stageBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      focusSide: '4v4+3 Game',
      goal: '4v4 + 3 Neutrals Positional Game (combining all monthly objectives)',
      conditions: '24×16 m pitch bisected by a dashed midline. Points stack for every mastered element of the month: pass via (#6), third-man combination, zone switch, and 3-sec counter-press.',
      loadU15: '3 sets × 4 min | Rest: 1 min'
    }
  ];
};

export const getSquadOrganizationAdviceEn = (count: number, rondo: RondoItem): string => {
  const setup = computeSquadSetup(count, rondo.id);
  switch (setup.type) {
    case 'rondo_1_parallel_squares':
      return `For ${setup.playersCount} players: set up ${setup.squares} parallel 3v1 grids (9×9 m). Remaining (${setup.rotatingDefenders} players) rotate in as defenders every 60 sec.`;
    case 'rondo_2_dual_grids':
      return `For ${setup.playersCount} players: run 2 parallel 5v2 grids (11×11 m) — every player is active simultaneously with zero queues!`;
    case 'rondo_2_single_with_neutrals':
      return `For ${setup.playersCount} players: run 1 main 5v2 grid + extra players as rotating perimeter neutrals.`;
    case 'rondo_3_dual_grids':
      return `For ${setup.playersCount} players: set up 2 grids (one 7v3 grid and one 6v2 grid with a central pivot #6).`;
    case 'rondo_3_single_with_pressing_unit':
      return `For ${setup.playersCount} players: 1 main 7v3 grid (10 players) + a second pressing unit (${setup.extraPressers} players) recovering actively and rotating in every 75 seconds to sustain maximum pressing intensity.`;
    default:
      return `For ${setup.playersCount} players: organize the squad into the primary rondo unit (${rondo.playersCount}) plus a rotating pressing trio (swap every 90 sec to stay in the 85% HRmax zone).`;
  }
};

export const UI_EN: UIStrings = {
  header: {
    moduleBadge: 'Pattern XII • Complete Reconstruction',
    ageBadge: 'U15 (14–15 yrs)',
    title: 'Anatomy of the Rondo: Tactical Playbook & Monthly Curriculum',
    langToggleTitle: 'Switch Language (EN / RU)',
    roleSwitcherLabel: 'View Mode:',
    roles: {
      coach: 'Coach',
      players: 'Players',
      parents: 'Parents'
    },
    roleDescriptions: {
      coach: 'Full Pro Coach mode: UEFA tactical cues, U15 physiological workload calculator, 8-session periodization builder, and pitch timer with whistle.',
      players: 'U15 Player mode: step-by-step phase animations, scanning & body-shape micro-principles, and clear scoring rules for every rondo.',
      parents: 'Parent Overview mode: transparent breakdown of what the U15 squad is learning this month, how a 90-min session is structured, and growth-spurt (PHV) safety.'
    }
  },
  nav: {
    catalog: 'Rondos',
    catalogShort: 'Rondos',
    monthly: 'Monthly Plan',
    monthlyShort: 'Plan',
    methodology: 'Methodology',
    methodologyShort: 'Guide',
    timer: 'Timer',
    timerShort: 'Timer',
    printCard: 'Print Card',
    printCardShort: 'Print',
    printCardTooltip: 'Open printable coach card or save as PDF'
  },
  catalog: {
    filterTitle: 'Practice: 10 Rondos Across 5 Tactical Objectives',
    filterSubtitle: 'Select a tactical objective or a specific rondo — the interactive pitch board matches every rule and phase of the drill',
    numberPrefix: '#',
    metersSuffix: 'm',
    exerciseLabel: 'Drill',
    openMonthlyPlanBtn: 'Monthly Plan',
    stepByStepTitle: 'Step-by-Step Phase Animation:',
    phaseLabel: 'Phase',
    prevPhase: 'Prev Phase',
    nextPhase: 'Next Phase',
    fullscreenEnter: 'Fullscreen Board',
    fullscreenExit: 'Exit Fullscreen',
    boardLayersLabel: 'Tactical Board Layers:',
    layerPassesOn: '✓ Passing Lanes',
    layerPassesOff: '× Passing Lanes',
    layerMovementsOn: '✓ Support & Pressing Runs',
    layerMovementsOff: '× Support & Pressing Runs',
    layerShadowsOn: '✓ Cover Shadows / Trap Zones',
    layerShadowsOff: '× Cover Shadows / Trap Zones',
    legendPossession: 'In Possession',
    legendDefenders: 'Defenders',
    legendNeutral: 'Pivot (6) / Neutral',
    squadCalcTitle: 'Squad Attendance Setup:',
    playersTodayLabel: 'Players today:',
    playersUnit: 'pl.',
    pitchSizeLabel: 'Grid Size',
    intensivePrefix: 'Intensive:',
    dosageLabel: 'Work / Rest',
    formatPrefix: 'Format:',
    problemTitle: 'Game Problem → Why We Use This Rondo',
    conditionsAndGoalsTitle: 'Conditions & Objectives for Both Sides',
    attackGoalTitle: 'In Possession (Attack)',
    defenseGoalTitle: 'Out of Possession (Defense)',
    scoringRuleTitle: 'Scoring System (Objective → Score)',
    progressionsTitle: '3 Progression Stages (Foundation to Peak Intensity)',
    coachingCuesTitle: 'Coaching Cues:'
  },
  monthly: {
    matrixBadge: '4 Weeks • 8 Sessions',
    planTitlePrefix: 'Monthly Plan:',
    planSubtitle: 'Following module methodology: Sessions 1–6 alternate focus between attack and defense across 3 complexity stages, while Sessions 7–8 transfer the skill into Third-Man combinations and the 4v4+3 positional game.',
    selectRondoLabel: 'Select Primary Rondo of the Month:',
    progressPrefix: 'Cycle Progress:',
    progressMiddle: 'of',
    progressSuffix: 'sessions completed',
    progressHint: 'Click any session card to mark or unmark it as completed',
    sessionLabel: 'Session',
    loadPrefix: '',
    completedBadge: 'Completed',
    markCompletedBtn: 'Mark done',
    sessionStructureTitle: '90-Minute Session Structure',
    sessionBlocks: [
      {
        step: '1. Activation (15 min)',
        title: 'Technique + Body Shape',
        desc: 'Ball mastery warm-up and passing in trios focusing on pre-scanning and back-foot reception.',
        accentColor: 'text-slate-400'
      },
      {
        step: '2. RONDO (15–18 min)',
        title: 'Bridge to Session Theme',
        desc: '4 sets × 2–2.5 min. High cognitive and neuromuscular density. Builds the core tactical habit of the day.',
        highlighted: true,
        accentColor: 'text-emerald-400'
      },
      {
        step: '3. Positional Game (25 min)',
        title: '4v4+3 / 6v6+2',
        desc: 'Transferring the rondo rule onto a larger directional pitch with strict positional roles.',
        accentColor: 'text-blue-400'
      },
      {
        step: '4. Game with Goals (30 min)',
        title: '8v8 / 11v11',
        desc: 'Match play with bonus points awarded for executing the tactical objective trained in the rondo.',
        accentColor: 'text-amber-400'
      }
    ]
  },
  methodology: {
    tabAll: 'All',
    tabPrinciples: 'Principles',
    tabGeometry: 'Geometry',
    tabInterventions: 'Freeze Cues',
    tabCheatSheet: 'Master Table',
    cards: [
      {
        title: '1. Micro-Principles ("Barcelona School")',
        icon: 'eye',
        iconBg: 'bg-emerald-500/20 text-emerald-400',
        bullets: [
          {
            title: 'Decide BEFORE Receiving (Scanning):',
            text: 'At age 14–15, demand at least 2 head checks over the shoulder before the ball touches the player’s boot.',
            accentColor: 'text-emerald-400'
          },
          {
            title: 'Open Body Shape (Perfilación):',
            text: 'Receive strictly with the back foot (furthest from the defender) on the half-turn facing the center. Forbid stopping the ball with the sole while facing away from play.',
            accentColor: 'text-emerald-400'
          },
          {
            title: 'Two Safe Angles + Depth:',
            text: 'Off-ball teammates must proactively open 2 wide support lanes at 45° plus 1 central/split option.',
            accentColor: 'text-emerald-400'
          }
        ]
      },
      {
        title: '2. "Objective → Score → Stakes" System',
        icon: 'award',
        iconBg: 'bg-blue-500/20 text-blue-400',
        bullets: [
          {
            title: 'OBJECTIVE (For Both Sides Simultaneously):',
            text: 'Never leave defenders chasing aimlessly ("piggy in the middle"). If the attack looks for #6, the defense learns to screen the center with cover shadows.',
            accentColor: 'text-blue-400'
          },
          {
            title: 'SCORE (Reward Intent, Not Just Pass Count):',
            text: 'If you only reward 20 consecutive passes, players will timidly circulate around the perimeter. Award points ONLY for the target tactical pass (via #6, split pass, third man).',
            accentColor: 'text-amber-400'
          },
          {
            title: 'STAKES (Only After Mastery):',
            text: 'Introduce competitive consequences for the losing group only in Sessions 5–6 once technique is solid. Zero humiliation — use short, explosive reaction sprints.',
            accentColor: 'text-purple-400'
          }
        ]
      },
      {
        title: '3. U15 Physiology & Psychology (14–15 yrs)',
        icon: 'zap',
        iconBg: 'bg-amber-500/20 text-amber-400',
        bullets: [
          {
            title: 'Peak Height Velocity (PHV):',
            text: 'Adolescents aged 14–15 experience temporary coordination shifts due to rapid limb growth. In Stage 1, add +1 meter to the grid and allow 2 touches so technique doesn’t break down.',
            accentColor: 'text-amber-400'
          },
          {
            title: 'Strict Work Intervals (2–2.5 min Sets):',
            text: 'An endless 12-minute rondo kills pressing intensity. For U15, run crisp 2–2.5 min sets at 85–90% HRmax with 40–45 sec rest intervals for concise coaching points.',
            accentColor: 'text-amber-400'
          },
          {
            title: 'Positional Specialization:',
            text: 'In 7v3 and 4v4+3 rondos, place your actual central midfielders (#6, #8, #10) inside as pivots, and your full-backs and wingers on the wide perimeter lines.',
            accentColor: 'text-amber-400'
          }
        ]
      }
    ],
    geometrySectionTitle: 'Interactive Tactical Geometry: Body Shape, Angles & Cover Shadow',
    geometrySectionSubtitle: 'Toggle each diagram between the common U15 mistake and the correct tactical execution to demonstrate the exact micro-details on the board.',
    geometryModeMistakeBtn: '✗ Common U15 Mistake',
    geometryModeSolutionBtn: '✓ Correct Tactical Execution',
    geometryCueLabel: 'Live Voice Prompt:',
    geometryConcepts: [
      {
        id: 'angles-45',
        title: '1. 45° Support Angles vs Flat Lines',
        subtitle: 'Why standing on the same line kills possession and how 45° triangles create automatic outlets',
        mistakeLabel: '✗ Mistake: Flat Support Behind the Cover Shadow',
        mistakeDesc: 'Teammates B and C stand too high or flat on the same horizontal plane, allowing a single defender (D1) to block both passing lanes simultaneously with one straight pressing run.',
        solutionLabel: '✓ Solution: 45° Diagonal Support Outside the Cone',
        solutionDesc: 'Teammates B and C drop/adjust along their perimeter lines to form 45° angles to the ball-carrier (A). No matter which way D1 turns, at least one clean passing lane is wide open.',
        coachingCue: '“Step out of the shadow! Give the ball two 45-degree diagonals — never stand flat with the ball!”'
      },
      {
        id: 'body-shape',
        title: '2. Open Body Shape (Perfilación) & Far-Foot Reception',
        subtitle: 'How half-turn shoulder alignment saves 0.8 seconds and opens the entire pitch on the first touch',
        mistakeLabel: '✗ Mistake: Closed Body & Near-Foot Sole Stop',
        mistakeDesc: 'Receiver B faces the passer squarely and stops the ball with the near foot or sole. His back is turned to the center and the far side, trapping him into a predictable return pass into pressure.',
        solutionLabel: '✓ Solution: Half-Turn (Perfilación) & Back-Foot Cushion',
        solutionDesc: 'Before the ball arrives, B angles his hips 45° toward the center of the grid and receives across his body with the back (far) foot, seeing all three lines and the defender simultaneously.',
        coachingCue: '“Open your hips to the center before the pass arrives! Receive on the back foot — see the whole square!”'
      },
      {
        id: 'cover-shadow',
        title: '3. Cover Shadow (Тень перекрытия) & Arc Pressing',
        subtitle: 'How defenders turn a 1v2 disadvantage into a 1v1 duel by curving their pressing trajectory',
        mistakeLabel: '✗ Mistake: Straight-Line Sprint at the Ball',
        mistakeDesc: 'Defender D1 sprints in a straight line directly at the ball-carrier (A). This leaves the central and diagonal passing lanes completely exposed for an easy split pass.',
        solutionLabel: '✓ Solution: Curved Arc Press Keeping Pivot in Shadow',
        solutionDesc: 'D1 curves his pressing run in an arc, keeping the central pivot (#6) or far target directly inside his Cover Shadow cone while forcing the ball-carrier onto one predictable side.',
        coachingCue: '“Curve your run! Bend your press to hide #6 in your shadow and lock the ball onto one side!”'
      },
      {
        id: 'third-man',
        title: '4. Third-Man Combination (A → B → C)',
        subtitle: 'Unlocking a player who is completely screened by a defender’s cover shadow',
        mistakeLabel: '✗ Mistake: Forcing a Blocked Direct Pass (A → C)',
        mistakeDesc: 'Passer A tries to force a direct vertical pass to C even though Defender D1 is squarely screening the lane, resulting in an immediate interception and counter-attack.',
        solutionLabel: '✓ Solution: Bounce Pass via Second Man (A → B → C)',
        solutionDesc: 'Passer A plays an angled pass to wide teammate B (“Second Man”). As D1 turns his head toward B, B Cushions a 1-touch layoff around the corner of the shadow to the free “Third Man” C!',
        coachingCue: '“Can’t find C directly? Use B’s 1-touch mirror! Pass to the outside foot — bounce to the Third Man!”'
      }
    ],
    interventionsSectionTitle: 'Coach “Freeze” & Live Intervention Playbook (6 Scenarios)',
    interventionsSectionSubtitle: 'When to blow the whistle, what symptom to spot, the exact Socratic question to ask U15 players, and the 15-second fix.',
    symptomLabel: 'On-Pitch Symptom',
    freezeTriggerLabel: 'When to Shout “FREEZE!”',
    guidedQuestionLabel: 'Guided Question (Ask U15)',
    microCorrectionLabel: '15-Second Micro-Fix',
    openRondoInCatalogBtn: 'Open Rondo on Board',
    interventions: [
      {
        rondoId: 'rondo-1',
        rondoNumber: '1.1',
        title: '3v1 Rondo: The Vacant 4th Line Freeze',
        symptom: 'After passing, the player admires his pass and stands still while the receiver gets trapped in a corner with only 1 option.',
        freezeTrigger: 'Blow the whistle the moment the ball arrives at the receiver’s foot and one of the 4 sides is still empty while the passer hasn’t moved.',
        guidedQuestion: '“Freeze! Look at the four lines of our square — which side is completely empty right now, and who had the shortest sprint to open a second angle?”',
        microCorrection: 'Rewind 3 seconds: require the passer to start his sprint toward the vacant line the instant the ball leaves his boot — before it reaches his teammate.'
      },
      {
        rondoId: 'rondo-2',
        rondoNumber: '1.2',
        title: '5v2 Rondo: Flat Defensive Pair Exposed',
        symptom: 'Both defenders chase the ball side-by-side on the same horizontal line and get split by a simple ground pass.',
        freezeTrigger: 'Shout “Freeze!” right as both defenders step up flat onto the same line and the ball-carrier draws his foot back for the split pass.',
        guidedQuestion: '“Defenders, hold right there! Look at the gap between your shoulders — if you stand flat on the same line, who is protecting the central window behind you?”',
        microCorrection: 'Drop the second defender 2.5 meters deeper and 1.5 meters diagonally inside (“staggered pair: one presses, one covers the split”). Restart from the bait pass.'
      },
      {
        rondoId: 'rondo-3',
        rondoNumber: '2.1',
        title: '7v3 Rondo: Pivot (#6) Hiding Behind Pressure',
        symptom: 'Perimeter players pass endlessly around the outside because the central pivot (#6) stands statically behind a defender’s back.',
        freezeTrigger: 'Freeze play after 4 consecutive perimeter passes when (#6) has not checked his shoulders or adjusted out of the central defender’s cover shadow.',
        guidedQuestion: '“Number 6, without turning around — tell me where the three defenders are! And if you stay right behind D2’s back, can the ball-carrier ever reach you?”',
        microCorrection: 'Show (#6) how to take 2 quick lateral steps into the “window” between two defenders as the ball travels along the perimeter, scanning twice before calling for the ball.'
      },
      {
        rondoId: 'rondo-5',
        rondoNumber: '3.1',
        title: '6v3 Two-Grid Rondo: Late Width on the Switch',
        symptom: 'Attackers complete 4 passes under heavy pressure in Grid 1, but nobody has expanded into Grid 2 yet, forcing a turnover.',
        freezeTrigger: 'Freeze on the 4th pass in Grid 1 when all 6 attackers are still bunched inside the first square.',
        guidedQuestion: '“We just survived 4 passes and drew all three defenders into this box — look across into Grid 2: who is there to receive the switch?”',
        microCorrection: 'Establish the “3rd-Pass Trigger”: on pass #3, the farthest attacker must already be crossing the midline into Grid 2 with an open body shape.'
      },
      {
        rondoId: 'rondo-8',
        rondoNumber: '4.2',
        title: 'Bartolini Rondo: Missing the 1-Touch Layoff Cue',
        symptom: 'The “Second Man” (B) takes 2 touches and stops the ball dead instead of playing a 1-touch bounce pass to the “Third Man” (C) in the inner box.',
        freezeTrigger: 'Freeze the instant B traps the ball under his sole while C had timed a clean run into the open window inside the 5×5 m box.',
        guidedQuestion: '“B, when A fired that firm pass to your right foot, where was C’s window open — and what happened to that window during your extra touch?”',
        microCorrection: 'Demonstrate “Pass as a Message”: A’s pass to B’s back/inside foot is a command for an automatic 1-touch cushioned layoff into the inner box.'
      },
      {
        rondoId: 'rondo-9',
        rondoNumber: '5.1',
        title: '4v2+4 Transition Rondo: Delayed Counter-Press Reaction',
        symptom: 'Upon losing the ball, 1 player chases while the other 3 attackers pause or step backward, letting the defenders play out easily.',
        freezeTrigger: 'Blow the whistle 1.5 seconds after an interception if even one of the 4 inner attackers is standing on his heels or looking down.',
        guidedQuestion: '“Freeze! Look at the distances around the ball — if only one of you presses and three watch, how many free passing lanes does the opponent have to escape?”',
        microCorrection: 'Re-run the turnover on the coach’s clap: all 4 attackers must sprint inward within 1 second (1 hunts the ball, 3 close the 360° net).'
      }
    ],
    tableTitle: 'Master Cheat-Sheet: Grid Dimensions & Work-to-Rest Ratios for All 10 Rondos (U15 / 14–15 yrs)',
    tableHeaders: {
      num: '#',
      rondo: 'Rondo',
      goal: 'Objective',
      baseArea: 'Base Grid (U15)',
      intensiveArea: 'Intensive (U15)',
      setsAndRest: 'Sets & Rest'
    }
  },
  timer: {
    badge: 'On-Pitch Coaching Tool',
    title: 'Rondo Interval Set Timer (with Coach Whistle)',
    whistleOn: 'Whistle ON',
    whistleOff: 'Muted',
    presets: {
      small: '3v1 / 5v2 (4 × 1:30 / 0:30)',
      medium: '7v3 / Bartolini (4 × 2:30 / 0:45)',
      positional: 'Positional 4v4+3 (3 × 4:00 / 1:00)'
    },
    setLabel: 'Set',
    ofLabel: 'of',
    workPhaseText: 'RONDO WORK PHASE (MAX INTENSITY!)',
    restPhaseText: 'REST / ROTATE & COACHING CUE',
    pauseBtn: 'Pause',
    startBtn: 'Start Set',
    resetBtn: 'Reset',
    customWorkLabel: 'Work (sec)',
    customRestLabel: 'Rest (sec)',
    customSetsLabel: 'Sets',
    secondsUnit: 's'
  },
  printModal: {
    badge: 'Training Session Drill Card • U15 (14–15 yrs)',
    printBtn: 'Print / Save PDF',
    closeBtn: 'Close',
    dimensionsLabel: 'Dimensions (U15):',
    intensiveLabel: 'Intensive:',
    dosageLabel: 'Work / Rest:',
    attackGoalLabel: 'Attacking Objective:',
    defenseGoalLabel: 'Defensive Objective:',
    scoringRuleLabel: 'Scoring Rule:',
    monthlyProgressionTitle: '8-Session Monthly Progression Plan for This Rondo:',
    sessionShortPrefix: 'Sess.'
  }
};
