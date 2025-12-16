import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import SectionHeader from './SectionHeader';

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
}

export default function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <>
      <SectionHeader title={title} />
      <View style={styles.section}>{children}</View>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    overflow: 'hidden',
    gap: 8,
  },
});
