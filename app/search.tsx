import HeroBanner from '@/components/HeroBanner';
import RideCard from '@/components/RideCard';
import SearchBar from '@/components/SearchBar';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Design';
import { searchRides } from '@/services/mockData';
import { Ride, SearchParams } from '@/types/models';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SearchResultsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const params = useLocalSearchParams();

  const [results, setResults] = useState<Ride[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'time' | 'rating'>('price');

  useEffect(() => {
    if (params.from && params.to && params.date) {
      console.log('=== SEARCH DIAGNOSTICS ===');
      console.log('Search params:', params);
      console.log('From:', params.from);
      console.log('To:', params.to);
      console.log('Date:', params.date);
      console.log('Passengers:', Number(params.passengers) || 1);
      console.log('Type:', params.type);
      console.log('Timeslot:', params.timeslot);
      
      const rides = searchRides(
        params.from as string,
        params.to as string,
        params.date as string,
        Number(params.passengers) || 1,
        params.type as 'carpool' | 'private' | 'all',
        params.timeslot as 'any' | 'early-morning' | 'morning' | 'late-morning' | 'afternoon' | 'evening' | 'late-evening' | 'night'
      );
      console.log('Search results count:', rides.length);
      console.log('Search results:', rides);
      console.log('=========================');
      setResults(rides);
    } else {
      console.log('=== SEARCH VALIDATION FAILED ===');
      console.log('Missing required fields:', {
        from: params.from || 'MISSING',
        to: params.to || 'MISSING',
        date: params.date || 'MISSING',
      });
      console.log('================================');
    }
  }, [params]);

  const handleNewSearch = (searchParams: SearchParams) => {
    router.setParams({ ...searchParams });
    setShowSearch(false);
  };

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'time') return a.time.localeCompare(b.time);
    if (sortBy === 'rating') return b.publisher.rating - a.publisher.rating;
    return 0;
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Search Results',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Hero Banner */}
        <HeroBanner />
        
        {/* Search Summary */}
        <TouchableOpacity
          style={[styles.searchSummary, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => setShowSearch(!showSearch)}
          activeOpacity={0.7}
        >
          <View style={styles.searchInfo}>
            <Text style={[styles.searchRoute, { color: colors.text }]}>
              {params.from} → {params.to}
            </Text>
            <Text style={[styles.searchDetails, { color: colors.textSecondary }]}>
              {params.date} • {params.passengers} passenger{Number(params.passengers) !== 1 ? 's' : ''}
            </Text>
          </View>
          <View style={[styles.searchToggle, { backgroundColor: colors.lightGray }]}>
            <Text style={[styles.searchIcon, { color: colors.primary }]}>{showSearch ? '▲' : '▼'}</Text>
          </View>
        </TouchableOpacity>

        {/* Expanded Search Bar */}
        {showSearch && (
          <View style={[styles.searchBarContainer, { backgroundColor: colors.card }]}>
            <SearchBar
              onSearch={handleNewSearch}
              initialValues={{
                from: params.from as string,
                to: params.to as string,
                date: params.date as string,
                passengers: Number(params.passengers) || 1,
                timeslot: params.timeslot as 'any' | 'early-morning' | 'morning' | 'late-morning' | 'afternoon' | 'evening' | 'late-evening' | 'night',
              }}
              compact
            />
          </View>
        )}

        {/* Results Header with Sort */}
        <View style={styles.resultsHeader}>
          <Text style={[styles.resultsCount, { color: colors.text }]}>
            {results.length} ride{results.length !== 1 ? 's' : ''} found
          </Text>
          
          {/* Large Group Notice */}
          {Number(params.passengers) > 3 && (
            <View style={[styles.largeGroupNotice, { backgroundColor: colors.primary + '20', borderColor: colors.primary }]}>
              <Text style={styles.largeGroupIcon}>👥</Text>
              <Text style={[styles.largeGroupText, { color: colors.primary }]}>
                Showing 7-8 seater vehicles first for your group of {params.passengers}
              </Text>
            </View>
          )}
          <View style={styles.sortButtons}>
            <TouchableOpacity
              style={[
                styles.sortButton,
                { backgroundColor: colors.lightGray, borderColor: colors.border },
                sortBy === 'price' && [styles.sortButtonActive, { backgroundColor: colors.primary }],
              ]}
              onPress={() => setSortBy('price')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.sortText,
                  { color: colors.text },
                  sortBy === 'price' && { color: '#FFFFFF' },
                ]}
              >
                Price
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortButton,
                { backgroundColor: colors.lightGray, borderColor: colors.border },
                sortBy === 'time' && [styles.sortButtonActive, { backgroundColor: colors.primary }],
              ]}
              onPress={() => setSortBy('time')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.sortText,
                  { color: colors.text },
                  sortBy === 'time' && { color: '#FFFFFF' },
                ]}
              >
                Time
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortButton,
                { backgroundColor: colors.lightGray, borderColor: colors.border },
                sortBy === 'rating' && [styles.sortButtonActive, { backgroundColor: colors.primary }],
              ]}
              onPress={() => setSortBy('rating')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.sortText,
                  { color: colors.text },
                  sortBy === 'rating' && { color: '#FFFFFF' },
                ]}
              >
                Rating
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Results List */}
        <ScrollView style={styles.resultsList} contentContainerStyle={styles.resultsContent}>
          {sortedResults.length > 0 ? (
            sortedResults.map((ride) => <RideCard key={ride.id} ride={ride} />)
          ) : (
            <View style={[styles.emptyState, { backgroundColor: colors.lightGray }]}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>No rides found</Text>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Try adjusting your search criteria or date
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    margin: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    ...Shadows.small,
  },
  searchInfo: {
    flex: 1,
  },
  searchRoute: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  searchDetails: {
    fontSize: FontSizes.sm,
  },
  searchToggle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.small,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  resultsCount: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
  },
  largeGroupNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  largeGroupIcon: {
    fontSize: FontSizes.lg,
    marginRight: Spacing.sm,
  },
  largeGroupText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    flex: 1,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  sortButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
  },
  sortButtonActive: {
    borderWidth: 0,
  },
  sortText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  resultsList: {
    flex: 1,
  },
  resultsContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  emptyState: {
    padding: Spacing.huge,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: FontSizes.md,
    textAlign: 'center',
  },
});
