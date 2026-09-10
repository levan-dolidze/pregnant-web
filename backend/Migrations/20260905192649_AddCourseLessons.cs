using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PregnantWeb.Migrations
{
    public partial class AddCourseLessons : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CourseLessons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Chapter = table.Column<string>(type: "text", nullable: false),
                    SectionId = table.Column<int>(type: "integer", nullable: false),
                    SectionName = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: false),
                    Duration = table.Column<string>(type: "text", nullable: false),
                    TypeId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseLessons", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "CourseLessons",
                columns: new[] { "Id", "Chapter", "Duration", "SectionId", "SectionName", "Title", "TypeId", "Url" },
                values: new object[,]
                {
                    { 1, "intro", "05:30", 1, "who_am_i", "ვინ ვარ", 1, "https://www.youtube.com/embed/jNQXAC9IVRw?rel=0&modestbranding=1" },
                    { 2, "intro", "04:10", 2, "what_you_will_learn", "რას შეისწავლი", 1, "https://www.youtube.com/embed/9bZkp7q19f0?rel=0&modestbranding=1" },
                    { 3, "childNutrition", "08:20", 1, "breastfeeding", "ძუძუთი კვება", 1, "https://www.youtube.com/embed/kJQP7kiw5Fk?rel=0&modestbranding=1" },
                    { 4, "childNutrition", "07:15", 2, "bottle_feeding", "ხელოვნური კვება", 1, "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseLessons");
        }
    }
}
