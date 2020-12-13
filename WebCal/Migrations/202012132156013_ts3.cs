namespace WebCal.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ts3 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Sessions",
                c => new
                    {
                        sessionID = c.Int(nullable: false, identity: true),
                        IP = c.String(),
                        ReqDateTime = c.DateTime(nullable: false),
                        operation = c.String(),
                        value1 = c.Double(nullable: false),
                        value2 = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.sessionID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Sessions");
        }
    }
}
