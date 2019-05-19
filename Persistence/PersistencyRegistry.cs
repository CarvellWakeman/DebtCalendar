using Domain.Loan;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence.Loan;

namespace Persistence
{
    public class PersistencyRegistry
    {

        public PersistencyRegistry(IConfiguration configuration, IServiceCollection services)
        {
            // Repositories
            services.AddTransient<ILoanRepository, LoanRepository>();

            services.AddDbContext<LoanRepository>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
        }
    }
}
