import bcrypt from "bcryptjs";

const hash = "$2b$10$N7IB7GmEatxSwmcO6Rj.eO8qPF23.Emsq5sJotJXKus7TDzQYCa90";
const plain = "Akku1234";

bcrypt.compare(plain, hash).then(result => {
  console.log("Password match:", result);
});
