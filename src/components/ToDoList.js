import React from "react";
import { FlatList, View, Text } from "react-native";
import { IconButton, context } from "./common";

const ToDoList = ({ eventsList, context }) => {
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
      <View>
        <Text
          style={{
            textDecorationLine: "underline",
            color: "white",
            fontSize: 40
          }}
        >
          To-Do List
        </Text>
      </View>
      <FlatList
        keyExtractor={item => item.key}
        data={sortedList}
        style={styles.listStyle}
        renderItem={item => {
          return (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "transparent",
                alignItems: "center"
              }}
            >
              <IconButton
                iconName={"check-circle-o"}
                size={30}
                color={"white"}
                onPress={() => {
                  context.deleteEvent(sortedList[item.index]);
                  context.divideEvents();
                }}
              />
              <View style={styles.taskStyle}>
                <Text style={{ color: "white", fontSize: 20 }}>
                  {sortedList[item.index].content}
                </Text>
                <Text style={{ color: "#e6e6e6" }}>
                  by {sortedList[item.index].dueDate}{" "}
                  {sortedList[item.index].dueTime}
                </Text>
              </View>
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
    backgroundColor: "transparent",
    // borderColor: "white",
    // borderBottomWidth: 2,
    width: 230,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  listStyle: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: "#F53B57"
  },
  viewStyle: {
    height: 340,
    alignItems: "stretch",
    backgroundColor: "#F53B57",
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  }
};

export default ToDoList;
