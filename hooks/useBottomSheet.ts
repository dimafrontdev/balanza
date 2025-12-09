import { useRef, useCallback, useMemo, createElement } from 'react';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

export function useBottomSheet(snapPoints: string[] | number[]) {
  const ref = useRef<BottomSheetModal>(null);

  const open = useCallback(() => {
    ref.current?.present();
  }, []);

  const close = useCallback(() => {
    ref.current?.dismiss();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) =>
      createElement(BottomSheetBackdrop, {
        ...props,
        disappearsOnIndex: -1,
        appearsOnIndex: 0,
        opacity: 0.5,
      }),
    [],
  );

  const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

  return {
    ref,
    open,
    close,
    snapPoints: memoizedSnapPoints,
    renderBackdrop,
  };
}
