using prjTeam2_Final.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace prjTeam2_Final.Controllers
{
    public class CalendarController : Controller
    {
        // GET: Calendar
        public ActionResult Calendar()
        {
            return View();
        }
        public JsonResult GetEvents()
        {
            using (dbTeam2_FinalEntities db = new dbTeam2_FinalEntities())
            {
                var events = db.Events.ToList();
                return new JsonResult { Data = events, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        [HttpPost]
        public JsonResult SaveEvent(Events e)
        {
            var status = false;
            using (dbTeam2_FinalEntities db = new dbTeam2_FinalEntities())
            {
                if (e.EventID > 0)
                {
                    //Update the event
                    var v = db.Events.Where(a => a.EventID == e.EventID).FirstOrDefault();
                    if (v != null)
                    {
                        v.Title = e.Title;
                        v.Place = e.Place;
                        v.Start = e.Start;
                        v.end = e.end;
                        v.Description = e.Description;
                        v.ThemeColor = e.ThemeColor;
                        v.Type = e.Type;
                        v.CreaterID = e.CreaterID;
                    }
                }
                else
                {
                    db.Events.Add(e);
                }

                db.SaveChanges();
                status = true;

                var eventid = db.Events.OrderByDescending(m => m.EventID).FirstOrDefault().EventID;
                var me = new Member_Event();
                me.EventID = eventid;
                me.MemberID = e.CreaterID;
                db.Member_Event.Add(me);
                db.SaveChanges();
            }


            return new JsonResult { Data = new { status = status } };
        }


        [HttpPost]
        public JsonResult DeleteEvent(int eventID)
        {
            var status = false;
            using (dbTeam2_FinalEntities db = new dbTeam2_FinalEntities())
            {
                var v = db.Events.Where(a => a.EventID == eventID).FirstOrDefault();
                if (v != null)
                {
                    db.Events.Remove(v);
                    db.SaveChanges();
                    status = true;
                }
            }
            return new JsonResult { Data = new { status = status } };
        }

        public JsonResult AddEvent(int EventID,int MemberID)
        {
            using (dbTeam2_FinalEntities db = new dbTeam2_FinalEntities())
            {
                var me = new Member_Event();
                me.EventID = EventID;
                me.MemberID = MemberID;
                db.Member_Event.Add(me);
                db.SaveChanges();
            }
                return Json("", JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetJoinedEvents(int MemberID)
        {
            using (dbTeam2_FinalEntities db = new dbTeam2_FinalEntities())
            {
                var result = from me in db.Member_Event.Where(m => m.MemberID == MemberID)
                             join ets in db.Events
                             on me.EventID equals ets.EventID into mes
                             from e in mes.DefaultIfEmpty()
                             select new 
                             {
                                 EventID = e.EventID,
                                 Title = e.Title,
                                 Place = e.Place,
                                 Type = e.Type,
                                 Description = e.Description,
                                 Start = e.Start,
                                 end = e.end,
                                 ThemeColor = e.ThemeColor,
                                 CreaterID = e.CreaterID
                             };
                var events = result.ToList();

                return new JsonResult { Data = events, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

    }


}