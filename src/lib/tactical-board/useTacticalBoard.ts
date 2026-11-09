import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  FreehandStroke,
  Point2D,
  TacticalBoardSnapshot,
  TacticalBoardToolMode,
  TacticalScene,
  TacticalVector,
} from './types';
import {
  clientToSvgPoint,
  detectHorizontalSwipe,
  interpolatePointCubicOut,
  resolveVectorEndpoints,
} from './geometry';

export interface UseTacticalBoardOptions {
  scene: TacticalScene;
  drillKey: string;
  phaseIndex: number;
  totalPhases: number;
  onPhaseChange?: (index: number) => void;
  initialToolMode?: TacticalBoardToolMode;
}

export const useTacticalBoard = ({
  scene,
  drillKey,
  phaseIndex,
  totalPhases,
  onPhaseChange,
  initialToolMode = 'move',
}: UseTacticalBoardOptions) => {
  // Interactive Playback & Ball Animation State
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<0.75 | 1 | 1.5>(1);
  const [passProgress, setPassProgress] = useState<number>(0);
  const [isPassAnimating, setIsPassAnimating] = useState(false);
  const [replayTrigger, setReplayTrigger] = useState(0);

  // Interactive Whiteboard & Drawing Engine State
  const [toolMode, setToolMode] = useState<TacticalBoardToolMode>(initialToolMode);
  const [customPositions, setCustomPositions] = useState<Record<string, Point2D>>({});
  const [customBallPos, setCustomBallPos] = useState<Point2D | null>(null);
  const [customVectors, setCustomVectors] = useState<TacticalVector[]>([]);
  const [freehandStrokes, setFreehandStrokes] = useState<FreehandStroke[]>([]);

  // Active interaction state
  const [draggingTokenId, setDraggingTokenId] = useState<string | null>(null);
  const [draftVector, setDraftVector] = useState<TacticalVector | null>(null);
  const [draftStroke, setDraftStroke] = useState<FreehandStroke | null>(null);

  // Undo / Redo History Stack
  const [undoStack, setUndoStack] = useState<TacticalBoardSnapshot[]>([]);
  const [redoStack, setRedoStack] = useState<TacticalBoardSnapshot[]>([]);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isInteractingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const safePhaseIndex = Math.max(0, Math.min(phaseIndex, Math.max(0, totalPhases - 1)));

  const passVectors = scene.vectors.filter((v) => v.type === 'pass');
  const primaryPass = passVectors.find((p) => p.primary) || passVectors[0] || null;
  const hasPrimaryPass = Boolean(primaryPass);

  const hasCustomPositions =
    Object.keys(customPositions).length > 0 ||
    customBallPos !== null ||
    customVectors.length > 0 ||
    freehandStrokes.length > 0;

  const createSnapshot = useCallback(
    (): TacticalBoardSnapshot => ({
      customPositions: { ...customPositions },
      customBallPos: customBallPos ? { ...customBallPos } : null,
      customVectors: [...customVectors],
      freehandStrokes: [...freehandStrokes],
    }),
    [customPositions, customBallPos, customVectors, freehandStrokes]
  );

  const pushUndoSnapshot = useCallback(() => {
    setUndoStack((prev) => [...prev.slice(-19), createSnapshot()]);
    setRedoStack([]);
  }, [createSnapshot]);

  // Reset custom dragged coordinates & drawings when drill or phase changes
  useEffect(() => {
    setCustomPositions({});
    setCustomBallPos(null);
    setCustomVectors([]);
    setFreehandStrokes([]);
    setDraggingTokenId(null);
    setDraftVector(null);
    setDraftStroke(null);
    setUndoStack([]);
    setRedoStack([]);
    isInteractingRef.current = false;
  }, [drillKey, safePhaseIndex]);

  // Stop auto-play when switching drills
  useEffect(() => {
    setIsPlaying(false);
    setIsPassAnimating(false);
    setPassProgress(0);
  }, [drillKey]);

  const clearAnimations = useCallback(() => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Run smooth ball trajectory animation along the primary pass vector
  useEffect(() => {
    clearAnimations();

    if (!isPlaying && replayTrigger === 0) {
      setIsPassAnimating(false);
      setPassProgress(0);
      return;
    }

    if (!hasPrimaryPass) {
      if (isPlaying && onPhaseChange && totalPhases > 0) {
        timeoutRef.current = window.setTimeout(() => {
          onPhaseChange((safePhaseIndex + 1) % totalPhases);
        }, 1600 / playbackSpeed);
      }
      return clearAnimations;
    }

    const settleDelay = isPlaying ? Math.round(320 / playbackSpeed) : 80;
    const duration = Math.round(900 / playbackSpeed);
    const holdDelay = Math.round(580 / playbackSpeed);

    setPassProgress(0);
    setIsPassAnimating(true);

    timeoutRef.current = window.setTimeout(() => {
      const startTime = Date.now();

      const step = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(1, elapsed / duration);
        setPassProgress(progress);

        if (progress < 1) {
          rafRef.current = window.requestAnimationFrame(step);
        } else {
          timeoutRef.current = window.setTimeout(() => {
            if (isPlaying && onPhaseChange && totalPhases > 0) {
              onPhaseChange((safePhaseIndex + 1) % totalPhases);
            } else {
              setIsPassAnimating(false);
              setPassProgress(0);
            }
          }, holdDelay);
        }
      };

      rafRef.current = window.requestAnimationFrame(step);
    }, settleDelay);

    return clearAnimations;
  }, [
    isPlaying,
    replayTrigger,
    drillKey,
    safePhaseIndex,
    playbackSpeed,
    hasPrimaryPass,
    onPhaseChange,
    totalPhases,
    clearAnimations,
  ]);

  const handleResetPositions = useCallback(() => {
    setCustomPositions({});
    setCustomBallPos(null);
    setCustomVectors([]);
    setFreehandStrokes([]);
    setDraggingTokenId(null);
    setDraftVector(null);
    setDraftStroke(null);
    setUndoStack([]);
    setRedoStack([]);
  }, []);

  const undo = useCallback(() => {
    setUndoStack((prevUndo) => {
      if (prevUndo.length === 0) return prevUndo;
      const previous = prevUndo[prevUndo.length - 1];
      setRedoStack((prevRedo) => [...prevRedo, createSnapshot()]);
      setCustomPositions(previous.customPositions);
      setCustomBallPos(previous.customBallPos);
      setCustomVectors(previous.customVectors);
      setFreehandStrokes(previous.freehandStrokes);
      return prevUndo.slice(0, -1);
    });
  }, [createSnapshot]);

  const redo = useCallback(() => {
    setRedoStack((prevRedo) => {
      if (prevRedo.length === 0) return prevRedo;
      const next = prevRedo[prevRedo.length - 1];
      setUndoStack((prevUndo) => [...prevUndo, createSnapshot()]);
      setCustomPositions(next.customPositions);
      setCustomBallPos(next.customBallPos);
      setCustomVectors(next.customVectors);
      setFreehandStrokes(next.freehandStrokes);
      return prevRedo.slice(0, -1);
    });
  }, [createSnapshot]);

  const handleReplayPass = useCallback(() => {
    setCustomBallPos(null);
    setReplayTrigger((prev) => prev + 1);
  }, []);

  const handleTokenPointerDown = useCallback(
    (tokenId: string, e: React.PointerEvent) => {
      if (toolMode !== 'move') return;
      e.stopPropagation();
      pushUndoSnapshot();
      setIsPlaying(false);
      setIsPassAnimating(false);
      setDraggingTokenId(tokenId);
      isInteractingRef.current = true;
      touchStartXRef.current = null;
      touchStartYRef.current = null;
    },
    [toolMode, pushUndoSnapshot]
  );

  const handleSvgPointerDown = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (toolMode === 'move') return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pt = clientToSvgPoint(
        e.clientX,
        e.clientY,
        rect,
        scene.viewBoxWidth || 500,
        scene.viewBoxHeight || 400
      );
      if (!pt) return;

      pushUndoSnapshot();
      setIsPlaying(false);
      setIsPassAnimating(false);
      isInteractingRef.current = true;

      if (toolMode === 'draw_pass' || toolMode === 'draw_movement') {
        setDraftVector({
          id: `custom-vec-${Date.now()}`,
          type: toolMode === 'draw_pass' ? 'pass' : 'movement',
          from: pt,
          to: pt,
          primary: toolMode === 'draw_pass',
          role: 'att',
        });
      } else if (toolMode === 'freehand') {
        setDraftStroke({
          id: `stroke-${Date.now()}`,
          points: [pt],
          color: '#facc15',
          width: 2.8,
        });
      } else if (toolMode === 'erase') {
        setFreehandStrokes((prev) => prev.slice(0, -1));
        setCustomVectors((prev) => prev.slice(0, -1));
      }
    },
    [toolMode, scene.viewBoxWidth, scene.viewBoxHeight, pushUndoSnapshot]
  );

  const handleSvgPointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const pt = clientToSvgPoint(
        e.clientX,
        e.clientY,
        rect,
        scene.viewBoxWidth || 500,
        scene.viewBoxHeight || 400
      );
      if (!pt) return;

      if (draggingTokenId) {
        if (draggingTokenId === 'ball') {
          setCustomBallPos(pt);
        } else {
          setCustomPositions((prev) => ({
            ...prev,
            [draggingTokenId]: pt,
          }));
        }
        return;
      }

      if (draftVector) {
        setDraftVector((prev) => (prev ? { ...prev, to: pt } : null));
        return;
      }

      if (draftStroke) {
        setDraftStroke((prev) =>
          prev ? { ...prev, points: [...prev.points, pt] } : null
        );
      }
    },
    [draggingTokenId, draftVector, draftStroke, scene.viewBoxWidth, scene.viewBoxHeight]
  );

  const handleSvgPointerUp = useCallback(() => {
    if (draggingTokenId) {
      setDraggingTokenId(null);
      window.setTimeout(() => {
        isInteractingRef.current = false;
      }, 50);
    }
    if (draftVector) {
      const dist = Math.hypot(
        draftVector.to.x - draftVector.from.x,
        draftVector.to.y - draftVector.from.y
      );
      if (dist >= 12) {
        setCustomVectors((prev) => [...prev, draftVector]);
      }
      setDraftVector(null);
      isInteractingRef.current = false;
    }
    if (draftStroke) {
      if (draftStroke.points.length >= 2) {
        setFreehandStrokes((prev) => [...prev, draftStroke]);
      }
      setDraftStroke(null);
      isInteractingRef.current = false;
    }
  }, [draggingTokenId, draftVector, draftStroke]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isInteractingRef.current || draggingTokenId) return;
      if (e.touches.length === 1) {
        touchStartXRef.current = e.touches[0].clientX;
        touchStartYRef.current = e.touches[0].clientY;
      }
    },
    [draggingTokenId]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (
        isInteractingRef.current ||
        draggingTokenId ||
        !onPhaseChange ||
        totalPhases <= 0 ||
        touchStartXRef.current === null ||
        touchStartYRef.current === null ||
        e.changedTouches.length === 0
      ) {
        return;
      }
      const swipeDir = detectHorizontalSwipe(
        touchStartXRef.current,
        touchStartYRef.current,
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY
      );
      if (swipeDir === 'next') {
        onPhaseChange((safePhaseIndex + 1) % totalPhases);
      } else if (swipeDir === 'prev') {
        onPhaseChange((safePhaseIndex - 1 + totalPhases) % totalPhases);
      }
      touchStartXRef.current = null;
      touchStartYRef.current = null;
    },
    [draggingTokenId, onPhaseChange, safePhaseIndex, totalPhases]
  );

  const getBallCoordinates = (): Point2D | undefined => {
    if (customBallPos) {
      return customBallPos;
    }
    if (isPassAnimating && primaryPass) {
      const resolved = resolveVectorEndpoints(
        primaryPass,
        scene.tokens,
        customPositions
      );
      return interpolatePointCubicOut(resolved.from, resolved.to, passProgress);
    }
    return scene.ball;
  };

  return {
    // Playback
    isPlaying,
    setIsPlaying,
    playbackSpeed,
    setPlaybackSpeed,
    passProgress,
    isPassAnimating,
    primaryPass,
    handleReplayPass,
    // Whiteboard & Drawing Engine
    toolMode,
    setToolMode,
    customPositions,
    customBallPos,
    customVectors,
    freehandStrokes,
    draftVector,
    draftStroke,
    draggingTokenId,
    hasCustomPositions,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
    undo,
    redo,
    exportSnapshot: createSnapshot,
    handleResetPositions,
    // Event Handlers
    handleTokenPointerDown,
    handleSvgPointerDown,
    handleSvgPointerMove,
    handleSvgPointerUp,
    handleTouchStart,
    handleTouchEnd,
    // Computed
    safePhaseIndex,
    ballCoords: getBallCoordinates(),
  };
};
