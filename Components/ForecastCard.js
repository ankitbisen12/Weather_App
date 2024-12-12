import { View, Text, ScrollView, Image } from "react-native";
import tw from "twrnc";
import { CalendarDaysIcon } from "react-native-heroicons/outline";
import { theme } from "../theme/index";
import { weatherImages } from "../constants/constant";
import { formatDateToDayMonth } from "../util/DateConversion";

const ForecastCard = ({ dayWeatherDetail }) => {
  return (
    <View style={tw`mb-2`}>
      <View style={tw`flex-row items-center mb-1 `}>
        <CalendarDaysIcon size="26" color="white" />
        <Text
          style={[
            { fontFamily: "YujiMai-Regular" },
            tw`ml-1 text-white text-xl`,
          ]}
        >
          Daily Forecast
        </Text>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        {dayWeatherDetail?.map((item, index) => {
          let date = new Date(item.date);
        //   console.log(date);
          let options = { weekday: "long" };
          let dayName = date.toLocaleDateString("en-US", options);
          dayName = dayName.split(",")[0];

          return (
            <View
              key={index}
              style={[
                tw`flex justify-center items-center w-28 mr-2 rounded-3xl py-3`,
                { backgroundColor: theme.bgWhite(0.15) },
                { marginVertical: 8 },
              ]}
            >
              <Image
                source={weatherImages[item?.day?.condition?.text]}
                style={tw`h-11 w-11`}
              />
              <Text style={[{ fontFamily: "YujiMai-Regular" }, tw`text-white`]}>
                {dayName}
              </Text>
              <Text style={[{ fontFamily: "YujiMai-Regular" }, tw`text-white`]}>
                {formatDateToDayMonth(date)}
              </Text>
              <Text
                style={[
                  { fontFamily: "YujiMai-Regular" },
                  tw`text-white font-semibold text-xl`,
                ]}
              >
                {item?.day?.avgtemp_c}&#176;
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ForecastCard;
