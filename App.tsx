import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";

interface IBreadCrumb {
  list: string[];
  height?: number;
  homeEnabled?: boolean;
  textStyle?: object;
  backgroundColor?: string;
  iconColor?: string;
  homeIcon?: any;
  separatorColor?: string;
  onPress: any;
  onPressHome: any;
}

const BreadCrumb = (props: IBreadCrumb) => {
  const {
    list = [],
    height = 30,
    homeEnabled = true,
    textStyle = styles.textStyle,
    backgroundColor = "#e0e0e0",
    iconColor = "white",
    homeIcon = require("./assets/home.png"),
    separatorColor = "white",
    onPress = () => {},
    onPressHome = () => {}
  } = props;

  const renderBreadCrumb = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => onPress(item, index)}
        style={[styles.singleItemStyles, { height }]}
      >
        <Text style={[styles.textStyle, textStyle]}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const renderItemSeparator = () => {
    return (
      <Image
        source={require("./assets/next.png")}
        style={[styles.imageStyle, { tintColor: separatorColor, height }]}
      />
    );
  };

  const renderHorizontalList = () => {
    return (
      <FlatList
        keyExtractor={(item, index) => item + "" + index}
        contentContainerStyle={{
          backgroundColor
        }}
        bounces={false}
        data={list}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderBreadCrumb}
        ItemSeparatorComponent={renderItemSeparator}
      />
    );
  };

  const renderHomeSideMenu = () => {
    return (
      <TouchableOpacity
        onPress={onPressHome}
        style={[styles.homeIconStyle, { height }]}
      >
        <Image
          source={homeIcon}
          style={[styles.imageStyle, { tintColor: iconColor, height }]}
        />
        {renderItemSeparator()}
      </TouchableOpacity>
    );
  };
  return (
    <View style={[styles.container, { height }]}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {homeEnabled && renderHomeSideMenu()}
        {renderHorizontalList()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white"
  },
  singleItemStyles: {
    height: 30,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7,
    alignItems: "center",
    justifyContent: "center"
  },
  homeIconStyle: {
    width: 60,
    marginLeft: 15,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  imageStyle: {
    width: 20,
    maxHeight: 40,
    tintColor: "white",
    alignSelf: "center",
    marginLeft: 10,
    justifyContent: "center"
  },
  textStyle: { textAlign: "center", fontSize: 16 }
});

export default BreadCrumb;
