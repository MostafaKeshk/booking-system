class paths {
  static home = "/";
  static login = "/login";
  static signup = "/signup";
  //----------------------------------------------------------------//
  static user = "/user/:userId";
  static getUser = (userId: any) => `/user/${userId}`;

  static userRestaurants = `${this.user}/restaurants`;
  static getUserRestaurants = (userId: any) =>
    `${this.getUser(userId)}/restaurants`;

  static userRestaurant = `${this.user}/restaurants/:restaurantId`;
  static getUserRestaurant = (userId: any, restId: any) =>
    `${this.getUser(userId)}/restaurants/${restId}`;

  static userReservations = `${this.user}/reservations`;

  static getUserReservations = (userId: any) =>
    `${this.getUser(userId)}/reservations`;

  static userHistory = `${this.user}/history`;
  static getUserHistory = (userId: any) => `${this.getUser(userId)}/history`;

  static userSettings = `${this.user}/settings`;
  static getUserSettings = (userId: any) => `${this.getUser(userId)}/settings`;
  //----------------------------------------------------------------//

  static restaurant = "/restaurant/:restaurantId";
  static getRestaurant = (restaurantId: any) => `/restaurant/${restaurantId}`;

  static restaurantReservations = `${this.restaurant}/reservations`;
  static getRestaurantReservations = (restaurantId: any) =>
    `${this.getRestaurant(restaurantId)}/reservations`;

  static restaurantReviews = `${this.restaurant}/reviews`;
  static getRestaurantReviews = (restaurantId: any) =>
    `${this.getRestaurant(restaurantId)}/reviews`;

  static restaurantSettings = `${this.restaurant}/settings`;
  static getRestaurantSettings = (restaurantId: any) =>
    `${this.getRestaurant(restaurantId)}/settings`;

  //----------------------------------------------------------------//
  static admin = "/admin/:adminId";
  static getAdmin = (adminId: any) => `/admin/${adminId}`;

  //----------------------------------------------------------------//

  static adminRestaurants = `${this.admin}/restaurants`;
  static getAdminRestaurants = (adminId: any) =>
    `${this.getAdmin(adminId)}/restaurants`;

  static addAdminRestaurant = `${this.adminRestaurants}/add`;
  static getAddAdminRestaurant = (adminId: any) =>
    `${this.getAdmin(adminId)}/restaurants/add`;

  static editAdminRestaurant = `${this.adminRestaurants}/:restaurantId`;
  static getEditAdminRestaurants = (adminId: any, restaurantId: any) =>
    `${this.getAdmin(adminId)}/restaurants/${restaurantId}`;

  static adminUsers = `${this.admin}/users`;
  static getAdminUsers = (adminId: any) => `${this.getAdmin(adminId)}/users`;

  static addAdminUser = `${this.adminUsers}/add`;
  static getAddAdminUser = (adminId: any) =>
    `${this.getAdmin(adminId)}/users/add`;

  static editAdminUser = `${this.adminUsers}/:userId`;
  static getEditAdminUser = (adminId: any, userId: any) =>
    `${this.getAdmin(adminId)}/users/${userId}`;
}

export default paths;
