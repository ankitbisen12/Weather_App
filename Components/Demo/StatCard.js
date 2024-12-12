import { View, Image, Text } from "react-native";
import tw from "twrnc";

const StatCard = ({ data, data_unit, image,color}) => {
  return (
    <View style={tw`flex-row space-x-2 items-center`}>
      <Image source={image} style={tw`h-6 w-6`} />
      <Text
        style={[
          { fontFamily: "YujiMai-Regular" },
          tw`text-white font-semibold text-xl`,
        ]}
      >
        {data}
        {data_unit}
      </Text>
    </View>
  );
};

export default StatCard;
