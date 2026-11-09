import { AgeBandId } from './types';

export interface AgeBandInfo {
  id: AgeBandId;
  shortLabel: string;
  label: string;
  ageYears: string;
  stageTitle: string;
  relativeAreaRule: string;
  decisionWindow: string;
  physiologicalProfile: string;
  summaryFocus: string;
}

export interface RondoMethodologicalBasis {
  originSchool: string;
  scientificBasis: string;
  matchTransfer: string;
}

export interface RondoAgeVariant {
  formatOverride?: string;
  baseGrid: string;
  intensiveGrid: string;
  touchesRule: string;
  timing: string;
  ageCoachingFocus: string;
}

export const AGE_BANDS_RU: AgeBandInfo[] = [
  {
    id: 'u10',
    shortLabel: 'U9-10',
    label: 'U9-10 (8–10 лет)',
    ageYears: '8–10 лет',
    stageTitle: 'Базовый этап (Funino / Открытие игры)',
    relativeAreaRule: '+25–35% площади (24–35 м²/игр.)',
    decisionWindow: '2.2 – 3.0 сек',
    physiologicalProfile: 'Алактатно-аэробный (серии 60–90 сек, отдых 1:1)',
    summaryFocus:
      'Увеличенные квадраты, свободные или 2–3 касания. Сложные рондо упрощаются по числу игроков (до 4v1, 4v2, 3v3+2Н). Фокус: приём дальней ногой и выход из «тени» за спиной защитника.',
  },
  {
    id: 'u12',
    shortLabel: 'U11-12',
    label: 'U11-12 (11–12 лет)',
    ageYears: '11–12 лет',
    stageTitle: 'Золотой возраст моторного обучения',
    relativeAreaRule: '+15–20% площади (20–28 м²/игр.)',
    decisionWindow: '1.6 – 2.0 сек',
    physiologicalProfile: 'Координационно-скоростной без закисления (2:1)',
    summaryFocus:
      'Высокая нейропластичность: постановка открытого корпуса вполоборота (Perfilación), первое сканирование через плечо до приёма, осознанный пас вразрез и знакомство с ролью №6.',
  },
  {
    id: 'u14',
    shortLabel: 'U13-14',
    label: 'U13-14 (13–14 лет)',
    ageYears: '13–14 лет',
    stageTitle: 'Переход к формату 11×11 (Контроль PHV)',
    relativeAreaRule: '+8–10% площади (18–26 м²/игр.)',
    decisionWindow: '1.3 – 1.6 сек',
    physiologicalProfile: 'Аэробно-смешанный, защита зон роста в пубертате (2.5:1)',
    summaryFocus:
      'Перенос геометрии рондо на поле 11×11: использование «тени перекрытия» (Cover Shadow), диагональная страховка в паре, игра через опорника (№6) и базовые комбинации «на третьего».',
  },
  {
    id: 'u16',
    shortLabel: 'U15-16',
    label: 'U15-16 (15–16 лет)',
    ageYears: '15–16 лет',
    stageTitle: 'Тактическая скорость и специализация',
    relativeAreaRule: '100% Эталон (16–24 м²/игр.)',
    decisionWindow: '1.0 – 1.3 сек',
    physiologicalProfile: 'Специальная выносливость 85–90% ЧСС макс (3:1 – 4:1)',
    summaryFocus:
      'Базовый стандарт модуля: 1–2 касания, 2 сканирования до приёма, игра №6 в 1 касание под давлением, угловые прессинг-ловушки и мгновенный контрпрессинг за 3 секунды.',
  },
  {
    id: 'u18_pro',
    shortLabel: 'U17+',
    label: 'U17+ / Pro',
    ageYears: '17+ лет / Взрослые',
    stageTitle: 'Высшее спортивное мастерство (Экстремальная плотность)',
    relativeAreaRule: '-10–18% площади (11–19 м²/игр.)',
    decisionWindow: '0.6 – 1.0 сек',
    physiologicalProfile: 'Анаэробно-гликолитическая мощность 88–94% ЧСС макс (4:1 – 5:1)',
    summaryFocus:
      'Экстремальный дефицит времени и пространства: строго 1–2 касания (ключевые роли — 1 касание), скрытый пас без замаха, «передача как сообщение» под сильную ногу и непрерывные переходы.',
  },
];

export const AGE_BANDS_EN: AgeBandInfo[] = [
  {
    id: 'u10',
    shortLabel: 'U9-10',
    label: 'U9-10 (8–10 yrs)',
    ageYears: '8–10 yrs',
    stageTitle: 'Foundation Stage (Funino / Game Discovery)',
    relativeAreaRule: '+25–35% Area (24–35 m²/pl)',
    decisionWindow: '2.2 – 3.0 sec',
    physiologicalProfile: 'Alactic-Aerobic (60–90s bouts, 1:1 work:rest)',
    summaryFocus:
      'Enlarged grids, free or 2–3 touches. Complex positional drills are simplified in player numbers (4v1, 4v2, 3v3+2N). Focus on back-foot reception and stepping out of the defender’s shadow.',
  },
  {
    id: 'u12',
    shortLabel: 'U11-12',
    label: 'U11-12 (11–12 yrs)',
    ageYears: '11–12 yrs',
    stageTitle: 'Golden Age of Motor Learning',
    relativeAreaRule: '+15–20% Area (20–28 m²/pl)',
    decisionWindow: '1.6 – 2.0 sec',
    physiologicalProfile: 'Neuromotor & Coordination Speed without acidosis (2:1)',
    summaryFocus:
      'Peak neuroplasticity: open half-turn body shape (Perfilación), first shoulder scan prior to reception, purposeful split passes, and introduction to the central pivot (#6).',
  },
  {
    id: 'u14',
    shortLabel: 'U13-14',
    label: 'U13-14 (13–14 yrs)',
    ageYears: '13–14 yrs',
    stageTitle: 'Transition to 11v11 (PHV Growth Management)',
    relativeAreaRule: '+8–10% Area (18–26 m²/pl)',
    decisionWindow: '1.3 – 1.6 sec',
    physiologicalProfile: 'Mixed Aerobic, growth-plate protection during PHV (2.5:1)',
    summaryFocus:
      'Transferring rondo geometry to the 11v11 pitch: Cover Shadow arc pressing, diagonal defensive staggering, playing through the #6 pivot, and foundational Third-Man combinations.',
  },
  {
    id: 'u16',
    shortLabel: 'U15-16',
    label: 'U15-16 (15–16 yrs)',
    ageYears: '15–16 yrs',
    stageTitle: 'Tactical Speed & Positional Specialization',
    relativeAreaRule: '100% Baseline (16–24 m²/pl)',
    decisionWindow: '1.0 – 1.3 sec',
    physiologicalProfile: 'Match-Specific Endurance 85–90% HRmax (3:1 – 4:1)',
    summaryFocus:
      'Standard baseline: 1–2 touches, 2 pre-reception scans, 1-touch pivot play under pressure, coordinated corner pressing traps, and 3-second counter-pressing swarms.',
  },
  {
    id: 'u18_pro',
    shortLabel: 'U17+',
    label: 'U17+ / Pro',
    ageYears: '17+ yrs / Seniors',
    stageTitle: 'High Performance & Adult Football (Extreme Density)',
    relativeAreaRule: '-10–18% Area (11–19 m²/pl)',
    decisionWindow: '0.6 – 1.0 sec',
    physiologicalProfile: 'Anaerobic-Glycolytic Power 88–94% HRmax (4:1 – 5:1)',
    summaryFocus:
      'Extreme spatial and temporal deficit: strictly 1–2 touches (1-touch for pivots/neutrals), disguised no-backlift passes, "pass as a message" to the receiver’s target foot, and non-stop transitions.',
  },
];

export const RONDO_METHODOLOGY_RU: Record<string, RondoMethodologicalBasis> = {
  'rondo-1': {
    originSchool:
      'Ла Масия (ФК «Барселона») • Лауреано Руис (1972) и Йохан Кройф (1988) — базовый «квадрат 4 сторон» для автоматизации правила треугольника и открывания на свободную грань.',
    scientificBasis:
      'Удельная площадь 20.3 м²/игрока (база 9×9 м) и 16.0 м²/игрока (8×8 м) создаёт окно решения 1.2–1.5 сек. Так как на 4 стороны приходится всего 3 атакующих, геометрия квадрата вынуждает делать рывок 4–6 м в момент удара по мячу (частота сканирования ≥ 0.8 раз/сек), развивая алактатную мощность и эксцентрическое торможение.',
    matchTransfer:
      'Выход из-под одиночного прессинга во фланговом треугольнике: крайний защитник (№2/3) — восьмёрка/опорник (№6/8) — вингер (№7/11) у боковой линии.',
  },
  'rondo-2': {
    originSchool:
      'Школа позиционной игры Жоана Вилы и Хави Эрнандеса (ФК «Барселона») — концепция «Atraer para dividir» (стянуть короткой передачей, чтобы разрезать линию прессинга).',
    scientificBasis:
      'При плотности 17.3 м²/игрока (11×11 м) и 14.3 м²/игрока (10×10 м) два защитника уступом перекрывают 65% ширины квадрата, но короткий пас-приманка заставляет их сблизиться, открывая центральный створ 2.5–3.5 м на 0.7–0.9 сек. Тренирует периферическое зрение и скрытый пас без замаха.',
    matchTransfer:
      'Вскрытие первой линии прессинга из двух нападающих соперника (4-4-2 / 4-2-3-1) в Зоне 1–2 с доставкой мяча в опорную зону или полуфланг.',
  },
  'rondo-3': {
    originSchool:
      'Пеп Гвардиола, Хуанма Лильо и Серхио Бускетс (ФК «Барселона» / «Манчестер Сити») — позиционное рондо вокруг центрального пивота (№6) как оси разворота атаки.',
    scientificBasis:
      'Площадь 22.5 м²/игрока (15×15 м) и 16.9 м²/игрока (13×13 м) моделирует плотность центральной зоны. Игрок №6 находится под давлением на 360° (время контакта ≤ 0.8–1.0 сек) и обязан делать 2–3 сканирования за 3 сек до приёма (эталон элитных опорников 0.65–0.80 сканов/сек по исследованиям G. Jordet).',
    matchTransfer:
      'Продвижение из Зоны 1 в Зону 2 через одиночного опорного полузащитника (№6), открывающегося за спинами первой линии прессинга.',
  },
  'rondo-4': {
    originSchool:
      'Пако Сейрул-ло (Структурированный микроцикл «Барселоны») и Юлиан Нагельсманн — двухзонная позиционная игра на диагональное эшелонирование («escalonamiento») №6 и №8.',
    scientificBasis:
      'Площадь 25.1 м²/игрока (22×16 м) и 20.0 м²/игрока (20×14 м) с глубиной 11 м на каждую зону воспроизводит реальную дистанцию между линиями в матче. Двухзонная разметка вынуждает №6 и №8 держать асимметричную диагональ (угол 30–45°), исключая перекрытие собственных линий паса.',
    matchTransfer:
      'Последовательное преодоление двух линий прессинга (блок 4-4-2) от центральных защитников через связку №6 и №8/10 с выводом мяча в линию атаки (Зона 1 → Зона 2 → Зона 3).',
  },
  'rondo-5': {
    originSchool:
      'Пеп Гвардиола и Рене Марич (Spielverlagerung) — принцип «Перегруз для изоляции» (Overload to Isolate): стягивание компактного блока в один сектор для быстрого перевода на дальний край.',
    scientificBasis:
      'В активном квадрате (12×12 м на 9 чел.) плотность сжата до 16.0 м²/игрока (13.4 м² в 11×11 м), тогда как общая площадь двух зон — 32.0 м²/игрока. Контраст плотности тренирует визуальное переключение «узкий фокус под давлением → широкий обзор на 3-м пасе» и повторные рывки 12–18 м.',
    matchTransfer:
      'Стягивание блока соперника на один фланг/полуфланг серией из 4–5 коротких пасов с последующим быстрым переводом низом на свободного крайнего защитника или вингера.',
  },
  'rondo-6': {
    originSchool:
      'Луи ван Гал и Пеп Гвардиола («Juego de Posición» 4v4+3) — классическая базовая матрица позиционного футбола с двумя мишенями в глубине/впереди и центральным пивотом (№6).',
    scientificBasis:
      'Удельная площадь 34.9 м²/игрока (24×16 м на 11 игроков; 28.0 м²/игр. в 22×14 м) точно совпадает со средней плотностью позиционного розыгрыша 11×11 в центральной трети поля. 4-минутные серии выводят пульс на 85–90% ЧСС макс, соединяя геометрию ромба со специальной выносливостью.',
    matchTransfer:
      'Прямая модель игры 11×11 в средней трети поля (Зона 2): сохранение ширины, глубины и позиции №6 при переводе атаки и мгновенном переходе в момент потери.',
  },
  'rondo-7': {
    originSchool:
      'Ральф Рангник, Юрген Клопп и Диего Симеоне — методология направленного прессинга (Leitlinien-Pressing) с использованием боковой и лицевой линий как «дополнительных защитников».',
    scientificBasis:
      'Площадь 21.8 м²/игрока (14×14 м) намеренно выше обычного 6v3, поэтому одиночный отбор невозможен. Чтобы вернуть мяч за 6 пасов, тройка обязана синхронизировать дугу первого защитника (отсечение 180° поля тенью) с поджатием двух ближних адресатов, сжимая угол до < 4 м².',
    matchTransfer:
      'Прессинг-ловушка на фланге в Зоне 2–3: направление паса соперника на крайнего защитника к бровке и синхронное смыкание треугольника (вингер + восьмёрка + фулбек).',
  },
  'rondo-8': {
    originSchool:
      'Маурицио Сарри, Роберто Де Дзерби и Антонио Бартолини (Итальянская позиционная школа) — концентрическое рондо с внутренним боксом 5×5 м для автоматизации игры «на третьего» (Tercer Hombre).',
    scientificBasis:
      'Внешний квадрат 16×16 м (23.3 м²/игрока) содержит внутренний бокс 5×5 м, экранируемый 3 защитниками. Прямой пас закрыт, но диагональная передача на «второго» разворачивает головы защитников на 35–50°, открывая угловой коридор в 1 касание на «третьего» на 0.5–0.8 сек.',
    matchTransfer:
      'Вскрытие средне-низкого блока (Зона 2 → Зона 3): доставка мяча перекрытому №10 или №9 между линиями через диагональный пас на фланг и мгновенную скидку в 1 касание.',
  },
  'rondo-9': {
    originSchool:
      'Ральф Рангник (Хоффенхайм / РБ Лейпциг), Юрген Клопп и Пеп Гвардиола — «Правило 3–6 секунд» (Gegenpressing): коллективный охотничий рефлекс в эпицентре потери мяча.',
    scientificBasis:
      'Двойная плотность: во внутреннем квадрате 10×10 м (16.7 м²/игрока) все 4 атакующих находятся в ≤ 4–5 м от точки потери, что биомеханически позволяет сомкнуть «воронку» за 1.5–2.5 сек. Если мяч выходит в большой квадрат 22×22 м (48.4 м²/игр.), площадь утраивается, моделируя провал прессинга.',
    matchTransfer:
      'Негативный переход (Атака → Оборона) в центре или полуфланге: мгновенное коллективное сжатие зоны потери за 3 секунды до первого паса соперника в отрыв.',
  },
  'rondo-10': {
    originSchool:
      'Диего Симеоне, Томас Тухель и Карло Анчелотти — золотое правило позитивного перехода (Оборона → Атака): «Выведи мяч из зоны отбора 1-м или 2-м пасом» (Sacar el balón de la zona de recuperación).',
    scientificBasis:
      'В активном квадрате 14×14 м работают 8 игроков (24.5 м²/игрока), а в соседнем квадрате 14×14 м ждут 2 партнёра (98 м²/игрока в момент отбора). Контраст плотности приучает за 1.0–1.8 сек находить выход из-под встречного контрпрессинга в разреженную зону с рывком на 15–20 м.',
    matchTransfer:
      'Позитивный переход (Оборона → Атака) после перехвата в Зоне 1–2: выход из-под контрпрессинга соперника первым пасом вперёд/в свободную зону на инсайда или форварда.',
  },
};

