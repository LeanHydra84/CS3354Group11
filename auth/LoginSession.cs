#nullable disable

using System;

namespace CollaboraCal
{
    public class LoginSession
    {
        public string SessionKey { get; set; }
        public DateTime Expires { get; set; }
        public User User { get; set; }
        public string Authentication { get; set; }
    }
}