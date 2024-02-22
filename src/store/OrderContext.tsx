import { createContext, useReducer } from "react";
import {
  OrderProps,
  RevenueDataTypes,
  RevenueItemTypes,
} from "../utils/user-types";

interface OrderInitialStateTypes {
  orders: OrderProps[] | null;
  customOrders: OrderProps[] | [];
  order: OrderProps | null;
  loading: boolean;
  updateLoading: boolean;
  error: string | null;
  filterQuery: string;
  sortQuery: string;
  stats: StatsTypes;
  revenue: RevenueDataTypes;
  revenueLoading: boolean;
}

export interface StatsTypes {
  total: number;
  toBePacked: number;
  onTheWay: number;
  delivered: number;
  cancelled: number;
}

// An enum with all the types of actions to use in our reducer
export enum OrderActionKind {
  GET_ORDERS_START = "GET_ORDERS_START",
  GET_ORDERS_SUCCESS = "GET_ORDERS_SUCCESS",
  GET_ORDERS_FAILURE = "GET_ORDERS_FAILURE",

  GET_ORDERS_STATS_START = "GET_ORDERS_STATS_START",
  GET_ORDERS_STATS_SUCCESS = "GET_ORDERS_STATS_SUCCESS",
  GET_ORDERS_STATS_FAILURE = "GET_ORDERS_STATS_FAILURE",

  GET_REVENUE_STATS_START = "GET_REVENUE_STATS_START",
  GET_REVENUE_STATS_SUCCESS = "GET_REVENUE_STATS_SUCCESS",
  GET_REVENUE_STATS_FAILURE = "GET_REVENUE_STATS_FAILURE",

  GET_ORDER_START = "GET_ORDER_START",
  GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS",
  GET_ORDER_FAILURE = "GET_ORDER_FAILURE",

  UPDATE_ORDER_START = "UPDATE_ORDER_START",
  UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS",
  UPDATE_ORDER_FAILURE = "UPDATE_ORDER_FAILURE",
}

// An interface for our actions
export interface OrderAction {
  type: OrderActionKind;
  payload?: OrderProps[] | OrderProps | StatsTypes | RevenueDataTypes | null;
  error?: string;
}

const RevenueItemInitialState: RevenueItemTypes = {
  new: 0,
  old: 0,
  difference: 0,
};

const INITIAL_STATE: OrderInitialStateTypes = {
  orders: null,
  customOrders: [],
  order: null,
  loading: false,
  updateLoading: false,
  error: null,
  filterQuery: "",
  sortQuery: "",
  stats: {
    total: 0,
    toBePacked: 0,
    onTheWay: 0,
    delivered: 0,
    cancelled: 0,
  },
  revenue: {
    dayStats: RevenueItemInitialState,
    weekStats: RevenueItemInitialState,
    monthStats: RevenueItemInitialState,
    yearStats: RevenueItemInitialState,
    totalRevenue: 0,
    total: 0,
    cancelled: 0,
  },
  revenueLoading: false,
};

interface OrderContextTypes {
  state: OrderInitialStateTypes;
  dispatch: React.Dispatch<OrderAction>;
  filterOrders: (arg: string) => void;
  sortOrders: (arg: string) => void;
}

export const OrderContext = createContext<OrderContextTypes>({
  state: INITIAL_STATE,
  dispatch: () => {},
  filterOrders: () => {},
  sortOrders: () => {},
});

