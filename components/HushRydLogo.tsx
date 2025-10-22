import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontSizes, Spacing } from '../constants/Design';

interface HushRydLogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'horizontal' | 'vertical' | 'icon-only';
  color?: string;
  showBackground?: boolean;
  backgroundColor?: string;
  shadow?: boolean;
}

export default function HushRydLogo({ 
  size = 'medium', 
  variant = 'horizontal', 
  color = '#084F8D',
  showBackground = false,
  backgroundColor = '#32CD32',
  shadow = false
}: HushRydLogoProps) {
  
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          carIcon: FontSizes.small,
          pinIcon: FontSizes.tiny,
          text: FontSizes.small,
          spacing: Spacing.tiny,
          containerPadding: Spacing.tiny,
        };
      case 'large':
        return {
          carIcon: FontSizes.extraLarge * 2,
          pinIcon: FontSizes.large,
          text: FontSizes.extraLarge * 1.5,
          spacing: Spacing.medium,
          containerPadding: Spacing.medium,
        };
      default: // medium
        return {
          carIcon: FontSizes.large,
          pinIcon: FontSizes.small,
          text: FontSizes.large,
          spacing: Spacing.small,
          containerPadding: Spacing.small,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  const renderCarIcon = () => (
    <Text style={[styles.carIcon, { fontSize: sizeStyles.carIcon, color }]}>
      🚗
    </Text>
  );

  const renderTextSection = () => (
    <View style={[styles.textContainer, { gap: sizeStyles.spacing / 2 }]}>
      <Text style={[styles.pinIcon, { fontSize: sizeStyles.pinIcon, color }]}>
        📍
      </Text>
      <Text style={[styles.logoText, { fontSize: sizeStyles.text, color }]}>
        HushRyd
      </Text>
    </View>
  );

  const renderContent = () => {
    switch (variant) {
      case 'vertical':
        return (
          <View style={[styles.verticalLayout, { gap: sizeStyles.spacing }]}>
            {renderCarIcon()}
            {renderTextSection()}
          </View>
        );
      case 'icon-only':
        return renderCarIcon();
      default: // horizontal
        return (
          <View style={[styles.horizontalLayout, { gap: sizeStyles.spacing }]}>
            {renderCarIcon()}
            {renderTextSection()}
          </View>
        );
    }
  };

  return (
    <View style={[
      styles.container, 
      { 
        padding: sizeStyles.containerPadding,
        backgroundColor: showBackground ? backgroundColor : 'transparent',
        borderRadius: showBackground ? 8 : 0,
        shadowColor: shadow ? '#000' : 'transparent',
        shadowOffset: shadow ? { width: 0, height: 2 } : { width: 0, height: 0 },
        shadowOpacity: shadow ? 0.1 : 0,
        shadowRadius: shadow ? 4 : 0,
        elevation: shadow ? 3 : 0,
      }
    ]}>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalLayout: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  carIcon: {
    fontWeight: 'normal',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinIcon: {
    marginRight: 2,
  },
  logoText: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
