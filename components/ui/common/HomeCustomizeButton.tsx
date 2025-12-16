import { useRef } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import CustomizeHomeSheet from '@/components/sheets/CustomizeHomeSheet';
import useSettingsStore from '@/store/settingsStore';

export default function HomeCustomizeButton() {
  const sheetRef = useRef<BottomSheetModal>(null);
  const { homeWidgets, setHomeWidgets } = useSettingsStore();

  const handlePress = () => {
    sheetRef.current?.present();
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress} style={styles.headerButton}>
        <MaterialIcons name="tune" size={18} color="#101828" />
      </TouchableOpacity>

      <CustomizeHomeSheet ref={sheetRef} widgets={homeWidgets} onSave={setHomeWidgets} />
    </>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 4,
  },
});
