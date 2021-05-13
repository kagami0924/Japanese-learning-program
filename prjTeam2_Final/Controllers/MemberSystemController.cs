using prjTeam2_Final.Models;
using prjTeam2_Final.Models.genericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace prjTeam2_Final.Controllers
{
    public class MemberSystemController : Controller
    {
        // GET: MemberSystem
        public ActionResult Index()
        {
            return View();
        }

        MRepository<tMembers> MIT = new MRepository<tMembers>();
        dbTeam2_FinalEntities db = new dbTeam2_FinalEntities();

        public ActionResult registration(tMembers formdata)
        {
            string reResult = "";
            //string bir = birthday;
            //檢查暱稱及帳號是否重複(待完成)
            var flagNicknameChecked = db.tMembers.FirstOrDefault(m => m.fNickname == formdata.fNickname);
            var flagAccountChecked = db.tMembers.FirstOrDefault(m => m.fAccount == formdata.fAccount);

            if (flagNicknameChecked != null)
            {
                if (flagAccountChecked != null)
                {
                    reResult = "檢查結果:暱稱及帳號已被註冊";
                    return Json(reResult, JsonRequestBehavior.AllowGet);
                }
                reResult = "檢查結果:暱稱已被註冊";
                return Json(reResult, JsonRequestBehavior.AllowGet);
            }

            if (flagAccountChecked != null)
            {
                reResult = "檢查結果:帳號已被註冊";
                return Json(reResult, JsonRequestBehavior.AllowGet);
            }

            //生成驗證碼
            int[] vcAccount = new int[6];
            string vc = "";
            Random rndVC = new Random();

            for (int i = 0; i < vcAccount.Length; i++)
            {
                vcAccount[i] = rndVC.Next(0, 10);
                vc += vcAccount[i].ToString();
            }

            //寫入資料庫
            tMembers tMIT = new tMembers()
            {
                fMemberName = formdata.fMemberName,
                //fNationality = null,
                fAccount = formdata.fAccount,
                fPassword = formdata.fPassword,
                fVerificationCode = vc,
                //fRegisteredDate = DateTime.Now,
                fNickname = formdata.fNickname,
                fBirthday = formdata.fBirthday,
                //fGender = null,
                //fLivingArea = null,
                //fOccupation = null,
                //fJLPTLevel = null,
                //fGoal = null,
                fIdentity = "member",
                fAlive = false,
                //ImgURL = null,
            };

            db.tMembers.Add(tMIT);
            db.SaveChanges();

            //MIT.create(tMIT);
            //reResult = vc + "OK";

            //寄送驗證信
            string senderAccount = "maydays15937@gmail.com";
            string senderPassword = "l79o09c19k";
            string receiverAccount = formdata.fAccount;
            string reVC = vc;
            string subject = "[系統通知] 會員註冊認證信";
            string body = $"{formdata.fMemberName}，你好：\r\n感謝您的註冊，仍需一個步驟即可完成註冊。\r\n請將本信中的驗證碼{reVC}，輸入至驗證碼的欄位中。";

            string smtpHost = "smtp.gmail.com";
            int smtpPort = 25; //25, 465, 587

            try
            {
                if (ModelState.IsValid)
                {
                    MailMessage mailmsg = new MailMessage();
                    mailmsg.From = new MailAddress(senderAccount);
                    mailmsg.To.Add(receiverAccount);
                    mailmsg.Subject = subject;
                    mailmsg.Body = body;

                    SmtpClient smtp = new SmtpClient()
                    {
                        Host = smtpHost,
                        Port = smtpPort,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        UseDefaultCredentials = false,
                        Credentials = new System.Net.NetworkCredential(senderAccount, senderPassword),
                        EnableSsl = true,
                    };
                    smtp.Send(mailmsg);
                    reResult = "寄發結果:成功";
                    return Json(reResult, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception)
            {
                reResult = "寄發狀態:失敗";
                return Json(reResult, JsonRequestBehavior.AllowGet);
            }
            reResult = $"{vc}註冊狀態:成功";
            return Json(reResult, JsonRequestBehavior.AllowGet);
        }

        //確認驗證碼
        public ActionResult vcChecked(string vc)
        {
            string vcResult;

            tMembers tMIT = db.tMembers.FirstOrDefault(m => m.fVerificationCode == vc);
            if (tMIT == null)
            {
                vcResult = "驗證狀態:失敗";
                return Json(vcResult, JsonRequestBehavior.AllowGet);
            }

            tMIT.fRegisteredDate = DateTime.Now;
            tMIT.fAlive = true;
            db.SaveChanges();
            //MIT.update(tMIT);

            vcResult = "驗證狀態:成功";
            return Json(vcResult, JsonRequestBehavior.AllowGet);
        }

        public ActionResult logonCheck(string account, string password)
        {
            string loResult = "";

            tMembers tMIT = db.tMembers.FirstOrDefault(m => m.fAccount == account && m.fPassword == password);
            if (tMIT == null)
            {
                loResult = $"登入狀態:失敗，原因:帳號/密碼有誤";
                return Content(loResult);
            }

            Response.Cookies["Login"]["MemberID"] = tMIT.MemberID.ToString();
            Response.Cookies["Login"]["own"] = tMIT.fMemberName;

            loResult = $"登入狀態:成功，權限:{tMIT.fIdentity}";
            return Content(loResult);
        }

        public ActionResult pmChecked(string account)
        {
            string pfResult;
            tMembers tMIT = db.tMembers.FirstOrDefault(m => m.fAccount == account);

            if (tMIT == null)
            {
                pfResult = "會員驗證:失敗";
                return Json(pfResult, JsonRequestBehavior.AllowGet);
            }

            //生成驗證碼
            int[] vcAccount = new int[6];
            string vc = "";
            Random rndVC = new Random();

            for (int i = 0; i < vcAccount.Length; i++)
            {
                vcAccount[i] = rndVC.Next(0, 10);
                vc += vcAccount[i].ToString();
            }

            tMIT.fVerificationCode = vc;
            db.SaveChanges();
            //MIT.update(tMIT);


            //寄出驗證碼
            //string senderAccount = "maydays15937@gmail.com";
            //string senderPassword = "l79o09c19k";
            //string receiverAccount = account;
            //string reVC = vc;
            //string subject = "[系統通知] 會員註冊認證信";
            //string body = $"{name}，你好：\r\n感謝您的註冊，仍需一個步驟即可完成註冊。\r\n請將本信中的驗證碼" +
            //    $"{reVC}，輸入至驗證碼的欄位中。";

            //string smtpHost = "smtp.gmail.com";
            //int smtpPort = 25; //25, 465, 587

            //try
            //{
            //    if (ModelState.IsValid)
            //    {
            //        MailMessage mailmsg = new MailMessage();
            //        mailmsg.From = new MailAddress(senderAccount);
            //        mailmsg.To.Add(receiverAccount);
            //        mailmsg.Subject = subject;
            //        mailmsg.Body = body;

            //        SmtpClient smtp = new SmtpClient()
            //        {
            //            Host = smtpHost,
            //            Port = smtpPort,
            //            DeliveryMethod = SmtpDeliveryMethod.Network,
            //            UseDefaultCredentials = false,
            //            Credentials = new System.Net.NetworkCredential(senderAccount, senderPassword),
            //            EnableSsl = true,
            //        };
            //        smtp.Send(mailmsg);
            //        reResult = "寄發結果:成功";
            //        return Json(reResult, JsonRequestBehavior.AllowGet);
            //    }
            //}
            //catch (Exception)
            //{
            //    reResult = "寄發狀態:失敗";
            //    return Json(reResult, JsonRequestBehavior.AllowGet);
            //}

            Response.Cookies["Login"]["MemberID"] = tMIT.MemberID.ToString();
            Response.Cookies["Login"]["own"] = tMIT.fMemberName;

            pfResult = "會員驗證:成功";
            return Json(pfResult, JsonRequestBehavior.AllowGet);
        }

        //確認驗證碼
        public ActionResult vcPfChecked(string vc)
        {
            string vcResult;

            tMembers tMIT = db.tMembers.FirstOrDefault(m => m.fVerificationCode == vc);
            if (tMIT == null)
            {
                vcResult = "驗證狀態:失敗";
                return Json(vcResult, JsonRequestBehavior.AllowGet);
            }


            vcResult = "驗證狀態:成功";
            return Json(vcResult, JsonRequestBehavior.AllowGet);
        }

        public ActionResult pfResetChecked(string pwdreset)
        {
            string resetResult;

            tMembers tMIT = db.tMembers.AsEnumerable().FirstOrDefault(m => m.MemberID == int.Parse(Request.Cookies["Login"]["MemberID"])); 

            if (tMIT == null)
            {
                resetResult = "修改結果:失敗";
                return Json(resetResult, JsonRequestBehavior.AllowGet);
            }

            tMIT.fPassword = pwdreset;
            db.SaveChanges();

            resetResult = "修改結果:成功";
            return Json(resetResult, JsonRequestBehavior.AllowGet);
        }

        public ActionResult logOut()
        {
            Response.Cookies["Login"].Expires = DateTime.Now.AddSeconds(-1);
            return Content("Y");
        }
    }
}