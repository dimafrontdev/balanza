import { View, Text, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import useLanguageStore from '../../store/languageStore';
import useAuthStore from '../../store/authStore';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { setLanguage } = useLanguageStore();
  const { logout, profile } = useAuthStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('welcome')}, {profile?.name}!</Text>
      <Text style={styles.text}>{t('hello_world')}</Text>
      <View style={styles.buttonContainer}>
        <Button title="English" onPress={() => setLanguage('en')} />
        <Button title="Українська" onPress={() => setLanguage('uk')} />
      </View>
      <View style={styles.logoutButton}>
        <Button title="Logout" onPress={logout} color="#f00" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 20,
  }
});
