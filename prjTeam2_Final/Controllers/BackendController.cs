using prjTeam2_Final.Models;
using prjTeam2_Final.Models.genericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace prjTeam2_Final.Controllers
{
    public class BackendController : Controller
    {

        MRepository<tMembers> MIT = new MRepository<tMembers>();
        dbTeam2_FinalEntities db = new dbTeam2_FinalEntities();

        // GET: Backend
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult privateInfo()
        {
            int adminId = int.Parse(Request.Cookies["Login"]["MemberID"]);

            var info = db.tMembers.Where(m => m.MemberID == adminId).Select(m => new
            {
                id = m.MemberID,
                name = m.fMemberName,
                nickname = m.fNickname,
                birthday = m.fBirthday,
                account = m.fAccount,
                password = m.fPassword,
                gender = m.fGender,
                occupation = m.fOccupation,
                nationality = m.fNationality,
                livingarea = m.fLivingArea,
                jlpt = m.fJLPTLevel,
                goal = m.fGoal
            });

            return Json(info, JsonRequestBehavior.AllowGet);
        }

        public ActionResult privateInfoUpdate(string nickname, string password, string occupation, string livingarea, string jlptlevel, string goal)
        {
            int adminId = int.Parse(Request.Cookies["Login"]["MemberID"]);

            var tM = db.tMembers.FirstOrDefault(m => m.MemberID == adminId);

            tM.fNickname = nickname;
            tM.fPassword = password;
            tM.fOccupation = occupation;
            tM.fLivingArea = livingarea;
            tM.fJLPTLevel = jlptlevel;
            tM.fGoal = goal;
            db.SaveChanges();

            return Json("更新成功", JsonRequestBehavior.AllowGet);
        }

        public ActionResult getMemberList()
        {
            var ml = db.tMembers.Select(m => new
            {
                id = m.MemberID,
                identity = m.fIdentity,
                name = m.fMemberName,
                nickname = m.fNickname,
                registrationdate = m.fRegisteredDate,
                alive = m.fAlive,
            });
            return Json(ml, JsonRequestBehavior.AllowGet);
        }

        public ActionResult savechangesMemberList(int mId, string identity, string alive)
        {
            bool alv;
            if (alive == "false")
            {
                alv = false;
                var ml = db.tMembers.FirstOrDefault(m => m.MemberID == mId);
                ml.fIdentity = identity;
                ml.fAlive = alv;
                db.SaveChanges();
            }
            else if (alive == "true")
            {
                alv = true;
                var ml = db.tMembers.FirstOrDefault(m => m.MemberID == mId);
                ml.fIdentity = identity;
                ml.fAlive = alv;
                db.SaveChanges();
            }
            return Json("修改狀態:成功", JsonRequestBehavior.AllowGet);
        }

        public ActionResult filterMemberList(string filter1, string filter2, string filter3)
        {
            bool val;
            if (filter1 == "admin")
            {
                if (filter2 == "accountAlive")
                {
                    if (filter3 == "true")
                    {
                        val = true;
                        var filterResult1 = db.tMembers.Where(m => m.fIdentity == filter1 && m.fAlive == val).Select(m => new
                        {
                            id = m.MemberID,
                            identity = m.fIdentity,
                            name = m.fMemberName,
                            nickname = m.fNickname,
                            registrationdate = m.fRegisteredDate,
                            alive = m.fAlive,
                        });
                        return Json(filterResult1, JsonRequestBehavior.AllowGet);
                    }
                    else if (filter3 == "false")
                    {
                        val = false;
                        var filterResult2 = db.tMembers.Where(m => m.fIdentity == filter1 && m.fAlive == val).Select(m => new
                        {
                            id = m.MemberID,
                            identity = m.fIdentity,
                            name = m.fMemberName,
                            nickname = m.fNickname,
                            registrationdate = m.fRegisteredDate,
                            alive = m.fAlive,
                        });
                        return Json(filterResult2, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            if (filter1 == "member")
            {
                if (filter2 == "accountAlive")
                {
                    if (filter3 == "true")
                    {
                        val = true;
                        var filterResult3 = db.tMembers.Where(m => m.fIdentity == filter1 && m.fAlive == val).Select(m => new
                        {
                            id = m.MemberID,
                            identity = m.fIdentity,
                            name = m.fMemberName,
                            nickname = m.fNickname,
                            registrationdate = m.fRegisteredDate,
                            alive = m.fAlive,
                        });
                        return Json(filterResult3, JsonRequestBehavior.AllowGet);
                    }
                    else if (filter3 == "false")
                    {
                        val = false;
                        var filterResult4 = db.tMembers.Where(m => m.fIdentity == filter1 && m.fAlive == val).Select(m => new
                        {
                            id = m.MemberID,
                            identity = m.fIdentity,
                            name = m.fMemberName,
                            nickname = m.fNickname,
                            registrationdate = m.fRegisteredDate,
                            alive = m.fAlive,
                        });
                        return Json(filterResult4, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            return Json("", JsonRequestBehavior.AllowGet);
        }

        public ActionResult getGenderPercentage()
        {
            var genderm = db.tMembers.Select(m => m.fGender == "男");
            return Json(genderm, JsonRequestBehavior.AllowGet);
        }

        public ActionResult getLivingareaPercentage()
        {
            var tpc = db.tMembers.Select(m => m.fLivingArea == "臺北市");
            var ntc = db.tMembers.Select(m => m.fLivingArea == "新北市");
            var klc = db.tMembers.Select(m => m.fLivingArea == "基隆市");
            var tyc = db.tMembers.Select(m => m.fLivingArea == "桃園市");
            var hcc = db.tMembers.Select(m => m.fLivingArea == "新竹市");
            var hccc = db.tMembers.Select(m => m.fLivingArea == "新竹縣");
            var mlcc = db.tMembers.Select(m => m.fLivingArea == "苗栗縣");
            var tcc = db.tMembers.Select(m => m.fLivingArea == "臺中市");
            var chcc = db.tMembers.Select(m => m.fLivingArea == "彰化縣");
            var ntcc = db.tMembers.Select(m => m.fLivingArea == "南投縣");
            var ylc = db.tMembers.Select(m => m.fLivingArea == "雲林縣");
            var cyc = db.tMembers.Select(m => m.fLivingArea == "嘉義市");
            var cycc = db.tMembers.Select(m => m.fLivingArea == "嘉義縣");
            var tnc = db.tMembers.Select(m => m.fLivingArea == "臺南市");
            var ksc = db.tMembers.Select(m => m.fLivingArea == "高雄市");
            var ptcc = db.tMembers.Select(m => m.fLivingArea == "屏東縣");
            var ylcc = db.tMembers.Select(m => m.fLivingArea == "宜蘭縣");
            var hlcc = db.tMembers.Select(m => m.fLivingArea == "花蓮縣");
            var ttcc = db.tMembers.Select(m => m.fLivingArea == "臺東縣");
            var phcc = db.tMembers.Select(m => m.fLivingArea == "澎湖縣");
            var kmcc = db.tMembers.Select(m => m.fLivingArea == "金門縣");
            var ljcc = db.tMembers.Select(m => m.fLivingArea == "連江縣");

            List<IQueryable> lbool = new List<IQueryable>();
            lbool.Add(tpc);
            lbool.Add(ntc);
            lbool.Add(klc);
            lbool.Add(tyc);
            lbool.Add(hcc);
            lbool.Add(hccc);
            lbool.Add(mlcc);
            lbool.Add(tcc);
            lbool.Add(chcc);
            lbool.Add(ntcc);
            lbool.Add(ylc);
            lbool.Add(cyc);
            lbool.Add(cycc);
            lbool.Add(tnc);
            lbool.Add(ksc);
            lbool.Add(ptcc);
            lbool.Add(ylcc);
            lbool.Add(hlcc);
            lbool.Add(ttcc);
            lbool.Add(phcc);
            lbool.Add(kmcc);
            lbool.Add(ljcc);

            return Json(lbool, JsonRequestBehavior.AllowGet);
        }

        public ActionResult getLogIORecord()
        {
            var lio = db.tLogIORecord.Select(l => new
            {
                lond = l.fLogOnDatetime,
                loffd = l.fLogOffDatetime,
            });

            return Json(lio, JsonRequestBehavior.AllowGet);
        }

        public ActionResult getMemberAge()
        {
            //不分性別
            var allagerange = from m in db.tMembers
                              select new
                              {
                                  m.fBirthday,
                                  m.fGender
                              };

            return Json(allagerange, JsonRequestBehavior.AllowGet);
        }
    }
}