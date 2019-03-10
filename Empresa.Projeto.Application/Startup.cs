using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Empresa.Projeto.Infra.Data.Context;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Empresa.Projeto.Application
{
    public class Startup
    {
        private IConfiguration Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("Configuration/Json/appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile("Configuration/Json/database.json", optional: true, reloadOnChange: true);

            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            var sqlConnectionString = Configuration.GetConnectionString("SqlServerProvider");
            //services.AddDbContext<SqlServerContext>(options => options.UseSqlServer(sqlConnectionString));
            services.AddDbContext<SqlServerContext>(options => 
                options.UseSqlServer(sqlConnectionString, b => b.MigrationsAssembly("Empresa.Projeto.Infra.Data")));
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        }
    }
}
