//------------------------------------------------------------------------------
// <auto-generated>
//     這個程式碼是由範本產生。
//
//     對這個檔案進行手動變更可能導致您的應用程式產生未預期的行為。
//     如果重新產生程式碼，將會覆寫對這個檔案的手動變更。
// </auto-generated>
//------------------------------------------------------------------------------

namespace prjTeam2_Final.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tReComment
    {
        public int No { get; set; }
        public Nullable<int> MemberID { get; set; }
        public Nullable<int> ReArticleID { get; set; }
        public string Main { get; set; }
        public Nullable<System.DateTime> UpTime { get; set; }
    
        public virtual tMembers tMembers { get; set; }
        public virtual tReArticle tReArticle { get; set; }
    }
}
