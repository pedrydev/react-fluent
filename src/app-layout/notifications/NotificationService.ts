import NotificationModel from "@/app-layout/notifications/NotificationModel.ts";

export default class NotificationService {
  static getLastNotifications() {
    return new Promise<NotificationModel[]>((res) => setTimeout(
      () => {
        res([1, 2, 3, 4, 5].map(id => ({
          id,
          message: `Message nasic9qeh0no sn0qefweb 48rbv0 48fwbfwpi f3408tgwf 80weifbw80if  8fi ${id}`,
          date: new Date()
        })));
      }, 2000));
  }

  static getAllNotifications(cursor: number) {
    return new Promise<NotificationModel[]>((res) => setTimeout(
      () => {
        res([1 * cursor, 2 * cursor, 3 * cursor, 4 * cursor, 5 * cursor, 6 * cursor, 7 * cursor, 8 * cursor, 9 * cursor, 10 * cursor].map(id => ({
          id,
          message: `Message nasic9qeh0n osn0qefweb 48rbv048fwbfwpi f3408tgwf80w eifbw80if  8fi ${id}`,
          date: new Date()
        })));
      }, 2000));
  }
}
