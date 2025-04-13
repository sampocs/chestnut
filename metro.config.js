// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add a blacklist function to exclude old files
config.resolver.blacklistRE = [
  /chestnut-old\/.*/,
];

// Configure file patterns to exclude from Metro
config.watchFolders = [__dirname];
config.resolver.blockList = [
  /chestnut-old\/.*/,
];

module.exports = config; 