export const RONDO_METHODOLOGY_EN: Record<string, RondoMethodologicalBasis> = {
  'rondo-1': {
    originSchool:
      'FC Barcelona (La Masia) • Laureano Ruiz (1972) & Johan Cruyff (1988) — the foundational "4-side square" automating triangle geometry and synchronous rotation to the vacant line.',
    scientificBasis:
      'A Relative Area per Player (ApP) of 20.3 m²/pl (9×9 m base) and 16.0 m²/pl (8×8 m) enforces a 1.2–1.5 sec decision window. With 3 attackers across 4 sides, geometry compels a 4–6 m support sprint at pass release (scanning rate ≥ 0.8 scans/sec), developing alactic power and eccentric deceleration.',
    matchTransfer:
      'Escaping single-man pressure in a wide triangle: Full-Back (#2/#3) — Interior/Pivot (#6/#8) — Winger (#7/#11) along the touchline.',
  },
  'rondo-2': {
    originSchool:
      'Joan Vilà & Xavi Hernández Positional School (FC Barcelona) — the principle of "Atraer para dividir" (baiting with short passes to split the pressing pair).',
    scientificBasis:
      'At 17.3 m²/pl (11×11 m) and 14.3 m²/pl (10×10 m), two staggered defenders screen ~65% of the grid width, but baiting them with a short pass compresses their spacing and opens a 2.5–3.5 m central split window for 0.7–0.9 sec. Trains peripheral vision and disguised passing.',
    matchTransfer:
      'Breaking the first pressing line of two opposition strikers (4-4-2 / 4-2-3-1) in Zones 1–2 to thread the ball into the central pocket or half-space.',
  },
  'rondo-3': {
    originSchool:
      'Pep Guardiola, Juanma Lillo & Sergio Busquets (FC Barcelona / Manchester City) — positional rondo centered on the single pivot (#6) as the axis of progression.',
    scientificBasis:
      'An ApP of 22.5 m²/pl (15×15 m) and 16.9 m²/pl (13×13 m) replicates central midfield density. Operating inside a 360° pressure vortex (contact ≤ 0.8–1.0 sec), the #6 must execute 2–3 shoulder scans in the 3 sec prior to reception (matching elite pivot benchmarks of 0.65–0.80 scans/sec, Jordet et al.).',
    matchTransfer:
      'Zone 1 to Zone 2 build-up progression through a single pivot (#6) operating behind the opponent’s first pressing line.',
  },
  'rondo-4': {
    originSchool:
      'Paco Seirul·lo (FC Barcelona Structured Microcycle) & Julian Nagelsmann — two-zone positional game training diagonal staggering ("escalonamiento") between #6 and #8.',
    scientificBasis:
      'An ApP of 25.1 m²/pl (22×16 m) and 20.0 m²/pl (20×14 m) with an 11 m longitudinal depth per zone replicates match inter-line spacing. The dual-zone structure forces #6 and #8 to maintain a 30–45° diagonal angle, preventing vertical self-blocking.',
    matchTransfer:
      'Breaking two consecutive pressing lines (e.g., 4-4-2 mid-block) from Center-Backs through the #6 and #8/#10 interior pockets into the front line (Zone 1 → Zone 2 → Zone 3).',
  },
  'rondo-5': {
    originSchool:
      'Pep Guardiola & René Marić (Spielverlagerung) — the "Overload to Isolate" principle: generating high density on the strong side to trigger a rapid switch to the weak side.',
    scientificBasis:
      'In the active grid (12×12 m for 9 players), local density is compressed to 16.0 m²/pl (13.4 m² in 11×11 m), while total two-grid area is 32.0 m²/pl. This spatial contrast trains perceptual zooming ("narrow focus under pressure → wide scan on the 3rd pass") and 12–18 m transition sprints.',
    matchTransfer:
      'Drawing a compact defensive block toward one touchline/half-space with 4–5 short passes before switching play rapidly to the weak-side full-back or winger.',
  },
  'rondo-6': {
    originSchool:
      'Louis van Gaal & Pep Guardiola ("Juego de Posición" 4v4+3) — the classic positional play matrix featuring two endline targets and a central pivot (#6).',
    scientificBasis:
      'An ApP of 34.9 m²/pl (24×16 m for 11 players; 28.0 m²/pl in 22×14 m) matches exact central-third 11v11 match build-up density. Across 4-minute bouts, it sustains 85–90% HRmax while embedding positional geometry (width, depth, #6 pivot) under match-realistic fatigue.',
    matchTransfer:
      'Direct 11v11 model in the middle third (Zone 2): maintaining positional structure (wide wingers, deep/high targets, and #6 on the midline) during switches and instant transitions.',
  },
  'rondo-7': {
    originSchool:
      'Ralf Rangnick, Jürgen Klopp & Diego Simeone — directional pressing methodology (pressing traps) utilizing the touchline and endline intersection as "extra defenders".',
    scientificBasis:
      'An ApP of 21.8 m²/pl (14×14 m) is purposefully generous so solo chasing fails. To win the ball within 6 passes, the defensive trio must synchronize D1’s curved arc run (cutting off 180° via cover shadow) with D2 and D3 jumping adjacent lanes, collapsing the corner to < 4 m².',
    matchTransfer:
      'Touchline pressing trap in Zones 2–3: funneling build-up out to a full-back near the sideline and snapping the triangle shut (winger + #8 + full-back).',
  },
  'rondo-8': {
    originSchool:
      'Maurizio Sarri, Roberto De Zerbi & Antonio Bartolini (Italian Positional School) — concentric inner-box rondo designed to automate "Third-Man" (Tercer Hombre) bounce combinations.',
    scientificBasis:
      'An outer 16×16 m grid (23.3 m²/pl) encloses a 5×5 m inner box screened by 3 defenders. While the direct lane is blocked, an angled pass to the "Second Man" forces a 35–50° defensive head-turn, opening a 0.5–0.8 sec angular window for a 1-touch layoff to the "Third Man".',
    matchTransfer:
      'Unlocking a compact mid/low block (Zone 2 → Zone 3): finding a screened #10 or #9 between the lines via an angled pass wide and an instant 1-touch bounce pass.',
  },
  'rondo-9': {
    originSchool:
      'Ralf Rangnick (Hoffenheim / RB Leipzig), Jürgen Klopp & Pep Guardiola — the "3-to-6 Second Counter-Pressing Rule" (Gegenpressing): collective hunting reflex at the epicenter of ball loss.',
    scientificBasis:
      'Dual-density design: inside the 10×10 m inner grid (16.7 m²/pl), all 4 attackers are within ≤ 4–5 m of the turnover point, biomechanically enabling a 360° swarm within 1.5–2.5 sec. If the ball escapes to the 22×22 m outer grid (48.4 m²/pl), relative space triples, simulating a broken press.',
    matchTransfer:
      'Negative Transition (Attack → Defense) in the central corridor or half-space: instant 4-man swarming within 3 seconds of a turnover before the opponent can play a progressive outlet pass.',
  },
  'rondo-10': {
    originSchool:
      'Diego Simeone, Thomas Tuchel & Carlo Ancelotti — the golden rule of Positive Transition (Defense → Attack): "Escape the pressure zone on the 1st or 2nd pass" (Sacar el balón de la zona de recuperación).',
    scientificBasis:
      'In the active 14×14 m grid, 8 players compete at 24.5 m²/pl, whereas the adjacent 14×14 m zone holds 2 waiting targets at 98 m²/pl at the moment of regain. This spatial gradient conditions players to bypass counter-pressing within 1.0–1.8 sec via an exit pass followed by a 15–20 m transition sprint.',
    matchTransfer:
      'Positive Transition (Defense → Attack) after winning the ball in Zone 1–2: escaping the opponent’s immediate counter-press via a 1st- or 2nd-time outlet pass into free space.',
  },
};

