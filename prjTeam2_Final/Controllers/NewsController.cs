using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using prjTeam2_Final.Models;
using prjTeam2_Final.Models.genericRepository;

namespace prjTeam2_Final.Controllers
{
    public class NewsController : Controller
    {
        // GET: News
        public ActionResult NewsIndex()
        {
            return View();
        }

        public ActionResult TheLastNews()
        {
            return View();
        }

        public ActionResult TheEntertainmentNews()
        {
            return View();

        }

        public ActionResult TheBusinessNews()
        {
            return View();

        }

        public ActionResult TheHealthNews()
        {
            return View();

        }

        public ActionResult TheScienceNews()
        {
            return View();

        }

        public ActionResult TheSportsNews()
        {
            return View();

        }

        public ActionResult TheTechnologyNews()
        {
            return View();

        }
        dbTeam2_FinalEntities db = new dbTeam2_FinalEntities();
        MRepository<tNewsCollection> nc = new MRepository<tNewsCollection>();

        [HttpPost]
        public JsonResult CollectNews(string NewsTitle, string NewsDate, string NewsURL, int MemberID)
        {
            //string result="ok";
            tNewsCollection tNews = new tNewsCollection()
            {
                NewsTitle = NewsTitle,
                NewsDate = NewsDate,
                NewsURL = NewsURL,
                MemberID = MemberID
            };
            nc.create(tNews);
            return Json("", JsonRequestBehavior.AllowGet);
        }


        public JsonResult DeleteCollectionNews(int NewsID)
        {
            var v = db.tNewsCollection.Where(a => a.fId == NewsID).FirstOrDefault();
            if (v != null)
            {
                db.tNewsCollection.Remove(v);
                db.SaveChanges();
            }

            return Json("", JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCollectsdNews(int MemberID)
        {
            var news = db.tNewsCollection.Where(m => m.MemberID == MemberID).ToList();


            return Json(news, JsonRequestBehavior.AllowGet);
        }

    }
}