import React from "react";
import { FlatList, View, Text } from "react-native";

const ToDoList = ({ eventsList }) => {
  var listClone = eventsList.slice(0);
  var sortedList = [];
  for (var i = 0; i < listClone.length; i++) {
    if (eventsList[i].category.type === "task") {
      sortedList.push(listClone[i]);
    }
  }
  if (sortedList.length > 0) {
    //sort by time then day then month
    for (var i = 1; i < listClone.length; i++) {
      var key = listClone[i];
      var j = i - 1;
      while (j >= 0 && listClone[j].dueTime > key.dueTime) {
        listClone[j + 1] = listClone[j];
        j = j - 1;
      }
      listClone[j + 1] = key;
    }
    for (var i = 1; i < listClone.length; i++) {
      var key = listClone[i];
      var j = i - 1;
      while (j >= 0 && listClone[j].dueDate > key.dueDate) {
        listClone[j + 1] = listClone[j];
        j = j - 1;
      }
      listClone[j + 1] = key;
    }
    for (var i = 1; i < listClone.length; i++) {
      var key = listClone[i];
      var j = i - 1;
      while (
        j >= 0 &&
        listClone[j].dueDate.substring(8, 10) > key.dueDate.substring(8, 10)
      ) {
        listClone[j + 1] = listClone[j];
        j = j - 1;
      }
      listClone[j + 1] = key;
    }
  }
  return (
    <View style={styles.viewStyle}>
      <FlatList
        keyExtractor={item => item.key}
        data={sortedList}
        style={styles.listStyle}
        renderItem={item => {
          return (
            <View style={styles.taskStyle}>
              <Text>{item.content}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};
const styles = {
  taskStyle: {
    height: 40,
    alignSelf: "stretch",
    backgroundColor: "yellow",
    borderRadius: 100
  },
  listStyle: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: "#F53B57"
  },
  viewStyle: {
    height: 300,
    alignItems: "stretch",
    backgroundColor: "red",
    marginTop: 80,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 100
  }
};

export default ToDoList;
