using Domain.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Loan
{
    [Table("Loan")]
    public class LoanEntity : Entity
    {
        public LoanEntity() : base()
        {
        }

        public string Lender { get; set; }
        public string Description { get; set; }
        public DateTime PaymentDate { get; set; }
        public float InterestRate { get; set; }
        public IEnumerable<LoanPaymentEntity> Payments { get; set; }
    }
}
