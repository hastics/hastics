export const generateWarning = (folder: string, excluded?: string) => {
  const base = "// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.";
  let command = `yarn relike generate:index ${folder}`;
  if (excluded) command += ` --exclude ${excluded}`;

  return `${base}
// Run \`${command}\` to generate again.

`;
};
