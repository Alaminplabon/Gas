import Terms from './terms.models'; // Import your Terms model

// Create Terms
const createterms = async (description: string) => {
  const newTerms = await Terms.create({ description });
  return newTerms;
};

// Get All Terms
const getAllterms = async () => {
  const termsList = await Terms.find();
  return termsList;
};

// Get Terms by ID
const gettermsById = async (id: string) => {
  const terms = await Terms.findById(id);
  return terms;
};

// Update Terms
const updateterms = async (id: string, description: string) => {
  const updatedTerms = await Terms.findByIdAndUpdate(
    id,
    { description },
    { new: true },
  );
  return updatedTerms;
};

// Delete Terms
const deleteterms = async (id: string) => {
  const deletedTerms = await Terms.findByIdAndDelete(id);
  return deletedTerms;
};

export const termsService = {
  createterms,
  getAllterms,
  gettermsById,
  updateterms,
  deleteterms,
};
