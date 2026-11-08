export type Language = 'en' | 'de' | 'ru';

export type CategoryId = 'all' | 'retention' | 'progression' | 'switch' | 'defense' | 'transition';

export type RoleMode = 'coach' | 'players' | 'parents';

export type AgeBandId = 'u10' | 'u12' | 'u14' | 'u16' | 'u18_pro';

export interface CategoryItem {
  id: CategoryId;
  name: string;
  color: string;
  dot: string;
}

export interface Point2D {
  x: number;
  y: number;
}

export interface RondoPhasePlayer {
  id: string;
  role: 'att' | 'def' | 'neutral';
  label: string;
  x: number;
  y: number;
}

export interface RondoPhasePass {
  from: Point2D;
  to: Point2D;
  label?: string;
  primary: boolean;
}

export interface RondoPhaseMovement {
  from: Point2D;
  to: Point2D;
  role: 'att' | 'def' | 'neutral';
  label?: string;
}

export interface RondoPhaseShadow {
  points: string;
}

export interface RondoPhase {
  title: string;
  desc: string;
  players: RondoPhasePlayer[];
  ball?: Point2D;
  passes: RondoPhasePass[];
  movements: RondoPhaseMovement[];
  shadows: RondoPhaseShadow[];
}

export interface RondoDiagram {
  type: 'single_square' | 'double_zone' | 'concentric_square';
  gridLabel: string;
  cones: Point2D[];
  phases: RondoPhase[];
}

export interface RondoProgression {
  level: string;
  desc: string;
}

export interface RondoItem {
  id: string;
  number: string;
  title: string;
  shortTitle?: string;
  category: Exclude<CategoryId, 'all'>;
  categoryName: string;
  badgeColor: string;
  format: string;
  playersCount: string;
  dimensionsU15: {
    base: string;
    intensive: string;
  };
  timingU15: string;
  problemInGame: string;
  attackGoal: string;
  defenseGoal: string;
  scoringRule: string;
  coachingCues: string[];
  progressions: RondoProgression[];
  diagram: RondoDiagram;
}

export interface MonthlySessionItem {
  session: number;
  week: string;
  stage: string;
  stageBadge: string;
  focusSide: string;
  goal: string;
  conditions: string;
  loadU15: string;
}

export interface MethodologyBullet {
  title: string;
  text: string;
  accentColor: string;
}

export interface MethodologySection {
  title: string;
  icon: 'eye' | 'award' | 'zap';
  iconBg: string;
  bullets: MethodologyBullet[];
}

export interface SessionStructureBlock {
  step: string;
  title: string;
  desc: string;
  highlighted?: boolean;
  accentColor?: string;
}

export interface GeometryConceptItem {
  id: 'angles-45' | 'body-shape' | 'cover-shadow' | 'third-man';
  title: string;
  subtitle: string;
  mistakeLabel: string;
  mistakeDesc: string;
  solutionLabel: string;
  solutionDesc: string;
  coachingCue: string;
}

export interface CoachInterventionItem {
  rondoId: string;
  rondoNumber: string;
  title: string;
  symptom: string;
  freezeTrigger: string;
  guidedQuestion: string;
  microCorrection: string;
}

export interface UIStrings {
  header: {
    moduleBadge: string;
    ageBadge: string;
    title: string;
    langToggleTitle: string;
    roleSwitcherLabel: string;
    roles: {
      coach: string;
      players: string;
      parents: string;
    };
    roleDescriptions: {
      coach: string;
      players: string;
      parents: string;
    };
  };
  nav: {
    catalog: string;
    catalogShort: string;
    monthly: string;
    monthlyShort: string;
    methodology: string;
    methodologyShort: string;
    timer: string;
    timerShort: string;
    printCard: string;
    printCardShort: string;
    printCardTooltip: string;
  };
  catalog: {
    filterTitle: string;
    filterSubtitle: string;
    numberPrefix: string;
    metersSuffix: string;
    exerciseLabel: string;
    openMonthlyPlanBtn: string;
    stepByStepTitle: string;
    phaseLabel: string;
    prevPhase: string;
    nextPhase: string;
    fullscreenEnter: string;
    fullscreenExit: string;
    boardLayersLabel: string;
    layerPassesOn: string;
    layerPassesOff: string;
    layerMovementsOn: string;
    layerMovementsOff: string;
    layerShadowsOn: string;
    layerShadowsOff: string;
    legendPossession: string;
    legendDefenders: string;
    legendNeutral: string;
    squadCalcTitle: string;
    playersTodayLabel: string;
    playersUnit: string;
    pitchSizeLabel: string;
    intensivePrefix: string;
    dosageLabel: string;
    formatPrefix: string;
    problemTitle: string;
    conditionsAndGoalsTitle: string;
    attackGoalTitle: string;
    defenseGoalTitle: string;
    scoringRuleTitle: string;
    progressionsTitle: string;
    coachingCuesTitle: string;
  };
  monthly: {
    matrixBadge: string;
    planTitlePrefix: string;
    planSubtitle: string;
    selectRondoLabel: string;
    progressPrefix: string;
    progressMiddle: string;
    progressSuffix: string;
    progressHint: string;
    sessionLabel: string;
    loadPrefix: string;
    completedBadge: string;
    markCompletedBtn: string;
    sessionStructureTitle: string;
    sessionBlocks: SessionStructureBlock[];
  };
  methodology: {
    tabAll: string;
    tabPrinciples: string;
    tabGeometry: string;
    tabInterventions: string;
    tabCheatSheet: string;
    cards: MethodologySection[];
    geometrySectionTitle: string;
    geometrySectionSubtitle: string;
    geometryModeMistakeBtn: string;
    geometryModeSolutionBtn: string;
    geometryCueLabel: string;
    geometryConcepts: GeometryConceptItem[];
    interventionsSectionTitle: string;
    interventionsSectionSubtitle: string;
    symptomLabel: string;
    freezeTriggerLabel: string;
    guidedQuestionLabel: string;
    microCorrectionLabel: string;
    openRondoInCatalogBtn: string;
    interventions: CoachInterventionItem[];
    tableTitle: string;
    tableHeaders: {
      num: string;
      rondo: string;
      goal: string;
      baseArea: string;
      intensiveArea: string;
      setsAndRest: string;
    };
  };
  timer: {
    badge: string;
    title: string;
    whistleOn: string;
    whistleOff: string;
    presets: {
      small: string;
      medium: string;
      positional: string;
    };
    setLabel: string;
    ofLabel: string;
    workPhaseText: string;
    restPhaseText: string;
    pauseBtn: string;
    startBtn: string;
    resetBtn: string;
    customWorkLabel: string;
    customRestLabel: string;
    customSetsLabel: string;
    secondsUnit: string;
  };
  printModal: {
    badge: string;
    printBtn: string;
    closeBtn: string;
    dimensionsLabel: string;
    intensiveLabel: string;
    dosageLabel: string;
    attackGoalLabel: string;
    defenseGoalLabel: string;
    scoringRuleLabel: string;
    monthlyProgressionTitle: string;
    sessionShortPrefix: string;
  };
}
