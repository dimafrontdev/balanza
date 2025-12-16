import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';

interface CameraButtonProps {
  onImageSelected: (imageUri: string) => void;
}

export default function CameraButton({ onImageSelected }: CameraButtonProps) {
  const { t } = useTranslation();

  const handleCameraPress = () => {
    Alert.alert(
      t('transaction.scanReceipt'),
      t('transaction.chooseOption'),
      [
        {
          text: t('transaction.takePhoto'),
          onPress: handleTakePhoto,
        },
        {
          text: t('transaction.chooseFromGallery'),
          onPress: handlePickImage,
        },
        {
          text: t('transaction.cancel'),
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        t('transaction.permissionNeeded'),
        t('transaction.cameraPermissionRequired'),
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
    }
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        t('transaction.permissionNeeded'),
        t('transaction.galleryPermissionRequired'),
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity style={styles.cameraButton} onPress={handleCameraPress}>
      <Ionicons name="camera" size={24} color="#615FFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cameraButton: {
    padding: 8,
  },
});
