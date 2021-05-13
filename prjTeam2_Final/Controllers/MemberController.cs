using prjTeam2_Final.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace prjTeam2_Final.Controllers
{
    public class MemberController : Controller
    {
        // GET: Member

        dbTeam2_FinalEntities db = new dbTeam2_FinalEntities();

        //<----------------------------------------顯示個人題庫分類--------------------------------->
        public JsonResult ShowCategory(int MemberID)
        {
            var list = db.tCustomizeTopic.Where(m => m.MemberID == MemberID).GroupBy(m => m.Category, (t, tn) => new { Category = t });
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //<----------------------------------------顯示個人題庫內容--------------------------------->

        public JsonResult ShowTopic(string Category, int MemberID)
        {
            var list = db.tCustomizeTopic.Where(m => m.Category == Category && m.MemberID == MemberID).Select(m => new
            {
                No = m.No,
                Question = m.Question,
                Answer = m.Answer,
                Category=m.Category,
            });
            return Json(list, JsonRequestBehavior.AllowGet);

        }
        //<--------------------------重新命名分類名稱--------------------------->
        public JsonResult ReCategoryName(string Category, int MemberID,string OldCategory)
        {
            var count = db.tCustomizeTopic.Where(m => m.Category == OldCategory && m.MemberID == MemberID).Count();
            for (int i = 0; i < count; i++)
            {
                db.tCustomizeTopic.FirstOrDefault(m => m.Category == OldCategory && m.MemberID == MemberID).Category = Category;
                db.SaveChanges();
            }
            return Json("", JsonRequestBehavior.AllowGet);
        }

        //<-----------------------新增編輯個人題目------------------------------>
        public JsonResult CreateTopic(tCustomizeTopic formdata)
        {
            if(formdata.No==0)
            {
                db.tCustomizeTopic.Add(formdata);
                db.SaveChanges();
            }
            else
            {
                var tct = db.tCustomizeTopic.FirstOrDefault(m => m.No == formdata.No);
                tct.Answer = formdata.Answer;
                tct.Question = formdata.Question;
                tct.Category = formdata.Category;
                db.SaveChanges();
            }
            return Json("", JsonRequestBehavior.AllowGet);
        }

        //<----------------------個人圖片上傳------------------------------->
        public JsonResult Imgupload(HttpPostedFileBase photo)
        {
            string filepath = "";
            int MemberID = int.Parse(Request.Cookies["Login"]["MemberID"]);
            if(photo==null)
                return Json(filepath, JsonRequestBehavior.AllowGet);

            if (photo.ContentLength > 0)
            {
                filepath = $"/MemberImg/Member{MemberID}.jpg";
                photo.SaveAs(Server.MapPath("~") + filepath);

                db.tMembers.FirstOrDefault(m => m.MemberID == MemberID).ImgURL = filepath;
                db.SaveChanges();
            }
            return Json(filepath, JsonRequestBehavior.AllowGet);
        }
        //<-------------------------顯示個人圖片---------------------------->
        public JsonResult ReImg(int MemberID)
        {
            var list = db.tMembers.FirstOrDefault(m => m.MemberID == MemberID).ImgURL == null ? "null" : db.tMembers.FirstOrDefault(m => m.MemberID == MemberID).ImgURL;


            return Json(list, JsonRequestBehavior.AllowGet);
        }
        //<------------------------回傳編輯題目----------------------------->
        public JsonResult ReturnTopic(int No)
        {
            var list = db.tCustomizeTopic.Where(m => m.No == No).Select(m => new
            {
                Question=m.Question,
                Answer=m.Answer,
            });
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        //<------------------------刪除題目----------------------------->
        public JsonResult DelTopic(int No)
        {
            var del = db.tCustomizeTopic.FirstOrDefault(m => m.No == No);
            db.tCustomizeTopic.Remove(del);
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }


        //<-----------------------發表和回覆的文章-------------------------------->

        public JsonResult MemberDiscussList(int MemberID)
        {
            var list = db.tArticle.Where(m => m.MemberID == MemberID).Select(m => new
            {
                ArticleID=m.ArticleID,
                Category=m.Category,
                Title=m.Title,
                LoveCount=m.LoveCount,
                UpTime=m.UpTime,
            });
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult MemberReDiscussList(int MemberID)
        {
            var list = db.tReArticle.Where(m => m.MemberID == MemberID).Select(m => new
            {
                ArticleID = db.tArticle.FirstOrDefault(t => t.ArticleID == m.ArticleID).ArticleID,
                Category = db.tArticle.FirstOrDefault(t => t.ArticleID == m.ArticleID).Category,
                Title = db.tArticle.FirstOrDefault(t=>t.ArticleID==m.ArticleID).Title,
                LoveCount = m.LoveCount,
                UpTime = m.UpTime,
            });
            return Json(list, JsonRequestBehavior.AllowGet);
        }

    }
}