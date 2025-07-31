const args = process.argv

const isDebug = () => {
  const flaglong  = args.includes("--debug")
  const flagshort = args.includes("-dbg")

  return flaglong || flagshort
}

module.exports = {
  isDebug,
}