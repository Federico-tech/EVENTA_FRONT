import { mainAxios } from '../core/axios';

export const createDiscount = async (data) => {
  console.debug({ discountData: data });
  try {
    const { data: discount } = await mainAxios.post('discount', data);
    console.log({ discount });
    return discount;
  } catch (e) {
    console.log({ errorCreatingDiscount: e });
    return new Promise.reject(e);
  }
};