export const RONDO_AGE_MATRIX_RU: Record<string, Record<AgeBandId, RondoAgeVariant>> = {
  'rondo-1': {
    u10: {
      baseGrid: '10 × 10 м (25.0 м²/игр.)',
      intensiveGrid: '9 × 9 м (20.3 м²/игр.)',
      touchesRule: 'Свободно / 3 касания',
      timing: '4 серии × 1 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Разрешите до 3 касаний. Главный ориентир для детей: «Не прячься за спиной водящего — беги на сторону, где пустой конус!». Смена водящего каждые 45–60 сек.',
    },
    u12: {
      baseGrid: '10 × 10 м (25.0 м²/игр.)',
      intensiveGrid: '8.5 × 8.5 м (18.1 м²/игр.)',
      touchesRule: '2–3 касания',
      timing: '4 серии × 1.5 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Акцент на приём дальней ногой вполоборота к центру (запрет останавливать мяч подошвой). Начинать перебежку на пустую грань до того, как партнёр остановил мяч.',
    },
    u14: {
      baseGrid: '9.5 × 9.5 м (22.6 м²/игр.)',
      intensiveGrid: '8.5 × 8.5 м (18.1 м²/игр.)',
      touchesRule: '2 касания обязательно',
      timing: '4 серии × 1.5 мин | Отдых: 40 сек',
      ageCoachingFocus:
        'Защитник учится бежать по дуге, отсекая одну линию «тенью перекрытия». Атака работает строго в 2 касания (приём дальней ногой + пас).',
    },
    u16: {
      baseGrid: '9 × 9 м (20.3 м²/игр.)',
      intensiveGrid: '8 × 8 м (16.0 м²/игр.)',
      touchesRule: '1–2 касания (≤ 1.5 сек)',
      timing: '4 серии × 1.5 мин | Отдых: 30 сек',
      ageCoachingFocus:
        'Запрет на обратный пас тому же игроку со 2-й ступени; синхронный рывок на пустую сторону в момент удара по мячу, 2 сканирования до приёма.',
    },
    u18_pro: {
      baseGrid: '8 × 8 м (16.0 м²/игр.)',
      intensiveGrid: '7 × 7 м (12.3 м²/игр.)',
      touchesRule: 'Строго 1–2 кас. (< 1.0 сек)',
      timing: '4 серии × 2 мин | Отдых: 30 сек',
      ageCoachingFocus:
        'Максимальная скорость мяча, запрет возврата пасующему, игра в 1 касание при давлении ближе 2 м. Любой пас выше колена считается потерей.',
    },
  },
  'rondo-2': {
    u10: {
      formatOverride: '5v2 (или 4v1 для начинающих)',
      baseGrid: '13 × 13 м (24.1 м²/игр.)',
      intensiveGrid: '12 × 12 м (20.6 м²/игр.)',
      touchesRule: 'Свободно / 3 касания',
      timing: '4 серии × 1.5 мин | Отдых: 1 мин',
      ageCoachingFocus:
        '1 очко за 6 пасов ИЛИ 2 бонусных очка за «золотой пас» между двумя защитниками. Поощряйте любую смелую попытку сыграть вразрез!',
    },
    u12: {
      baseGrid: '12 × 12 м (20.6 м²/игр.)',
      intensiveGrid: '11 × 11 м (17.3 м²/игр.)',
      touchesRule: '2–3 касания',
      timing: '4 серии × 1.5 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Дальний игрок учится смещаться вдоль линии, постоянно ловя «окошко» между двумя защитниками. Защитники учатся не бросаться вдвоём на один мяч.',
    },
    u14: {
      baseGrid: '11.5 × 11.5 м (18.9 м²/игр.)',
      intensiveGrid: '10.5 × 10.5 м (15.8 м²/игр.)',
      touchesRule: '2 касания',
      timing: '4 серии × 2 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Связка двух защитников уступом (первый атакует мяч, второй страхует створ по диагонали). Атака стягивает защитников коротким пасом-приманкой.',
    },
    u16: {
      baseGrid: '11 × 11 м (17.3 м²/игр.)',
      intensiveGrid: '10 × 10 м (14.3 м²/игр.)',
      touchesRule: '1–2 касания (интенсив: 1 кас.)',
      timing: '4 серии × 2 мин | Отдых: 40 сек',
      ageCoachingFocus:
        'Очки начисляются ТОЛЬКО за проникающий пас вразрез между защитниками; следующий пас после разрезающего — обязательно в 1 касание.',
    },
    u18_pro: {
      baseGrid: '10 × 10 м (14.3 м²/игр.)',
      intensiveGrid: '9 × 9 м (11.6 м²/игр.)',
      touchesRule: 'Строго 1 касание',
      timing: '4 серии × 2.5 мин | Отдых: 35 сек',
      ageCoachingFocus:
        'Классический профессиональный квадрат 5v2 в 1 касание на максимальной скорости. Скрытый пас вразрез без замаха и без взгляда на адресата (disguised pass).',
    },
  },
  'rondo-3': {
    u10: {
      formatOverride: '5+1 против 2 (адаптация U10)',
      baseGrid: '14 × 14 м (24.5 м²/игр.)',
      intensiveGrid: '13 × 13 м (21.1 м²/игр.)',
      touchesRule: '2–3 касания',
      timing: '4 серии × 1.5 мин | Отдых: 1 мин',
      ageCoachingFocus:
        'Адаптация для 8–10 лет: уменьшаем число защитников до 2 (5 по краям + 1 в центре против 2), чтобы центральный игрок имел время принять мяч и развернуть атаку!',
    },
    u12: {
      baseGrid: '17 × 17 м (28.9 м²/игр.)',
      intensiveGrid: '15 × 15 м (22.5 м²/игр.)',
      touchesRule: '2–3 касания (№6 — 2 кас.)',
      timing: '4 серии × 2 мин | Отдых: 1 мин',
      ageCoachingFocus:
        'Знакомство с ролью №6 в формате 7v3 на просторной площадке 17×17 м. Главное правило для №6 — всегда стоять боком (вполоборота), видя обе половины.',
    },
    u14: {
      baseGrid: '16 × 16 м (25.6 м²/игр.)',
      intensiveGrid: '14 × 14 м (19.6 м²/игр.)',
      touchesRule: '2 касания',
      timing: '4 серии × 2 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Игрок №6 учится выходить из «тени» центрального защитника двумя быстрыми шагами за спину. Оборона держит компактный треугольник в центре.',
    },
    u16: {
      baseGrid: '15 × 15 м (22.5 м²/игр.)',
      intensiveGrid: '13 × 13 м (16.9 м²/игр.)',
      touchesRule: 'Периметр 2 кас., №6 в 1–2 кас.',
      timing: '4 серии × 2.5 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Очки идут только за выход через (6) на новую грань; на 3-й ступени опорник (6) играет строго в 1 касание после 2 сканирований через плечо.',
    },
    u18_pro: {
      baseGrid: '13.5 × 13.5 м (18.2 м²/игр.)',
      intensiveGrid: '12 × 12 м (14.4 м²/игр.)',
      touchesRule: 'Все 1–2 кас., №6 строго 1 кас.',
      timing: '4 серии × 3 мин | Отдых: 40 сек',
      ageCoachingFocus:
        'Агрессивный прессинг-треугольник с лимитом 5–6 пасов на отбор. Опорник №6 обязан переводить мяч в 1 касание под плотным контактом в спину.',
    },
  },
  'rondo-4': {
    u10: {
      formatOverride: '4+2ЦП против 2 (8 игроков, 7×7)',
      baseGrid: '18 × 12 м (27.0 м²/игр.)',
      intensiveGrid: '16 × 12 м (24.0 м²/игр.)',
      touchesRule: 'Свободно / 3 касания',
      timing: '3 серии × 2 мин | Отдых: 1 мин',
      ageCoachingFocus:
        'Адаптация под футбол 7×7: 8 игроков вместо 14! По 1 игроку на 4 сторонах + 2 центральных в разных половинах против 2 защитников (по 1 в зоне). Учим переводить мяч через центр.',
    },
    u12: {
      formatOverride: '6+2ЦП против 3 (11 игроков, 9×9)',
      baseGrid: '22 × 15 м (30.0 м²/игр.)',
      intensiveGrid: '20 × 14 м (25.5 м²/игр.)',
      touchesRule: '2–3 касания',
      timing: '3 серии × 2.5 мин | Отдых: 1 мин',
      ageCoachingFocus:
        'Адаптация к 9×9: два центральных игрока («6» и «8») осваивают золотое правило — «никогда не стоять друг за другом на одной линии паса» (один ниже и левее, другой выше и правее).',
    },
    u14: {
      baseGrid: '24 × 17 м (29.1 м²/игр.)',
      intensiveGrid: '22 × 16 м (25.1 м²/игр.)',
      touchesRule: '2 касания',
      timing: '3 серии × 3 мин | Отдых: 1 мин',
      ageCoachingFocus:
        'Полный формат 8v4+2. Защитники работают строго парами в своих зонах (2+2). Акцент на диагональную цепочку «ЦЗ → фланг → №6 → №8 → ФРВ».',
    },
    u16: {
      baseGrid: '22 × 16 м (25.1 м²/игр.)',
      intensiveGrid: '20 × 14 м (20.0 м²/игр.)',
      touchesRule: '2 касания (центр 1–2 кас.)',
      timing: '3 серии × 3 мин | Отдых: 1 мин',
      ageCoachingFocus:
        'Один защитник из первой зоны может переходить среднюю линию для создания прессинга 3v1 в центре; «6» и «8» обязаны синхронно менять высоту.',
    },
    u18_pro: {
      baseGrid: '20 × 14 м (20.0 м²/игр.)',
      intensiveGrid: '18 × 13 м (16.7 м²/игр.)',
      touchesRule: '1–2 касания (№6 и №8 — 1 кас.)',
      timing: '3 серии × 3.5 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Свободный прессинг 4 защитников по обеим зонам + 4 мини-ворот для мгновенной контратаки после отбора. Вход в «8» через сброс на третьего в 1 касание.',
    },
  },
  'rondo-5': {
    u10: {
      formatOverride: '4 против 2 на 2 квадрата (6 игроков)',
      baseGrid: '2 кв. по 12 × 12 м (24.0 м²/игр.)',
      intensiveGrid: '2 кв. по 11 × 11 м (20.2 м²/игр.)',
      touchesRule: 'Свободно / 3 касания',
      timing: '4 серии × 1.5 мин | Отдых: 1 мин',
      ageCoachingFocus:
        'Адаптация U10: формат 4 против 2 (после 3 пасов один из 4 атакующих убегает в соседний пустой квадрат и получает пас-перевод).',
    },
    u12: {
      baseGrid: '2 кв. по 13 × 13 м (18.8 м²/игр.)',
      intensiveGrid: '2 кв. по 12 × 12 м (16.0 м²/игр.)',
      touchesRule: '2–3 касания',
      timing: '4 серии × 2 мин | Отдых: 1 мин',
      ageCoachingFocus:
        'Правило «На 3-м пасе — подними голову на соседний квадрат!». Дальний игрок учится заранее перебегать в свободную зону до момента паса.',
    },
    u14: {
      baseGrid: '2 кв. по 13 × 13 м (18.8 м²/игр.)',
      intensiveGrid: '2 кв. по 12 × 12 м (16.0 м²/игр.)',
      touchesRule: '2 касания',
      timing: '4 серии × 2 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Формат 6v3, перевод после 4 пасов. Защитники учатся перекрывать внутреннюю границу между квадратами, запирая мяч на одной половине.',
    },
    u16: {
      baseGrid: '2 кв. по 12 × 12 м (16.0 м²/игр.)',
      intensiveGrid: '2 кв. по 11 × 11 м + коридор 2 м',
      touchesRule: '1–2 касания',
      timing: '4 серии × 2.5 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Стягивание всех 3 защитников 4–5 быстрыми пасами (включая пас через центр) и плотный перевод низом во второй квадрат.',
    },
    u18_pro: {
      baseGrid: '2 кв. по 11 × 11 м (13.4 м²/игр.)',
      intensiveGrid: '2 кв. по 10 × 10 м + коридор 3 м',
      touchesRule: '1–2 кас. (перевод в 1 кас.)',
      timing: '4 серии × 3 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Во второй квадрат врываются 2 свежих защитника + 1 добегает из первого, а 4-й дежурит в 3-метровом коридоре, охотясь за обратным переводом.',
    },
  },
  'rondo-6': {
    u10: {
      formatOverride: '3v3 + 2 нейтральных (8 игроков)',
      baseGrid: '20 × 14 м (35.0 м²/игр.)',
      intensiveGrid: '18 × 12 м (27.0 м²/игр.)',
      touchesRule: 'Свободно / 3 касания',
      timing: '3 серии × 2.5 мин | Отдых: 1 мин',
      ageCoachingFocus:
        'Адаптация U10: 3 на 3 + 2 нейтральных по торцам (или +3Н). Главное правило: «Держите форму ромба — не сбивайтесь всей кучей в одну половину поля!».',
    },
    u12: {
      baseGrid: '24 × 16 м (34.9 м²/игр.)',
      intensiveGrid: '22 × 15 м (30.0 м²/игр.)',
      touchesRule: '2–3 касания',
      timing: '3 серии × 3 мин | Отдых: 1 мин',
      ageCoachingFocus:
        'Приучаем держать по 2 игрока в каждой половине поля и переводить мяч от одного торцевого нейтрального к другому через центрального (№6).',
    },
    u14: {
      baseGrid: '25 × 17 м (38.6 м²/игр.)',
      intensiveGrid: '23 × 15 м (31.4 м²/игр.)',
      touchesRule: '2 касания (нейтральные 1–2 кас.)',
      timing: '3 серии × 3.5 мин | Отдых: 1 мин',
      ageCoachingFocus:
        'Быстрая смена фаз при потере и отборе: потерявшие мгновенно сжимаются к центру, отобравшие сразу дают ширину на боковых линиях.',
    },
    u16: {
      baseGrid: '24 × 16 м (34.9 м²/игр.)',
      intensiveGrid: '22 × 14 м (28.0 м²/игр.)',
      touchesRule: '2 касания (нейтральные 1 кас.)',
      timing: '3 серии × 4 мин | Отдых: 1 мин',
      ageCoachingFocus:
        'Сводная позиционная игра модуля: очки суммируются за пас через (6), комбинацию на третьего, смену зоны и контрпрессинг за 3 секунды.',
    },
    u18_pro: {
      baseGrid: '22 × 14 м (28.0 м²/игр.)',
      intensiveGrid: '20 × 13 м (23.6 м²/игр.)',
      touchesRule: '1–2 кас. (нейтр. строго 1 кас.)',
      timing: '4 серии × 4 мин | Отдых: 1 мин',
      ageCoachingFocus:
        'Высокоинтенсивный позиционный режим Ла Масии / Гвардиолы: все нейтральные играют строго в 1 касание, запрет возврата тому же нейтральному.',
    },
  },
  'rondo-7': {
    u10: {
      formatOverride: '4 против 2 с угловыми «мышеловками»',
      baseGrid: '12 × 12 м (24.0 м²/игр.)',
      intensiveGrid: '11 × 11 м (20.2 м²/игр.)',
      touchesRule: '2–3 касания',
      timing: '4 серии × 1 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Адаптация U10: играем 4 против 2. В углах размечены квадратики 2×2 м («мышеловки»). Защитники получают 2 очка, если загнали мяч в угол и отобрали!',
    },
    u12: {
      baseGrid: '15 × 15 м (25.0 м²/игр.)',
      intensiveGrid: '14 × 14 м (21.8 м²/игр.)',
      touchesRule: '2–3 касания',
      timing: '4 серии × 1.5 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Первый защитник учится бежать не по прямой, а по дуге («бананом»), отрезая пас назад, пока два партнёра поджимают ближних на линиях.',
    },
    u14: {
      baseGrid: '14.5 × 14.5 м (23.4 м²/игр.)',
      intensiveGrid: '13.5 × 13.5 м (20.3 м²/игр.)',
      touchesRule: '2 касания',
      timing: '4 серии × 2 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Чтение триггера прессинга: как только идёт пас в угол или приём под слабую ногу — все 3 защитника синхронно смыкают треугольник.',
    },
    u16: {
      baseGrid: '14 × 14 м (21.8 м²/игр.)',
      intensiveGrid: '13 × 13 м (18.8 м²/игр.)',
      touchesRule: '2 касания',
      timing: '4 серии × 2 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Лимит 6 пасов для тройки обороны на отбор; после перехвата в угловой ловушке защитники обязаны сделать 1 точный пас между собой.',
    },
    u18_pro: {
      baseGrid: '13 × 13 м (18.8 м²/игр.)',
      intensiveGrid: '12 × 12 м (16.0 м²/игр.)',
      touchesRule: '1–2 касания',
      timing: '4 серии × 2.5 мин | Отдых: 40 сек',
      ageCoachingFocus:
        'Максимальная агрессия в отборе (лимит 5 пасов), а атака обязана выходить из углового капкана только комбинацией в 1 касание или диагональным переводом низом.',
    },
  },
  'rondo-8': {
    u10: {
      formatOverride: '4+1 (в «домике») против 2',
      baseGrid: '14 × 14 м (внутр. 4 × 4 м, 28.0 м²/игр.)',
      intensiveGrid: '13 × 13 м (внутр. 4 × 4 м)',
      touchesRule: '2–3 касания',
      timing: '4 серии × 1.5 мин | Отдых: 1 мин',
      ageCoachingFocus:
        'Адаптация U10: 4 игрока по сторонам + 1 в центральном «домике» 4×4 м против 2 защитников. Учим простой скидке: «Отдай в домик — получи обратно в свободную сторону!».',
    },
    u12: {
      baseGrid: '17 × 17 м (внутр. 5 × 5 м, 26.3 м²/игр.)',
      intensiveGrid: '16 × 16 м (внутр. 5 × 5 м)',
      touchesRule: 'Периметр 2–3 кас., сброс 1–2 кас.',
      timing: '4 серии × 2 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Игрок во внутреннем квадрате работает «зеркалом» — сбрасывает мяч в 1–2 касания третьему партнёру, к которому развёрнут лицом.',
    },
    u14: {
      baseGrid: '16.5 × 16.5 м (внутр. 5 × 5 м, 24.8 м²/игр.)',
      intensiveGrid: '15 × 15 м (внутр. 4.5 × 4.5 м)',
      touchesRule: '2 касания (сброс в 1 кас.)',
      timing: '4 серии × 2 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Освоение обоих вариантов: центральный игрок как «второй» (делает скидку наружу) и как «третий» (получает скидку в 1 касание от крайнего).',
    },
    u16: {
      baseGrid: '16 × 16 м (внутр. 5 × 5 м, 23.3 м²/игр.)',
      intensiveGrid: '14 × 14 м (внутр. 4 × 4 м, 17.8 м²/игр.)',
      touchesRule: 'Периметр 1–2 кас., «второй» — 1 кас.',
      timing: '4 серии × 2.5 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'В счёт идут ТОЛЬКО комбинации «А → В (в 1 касание) → С». Требуйте «пас как подсказку»: передача под левую ногу В = сброс влево.',
    },
    u18_pro: {
      baseGrid: '14 × 14 м (внутр. 4 × 4 м, 17.8 м²/игр.)',
      intensiveGrid: '13 × 13 м (внутр. 3.5 × 3.5 м, 15.4 м²/игр.)',
      touchesRule: 'Строго 1 касание при входе/выходе',
      timing: '4 серии × 3 мин | Отдых: 40 сек',
      ageCoachingFocus:
        'Сверхплотный режим Де Дзерби / Сарри: любой вход во внутренний бокс и выход из него — строго в 1 касание с динамической сменой центрального игрока.',
    },
  },
  'rondo-9': {
    u10: {
      baseGrid: 'Малый 12 × 12 м (24.0 м²/игр.) в 24 × 24 м',
      intensiveGrid: 'Малый 11 × 11 м в 22 × 22 м',
      touchesRule: 'Свободно / 3 касания',
      timing: '4 серии × 1 мин | Отдых: 1 мин',
      ageCoachingFocus:
        'Правило «5 секунд охоты»: если синие перехватили мяч, все 4 красных должны быстро окружить их и не дать отдать пас друзьям на большой квадрат!',
    },
    u12: {
      baseGrid: 'Малый 11 × 11 м (20.2 м²/игр.) в 23 × 23 м',
      intensiveGrid: 'Малый 10 × 10 м в 21 × 21 м',
      touchesRule: '2–3 касания',
      timing: '4 серии × 1.5 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Формируем мгновенную реакцию на потерю (правило 4 секунд): запрещено останавливаться, опускать голову или выключаться после ошибки.',
    },
    u14: {
      baseGrid: 'Малый 10.5 × 10.5 м (18.4 м²/игр.) в 22 × 22 м',
      intensiveGrid: 'Малый 9.5 × 9.5 м в 20 × 20 м',
      touchesRule: '2 касания',
      timing: '4 серии × 2 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Разделение ролей в контрпрессинге: ближайший к потере сразу атакует мяч, трое остальных перекрывают линии первого паса наружу.',
    },
    u16: {
      baseGrid: 'Малый 10 × 10 м (16.7 м²/игр.) в 22 × 22 м',
      intensiveGrid: 'Малый 9 × 9 м (13.5 м²/игр.) в 20 × 20 м',
      touchesRule: '1–2 касания',
      timing: '4 серии × 2 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Строгое правило 3 секунд (+2 очка за возврат). При выводе мяча наружу игра продолжается 6v4 в большом квадрате без паузы.',
    },
    u18_pro: {
      baseGrid: 'Малый 9 × 9 м (13.5 м²/игр.) в 20 × 20 м',
      intensiveGrid: 'Малый 8 × 8 м (10.7 м²/игр.) в 18 × 18 м',
      touchesRule: '1–2 кас. (выход из отбора в 1 кас.)',
      timing: '4 серии × 2.5 мин | Отдых: 40 сек',
      ageCoachingFocus:
        'Непрерывный двухсторонний переход (4v2 внутри ↔ 6v4 снаружи ↔ мгновенный обратный контрпрессинг синих при потере в большом квадрате).',
    },
  },
  'rondo-10': {
    u10: {
      formatOverride: '4v2 → 4v2 (8 игроков: 4 красных vs 4 синих)',
      baseGrid: '2 кв. по 13 × 13 м (28.2 м²/игр.)',
      intensiveGrid: '2 кв. по 12 × 12 м (24.0 м²/игр.)',
      touchesRule: 'Свободно / 3 касания',
      timing: '4 серии × 1.5 мин | Отдых: 1 мин',
      ageCoachingFocus:
        'Адаптация U10 (8 игроков): в первом квадрате 4 против 2, а 2 других синих ждут во втором квадрате. Отобрал — сразу отдай пас друзьям в свободный квадрат!',
    },
    u12: {
      baseGrid: '2 кв. по 15 × 15 м (28.1 м²/игр.)',
      intensiveGrid: '2 кв. по 14 × 14 м (24.5 м²/игр.)',
      touchesRule: '2–3 касания',
      timing: '4 серии × 2 мин | Отдых: 1 мин',
      ageCoachingFocus:
        'Учимся не возиться с мячом в куче после отбора, а сразу поднимать голову и находить двух свободных партнёров во второй зоне.',
    },
    u14: {
      baseGrid: '2 кв. по 14.5 × 14.5 м (26.3 м²/игр.)',
      intensiveGrid: '2 кв. по 13 × 13 м (21.1 м²/игр.)',
      touchesRule: '2 касания',
      timing: '4 серии × 2 мин | Отдых: 1 мин',
      ageCoachingFocus:
        'Ожидающие игроки во второй зоне активно двигаются вдоль центральной линии, открываясь в «окна» между прессингующими.',
    },
    u16: {
      baseGrid: '2 кв. по 14 × 14 м (24.5 м²/игр.)',
      intensiveGrid: '2 кв. по 12 × 12 м (18.0 м²/игр.)',
      touchesRule: '1–2 касания',
      timing: '4 серии × 2.5 мин | Отдых: 1 мин',
      ageCoachingFocus:
        'Выход во вторую зону строго 1-м или 2-м пасом после отбора и взрывной рывок трёх отобравших для перестроения в новый квадрат 5v3.',
    },
    u18_pro: {
      baseGrid: '2 кв. по 12.5 × 12.5 м (19.5 м²/игр.)',
      intensiveGrid: '2 кв. по 11 × 11 м (15.1 м²/игр.)',
      touchesRule: '1–2 кас. (выход строго 1-м пасом)',
      timing: '4 серии × 3 мин | Отдых: 45 сек',
      ageCoachingFocus:
        'Выход из зоны отбора только 1-м пасом (или через сброс от ожидающего обратно на третьего) под тотальным 4-секундным контрпрессингом всей пятёрки!',
    },
  },
};

