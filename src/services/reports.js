import { mainAxios } from "../core/axios";

export const report = async (data) => {
  console.debug({ report: data });
  try {
    const { date: reportCreated } = await mainAxios.post('reports', data);
    console.log({ reportCreated });
  } catch (e) {
    console.log({ errorCreateReport: { e } });
  }
};