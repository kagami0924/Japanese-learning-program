using prjTeam2_Final.Models;
using prjTeam2_Final.Models.genericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace prjTeam2_Final.Controllers
{
    public class JPquestionN1Controller : Controller
    {
        // GET: JPquestionN1
        public ActionResult Index()
        {
            return View();
        }
        dbTeam2_FinalEntities db = new dbTeam2_FinalEntities();
        MRepository<N1> dbb = new MRepository<N1>();

        public ActionResult N1QUESTION1()
        {
            var jpquestion = db.N1;

            return View(jpquestion);
        }
        public JsonResult getanswer()
        {
            var jpquestion = db.N1;
            return Json(jpquestion, JsonRequestBehavior.AllowGet);
        }
        public JsonResult N1SelectQuestion(string Ccategory)
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
                    aa = "聽解";
                    break;
                case "Test":
                    aa = "綜合";
                    break;
                default:
                    aa = "";
                    break;
            }
            if (aa != "綜合")
            {
                var jpquestionaa = db.N1.Where(m => m.Category == aa);
                return Json(jpquestionaa, JsonRequestBehavior.AllowGet);
            }
            {
                var jpquestion = dbb.getAll();
                return Json(jpquestion, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult SaveToGrade(int Accuracy, int MemberID) //前端的AJAX有傳回這兩個職一定要寫
        {
            cGrade dbdb = new cGrade();
            dbdb.MemberID = MemberID;
            dbdb.測驗時間 = DateTime.Now.ToString();
            dbdb.測驗等級 = "N1";
            dbdb.測驗分數 = Accuracy.ToString();

            db.cGrade.Add(dbdb);
            db.SaveChanges();

            return Json("", JsonRequestBehavior.AllowGet);  //沒接東西先給空字串

        }

    }
}