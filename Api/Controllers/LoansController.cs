using Domain.Loan;
using Microsoft.AspNetCore.Mvc;
using Persistence.Loan;
using System.Collections.Generic;
using System.Linq;

namespace Api.Controllers
{
    [Route("api/loans")]
    [ApiController]
    public class LoansController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<LoanEntity> GetLoans([FromServices] ILoanRepository loanRepository)
        {
            return loanRepository.GetLoans().ToList();
        }

        [HttpGet("{id}")]
        public LoanEntity GetLoan([FromServices] ILoanRepository loanRepository, int id)
        {
            return loanRepository.GetLoan(id);
        }

        [HttpPost]
        public void CreateLoan([FromServices] ILoanRepository loanRepository, LoanEntity loan)
        {
            loanRepository.CreateLoan(loan);
        }

        [HttpPost("Payment")]
        public void CreateLoanPayment([FromServices] ILoanRepository loanRepository, int id, LoanPaymentEntity payment)
        {
            var loan = loanRepository.GetLoan(id);
            var payments = new List<LoanPaymentEntity>(loan.Payments);
            payments.Add(payment);
            loan.Payments = payments;
            loanRepository.UpdateLoan(loan);
        }

        [HttpPut("{id}")]
        public void UpdateLoan([FromServices] ILoanRepository loanRepository, LoanEntity loan)
        {
            loanRepository.UpdateLoan(loan);
        }

        [HttpDelete("{id}")]
        public void DeleteLoan([FromServices] ILoanRepository loanRepository, int id)
        {
            var loan = loanRepository.GetLoan(id);
            loanRepository.DeleteLoan(loan);
        }
    }
}
