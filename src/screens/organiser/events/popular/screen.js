import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { Container, EventCard, Header, HomeTop, ListEmptyComponent, MiniEventCard } from '../../../../components'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import { useInfiniteScroll } from '../../../../utils/hooks'
import { SIZE } from '../../../../utils/theme'
import _ from 'lodash'

export const PopularEventsScreen = () => {

  const { data, getMoreData, loadMore, refreshing, getRefreshedData } = useInfiniteScroll({
    entity: 'events'
  })

  return (
    <Container>
      <Header back title={'Popular events'}/>
      <FlatList
        data={data}
        renderItem={({ item }) => <MiniEventCard data={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        onEndReached={_.throttle(getMoreData, 400)}
        ListFooterComponent={<View style={{ marginTop: SIZE }}>{loadMore && <ActivityIndicator />}</View>}
        ListEmptyComponent={!refreshing && <ListEmptyComponent text="No upcoming events" />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshedData} />}
      />
    </Container>
  )
}