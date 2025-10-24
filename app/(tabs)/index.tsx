import HeroBanner from '@/components/HeroBanner';
import SearchBar from '@/components/SearchBar';
import SOSButton from '@/components/SOSButton';
import TimeslotFilter from '@/components/TimeslotFilter';
import TimeslotSection from '@/components/TimeslotSection';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Design';
import { afternoonTimeslots, earlyMorningTimeslots, eveningTimeslots, lateEveningTimeslots, lateMorningTimeslots, morningTimeslots, nightTimeslots, popularTimeslots } from '@/services/mockData';
import { SearchParams } from '@/types/models';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


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

        {/* Business Model Section */}
        <View style={styles.businessSection}>
          <View style={styles.businessHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>How HushRyd Works</Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
              Connecting communities through smart, affordable transportation
            </Text>
          </View>
          
          <View style={styles.businessGrid}>
            {/* Driver Benefits */}
            <View style={[styles.businessCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.businessCardHeader}>
                <View style={[styles.businessIconContainer, { backgroundColor: colors.primary + '20' }]}>
                  <Text style={styles.businessIcon}>🚗</Text>
                </View>
                <Text style={[styles.businessCardTitle, { color: colors.text }]}>For Drivers</Text>
              </View>
              <View style={styles.businessContent}>
                <Text style={[styles.businessText, { color: colors.textSecondary }]}>
                  • Earn money by sharing your ride
                </Text>
                <Text style={[styles.businessText, { color: colors.textSecondary }]}>
                  • Split fuel costs with passengers
                </Text>
                <Text style={[styles.businessText, { color: colors.textSecondary }]}>
                  • Flexible scheduling
                </Text>
                <Text style={[styles.businessText, { color: colors.textSecondary }]}>
                  • Verified passenger profiles
                </Text>
              </View>
            </View>

            {/* Passenger Benefits */}
            <View style={[styles.businessCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.businessCardHeader}>
                <View style={[styles.businessIconContainer, { backgroundColor: colors.primary + '20' }]}>
                  <Text style={styles.businessIcon}>👥</Text>
                </View>
                <Text style={[styles.businessCardTitle, { color: colors.text }]}>For Passengers</Text>
              </View>
              <View style={styles.businessContent}>
                <Text style={[styles.businessText, { color: colors.textSecondary }]}>
                  • Affordable travel options
                </Text>
                <Text style={[styles.businessText, { color: colors.textSecondary }]}>
                  • Safe and verified drivers
                </Text>
                <Text style={[styles.businessText, { color: colors.textSecondary }]}>
                  • Real-time tracking
                </Text>
                <Text style={[styles.businessText, { color: colors.textSecondary }]}>
                  • Easy booking process
                </Text>
              </View>
            </View>
          </View>

          {/* Business Model Stats */}
          <View style={styles.statsSection}>
            <Text style={[styles.statsTitle, { color: colors.text }]}>Our Impact</Text>
            <View style={styles.statsGrid}>
              <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.statNumber, { color: colors.primary }]}>10K+</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Happy Users</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.statNumber, { color: colors.primary }]}>500+</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Cities Connected</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.statNumber, { color: colors.primary }]}>50K+</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Rides Completed</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.statNumber, { color: colors.primary }]}>₹2M+</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Saved on Travel</Text>
              </View>
            </View>
          </View>

          {/* Mission Statement */}
          <View style={[styles.missionCard, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '30' }]}>
            <View style={styles.missionContent}>
              <Text style={styles.missionIcon}>🎯</Text>
              <Text style={[styles.missionTitle, { color: colors.text }]}>Our Mission</Text>
              <Text style={[styles.missionText, { color: colors.textSecondary }]}>
                To revolutionize inter-city travel in India by providing affordable, safe, and convenient ride-sharing solutions that connect communities and reduce transportation costs for everyone.
              </Text>
            </View>
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
  businessSection: {
    padding: Spacing.xl,
    paddingTop: 0,
  },
  businessHeader: {
    marginBottom: Spacing.lg,
  },
  businessGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  businessCard: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    ...Shadows.small,
  },
  businessCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  businessIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  businessIcon: {
    fontSize: 24,
  },
  businessCardTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    flex: 1,
  },
  businessContent: {
    flex: 1,
  },
  businessText: {
    fontSize: FontSizes.sm,
    lineHeight: 22,
    marginBottom: Spacing.xs,
  },
  statsSection: {
    marginBottom: Spacing.xl,
  },
  statsTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  statCard: {
    width: '48%',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    ...Shadows.small,
  },
  statNumber: {
    fontSize: FontSizes.xxl,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
    fontWeight: '500',
  },
  missionCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    ...Shadows.small,
  },
  missionContent: {
    alignItems: 'center',
  },
  missionIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  missionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  missionText: {
    fontSize: FontSizes.md,
    lineHeight: 24,
    textAlign: 'center',
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