export const RONDO_AGE_MATRIX_EN: Record<string, Record<AgeBandId, RondoAgeVariant>> = {
  'rondo-1': {
    u10: {
      baseGrid: '10 × 10 m (25.0 m²/pl)',
      intensiveGrid: '9 × 9 m (20.3 m²/pl)',
      touchesRule: 'Free / 3 touches',
      timing: '4 sets × 1 min | Rest: 45 sec',
      ageCoachingFocus:
        'Allow up to 3 touches. Primary cue for young players: "Don’t hide behind the defender — sprint to the side with the empty cone!". Rotate defender every 45–60 sec.',
    },
    u12: {
      baseGrid: '10 × 10 m (25.0 m²/pl)',
      intensiveGrid: '8.5 × 8.5 m (18.1 m²/pl)',
      touchesRule: '2–3 touches',
      timing: '4 sets × 1.5 min | Rest: 45 sec',
      ageCoachingFocus:
        'Focus on back-foot reception on the half-turn (forbid stopping the ball with the sole). Trigger the rotation run before the receiver traps the ball.',
    },
    u14: {
      baseGrid: '9.5 × 9.5 m (22.6 m²/pl)',
      intensiveGrid: '8.5 × 8.5 m (18.1 m²/pl)',
      touchesRule: 'Mandatory 2 touches',
      timing: '4 sets × 1.5 min | Rest: 40 sec',
      ageCoachingFocus:
        'Defender learns curved arc runs to screen one option with his cover shadow. Attack plays strictly 2 touches (back-foot control + pass).',
    },
    u16: {
      baseGrid: '9 × 9 m (20.3 m²/pl)',
      intensiveGrid: '8 × 8 m (16.0 m²/pl)',
      touchesRule: '1–2 touches (≤ 1.5 sec)',
      timing: '4 sets × 1.5 min | Rest: 30 sec',
      ageCoachingFocus:
        'No return pass to the same player from Stage 2; synchronous sprint to the vacant line at pass impact, 2 shoulder scans before reception.',
    },
    u18_pro: {
      baseGrid: '8 × 8 m (16.0 m²/pl)',
      intensiveGrid: '7 × 7 m (12.3 m²/pl)',
      touchesRule: 'Strictly 1–2 touches (< 1.0 sec)',
      timing: '4 sets × 2 min | Rest: 30 sec',
      ageCoachingFocus:
        'Maximum ball speed, no return pass to the passer, 1-touch execution whenever pressed within 2 m. Any ball lifted above knee height counts as a turnover.',
    },
  },
  'rondo-2': {
    u10: {
      formatOverride: '5v2 (or 4v1 for beginners)',
      baseGrid: '13 × 13 m (24.1 m²/pl)',
      intensiveGrid: '12 × 12 m (20.6 m²/pl)',
      touchesRule: 'Free / 3 touches',
      timing: '4 sets × 1.5 min | Rest: 1 min',
      ageCoachingFocus:
        '1 point for 6 passes OR 2 bonus points for a "golden split pass" between the two defenders. Praise every brave attempt to split the defenders!',
    },
    u12: {
      baseGrid: '12 × 12 m (20.6 m²/pl)',
      intensiveGrid: '11 × 11 m (17.3 m²/pl)',
      touchesRule: '2–3 touches',
      timing: '4 sets × 1.5 min | Rest: 45 sec',
      ageCoachingFocus:
        'Teach the far-side player to slide along the line to stay in the "window" between the two defenders. Defenders learn not to double-chase the same ball.',
    },
    u14: {
      baseGrid: '11.5 × 11.5 m (18.9 m²/pl)',
      intensiveGrid: '10.5 × 10.5 m (15.8 m²/pl)',
      touchesRule: '2 touches',
      timing: '4 sets × 2 min | Rest: 45 sec',
      ageCoachingFocus:
        'Staggered defensive pair (first presses the ball, second covers the central gap diagonally). Attackers bait the pair together with short passes.',
    },
    u16: {
      baseGrid: '11 × 11 m (17.3 m²/pl)',
      intensiveGrid: '10 × 10 m (14.3 m²/pl)',
      touchesRule: '1–2 touches (intensive: 1 touch)',
      timing: '4 sets × 2 min | Rest: 40 sec',
      ageCoachingFocus:
        'Points awarded ONLY for split passes between the defenders; the pass immediately following a split pass must be 1-touch.',
    },
    u18_pro: {
      baseGrid: '10 × 10 m (14.3 m²/pl)',
      intensiveGrid: '9 × 9 m (11.6 m²/pl)',
      touchesRule: 'Strictly 1 touch',
      timing: '4 sets × 2.5 min | Rest: 35 sec',
      ageCoachingFocus:
        'Classic pro 5v2 1-touch rondo at elite ball velocity. Disguised split passes without telegraphing hip or eye direction.',
    },
  },
  'rondo-3': {
    u10: {
      formatOverride: '5+1 vs 2 (U10 Adaptation)',
      baseGrid: '14 × 14 m (24.5 m²/pl)',
      intensiveGrid: '13 × 13 m (21.1 m²/pl)',
      touchesRule: '2–3 touches',
      timing: '4 sets × 1.5 min | Rest: 1 min',
      ageCoachingFocus:
        'U10 Adaptation: reduce defenders to 2 (5 on perimeter + 1 pivot vs 2) so the central player has time to receive, turn, and switch play without being swarmed by 3!',
    },
    u12: {
      baseGrid: '17 × 17 m (28.9 m²/pl)',
      intensiveGrid: '15 × 15 m (22.5 m²/pl)',
      touchesRule: '2–3 touches (#6 on 2 touches)',
      timing: '4 sets × 2 min | Rest: 1 min',
      ageCoachingFocus:
        'Introduction to the #6 pivot role in 7v3 inside a spacious 17×17 m grid. Key habit for #6: always stand side-on (half-turn) to see both halves.',
    },
    u14: {
      baseGrid: '16 × 16 m (25.6 m²/pl)',
      intensiveGrid: '14 × 14 m (19.6 m²/pl)',
      touchesRule: '2 touches',
      timing: '4 sets × 2 min | Rest: 45 sec',
      ageCoachingFocus:
        'Pivot #6 learns to step out of the central defender’s cover shadow with two quick lateral steps. Defense forms a compact central triangle.',
    },
    u16: {
      baseGrid: '15 × 15 m (22.5 m²/pl)',
      intensiveGrid: '13 × 13 m (16.9 m²/pl)',
      touchesRule: 'Perimeter 2 touches, #6 on 1–2',
      timing: '4 sets × 2.5 min | Rest: 45 sec',
      ageCoachingFocus:
        'Points count only for progressions through (#6) to a new line; in Stage 3 the pivot (#6) plays strictly 1-touch after 2 pre-reception scans.',
    },
    u18_pro: {
      baseGrid: '13.5 × 13.5 m (18.2 m²/pl)',
      intensiveGrid: '12 × 12 m (14.4 m²/pl)',
      touchesRule: 'All 1–2 touches, #6 strictly 1 touch',
      timing: '4 sets × 3 min | Rest: 40 sec',
      ageCoachingFocus:
        'Aggressive pressing triangle with a 5–6 pass limit to regain. Pivot #6 must execute 1-touch layoffs and redirects with a defender tight on his back.',
    },
  },
  'rondo-4': {
    u10: {
      formatOverride: '4+2CM vs 2 (8 players, 7v7 model)',
      baseGrid: '18 × 12 m (27.0 m²/pl)',
      intensiveGrid: '16 × 12 m (24.0 m²/pl)',
      touchesRule: 'Free / 3 touches',
      timing: '3 sets × 2 min | Rest: 1 min',
      ageCoachingFocus:
        'U10 (7v7) Adaptation: 8 players instead of 14! 4 outside targets + 2 central players (one per half) vs 2 defenders (1 per zone). Teach end-to-end progression through the middle.',
    },
    u12: {
      formatOverride: '6+2CM vs 3 (11 players, 9v9 model)',
      baseGrid: '22 × 15 m (30.0 m²/pl)',
      intensiveGrid: '20 × 14 m (25.5 m²/pl)',
      touchesRule: '2–3 touches',
      timing: '3 sets × 2.5 min | Rest: 1 min',
      ageCoachingFocus:
        '9v9 Adaptation: two central players (#6 & #8) learn the golden rule — "never stand on the same vertical rail" (one drops left, the other pushes higher right).',
    },
    u14: {
      baseGrid: '24 × 17 m (29.1 m²/pl)',
      intensiveGrid: '22 × 16 m (25.1 m²/pl)',
      touchesRule: '2 touches',
      timing: '3 sets × 3 min | Rest: 1 min',
      ageCoachingFocus:
        'Full 8v4+2 format. Defenders stay locked in 2+2 zonal pairs. Focus on the diagonal progression chain "CB → Wide → #6 → #8 → CF".',
    },
    u16: {
      baseGrid: '22 × 16 m (25.1 m²/pl)',
      intensiveGrid: '20 × 14 m (20.0 m²/pl)',
      touchesRule: '2 touches (CMs 1–2 touches)',
      timing: '3 sets × 3 min | Rest: 1 min',
      ageCoachingFocus:
        'One defender from Zone 1 may jump across the midline to create a 3v1 central press; #6 and #8 must dynamically counter-rotate heights.',
    },
    u18_pro: {
      baseGrid: '20 × 14 m (20.0 m²/pl)',
      intensiveGrid: '18 × 13 m (16.7 m²/pl)',
      touchesRule: '1–2 touches (#6 & #8 on 1 touch)',
      timing: '3 sets × 3.5 min | Rest: 45 sec',
      ageCoachingFocus:
        'Free 4-man hunting press across both zones + 4 mini-goals for instant counter-attack on regain. Entry into #8 via 1-touch third-man layoffs.',
    },
  },
  'rondo-5': {
    u10: {
      formatOverride: '4v2 across 2 grids (6 players)',
      baseGrid: '2 grids of 12 × 12 m (24.0 m²/pl)',
      intensiveGrid: '2 grids of 11 × 11 m (20.2 m²/pl)',
      touchesRule: 'Free / 3 touches',
      timing: '4 sets × 1.5 min | Rest: 1 min',
      ageCoachingFocus:
        'U10 Adaptation: 4v2 format (after 3 passes, one of the 4 attackers sprints into the adjacent empty grid to receive the switch pass).',
    },
    u12: {
      baseGrid: '2 grids of 13 × 13 m (18.8 m²/pl)',
      intensiveGrid: '2 grids of 12 × 12 m (16.0 m²/pl)',
      touchesRule: '2–3 touches',
      timing: '4 sets × 2 min | Rest: 1 min',
      ageCoachingFocus:
        'Rule: "On the 3rd pass, look to the next grid!". Far-side player learns to expand early into the vacant grid before the switch is struck.',
    },
    u14: {
      baseGrid: '2 grids of 13 × 13 m (18.8 m²/pl)',
      intensiveGrid: '2 grids of 12 × 12 m (16.0 m²/pl)',
      touchesRule: '2 touches',
      timing: '4 sets × 2 min | Rest: 45 sec',
      ageCoachingFocus:
        '6v3 format, switch after 4 passes. Defenders learn to screen the internal dividing line to lock the ball inside the first grid.',
    },
    u16: {
      baseGrid: '2 grids of 12 × 12 m (16.0 m²/pl)',
      intensiveGrid: '2 grids of 11 × 11 m + 2 m channel',
      touchesRule: '1–2 touches',
      timing: '4 sets × 2.5 min | Rest: 45 sec',
      ageCoachingFocus:
        'Draw all 3 defenders in with 4–5 rapid passes (including a central touch) before firing a firm ground switch into the second grid.',
    },
    u18_pro: {
      baseGrid: '2 grids of 11 × 11 m (13.4 m²/pl)',
      intensiveGrid: '2 grids of 10 × 10 m + 3 m channel',
      touchesRule: '1–2 touches (switch on 1st touch)',
      timing: '4 sets × 3 min | Rest: 45 sec',
      ageCoachingFocus:
        'Two fresh defenders sprint into the new grid + 1 tracks across, while the 4th stays in the 3 m central channel to hunt any return switch.',
    },
  },
  'rondo-6': {
    u10: {
      formatOverride: '3v3 + 2 Endline Neutrals (8 players)',
      baseGrid: '20 × 14 m (35.0 m²/pl)',
      intensiveGrid: '18 × 12 m (27.0 m²/pl)',
      touchesRule: 'Free / 3 touches',
      timing: '3 sets × 2.5 min | Rest: 1 min',
      ageCoachingFocus:
        'U10 Adaptation: 3v3 + 2 endline neutrals (or +3N). Golden rule: "Keep your diamond shape — don’t all swarm into the same half chasing the ball!".',
    },
    u12: {
      baseGrid: '24 × 16 m (34.9 m²/pl)',
      intensiveGrid: '22 × 15 m (30.0 m²/pl)',
      touchesRule: '2–3 touches',
      timing: '3 sets × 3 min | Rest: 1 min',
      ageCoachingFocus:
        'Train players to maintain 2 teammates in each half of the grid and transfer the ball from one endline neutral to the other via the central pivot (#6).',
    },
    u14: {
      baseGrid: '25 × 17 m (38.6 m²/pl)',
      intensiveGrid: '23 × 15 m (31.4 m²/pl)',
      touchesRule: '2 touches (neutrals 1–2 touches)',
      timing: '3 sets × 3.5 min | Rest: 1 min',
      ageCoachingFocus:
        'Instant role-transition on turnover: the team losing possession compacts centrally within 2 sec; the regaining team immediately expands wide.',
    },
    u16: {
      baseGrid: '24 × 16 m (34.9 m²/pl)',
      intensiveGrid: '22 × 14 m (28.0 m²/pl)',
      touchesRule: '2 touches (3 neutrals on 1 touch)',
      timing: '3 sets × 4 min | Rest: 1 min',
      ageCoachingFocus:
        'Capstone positional game: points stack for playing via (#6), third-man bounce combinations, zone switches, and 3-sec counter-press regains.',
    },
    u18_pro: {
      baseGrid: '22 × 14 m (28.0 m²/pl)',
      intensiveGrid: '20 × 13 m (23.6 m²/pl)',
      touchesRule: '1–2 touches (neutrals strictly 1 touch)',
      timing: '4 sets × 4 min | Rest: 1 min',
      ageCoachingFocus:
        'High-intensity La Masia / Guardiola positional regime: all neutrals strictly 1-touch, return pass to the same neutral forbidden.',
    },
  },
  'rondo-7': {
    u10: {
      formatOverride: '4v2 with Corner "Mousetraps"',
      baseGrid: '12 × 12 m (24.0 m²/pl)',
      intensiveGrid: '11 × 11 m (20.2 m²/pl)',
      touchesRule: '2–3 touches',
      timing: '4 sets × 1 min | Rest: 45 sec',
      ageCoachingFocus:
        'U10 Adaptation: 4v2 format with bright 2×2 m corner "mousetraps". The 2 defenders score 2 bonus points whenever they herd the ball into a corner and win it!',
    },
    u12: {
      baseGrid: '15 × 15 m (25.0 m²/pl)',
      intensiveGrid: '14 × 14 m (21.8 m²/pl)',
      touchesRule: '2–3 touches',
      timing: '4 sets × 1.5 min | Rest: 45 sec',
      ageCoachingFocus:
        'First defender learns to curve his run ("banana run") to cut off the back-pass while his two partners step tight onto the nearest line options.',
    },
    u14: {
      baseGrid: '14.5 × 14.5 m (23.4 m²/pl)',
      intensiveGrid: '13.5 × 13.5 m (20.3 m²/pl)',
      touchesRule: '2 touches',
      timing: '4 sets × 2 min | Rest: 45 sec',
      ageCoachingFocus:
        'Reading the pressing trigger: the instant a pass travels toward a corner or onto a weak foot, all 3 defenders snap the trap shut in unison.',
    },
    u16: {
      baseGrid: '14 × 14 m (21.8 m²/pl)',
      intensiveGrid: '13 × 13 m (18.8 m²/pl)',
      touchesRule: '2 touches',
      timing: '4 sets × 2 min | Rest: 45 sec',
      ageCoachingFocus:
        '6-pass limit for the defensive trio to force a turnover; upon winning the ball in the trap, defenders must connect 1 clean pass among themselves.',
    },
    u18_pro: {
      baseGrid: '13 × 13 m (18.8 m²/pl)',
      intensiveGrid: '12 × 12 m (16.0 m²/pl)',
      touchesRule: '1–2 touches',
      timing: '4 sets × 2.5 min | Rest: 40 sec',
      ageCoachingFocus:
        'Maximum pressing intensity (5-pass limit for defense), while the attack must escape the corner trap via 1-touch triangles or a driven ground switch.',
    },
  },
  'rondo-8': {
    u10: {
      formatOverride: '4+1 (in Central "House") vs 2',
      baseGrid: '14 × 14 m (inner 4 × 4 m, 28.0 m²/pl)',
      intensiveGrid: '13 × 13 m (inner 4 × 4 m)',
      touchesRule: '2–3 touches',
      timing: '4 sets × 1.5 min | Rest: 1 min',
      ageCoachingFocus:
        'U10 Adaptation: 4 perimeter players + 1 inside the 4×4 m central "house" vs 2 defenders. Teach the basic bounce: "Pass into the house — get the layoff into space!".',
    },
    u12: {
      baseGrid: '17 × 17 m (inner 5 × 5 m, 26.3 m²/pl)',
      intensiveGrid: '16 × 16 m (inner 5 × 5 m)',
      touchesRule: 'Perimeter 2–3 touches, layoff 1–2',
      timing: '4 sets × 2 min | Rest: 45 sec',
      ageCoachingFocus:
        'The player inside the inner box acts as a "mirror" — bouncing the ball in 1–2 touches to the third teammate he is facing.',
    },
    u14: {
      baseGrid: '16.5 × 16.5 m (inner 5 × 5 m, 24.8 m²/pl)',
      intensiveGrid: '15 × 15 m (inner 4.5 × 4.5 m)',
      touchesRule: '2 touches (layoff in 1 touch)',
      timing: '4 sets × 2 min | Rest: 45 sec',
      ageCoachingFocus:
        'Master both patterns: central player as the "Second Man" (laying off) and as the "Third Man" (receiving a 1-touch bounce from a wide player).',
    },
    u16: {
      baseGrid: '16 × 16 m (inner 5 × 5 m, 23.3 m²/pl)',
      intensiveGrid: '14 × 14 m (inner 4 × 4 m, 17.8 m²/pl)',
      touchesRule: 'Perimeter 1–2 touches, 2nd man 1 touch',
      timing: '4 sets × 2.5 min | Rest: 45 sec',
      ageCoachingFocus:
        'ONLY "A → B (1-touch) → C" combinations score. Demand "pass as a message": pass to B’s left foot commands a 1-touch bounce left.',
    },
    u18_pro: {
      baseGrid: '14 × 14 m (inner 4 × 4 m, 17.8 m²/pl)',
      intensiveGrid: '13 × 13 m (inner 3.5 × 3.5 m, 15.4 m²/pl)',
      touchesRule: 'Strictly 1 touch on entry & exit',
      timing: '4 sets × 3 min | Rest: 40 sec',
      ageCoachingFocus:
        'Ultra-dense De Zerbi / Sarri regime: every entry and exit involving the inner box must be 1-touch with dynamic rotation of the central player.',
    },
  },
  'rondo-9': {
    u10: {
      baseGrid: '12 × 12 m inner (24.0 m²/pl) inside 24 × 24 m',
      intensiveGrid: '11 × 11 m inner inside 22 × 22 m',
      touchesRule: 'Free / 3 touches',
      timing: '4 sets × 1 min | Rest: 1 min',
      ageCoachingFocus:
        '"5-Second Hunting Rule": if Blue wins the ball, all 4 Red players must quickly surround them before they can pass out to their friends on the big square!',
    },
    u12: {
      baseGrid: '11 × 11 m inner (20.2 m²/pl) inside 23 × 23 m',
      intensiveGrid: '10 × 10 m inner inside 21 × 21 m',
      touchesRule: '2–3 touches',
      timing: '4 sets × 1.5 min | Rest: 45 sec',
      ageCoachingFocus:
        'Build an automatic reaction to ball loss (4-second rule): zero freezing, head-dropping, or complaining after a mistake.',
    },
    u14: {
      baseGrid: '10.5 × 10.5 m inner (18.4 m²/pl) inside 22 × 22 m',
      intensiveGrid: '9.5 × 9.5 m inner inside 20 × 20 m',
      touchesRule: '2 touches',
      timing: '4 sets × 2 min | Rest: 45 sec',
      ageCoachingFocus:
        'Role division in counter-pressing: nearest player immediately presses the ball-winner while the other three collapse passing lanes outward.',
    },
    u16: {
      baseGrid: '10 × 10 m inner (16.7 m²/pl) inside 22 × 22 m',
      intensiveGrid: '9 × 9 m inner (13.5 m²/pl) inside 20 × 20 m',
      touchesRule: '1–2 touches',
      timing: '4 sets × 2 min | Rest: 45 sec',
      ageCoachingFocus:
        'Strict 3-second rule (+2 pts for regain). If Blue breaks out of the inner grid, play continues live 6v4 across the 22×22 m outer grid.',
    },
    u18_pro: {
      baseGrid: '9 × 9 m inner (13.5 m²/pl) inside 20 × 20 m',
      intensiveGrid: '8 × 8 m inner (10.7 m²/pl) inside 18 × 18 m',
      touchesRule: '1–2 touches (breakout in 1 touch)',
      timing: '4 sets × 2.5 min | Rest: 40 sec',
      ageCoachingFocus:
        'Continuous two-way transition loop (4v2 inside ↔ 6v4 outside ↔ immediate Blue counter-press if Red regains in the outer grid).',
    },
  },
  'rondo-10': {
    u10: {
      formatOverride: '4v2 → 4v2 (8 players: 4 Red vs 4 Blue)',
      baseGrid: '2 grids of 13 × 13 m (28.2 m²/pl)',
      intensiveGrid: '2 grids of 12 × 12 m (24.0 m²/pl)',
      touchesRule: 'Free / 3 touches',
      timing: '4 sets × 1.5 min | Rest: 1 min',
      ageCoachingFocus:
        'U10 Adaptation (8 players): 4v2 in Grid 1 while 2 Blue teammates wait in Grid 2. Win the ball — pass immediately to your free teammates in Grid 2!',
    },
    u12: {
      baseGrid: '2 grids of 15 × 15 m (28.1 m²/pl)',
      intensiveGrid: '2 grids of 14 × 14 m (24.5 m²/pl)',
      touchesRule: '2–3 touches',
      timing: '4 sets × 2 min | Rest: 1 min',
      ageCoachingFocus:
        'Teach players not to dribble into traffic after winning the ball, but to lift their head immediately and find the 2 free teammates in Zone 2.',
    },
    u14: {
      baseGrid: '2 grids of 14.5 × 14.5 m (26.3 m²/pl)',
      intensiveGrid: '2 grids of 13 × 13 m (21.1 m²/pl)',
      touchesRule: '2 touches',
      timing: '4 sets × 2 min | Rest: 1 min',
      ageCoachingFocus:
        'Waiting target players in Zone 2 move actively along the midline, checking into passing windows between counter-pressing opponents.',
    },
    u16: {
      baseGrid: '2 grids of 14 × 14 m (24.5 m²/pl)',
      intensiveGrid: '2 grids of 12 × 12 m (18.0 m²/pl)',
      touchesRule: '1–2 touches',
      timing: '4 sets × 2.5 min | Rest: 1 min',
      ageCoachingFocus:
        'Exit into Zone 2 strictly on the 1st or 2nd pass after regain, followed by an explosive sprint to establish the new 5v3 shape.',
    },
    u18_pro: {
      baseGrid: '2 grids of 12.5 × 12.5 m (19.5 m²/pl)',
      intensiveGrid: '2 grids of 11 × 11 m (15.1 m²/pl)',
      touchesRule: '1–2 touches (1st-pass exit mandatory)',
      timing: '4 sets × 3 min | Rest: 45 sec',
      ageCoachingFocus:
        'Escape the pressure zone strictly on the 1st pass (or via a 1-touch bounce from a waiting target to a third man) against a full 5-man 4-second counter-press!',
    },
  },
};

