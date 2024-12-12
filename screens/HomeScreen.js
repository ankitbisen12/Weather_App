import {
  Image,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import tw from "twrnc";
import { theme } from "../theme";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { debounce } from "lodash";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";
import * as Progress from "react-native-progress";
import { getData, storeData } from "../util/asyncStorage";
import Location from "../Components/Location";
import Degree from "../Components/Degree";
import OtherStats from "../Components/OtherStats";
import ForecastCard from "../Components/ForecastCard";
import { SearchContext } from "../context/SearchContext";

const HomeScreen = () => {
  const [search, setSearch] = useState(false);
  const [locations, setLocation] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const { searchShow, setSearchShow } = useContext(SearchContext);

  const handleLocation = async (loc) => {
    setLocation([]);
    setSearch(false);
    setLoading(true);
    const data = await fetchWeatherForecast({ city: loc, days: "7" });
    console.log(data);
    setWeather(data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    storeData("city", data?.city?.name);
  };

  const handleSearch = async (value) => {
    if (value.length > 2) {
      const data = await fetchLocations({ city: value });
      console.log("loc", data);
      setLocation(data);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    let city = await getData("city");
    let defaultCity = "Bangalore";
    if (city) defaultCity = city;
    const data = await fetchWeatherForecast({
      city: { name: defaultCity },
      days: "7",
    });
    setWeather(data);
    setLoading(false);
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const { current, location } = weather;

  return (
    <View style={[{ backgroundColor: "#093039" }, tw`flex-1 relative`]}>
      {loading ? (
        <View style={tw`flex-1 flex-row justify-center items-center`}>
          <Progress.CircleSnail thickness={10} size={140} color="white" />
        </View>
      ) : (
        <SafeAreaView style={tw`flex flex-1`}>
          <View style={[{ height: "7%" }, tw`mt-4 mx-4 relative z-50`]}>
            <View
              style={[
                tw`flex-row justify-end items-center rounded-full`,
                {
                  backgroundColor: searchShow
                    ? theme.bgWhite(0.2)
                    : "transparent",
                },
              ]}
            >
              {searchShow ? (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search city"
                  placeholderTextColor={tw.color("white")}
                  style={[tw`pl-6 h-10 pb-1 flex-1 text-base text-slate-50`]}
                />
              ) : null}
            </View>
            {locations.length > 0 && search ? (
              <View style={tw`absolute w-full bg-gray-300 top-16 rounded-3xl`}>
                {locations.map((loc, index) => {
                  let showBorder = index + 1 !== locations.length;
                  let borderClass = showBorder
                    ? "border-b-2 border-b-gray-400"
                    : "";

                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleLocation(loc)}
                      style={[
                        tw`flex-row items-center border-0 p-3 px-4 mb-1`,
                        borderClass,
                      ]}
                    >
                      <MapPinIcon size="20" color={tw.color("white")} />
                      <Text style={tw`text-black text-lg ml-2`}>
                        {loc?.name},{loc?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>

          {/* Forecast section */}
          <View style={tw`mx-4 flex justify-around flex-1 mb-2`}>
            <Location city={location?.name} country={location?.country} />
            <Degree
              imageText={current?.condition?.text}
              temp_c={current?.temp_c}
              status={current?.condition?.text}
            />
            {/* Other stats */}
            <OtherStats
              wind={current?.wind_kph}
              humidity={current?.humidity}
              sunrise={weather?.forecast?.forecastday[0]?.astro?.sunrise}
            />

            {/* Forecast for next days */}
            <ForecastCard dayWeatherDetail={weather?.forecast?.forecastday} />
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default HomeScreen;
