import { Text } from 'react-native-paper';
import React from 'react';
import { StyleSheet } from 'react-native';

const SectionHeader = ({ title }: { title: string }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

export default SectionHeader;

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginTop: 24,
    marginBottom: 12,
    marginLeft: 4,
  },
});
