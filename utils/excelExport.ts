import * as XLSX from 'xlsx';
import { Alert, Platform } from 'react-native';
import RNFS from 'react-native-fs';

export interface ExcelExportOptions {
  filename: string;
  sheetName?: string;
  headers: string[];
  data: any[][];
}

export const exportToExcel = async (options: ExcelExportOptions): Promise<void> => {
  try {
    const { filename, sheetName = 'Sheet1', headers, data } = options;
    
    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    
    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, { 
      type: 'buffer', 
      bookType: 'xlsx' 
    });
    
    // Convert buffer to base64
    const base64Data = excelBuffer.toString('base64');
    
    // Define file path
    const fileName = `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`;
    const filePath = Platform.OS === 'ios' 
      ? `${RNFS.DocumentDirectoryPath}/${fileName}`
      : `${RNFS.ExternalDirectoryPath}/${fileName}`;
    
    // Write file
    await RNFS.writeFile(filePath, base64Data, 'base64');
    
    // Show success message
    Alert.alert(
      'Export Successful',
      `Excel file saved as: ${fileName}`,
      [{ text: 'OK' }]
    );
    
  } catch (error) {
    console.error('Excel export error:', error);
    Alert.alert(
      'Export Failed',
      'Failed to export data to Excel. Please try again.',
      [{ text: 'OK' }]
    );
  }
};

// Helper function to format data for Excel export
export const formatRidesDataForExcel = (rides: any[]) => {
  const headers = [
    'Ride ID',
    'From',
    'To', 
    'Distance',
    'Driver Name',
    'Driver Phone',
    'Driver Rating',
    'Vehicle Make',
    'Vehicle Model',
    'License Plate',
    'Passengers Count',
    'Average Rating',
    'Status',
    'Price',
    'Date',
    'Time'
  ];
  
  const data = rides.map(ride => [
    ride.id || 'N/A',
    ride.from || 'N/A',
    ride.to || 'N/A',
    ride.distance || 'N/A',
    ride.driver?.name || 'N/A',
    ride.driver?.phone || 'N/A',
    ride.driver?.rating || 'N/A',
    ride.vehicle?.make || 'N/A',
    ride.vehicle?.model || 'N/A',
    ride.vehicle?.licensePlate || 'N/A',
    ride.passengers?.length || 0,
    ride.averageRating || 'N/A',
    ride.status || 'N/A',
    ride.price || 'N/A',
    ride.date || 'N/A',
    ride.time || 'N/A'
  ]);
  
  return { headers, data };
};

// Helper function to format bookings data for Excel export
export const formatBookingsDataForExcel = (bookings: any[]) => {
  const headers = [
    'Booking ID',
    'Passenger Name',
    'Passenger Phone',
    'Passenger Email',
    'Car Number',
    'Car Owner',
    'Car Owner Phone',
    'Ride ID',
    'From',
    'To',
    'Pickup Location',
    'Drop Location',
    'Booking Date',
    'Ride Date',
    'Ride Time',
    'Seats Booked',
    'Total Amount',
    'Status',
    'Payment Status',
    'Special Requests',
    'Feedback Rating',
    'Feedback Comment',
    'Created At',
    'Updated At'
  ];
  
  const data = bookings.map(booking => [
    booking.id || 'N/A',
    booking.passengerName || 'N/A',
    booking.passengerPhone || 'N/A',
    booking.passengerEmail || 'N/A',
    booking.carNumber || 'N/A',
    booking.carOwner || 'N/A',
    booking.carOwnerPhone || 'N/A',
    booking.rideId || 'N/A',
    booking.from || 'N/A',
    booking.to || 'N/A',
    booking.pickupLocation || 'N/A',
    booking.dropLocation || 'N/A',
    booking.bookingDate || 'N/A',
    booking.rideDate || 'N/A',
    booking.rideTime || 'N/A',
    booking.seatsBooked || 0,
    booking.totalAmount || 0,
    booking.status || 'N/A',
    booking.paymentStatus || 'N/A',
    booking.specialRequests || 'N/A',
    booking.feedback?.rating || 'N/A',
    booking.feedback?.comment || 'N/A',
    booking.createdAt || 'N/A',
    booking.updatedAt || 'N/A'
  ]);
  
  return { headers, data };
};
