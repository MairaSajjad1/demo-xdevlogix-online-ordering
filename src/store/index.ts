import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import authService from "./services/authService";
import typeOfServiceService from "./services/typeOfServiceService";
import userService from "./services/userService";
import orderReportService from "./services/orderReportService";
import permissionService from "./services/permissionServices";
import locationService from "./services/locationService";
import categoryService from "./services/categoryService";
import taxrateService from "./services/taxrateService";
import buisnessService from "./services/buisnessService";
import supplierService from "./services/supplierService";
import riderService from "./services/riderService";
import roleService from "./services/roleService";
import unitService from "./services/unitService";
import barCodeService from "./services/barCodeService";
import brandService from "./services/brandService";
import purchaseService from "./services/purchaseService";
import variationService from "./services/variationService";
import importService from "./services/importService";
import productService from "./services/productService";
import orderService from "./services/orderListService";
import passwordService from "./services/passwordService";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authService.reducerPath]: authService.reducer,
    [typeOfServiceService.reducerPath]: typeOfServiceService.reducer,
    // [reportService.reducerPath]: reportService.reducer,
    [userService.reducerPath]: userService.reducer,
    [passwordService.reducerPath]: passwordService.reducer,
    [locationService.reducerPath]: locationService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    [taxrateService.reducerPath]: taxrateService.reducer,
    [buisnessService.reducerPath]: buisnessService.reducer,
    [supplierService.reducerPath]: supplierService.reducer,
    [riderService.reducerPath]: riderService.reducer,
    [orderReportService.reducerPath]: orderReportService.reducer,
    [roleService.reducerPath]: roleService.reducer,
    [unitService.reducerPath]: unitService.reducer,
    [permissionService.reducerPath]: permissionService.reducer,
    [barCodeService.reducerPath]: barCodeService.reducer,
    [brandService.reducerPath]: brandService.reducer,
    [purchaseService.reducerPath]: purchaseService.reducer,
    [variationService.reducerPath]: variationService.reducer,
    [productService.reducerPath]: productService.reducer,
    [orderService.reducerPath]: orderService.reducer,
    [importService.reducerPath]: importService.reducer, 
    authReducer: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authService.middleware,
      typeOfServiceService.middleware,
      // reportService.middleware,
      userService.middleware,
      passwordService.middleware,
      locationService.middleware,
      categoryService.middleware,
      taxrateService.middleware,
      permissionService.middleware,
      orderReportService.middleware,
      buisnessService.middleware,
      supplierService.middleware,
      riderService.middleware,
      roleService.middleware,
      unitService.middleware,
      barCodeService.middleware,
      brandService.middleware,
      purchaseService.middleware,
      variationService.middleware,
      productService.middleware,
      orderService.middleware,
      importService.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
