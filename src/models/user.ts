/**
 * 用户模型
 * @author VenDream
 * @since 2018-1-22
 */

export default class UserModelClass {
  /**
   * 创建用户实例
   *
   * @static
   * @param {*} [data] 传入的数据
   * @returns {UserModel}
   * @memberof UserModelClass
   */
  static create(data?: any): UserModel {
    const baseModel: UserModel = {
      id: '',
      account: '',
      name: '游客',
      xRestrict: -1,
      mailAddress: '',
      isPremium: false,
      isMailAuthorized: false,
      profileImageUrls: {
        px_16x16: '',
        px_50x50: '',
        px_170x170: '',
      },
    };

    return data
      ? {
          ...baseModel,
          id: data.id,
          account: data.account,
          name: data.name,
          xRestrict: data.xRestrict,
          mailAddress: data.mailAddress,
          isPremium: data.isPremium,
          isMailAuthorized: data.isMailAuthorized,
          profileImageUrls: {
            px_16x16: data.profileImageUrls.px_16x16,
            px_50x50: data.profileImageUrls.px_50x50,
            px_170x170: data.profileImageUrls.px_170x170,
          },
        }
      : baseModel;
  }
}
