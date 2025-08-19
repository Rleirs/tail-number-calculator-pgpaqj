
import { Text, View, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { commonStyles, buttonStyles, colors } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';

export default function HomeScreen() {
  const [tailNumbers, setTailNumbers] = useState<string[]>([]);
  const [newTailNumber, setNewTailNumber] = useState('');

  useEffect(() => {
    console.log('HomeScreen mounted');
    // Load saved tail numbers from storage if needed
    loadTailNumbers();
  }, []);

  const loadTailNumbers = () => {
    // For now, we'll use local state. In a real app, you might use AsyncStorage
    console.log('Loading tail numbers from storage');
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

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Text style={commonStyles.title}>Aircraft Management</Text>
        <Text style={commonStyles.textSecondary}>
          Add aircraft tail numbers and access their calculators
        </Text>

        <View style={[commonStyles.section, { marginTop: 32 }]}>
          <Text style={commonStyles.subtitle}>Add New Aircraft</Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TextInput
              style={[commonStyles.input, { flex: 1 }]}
              placeholder="Enter tail number (e.g., N123AB)"
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
              <Icon name="airplane" size={48} color={colors.textSecondary} />
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
                      <Icon name="airplane" size={24} color={colors.primary} />
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
                          backgroundColor: colors.primary,
                        }}
                      >
                        <Icon name="calculator" size={16} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => removeTailNumber(tailNumber)}
                        style={{
                          padding: 8,
                          borderRadius: 6,
                          backgroundColor: colors.error,
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
