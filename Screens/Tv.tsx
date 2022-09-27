import React from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import { RefreshControl } from "react-native";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import VerticalMedia from "../components/VeticalMedia";
import HorizonalList from "../components/HorizontalList";
const Tv = () => {
    const queryClient = useQueryClient();

  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefetching,
  } = useQuery(["tv", "today"], tvApi.airingToday);
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefetching,
  } = useQuery(["tv", "top"], tvApi.topRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery(["tv", "trending"], tvApi.trending);
  const loading = todayLoading || topLoading || trendingLoading;
    const refreshing = todayRefetching || topRefetching || trendingRefetching;

  if (loading) {
    return <Loader />;
  }

   const onRefresh = () => {
     queryClient.refetchQueries(["tv"]);
   };

  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 30 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HorizonalList title="Trending TV" data={trendingData.results} />
      <HorizonalList title="Airing Today" data={todayData.results} />
      <HorizonalList title="Top Rated TV" data={topData.results} />
    </ScrollView>
  );
};

export default Tv;

const styles = StyleSheet.create({});
