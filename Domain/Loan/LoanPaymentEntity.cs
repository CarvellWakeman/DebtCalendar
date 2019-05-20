using Domain.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Loan
{
    [Table("LoanPayment")]
    public class LoanPaymentEntity : Entity
    {
        public LoanPaymentEntity() : base()
        {
        }

        public DateTime Date { get; set; }
        public decimal StartBalance { get; set; }
        public decimal MinimumInterest { get; set; }
        public decimal MinimumPrincipal { get; set; }
        public decimal AdditionalPrincipal { get; set; }
        public decimal TotalPayment { get; set; }
        public decimal EndBalance { get; set; }
    }
}
