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
      page,
      limit,
      ...filters,
    };
    setRefreshing(true);
    const { data: result } = await mainAxios.get(entity, { params });
    console.log('getData', { result });
    setTotalData(result?.totalData || 0);
    setData(result?.data || []);
    setRefreshing(false);
  }, [entity, filters, limit, page]);

  const getRefreshedData = useCallback(async () => {
    const params = {
      page,
      limit,
      ...filters,
    };
    setRefreshing(true);
    const { data: result } = await mainAxios.get(entity, { params });
    console.log('getRefreshedData', { result });
    setTotalData(_.get(result, 'totalData', 0));
    setData(() => _.get(result, 'data', []));
    setPage(1);
    setRefreshing(false);
  }, [entity, filters, limit]);

  const getMoreData = useCallback(async () => {
    console.debug('getMoreData', loadMore, totalData, data.length);
    if (_.isEmpty(data)) {
      return;
    }
    if (refreshing) {
      return;
    }
    if (loadMore) {
      return;
    }
    if (totalData <= data.length) {
      return;
    }

    const params = {
      page: page + 1,
      limit,
      ...filters,
    };
    setLoadMore(true);
    const { data: result } = await mainAxios.get(entity, { params });
    console.debug('getMoreData', result);
    setData((prevState) => _.uniqBy([...prevState, ...(result?.data || [])], '_id'));
    setTotalData(result?.totalData || 0);
    setPage(page + 1);
    setLoadMore(false);
  }, [data.length, entity, filters, limit, loadMore, page, totalData]);

  useEffect(() => {
    if (fetchAtCreated) {
      getData();
    }
  }, []);

  return {
    getData,
    getRefreshedData,
    getMoreData,
    data,
    totalData,
    loadMore,
    refreshing,
  };
}
