import axios, { AxiosResponse } from "axios";
import { Column } from "./columns.types";

const BASE_URL = "/columns";

export const getColumnsByProjectUuid = (
  uuid: string
): Promise<AxiosResponse<Column[]>> => {
  return axios.get(`${BASE_URL}/${uuid}`);
};
