using Api.Models;
using Domain.Loan;
using System.Collections.Generic;
using System.Linq;

namespace Api.Mapping
{
    public static class LoanPaymentMappingExtensions
    {
        public static LoanPaymentDto ToDto(this LoanPaymentEntity payment)
        {
            return new LoanPaymentDto()
            {
                Date = payment.Date,
                AdditionalPrincipal = payment.AdditionalPrincipal,
                EndBalance = payment.EndBalance,
                MinimumInterest = payment.MinimumInterest,
                MinimumPrincipal = payment.MinimumPrincipal,
                StartBalance = payment.StartBalance,
                TotalPayment = payment.TotalPayment
            };
        }

        public static IEnumerable<LoanPaymentDto> ToDto(this IEnumerable<LoanPaymentEntity> payments)
        {
            return payments.Select(l => l.ToDto());
        }
    }
}
