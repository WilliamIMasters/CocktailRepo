using FirebaseAdmin.Auth;
using System.Net;
using System.Net.Http.Headers;

namespace CocktailApi.Controllers.util
{
    public class UserServices
    {
        public async Task<string> GetUidFromAuth(string auth)
        {
            var token = AuthenticationHeaderValue.Parse(auth).Parameter;
            FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance
                .VerifyIdTokenAsync(token);

            if (decodedToken == null) {
                throw new UnauthorizedAccessException();
            }

            return decodedToken.Uid;
        }

    }
}
