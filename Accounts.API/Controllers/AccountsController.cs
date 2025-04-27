using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Accounts.API.Models;

namespace Accounts.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase
    {
        private static List<Account> _accounts = new List<Account>
        {
            new Account { Id = 1, Name = "Checking Account", Balance = 1000.00m, Type = "Checking", UserId = "1" },
            new Account { Id = 2, Name = "Savings Account", Balance = 5000.00m, Type = "Savings", UserId = "1" }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Account>> GetAccounts()
        {
            // In a real app, you would filter by the current user's ID
            return Ok(_accounts);
        }

        [HttpGet("{id}")]
        public ActionResult<Account> GetAccount(int id)
        {
            var account = _accounts.Find(a => a.Id == id);
            if (account == null)
            {
                return NotFound();
            }
            return Ok(account);
        }

        [HttpPost]
        public ActionResult<Account> CreateAccount(Account account)
        {
            account.Id = _accounts.Count + 1;
            _accounts.Add(account);
            return CreatedAtAction(nameof(GetAccount), new { id = account.Id }, account);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateAccount(int id, Account account)
        {
            var existingAccount = _accounts.Find(a => a.Id == id);
            if (existingAccount == null)
            {
                return NotFound();
            }

            existingAccount.Name = account.Name;
            existingAccount.Balance = account.Balance;
            existingAccount.Type = account.Type;
            
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAccount(int id)
        {
            var account = _accounts.Find(a => a.Id == id);
            if (account == null)
            {
                return NotFound();
            }

            _accounts.Remove(account);
            return NoContent();
        }
    }
} 