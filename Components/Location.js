import { View,Text } from 'react-native';
import tw from 'twrnc';
import { MapPinIcon } from "react-native-heroicons/solid";

const Location = ({city,country}) => {
  return (
    <View style={tw`flex flex-row items-center justify-center`}>
      <MapPinIcon size="32"  style={{marginBottom: '4',color:"#fc1e56"}}/>
      <Text
        style={[
          { fontFamily: "YujiMai-Regular" },
          tw`text-white text-center text-4xl `,
        ]}
      >
        {city},
      </Text>
      <Text
        style={[
          { fontFamily: "YujiMai-Regular" },
          tw`text-3xl text-gray-200`,
        ]}
      >
        {country}
      </Text>
    </View>
  );
};

export default Location;
