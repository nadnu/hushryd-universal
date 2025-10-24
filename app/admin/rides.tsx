import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AdminLayout from '../../components/admin/AdminLayout';
import DataTable, { TableColumn } from '../../components/admin/DataTable';
import { BorderRadius, FontSizes, Shadows, Spacing } from '../../constants/Design';
import { exportToExcel, formatRidesDataForExcel } from '../../utils/excelExport';

const { width } = Dimensions.get('window');

export default function AdminRidesPage() {
  const [ridesData, setRidesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading data
    const loadRidesData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setRidesData(getRidesData());
        setError(null);
      } catch (err) {
        setError('Failed to load rides data');
        console.error('Error loading rides:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRidesData();
  }, []);

  const getRidesData = () => [
  {
    id: '1',
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
          specialRequests: 'Window seat preferred',
          rating: 4.5,
          feedback: 'Great driver, very professional'
        },
        { 
          name: 'Bob Johnson', 
          phone: '+91-9876543212', 
          seat: 2,
          age: 35,
          emergencyContact: '+91-9876543213',
          specialRequests: 'None',
          rating: 4.8,
          feedback: 'Excellent service, on time'
        },
        { 
          name: 'Carol Brown', 
          phone: '+91-9876543213', 
          seat: 3,
          age: 42,
          emergencyContact: '+91-9876543214',
          specialRequests: 'Vegetarian meal',
          rating: 4.2,
          feedback: 'Good ride, comfortable vehicle'
        }
      ],
      price: 'Rs 2,500',
      status: 'Completed',
      date: '2024-01-20',
      time: '10:30 AM',
      duration: '8h 15m',
      distance: '625 km',
      averageRating: 4.5
    },
    {
      id: '2',
      from: 'Bangalore',
      to: 'Mumbai',
      driver: {
        name: 'Jane Smith',
        phone: '+91-9876543214',
        rating: 4.9,
        experience: '5 years',
        license: 'DL987654321',
        avatar: '👩‍💼',
        address: '456 Park Avenue, Bangalore',
        emergencyContact: '+91-9876543215'
      },
      vehicle: {
        make: 'Honda',
        model: 'City',
        year: 2021,
        color: 'Silver',
        licensePlate: 'KA01CD5678',
        capacity: 5,
        features: ['AC', 'Bluetooth', 'USB Charging'],
        insurance: 'Valid until Nov 2024',
        registration: 'Valid until Feb 2025'
      },
      passengers: [
        { 
          name: 'David Wilson', 
          phone: '+91-9876543215', 
          seat: 1,
          age: 31,
          emergencyContact: '+91-9876543216',
          specialRequests: 'None',
          rating: 4.9,
          feedback: 'Perfect driver, very safe'
        },
        { 
          name: 'Emma Davis', 
          phone: '+91-9876543216', 
          seat: 2,
          age: 27,
          emergencyContact: '+91-9876543217',
          specialRequests: 'Music preference',
          rating: 4.7,
          feedback: 'Great experience, highly recommended'
        }
      ],
      price: 'Rs 4,200',
      status: 'In Progress',
      date: '2024-01-20',
      time: '2:15 PM',
      duration: '12h 30m',
      distance: '850 km',
      averageRating: 4.8
    },
    {
      id: '3',
      from: 'Delhi',
      to: 'Pune',
      driver: {
        name: 'Mike Johnson',
        phone: '+91-9876543217',
        rating: 4.7,
        experience: '2 years',
        license: 'DL456789123',
        avatar: '👨‍💼',
        address: '789 Central Road, Delhi',
        emergencyContact: '+91-9876543218'
      },
      vehicle: {
        make: 'Maruti',
        model: 'Ertiga',
        year: 2023,
        color: 'Blue',
        licensePlate: 'DL01EF9012',
        capacity: 7,
        features: ['AC', 'Power Steering', 'Central Lock'],
        insurance: 'Valid until Jan 2025',
        registration: 'Valid until Apr 2025'
      },
    passengers: [
      {
          name: 'Frank Miller', 
          phone: '+91-9876543218', 
          seat: 1,
          age: 45,
          emergencyContact: '+91-9876543219',
          specialRequests: 'None',
          rating: 4.6,
          feedback: 'Good driver, punctual'
        },
        { 
          name: 'Grace Lee', 
          phone: '+91-9876543219', 
          seat: 2,
          age: 33,
          emergencyContact: '+91-9876543220',
          specialRequests: 'Window seat',
          rating: 4.4,
          feedback: 'Comfortable ride'
        },
        { 
          name: 'Henry Taylor', 
          phone: '+91-9876543220', 
          seat: 3,
          age: 29,
          emergencyContact: '+91-9876543221',
          specialRequests: 'None',
          rating: 4.8,
          feedback: 'Excellent service'
        },
        { 
          name: 'Ivy Chen', 
          phone: '+91-9876543221', 
          seat: 4,
          age: 26,
          emergencyContact: '+91-9876543222',
          specialRequests: 'Vegetarian snacks',
          rating: 4.3,
          feedback: 'Good experience overall'
        }
      ],
      price: 'Rs 3,800',
      status: 'Scheduled',
      date: '2024-01-21',
      time: '8:00 AM',
      duration: '14h 45m',
      distance: '1,200 km',
      averageRating: 4.5
    },
    {
      id: '4',
      from: 'Kolkata',
      to: 'Hyderabad',
      driver: {
        name: 'Sarah Wilson',
        phone: '+91-9876543222',
        rating: 4.6,
        experience: '4 years',
        license: 'DL789123456',
        avatar: '👩‍💼',
        address: '321 Garden Street, Kolkata',
        emergencyContact: '+91-9876543223'
      },
      vehicle: {
        make: 'Hyundai',
        model: 'Creta',
        year: 2020,
        color: 'Red',
        licensePlate: 'WB01GH3456',
        capacity: 5,
        features: ['AC', 'Touchscreen', 'Reverse Camera'],
        insurance: 'Valid until Oct 2024',
        registration: 'Valid until Jan 2025'
      },
      passengers: [
        { 
          name: 'Jack Anderson', 
          phone: '+91-9876543223', 
          seat: 1,
          age: 38,
          emergencyContact: '+91-9876543224',
          specialRequests: 'None',
          rating: 4.1,
          feedback: 'Cancelled due to emergency'
        }
      ],
      price: 'Rs 2,100',
      status: 'Cancelled',
      date: '2024-01-19',
      time: '6:45 PM',
      duration: '16h 20m',
      distance: '1,100 km',
      averageRating: 4.1
    },
  ];

  const getTableColumns = (): TableColumn[] => [
    {
      key: 'route',
      label: 'Route',
      width: 200,
      render: (value: any, ride: any) => {
        if (!ride || !ride.from || !ride.to) {
          return <Text style={styles.routeText}>N/A</Text>;
        }
        return (
        <View>
            <Text style={styles.routeText}>{ride.from} → {ride.to}</Text>
            <Text style={styles.distanceText}>{ride.distance || 'N/A'}</Text>
        </View>
        );
      },
    },
    {
      key: 'driver',
      label: 'Driver',
      width: 150,
      render: (value: any, ride: any) => {
        if (!ride || !ride.driver) {
          return <Text style={styles.driverText}>N/A</Text>;
        }
        return (
        <View>
            <Text style={styles.driverText}>{ride.driver.name || 'N/A'}</Text>
            <Text style={styles.ratingText}>⭐ {ride.driver.rating || 'N/A'}/5</Text>
        </View>
        );
      },
    },
    {
      key: 'vehicle',
      label: 'Vehicle',
      width: 150,
      render: (value: any, ride: any) => {
        if (!ride || !ride.vehicle) {
          return <Text style={styles.vehicleText}>N/A</Text>;
        }
        return (
          <View>
            <Text style={styles.vehicleText}>{ride.vehicle.make || 'N/A'} {ride.vehicle.model || ''}</Text>
            <Text style={styles.licenseText}>{ride.vehicle.licensePlate || 'N/A'}</Text>
        </View>
        );
      },
    },
    {
      key: 'passengers',
      label: 'Passengers',
      width: 120,
      render: (value: any, ride: any) => {
        if (!ride || !ride.passengers || !ride.vehicle) {
          return <Text style={styles.passengerText}>N/A</Text>;
        }
        return (
          <View>
            <Text style={styles.passengerText}>{ride.passengers.length || 0}/{ride.vehicle.capacity || 0}</Text>
            <Text style={styles.ratingText}>⭐ {ride.averageRating || 'N/A'}/5</Text>
        </View>
        );
      },
    },
    {
      key: 'status',
      label: 'Status',
      width: 100,
      render: (value: any, ride: any) => {
        if (!ride || !ride.status) {
          return <Text style={styles.statusText}>N/A</Text>;
        }
        return (
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ride.status) }]}>
            <Text style={styles.statusText}>{ride.status}</Text>
        </View>
        );
      },
    },
    {
      key: 'price',
      label: 'Price',
      width: 100,
      render: (value: any, ride: any) => {
        if (!ride || !ride.price) {
          return <Text style={styles.priceText}>N/A</Text>;
        }
        return <Text style={styles.priceText}>{ride.price}</Text>;
      },
    },
  ];

  const handleViewDetails = (rideId: string) => {
    console.log('Viewing details for ride:', rideId);
    // Navigate to ride details page
    router.push(`/admin/rides/${rideId}` as any);
  };

  const handleTrackRide = (rideId: string) => {
    console.log('Tracking ride:', rideId);
    // Navigate to ride tracking page
    router.push(`/admin/rides/track/${rideId}` as any);
  };

  const handleExportToExcel = async () => {
    try {
      const { headers, data } = formatRidesDataForExcel(ridesData);
      await exportToExcel({
        filename: 'rides_data',
        sheetName: 'Rides',
        headers,
        data
      });
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  const handleCreateRide = () => {
    console.log('Creating new ride');
    // Navigate to create ride page
    router.push('/admin/rides/create' as any);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return '#10B981';
      case 'In Progress': return '#3B82F6';
      case 'Scheduled': return '#F59E0B';
      case 'Cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <AdminLayout title="Ride Management" currentPage="rides">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>Manage and track all rides</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.createButton} onPress={handleCreateRide}>
              <Text style={styles.createButtonText}>➕ Create Ride</Text>
              </TouchableOpacity>
            <TouchableOpacity style={styles.exportButton} onPress={handleExportToExcel}>
              <Text style={styles.exportButtonText}>📊 Export to CSV</Text>
            </TouchableOpacity>
            </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Total Rides</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>89</Text>
            <Text style={styles.statLabel}>Completed</Text>
                  </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>23</Text>
            <Text style={styles.statLabel}>In Progress</Text>
                  </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>Rs 2456</Text>
            <Text style={styles.statLabel}>Avg. Revenue</Text>
                  </View>
                </View>

        {/* Rides Table */}
        <View style={styles.tableContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text style={styles.loadingText}>Loading rides...</Text>
                        </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>❌ {error}</Text>
              <Text style={styles.errorSubtext}>Please try again later</Text>
                      </View>
          ) : (
            <DataTable
              columns={getTableColumns()}
              data={ridesData || []}
              onRowPress={(ride) => ride && ride.id ? handleViewDetails(ride.id) : null}
              searchPlaceholder="Search rides..."
            />
          )}
        </View>
          </View>
    </AdminLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: '#6B7280',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  createButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  exportButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  exportButtonText: {
    color: '#FFFFFF',
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    marginHorizontal: Spacing.xs,
    padding: Spacing.sm,
    backgroundColor: '#F9FAFB',
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.small,
  },
  statNumber: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    color: '#6B7280',
    textAlign: 'center',
  },
  tableContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    ...Shadows.small,
    width: '100%',
  },
  routeText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: '#111827',
  },
  distanceText: {
    fontSize: FontSizes.xs,
    color: '#6B7280',
  },
  driverText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: '#111827',
  },
  ratingText: {
    fontSize: FontSizes.xs,
    color: '#F59E0B',
  },
  vehicleText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: '#111827',
  },
  licenseText: {
    fontSize: FontSizes.xs,
    color: '#6B7280',
  },
  passengerText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
  },
  statusText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  priceText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: '#10B981',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  loadingText: {
    fontSize: FontSizes.md,
    color: '#6B7280',
    marginTop: Spacing.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  errorText: {
    fontSize: FontSizes.lg,
    color: '#EF4444',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: FontSizes.md,
    color: '#6B7280',
    textAlign: 'center',
  },
});