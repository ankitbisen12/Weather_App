import { View, Image, Text } from "react-native";
import tw from "twrnc";
import StatCard from "./Demo/StatCard";

const img = {
  wind: require("../assets/icons/wind.png"),
  drop: require("../assets/icons/drop.png"),
  sun: require("../assets/icons/sun.png"),
};

const OtherStats = ({ wind, humidity, sunrise }) => {
  return (
    <View style={tw`flex-row justify-between mx-4`}>
      <StatCard image={img.wind} data={wind} data_unit="km" />
      <StatCard image={img.drop} data={humidity} data_unit="%" />
      <StatCard image={img.sun} data={sunrise} data_unit="" />
    </View>
  );
};

export default OtherStats;
