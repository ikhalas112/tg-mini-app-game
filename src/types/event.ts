export enum EventName {
  ConnectWalletReq = 'ConnectWalletReq',
  ConnectWallet_Dapp = 'ConnectWallet_Dapp',
  CreatePayment = 'CreatePayment',
  OpenHistory = 'OpenHistory',
  OpenInviteFriend = 'OpenInviteFriend',
  OpenFollowOfficialAccount = 'OpenFollowOfficialAccount',
  GetProfileReq = 'GetProfileReq',
  ShareGameReq = 'ShareGameReq',
  FollowBotReq = 'FollowBotReq',
  ClaimDailyLogInReq = 'ClaimDailyLogInReq',
  GetWalletAddressReq = 'GetWalletAddressReq',
  IsConnectedReq = 'IsConnectedReq',
  PayReq = 'PayReq',
  GetPaymentReq = 'GetPaymentReq',
  GetTokenBalaceReq = 'GetTokenBalaceReq',
  PayWithStarsReq = 'PayWithStarsReq',
  GetStarBalaceReq = 'GetStarBalaceReq',
}

// 1. ConnectWallet_Dapp
// Parameter: isFirstTimeConnect (Boolean)
// ตัวอย่างการใช้งาน: ใช้เมื่อ Unity เรียกให้เชื่อมต่อกระเป๋าเงินครั้งแรก

// 2. CreatePayment
// Parameters: productID (string), currencyCode (string), price (string)
// ตัวอย่างการใช้งาน: ใช้เมื่อ Unity ต้องการสร้างคำสั่งซื้อหรือการชำระเงิน

// 3. OpenHistory
// Parameters: ไม่มี
// ตัวอย่างการใช้งาน: ใช้เมื่อ Unity ต้องการเปิดหน้าประวัติการใช้งาน

// 4. OpenInviteFriend
// Parameters: ไม่มี
// ตัวอย่างการใช้งาน: ใช้เมื่อ Unity เรียกฟังก์ชันสำหรับการเชิญเพื่อน

// 5. OpenFollowOfficialAccount
// Parameters: ไม่มี
// ตัวอย่างการใช้งาน: ใช้เมื่อ Unity ต้องการให้ผู้ใช้ติดตามบัญชีทางการ

// 6. GetProfileReq
// Parameters: ไม่มี
// ตัวอย่างการใช้งาน: ใช้เมื่อ Unity เรียกข้อมูลโปรไฟล์ของผู้ใช้

// 7. ShareGameReq
// Parameters: ไม่มี
// ตัวอย่างการใช้งาน: ใช้เมื่อ Unity ต้องการแชร์เกมไปยังช่องทางอื่น

// 8. FollowBotReq
// Parameters: ไม่มี
// ตัวอย่างการใช้งาน: ใช้เมื่อ Unity ต้องการให้ผู้ใช้ติดตามบอท

// 9. ClaimDailyLogInReq
// Parameters: ไม่มี
// ตัวอย่างการใช้งาน: ใช้เมื่อ Unity เรียกฟังก์ชันเพื่อรับรางวัลล็อกอินประจำวัน

// 10. ConnectWalletReq
// Parameters: ไม่มี
// ตัวอย่างการใช้งาน: ใช้เมื่อ Unity ต้องการเชื่อมต่อกระเป๋าเงิน

// 11. GetWalletAddressReq
// Parameters: ไม่มี
// ตัวอย่างการใช้งาน: ใช้เมื่อ Unity ต้องการที่อยู่กระเป๋าเงินของผู้ใช้

// 12. IsConnectedReq
// Parameters: ไม่มี
// ตัวอย่างการใช้งาน: ใช้เมื่อ Unity ต้องการตรวจสอบว่ากระเป๋าเงินถูกเชื่อมต่อหรือไม่

// 13. PayReq
// Parameters: itemID (string)
// ตัวอย่างการใช้งาน: ใช้เมื่อ Unity ต้องการชำระเงินสำหรับสินค้า

// 14. GetPaymentReq
// Parameters: orderID (string)
// ตัวอย่างการใช้งาน: ใช้เมื่อ Unity ต้องการตรวจสอบสถานะการชำระเงิน

// 15. GetTokenBalaceReq
// Parameters: tokenAddress (string), walletAddress (string)
// ตัวอย่างการใช้งาน: ใช้เมื่อ Unity ต้องการตรวจสอบยอดคงเหลือของโทเค็นในกระเป๋าเงิน

// 16. PayWithStarsReq
// Parameters: itemID (string)
// ตัวอย่างการใช้งาน: ใช้เมื่อ Unity ต้องการชำระเงินด้วย Stars

// 17. GetStarBalaceReq
// Parameters: userID (string)
// ตัวอย่างการใช้งาน: ใช้เมื่อ Unity ต้องการตรวจสอบยอดคงเหลือของ Stars สำหรับผู้ใช้