const OrderReducer = (
  state: OrderInitialStateTypes,
  action: OrderAction
): typeof INITIAL_STATE => {
  switch (action.type) {
    case OrderActionKind.GET_ORDERS_START:
      return { ...state, loading: true, error: null };
    case OrderActionKind.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload as OrderProps[],
        loading: false,
        error: null,
      };
    case OrderActionKind.GET_ORDERS_FAILURE:
      return {
        ...state,
        orders: null,
        loading: false,
        error: action.error!,
      };

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    case OrderActionKind.GET_ORDERS_STATS_START:
      return { ...state, error: null };
    case OrderActionKind.GET_ORDERS_STATS_SUCCESS:
      return {
        ...state,
        stats: action.payload as StatsTypes,
        error: null,
      };
    case OrderActionKind.GET_ORDERS_STATS_FAILURE:
      return {
        ...state,
        error: action.error!,
      };

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    case OrderActionKind.GET_REVENUE_STATS_START:
      return { ...state, revenueLoading: true, error: null };
    case OrderActionKind.GET_REVENUE_STATS_SUCCESS:
      return {
        ...state,
        revenueLoading: false,
        revenue: action.payload as RevenueDataTypes,
        error: null,
      };
    case OrderActionKind.GET_REVENUE_STATS_FAILURE:
      return { ...state, revenueLoading: false, error: action.error! };

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    case OrderActionKind.GET_ORDER_START:
      return { ...state, loading: true, error: null };
    case OrderActionKind.GET_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload as OrderProps,
        loading: false,
        error: null,
      };
    case OrderActionKind.GET_ORDER_FAILURE:
      return {
        ...state,
        order: null,
        loading: false,
        error: action.error!,
      };

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    case OrderActionKind.UPDATE_ORDER_START:
      return { ...state, updateLoading: true, error: null };
    case OrderActionKind.UPDATE_ORDER_SUCCESS:
      const updatedItemIndex = state.orders!.findIndex(
        (item) => item._id === (action.payload as OrderProps)._id
      );
      const ordersCopy: OrderProps[] = [...state.orders!];
      ordersCopy[updatedItemIndex] = action.payload as OrderProps;

      return {
        ...state,
        order: action.payload as OrderProps,
        orders: ordersCopy as OrderProps[],
        updateLoading: false,
        error: null,
      };
    case OrderActionKind.UPDATE_ORDER_FAILURE:
      return { ...state, updateLoading: false, error: action.error! };

    default:
      return state;
  }
};

export const OrderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(OrderReducer, INITIAL_STATE);

  /// If the orders were filtered before, it returns the filtered ones. If there weren't, it just returns all orders
  const filterOrdersHandler = (query: string) => {
    const range = query.split("-").map((i) => Number(i));
    const filtered = state.orders!.filter(
      (i) => i.totalPrice >= range[0] && i.totalPrice <= range[1]
    );
    if (!query) return state.orders!;
    return filtered.length > 0 ? filtered : state.orders!;
  };

  /// Filtering the orders based on the price
  const filterOrders = (filter: string) => {
    state.filterQuery = filter;

    let filtered: OrderProps[] = [];
    /// We filter the orders here
    filtered = filterOrdersHandler(filter);

    /// If the orders got sorted before, we sort the filtered orders and return them.
    if (state.sortQuery) {
      const sorted = filtered!.filter((i) => i.status === state.sortQuery);
      const unsorted = filtered!.filter((i) => i.status !== state.sortQuery);
      state.customOrders = [...sorted, ...unsorted];
      return;
    }

    /// If the orders did not get sorted before, we just return the filtered orders without sorting
    state.customOrders = filtered;
  };

  /// Sorting the orders based on the status
  const sortOrders = (status: string) => {
    state.sortQuery = status;
    /// We check if the orders got filtered before
    const possibleFiltered = filterOrdersHandler(state.filterQuery);

    /// Getting 'wanted to be sort' orders
    const sorted = possibleFiltered!.filter((i) => i.status === status);

    /// If the sorted products's length is 0, we just return the possible filtered orders.
    /// If the sorted products' length is greater than 0, we sort the orders.
    state.customOrders =
      sorted.length === 0 ? possibleFiltered : [...sorted, ...possibleFiltered];
  };

  const values = {
    state,
    dispatch,
    filterOrders,
    sortOrders,
  };

  return (
    <OrderContext.Provider value={values}>{children}</OrderContext.Provider>
  );
};
