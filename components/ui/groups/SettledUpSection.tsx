import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Text } from 'react-native-paper';

interface SettledUpSectionProps {
  title: string;
  count: number;
  children: React.ReactNode;
}

export default function SettledUpSection({ title, count, children }: SettledUpSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    setExpanded(!expanded);
    
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1000],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleExpand} activeOpacity={0.7}>
        <View style={styles.headerLeft}>
          <Animated.Text style={[styles.arrow, { transform: [{ rotate: rotation }] }]}>
            ▶
          </Animated.Text>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Animated.View style={[styles.contentWrapper, { maxHeight, opacity }]}>
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 12,
    color: '#6A7282',
    marginRight: 8,
    width: 12,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6A7282',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badge: {
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6A7282',
  },
  contentWrapper: {
    overflow: 'hidden',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
});