export const AGE_BANDS_DE: AgeBandInfo[] = [
  {
    id: 'u10',
    shortLabel: 'U9-10',
    label: 'U9-10 (8–10 J.)',
    ageYears: '8–10 Jahre',
    stageTitle: 'Grundlagentraining (Funino / Spielintelligenz entdecken)',
    relativeAreaRule: '+25–35 % Fläche (24–35 m²/Sp.)',
    decisionWindow: '2,2 – 3,0 Sek.',
    physiologicalProfile: 'Alaktazid-aerob (Belastung 60–90 Sek., Pause 1:1)',
    summaryFocus:
      'Vergrößerte Felder, freie Kontakte oder 2–3 Kontakte. Komplexe Spielformen werden in der Spielerzahl reduziert (4v1, 4v2, 3v3+2N). Fokus: Mitnahme mit dem ballfernen Fuß und Freilaufen aus dem Deckungsschatten.',
  },
  {
    id: 'u12',
    shortLabel: 'U11-12',
    label: 'U11-12 (11–12 J.)',
    ageYears: '11–12 Jahre',
    stageTitle: 'Goldenes Lernalter der Motorik',
    relativeAreaRule: '+15–20 % Fläche (20–28 m²/Sp.)',
    decisionWindow: '1,6 – 2,0 Sek.',
    physiologicalProfile: 'Neuromuskulär-koordinative Schnelligkeit ohne Übersäuerung (2:1)',
    summaryFocus:
      'Maximale Neuroplastizität: Offene Spielstellung (Perfilación / Halb-offene Stellung), erster Schulterblick vor der Ballannahme, bewusster Schnittstellenpass und Einführung der Sechser-Rolle (#6).',
  },
  {
    id: 'u14',
    shortLabel: 'U13-14',
    label: 'U13-14 (13–14 J.)',
    ageYears: '13–14 Jahre',
    stageTitle: 'Aufbautraining: Übergang zum 11-gegen-11 (PHV-Steuerung)',
    relativeAreaRule: '+8–10 % Fläche (18–26 m²/Sp.)',
    decisionWindow: '1,3 – 1,6 Sek.',
    physiologicalProfile: 'Gemischt-aerob, Schutz der Wachstumsfugen im Wachstumsschub (2,5:1)',
    summaryFocus:
      'Übertragung der Rondo-Geometrie auf das Großfeld (11v11): Bogenpressing mit Deckungsschatten (Cover Shadow), diagonale Tiefenstaffelung, Spiel über den Sechser (#6) und Prinzip „Dritter Mann“ (Steil-Klatsch).',
  },
  {
    id: 'u16',
    shortLabel: 'U15-16',
    label: 'U15-16 (15–16 J.)',
    ageYears: '15–16 Jahre',
    stageTitle: 'Leistungstraining: Handlungsschnelligkeit & Spezialisierung',
    relativeAreaRule: '100 % Referenzwert (16–24 m²/Sp.)',
    decisionWindow: '1,0 – 1,3 Sek.',
    physiologicalProfile: 'Fußballspezifische Ausdauer 85–90 % HFmax (3:1 – 4:1)',
    summaryFocus:
      'Referenzstandard des Moduls: 1–2 Kontakte, 2 Schulterblicke vor der Annahme, Direktspiel (1 Kontakt) des Sechsers unter Druck, Pressingfallen im Eck und 3-Sekunden-Gegenpressing.',
  },
  {
    id: 'u18_pro',
    shortLabel: 'U17+',
    label: 'U17+ / Pro',
    ageYears: '17+ J. / Herren & Profis',
    stageTitle: 'Hochleistungstraining & Erwachsenenfußball (Maximaler Raum-/Zeitdruck)',
    relativeAreaRule: '-10–18 % Fläche (11–19 m²/Sp.)',
    decisionWindow: '0,6 – 1,0 Sek.',
    physiologicalProfile: 'Anaerob-glykolytische Leistung 88–94 % HFmax (4:1 – 5:1)',
    summaryFocus:
      'Extremer Raum- und Zeitdruck: Strikt 1–2 Kontakte (Zentrumsspieler 1 Kontakt), verdeckte Pässe ohne Ausholbewegung, „Pass als Botschaft“ auf den Zielfuß und nahtlose Umschaltphasen.',
  },
];

