using Domain.Loan;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Persistence.Loan
{
    public class LoanRepository : DbContext, ILoanRepository
    {
        public DbSet<LoanEntity> Loans { get; set; }

        public LoanRepository(DbContextOptions<LoanRepository> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LoanEntity>()
                .HasMany(l => l.Payments)
                .WithOne(lp => lp.Loan)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }

        public void CreateLoan(LoanEntity loan)
        {
            Loans.Add(loan);
            SaveChanges();
        }

        public void UpdateLoan(LoanEntity loan)
        {
            Loans.Update(loan);
            SaveChanges();
        }

        public void DeleteLoan(LoanEntity loan)
        {
            Loans.Remove(loan);
            SaveChanges();
        }

        public LoanEntity GetLoan(int id)
        {
            return Loans.FirstOrDefault(l => l.Id == id);
        }

        public IEnumerable<LoanEntity> GetLoans()
        {
            return Loans;
        }
    }
}
