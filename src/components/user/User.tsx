import { useState } from 'react'
import UserInfo from './UserInfo'

const User = () => {
  const [user] = useState({
    Username: "Test",
    Name: "Test",
    Surname: "Test",
    Email: "olena@gmail.com",
    Phone: "+73930",
    DriverLicence: "A"
  })

  return (
    <div>
      <UserInfo
        Username={user.Username}
        Name={user.Name}
        Surname={user.Surname}
        Email={user.Email}
        Phone={user.Phone}
        DriverLicence={user.DriverLicence}
      />
    </div>
  );
};

export default User;
