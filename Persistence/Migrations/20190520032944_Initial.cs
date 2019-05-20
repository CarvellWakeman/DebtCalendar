using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Loan",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Lender = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    PaymentDate = table.Column<DateTime>(nullable: false),
                    InterestRate = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Loan", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LoanPayment",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Date = table.Column<DateTime>(nullable: false),
                    StartBalance = table.Column<decimal>(nullable: false),
                    MinimumInterest = table.Column<decimal>(nullable: false),
                    MinimumPrincipal = table.Column<decimal>(nullable: false),
                    AdditionalPrincipal = table.Column<decimal>(nullable: false),
                    TotalPayment = table.Column<decimal>(nullable: false),
                    EndBalance = table.Column<decimal>(nullable: false),
                    LoanEntityId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoanPayment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LoanPayment_Loan_LoanEntityId",
                        column: x => x.LoanEntityId,
                        principalTable: "Loan",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LoanPayment_LoanEntityId",
                table: "LoanPayment",
                column: "LoanEntityId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LoanPayment");

            migrationBuilder.DropTable(
                name: "Loan");
        }
    }
}
