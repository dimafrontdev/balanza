import { Stack, Tabs, useSegments } from 'expo-router';
import { useTheme, Text } from 'react-native-paper';
import { Platform, View, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { IconAnalytics, IconCard, IconGroup, IconSettings, IconWallet } from '@/assets/icons';
import { ReactElement } from 'react';
import HomeCustomizeButton from '@/components/ui/common/HomeCustomizeButton';

type TabRoute = {
  name: string;
  titleKey: string;
  icon: (props: { color: string }) => ReactElement;
};

const TAB_ROUTES: TabRoute[] = [
  { name: 'index', titleKey: 'tabs.balance', icon: ({ color }) => <IconWallet color={color} /> },
  { name: 'accounts', titleKey: 'tabs.accounts', icon: ({ color }) => <IconCard color={color} /> },
  { name: 'groups', titleKey: 'tabs.groups', icon: ({ color }) => <IconGroup color={color} /> },
  {
    name: 'analytics',
    titleKey: 'tabs.analytics',
    icon: ({ color }) => <IconAnalytics color={color} />,
  },
  {
    name: 'settings',
    titleKey: 'tabs.settings',
    icon: ({ color }) => <IconSettings color={color} />,
  },
];

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.tabBarContainer} pointerEvents="box-none">
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const tabRoute = TAB_ROUTES.find(r => r.name === route.name);
          const iconColor = isFocused ? theme.colors.primary : '#6B7280';

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={styles.tabItem}>
              <View>{tabRoute?.icon({ color: iconColor })}</View>
              <Text style={[styles.tabLabel, { color: iconColor }]}>
                {tabRoute ? t(tabRoute.titleKey) : options.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function ProtectedLayout() {
  const { t } = useTranslation();
  const theme = useTheme();
  const segments = useSegments();
  let currentRouteName: string = segments[segments.length - 1] as string;
  if (currentRouteName === '(protected)') {
    currentRouteName = 'index';
  }

  const getTitle = () => {
    const activeTab = TAB_ROUTES.find(route => route.name === currentRouteName);
    return activeTab ? t(activeTab.titleKey) : '';
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: getTitle(),
          headerStyle: { backgroundColor: theme.colors.background },
          headerTitleStyle: {
            fontFamily: 'Bitter-Regular',
            fontSize: 18,
            color: '#101828',
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerRight: () => (currentRouteName === 'index' ? <HomeCustomizeButton /> : null),
        }}
      />
      <Tabs
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        {TAB_ROUTES.map(route => (
          <Tabs.Screen key={route.name} name={route.name} options={{ title: t(route.titleKey) }} />
        ))}
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    flexDirection: 'row',
    width: '90%',
    maxWidth: 600,
    height: 58,
    borderRadius: 22,
    paddingHorizontal: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.08,
        shadowRadius: 28,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  tabLabel: {
    fontSize: 8,
    marginTop: 2,
  },
});
