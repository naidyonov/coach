export type SquadSetupPattern =
  | {
      type: 'rondo_1_parallel_squares';
      playersCount: number;
      squares: number;
      rotatingDefenders: number;
    }
  | {
      type: 'rondo_2_dual_grids';
      playersCount: number;
    }
  | {
      type: 'rondo_2_single_with_neutrals';
      playersCount: number;
    }
  | {
      type: 'rondo_3_dual_grids';
      playersCount: number;
    }
  | {
      type: 'rondo_3_single_with_pressing_unit';
      playersCount: number;
      extraPressers: number;
    }
  | {
      type: 'standard_rotating_unit';
      playersCount: number;
    }
  | {
      type: 'activation_parallel_boxes';
      playersCount: number;
      boxes: number;
      playersPerBox: number;
    }
  | {
      type: 'activation_diamond_circuits';
      playersCount: number;
      circuits: number;
      playersPerCircuit: number;
    }
  | {
      type: 'activation_duel_stations';
      playersCount: number;
      stations: number;
      pairsCount: number;
    };

export const computeSquadSetup = (
  playersCount: number,
  rondoId: string
): SquadSetupPattern => {
  const safeCount = Math.max(4, Math.round(playersCount));

  if (rondoId === 'rondo-1') {
    return {
      type: 'rondo_1_parallel_squares',
      playersCount: safeCount,
      squares: Math.floor(safeCount / 4),
      rotatingDefenders: safeCount % 4,
    };
  }

  if (rondoId === 'rondo-2') {
    return safeCount >= 14
      ? { type: 'rondo_2_dual_grids', playersCount: safeCount }
      : { type: 'rondo_2_single_with_neutrals', playersCount: safeCount };
  }

  if (rondoId === 'rondo-3') {
    return safeCount >= 18
      ? { type: 'rondo_3_dual_grids', playersCount: safeCount }
      : {
          type: 'rondo_3_single_with_pressing_unit',
          playersCount: safeCount,
          extraPressers: Math.max(0, safeCount - 10),
        };
  }

  if (rondoId === 'act-7' || rondoId === 'act-8') {
    const circuits = safeCount >= 20 ? 2 : 1;
    return {
      type: 'activation_diamond_circuits',
      playersCount: safeCount,
      circuits,
      playersPerCircuit: Math.ceil(safeCount / circuits),
    };
  }

  if (rondoId === 'act-9' || rondoId === 'act-10') {
    const pairsCount = Math.floor(safeCount / 2);
    const stations = safeCount >= 20 ? 2 : 1;
    return {
      type: 'activation_duel_stations',
      playersCount: safeCount,
      stations,
      pairsCount,
    };
  }

  if (rondoId.startsWith('act-')) {
    const boxes = safeCount >= 20 ? 2 : 1;
    return {
      type: 'activation_parallel_boxes',
      playersCount: safeCount,
      boxes,
      playersPerBox: Math.ceil(safeCount / boxes),
    };
  }

  return {
    type: 'standard_rotating_unit',
    playersCount: safeCount,
  };
};

