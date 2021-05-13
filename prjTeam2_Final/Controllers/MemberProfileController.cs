using System;
using System.Linq;
using System.Web.Mvc;
using prjTeam2.Models.genericRepository;
using prjTeam2_Final.Models;
using prjTeam2_Final.Models.genericRepository;

namespace prjTeam2.Controllers
{
    public class MemberProfileController : Controller
    {
        PostRepository<tMembers> tm = new PostRepository<tMembers>();
        PostRepository<tPost> dbTeam2_FinalEntities = new PostRepository<tPost>();
        dbTeam2_FinalEntities db = new dbTeam2_FinalEntities();

        // GET: Member
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ProfileResume()
        {
            return View();
        }
        //<-----------------------個人頁面載入---------------------->
        public JsonResult ShowMember(int MemberID)
        {
            var list = tm.getAll().Where(m => m.MemberID == MemberID).Select(m => new
            {
                MemberName = m.fMemberName,

            });
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //<-----------------------發文事件-------------------------->
        [HttpPost]
        public string PostDiary(int MemberID, string content)
        {

            tPost pp = new tPost()
            {
                MemberID = MemberID,
                fPostDatetime = DateTime.Now,
                fPost = content,
            };
            db.tPost.Add(pp);
            db.SaveChanges();
            return content;
        }


        public JsonResult MainProfile(int MemberID)
        {

            var list = db.tPost.Where(m => m.MemberID == MemberID).Select(m => new
            {
                fPostID = m.fPostID,
                fPost = m.fPost,
                fPostDate = m.fPostDatetime.ToString(),
            });

            return Json(list, JsonRequestBehavior.AllowGet);
        }
        //<-------------------------------編輯文章------------------------------>
        public JsonResult EditPost(int fPostID, string fPost)
        {
            var edit = db.tPost.FirstOrDefault(m => m.fPostID == fPostID);

            edit.fPost = fPost;

            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);


        }
        //<-------------------------------刪除文章------------------------------>
        public JsonResult DeletePost(int fPostID)
        {
            var aa = db.tPost.FirstOrDefault(m => m.fPostID == fPostID);
            db.tPost.Remove(aa);
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }
        //<----------------------------左上的小卡片--------------------------->
        public JsonResult CardProfile(int MemberID)
        {
            var Id = db.tMembers.FirstOrDefault(m => m.MemberID == MemberID);

            tMembers ff = new tMembers
            {
                fMemberName = Id.fMemberName,
                fNickname = Id.fNickname,
                fLivingArea = Id.fLivingArea,
            };

            return Json(ff, JsonRequestBehavior.AllowGet);
        }
        //<---------------------------------秀出回傳的個人資訊---------------------------->
        public JsonResult ProfileInfoNew(int MemberID)
        {
            var Id = db.tMembers.FirstOrDefault(m => m.MemberID == MemberID);
            tMembers ff = new tMembers
            {
                fMemberName = Id.fMemberName,
                fNickname = Id.fNickname,
                fGender = Id.fGender,
                fJLPTLevel = Id.fJLPTLevel,
                fLivingArea = Id.fLivingArea,
                fNationality = Id.fNationality,
                fOccupation = Id.fOccupation,
                fGoal = Id.fGoal,
            };
            return Json(ff, JsonRequestBehavior.AllowGet);
        }

        ////<---------------------------------編輯+儲存個人資訊---------------------------->

        [HttpPost]
        public JsonResult EditProfile(tMembers formdata)
        {
            var edit = db.tMembers.FirstOrDefault(m => m.MemberID == formdata.MemberID);
            edit.fLivingArea = formdata.fLivingArea;
            edit.fNickname = formdata.fNickname;
            edit.fNationality = formdata.fNationality;
            edit.fJLPTLevel = formdata.fJLPTLevel;
            edit.fGender = formdata.fGender;
            edit.fOccupation = formdata.fOccupation;
            edit.fGoal = formdata.fGoal;
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }








    }
}