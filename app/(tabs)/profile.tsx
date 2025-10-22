import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Design';
import { getCurrentUser, getReviewsForUser, getVehiclesForUser } from '@/services/mockData';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const currentUser = getCurrentUser();
  const reviews = getReviewsForUser(currentUser.id);
  const userVehicles = getVehiclesForUser(currentUser.id);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Profile Header with Gradient */}
      <LinearGradient colors={['#00D4FF', '#00AFF5', '#0090D9']} style={styles.header}>
        <Text style={styles.avatar}>{currentUser.avatar || '👤'}</Text>
        <Text style={styles.name}>{currentUser.name}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleBadgeText}>
            {currentUser.role === 'driver' ? '🚗 Driver' : currentUser.role === 'customer' ? '🚙 Customer' : '🎫 Passenger'}
          </Text>
        </View>
        {currentUser.verified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✓ Verified</Text>
          </View>
        )}
      </LinearGradient>

      {/* Stats Card */}
      <View style={[styles.statsCard, { backgroundColor: colors.card }]}>
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            ⭐ {currentUser.rating.toFixed(1)}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Rating</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: colors.primary }]}>{currentUser.reviewCount}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Reviews</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: colors.text }]}>2022</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Member since</Text>
        </View>
      </View>

      {/* Bio Section */}
      {currentUser.bio && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
          <View style={[styles.bioCard, { backgroundColor: colors.lightGray }]}>
            <Text style={[styles.bioText, { color: colors.text }]}>{currentUser.bio}</Text>
          </View>
        </View>
      )}

      {/* Reviews Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Reviews ({reviews.length})</Text>
        {reviews.map((review) => (
          <View
            key={review.id}
            style={[styles.reviewCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewAvatar}>{review.fromUser.avatar || '👤'}</Text>
              <View style={styles.reviewInfo}>
                <Text style={[styles.reviewName, { color: colors.text }]}>{review.fromUser.name}</Text>
                <View style={styles.reviewRating}>
                  <Text style={styles.star}>⭐</Text>
                  <Text style={[styles.ratingText, { color: colors.textSecondary }]}>
                    {review.rating}/5
                  </Text>
                </View>
              </View>
              <Text style={[styles.reviewDate, { color: colors.textTertiary }]}>{review.date}</Text>
            </View>
            {review.comment && (
              <Text style={[styles.reviewComment, { color: colors.textSecondary }]}>{review.comment}</Text>
            )}
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => router.push('/auth/login')}
          activeOpacity={0.7}
        >
          <Text style={styles.actionIcon}>✏️</Text>
          <Text style={[styles.actionText, { color: colors.text }]}>Edit Profile</Text>
          <Text style={[styles.chevron, { color: colors.textTertiary }]}>›</Text>
        </TouchableOpacity>

        {(currentUser.role === 'driver' || currentUser.role === 'customer') && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push('/vehicles/manage')}
            activeOpacity={0.7}
          >
            <Text style={styles.actionIcon}>🚗</Text>
            <Text style={[styles.actionText, { color: colors.text }]}>
              My Vehicles ({userVehicles.length})
            </Text>
            <Text style={[styles.chevron, { color: colors.textTertiary }]}>›</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.card, borderColor: colors.border }]}
          activeOpacity={0.7}
        >
          <Text style={styles.actionIcon}>⚙️</Text>
          <Text style={[styles.actionText, { color: colors.text }]}>Settings</Text>
          <Text style={[styles.chevron, { color: colors.textTertiary }]}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.card, borderColor: colors.border }]}
          activeOpacity={0.7}
        >
          <Text style={styles.actionIcon}>❓</Text>
          <Text style={[styles.actionText, { color: colors.text }]}>Help & Support</Text>
          <Text style={[styles.chevron, { color: colors.textTertiary }]}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Spacing.huge,
    paddingBottom: Spacing.xxxl,
  },
  avatar: {
    fontSize: 80,
    marginBottom: Spacing.lg,
  },
  name: {
    fontSize: FontSizes.xxxl,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  roleBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
    marginBottom: Spacing.sm,
  },
  roleBadgeText: {
    color: '#FFFFFF',
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  verifiedBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  statsCard: {
    flexDirection: 'row',
    padding: Spacing.xl,
    marginHorizontal: Spacing.lg,
    marginTop: -Spacing.xxxl,
    borderRadius: BorderRadius.lg,
    ...Shadows.large,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.sm,
  },
  statDivider: {
    width: 1,
    height: '100%',
  },
  section: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    marginBottom: Spacing.lg,
  },
  bioCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  bioText: {
    fontSize: FontSizes.md,
    lineHeight: 24,
  },
  reviewCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
    ...Shadows.small,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  reviewAvatar: {
    fontSize: 40,
    marginRight: Spacing.md,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: FontSizes.sm,
  },
  reviewDate: {
    fontSize: FontSizes.xs,
  },
  reviewComment: {
    fontSize: FontSizes.md,
    lineHeight: 22,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
    ...Shadows.small,
  },
  actionIcon: {
    fontSize: 24,
    marginRight: Spacing.lg,
  },
  actionText: {
    flex: 1,
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 24,
    fontWeight: '300',
  },
  bottomPadding: {
    height: Spacing.xl,
  },
});
