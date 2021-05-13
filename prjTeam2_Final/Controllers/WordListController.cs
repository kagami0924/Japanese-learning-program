//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;
//using prjTeam2_Final.Models;
//using PagedList.Mvc;
//using PagedList;

//namespace prjTeam2_Final.Controllers
//{
//    public class WordListController : Controller
//    {
//        dbTeam2_FinalEntities db = new dbTeam2_FinalEntities();
//        // GET: WordList
//        public ActionResult Index(string currentFilter, string searchString, int? page)
//        {
//            if (searchString != null)
//            {
//                page = 1;
//            }
//            else
//            {
//                searchString = currentFilter;
//            }

//            ViewBag.CurrentFilter = searchString;
//            var word = from w in db.tN5 select w;

//            if (!string.IsNullOrEmpty(searchString))
//            {
//                word = word.Where(m => m.中文.Contains(searchString) || m.假名.Contains(searchString) || m.日文.Contains(searchString) || m.種類.Contains(searchString));
//            }
//            var WordList = word.OrderBy(m => m.No);
//            //int currentpage = page < 1 ? 1 : page;
//            //var N5WordList = db.tN5.OrderBy(m => m.No).ToPagedList(currentpage, 10)
//            int pageSize = 10;
//            int pageNumber = (page ?? 1);
//            return View(WordList.ToPagedList(pageNumber, pageSize));
//        }



//        public ActionResult Create()
//        {
//            return View();
//        }

//        [HttpPost]
//        public ActionResult Create(string 日文, string 中文, string 假名, string 種類)
//        {
//            tN5 N5C = new tN5();
//            N5C.日文 = 日文;
//            N5C.中文 = 中文;
//            N5C.假名 = 假名;
//            N5C.種類 = 種類;
//            N5C.難度 = "N5";
//            db.tN5.Add(N5C);
//            db.SaveChanges();
//            return RedirectToAction("Index", "WordList");
//        }

//        public ActionResult Delete(int id)
//        {
//            var N5D = db.tN5.Where(m => m.No == id).FirstOrDefault();
//            db.tN5.Remove(N5D);
//            db.SaveChanges();
//            return RedirectToAction("Index", "WordList");
//        }

//        public ActionResult Edit(int id)
//        {
//            var N5E = db.tN5.Where(m => m.No == id).FirstOrDefault();
//            return View(N5E);
//        }

//        [HttpPost]
//        public ActionResult Edit(int id, string 日文, string 中文, string 假名, string 種類)
//        {
//            var N5E = db.tN5.Where(m => m.No == id).FirstOrDefault();

//            N5E.日文 = 日文;
//            N5E.中文 = 中文;
//            N5E.假名 = 假名;
//            N5E.種類 = 種類;
//            N5E.難度 = "N5";
//            db.SaveChanges();
//            return RedirectToAction("Index", "WordList");
//        }
//    }
//}