export const RONDO_METHODOLOGY_DE: Record<string, RondoMethodologicalBasis> = {
  'rondo-1': {
    originSchool:
      'FC Barcelona (La Masia) • Laureano Ruiz (1972) & Johan Cruyff (1988) — das klassische „4-Seiten-Quadrat“ zur Automatisierung der Dreiecksbildung und des synchronen Freilaufens auf die offene Linie.',
    scientificBasis:
      'Eine relative Fläche pro Spieler (ApP) von 20,3 m²/Sp. (9×9 m Basis) bzw. 16,0 m²/Sp. (8×8 m) erzwingt ein Entscheidungsfenster von 1,2–1,5 Sek. Da 3 Angreifer 4 Seiten bespielen, verlangt die Geometrie im Moment der Ballabgabe einen 4–6 m langen Antritt (Schulterblick-Frequenz ≥ 0,8/Sek.) und schult alaktazide Antrittskraft sowie exzentrisches Abbremsen.',
    matchTransfer:
      'Auflösen von 1-gegen-1-Pressing im Flügeldreieck: Außenverteidiger (#2/#3) — Sechser/Achter (#6/#8) — Flügelstürmer (#7/#11) an der Seitenlinie.',
  },
  'rondo-2': {
    originSchool:
      'Positionsspiel-Schule von Joan Vilà & Xavi Hernández (FC Barcelona) — Prinzip „Atraer para dividir“ (Gegner durch kurze Pässe anlocken, um die Pressinglinie per Schnittstellenpass zu durchbrechen).',
    scientificBasis:
      'Bei einer Dichte von 17,3 m²/Sp. (11×11 m) bzw. 14,3 m²/Sp. (10×10 m) decken zwei gestaffelte Verteidiger 65 % der Feldbreite ab. Kurze Lockpässe zwingen sie jedoch zur Annäherung, wodurch sich für 0,7–0,9 Sek. ein zentrales Schnittstellenfenster von 2,5–3,5 m öffnet. Trainiert periphere Wahrnehmung und verdeckte Pässe.',
    matchTransfer:
      'Spieleröffnung der beiden Innenverteidiger (#4 & #5) und Außenverteidiger gegen ein Zweier-Stürmerpressing (4-4-2 / 4-2-3-1) mit vertikalem Schnittstellenpass auf den Achter/Zehner (#8/#10) zwischen den Linien.',
  },
  'rondo-3': {
    originSchool:
      'Pep Guardiola & Sergio Busquets (FC Barcelona / Manchester City) — strukturelles Rondo zur Einbindung des zentralen Sechsers (#6) im Rücken der ersten Pressinglinie.',
    scientificBasis:
      'ApP von 22,5 m²/Sp. (15×15 m) bzw. 16,9 m²/Sp. (13×13 m). Der zentrale Sechser (#6) agiert im 360°-Raum: Untersuchungen von Jordet et al. zeigen, dass Zentrumsspieler mit ≥ 0,65 Schulterblicken/Sek. vor Ballannahme eine um 28 % höhere Erfolgsquote bei vorwärtsgerichteten Pässen erzielen. Hohe kardiovaskuläre Last für das Pressingtrio (86–92 % HFmax).',
    matchTransfer:
      'Spielaufbau aus der ersten in die zweite Zone über den alleinigen Sechser (#6) gegen ein 3-Mann-Angriffspressing (4-3-3) und anschließende Spielverlagerung auf den ballfernen Außenverteidiger.',
  },
  'rondo-4': {
    originSchool:
      'Paco Seirul·lo & Pep Guardiola (FC Barcelona) — zonales Positionsspiel zur diagonalen Tiefenstaffelung (Asymmetrie) von Sechser (#6) und Achter (#8) in den Halbräumen.',
    scientificBasis:
      'ApP von 25,1 m²/Sp. (22×16 m) bzw. 20,0 m²/Sp. (20×14 m). Die Zweiteilung des Feldes bildet den realen Abstand zwischen erster und zweiter Pressinglinie im 11-gegen-11 ab (10–12 m Tiefe) und zwingt #6 und #8, ihre Höhen gegenläufig anzupassen, um vertikale Passkorridore zu öffnen.',
    matchTransfer:
      'Überspielen eines kompakten 4-4-2-Mittelfeldblocks durch das Zusammenspiel von Innenverteidigern (#4/#5), abkippendem Sechser (#6), hohem Achter (#8) im Halbraum und Neuner (#9).',
  },
  'rondo-5': {
    originSchool:
      'Pep Guardiola (FC Bayern / Manchester City) & Roberto De Zerbi — Konzept „Überladen, um zu isolieren“ (Overload to Isolate): Gegner auf einer Ballseite binden, um die ballferne Zone freizuspielen.',
    scientificBasis:
      'Im aktiven 12×12 m Feld herrscht mit 9 Spielern eine hohe Dichte (ApP = 16,0 m²/Sp., Intensiv 13,4 m²/Sp.), während das Nachbarfeld komplett frei ist. Nach 4–5 schnellen Pässen kollabiert das Verteidigertrio auf ~60 m² und öffnet den 12–16 m langen Verlagerungspass in den offenen Raum. Für die Abwehr entstehen wiederholte 12–15 m Sprints (RSA — Repeated Sprint Ability).',
    matchTransfer:
      'Kombinationsspiel im engen Flügel-/Halbraumkorridor, um das gegnerische Mittelfeld herüberzuziehen, gefolgt von einer scharfen Flachverlagerung auf den einrückenden ballfernen Außenverteidiger oder Flügelstürmer.',
  },
  'rondo-6': {
    originSchool:
      'Paco Seirul·lo (FC Barcelona) & Louis van Gaal (Ajax) — das klassische Positionsspiel („Juego de Posición“ 4v4+3 Neutrale) als direkte Brücke zwischen Rondo und dem 11-gegen-11-Spiel.',
    scientificBasis:
      'Die großzügige Fläche von 34,9 m²/Sp. (24×16 m) bzw. 28,0 m²/Sp. (22×14 m) entspricht der realen Spielerdichte im mittleren Drittel eines 11-gegen-11-Spiels. Bei 4-minütigen Durchgängen wird die spezifische aerobe-anaerobe Schwelle (85–89 % HFmax) trainiert, während nach Ballverlust innerhalb von 1,5 Sek. von maximaler Breite auf maximale Kompaktheit umgeschaltet werden muss.',
    matchTransfer:
      'Kontrollierter Spielaufbau im 4-3-3: Innenverteidiger (N1) → Außenverteidiger und Achter auf den Halbpositionen + Sechser (#6) im Zentrum → Durchbruch auf den Neuner (N2).',
  },
  'rondo-7': {
    originSchool:
      'Diego Simeone (Atlético Madrid), Jürgen Klopp & Ralf Rangnick — kollektive Pressingfalle an der Seitenlinie/Ecke durch synchrones Bogenpressing.',
    scientificBasis:
      'Bei ApP = 21,8 m²/Sp. (14×14 m) reduziert der Pass in eine 90°-Feldecke den möglichen Abspielwinkel des Ballführenden von 180° auf 90°. Läuft D1 im Bogen an und nehmen D2/D3 die Nachbarlinien auf, sinkt das Zeitfenster des Angreifers auf < 0,8 Sek. Das Pressingtrio absolviert hochintensive Richtungswechsel und Abbremsbewegungen (2–3 m/s²).',
    matchTransfer:
      'Gezieltes Lenken des gegnerischen Aufbauspiels auf den Außenverteidiger an der Seitenlinie (Pressing-Auslöser: Querpass nach außen) und gemeinsames Zuschnappen der Falle durch Flügelstürmer, Achter und eigenen Außenverteidiger.',
  },
  'rondo-8': {
    originSchool:
      'Maurizio Sarri (SSC Neapel), Roberto De Zerbi & Marcelo Bielsa — konzentrisches Rondo zur Automatisierung des „Dritten Mannes“ (Steil-Klatsch / A → B → C) um den Deckungsschatten herum.',
    scientificBasis:
      'ApP von 23,3 m²/Sp. (16×16 m) bzw. 17,8 m²/Sp. (14×14 m). Da der Verteidiger den direkten Weg A → C mit seinem Deckungsschatten zustellt, ist C für A unsichtbar, hat aber freie Sicht auf B. Die 1-Kontakt-Ablage von B auf C dauert nur 0,3–0,4 Sek. — schneller als die Rotationszeit des Verteidigers (0,6–0,8 Sek. für eine 120°-Drehung).',
    matchTransfer:
      'Überspielen einer Mannorientierung im Mittelfeld: Innenverteidiger (A) spielt steil auf den entgegenkommenden Stürmer oder Flügel (B), der mit 1 Kontakt auf den einstartenden Sechser/Achter (C) klatschen lässt.',
  },
  'rondo-9': {
    originSchool:
      'Ralf Rangnick, Jürgen Klopp (FC Liverpool) & Pep Guardiola — die „3-Sekunden-Regel“ des kollektiven Gegenpressings unmittelbar nach Ballverlust.',
    scientificBasis:
      'Im 10×10 m Innenquadrat herrscht eine extreme Dichte von 16,7 m²/Sp. (Intensiv 9×9 m = 13,5 m²/Sp.). Im Moment des Ballverlusts sind alle 4 Angreifer nur 3–5 m vom Ball entfernt. Schalten sie in unter 0,5 Sek. um, schließen sie in 1,2–1,5 Sek. den 360°-Raum um den Ballgewinner. Trainiert maximale neuromuskuläre Reaktionsschnelligkeit und anaerob-alaktazide Power.',
    matchTransfer:
      'Sofortiges Schwarm-Gegenpressing im Angriffsdrittel nach einem abgefangenen Pass, um den ersten Konterpass auf die gegnerischen Flügel oder den Sechser im Keim zu ersticken.',
  },
  'rondo-10': {
    originSchool:
      'Thomas Tuchel, Luis Enrique & Julian Nagelsmann — Umschaltprinzip „1. Pass raus aus der Druckzone“ (Escape the Pressure Zone) nach Ballgewinn.',
    scientificBasis:
      'In der Ballgewinnzone (14×14 m mit 8 Spielern, ApP = 24,5 m²/Sp., Intensiv 18,0 m²/Sp.) herrscht sofortiger Gegenpressing-Druck, während im Nachbarfeld 2 Zielspieler auf 196 m² völlig frei warten. Spielanalysen der UEFA zeigen, dass Konter, deren 1. oder 2. Pass die Ballgewinnzone verlässt, zu 64 % häufiger in einer geordneten Offensivaktion münden.',
    matchTransfer:
      'Nach Balleroberung im eigenen Abwehr-/Mittelfelddrittel nicht im engen Getümmel dribbeln, sondern sofort per Diagonalpass auf den ballfernen Zehner/Flügel eröffnen und geschlossen nachrücken.',
  },
};

