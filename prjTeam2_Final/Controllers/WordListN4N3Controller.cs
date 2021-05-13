using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using prjTeam2_Final.Models;

namespace prjTeam2_Final.Controllers
{

    public class WordListN4N3Controller : Controller
    {
        dbTeam2_FinalEntities db = new dbTeam2_FinalEntities();
        // GET: WordListN4N3
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult N4Index()
        {
            return View();
        }
        public ActionResult WordCreat()
        {
            return View();
        }
        public ActionResult WordEdit()
        {
            return View();
        }

        public JsonResult N5WordList()
        {
            var N5Word = db.tNWord.OrderBy(m => m.No).ToList().Where(m => m.難度 == "N5");
            return Json(N5Word, JsonRequestBehavior.AllowGet);
        }
        public JsonResult N4WordList()
        {
            var N4Word = db.tNWord.OrderBy(m => m.No).ToList().Where(m => m.難度 == "N4");
            return Json(N4Word, JsonRequestBehavior.AllowGet);
        }

        public JsonResult N3WordList()
        {
            var N3Word = db.tNWord.OrderBy(m => m.No).ToList().Where(m => m.難度 == "N3");
            return Json(N3Word, JsonRequestBehavior.AllowGet);
        }
        public JsonResult N2WordList()
        {
            var N2Word = db.tNWord.OrderBy(m => m.No).ToList().Where(m => m.難度 == "N2");
            return Json(N2Word, JsonRequestBehavior.AllowGet);
        }
        public JsonResult N1WordList()
        {
            var N1Word = db.tNWord.OrderBy(m => m.No).ToList().Where(m => m.難度 == "N1");
            return Json(N1Word, JsonRequestBehavior.AllowGet);
        }
        //新增
        public JsonResult N4Create(tNWord fd)
        {
            tNWord Nword = new tNWord();
            if (fd.日文 == null || fd.中文 == null || fd.假名 == null || fd.種類 == null)
            {
                return Json("", JsonRequestBehavior.AllowGet);
            }
            {
                Nword.日文 = fd.日文;
                Nword.中文 = fd.中文;
                Nword.假名 = fd.假名;
                Nword.種類 = fd.種類;
                Nword.難度 = fd.難度;
            }
            db.tNWord.Add(Nword);
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }
        //刪除
        public JsonResult N4N3WordDelete(int No)
        {
            var NWord = db.tNWord.Where(m => m.No == No).FirstOrDefault();
            db.tNWord.Remove(NWord);
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }
        //回傳編輯資料
        public JsonResult WordEdit2(int No)
        {
            var Word = db.tNWord.Where(m => m.No == No).Select(m => new
            {
                No = m.No,
                日文 = m.日文,
                中文 = m.中文,
                假名 = m.假名,
                種類 = m.種類,
                難度 = m.難度
            });

            return Json(Word, JsonRequestBehavior.AllowGet);
        }
        //編輯存檔
        public JsonResult N4N3Edit(tNWord form)
        {
            tNWord Nword = new tNWord();
            var EditWord = db.tNWord.FirstOrDefault(m => m.No == form.No);
            {
                EditWord.日文 = form.日文;
                EditWord.中文 = form.中文;
                EditWord.假名 = form.假名;
                EditWord.種類 = form.種類;
                EditWord.難度 = form.難度;
            }
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }
        public JsonResult SearchWord(string searching)
        {
            var searchword = db.tNWord.Where(m => m.日文.Contains(searching) || m.中文.Contains(searching) || m.假名.Contains(searching) || m.種類.Contains(searching) || m.難度.Contains(searching)).Select(m => new
            {
                No = m.No,
                日文 = m.日文,
                中文 = m.中文,
                假名 = m.假名,
                種類 = m.種類,
                難度 = m.難度
            });
            var WordList = searchword.OrderBy(m => m.No);
            return Json(searchword, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Member(int Member)
        {
            if (Member == 0)
                return Json(0, JsonRequestBehavior.AllowGet);
            var Memberchoose = db.tMembers.FirstOrDefault(m => m.MemberID == Member).fIdentity;
            return Json(Memberchoose, JsonRequestBehavior.AllowGet);
        }
    }
}