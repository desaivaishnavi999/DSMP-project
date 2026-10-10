//AUTH
export const LOGIN = "api/auth/login";
export const SIGNUP = "api/auth/signup";

//DASHBOARD
export const GET_DASHBOARD = "api/dashboard";

//DAILY RECORD
export const CREATE_DAILY_RECORD = "api/dailyrecord";
export const GET_ALL_DAILY_RECORD = "api/dailyrecord";
export const UPDATE_DAILY_RECORD = (id: string | number) => `api/dailyrecord/${id}`;
export const DELETE_DAILY_RECORD = (id: string | number) =>
  `api/dailyrecord/soft-delete/${id}`;

//BIRD INVENTORY
export const CREATE_BIRD_INVENTORY = "api/birdsinventory";
export const GET_ALL_BIRD_INVENTORY = "api/birdsinventory";
export const UPDATE_BIRD_INVENTORY = (id: string | number) => `api/birdsinventory/${id}`;
export const DELETE_BIRD_INVENTORY = (id: string | number) =>
  `api/birdsinventory/soft-delete/${id}`;

//FEED INVENTORY
export const CREATE_FEED_INVENTORY = "api/feedinventory";
export const GET_ALL_FEED_INVENTORY = "api/feedinventory";
export const UPDATE_FEED_INVENTORY = (id: string | number) => `api/feedinventory/${id}`;
export const DELETE_FEED_INVENTORY = (id: string | number) =>
  `api/feedinventory/soft-delete/${id}`;

export const CREATE_FINAL_REPORT = "api/finalreport";
export const GET_ALL_FINAL_REPORT = "api/finalreport";
export const GET_FINAL_REPORT_BY_ID = (id: string | number) => `api/finalreport/${id}`;
export const UPDATE_FINAL_REPORT = (id: string | number) => `api/finalreport/${id}`;
export const DELETE_FINAL_REPORT = (id: string | number) =>
  `api/finalreport/soft-delete/${id}`;

export const API_BASE_URL = "api/stockout";

// ---------- MASTER ----------
export const GET_ALL_STOCKOUT_MASTERS = "api/stockout/master";
export const GET_STOCKOUT_MASTER_BY_ID = (masterId: number) =>
  `api/stockout/master/${masterId}`;
export const STOCKOUT_CREATE_MASTER = "api/stockout/master";
export const STOCKOUT_FINALIZE_MASTER = (id: number) =>
  `${API_BASE_URL}/master/finalize/${id}`;

export const PREPARE_FINAL_REPORT = "api/finalreport/prepare";

// ---------- ENTRIES ----------
export const STOCKOUT_ADD_ENTRY = `${API_BASE_URL}/entry`;
export const STOCKOUT_GET_ENTRIES = (masterId: number) =>
  `${API_BASE_URL}/entry/${masterId}`;
export const STOCKOUT_DELETE_ENTRY = (entryId: number) =>
  `${API_BASE_URL}/entry/${entryId}`;

export const STOCKOUT_UPDATE_ENTRY = (entryId: number) =>
  `${API_BASE_URL}/entry/${entryId}`;
