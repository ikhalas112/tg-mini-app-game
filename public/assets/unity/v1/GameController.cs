using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class GameController : MonoBehaviour
{
    [SerializeField] TextMeshProUGUI dataTxt;
    [SerializeField] Button[] buttons;
    [SerializeField] TMP_InputField[] inputFields;

    private void Awake()
    {
        buttons[0].onClick.AddListener(() => CallGetProfileReq());
        buttons[1].onClick.AddListener(() => CallShareGameReq());
        buttons[2].onClick.AddListener(() => CallFollowBotReq());
        buttons[3].onClick.AddListener(() => CallClaimDailyLogInReq());
        buttons[4].onClick.AddListener(() => CallConnectWalletReq());
        buttons[5].onClick.AddListener(() => CallGetWalletAddressReq());
        buttons[6].onClick.AddListener(() => CallIsConnectedReq());
        buttons[7].onClick.AddListener(() => CallPayReq(inputFields[0].text));
        buttons[8].onClick.AddListener(() => CallGetPaymentReq(inputFields[1].text));
        buttons[9].onClick.AddListener(() => CallGetTokenBalaceReq(inputFields[2].text, inputFields[3].text));
        buttons[10].onClick.AddListener(() => CallPayWithStarsReq(inputFields[4].text));
        buttons[11].onClick.AddListener(() => CallGetStarBalaceReq(inputFields[5].text));
    }


    //- Unity call -> GetProfileReq()
    //- Web send -> GameController.GetProfileRes(JSON.stringify(msg))
    [DllImport("__Internal")]
    private static extern void GetProfileReq();
    public void CallGetProfileReq()
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        GetProfileReq();
#else
        GetProfileRes("CallGetProfileReq");
#endif
    }
    public void GetProfileRes(string msg)
    {
        dataTxt.text = msg;
    }

    //- Unity call -> ShareGameReq()
    //- Web send -> GameController.ShareGameRes(JSON.stringify(msg))
    [DllImport("__Internal")]
    private static extern void ShareGameReq();
    public void CallShareGameReq()
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        ShareGameReq();
#else
        ShareGameRes("CallShareGameReq");
#endif
    }
    public void ShareGameRes(string msg)
    {
        dataTxt.text = msg;
    }

    //- Unity call -> FollowBotReq()
    //- Web send -> GameController.FollowBotRes(JSON.stringify(msg))
    [DllImport("__Internal")]
    private static extern void FollowBotReq();
    public void CallFollowBotReq()
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        FollowBotReq();
#else
        FollowBotRes("CallFollowBotReq");
#endif
    }
    public void FollowBotRes(string msg)
    {
        dataTxt.text = msg;
    }

    //- Unity call -> ClaimDailyLogInReq()
    //- Web send -> GameController.ClaimDailyLogInRes(JSON.stringify(msg))
    [DllImport("__Internal")]
    private static extern void ClaimDailyLogInReq();
    public void CallClaimDailyLogInReq()
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        ClaimDailyLogInReq();
#else
        ClaimDailyLogInRes("CallClaimDailyLogInReq");
#endif
    }
    public void ClaimDailyLogInRes(string msg)
    {
        dataTxt.text = msg;
    }

    //- Unity call -> ConnectWalletReq()
    //- Web send -> GameController.ConnectWalletRes("0x...")
    [DllImport("__Internal")]
    private static extern void ConnectWalletReq();
    public void CallConnectWalletReq()
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        ConnectWalletReq();
#else
        ConnectWalletRes("CallConnectWalletReq");
#endif
    }
    public void ConnectWalletRes(string msg)
    {
        dataTxt.text = msg;
    }

    //- Unity call -> GetWalletAddressReq()
    //- Web send -> GameController.GetWalletAddressRes("0x...")
    [DllImport("__Internal")]
    private static extern void GetWalletAddressReq();
    public void CallGetWalletAddressReq()
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        GetWalletAddressReq();
#else
        GetWalletAddressRes("CallGetWalletAddressReq");
#endif
    }
    public void GetWalletAddressRes(string msg)
    {
        dataTxt.text = msg;
    }

    //- Unity call -> IsConnectedReq()
    //- Web send -> GameController.IsConnectedRes("0x...")
    [DllImport("__Internal")]
    private static extern void IsConnectedReq();
    public void CallIsConnectedReq()
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        IsConnectedReq();
#else
        IsConnectedRes("CallIsConnectedReq");
#endif
    }
    public void IsConnectedRes(string msg)
    {
        dataTxt.text = msg;
    }

    //- Unity call -> PayReq(itemID)
    //- Web send -> GameController.PayRes(JSON.stringify(msg))
    [DllImport("__Internal")]
    private static extern void PayReq(string itemID);
    public void CallPayReq(string itemID)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        PayReq(itemID);
#else
        PayRes("CallPayReq: " + itemID);
#endif
    }
    public void PayRes(string msg)
    {
        dataTxt.text = msg;
    }

    //- Unity call -> GetPaymentReq(orderID)
    //- Web send -> GameController.GetPaymentRes(JSON.stringify(msg))
    [DllImport("__Internal")]
    private static extern void GetPaymentReq(string orderID);
    public void CallGetPaymentReq(string orderID)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        GetPaymentReq(orderID);
#else
        GetPaymentRes("CallGetPaymentReq: " + orderID);
#endif
    }
    public void GetPaymentRes(string msg)
    {
        dataTxt.text = msg;
    }

    //- Unity call -> GetTokenBalaceReq(tokenAddress, walletAddress)
    //- Web send -> GameController.GetTokenBalaceRes(JSON.stringify(msg))
    [DllImport("__Internal")]
    private static extern void GetTokenBalaceReq(string tokenAddress, string walletAddress);
    public void CallGetTokenBalaceReq(string tokenAddress, string walletAddress)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        GetTokenBalaceReq(tokenAddress, walletAddress);
#else
        GetTokenBalaceRes("CallGetTokenBalaceReq: " + tokenAddress + ", " + walletAddress);
#endif
    }
    public void GetTokenBalaceRes(string msg)
    {
        dataTxt.text = msg;
    }

    //- Unity call -> PayWithStarsReq(itemID)
    //- Web send -> GameController.PayWithStarsRes(JSON.stringify(msg))
    [DllImport("__Internal")]
    private static extern void PayWithStarsReq(string itemID);
    public void CallPayWithStarsReq(string itemID)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        PayWithStarsReq(itemID);
#else
        PayWithStarsRes("CallPayWithStarsReq: " + itemID);
#endif
    }
    public void PayWithStarsRes(string msg)
    {
        dataTxt.text = msg;
    }

    //- Unity call -> GetStarBalaceReq(userID)
    //- Web send -> GameController.GetStarBalaceRes(JSON.stringify(msg))
    [DllImport("__Internal")]
    private static extern void GetStarBalaceReq(string userID);
    public void CallGetStarBalaceReq(string userID)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        GetStarBalaceReq(userID);
#else
        GetStarBalaceRes("CallGetStarBalaceReq: " + userID);
#endif
    }
    public void GetStarBalaceRes(string msg)
    {
        dataTxt.text = msg;
    }
}
