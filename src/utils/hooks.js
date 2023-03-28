import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { mainAxios } from '../core/axios';
import { nextTick } from '../utils';

export function useInfiniteScroll({
  page: initialPage = 1,
  data: initialData = [],
  entity,
  filters = {},
  limit = 10,
  onUpdateData,
  debug = false,
  fetchOnCreate = true,
  onRefresh,
}) {
  const [page, setPage] = useState(initialPage);
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [data, setData] = useState(initialData);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    console.debug('loadMoreChangd', loadMore);
  }, [loadMore]);

  const getData = useCallback(
    async (overrideFilter = {}) => {
      try {
        setRefreshing(() => true);
        const params = {
          page,
          limit,
          count: true,
          ...filters,
          ...overrideFilter,
        };
        const { data: result } = await mainAxios.get(entity, { params });
        debug && console.debug({ getData: result, params });
        const totalData = result?.totalData || 0;
        const data = result?.data || [];
        setTotalData(totalData);
        setData(data);
        nextTick(() => setRefreshing(false));
      } catch (e) {
        debug && console.log({ errorGetData: e });
        setRefreshing(false);
      }
    },
    [entity, filters, limit, page]
  );

  const getRefreshedData = useCallback(async () => {
    if (onRefresh) {
      onRefresh();
    }
    try {
      const params = {
        page: 1,
        count: true,
        limit,
        ...filters,
      };
      setRefreshing(true);

      const { data: result } = await mainAxios.get(entity, { params });
      debug && console.debug({ getRefreshedData: result, params });
      const totalData = result?.totalData || 0;
      const data = result?.data || [];
      setTotalData(totalData);
      setData(data);
      setPage(1);
      nextTick(() => setRefreshing(false));
    } catch (e) {
      debug && console.log({ errorGetData: e });
    }
  }, [entity, filters, limit, onRefresh]);

  const getMoreData = async () => {
    console.debug('getMoreData', data, loadMore, refreshing, totalData);
    if (loadMore || refreshing || data.length >= totalData) {
      debug && console.debug('loadMore return', loadMore, refreshing, totalData, data.length);
      return;
    }

    try {
      setLoadMore(true);
      const params = {
        page: page + 1,
        limit,
        count: true,
        ...filters,
      };
      const { data: result } = await mainAxios.get(entity, { params });
      debug && console.debug({ loadMore: result, params });
      const totalData = result?.totalData || 0;
      const data = result?.data || [];
      setData((prevState) => [...prevState, ...data]);
      setTotalData(totalData);
      setPage(page + 1);
      nextTick(() => setLoadMore(false));
    } catch (e) {
      nextTick(() => setLoadMore(false));
      debug && console.log({ errorLoadMore: e });
    }
  };

  useEffect(() => {
    if (fetchOnCreate) {
      getData();
    }
  }, [fetchOnCreate]);

  return {
    getData,
    getRefreshedData,
    getMoreData,
    data,
    totalData,
    refreshing,
    loadMore,
    setData,
  };
}
