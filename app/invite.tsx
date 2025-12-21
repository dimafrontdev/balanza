import { useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import useAuthStore from '@/store/authStore';

export default function InviteScreen() {
  const router = useRouter();
  const { token } = useLocalSearchParams<{ token: string }>();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!token) {
      router.replace('/');
      return;
    }

    if (user) {
      router.replace({
        pathname: '/(protected)/groups',
        params: { invitationToken: token },
      });
    } else {
      router.replace({
        pathname: '/register',
        params: { invitationToken: token },
      });
    }
  }, [token, user, router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1447E6" />
      <Text style={styles.text}>Processing invitation...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#6A7282',
  },
});
