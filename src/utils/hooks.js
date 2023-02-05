import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { mainAxios } from '../core/axios';

export function useInfiniteScroll({ page: initialPage = 1, data: initialData = [], entity, filters = {}, limit = 10, fetchAtCreated = true }) {
  const [page, setPage] = useState(initialPage);
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [data, setData] = useState(initialData);
  const [totalData, setTotalData] = useState(0);

  const getData = useCallback(async () => {
    const params = {
      page: page,
      limit: limit,
      ...filters,
    };
    setRefreshing(true)
    const { data } = await mainAxios.get(entity, { params });
    setTotalData(data?.totalData || 0);
    setData(data?.data || []);
    setRefreshing(false)
  }, [entity, filters, limit, page]);

  const getRefreshedData = useCallback(async () => {
    const params = {
      //page: 1,s
      //limit: limit,
      ...filters,
    };
    setRefreshing(true);
    console.debug('getRefreshedData');
    const { data } = await mainAxios.get(entity, { params });
    setTotalData(data?.totalData || 0);
    setData(data?.data || []);
    setPage(1);
    setRefreshing(false);
  }, [entity, filters, limit]);

  const getMoreData = useCallback(async () => {
    if (loadMore || totalData <= data.length) {
      return;
    }

    const params = {
      page: page + 1,
      limit: limit,
      ...filters,
    };
    setLoadMore(true);
    const { data } = await mainAxios.get(entity, { params });
    setData((prevState) => _.uniqBy([...prevState, ...(data?.data || [])]));
    setTotalData(data?.totalData || []);
    setPage(page + 1);
    setLoadMore(false);
  }, [data.length, entity, filters, limit, loadMore, page, totalData]);

  useEffect(() => {
    if(fetchAtCreated) {
      getData()
    }
  }, [])

  return {
    getData,
    getRefreshedData,
    getMoreData,
    data,
    totalData,
    refreshing,
  };
}
