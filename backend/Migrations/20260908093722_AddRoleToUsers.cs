using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PregnantWeb.Migrations
{
    public partial class AddRoleToUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "user");

            // Every existing/new user defaults to "user" above; this is the
            // one account that should be "admin".
            migrationBuilder.Sql(
                "UPDATE \"Users\" SET \"Role\" = 'admin' WHERE \"PersonalNumber\" = '01022012447';");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "Users");
        }
    }
}
