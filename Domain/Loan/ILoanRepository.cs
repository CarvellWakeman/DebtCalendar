using System.Collections.Generic;

namespace Domain.Loan
{
    public interface ILoanRepository
    {
        void CreateLoan(LoanEntity loan);
        void UpdateLoan(LoanEntity loan);
        void DeleteLoan(LoanEntity loan);
        LoanEntity GetLoan(int id);
        IEnumerable<LoanEntity> GetLoans();
    }
}
