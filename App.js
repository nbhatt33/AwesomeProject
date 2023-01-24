/**
 * Mobile Apps Project 1 - Noopur S. Bhatt
 * Created application that stores user name and count in firebase
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import firestore from '@react-native-firebase/firestore';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const [name, setName] = useState('');
  const [count, setCount] = useState(0);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View>
          <TextInput
            // this text input will store the name in firebase
            placeholder="Enter Name"
            onChangeText={val => setName(val)}
          />
        </View>
        <View>
          <Button
            title="Add User"
            onPress={async () => {
              await firestore().collection('users').doc('noobs').set(
                {
                  name: name,
                },
                {merge: true},
              );
            }}
          />
        </View>
        <View>
          <Text>{count}</Text>
        </View>
        <View>
          <Button
            // this button will add 1 to the count and store it in firebase
            title="Add Count"
            onPress={async () => {
              setCount(count + 1);
              await firestore().collection('users').doc('noobs').set(
                {
                  count: count,
                },
                {merge: true},
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// current style for prelim app
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 400,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 200,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
