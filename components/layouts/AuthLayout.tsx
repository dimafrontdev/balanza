import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReactNode } from 'react';

type AuthLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function AuthLayout({ title, children }: AuthLayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.logo, { paddingTop: insets.top }]}>
        <Image source={require('../../assets/images/logoFullWhite.png')} style={styles.logoImage} />
      </View>
      <View style={styles.main}>
        <Text style={styles.heading}>{title}</Text>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#6366F1',
  },
  logo: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    paddingTop: 35,
    height: 200,
    resizeMode: 'contain',
  },
  main: {
    height: '85%',
    padding: 22,
    paddingTop: 24,
    display: 'flex',
    borderRadius: 28,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: 0.24,
    paddingTop: 2,
  },
});
