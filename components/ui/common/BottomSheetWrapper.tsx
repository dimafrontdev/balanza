import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ForwardedRef, ReactNode } from 'react';

interface BottomSheetWrapperProps {
  sheetRef: ForwardedRef<BottomSheetModal>;
  snapPoints: string[] | number[];
  renderBackdrop: any;
  children: ReactNode;
  keyboardBehavior?: 'extend' | 'fillParent' | 'interactive';
  stackBehavior?: 'push' | 'switch' | 'replace';
  keyboardBlurBehavior?: 'none' | 'restore';
  onChange?: (index: number) => void;
  onDismiss?: () => void;
  enableDynamicSizing?: boolean;
}

export default function BottomSheetWrapper({
  sheetRef,
  snapPoints,
  renderBackdrop,
  children,
  keyboardBehavior = 'extend',
  keyboardBlurBehavior = 'restore',
  stackBehavior = 'switch',
  enableDynamicSizing = false,
  onChange,
  onDismiss,
}: BottomSheetWrapperProps) {
  return (
    <BottomSheetModal
      ref={sheetRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      keyboardBehavior={keyboardBehavior}
      keyboardBlurBehavior={keyboardBlurBehavior}
      stackBehavior={stackBehavior}
      android_keyboardInputMode="adjustResize"
      enableDynamicSizing={enableDynamicSizing}
      onChange={onChange}
      onDismiss={onDismiss}
      backgroundStyle={{
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      }}
      handleIndicatorStyle={{
        backgroundColor: '#E5E7EB',
        width: 40,
        height: 4,
      }}>
      {children}
    </BottomSheetModal>
  );
}
