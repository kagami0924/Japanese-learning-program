using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using prjTeam2_Final.Models;

namespace prjTeam2_Final.Controllers
{
    public class WordExamController : Controller
    {
        dbTeam2_FinalEntities db = new dbTeam2_FinalEntities();
        // GET: WordExam
        public ActionResult Index()
        {
            return View();
        }
        //選擇難度
        public ActionResult ChooseRange()
        {
            return View();
        }
        //更改種類
        public JsonResult SendRange(string 難度)
        {
            var Range = db.tNWord.Where(m => m.難度 == 難度).GroupBy(m => m.種類, (t, tn) => new { 種類 = t });

            return Json(Range, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSpecies(string 難度, string 種類)
        {
            if (難度 == "全部" && 種類 == "全部")
            {
                var topicAll = db.tNWord;
                return Json(topicAll, JsonRequestBehavior.AllowGet);
            }
            if (種類 == "全部")
            {
                var topic種類 = db.tNWord.Where(m => m.難度 == 難度);
                return Json(topic種類, JsonRequestBehavior.AllowGet);
            }
            var topic = db.tNWord.Where(m => m.難度 == 難度 && m.種類 == 種類);
            return Json(topic, JsonRequestBehavior.AllowGet);
        }
    }
}