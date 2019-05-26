using System;

namespace Api.Models
{
    public class LoanPaymentDto
    {
        public DateTime Date { get; set; }
        public decimal StartBalance { get; set; }
        public decimal MinimumInterest { get; set; }
        public decimal MinimumPrincipal { get; set; }
        public decimal AdditionalPrincipal { get; set; }
        public decimal TotalPayment { get; set; }
        public decimal EndBalance { get; set; }
    }
}
