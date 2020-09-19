import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";

import { QUESTIONS } from "../data/dummy-data";
import QuestionList from "../components/QuestionList";
import Colors from "../constants/Colors";

const HomeScreen = (props) => {
  //let questions = QUESTIONS.map(item => (( ));
  //posts older than 3 days aren't displayed
  const three_days_ago = 3 * 24 * 60 * 60 * 1000;

  const questions = QUESTIONS.filter(
    (item) => new Date() - item.date < three_days_ago
  ).sort((a, b) => a.upvotes < b.upvotes);

  return (
    <View style={styles.container}>
      <View style={styles.insideContainer}>
        <QuestionList
          questions={questions}
          navigation={props.navigation}
          routeName="Home"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  insideContainer: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },
});

export default HomeScreen;
