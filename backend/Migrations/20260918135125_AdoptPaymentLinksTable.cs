using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PregnantWeb.Migrations
{
    public partial class AdoptPaymentLinksTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClientName",
                table: "ContactMessages",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "WeekendWorkingHours",
                table: "ContactInfo",
                type: "text",
                nullable: false,
                defaultValue: "");

            // payment_links already exists in the database (created by hand, outside
            // migrations). We only want EF's migration history to start tracking it
            // from here on, not to try creating it again.
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Not dropping payment_links here either — this migration never created
            // it, so rolling back must not delete the real table/data.

            migrationBuilder.DropColumn(
                name: "ClientName",
                table: "ContactMessages");

            migrationBuilder.DropColumn(
                name: "WeekendWorkingHours",
                table: "ContactInfo");
        }
    }
}
