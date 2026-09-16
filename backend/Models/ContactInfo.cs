namespace PregnantWeb.Models;

public class ContactInfo
{
    public int Id { get; set; }
    public string Address { get; set; }
    public string MobileNumber { get; set; }
    public string Email { get; set; }
    public string WorkingHours { get; set; }
    public string WeekendWorkingHours { get; set; }

}


public class SendMessage
{
    public string Message { get; set; }
    public string MobileNumber { get; set; }
    public string ClientName { get; set; }

}

// This is the entity actually saved to the database - kept separate from the
// SendMessage request DTO above so we can add fields (Id, CreatedAt) without
// forcing the client to send them.
public class ContactMessage
{
    public int Id { get; set; }
    public string Message { get; set; }
    public string MobileNumber { get; set; }
    public string ClientName { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}