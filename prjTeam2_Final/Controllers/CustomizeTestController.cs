using prjTeam2_Final.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace prjTeam2_Final.Controllers
{
    public class CustomizeTestController : Controller
    {
        // GET: CustomizeTest

        Random rnd = new Random();
        public ActionResult CustomizeTestIndex()
        {
            return View();
        }
        public ActionResult vCustomizeTest()
        {
            return View();
        }
        dbTeam2_FinalEntities db = new dbTeam2_FinalEntities();
        public JsonResult GetPersonalQuiz(int MemberID)
        {
            //資料表名稱待改
            var data = db.tCustomizeTopic.Where(m => m.MemberID == MemberID).GroupBy(m => m.Category, (t, tn) => new
            {
                Category = t,
            });
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ReturnTopic(string Category,int MemberID)
        {
            var list = db.tCustomizeTopic.Where(m => m.Category == Category && m.MemberID == MemberID).Select(m => new
            {
                No=m.No,
                Question=m.Question,
                Answer=m.Answer,
            });
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        
    }
}