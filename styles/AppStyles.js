// Path: styles/AppStyles.js

import { StyleSheet } from 'react-native';

// Color palette designed for travel themes
export const COLORS = {
  primary: '#3478F6',          // Bright blue - main brand color
  secondary: '#4CAF50',        // Green - represents nature/outdoors
  accent: '#FF9800',           // Orange - for highlights and CTAs
  background: '#F8F9FA',       // Light grey - main background
  card: '#FFFFFF',             // White - card backgrounds
  textPrimary: '#333333',      // Dark grey - primary text
  textSecondary: '#666666',    // Medium grey - secondary text
  textLight: '#FFFFFF',        // White - text on dark backgrounds
  border: '#E1E4E8',           // Light grey - borders
  success: '#4CAF50',          // Green - success indicators
  error: '#FF5252',            // Red - error indicators
  transparent: 'transparent',  // Transparent
  location: '#4CAF50',         // Green dot for location
  rating: '#FFD700',           // Gold for ratings stars
  categoryTag: 'rgba(0,0,0,0.6)', // Semi-transparent black for tags
};

// Font sizes for consistent typography
export const FONTS = {
  extraLarge: 28,
  large: 22,
  medium: 18,
  regular: 16,
  small: 14,
  tiny: 12,
};

// Common spacing values
export const SPACING = {
  tiny: 4,
  small: 8,
  medium: 16,
  large: 20,
  extraLarge: 24,
  section: 30,
};

// Shared border radius values
export const RADIUS = {
  small: 8,
  medium: 12,
  large: 16,
  circle: 9999,
};

// Shadow styles
export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
};

// Common styles that can be reused across components
const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.large,
    marginBottom: SPACING.medium,
  },
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: FONTS.extraLarge,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.large,
    borderRadius: RADIUS.circle,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    marginBottom: SPACING.large,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'outfit',
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.circle,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.textLight,
    fontFamily: 'outfit-medium',
    fontSize: FONTS.regular,
  },
  sectionContainer: {
    marginBottom: SPACING.large,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.large,
    marginBottom: SPACING.small,
  },
  sectionTitle: {
    fontFamily: 'outfit-medium',
    fontSize: FONTS.large,
    color: COLORS.textPrimary,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.medium,
    ...SHADOWS.medium,
    overflow: 'hidden',
  },
  destinationCard: {
    marginRight: SPACING.medium,
    width: 120,
    alignItems: 'center',
  },
  destinationImage: {
    width: 120,
    height: 120,
    borderRadius: RADIUS.medium,
    marginBottom: SPACING.tiny,
  },
  destinationName: {
    fontFamily: 'outfit-medium',
    fontSize: FONTS.regular,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  locationCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.large,
    marginBottom: SPACING.medium,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  locationImage: {
    width: '100%',
    height: 180,
  },
  locationInfo: {
    padding: SPACING.medium,
  },
  locationName: {
    fontFamily: 'outfit-medium',
    fontSize: FONTS.medium,
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  locationDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.location,
    marginRight: SPACING.small,
  },
  locationPlace: {
    fontFamily: 'outfit',
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
  },
  ratingContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: COLORS.categoryTag,
    borderRadius: RADIUS.medium,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingText: {
    color: COLORS.textLight,
    fontFamily: 'outfit-medium',
    fontSize: FONTS.small,
    marginLeft: 3,
  },
  categoryTag: {
    position: 'absolute',
    left: 10,
    top: 10,
    backgroundColor: COLORS.categoryTag,
    borderRadius: RADIUS.small,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryText: {
    color: COLORS.textLight,
    fontFamily: 'outfit',
    fontSize: FONTS.tiny,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.large,
  },
  loadingText: {
    fontFamily: 'outfit',
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.small,
  },
  errorText: {
    fontFamily: 'outfit-medium',
    fontSize: FONTS.small,
    color: COLORS.error,
  },
});

export default CommonStyles;
