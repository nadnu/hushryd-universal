import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import HushRydLogoImage from '../../components/HushRydLogoImage';
import SideMenu from '../../components/SideMenu';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: useClientOnlyValue(false, true),
          tabBarStyle: {
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Search',
            headerTitle: () => (
              <HushRydLogoImage 
                size="small" 
                showBackground={false}
              />
            ),
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => setIsSideMenuVisible(true)}
              >
                <Text style={{ fontSize: 24, color: Colors[colorScheme ?? 'light'].tint }}>☰</Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15, gap: 20 }}
              >
                <TouchableOpacity
                  onPress={() => router.push('/about' as any)}
                >
                  <Text style={{ color: Colors[colorScheme ?? 'light'].tint, fontSize: 14, fontWeight: '600' }}>
                    About Us
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push('/auth/login')}
                >
                  <Text style={{ color: Colors[colorScheme ?? 'light'].tint, fontSize: 14, fontWeight: '600' }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          }}
        />
        <Tabs.Screen
          name="rides"
          options={{
            title: 'My Rides',
            tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />,
          }}
        />
        <Tabs.Screen
          name="publish"
          options={{
            title: 'Publish',
            tabBarIcon: ({ color }) => <TabBarIcon name="plus-circle" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />
      </Tabs>
      
      <SideMenu 
        isVisible={isSideMenuVisible} 
        onClose={() => setIsSideMenuVisible(false)} 
      />
    </>
  );
}
