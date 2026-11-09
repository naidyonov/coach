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

  return {
    type: 'standard_rotating_unit',
    playersCount: safeCount,
  };
};
