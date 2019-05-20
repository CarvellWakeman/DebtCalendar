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
        public IEnumerable<LoanEntity> Get([FromServices] ILoanRepository loanRepository)
        {
            return loanRepository.GetLoans();
        }

        [HttpGet("{id}")]
        public LoanEntity Get([FromServices] ILoanRepository loanRepository, int id)
        {
            return loanRepository.GetLoan(id);
        }

        [HttpPost]
        public void Post([FromServices] ILoanRepository loanRepository, string value)
        {
            loanRepository.CreateLoan(new LoanEntity() { Data = value });
        }

        [HttpPut("{id}")]
        public void Put([FromServices] ILoanRepository loanRepository, int id, string value)
        {
            var entity = loanRepository.GetLoan(id);
            entity.Data = value;
            loanRepository.UpdateLoan(entity);
        }

        [HttpDelete("{id}")]
        public void Delete([FromServices] ILoanRepository loanRepository, int id)
        {
            var loan = loanRepository.GetLoan(id);
            loanRepository.DeleteLoan(loan);
        }
    }
}
