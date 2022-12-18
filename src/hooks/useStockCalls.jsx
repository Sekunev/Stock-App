import { useDispatch } from "react-redux";
import {
  fetchStart,
  fetchFail,
  getSuccess,
  getProCatBrandsSuccess,
  getAllStockSuccess,
} from "../features/stockSlice";
import useAxios from "./useAxios";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useStockCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  //!------------- GET CALLS ----------------
  const getStockData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`stock/${url}/`);
      dispatch(getSuccess({ data, url }));
      // server'dan gelen data dispatch ile stockSlicedeki state gönderiliyor ve state güncelleniyor.
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };
  const getBrands = () => getStockData("brands");
  const getFirms = () => getStockData("firms");
  const getProducts = () => getStockData("products");
  const getSales = () => getStockData("sales");
  const getPurchases = () => getStockData("purchases");

  //!------------- GET CALLS (Promise.all -->
  // Aşağıdaki gibi Apiden aynı anda veri çekme işleminin süresi veri çeken fonksiyonun async yapıda olması nedeniyle 3 isteğin ayrı ayrı çekme işleminin toplamı kadardır.
  // Bu süreyi kısaltmak için Promise.all() kullanılır.
  const getProCatBrands = async () => {
    dispatch(fetchStart());
    try {
      const [products, categories, brands] = await Promise.all([
        axiosWithToken.get("stock/products/"),
        axiosWithToken.get("stock/categories/"),
        axiosWithToken.get("stock/brands/"),
      ]);

      dispatch(
        getProCatBrandsSuccess([products?.data, categories?.data, brands?.data])
      );
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  const getAllStockData = async () => {
    dispatch(fetchStart());
    try {
      const [purchases, firms, brands, sales, products, categories] =
        await Promise.all([
          axiosWithToken.get("/stock/purchases"),
          axiosWithToken.get("/stock/firms"),
          axiosWithToken.get("/stock/brands"),
          axiosWithToken.get("/stock/sales"),
          axiosWithToken.get("/stock/products"),
          axiosWithToken.get("/stock/categories"),
        ]);
      dispatch(
        getAllStockSuccess([
          purchases.data,
          firms.data,
          brands.data,
          sales.data,
          products.data,
          categories.data,
        ])
      );
    } catch (err) {
      dispatch(fetchFail());
    }
  };

  //!------------- POST CALLS ----------------
  const postStockData = async (info, url) => {
    try {
      await axiosWithToken.post(`stock/${url}/`, info);
      toastSuccessNotify(`${url} Successfuly added`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} Can not be added`);
    }
  };
  const postBrand = (info) => postStockData(info, "brands");
  const postFirm = (info) => postStockData(info, "firms");
  const postProduct = (info) => postStockData(info, "products");
  const postSale = (info) => postStockData(info, "sales");
  const postPurchase = (info) => postStockData(info, "purchases");

  //!------------- PUT CALLS ----------------

  const putStockData = async (info, url) => {
    try {
      await axiosWithToken.put(`stock/${url}/${info.id}/`, info);
      toastSuccessNotify(`${url} Successfuly update`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} Can not be update`);
    }
  };

  const putBrand = (info) => putStockData(info, "brands");
  const putFirm = (info) => putStockData(info, "firms");
  const putProduct = (info) => putStockData(info, "product");
  const putSale = (info) => putStockData(info, "sales");
  const putPurchase = (info) => putStockData(info, "purchases");

  //!------------- DELETE CALLS ----------------

  const deleteStockData = async (url, id) => {
    try {
      await axiosWithToken.delete(`stock/${url}/${id}/`);
      toastSuccessNotify(`${url} Successfuly deleted`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} Can not be deleted`);
    }
  };

  const deleteBrand = (id) => deleteStockData("brands", id);
  const deleteFirm = (id) => deleteStockData("firms", id);
  const deleteProduct = (id) => deleteStockData("products", id);
  const deleteSale = (id) => deleteStockData("sales", id);
  const deletePurchase = (id) => deleteStockData("purchases", id);

  return {
    getBrands,
    getFirms,
    getProducts,
    getSales,
    getPurchases,
    getProCatBrands,
    getAllStockData,
    postBrand,
    postFirm,
    postProduct,
    postSale,
    postPurchase,
    putBrand,
    putFirm,
    putProduct,
    putSale,
    putPurchase,
    deleteBrand,
    deleteFirm,
    deleteProduct,
    deleteSale,
    deletePurchase,
  };
};

export default useStockCalls;
