
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { commonStyles, buttonStyles, colors } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';

// Store input values per tail number to persist across navigation
const inputStorage: { [key: string]: string } = {};

export default function CalculatorScreen() {
  const { tailNumber } = useLocalSearchParams<{ tailNumber: string }>();
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [showAdditionalResults, setShowAdditionalResults] = useState(false);

  useEffect(() => {
    console.log('Calculator screen opened for:', tailNumber);
    
    // Restore the input value for this tail number if it exists
    if (tailNumber && inputStorage[tailNumber]) {
      const savedInput = inputStorage[tailNumber];
      setInputValue(savedInput);
      calculateResult(savedInput);
      console.log('Restored input value:', savedInput, 'for tail number:', tailNumber);
    }
  }, [tailNumber]);

  // Save input value whenever it changes
  useEffect(() => {
    if (tailNumber) {
      inputStorage[tailNumber] = inputValue;
      console.log('Saved input value:', inputValue, 'for tail number:', tailNumber);
    }
  }, [inputValue, tailNumber]);

  const calculateResult = (value: string) => {
    const number = parseFloat(value);
    if (isNaN(number) || value === '') {
      setResult(null);
      console.log('Invalid input or empty:', value);
      return;
    }

    // Formula: (number / 2) - 50
    const calculatedResult = (number / 2) - 50;
    setResult(calculatedResult);
    console.log('Calculated result:', calculatedResult, 'for input:', number);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    // Calculate instantly as user types
    calculateResult(value);
  };

  const toggleAdditionalResults = () => {
    setShowAdditionalResults(!showAdditionalResults);
    console.log('Toggled additional results:', !showAdditionalResults);
  };

  const clearCalculation = () => {
    setInputValue('');
    setResult(null);
    setShowAdditionalResults(false);
    
    // Clear the stored value for this tail number
    if (tailNumber) {
      delete inputStorage[tailNumber];
      console.log('Cleared stored input for tail number:', tailNumber);
    }
    
    console.log('Cleared calculation');
  };

  const goBack = () => {
    console.log('Navigating back to home');
    router.back();
  };

  const leftResult = result !== null ? result + 100 : null;
  const rightResult = result !== null ? result - 100 : null;

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={goBack} style={{ padding: 4 }}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>
          Calculator - {tailNumber}
        </Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Input Section */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Enter Number</Text>
          <TextInput
            style={[commonStyles.input, { fontSize: 18, textAlign: 'center' }]}
            placeholder="Enter a number"
            value={inputValue}
            onChangeText={handleInputChange}
            keyboardType="numeric"
          />
        </View>

        {/* Main Result */}
        {result !== null && (
          <View style={commonStyles.resultCard}>
            <Text style={commonStyles.resultLabel}>Result</Text>
            <Text style={commonStyles.resultText}>
              {result.toFixed(2)}
            </Text>
          </View>
        )}

        {/* Additional Results Toggle */}
        {result !== null && (
          <View style={commonStyles.section}>
            <Button
              text={showAdditionalResults ? "Hide Additional Results" : "Show Additional Results"}
              onPress={toggleAdditionalResults}
              style={buttonStyles.secondary}
              textStyle={{ color: colors.primary }}
            />
          </View>
        )}

        {/* Additional Results */}
        {result !== null && showAdditionalResults && (
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { textAlign: 'center', marginBottom: 20 }]}>
              Additional Results
            </Text>
            
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {/* Left Result (+100) */}
              <View style={[commonStyles.resultCard, { flex: 1 }]}>
                <Text style={commonStyles.resultLabel}>Result + 100</Text>
                <Text style={[commonStyles.resultText, { fontSize: 24 }]}>
                  {leftResult?.toFixed(2)}
                </Text>
              </View>

              {/* Right Result (-100) */}
              <View style={[commonStyles.resultCard, { flex: 1 }]}>
                <Text style={commonStyles.resultLabel}>Result - 100</Text>
                <Text style={[commonStyles.resultText, { fontSize: 24 }]}>
                  {rightResult?.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Clear Button */}
        {(inputValue || result !== null) && (
          <View style={[commonStyles.section, { marginTop: 32 }]}>
            <Button
              text="Clear All"
              onPress={clearCalculation}
              style={buttonStyles.secondary}
              textStyle={{ color: colors.textSecondary }}
            />
          </View>
        )}

        {/* Spacer for bottom */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
