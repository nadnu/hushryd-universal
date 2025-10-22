// HushRyd-inspired color scheme based on logo background
const tintColorLight = '#32CD32';
const tintColorDark = '#32CD32';

// Currency symbol for Indian Rupee
export const CURRENCY_SYMBOL = '₹';
export const CURRENCY_CODE = 'INR';

export default {
  light: {
    text: '#2E3135',
    background: '#FFFFFF',
    tint: tintColorLight,
    tabIconDefault: '#C4C8CC',
    tabIconSelected: tintColorLight,
    primary: '#32CD32', // HushRyd Lime Green (logo background)
    secondary: '#228B22', // Forest Green (darker variant)
    accent: '#FF8C00', // Orange for highlights
    success: '#32CD32', // Lime Green
    warning: '#FFC107',
    error: '#E63946',
    border: '#E8ECED',
    card: '#FFFFFF',
    cardBackground: '#F7F9FA',
    textSecondary: '#6C7680',
    textTertiary: '#9CA7B0',
    lightGray: '#F7F9FA',
    mediumGray: '#E8ECED',
    darkGray: '#6C7680',
    gradientStart: '#32CD32',
    gradientEnd: '#228B22',
  },
  dark: {
    text: '#FFFFFF',
    background: '#121212',
    tint: tintColorDark,
    tabIconDefault: '#6C7680',
    tabIconSelected: tintColorDark,
    primary: '#32CD32',
    secondary: '#228B22',
    accent: '#FF8C00',
    success: '#32CD32',
    warning: '#FFC107',
    error: '#E63946',
    border: '#2E3135',
    card: '#1E1E1E',
    cardBackground: '#181818',
    textSecondary: '#9CA7B0',
    textTertiary: '#6C7680',
    lightGray: '#2E3135',
    mediumGray: '#3A3F47',
    darkGray: '#9CA7B0',
    gradientStart: '#32CD32',
    gradientEnd: '#228B22',
  },
};
