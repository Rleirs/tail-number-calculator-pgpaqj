
import { Text, View, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createCommonStyles, createButtonStyles } from '../styles/commonStyles';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/Button';
import Icon from '../components/Icon';

const STORAGE_KEY = 'aircraft_tail_numbers';

export default function HomeScreen() {
  const [tailNumbers, setTailNumbers] = useState<string[]>([]);
  const [newTailNumber, setNewTailNumber] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const commonStyles = createCommonStyles(theme);
  const buttonStyles = createButtonStyles(theme);

  useEffect(() => {
    console.log('HomeScreen mounted');
    loadTailNumbers();
  }, []);

  // Save tail numbers to AsyncStorage whenever the list changes
  useEffect(() => {
    if (!isLoading) {
      saveTailNumbers();
    }
  }, [tailNumbers, isLoading]);

  const loadTailNumbers = async () => {
    try {
      console.log('Loading tail numbers from storage');
      const storedTailNumbers = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTailNumbers) {
        const parsedTailNumbers = JSON.parse(storedTailNumbers);
        setTailNumbers(parsedTailNumbers);
        console.log('Loaded tail numbers:', parsedTailNumbers);
      } else {
        console.log('No stored tail numbers found');
      }
    } catch (error) {
      console.error('Error loading tail numbers:', error);
      Alert.alert('Error', 'Failed to load saved aircraft list');
    } finally {
      setIsLoading(false);
    }
  };

  const saveTailNumbers = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tailNumbers));
      console.log('Saved tail numbers to storage:', tailNumbers);
    } catch (error) {
      console.error('Error saving tail numbers:', error);
      Alert.alert('Error', 'Failed to save aircraft list');
    }
  };

  const addTailNumber = () => {
    if (newTailNumber.trim() === '') {
      Alert.alert('Error', 'Please enter a valid tail number');
      return;
    }

    if (tailNumbers.includes(newTailNumber.trim().toUpperCase())) {
      Alert.alert('Error', 'This tail number already exists');
      return;
    }

    const formattedTailNumber = newTailNumber.trim().toUpperCase();
    setTailNumbers([...tailNumbers, formattedTailNumber]);
    setNewTailNumber('');
    console.log('Added tail number:', formattedTailNumber);
  };

  const removeTailNumber = (tailNumber: string) => {
    Alert.alert(
      'Remove Aircraft',
      `Are you sure you want to remove ${tailNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setTailNumbers(tailNumbers.filter(tn => tn !== tailNumber));
            console.log('Removed tail number:', tailNumber);
          }
        }
      ]
    );
  };

  const navigateToCalculator = (tailNumber: string) => {
    console.log('Navigating to calculator for:', tailNumber);
    router.push(`/calculator?tailNumber=${encodeURIComponent(tailNumber)}`);
  };

  if (isLoading) {
    return (
      <View style={[commonStyles.container, commonStyles.centerContent]}>
        <Icon name="airplane" size={48} color={theme.primary} />
        <Text style={[commonStyles.text, { marginTop: 16 }]}>Loading aircraft...</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>
        {/* Header with theme toggle */}
        <View style={[commonStyles.row, { marginBottom: 24 }]}>
          <View style={{ flex: 1 }}>
            <Text style={commonStyles.title}>Aircraft Management</Text>
            <Text style={commonStyles.textSecondary}>
              Add aircraft tail numbers and access their calculators
            </Text>
          </View>
          <TouchableOpacity
            onPress={toggleTheme}
            style={{
              padding: 12,
              borderRadius: 8,
              backgroundColor: theme.backgroundAlt,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <Icon 
              name={isDarkMode ? "sunny" : "moon"} 
              size={24} 
              color={theme.text} 
            />
          </TouchableOpacity>
        </View>

        <View style={[commonStyles.section, { marginTop: 8 }]}>
          <Text style={commonStyles.subtitle}>Add New Aircraft</Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TextInput
              style={[commonStyles.input, { flex: 1 }]}
              placeholder="Enter tail number (e.g., N123AB)"
              placeholderTextColor={theme.textSecondary}
              value={newTailNumber}
              onChangeText={setNewTailNumber}
              autoCapitalize="characters"
              onSubmitEditing={addTailNumber}
            />
            <Button
              text="Add"
              onPress={addTailNumber}
              style={[buttonStyles.primary, { width: 80, minWidth: 80 }]}
            />
          </View>
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Aircraft List</Text>
          {tailNumbers.length === 0 ? (
            <View style={[commonStyles.card, commonStyles.centerContent, { padding: 40 }]}>
              <Icon name="airplane" size={48} color={theme.textSecondary} />
              <Text style={[commonStyles.textSecondary, { marginTop: 16, textAlign: 'center' }]}>
                No aircraft added yet.{'\n'}Add your first tail number above.
              </Text>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {tailNumbers.map((tailNumber, index) => (
                <TouchableOpacity
                  key={index}
                  style={commonStyles.card}
                  onPress={() => navigateToCalculator(tailNumber)}
                  activeOpacity={0.7}
                >
                  <View style={commonStyles.row}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                      <Icon name="airplane" size={24} color={theme.primary} />
                      <View style={{ marginLeft: 12 }}>
                        <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                          {tailNumber}
                        </Text>
                        <Text style={commonStyles.textSecondary}>
                          Tap to open calculator
                        </Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <TouchableOpacity
                        onPress={() => navigateToCalculator(tailNumber)}
                        style={{
                          padding: 8,
                          borderRadius: 6,
                          backgroundColor: theme.primary,
                        }}
                      >
                        <Icon name="calculator" size={16} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => removeTailNumber(tailNumber)}
                        style={{
                          padding: 8,
                          borderRadius: 6,
                          backgroundColor: theme.error,
                        }}
                      >
                        <Icon name="trash" size={16} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
}
