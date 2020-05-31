function isJson(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

const safeJson = (body: Body): unknown => {
  return (pet as Fish).swim !== undefined;
};