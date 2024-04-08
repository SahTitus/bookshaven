export const validateUser =(userData, confirmPassword)=> {
    const mailformat = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  
    if (userData.first.length === 0) {
      return "Name is required.";
    }
  
    if (!userData.email.match(mailformat)) {
      return "Invalid email format.";
    }
  
    if (userData.password.length === 0) {
      return "Password is required.";
    }
  
    // if (!userData.password.match(passwordRegex)) {
    //   return "Password must be at least 6 characters long and contain at least one lower-and-upper-letter, and one digit.";
    // }
  
    if (userData.password !== confirmPassword) {
      return "Passwords do not match.";
    }
  
    return null; // If no errors are found, return null indicating successful validation.
  }
  