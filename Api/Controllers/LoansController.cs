using Api.Mapping;
using Api.Models;
using Domain.Loan;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Api.Controllers
{
    [Route("api/loans")]
    [ApiController]
    public class LoansController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<LoanDto> GetLoans([FromServices] ILoanRepository loanRepository)
        {
            return loanRepository.GetLoans().ToDto();
        }

        [HttpGet("{id}")]
        public LoanDto GetLoan([FromServices] ILoanRepository loanRepository, int id)
        {
            return loanRepository.GetLoan(id).ToDto();
        }

        [HttpGet("{id}/payments")]
        public IEnumerable<LoanPaymentDto> GetLoanPayments([FromServices] ILoanRepository loanRepository, int id)
        {
            return loanRepository.GetLoan(id).Payments.ToDto();
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
