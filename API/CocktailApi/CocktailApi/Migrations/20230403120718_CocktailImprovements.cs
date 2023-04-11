using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CocktailApi.Migrations
{
    /// <inheritdoc />
    public partial class CocktailImprovements : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GlassType",
                table: "Cocktails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsPublic",
                table: "Cocktails",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "UserUID",
                table: "Cocktails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GlassType",
                table: "Cocktails");

            migrationBuilder.DropColumn(
                name: "IsPublic",
                table: "Cocktails");

            migrationBuilder.DropColumn(
                name: "UserUID",
                table: "Cocktails");
        }
    }
}
