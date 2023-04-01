import { mainAxios } from '../core/axios';

export const createScan = async (data) => {
  console.debug({ scanData: data });
  try {
    const { data: scan } = await mainAxios.post('scans', data);
    console.log({ scan });
    return scan;
  } catch (e) {
    console.log({ errorCreatingScan: e });
    return new Promise.reject(e);
  }
};