export const RONDO_AGE_MATRIX_DE: Record<string, Record<AgeBandId, RondoAgeVariant>> = {
  'rondo-1': {
    u10: {
      baseGrid: '10 × 10 m (25,0 m²/Sp.)',
      intensiveGrid: '9 × 9 m (20,3 m²/Sp.)',
      touchesRule: 'Frei / 3 Kontakte',
      timing: '4 Sätze × 1 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'Bis zu 3 Kontakte erlauben. Hauptkommando für Kinder: „Versteck dich nicht hinter dem Verteidiger — lauf sofort zur Seite mit dem freien Hütchen!“. Verteidigerwechsel alle 45–60 Sek.',
    },
    u12: {
      baseGrid: '10 × 10 m (25,0 m²/Sp.)',
      intensiveGrid: '8,5 × 8,5 m (18,1 m²/Sp.)',
      touchesRule: '2–3 Kontakte',
      timing: '4 Sätze × 1,5 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'Fokus auf Ballannahme mit dem ballfernen Fuß in offener Stellung (kein Stoppen mit der Sohle!). Der Lauf auf die freie Linie startet, noch während der Pass rollt.',
    },
    u14: {
      baseGrid: '9,5 × 9,5 m (22,6 m²/Sp.)',
      intensiveGrid: '8,5 × 8,5 m (18,1 m²/Sp.)',
      touchesRule: 'Pflicht: 2 Kontakte',
      timing: '4 Sätze × 1,5 Min. | Pause: 40 Sek.',
      ageCoachingFocus:
        'Der Verteidiger lernt den Bogenlauf, um einen Passweg mit dem Deckungsschatten zu schließen. Angriff strikt mit 2 Kontakten (Annahme ferner Fuß + Pass).',
    },
    u16: {
      baseGrid: '9 × 9 m (20,3 m²/Sp.)',
      intensiveGrid: '8 × 8 m (16,0 m²/Sp.)',
      touchesRule: '1–2 Kontakte (≤ 1,5 Sek.)',
      timing: '4 Sätze × 1,5 Min. | Pause: 30 Sek.',
      ageCoachingFocus:
        'Ab Stufe 2 Rückpass zum Passgeber verboten; synchroner Antritt auf die freie Linie im Moment des Abspiels, 2 Schulterblicke vor der Annahme.',
    },
    u18_pro: {
      baseGrid: '8 × 8 m (16,0 m²/Sp.)',
      intensiveGrid: '7 × 7 m (12,3 m²/Sp.)',
      touchesRule: 'Strikt 1–2 Kontakte (< 1,0 Sek.)',
      timing: '4 Sätze × 2 Min. | Pause: 30 Sek.',
      ageCoachingFocus:
        'Maximale Passschärfe, Rückpass verboten, Direktspiel (1 Kontakt) bei Gegnerdruck unter 2 m. Jeder über Kniehöhe gespielte Ball zählt als Ballverlust.',
    },
  },
  'rondo-2': {
    u10: {
      formatOverride: '5v2 (oder 4v1 für Einsteiger)',
      baseGrid: '13 × 13 m (24,1 m²/Sp.)',
      intensiveGrid: '12 × 12 m (20,6 m²/Sp.)',
      touchesRule: 'Frei / 3 Kontakte',
      timing: '4 Sätze × 1,5 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        '1 Punkt für 6 Pässe ODER 2 Bonuspunkte für den „Mut-Pass“ durch die Schnittstelle zwischen beiden Verteidigern. Jeden mutigen Versuch loben!',
    },
    u12: {
      baseGrid: '12 × 12 m (20,6 m²/Sp.)',
      intensiveGrid: '11 × 11 m (17,3 m²/Sp.)',
      touchesRule: '2–3 Kontakte',
      timing: '4 Sätze × 1,5 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'Der ballferne Spieler lernt, sich auf seiner Linie ständig im offenen „Fenster“ zwischen beiden Verteidigern anzubieten. Verteidiger jagen nicht zu zweit denselben Ball.',
    },
    u14: {
      baseGrid: '11,5 × 11,5 m (18,9 m²/Sp.)',
      intensiveGrid: '10,5 × 10,5 m (15,8 m²/Sp.)',
      touchesRule: '2 Kontakte',
      timing: '4 Sätze × 2 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'Diagonale Tiefenstaffelung der beiden Verteidiger (Einer stellt den Ball, der Zweite sichert die Schnittstelle). Angreifer locken mit Kurzpässen.',
    },
    u16: {
      baseGrid: '11 × 11 m (17,3 m²/Sp.)',
      intensiveGrid: '10 × 10 m (14,3 m²/Sp.)',
      touchesRule: '1–2 Kontakte (Intensiv: 1 K.)',
      timing: '4 Sätze × 2 Min. | Pause: 40 Sek.',
      ageCoachingFocus:
        'Punkte zählen NUR für Schnittstellenpässe; der Pass unmittelbar nach einem Schnittstellenpass muss direkt (1 Kontakt) gespielt werden.',
    },
    u18_pro: {
      baseGrid: '10 × 10 m (14,3 m²/Sp.)',
      intensiveGrid: '9 × 9 m (11,6 m²/Sp.)',
      touchesRule: 'Strikt 1 Kontakt (Direktspiel)',
      timing: '4 Sätze × 2,5 Min. | Pause: 35 Sek.',
      ageCoachingFocus:
        'Klassisches Profi-5v2 im Direktspiel mit höchstem Balltempo. Verdeckte Schnittstellenpässe ohne vorhersehbare Blick- oder Hüftorientierung.',
    },
  },
  'rondo-3': {
    u10: {
      formatOverride: '5+1 gegen 2 (U10-Anpassung)',
      baseGrid: '14 × 14 m (24,5 m²/Sp.)',
      intensiveGrid: '13 × 13 m (21,1 m²/Sp.)',
      touchesRule: '2–3 Kontakte',
      timing: '4 Sätze × 1,5 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        'U10-Anpassung: Reduzierung auf 2 Verteidiger (5 außen + 1 Zentrumsspieler gegen 2), damit der Sechser im Zentrum Zeit hat, den Ball anzunehmen, aufzudrehen und weiterzuleiten!',
    },
    u12: {
      baseGrid: '17 × 17 m (28,9 m²/Sp.)',
      intensiveGrid: '15 × 15 m (22,5 m²/Sp.)',
      touchesRule: '2–3 Kontakte (#6 mit 2 K.)',
      timing: '4 Sätze × 2 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        'Einführung der Sechser-Rolle (#6) im 7v3 in einem großen 17×17 m Feld. Wichtigste Gewohnheit für #6: immer seitlich (halb-offen) stehen, um beide Hälften zu sehen.',
    },
    u14: {
      baseGrid: '16 × 16 m (25,6 m²/Sp.)',
      intensiveGrid: '14 × 14 m (19,6 m²/Sp.)',
      touchesRule: '2 Kontakte',
      timing: '4 Sätze × 2 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'Sechser #6 lernt, sich mit zwei schnellen Seitwärtsschritten aus dem Deckungsschatten des zentralen Verteidigers zu lösen. Abwehr bildet ein kompaktes Pressingdreieck.',
    },
    u16: {
      baseGrid: '15 × 15 m (22,5 m²/Sp.)',
      intensiveGrid: '13 × 13 m (16,9 m²/Sp.)',
      touchesRule: 'Außen 2 K., #6 mit 1–2 K.',
      timing: '4 Sätze × 2,5 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'Punkte zählen nur über (#6) auf eine neue Linie; in Stufe 3 spielt der Sechser (#6) strikt mit 1 Kontakt nach doppeltem Schulterblick.',
    },
    u18_pro: {
      baseGrid: '13,5 × 13,5 m (18,2 m²/Sp.)',
      intensiveGrid: '12 × 12 m (14,4 m²/Sp.)',
      touchesRule: 'Alle 1–2 K., #6 strikt 1 Kontakt',
      timing: '4 Sätze × 3 Min. | Pause: 40 Sek.',
      ageCoachingFocus:
        'Aggressives Pressingdreieck mit 5–6 Pässen Limit bis zur Balleroberung. Sechser #6 muss unter engem Gegnerdruck im Rücken mit 1 Kontakt weiterleiten.',
    },
  },
  'rondo-4': {
    u10: {
      formatOverride: '4+2ZM gegen 2 (8 Spieler, 7v7-Modell)',
      baseGrid: '18 × 12 m (27,0 m²/Sp.)',
      intensiveGrid: '16 × 12 m (24,0 m²/Sp.)',
      touchesRule: 'Frei / 3 Kontakte',
      timing: '3 Sätze × 2 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        'U10-Anpassung (7v7): 8 statt 14 Spieler! 4 Außenspieler + 2 Zentrumsspieler (einer pro Hälfte) gegen 2 Verteidiger (1 pro Zone). Spielerisch von Linie zu Linie durchs Zentrum kombinieren.',
    },
    u12: {
      formatOverride: '6+2ZM gegen 3 (11 Spieler, 9v9-Modell)',
      baseGrid: '22 × 15 m (30,0 m²/Sp.)',
      intensiveGrid: '20 × 14 m (25,5 m²/Sp.)',
      touchesRule: '2–3 Kontakte',
      timing: '3 Sätze × 2,5 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        '9v9-Anpassung: Die beiden Zentrumsspieler (#6 & #8) lernen die Grundregel — „niemals hintereinander auf einer Schiene stehen“ (einer kippt links ab, der andere schiebt rechts hoch).',
    },
    u14: {
      baseGrid: '24 × 17 m (29,1 m²/Sp.)',
      intensiveGrid: '22 × 16 m (25,1 m²/Sp.)',
      touchesRule: '2 Kontakte',
      timing: '3 Sätze × 3 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        'Volles Format 8v4+2. Verteidiger arbeiten als 2+2-Zonenpaare. Fokus auf die diagonale Aufbaukette „IV → Außen → #6 → #8 → Stürmer“.',
    },
    u16: {
      baseGrid: '22 × 16 m (25,1 m²/Sp.)',
      intensiveGrid: '20 × 14 m (20,0 m²/Sp.)',
      touchesRule: '2 Kontakte (ZM 1–2 K.)',
      timing: '3 Sätze × 3 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        'Ein Verteidiger aus Zone 1 darf über die Mittellinie vorrücken (3v1-Überzahl im Zentrum); #6 und #8 müssen ihre Höhen dynamisch gegenläufig anpassen.',
    },
    u18_pro: {
      baseGrid: '20 × 14 m (20,0 m²/Sp.)',
      intensiveGrid: '18 × 13 m (16,7 m²/Sp.)',
      touchesRule: '1–2 Kontakte (#6 & #8 mit 1 K.)',
      timing: '3 Sätze × 3,5 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'Freies 4-Mann-Pressing über beide Zonen + 4 Minitore für den sofortigen Gegenstoß bei Ballgewinn. Einstieg auf #8 über Steil-Klatsch (Dritter Mann).',
    },
  },
  'rondo-5': {
    u10: {
      formatOverride: '4v2 über 2 Felder (6 Spieler)',
      baseGrid: '2 Felder à 12 × 12 m (24,0 m²/Sp.)',
      intensiveGrid: '2 Felder à 11 × 11 m (20,2 m²/Sp.)',
      touchesRule: 'Frei / 3 Kontakte',
      timing: '4 Sätze × 1,5 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        'U10-Anpassung: 4v2-Format (nach 3 Pässen sprintet einer der 4 Angreifer in das freie Nachbarfeld, um dort den Verlagerungspass zu empfangen).',
    },
    u12: {
      baseGrid: '2 Felder à 13 × 13 m (18,8 m²/Sp.)',
      intensiveGrid: '2 Felder à 12 × 12 m (16,0 m²/Sp.)',
      touchesRule: '2–3 Kontakte',
      timing: '4 Sätze × 2 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        'Regel: „Beim 3. Pass Blick ins Nachbarfeld!“. Der ballferne Spieler lernt, sich frühzeitig vor dem Verlagerungspass in die freie Zone abzusetzen.',
    },
    u14: {
      baseGrid: '2 Felder à 13 × 13 m (18,8 m²/Sp.)',
      intensiveGrid: '2 Felder à 12 × 12 m (16,0 m²/Sp.)',
      touchesRule: '2 Kontakte',
      timing: '4 Sätze × 2 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'Format 6v3, Verlagerung nach 4 Pässen. Verteidiger lernen, die interne Mittellinie zuzustellen, um den Gegner im ersten Feld einzuschnüren.',
    },
    u16: {
      baseGrid: '2 Felder à 12 × 12 m (16,0 m²/Sp.)',
      intensiveGrid: '2 Felder à 11 × 11 m + 2 m Korridor',
      touchesRule: '1–2 Kontakte',
      timing: '4 Sätze × 2,5 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'Alle 3 Verteidiger durch 4–5 schnelle Pässe (inklusive Zentrumskontakt) zusammenziehen und dann scharf und flach ins zweite Feld verlagern.',
    },
    u18_pro: {
      baseGrid: '2 Felder à 11 × 11 m (13,4 m²/Sp.)',
      intensiveGrid: '2 Felder à 10 × 10 m + 3 m Korridor',
      touchesRule: '1–2 Kontakte (Verlagerung mit 1. K.)',
      timing: '4 Sätze × 3 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'Zwei frische Verteidiger sprinten ins neue Feld + 1 schiebt nach, während der 4. im 3 m Mittelkorridor lauert, um Rückverlagerungen sofort abzufangen.',
    },
  },
  'rondo-6': {
    u10: {
      formatOverride: '3v3 + 2 Wandspieler (8 Spieler)',
      baseGrid: '20 × 14 m (35,0 m²/Sp.)',
      intensiveGrid: '18 × 12 m (27,0 m²/Sp.)',
      touchesRule: 'Frei / 3 Kontakte',
      timing: '3 Sätze × 2,5 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        'U10-Anpassung: 3v3 + 2 Wandspieler außen (oder +3N). Goldene Regel: „Haltet eure Raute groß — lauft nicht alle zusammen in dieselbe Hälfte zum Ball!“.',
    },
    u12: {
      baseGrid: '24 × 16 m (34,9 m²/Sp.)',
      intensiveGrid: '22 × 15 m (30,0 m²/Sp.)',
      touchesRule: '2–3 Kontakte',
      timing: '3 Sätze × 3 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        'Disziplin der Raumaufteilung: Je 2 Mitspieler bleiben in ihrer Feldhälfte und spielen den Ball über den zentralen Sechser (#6) von Wandspieler zu Wandspieler.',
    },
    u14: {
      baseGrid: '25 × 17 m (38,6 m²/Sp.)',
      intensiveGrid: '23 × 15 m (31,4 m²/Sp.)',
      touchesRule: '2 Kontakte (Neutrale 1–2 K.)',
      timing: '3 Sätze × 3,5 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        'Sofortiger Rollenwechsel bei Ballverlust: Das Team nach Ballverlust verdichtet in unter 2 Sek. das Zentrum; das ballerobernde Team schafft sofort maximale Breite.',
    },
    u16: {
      baseGrid: '24 × 16 m (34,9 m²/Sp.)',
      intensiveGrid: '22 × 14 m (28,0 m²/Sp.)',
      touchesRule: '2 Kontakte (3 Neutrale mit 1 K.)',
      timing: '3 Sätze × 4 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        'Abschluss-Positionsspiel: Punkte addieren sich für Pässe über (#6), Dritter-Mann-Kombinationen, Zonenverlagerungen und Gegenpressing-Ballgewinne in 3 Sek.',
    },
    u18_pro: {
      baseGrid: '22 × 14 m (28,0 m²/Sp.)',
      intensiveGrid: '20 × 13 m (23,6 m²/Sp.)',
      touchesRule: '1–2 Kontakte (Neutrale strikt 1 K.)',
      timing: '4 Sätze × 4 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        'Hochintensives Positionsspiel nach La-Masia-/Guardiola-Standard: Alle Neutralen strikt mit 1 Kontakt, direkter Rückpass zum selben Neutralen verboten.',
    },
  },
  'rondo-7': {
    u10: {
      formatOverride: '4v2 mit Eck-„Mausefallen“',
      baseGrid: '12 × 12 m (24,0 m²/Sp.)',
      intensiveGrid: '11 × 11 m (20,2 m²/Sp.)',
      touchesRule: '2–3 Kontakte',
      timing: '4 Sätze × 1 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'U10-Anpassung: 4v2 mit bunten 2×2 m großen „Mausefallen“ in den Ecken. Die 2 Verteidiger erhalten 2 Bonuspunkte, wenn sie den Gegner ins Eck lenken und dort den Ball erobern!',
    },
    u12: {
      baseGrid: '15 × 15 m (25,0 m²/Sp.)',
      intensiveGrid: '14 × 14 m (21,8 m²/Sp.)',
      touchesRule: '2–3 Kontakte',
      timing: '4 Sätze × 1,5 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'Der erste Verteidiger lernt den Bogenlauf („Bananenlauf“), um den Rückpass abzuschneiden, während sein Partner die nächste Linie zustellt.',
    },
    u14: {
      baseGrid: '14,5 × 14,5 m (23,4 m²/Sp.)',
      intensiveGrid: '13,5 × 13,5 m (20,3 m²/Sp.)',
      touchesRule: '2 Kontakte',
      timing: '4 Sätze × 2 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'Pressing-Auslöser erkennen: Sobald der Ball Richtung Ecke oder auf den schwachen Fuß rollt, schnappt das gesamte Verteidigertrio synchron zu.',
    },
    u16: {
      baseGrid: '14 × 14 m (21,8 m²/Sp.)',
      intensiveGrid: '13 × 13 m (18,8 m²/Sp.)',
      touchesRule: '2 Kontakte',
      timing: '4 Sätze × 2 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        '6-Pässe-Limit für das Verteidigertrio bis zum Ballgewinn; nach Eroberung in der Eckfalle müssen die Verteidiger 1 sicheren Pass untereinander spielen.',
    },
    u18_pro: {
      baseGrid: '13 × 13 m (18,8 m²/Sp.)',
      intensiveGrid: '12 × 12 m (16,0 m²/Sp.)',
      touchesRule: '1–2 Kontakte',
      timing: '4 Sätze × 2,5 Min. | Pause: 40 Sek.',
      ageCoachingFocus:
        'Maximale Pressing-Aggressivität (5-Pässe-Limit für die Abwehr), während sich der Angriff nur über Direktspiel-Dreiecke oder scharfe Diagonalverlagerung befreien kann.',
    },
  },
  'rondo-8': {
    u10: {
      formatOverride: '4+1 (im zentralen „Häuschen“) gegen 2',
      baseGrid: '14 × 14 m (Innen 4 × 4 m, 28,0 m²/Sp.)',
      intensiveGrid: '13 × 13 m (Innen 4 × 4 m)',
      touchesRule: '2–3 Kontakte',
      timing: '4 Sätze × 1,5 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        'U10-Anpassung: 4 Außenspieler + 1 im 4×4 m „Häuschen“ gegen 2 Verteidiger. Grundmuster lernen: „Pass ins Häuschen — klatschen lassen auf den freien Freund!“.',
    },
    u12: {
      baseGrid: '17 × 17 m (Innen 5 × 5 m, 26,3 m²/Sp.)',
      intensiveGrid: '16 × 16 m (Innen 5 × 5 m)',
      touchesRule: 'Außen 2–3 K., Ablage 1–2 K.',
      timing: '4 Sätze × 2 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'Der Spieler im Innenquadrat agiert als „Spiegel“ — er lässt den Ball mit 1–2 Kontakten direkt zu dem dritten Mitspieler klatschen, dem er zugewandt ist.',
    },
    u14: {
      baseGrid: '16,5 × 16,5 m (Innen 5 × 5 m, 24,8 m²/Sp.)',
      intensiveGrid: '15 × 15 m (Innen 4,5 × 4,5 m)',
      touchesRule: '2 Kontakte (Ablage mit 1 K.)',
      timing: '4 Sätze × 2 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'Beide Varianten beherrschen: Zentrumsspieler als „Zweiter Mann“ (lässt nach außen klatschen) und als „Dritter Mann“ (erhält die Direktablage vom Flügel).',
    },
    u16: {
      baseGrid: '16 × 16 m (Innen 5 × 5 m, 23,3 m²/Sp.)',
      intensiveGrid: '14 × 14 m (Innen 4 × 4 m, 17,8 m²/Sp.)',
      touchesRule: 'Außen 1–2 K., 2. Mann 1 Kontakt',
      timing: '4 Sätze × 2,5 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'Punkte zählen NUR für „A → B (1 Kontakt) → C“. Prinzip „Pass als Botschaft“: Pass auf den linken Fuß von B signalisiert die Direktablage nach links.',
    },
    u18_pro: {
      baseGrid: '14 × 14 m (Innen 4 × 4 m, 17,8 m²/Sp.)',
      intensiveGrid: '13 × 13 m (Innen 3,5 × 3,5 m, 15,4 m²/Sp.)',
      touchesRule: 'Strikt 1 Kontakt beim Ein- & Ausstieg',
      timing: '4 Sätze × 3 Min. | Pause: 40 Sek.',
      ageCoachingFocus:
        'Hochdichtes De-Zerbi-/Sarri-Regime: Jedes Anspiel ins Innenquadrat und jede Ablage heraus muss mit 1 Kontakt und fließendem Positionswechsel erfolgen.',
    },
  },
  'rondo-9': {
    u10: {
      baseGrid: 'Innen 12 × 12 m (24,0 m²/Sp.) in 24 × 24 m',
      intensiveGrid: 'Innen 11 × 11 m in 22 × 22 m',
      touchesRule: 'Frei / 3 Kontakte',
      timing: '4 Sätze × 1 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        '„5-Sekunden-Balljagd“: Erobern die 2 Blauen den Ball, müssen alle 4 Roten sie sofort einkreisen, bevor sie den Pass zu ihren Freunden am großen Viereck schaffen!',
    },
    u12: {
      baseGrid: 'Innen 11 × 11 m (20,2 m²/Sp.) in 23 × 23 m',
      intensiveGrid: 'Innen 10 × 10 m in 21 × 21 m',
      touchesRule: '2–3 Kontakte',
      timing: '4 Sätze × 1,5 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'Automatischer Umschaltreflex bei Ballverlust (4-Sekunden-Regel): Kein Stehenbleiben, kein Kopf-Hängenlassen nach einem Fehlpass.',
    },
    u14: {
      baseGrid: 'Innen 10,5 × 10,5 m (18,4 m²/Sp.) in 22 × 22 m',
      intensiveGrid: 'Innen 9,5 × 9,5 m in 20 × 20 m',
      touchesRule: '2 Kontakte',
      timing: '4 Sätze × 2 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'Aufgabenverteilung im Gegenpressing: Der Ballnächste stellt sofort den Ballgewinner, die anderen drei schließen die Passwege nach außen.',
    },
    u16: {
      baseGrid: 'Innen 10 × 10 m (16,7 m²/Sp.) in 22 × 22 m',
      intensiveGrid: 'Innen 9 × 9 m (13,5 m²/Sp.) in 20 × 20 m',
      touchesRule: '1–2 Kontakte',
      timing: '4 Sätze × 2 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'Strikte 3-Sekunden-Regel (+2 Pkt. bei Rückeroberung). Spielt Blau nach außen, geht das Spiel nahtlos als 6-gegen-4 im großen 22×22 m Feld weiter.',
    },
    u18_pro: {
      baseGrid: 'Innen 9 × 9 m (13,5 m²/Sp.) in 20 × 20 m',
      intensiveGrid: 'Innen 8 × 8 m (10,7 m²/Sp.) in 18 × 18 m',
      touchesRule: '1–2 Kontakte (Ausstieg mit 1 K.)',
      timing: '4 Sätze × 2,5 Min. | Pause: 40 Sek.',
      ageCoachingFocus:
        'Permanente Doppel-Transition (4v2 innen ↔ 6v4 außen ↔ sofortiges Gegenpressing von Blau bei Ballverlust im großen Quadrat).',
    },
  },
  'rondo-10': {
    u10: {
      formatOverride: '4v2 → 4v2 (8 Spieler: 4 Rot gegen 4 Blau)',
      baseGrid: '2 Felder à 13 × 13 m (28,2 m²/Sp.)',
      intensiveGrid: '2 Felder à 12 × 12 m (24,0 m²/Sp.)',
      touchesRule: 'Frei / 3 Kontakte',
      timing: '4 Sätze × 1,5 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        'U10-Anpassung (8 Spieler): Im ersten Feld 4 gegen 2, während 2 Blaue im zweiten Feld warten. Ball erobert — sofort rüberpassen zu den freien Freunden!',
    },
    u12: {
      baseGrid: '2 Felder à 15 × 15 m (28,1 m²/Sp.)',
      intensiveGrid: '2 Felder à 14 × 14 m (24,5 m²/Sp.)',
      touchesRule: '2–3 Kontakte',
      timing: '4 Sätze × 2 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        'Nach Ballgewinn nicht im engen Getümmel dribbeln, sondern sofort den Kopf heben und die beiden freien Mitspieler in Zone 2 anspielen.',
    },
    u14: {
      baseGrid: '2 Felder à 14,5 × 14,5 m (26,3 m²/Sp.)',
      intensiveGrid: '2 Felder à 13 × 13 m (21,1 m²/Sp.)',
      touchesRule: '2 Kontakte',
      timing: '4 Sätze × 2 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        'Die wartenden Zielspieler in Zone 2 bewegen sich aktiv an der Mittellinie und zeigen sich in den Passfenstern zwischen den Gegenpressing-Spielern.',
    },
    u16: {
      baseGrid: '2 Felder à 14 × 14 m (24,5 m²/Sp.)',
      intensiveGrid: '2 Felder à 12 × 12 m (18,0 m²/Sp.)',
      touchesRule: '1–2 Kontakte',
      timing: '4 Sätze × 2,5 Min. | Pause: 1 Min.',
      ageCoachingFocus:
        'Befreiungspass in Zone 2 zwingend mit dem 1. oder 2. Pass nach Ballgewinn, gefolgt vom explosiven Nachrücken zum neuen 5-gegen-3.',
    },
    u18_pro: {
      baseGrid: '2 Felder à 12,5 × 12,5 m (19,5 m²/Sp.)',
      intensiveGrid: '2 Felder à 11 × 11 m (15,1 m²/Sp.)',
      touchesRule: '1–2 Kontakte (Ausstieg mit 1. Pass)',
      timing: '4 Sätze × 3 Min. | Pause: 45 Sek.',
      ageCoachingFocus:
        'Ausstieg aus der Druckzone ausschließlich mit dem 1. Pass (oder per Direktablage des Zielspielers auf den Dritten Mann) gegen 4 Sekunden Vollgas-Gegenpressing!',
    },
  },
};
