﻿using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using prjTeam2_Final.Infrastructure.Helpers;
using prjTeam2_Final.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace prjTeam2_Final.Controllers
{
    public class ImportExcelController : Controller
    {
        // GET: ImportExcelController
        dbTeam2_FinalEntities db = new dbTeam2_FinalEntities();
        //GET: Test

        private string fileSavedPath = WebConfigurationManager.AppSettings["UploadPath"];

        [HttpPost]
        public ActionResult Upload(HttpPostedFileBase file)
        {
            JObject jo = new JObject();
            string result = string.Empty;

            if (file == null)
            {
                jo.Add("Result", false);
                jo.Add("Msg", "請上傳檔案!");
                result = JsonConvert.SerializeObject(jo);
                return Content(result, "application/json");
            }
            if (file.ContentLength <= 0)
            {
                jo.Add("Result", false);
                jo.Add("Msg", "請上傳正確的檔案.");
                result = JsonConvert.SerializeObject(jo);
                return Content(result, "application/json");
            }

            string fileExtName = Path.GetExtension(file.FileName).ToLower();

            if (!fileExtName.Equals(".xls", StringComparison.OrdinalIgnoreCase)
                &&
                !fileExtName.Equals(".xlsx", StringComparison.OrdinalIgnoreCase))
            {
                jo.Add("Result", false);
                jo.Add("Msg", "請上傳 .xls 或 .xlsx 格式的檔案");
                result = JsonConvert.SerializeObject(jo);
                return Content(result, "application/json");
            }

            try
            {
                var uploadResult = this.FileUploadHandler(file);

                jo.Add("Result", !string.IsNullOrWhiteSpace(uploadResult));
                jo.Add("Msg", !string.IsNullOrWhiteSpace(uploadResult) ? uploadResult : "");

                result = JsonConvert.SerializeObject(jo);
            }
            catch (Exception ex)
            {
                jo.Add("Result", false);
                jo.Add("Msg", ex.Message);
                result = JsonConvert.SerializeObject(jo);
            }
            return Content(result, "application/json");
        }

        private string FileUploadHandler(HttpPostedFileBase file)
        {
            string result;

            if (file == null)
            {
                throw new ArgumentNullException("file", "上傳失敗：沒有檔案！");
            }
            if (file.ContentLength <= 0)
            {
                throw new InvalidOperationException("上傳失敗：檔案沒有內容！");
            }

            try
            {
                string virtualBaseFilePath = Url.Content(fileSavedPath);
                string filePath = HttpContext.Server.MapPath(virtualBaseFilePath);

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                string newFileName = string.Concat(
                    DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                    Path.GetExtension(file.FileName).ToLower());

                string fullFilePath = Path.Combine(Server.MapPath(fileSavedPath), newFileName);
                file.SaveAs(fullFilePath);

                result = newFileName;
            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }



        [HttpPost]
        public ActionResult Import(string savedFileName)
        {
            var jo = new JObject();
            string result;

            try
            {
                var fileName = string.Concat(Server.MapPath(fileSavedPath), "/", savedFileName);

                var importTCT = new List<tCustomizeTopic>();
                var MemberID = Request.Cookies["Login"]["MemberID"];
                var Category = Request.Cookies["Category"].Value;
                Response.Cookies["Category"].Expires = DateTime.Now.AddSeconds(-1);
                var helper = new ImportDataHelper();
                var checkResult = helper.CheckImportData(fileName, importTCT, MemberID, Category);

                jo.Add("Result", checkResult.Success);
                jo.Add("Msg", checkResult.Success ? string.Empty : checkResult.ErrorMessage);

                if (checkResult.Success)
                {
                    //儲存匯入的資料
                    helper.SaveImportData(importTCT);
                }
                Response.Cookies["Category"].Expires = DateTime.Now.AddSeconds(-1);
                result = JsonConvert.SerializeObject(jo);
        }
            catch (Exception ex)
            {
                throw;
            }

            return Content(result, "application/json");
        }
    }
}