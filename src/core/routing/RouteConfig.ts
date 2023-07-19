import { RouteObject } from 'react-router-dom';

type RouteConfig = RouteObject & {
  name?: string;
  parents?: string[];
};

export default RouteConfig;
