using prjTeam2_Final.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace prjTeam2_Final.Controllers
{
    public class JPquestionN4Controller : Controller
    {
        // GET: JPquestionN1
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult N4QUESTION1()
        {
            var jpquestion = db.N4;
            return View(jpquestion);
        }

        dbTeam2_FinalEntities db = new dbTeam2_FinalEntities();

        public JsonResult N4QUESTION12(string Ccategory)
        {
            var aa = "";
            //括號內is判斷的東西
            switch (Ccategory)
            {
                case "Grammar":
                    aa = "文法";
                    break;
                case "Vocabulary":
                    aa = "語彙";
                    break;
                case "Reading":
                    aa = "閱讀";
                    break;
                case "Listening":
                    aa = "聽力";
                    break;
                case "Test":
                    aa = "綜合";
                    break;
                default:
                    aa = "";
                    break;
            }
            //if 不用IF語法 直接資料庫與法
            var jpquestion = db.N4.Where(m => m.Category == aa);
            // m 現在就是db.N4
            return Json(jpquestion, JsonRequestBehavior.AllowGet);
        }



        public JsonResult getanswer()
        {
            var jpquestion = db.N4;
            return Json(jpquestion, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveToGrade(int Accuracy, int MemberID) //前端的AJAX有傳回這兩個職一定要寫
        {
            cGrade dbdb = new cGrade();
            dbdb.MemberID = MemberID;
            dbdb.測驗時間 = DateTime.Now.ToString();
            dbdb.測驗等級 = "N4";
            dbdb.測驗分數 = Accuracy.ToString();

            db.cGrade.Add(dbdb);
            db.SaveChanges();

            return Json("", JsonRequestBehavior.AllowGet);  //沒接東西先給空字串

        }

    }
}
// var aaa = a from 資料表 in db
//Select m    https://dotblogs.com.tw/BerryNote/2016/08/26/000310
//重點一 學會從資料庫抓全部資料
//重點二  WHERE選特定範圍資料