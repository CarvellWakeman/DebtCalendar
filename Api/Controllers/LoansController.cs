using Api.Mapping;
using Api.Models;
using Domain.Loan;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Api.Controllers
{
    [Route("api/loans")]
    [ApiController]
    [EnableCors("AllowOriginPolicy")]
    public class LoansController : ApiControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<LoanDto>> GetLoans([FromServices] ILoanRepository loanRepository)
        {
            var loans = loanRepository.GetLoans().ToDto();
            return Ok(loans);
        }

        [HttpGet("{id}")]
        public ActionResult<LoanDto> GetLoan([FromServices] ILoanRepository loanRepository, int id)
        {
            var loan = loanRepository.GetLoan(id).ToDto();
            return Ok(loan);
        }

        [HttpGet("{id}/payments")]
        public ActionResult<IEnumerable<LoanPaymentDto>> GetLoanPayments([FromServices] ILoanRepository loanRepository, int id)
        {
            var payments = loanRepository.GetLoan(id).Payments.ToDto();
            return Ok(payments);
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
