import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors, { CURRENCY_SYMBOL } from '../constants/Colors';
import { BorderRadius, FontSizes, Shadows, Spacing } from '../constants/Design';
import { Ride } from '../types/models';
import { useColorScheme } from './useColorScheme';

interface RideCardProps {
  ride: Ride;
}

export default function RideCard({ ride }: RideCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handlePress = () => {
    router.push(`/ride/${ride.id}`);
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* Date & Time Header */}
      <View style={styles.header}>
        <View style={styles.dateTime}>
          <Text style={[styles.time, { color: colors.text }]}>{ride.time}</Text>
          <Text style={[styles.date, { color: colors.textSecondary }]}>{ride.date}</Text>
        </View>
        <View style={styles.headerBadges}>
          {/* Large Vehicle Indicator */}
          {ride.seats >= 7 && (
            <View style={[styles.largeVehicleBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.largeVehicleText}>👥 {ride.seats} SEATER</Text>
            </View>
          )}
          <View style={[styles.badge, { backgroundColor: colors.lightGray }]}>
            <Text style={[styles.badgeText, { color: colors.text }]}>
              {ride.type === 'carpool' ? '🚗' : '🚙'}
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      {/* Route */}
      <View style={styles.routeContainer}>
        <View style={styles.routeIndicators}>
          <View style={[styles.dot, styles.startDot, { backgroundColor: colors.primary }]} />
          <View style={[styles.line, { backgroundColor: colors.mediumGray }]} />
          <View style={[styles.dot, styles.endDot, { backgroundColor: colors.error }]} />
        </View>
        <View style={styles.locations}>
          <View style={styles.locationRow}>
            <Text style={[styles.city, { color: colors.text }]} numberOfLines={1}>
              {ride.from.city}
            </Text>
            {ride.from.address && (
              <Text style={[styles.address, { color: colors.textSecondary }]} numberOfLines={1}>
                {ride.from.address}
              </Text>
            )}
          </View>
          <View style={styles.durationContainer}>
            <Text style={[styles.duration, { color: colors.textTertiary }]}>
              {ride.duration || 'N/A'} • {ride.distance || 'N/A'}
            </Text>
          </View>
          <View style={styles.locationRow}>
            <Text style={[styles.city, { color: colors.text }]} numberOfLines={1}>
              {ride.to.city}
            </Text>
            {ride.to.address && (
              <Text style={[styles.address, { color: colors.textSecondary }]} numberOfLines={1}>
                {ride.to.address}
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      {/* Driver & Price Footer */}
      <View style={styles.footer}>
        <View style={styles.driverSection}>
          <Text style={styles.avatar}>{ride.publisher.avatar || '👤'}</Text>
          <View style={styles.driverInfo}>
            <Text style={[styles.driverName, { color: colors.text }]} numberOfLines={1}>
              {ride.publisher.name}
            </Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.star}>⭐</Text>
              <Text style={[styles.rating, { color: colors.textSecondary }]}>
                {ride.publisher.rating.toFixed(1)}
              </Text>
              {ride.publisher.verified && <Text style={[styles.verified, { color: colors.success }]}>✓</Text>}
            </View>
          </View>
        </View>
        <View style={styles.priceSection}>
          <Text style={[styles.price, { color: colors.primary }]}>{CURRENCY_SYMBOL}{ride.price}</Text>
          <Text style={[styles.seats, { color: colors.textTertiary }]}>
            {ride.availableSeats} {ride.availableSeats === 1 ? 'seat' : 'seats'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    ...Shadows.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  dateTime: {
    flex: 1,
  },
  time: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    marginBottom: 2,
  },
  date: {
    fontSize: FontSizes.sm,
  },
  headerBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  largeVehicleBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  largeVehicleText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  badgeText: {
    fontSize: FontSizes.lg,
  },
  divider: {
    height: 1,
    marginVertical: Spacing.md,
  },
  routeContainer: {
    flexDirection: 'row',
    marginVertical: Spacing.sm,
  },
  routeIndicators: {
    width: 24,
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  startDot: {
    marginTop: 4,
  },
  endDot: {
    marginBottom: 4,
  },
  line: {
    width: 2,
    flex: 1,
    marginVertical: Spacing.xs,
  },
  locations: {
    flex: 1,
    justifyContent: 'space-between',
  },
  locationRow: {
    marginVertical: Spacing.xs,
  },
  city: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    marginBottom: 2,
  },
  address: {
    fontSize: FontSizes.sm,
  },
  durationContainer: {
    marginVertical: Spacing.sm,
  },
  duration: {
    fontSize: FontSizes.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    fontSize: 40,
    marginRight: Spacing.md,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 14,
    marginRight: 4,
  },
  rating: {
    fontSize: FontSizes.sm,
  },
  verified: {
    fontSize: 16,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    marginBottom: 2,
  },
  seats: {
    fontSize: FontSizes.xs,
  },
});
