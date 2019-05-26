using System;

namespace Api.Models
{
    public class LoanDto
    {
        public int Id { get; set; }
        public string Lender { get; set; }
        public string Description { get; set; }
        public DateTime PaymentDate { get; set; }
        public float InterestRate { get; set; }

        public LoanPaymentDto CurrentPayment { get; set; }
    }
}
