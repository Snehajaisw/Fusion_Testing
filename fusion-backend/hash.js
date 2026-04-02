import bcrypt from "bcryptjs";

bcrypt.hash("Fusioncse3batch2026", 10).then((hash) => {
  console.log("Hashed Password:");
  console.log(hash);
});
