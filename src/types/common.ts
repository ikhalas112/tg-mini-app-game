export type Response<T = any> = {
  success: boolean;
  errors: any;
  data: T;
  meta: any;
  statusCode: number;
};
