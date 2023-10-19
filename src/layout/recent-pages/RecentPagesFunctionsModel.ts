import RecentPageModel from '@/layout/recent-pages/RecentPageModel.ts';

export default interface RecentPagesFunctionsModel {
  add: (model: RecentPageModel) => void;
  remove: (model: RecentPageModel) => void;
}
