import React from "react";
import { View, Image, Text } from "react-native";
import tw from "twrnc";
import { weatherImages } from "../constants/constant";

const Degree = ({ imageText, temp_c, status }) => {
  return (
    <React.Fragment>
      <View style={tw`flex-row justify-center`}>
        <Image source={weatherImages[imageText]} style={tw`w-46 h-46`} />
      </View>
      {/* degree celsius */}
      <View style={tw`space-y-2`}>
        <Text
          style={[
            { fontFamily: "YujiMai-Regular" },
            tw`text-center text-white text-6xl ml-5`,
          ]}
        >
          {temp_c}&#176;
        </Text>
        <Text
          style={[
            { fontFamily: "YujiMai-Regular" },
            tw`text-center text-white text-3xl tracking widest`,
          ]}
        >
          {status}
        </Text>
      </View>
    </React.Fragment>
  );
};

export default Degree;
