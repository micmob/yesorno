import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useSelector } from 'react-redux';

import QuestionList from "../components/QuestionList";
import Colors from "../constants/Colors";
import CategoryHeader from "../components/CategoryHeader";

const CategoryScreen = (props) => {
  const questions = useSelector(state => state.questions.allQuestions).filter(
    (item) => item.catId.find(catId => catId === props.route.params.id)).sort((a, b) => a.upvotes < b.upvotes);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <CategoryHeader id={props.route.params.id} />
      </View>
      <View style={styles.insideContainer}>
        <QuestionList
          questions={questions}
          navigation={props.navigation}
          routeName="Category"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.backgroundColor,
  },
  container: {
    backgroundColor: Colors.backgroundColor,
  },
  insideContainer: {
    flex: 1,
    //backgroundColor: 'red'
  },
});

export default CategoryScreen;
