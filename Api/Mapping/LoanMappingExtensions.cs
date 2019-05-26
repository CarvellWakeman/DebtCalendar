using Api.Models;
using Domain.Loan;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Api.Mapping
{
    public static class LoanMappingExtensions
    {
        public static LoanDto ToDto(this LoanEntity loan)
        {
            return new LoanDto()
            {
                Lender = loan.Lender,
                Description = loan.Description,
                InterestRate = loan.InterestRate,
                PaymentDate = loan.PaymentDate,
                CurrentPayment = loan.Payments
                    .OrderBy(p => p.Date)
                    .FirstOrDefault(p => p.Date.AddDays(-p.Date.Day) >= DateTime.Now.AddDays(-DateTime.Now.Day))
                    .ToDto()
            };
        }

        public static IEnumerable<LoanDto> ToDto(this IEnumerable<LoanEntity> loans)
        {
            return loans.Select(l => l.ToDto());
        }
    }
}
