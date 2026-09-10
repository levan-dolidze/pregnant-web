using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PregnantWeb.Migrations
{
    public partial class AddContentTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Blogs",
                columns: table => new
                {
                    BlogId = table.Column<string>(type: "text", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: false),
                    DoctorFullName = table.Column<string>(type: "text", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blogs", x => x.BlogId);
                });

            migrationBuilder.CreateTable(
                name: "ContactInfo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Address = table.Column<string>(type: "text", nullable: false),
                    MobileNumber = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    WorkingHours = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactInfo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Promo",
                columns: table => new
                {
                    CourseId = table.Column<int>(type: "integer", nullable: false),
                    CourseName = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    LessonQty = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    VideoUrl = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Promo", x => x.CourseId);
                });

            migrationBuilder.InsertData(
                table: "Blogs",
                columns: new[] { "BlogId", "Content", "Date", "DoctorFullName", "Title", "Url" },
                values: new object[,]
                {
                    { "1", "Sample blog content.", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Dr. Nino Beridze", "Sample blog title", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJRuWFdumlIeB3qvtAKUpUh7MEnyoJQlODKPMpSZMh2A&s=10" },
                    { "2", "Sample blog content.", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Dr. sia dolidze", "Sample blog title", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdAHYzOSCfysHMgI9tjWaLz4AjkkEDFl0gYt3uTqktcQ&s=10" }
                });

            migrationBuilder.InsertData(
                table: "ContactInfo",
                columns: new[] { "Id", "Address", "Email", "MobileNumber", "WorkingHours" },
                values: new object[] { 1, "თბილისი, ლუბლიანას ქ. 5, Mikheil Chiaureli Ln, Tbilisi", "contact@example.com", "+995 555 00 00 00", "Mon-Fri 09:00-18:00" });

            migrationBuilder.InsertData(
                table: "Promo",
                columns: new[] { "CourseId", "CourseName", "Description", "LessonQty", "Price", "Title", "VideoUrl" },
                values: new object[,]
                {
                    { 1, "ორსულთა ონლაინ სკოლა", "9 ვიდეო გაკვეთილი ორსულობის და მშობიარობის შესახებ. 📌დამატებითი მასალა ფაილების სახით. 📌მუდმივი კავშირი ჩემთან-გამოცდილ მეან—გინეკოლოგთან-სადაც ამომწურავად აგიხსნით თქვენთვის საინტერესო საკითხებს. 📌ხშირად დასმული შეკითხვები და პასუხები.", 9, 120m, "ვემზადებით მშობიარობისთვის", "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1" },
                    { 2, "ორსულობისთვის მომზადება-გზამკვლევი", "ორსულობისთვის მომზადება ექიმთან ერთად : ონლაინ ლექციები..📍ვისთვის არის ეს ლექციები? 📍ეს ლექციები შენთვისაა: 📌თუ გეგმავ ორსულობას უახლოეს 3–12 თვეში 📌გინდა ექიმის მიერ მოწოდებული ინფორმაცია 📌 გსურს მშვიდად და გააზრებულად დაიწყო ორსულობა . ❌ ვებინარი არ არის მათთვის, ვინც უკვე ორსულად არის და ეძებს ორსულობის მართვის ინფორმაციას. 📝 რა შედის? სრული აღწერილობისთვის ეწვიეთ ჩემს ინსტაგრამ გვერდს ან მომწერეთ პირადში.", 1, 50m, "პრეგრავიდარული მომზადება-გზა ბედნიერი დედობისაკენ", "https://www.youtube.com/embed/y8Ja-m_4rHk?rel=0&modestbranding=1" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Blogs");

            migrationBuilder.DropTable(
                name: "ContactInfo");

            migrationBuilder.DropTable(
                name: "Promo");
        }
    }
}
