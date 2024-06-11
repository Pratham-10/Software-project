const generateUniqueCode = async (req, res, next) => {
    // Function to generate a random 6-digit code
    const generateRandomCode = () => Math.floor(100000 + Math.random() * 900000);
  
    // Function to check if the generated code is unique in the collection
    const isCodeUnique = async (code) => {
      const existingDoc = await RideDetails.findOne({ code });
      return !existingDoc;
    };
  
    let uniqueCode;
    do {
      uniqueCode = generateRandomCode();
    } while (!(await isCodeUnique(uniqueCode)));
  
    // Attach the unique code to the request object
    req.uniqueCode = uniqueCode;
  
    // Proceed to the next middleware or route handler
    next();
  };
module.exports = generateUniqueCode; 