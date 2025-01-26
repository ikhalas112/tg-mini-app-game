mergeInto(LibraryManager.library, {
  ConnectWallet_Dapp: function (isFirstTimeConnect) {
    window.dispatchReactUnityEvent("ConnectWallet_Dapp", isFirstTimeConnect);
  },
  CreatePayment: function (productID, currencyCode, price) {
    window.dispatchReactUnityEvent("CreatePayment", UTF8ToString(productID), UTF8ToString(currencyCode), UTF8ToString(price));
  },
  OpenHistory: function () {
    window.dispatchReactUnityEvent("OpenHistory");
  },
  OpenInviteFriend: function () {
    window.dispatchReactUnityEvent("OpenInviteFriend");
  },
  OpenFollowOfficialAccount: function () {
    window.dispatchReactUnityEvent("OpenFollowOfficialAccount");
  },
  GetProfileReq: function () {
    window.dispatchReactUnityEvent("GetProfileReq");
  },
  ShareGameReq: function () {
    window.dispatchReactUnityEvent("ShareGameReq");
  },
  FollowBotReq: function () {
    window.dispatchReactUnityEvent("FollowBotReq");
  },
  ClaimDailyLogInReq: function () {
    window.dispatchReactUnityEvent("ClaimDailyLogInReq");
  },
  ConnectWalletReq: function () {
    window.dispatchReactUnityEvent("ConnectWalletReq");
  },
  GetWalletAddressReq: function () {
    window.dispatchReactUnityEvent("GetWalletAddressReq");
  },
  IsConnectedReq: function () {
    window.dispatchReactUnityEvent("IsConnectedReq");
  },
  PayReq: function (itemID) {
    window.dispatchReactUnityEvent("PayReq", UTF8ToString(itemID));
  },
  GetPaymentReq: function (orderID) {
    window.dispatchReactUnityEvent("GetPaymentReq", UTF8ToString(orderID));
  },
  GetTokenBalaceReq: function (tokenAddress, walletAddress) {
    window.dispatchReactUnityEvent("GetTokenBalaceReq", UTF8ToString(tokenAddress), UTF8ToString(walletAddress));
  },
  PayWithStarsReq: function (itemID) {
    window.dispatchReactUnityEvent("PayWithStarsReq", UTF8ToString(itemID));
  },
  GetStarBalaceReq: function (userID) {
    window.dispatchReactUnityEvent("GetStarBalaceReq", UTF8ToString(userID));
  },
});