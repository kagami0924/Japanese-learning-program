﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class dbTeam2_FinalEntities : DbContext
    {
        public dbTeam2_FinalEntities()
            : base("name=dbTeam2_FinalEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<cGrade> cGrade { get; set; }
        public virtual DbSet<Events> Events { get; set; }
        public virtual DbSet<Member_Event> Member_Event { get; set; }
        public virtual DbSet<N1> N1 { get; set; }
        public virtual DbSet<N2> N2 { get; set; }
        public virtual DbSet<N3> N3 { get; set; }
        public virtual DbSet<N4> N4 { get; set; }
        public virtual DbSet<N5> N5 { get; set; }
        public virtual DbSet<tArticle> tArticle { get; set; }
        public virtual DbSet<tArticleLove> tArticleLove { get; set; }
        public virtual DbSet<tComment> tComment { get; set; }
        public virtual DbSet<tCustomizeTopic> tCustomizeTopic { get; set; }
        public virtual DbSet<tLogIORecord> tLogIORecord { get; set; }
        public virtual DbSet<tMembers> tMembers { get; set; }
        public virtual DbSet<tNewsCollection> tNewsCollection { get; set; }
        public virtual DbSet<tNWord> tNWord { get; set; }
        public virtual DbSet<tPost> tPost { get; set; }
        public virtual DbSet<tReArticle> tReArticle { get; set; }
        public virtual DbSet<tReArticleLove> tReArticleLove { get; set; }
        public virtual DbSet<tReComment> tReComment { get; set; }
    }
}