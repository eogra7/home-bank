using System.Collections.Generic;
using IdentityServer4.Models;

namespace Identity.API.Config
{
    public static class IdentityConfig
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
            new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email()
            };
        public static IEnumerable<ApiResource> ApiResources => 
            new List<ApiResource>
            {
                new ApiResource("users.api", "Users API")
                {
                    Scopes = { "users.api" }
                },
                new ApiResource("accounts.api", "Accounts API")
                {
                    Scopes = { "accounts.api" }
                }
            };
        public static IEnumerable<ApiScope> ApiScopes =>
            new List<ApiScope>
            {
                new ApiScope("users.api", "Users API"),
                new ApiScope("accounts.api", "Accounts API")
            };

        public static IEnumerable<Client> Clients =>
            new List<Client>
            {
                new Client
                {
                    ClientId = "angular-client",
                    ClientName = "Angular Client",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequireClientSecret = false,
                    RequirePkce = true,
                    AllowOfflineAccess = true,
                    AllowedScopes = { "openid", "profile", "email", "users.api", "accounts.api" },
                    RedirectUris = { "http://localhost:4200/signin-callback" },
                    PostLogoutRedirectUris = { "http://localhost:4200/signout-callback" },
                    AllowedCorsOrigins = { "http://localhost:4200" }
                }
            };
    }
} 