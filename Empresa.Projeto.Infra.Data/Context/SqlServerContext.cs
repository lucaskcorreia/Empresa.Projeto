using Empresa.Projeto.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Empresa.Projeto.Infra.Data.Context
{
    public class SqlServerContext : DbContext
    {
        public DbSet<User> User { get; set; }

        // Construtor da classe passa informações para a base
        public SqlServerContext(DbContextOptions<SqlServerContext> options) : base(options) { }


        // Override em OnModelCreating insere as entidades
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(k => k.Id);

            base.OnModelCreating(modelBuilder);
        }

        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();
            return base.SaveChanges();
        }
    }
}