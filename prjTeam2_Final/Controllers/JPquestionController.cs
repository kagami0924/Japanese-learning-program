using prjTeam2_Final.Models;
using prjTeam2_Final.Models.genericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace prjTeam2_Final.Controllers
{
    public class JPquestionController : Controller
    {
        // GET: JPquestion
        public ActionResult Index()
        {
            return View();
        }
        dbTeam2_FinalEntities db = new dbTeam2_FinalEntities();
        MRepository<N5> dbb = new MRepository<N5>();
        public ActionResult ExamHomePage()
        {
            return View();
        }

        public ActionResult N5QUESTION()
        {
            var jpquestion = db.N5;

            return View(jpquestion);
        }

        //public ActionResult APIquestion()
        //{
        //    return View();
        //}
        public JsonResult getanswer()
        {
            var jpquestion = db.N5;
            return Json(jpquestion, JsonRequestBehavior.AllowGet);
        }
        public JsonResult N5SelectQuestion(string Ccategory)
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
                //case "Reading":
                //    aa = "閱讀";
                //    break;
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
                var jpquestionaa = db.N5.Where(m => m.Category == aa);
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
            dbdb.測驗等級 = "N5";
            dbdb.測驗分數 = Accuracy.ToString();

            db.cGrade.Add(dbdb);
            db.SaveChanges();

            return Json("", JsonRequestBehavior.AllowGet);  //沒接東西先給空字串

        }

        public JsonResult GradeToProfile(int MemberID)  //key名字
        {
            var jpquestion = db.cGrade.Where(m => m.MemberID == MemberID).Select(m => new
            {
                Ctime = m.測驗時間,
                Clevel = m.測驗等級,
                Cgrade = m.測驗分數,
            });

            return Json(jpquestion, JsonRequestBehavior.AllowGet);
        }
    }
}