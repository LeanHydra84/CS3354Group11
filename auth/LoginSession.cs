#nullable disable

using System;

public class LoginSession
{
    public DateTime Expires { get; set; }
    public User User { get; set; }
    public string Authentication { get; set; }
}