using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authentication;

// AUTHENTICATION SYSTEM: "Is the user who they say they are?"
// DIFFERENT THAN THE AUTHORIZATION SYSTEM, which is "Does this user have permission to do this?"
public class AuthenticationSystem
{

    public TimeSpan AuthenticationTokenExpirationTime { get; }

    public AuthenticationSystem()
    {
        activeSessions = new();
        AuthenticationTokenExpirationTime = new TimeSpan(72, 0, 0);
    }

    // Hash map of USER-ID to LoginSession
    private Dictionary<int, LoginSession> activeSessions;

    private bool HasExpired(LoginSession session) => session.Expires < DateTime.Now;

    // private User? GetUserFromToken(string auth)
    // {
    //     if(activeSessions.TryGetValue(auth, out LoginSession? session))
    //     {
    //         if (HasExpired(session))
    //         {
    //             activeSessions.Remove(auth);
    //             return null;
    //         }
    //         return session?.User;
    //     }
    //     return null;
    // }


    public void CullActiveSessions()
    {
        List<int> removeList = new();
        foreach (KeyValuePair<int, LoginSession> kvp in activeSessions)
        {
            if (HasExpired(kvp.Value))
                removeList.Add(kvp.Key);
        }
        foreach(int id in removeList)
        {
            activeSessions.Remove(id);
        }
    }

    public bool ValidateAuthentication(User user, string? auth)
    {
        if (auth == null) return false;
        if (!activeSessions.ContainsKey(user.ID)) return false;
        LoginSession session = activeSessions[user.ID];
        if (HasExpired(session)) return false;
        return auth == session.Authentication;
    }

    public bool DoesUserHaveActiveSession(User user)
    {
        if (!activeSessions.ContainsKey(user.ID)) return false;
        LoginSession session = activeSessions[user.ID];
        if (HasExpired(session))
        {
            activeSessions.Remove(user.ID);
            return false;
        }

        return true;
    }

    private string GenerateUniqueRandomAuthcode()
    {
        const int generatorDataLength = 32;
        const string alnum = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        string data = new string(Enumerable.Repeat(alnum, generatorDataLength)
            .Select(a => a[Random.Shared.Next(alnum.Length)])
            .ToArray());
        return new SecureHash<SHA256>(data).ToString();
    }

    public string? Login(string username, string password)
    {
        User? user = Application.Database.GetUserFromUsername(username);
        if (user == null) return null;
        
        if(DoesUserHaveActiveSession(user))
        {
            return activeSessions[user.ID].Authentication;
        }

        var suppliedHash = new SecureHash<SHA256>(password);
        var realHash = user.PasswordHashData;
        if (ReferenceEquals(realHash, null))
            throw new Exception("User password hash is null here. This should never be null.");
        if (suppliedHash == realHash)
        {
            string authcode = GenerateUniqueRandomAuthcode();
            LoginSession session = new LoginSession
            {
                Expires = DateTime.Now + AuthenticationTokenExpirationTime,
                User = user,
                Authentication = authcode,
            };
            activeSessions[user.ID] = session;
            return authcode;
        }

        return null;

    }

}