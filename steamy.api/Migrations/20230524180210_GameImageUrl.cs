using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace steamy.api.Migrations
{
    /// <inheritdoc />
    public partial class GameImageUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GameImageUrl",
                table: "Notes",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GameImageUrl",
                table: "Notes");
        }
    }
}
