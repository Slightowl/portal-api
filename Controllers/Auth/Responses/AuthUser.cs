namespace Portal.Api.Controllers.Auth.Responses;

public class AuthUser
{
    public AuthUser(
        string forename,
        string surname,
        string email,
        string phone,
        string postcode,
        DateTime dateOfBirth,
        string christieNumber)
    {
        Forename = forename;
        Surname = surname;
        Email = email;
        Phone = phone;
        Postcode = postcode;
        DateOfBirth = dateOfBirth;
        ChristieNumber = christieNumber;
    }

    public string Forename { get; }

    public string Surname { get; }

    public string Email { get; }

    public string Phone { get; }

    public string Postcode { get; }

    public DateTime DateOfBirth { get; }

    public string ChristieNumber { get; }
}
