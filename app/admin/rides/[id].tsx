import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AdminLayout from '../../../components/admin/AdminLayout';
import { BorderRadius, FontSizes, Spacing } from '../../../constants/Design';

export default function RideDetailsPage() {
  const { id: rideId } = useLocalSearchParams();
  
  // Mock ride data - in real app, fetch from API
  const rideData = {
    id: rideId,
    from: 'Hyderabad',
    to: 'Chennai',
    driver: {
      name: 'John Doe',
      phone: '+91-9876543210',
      rating: 4.8,
      experience: '3 years',
      license: 'DL123456789',
      avatar: '👨‍💼',
      address: '123 Main Street, Hyderabad',
      emergencyContact: '+91-9876543211'
    },
    vehicle: {
      make: 'Toyota',
      model: 'Innova',
      year: 2022,
      color: 'White',
      licensePlate: 'TS09AB1234',
      capacity: 7,
      features: ['AC', 'Music System', 'GPS'],
      insurance: 'Valid until Dec 2024',
      registration: 'Valid until Mar 2025'
    },
    passengers: [
      { 
        name: 'Alice Smith', 
        phone: '+91-9876543211', 
        seat: 1,
        age: 28,
        emergencyContact: '+91-9876543212',
        specialRequests: 'Window seat preferred'
      },
      { 
        name: 'Bob Johnson', 
        phone: '+91-9876543212', 
        seat: 2,
        age: 35,
        emergencyContact: '+91-9876543213',
        specialRequests: 'None'
      },
      { 
        name: 'Carol Brown', 
        phone: '+91-9876543213', 
        seat: 3,
        age: 42,
        emergencyContact: '+91-9876543214',
        specialRequests: 'Vegetarian meal'
      }
    ],
    route: {
      distance: '625 km',
      duration: '8h 15m',
      waypoints: ['Bangalore', 'Vellore'],
      tolls: 'Rs 450',
      fuelCost: 'Rs 1,200'
    },
    pricing: {
      baseFare: 'Rs 2,000',
      distanceFare: 'Rs 300',
      tolls: 'Rs 450',
      total: 'Rs 2,500',
      currency: 'INR'
    },
    status: 'Completed',
    date: '2024-01-20',
    time: '10:30 AM',
    pickupLocation: 'Hyderabad Central Mall',
    dropoffLocation: 'Chennai Central Station',
    bookingDate: '2024-01-18',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI'
  };

  return (
    <AdminLayout title={`Ride Details - ${rideId}`} currentPage="rides">
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Back to Rides</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.container}>
        {/* Ride Overview */}
        <View style={styles.detailsCard}>
          <Text style={styles.title}>🚗 Ride Overview</Text>
          <View style={styles.routeInfo}>
            <Text style={styles.routeText}>{rideData.from} → {rideData.to}</Text>
            <Text style={styles.statusBadge}>{rideData.status}</Text>
          </View>
          <View style={styles.rideMeta}>
            <Text style={styles.metaText}>📅 {rideData.date} at {rideData.time}</Text>
            <Text style={styles.metaText}>💰 {rideData.pricing.total}</Text>
            <Text style={styles.metaText}>⏱️ {rideData.route.duration}</Text>
            <Text style={styles.metaText}>📏 {rideData.route.distance}</Text>
          </View>
        </View>

        {/* Driver Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.title}>👨‍💼 Driver Information</Text>
          <View style={styles.driverCard}>
            <Text style={styles.driverAvatar}>{rideData.driver.avatar}</Text>
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{rideData.driver.name}</Text>
              <Text style={styles.driverPhone}>📞 {rideData.driver.phone}</Text>
              <Text style={styles.driverRating}>⭐ {rideData.driver.rating}/5 Rating</Text>
              <Text style={styles.driverExp}>🚗 {rideData.driver.experience} Experience</Text>
              <Text style={styles.driverLicense}>🆔 License: {rideData.driver.license}</Text>
              <Text style={styles.driverAddress}>📍 {rideData.driver.address}</Text>
              <Text style={styles.driverEmergency}>🚨 Emergency: {rideData.driver.emergencyContact}</Text>
            </View>
          </View>
        </View>

        {/* Vehicle Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.title}>🚙 Vehicle Information</Text>
          <View style={styles.vehicleDetails}>
            <Text style={styles.vehicleInfo}>Make: {rideData.vehicle.make}</Text>
            <Text style={styles.vehicleInfo}>Model: {rideData.vehicle.model}</Text>
            <Text style={styles.vehicleInfo}>Year: {rideData.vehicle.year}</Text>
            <Text style={styles.vehicleInfo}>Color: {rideData.vehicle.color}</Text>
            <Text style={styles.vehicleInfo}>License Plate: {rideData.vehicle.licensePlate}</Text>
            <Text style={styles.vehicleInfo}>Capacity: {rideData.vehicle.capacity} seats</Text>
            <Text style={styles.vehicleInfo}>Features: {rideData.vehicle.features.join(', ')}</Text>
            <Text style={styles.vehicleInfo}>Insurance: {rideData.vehicle.insurance}</Text>
            <Text style={styles.vehicleInfo}>Registration: {rideData.vehicle.registration}</Text>
          </View>
        </View>

        {/* Passenger Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.title}>👥 Passengers ({rideData.passengers.length})</Text>
          {rideData.passengers.map((passenger, index) => (
            <View key={index} style={styles.passengerCard}>
              <Text style={styles.passengerAvatar}>{passenger.name.charAt(0)}</Text>
              <View style={styles.passengerDetails}>
                <Text style={styles.passengerName}>{passenger.name}</Text>
                <Text style={styles.passengerInfo}>📞 {passenger.phone}</Text>
                <Text style={styles.passengerInfo}>🎂 Age: {passenger.age}</Text>
                <Text style={styles.passengerInfo}>💺 Seat: #{passenger.seat}</Text>
                <Text style={styles.passengerInfo}>🚨 Emergency: {passenger.emergencyContact}</Text>
                <Text style={styles.passengerInfo}>📝 Requests: {passenger.specialRequests}</Text>
                <View style={styles.ratingSection}>
                  <Text style={styles.ratingLabel}>⭐ Rating: {passenger.rating}/5</Text>
                  <Text style={styles.feedbackText}>"{passenger.feedback}"</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Route & Pricing */}
        <View style={styles.detailsCard}>
          <Text style={styles.title}>🗺️ Route & Pricing</Text>
          <View style={styles.pricingSection}>
            <Text style={styles.pricingTitle}>Pricing Breakdown:</Text>
            <Text style={styles.pricingItem}>Base Fare: {rideData.pricing.baseFare}</Text>
            <Text style={styles.pricingItem}>Distance Fare: {rideData.pricing.distanceFare}</Text>
            <Text style={styles.pricingItem}>Tolls: {rideData.pricing.tolls}</Text>
            <Text style={styles.pricingTotal}>Total: {rideData.pricing.total}</Text>
          </View>
          <View style={styles.routeSection}>
            <Text style={styles.routeTitle}>Route Details:</Text>
            <Text style={styles.routeItem}>Pickup: {rideData.pickupLocation}</Text>
            <Text style={styles.routeItem}>Dropoff: {rideData.dropoffLocation}</Text>
            <Text style={styles.routeItem}>Waypoints: {rideData.route.waypoints.join(', ')}</Text>
            <Text style={styles.routeItem}>Fuel Cost: {rideData.route.fuelCost}</Text>
          </View>
        </View>

        {/* Payment & Booking */}
        <View style={styles.detailsCard}>
          <Text style={styles.title}>💳 Payment & Booking</Text>
          <Text style={styles.bookingInfo}>Booking Date: {rideData.bookingDate}</Text>
          <Text style={styles.bookingInfo}>Payment Status: {rideData.paymentStatus}</Text>
          <Text style={styles.bookingInfo}>Payment Method: {rideData.paymentMethod}</Text>
        </View>
      </ScrollView>
    </AdminLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: '#6B7280',
    marginBottom: Spacing.lg,
  },
  infoSection: {
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: '#111827',
    marginBottom: Spacing.md,
  },
  infoText: {
    fontSize: FontSizes.md,
    color: '#374151',
    marginBottom: Spacing.sm,
    lineHeight: 22,
  },
  routeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  routeText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: '#111827',
  },
  statusBadge: {
    backgroundColor: '#10B981',
    color: '#FFFFFF',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  rideMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metaText: {
    fontSize: FontSizes.sm,
    color: '#6B7280',
    marginBottom: Spacing.xs,
    flex: 1,
    minWidth: '45%',
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  driverAvatar: {
    fontSize: 40,
    marginRight: Spacing.md,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: '#111827',
    marginBottom: Spacing.xs,
  },
  driverPhone: {
    fontSize: FontSizes.sm,
    color: '#374151',
    marginBottom: Spacing.xs,
  },
  driverRating: {
    fontSize: FontSizes.sm,
    color: '#374151',
    marginBottom: Spacing.xs,
  },
  driverExp: {
    fontSize: FontSizes.sm,
    color: '#374151',
    marginBottom: Spacing.xs,
  },
  driverLicense: {
    fontSize: FontSizes.sm,
    color: '#374151',
    marginBottom: Spacing.xs,
  },
  driverAddress: {
    fontSize: FontSizes.sm,
    color: '#374151',
    marginBottom: Spacing.xs,
  },
  driverEmergency: {
    fontSize: FontSizes.sm,
    color: '#374151',
  },
  vehicleDetails: {
    marginTop: Spacing.sm,
  },
  vehicleInfo: {
    fontSize: FontSizes.sm,
    color: '#374151',
    marginBottom: Spacing.xs,
    lineHeight: 18,
  },
  passengerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
    backgroundColor: '#F9FAFB',
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
  },
  passengerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    fontSize: FontSizes.md,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 40,
    marginRight: Spacing.sm,
  },
  passengerDetails: {
    flex: 1,
  },
  passengerName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: '#111827',
    marginBottom: Spacing.xs,
  },
  passengerInfo: {
    fontSize: FontSizes.sm,
    color: '#6B7280',
    marginBottom: 2,
  },
  pricingSection: {
    marginBottom: Spacing.lg,
  },
  pricingTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: '#111827',
    marginBottom: Spacing.sm,
  },
  pricingItem: {
    fontSize: FontSizes.sm,
    color: '#374151',
    marginBottom: Spacing.xs,
  },
  pricingTotal: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: '#111827',
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  routeSection: {
    marginTop: Spacing.lg,
  },
  routeTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: '#111827',
    marginBottom: Spacing.sm,
  },
  routeItem: {
    fontSize: FontSizes.sm,
    color: '#374151',
    marginBottom: Spacing.xs,
  },
  bookingInfo: {
    fontSize: FontSizes.sm,
    color: '#374151',
    marginBottom: Spacing.xs,
    lineHeight: 18,
  },
  backButtonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  backButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: '#374151',
  },
  ratingSection: {
    marginTop: Spacing.sm,
    padding: Spacing.sm,
    backgroundColor: '#FEF3C7',
    borderRadius: BorderRadius.sm,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
  },
  ratingLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: Spacing.xs,
  },
  feedbackText: {
    fontSize: FontSizes.sm,
    color: '#92400E',
    fontStyle: 'italic',
    lineHeight: 18,
  },
});
