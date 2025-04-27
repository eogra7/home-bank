namespace Accounts.API.Models
{
    public class Account
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Balance { get; set; }
        public string Type { get; set; } // Checking, Savings, etc.
        public string UserId { get; set; }
    }
} 