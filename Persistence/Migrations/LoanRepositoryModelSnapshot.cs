﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence.Loan;

namespace Persistence.Migrations
{
    [DbContext(typeof(LoanRepository))]
    partial class LoanRepositoryModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Domain.Loan.LoanEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<float>("InterestRate");

                    b.Property<string>("Lender");

                    b.Property<DateTime>("PaymentDate");

                    b.HasKey("Id");

                    b.ToTable("Loan");
                });

            modelBuilder.Entity("Domain.Loan.LoanPaymentEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("AdditionalPrincipal");

                    b.Property<DateTime>("Date");

                    b.Property<decimal>("EndBalance");

                    b.Property<int?>("LoanEntityId");

                    b.Property<decimal>("MinimumInterest");

                    b.Property<decimal>("MinimumPrincipal");

                    b.Property<decimal>("StartBalance");

                    b.Property<decimal>("TotalPayment");

                    b.HasKey("Id");

                    b.HasIndex("LoanEntityId");

                    b.ToTable("LoanPayment");
                });

            modelBuilder.Entity("Domain.Loan.LoanPaymentEntity", b =>
                {
                    b.HasOne("Domain.Loan.LoanEntity")
                        .WithMany("Payments")
                        .HasForeignKey("LoanEntityId");
                });
#pragma warning restore 612, 618
        }
    }
}
