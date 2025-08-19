
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Theme } from '../contexts/ThemeContext';

// Default colors for fallback (light theme)
export const colors = {
  primary: '#2563eb',
  secondary: '#1d4ed8',
  accent: '#3b82f6',
  background: '#ffffff',
  backgroundAlt: '#f8fafc',
  text: '#1f2937',
  textSecondary: '#6b7280',
  grey: '#e5e7eb',
  card: '#ffffff',
  border: '#d1d5db',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

export const createButtonStyles = (theme: Theme) => StyleSheet.create({
  primary: {
    backgroundColor: theme.primary,
    alignSelf: 'center',
    width: '100%',
  },
  secondary: {
    backgroundColor: theme.backgroundAlt,
    borderWidth: 1,
    borderColor: theme.border,
    alignSelf: 'center',
    width: '100%',
  },
  danger: {
    backgroundColor: theme.error,
    alignSelf: 'center',
    width: '100%',
  },
});

export const createCommonStyles = (theme: Theme) => StyleSheet.create({
  wrapper: {
    backgroundColor: theme.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: theme.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.text,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: theme.text,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: theme.textSecondary,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 16,
  },
  card: {
    backgroundColor: theme.card,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: theme.background,
    color: theme.text,
  },
  inputFocused: {
    borderColor: theme.primary,
    boxShadow: '0px 0px 0px 3px rgba(37, 99, 235, 0.1)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    backgroundColor: theme.background,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.text,
    marginLeft: 16,
  },
  resultCard: {
    backgroundColor: theme.backgroundAlt,
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.primary,
    textAlign: 'center',
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.textSecondary,
    marginBottom: 8,
  },
});

// Legacy exports for backward compatibility
export const buttonStyles = {
  primary: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  secondary: {
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: 'center',
    width: '100%',
  },
  danger: {
    backgroundColor: colors.error,
    alignSelf: 'center',
    width: '100%',
  },
};

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.background,
    color: colors.text,
  },
  inputFocused: {
    borderColor: colors.primary,
    boxShadow: '0px 0px 0px 3px rgba(37, 99, 235, 0.1)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 16,
  },
  resultCard: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 8,
  },
});
