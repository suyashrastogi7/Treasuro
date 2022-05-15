module.exports = ({ rollno, phoneno }, res) => {
  const isRollnoValid = /[1-2][7-9,0-2][a-z|A-Z]{2,3}[0-9]{3}$/.test(rollno);
  if (!isRollnoValid) return res.status(400).send({ error: "Invalid rollno" });

  // phoneno regex
  const isPhonenoValid = /[7-9][0-9]{9}$/.test(phoneno);
  if (!isPhonenoValid)
    return res.status(400).send({ error: "Invalid phoneno" });
};
