export interface IUpdateModuleRequest {
  id: string;
  name: string;
  description: string;
  status: string;
  user: {
    id: string;
  }
}