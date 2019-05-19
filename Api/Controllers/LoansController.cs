using Domain.Loan;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Api.Controllers
{
    [Route("api/loans")]
    [ApiController]
    public class LoansController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<LoanEntity> Get([FromServices] ILoanRepository loanRepository)
        {
            return loanRepository.GetLoans();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public LoanEntity Get([FromServices] ILoanRepository loanRepository, int id)
        {
            return loanRepository.GetLoan(id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromServices] ILoanRepository loanRepository, string value)
        {
            loanRepository.CreateLoan(new LoanEntity() { Data = value });
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put([FromServices] ILoanRepository loanRepository, int id, string value)
        {
            var entity = loanRepository.GetLoan(id);
            entity.Data = value;
            loanRepository.UpdateLoan(entity);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete([FromServices] ILoanRepository loanRepository, int id)
        {
            var loan = loanRepository.GetLoan(id);
            loanRepository.DeleteLoan(loan);
        }
    }
}
