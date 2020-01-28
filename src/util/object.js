export const transferProps = (oldArray, newArray, compareKey, transferKeys) =>
  newArray.map((newEntry) => {
    const oldEntry = oldArray.find(
      (oldEntry) => oldEntry[compareKey] === newEntry[compareKey]
    );
    if (oldEntry)
      transferKeys.forEach((key) => (newEntry[key] = oldEntry[key]));

    return newEntry;
  });
