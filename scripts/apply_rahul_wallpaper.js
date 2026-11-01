import fs from 'fs';

// 1. Update src/config/themes.js
const themesPath = 'src/config/themes.js';
let themesCode = fs.readFileSync(themesPath, 'utf8');

if (!themesCode.includes('rahul_1998_wallpaper.jpg')) {
  themesCode = "import rahulWallpaper from '../assets/img/rahul_1998_wallpaper.jpg';\r\n" + themesCode;
  themesCode = themesCode.replace('wallpaper: null,', 'wallpaper: rahulWallpaper,');
  fs.writeFileSync(themesPath, themesCode, 'utf8');
  console.log('themes.js updated with rahulWallpaper');
}

// 2. Update src/shell/desktop/desktop.js to use stretch/cover by default
const desktopPath = 'src/shell/desktop/desktop.js';
let desktopCode = fs.readFileSync(desktopPath, 'utf8');

desktopCode = desktopCode.replace(
  'return getItem(LOCAL_STORAGE_KEYS.WALLPAPER_MODE) || "tile";',
  'return getItem(LOCAL_STORAGE_KEYS.WALLPAPER_MODE) || "stretch";'
);

desktopCode = desktopCode.replace(
  'desktop.style.backgroundSize = "100% 100%";',
  'desktop.style.backgroundSize = "cover";\r\n      desktop.style.backgroundPosition = "center";'
);

fs.writeFileSync(desktopPath, desktopCode, 'utf8');
console.log('desktop.js updated to default wallpaper mode cover');
