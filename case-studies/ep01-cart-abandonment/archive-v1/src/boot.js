/* boot — wait for fonts, then build is already done (scripts are sync); expose readiness to the renderer. */
window.__ready = (async () => {
  await Promise.all(['800 100px "Anek Bangla"', '700 50px "Hind Siliguri"', '600 50px "Hind Siliguri"', '900 100px Unbounded', '700 30px Unbounded', '500 17px Unbounded'].map(f => document.fonts.load(f, 'কখগ ABC ৭০%')));
  await document.fonts.ready;
  if (window.__afterFonts) window.__afterFonts();
  window.__seek(0);
})();
