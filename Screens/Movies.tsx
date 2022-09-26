import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Slide from "../components/Slide";

import HorizontalMedia from "../components/HorizontalMedia";
import VerticalMedia from "../components/VeticalMedia";

const API_KEY = "cea1456ec8c33100855213994b84c765";

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;

const Votes = styled(Overview)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const ListTitle = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "rgba(255, 255, 255, 0.8)" : "white")};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 40px;
`;

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const HMovie = styled.View`
  padding: 0px 30px;
  margin-bottom: 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-vertical: 10px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme() === "dark";
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setloading] = useState(true);

  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const renderVerticalMedia = ({ item }) => (
    <VerticalMedia
      key={item.id}
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );

   const renderHorizontalMedia = ({ item }) => (
     <HorizontalMedia
       key={item.id}
       posterPath={item.poster_path}
       originalTitle={item.original_title}
       overview={item.overview}
       releaseDate={item.release_date}
     />
   );

     const movieKeyExtractor = (item) => item.id + "";


  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };

  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json();
    setUpcoming(results);
  };

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=GB`
      )
    ).json();
    setNowPlaying(results);
  };

  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setloading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGHT / 4,
              marginBottom: 40,
            }}
          >
            {nowPlaying.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>

            <TrendingScroll
              data={trending}
              keyExtractor={movieKeyExtractor}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
              contentContainerStyle={{ paddingLeft: 30 }}
              renderItem={renderVerticalMedia}
            />
          </ListContainer>
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcoming}
      keyExtractor={movieKeyExtractor}
      renderItem={renderHorizontalMedia}
    />
  );
};

export default Movies;

const styles = StyleSheet.create({});
