import Privacy from './privacy.models';

const createprivacy = async (description: string) => {
  const newPrivacy = await Privacy.create({ description });
  return newPrivacy;
};

const getAllprivacy = async () => {
  const privacyList = await Privacy.find();
  return privacyList;
};

const getprivacyById = async (id: string) => {
  const privacy = await Privacy.findById(id);
  return privacy;
};

const updateprivacy = async (id: string, description: string) => {
  const updatedPrivacy = await Privacy.findByIdAndUpdate(
    id,
    { description },
    { new: true },
  );
  return updatedPrivacy;
};

const deleteprivacy = async (id: string) => {
  const deletedPrivacy = await Privacy.findByIdAndDelete(id);
  return deletedPrivacy;
};

export const privacyService = {
  createprivacy,
  getAllprivacy,
  getprivacyById,
  updateprivacy,
  deleteprivacy,
};
