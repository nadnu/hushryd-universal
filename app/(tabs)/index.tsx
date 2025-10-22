import HeroBanner from '@/components/HeroBanner';
import SearchBar from '@/components/SearchBar';
import SOSButton from '@/components/SOSButton';
import TimeslotFilter from '@/components/TimeslotFilter';
import TimeslotSection from '@/components/TimeslotSection';
import { useColorScheme } from '@/components/useColorScheme';
import Colors, { CURRENCY_SYMBOL } from '@/constants/Colors';
import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Design';
import { afternoonTimeslots, earlyMorningTimeslots, eveningTimeslots, lateEveningTimeslots, lateMorningTimeslots, morningTimeslots, nightTimeslots, popularRoutes, popularTimeslots } from '@/services/mockData';
import { SearchParams } from '@/types/models';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Helper functions for popular routes
const getRouteIcon = (from: string, to: string) => {
  const routeKey = `${from}-${to}`.toLowerCase();
  
  if (routeKey.includes('hyderabad')) return '🏙️';
  if (routeKey.includes('bangalore')) return '🌆';
  if (routeKey.includes('chennai')) return '🏛️';
  if (routeKey.includes('visakhapatnam')) return '🌊';
  if (routeKey.includes('vijayawada')) return '🌾';
  if (routeKey.includes('warangal')) return '🏰';
  if (routeKey.includes('tirupati')) return '🕉️';
  
  return '🚗';
};

