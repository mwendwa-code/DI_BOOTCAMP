export {};

function validateUnionType(
  value: any,
  allowedTypes: string[]
): boolean {
  const valueType = typeof value;

  for (const allowedType of allowedTypes) {
    if (valueType === allowedType) {
      return true;
    }
  }

  return false;
}

const value1 = 42;
const value2 = "Hello";
const value3 = true;
const value4 = null;

console.log(validateUnionType(value1, ["number", "string"])); // true
console.log(validateUnionType(value2, ["number", "string"])); // true
console.log(validateUnionType(value3, ["number", "string"])); // false
console.log(validateUnionType(value4, ["object"])); // true