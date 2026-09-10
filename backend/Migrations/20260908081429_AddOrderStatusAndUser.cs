using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PregnantWeb.Migrations
{
    public partial class AddOrderStatusAndUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "RegisterOrders",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "RegisterOrders",
                type: "integer",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "RegisterOrders");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "RegisterOrders");
        }
    }
}