const getRouteGradient = (index: number) => {
  const gradients = [
    ['#32CD32', '#228B22', '#1E7A1E'], // Green
    ['#FF8C00', '#FF6C00', '#FF5500'], // Orange
    ['#00D4FF', '#00AFF5', '#0090D9'], // Blue
    ['#8A2BE2', '#7B1FA2', '#6A1B9A'], // Purple
    ['#FF69B4', '#FF1493', '#DC143C'], // Pink
    ['#20B2AA', '#008B8B', '#006666'], // Teal
    ['#FFD700', '#FFA500', '#FF8C00'], // Gold
    ['#9370DB', '#8A2BE2', '#7B1FA2'], // Violet
  ];
  
  return gradients[index % gradients.length];
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedType, setSelectedType] = useState<'all' | 'carpool' | 'private'>('all');
  const [selectedTimeslotFilter, setSelectedTimeslotFilter] = useState<'all' | 'early-morning' | 'morning' | 'late-morning' | 'afternoon' | 'evening' | 'late-evening' | 'night'>('all');

  const handleSearch = (params: SearchParams) => {
    console.log('Home screen handleSearch called with:', params);
    console.log('Selected type:', selectedType);
    router.push({
      pathname: '/search',
      params: { ...params, type: selectedType },
    });
  };

  const handleTimeslotPress = (timeslot: any) => {
    console.log('Timeslot pressed:', timeslot);
    // Navigate directly to the ride details page
    router.push(`/ride/${timeslot.rideId}`);
  };

  const handleViewAllTimeslots = () => {
    console.log('View all timeslots pressed');
    router.push({
      pathname: '/search',
      params: {
        from: 'Hyderabad',
        to: 'Vijayawada',
        date: new Date().toISOString().split('T')[0],
        passengers: 1,
        type: selectedType,
      },
    });
  };

  const filteredTimeslots = useMemo(() => {
    switch (selectedTimeslotFilter) {
      case 'early-morning':
        return earlyMorningTimeslots;
      case 'morning':
        return morningTimeslots;
      case 'late-morning':
        return lateMorningTimeslots;
      case 'afternoon':
        return afternoonTimeslots;
      case 'evening':
        return eveningTimeslots;
      case 'late-evening':
        return lateEveningTimeslots;
      case 'night':
        return nightTimeslots;
      default:
        return popularTimeslots;
    }
  }, [selectedTimeslotFilter]);

  const handlePopularRoute = (from: string, to: string) => {
    console.log('Popular route clicked:', { from, to, type: selectedType });
    router.push({
      pathname: '/search',
      params: {
        from,
        to,
        date: new Date().toISOString().split('T')[0],
        passengers: 1,
        type: selectedType,
      },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Hero Section with Banner */}
        <HeroBanner />

        {/* Search Card */}
        <View style={[styles.searchCard, { backgroundColor: colors.card }]}>
          <SearchBar onSearch={handleSearch} />
        </View>

        {/* Ride Type Selector */}
        <View style={styles.typeSelectorSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>How are you travelling today?</Text>
          <View style={styles.typeButtons}>
            <TouchableOpacity
              style={[
                styles.typeCard,
                { backgroundColor: colors.card, borderColor: colors.border },
                selectedType === 'all' && [styles.typeCardActive, { borderColor: colors.primary }],
              ]}
              onPress={() => setSelectedType('all')}
              activeOpacity={0.7}
            >
              <Text style={styles.typeIcon}>🚗</Text>
              <Text style={[styles.typeTitle, { color: colors.text }]}>All Rides</Text>
              <Text style={[styles.typeDescription, { color: colors.textSecondary }]}>
                Browse all options
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeCard,
                { backgroundColor: colors.card, borderColor: colors.border },
                selectedType === 'carpool' && [styles.typeCardActive, { borderColor: colors.primary }],
              ]}
              onPress={() => setSelectedType('carpool')}
              activeOpacity={0.7}
            >
              <Text style={styles.typeIcon}>🚗</Text>
              <Text style={[styles.typeTitle, { color: colors.text }]}>Carpool</Text>
              <Text style={[styles.typeDescription, { color: colors.textSecondary }]}>
                Share the costs
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeCard,
                { backgroundColor: colors.card, borderColor: colors.border },
                selectedType === 'private' && [styles.typeCardActive, { borderColor: colors.primary }],
              ]}
              onPress={() => setSelectedType('private')}
              activeOpacity={0.7}
            >
              <Text style={styles.typeIcon}>🚙</Text>
              <Text style={[styles.typeTitle, { color: colors.text }]}>Private</Text>
              <Text style={[styles.typeDescription, { color: colors.textSecondary }]}>
                Premium rides
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Timeslot Filter */}
        <TimeslotFilter
          selectedFilter={selectedTimeslotFilter}
          onFilterChange={setSelectedTimeslotFilter}
        />

        {/* Filtered Timeslots */}
        <TimeslotSection
          title={selectedTimeslotFilter === 'all' ? 'Popular Timeslots' : 
                 selectedTimeslotFilter === 'early-morning' ? 'Early Morning Rides' :
                 selectedTimeslotFilter === 'morning' ? 'Morning Rides' :
                 selectedTimeslotFilter === 'late-morning' ? 'Late Morning Rides' :
                 selectedTimeslotFilter === 'afternoon' ? 'Afternoon Rides' :
                 selectedTimeslotFilter === 'evening' ? 'Evening Rides' :
                 selectedTimeslotFilter === 'late-evening' ? 'Late Evening Rides' :
                 'Night Rides'}
          subtitle={selectedTimeslotFilter === 'all' ? 'Quick book available rides for today' :
                   selectedTimeslotFilter === 'early-morning' ? 'Early morning departures (4-7 AM)' :
                   selectedTimeslotFilter === 'morning' ? 'Morning departures (7-10 AM)' :
                   selectedTimeslotFilter === 'late-morning' ? 'Late morning departures (10 AM-1 PM)' :
                   selectedTimeslotFilter === 'afternoon' ? 'Afternoon departures (1-4 PM)' :
                   selectedTimeslotFilter === 'evening' ? 'Evening departures (4-7 PM)' :
                   selectedTimeslotFilter === 'late-evening' ? 'Late evening departures (7-10 PM)' :
                   'Night departures (10 PM-1 AM)'}
          timeslots={filteredTimeslots.slice(0, 4)}
          onTimeslotPress={handleTimeslotPress}
          onViewAllPress={handleViewAllTimeslots}
        />

        {/* Popular Routes */}
        <View style={styles.popularSection}>
          <View style={styles.popularHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular routes</Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
              Popular routes across AP & Telangana
            </Text>
          </View>
          
          <View style={styles.popularGrid}>
            {popularRoutes.slice(0, 8).map((route, index) => {
              const routeIcon = getRouteIcon(route.from, route.to);
              const routeGradient = getRouteGradient(index);
              
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.popularCardContainer}
                  onPress={() => handlePopularRoute(route.from, route.to)}
                  activeOpacity={0.8}
                >
                <LinearGradient
                  colors={routeGradient}
                  style={styles.popularCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.popularCardContent}>
                    <View style={styles.popularCardHeader}>
                      <View style={styles.popularIconContainer}>
                        <Text style={styles.popularIcon}>{routeIcon}</Text>
                      </View>
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularBadgeText}>Popular</Text>
                      </View>
                    </View>
                    
                    <View style={styles.popularRouteInfo}>
                      <Text style={styles.popularFrom}>{route.from}</Text>
                      <View style={styles.popularArrowContainer}>
                        <Text style={styles.popularArrow}>→</Text>
                      </View>
                      <Text style={styles.popularTo}>{route.to}</Text>
                    </View>
                    
                    <View style={styles.popularPriceContainer}>
                      <Text style={styles.popularPriceLabel}>Starting from</Text>
                      <Text style={styles.popularPrice}>{CURRENCY_SYMBOL}{route.price}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Why choose HushRyd?</Text>
        
        <View style={[styles.featureCard, { backgroundColor: colors.lightGray }]}>
          <View style={styles.featureIconContainer}>
            <Text style={styles.featureIcon}>💰</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: colors.text }]}>Your pick of rides at low prices</Text>
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
              No matter where you're going, find the perfect ride from our wide range of destinations and routes at low prices.
            </Text>
          </View>
        </View>

        <View style={[styles.featureCard, { backgroundColor: colors.lightGray }]}>
          <View style={styles.featureIconContainer}>
            <Text style={styles.featureIcon}>🛡️</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: colors.text }]}>Trust who you travel with</Text>
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
              We check reviews, profiles and IDs, so you know who you're travelling with and can book your ride at ease.
            </Text>
          </View>
        </View>

        <View style={[styles.featureCard, { backgroundColor: colors.lightGray }]}>
          <View style={styles.featureIconContainer}>
            <Text style={styles.featureIcon}>📱</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: colors.text }]}>Scroll, click, tap and go!</Text>
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
              Booking a ride has never been easier! Thanks to our simple app, you can book a ride close to you in just minutes.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
    
    {/* Floating SOS Button */}
    <View style={styles.sosButtonContainer}>
      <SOSButton variant="floating" />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  sosButtonContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 1000,
  },
  searchCard: {
    marginTop: -Spacing.xxxl * 2,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadows.large,
  },
  typeSelectorSection: {
    padding: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  sectionSubtitle: {
    fontSize: FontSizes.md,
    marginBottom: Spacing.lg,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  typeCard: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    alignItems: 'center',
    ...Shadows.small,
  },
  typeCardActive: {
    borderWidth: 3,
  },
  typeIcon: {
    fontSize: 40,
    marginBottom: Spacing.sm,
  },
  typeTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  typeDescription: {
    fontSize: FontSizes.xs,
    textAlign: 'center',
  },
  popularSection: {
    padding: Spacing.xl,
    paddingTop: 0,
  },
  popularHeader: {
    marginBottom: Spacing.lg,
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  popularCardContainer: {
    width: '48%',
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  popularCard: {
    padding: Spacing.lg,
    minHeight: 140,
  },
  popularCardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  popularCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  popularIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popularIcon: {
    fontSize: 20,
  },
  popularBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  popularBadgeText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: '#333',
  },
  popularRouteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  popularFrom: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    flex: 1,
  },
  popularArrowContainer: {
    marginHorizontal: Spacing.sm,
  },
  popularArrow: {
    fontSize: FontSizes.md,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 'bold',
  },
  popularTo: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    flex: 1,
    textAlign: 'right',
  },
  popularPriceContainer: {
    alignItems: 'flex-start',
  },
  popularPriceLabel: {
    fontSize: FontSizes.xs,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: Spacing.xs,
  },
  popularPrice: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  featuresSection: {
    padding: Spacing.xl,
    paddingTop: 0,
  },
  featureCard: {
    flexDirection: 'row',
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
  },
  featureIconContainer: {
    marginRight: Spacing.lg,
  },
  featureIcon: {
    fontSize: 48,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  featureText: {
    fontSize: FontSizes.md,
    lineHeight: 22,
  },
  bottomPadding: {
    height: Spacing.xxl,
  },
});
