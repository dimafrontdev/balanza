import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Platform, UIManager } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionProps {
  header: React.ReactNode;
  children: React.ReactNode;
  collapsedChildren?: React.ReactNode;
  defaultExpanded?: boolean;
  disabled?: boolean;
}

export default function Accordion({
  header,
  children,
  collapsedChildren,
  defaultExpanded = false,
  disabled = false,
}: AccordionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useRef(new Animated.Value(defaultExpanded ? 1 : 0)).current;
  const rotateAnim = useRef(new Animated.Value(defaultExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: expanded ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue: expanded ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animatedHeight, expanded, rotateAnim]);

  const toggleAccordion = () => {
    if (!disabled) {
      setExpanded(!expanded);
    }
  };

  const heightInterpolate = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const opacityInterpolate = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleAccordion}
        activeOpacity={0.7}
        disabled={disabled}>
        <View style={styles.headerContent}>{header}</View>
        {!disabled && (
          <Animated.View
            style={{
              transform: [{ rotate: rotation }],
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#9CA3AF" />
          </Animated.View>
        )}
      </TouchableOpacity>
      {!expanded && collapsedChildren && (
        <View style={styles.collapsedContent}>{collapsedChildren}</View>
      )}
      <Animated.View
        style={[
          styles.contentWrapper,
          {
            height: heightInterpolate,
            opacity: opacityInterpolate,
          },
        ]}>
        <View
          style={styles.content}
          onLayout={event => {
            const { height } = event.nativeEvent.layout;
            if (height > 0 && contentHeight !== height) {
              setContentHeight(height);
            }
          }}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    minHeight: 64,
  },
  headerContent: {
    flex: 1,
  },
  chevron: {
    marginLeft: 8,
  },
  collapsedContent: {
    paddingHorizontal: 16,
  },
  contentWrapper: {
    overflow: 'hidden',
  },
  content: {
    paddingHorizontal: 16,
    position: 'absolute',
    width: '100%',
  },
});
