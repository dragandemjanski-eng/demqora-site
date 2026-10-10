/* DemQora MS 1.1 — interactive Contents for inline image-based guides.
   Link rectangles are positioned from the original PDFs, not guesses.
   The original page artwork is never modified. */
(() => {
  'use strict';
  const sheets = {"user-manual":[{"page":"page-002","pdfHeight":760.32,"topOffset":4.5,"height":19.5,"left":"5.0%","width":"90.0%","rows":[[86.0,4,"Introduction - What is MS 1.1?"],[106.8,5,"Install and Attach MS 1.1"],[127.6,6,"First Session Checklist"],[148.4,7,"Core Setup Concepts"],[169.2,8,"First Load: What \"Ready\" Looks Like"],[190.0,9,"Your Chart in 60 Seconds"],[210.8,10,"Control Panel"],[231.6,11,"Choose the Right Display Preset"],[252.4,12,"Control Panel Examples - 8 examples"],[273.2,20,"Main TF and Reference TFs"],[294.0,21,"Read the Chart in Five Steps"],[314.8,22,"BOL - Break of Level"],[335.6,23,"POI - Point of Interest"],[356.4,24,"SM - Smart Money Structure"],[377.2,25,"Trend - Read the Arrow Chain"],[398.0,26,"Range - When Containment Has Priority"],[418.8,27,"Visual Language: Lines, Zones and Labels"],[439.6,28,"Label Dictionary"],[460.4,29,"Breakout Confirmation"],[481.2,30,"Breakout Scenarios and States"],[502.0,31,"Candlestick Patterns"],[522.8,32,"Pattern Detection and Scoring"],[543.6,33,"Pattern Alerts"],[564.4,34,"Structural Alerts"],[585.73,35,"Telegram Alerts"],[606.0,36,"Loading and Synchronization"],[626.8,37,"Loading Progress Bars"]]},{"page":"page-003","pdfHeight":760.32,"topOffset":4.5,"height":22.0,"left":"5.0%","width":"90.0%","rows":[[85.7,38,"Timeframe and Reference-TF Changes"],[109.1,39,"Sleep/Resume, Zoom and Scroll History"],[132.5,40,"Theme, Candle Timer and Chart Interaction"],[155.9,41,"Performance and Best Practices"],[179.3,42,"Recommended System Guidelines"],[202.7,43,"Practical Example: Bullish Structure"],[226.1,44,"Practical Example: Range to Breakout"],[249.5,45,"Practical Example: Bearish Structure"],[272.9,46,"How to Read the Chart Directionally"],[296.3,47,"Common Reading Mistakes"],[319.7,48,"Complete Market Scenario 1 - 8-step walkthrough"],[343.1,57,"Complete Market Scenario 2 - 9-step walkthrough"],[366.5,67,"Troubleshooting: Diagnostic Order"],[389.9,68,"Troubleshooting: Symptom Guide"],[413.3,69,"Report Diagnostics and Bug Reports"],[436.7,70,"Status Messages"],[460.1,71,"Common Questions I"],[483.5,72,"Common Questions II"],[506.9,73,"Quick Reference and Glossary"],[530.3,74,"Support, Release Scope and Risk"],[553.7,75,"Official Candlestick Pattern Reference"],[577.1,76,"MS 1.1 Candlestick Pattern Reference"],[600.5,77,"Candlestick Pattern Cards"],[623.9,91,"Notes"],[647.3,92,"Next Steps"]]}],"quick-start":[{"page":"page-002","pdfHeight":792.0,"topOffset":6.0,"height":32.0,"left":"7.5%","width":"85.0%","rows":[[128.23,3,"1. GETTING STARTED"],[162.23,4,"2. FIRST SETUP"],[196.23,6,"3. LEARN THE SCREEN"],[230.23,14,"4. ESSENTIAL CONTROLS"],[264.23,16,"5. DISPLAY PRESETS"],[298.23,19,"6. MULTI-TIMEFRAME"],[332.23,22,"7. LABELS YOU WILL SEE"],[366.23,24,"8. DAILY USE"],[400.23,25,"9. TIPS & BEST PRACTICES"],[434.23,27,"10. TRADING TIPS"],[468.23,39,"NEXT STEPS"]]}]};
  function init() {
    const isUserManual=!!document.querySelector('img[src*="/assets/docs/user-manual/page-002.webp"]');
    const isQuickStart=!!document.querySelector('img[src*="/assets/docs/quick-start/page-002.webp"]');
    const guide=isUserManual?'user-manual':(isQuickStart?'quick-start':null);
    if (!guide) return;
    for (const sheet of sheets[guide]) {
      const page=document.getElementById(sheet.page);
      if (!page || page.querySelector('.guide-toc-overlay')) continue;
      const nav=document.createElement('nav');
      nav.className='guide-toc-overlay';
      nav.setAttribute('aria-label','Clickable table of contents');
      nav.style.setProperty('--toc-left',sheet.left);
      nav.style.setProperty('--toc-width',sheet.width);
      for (const [textPageY,target,sectionTitle] of sheet.rows) {
        const destination=document.getElementById('page-'+String(target).padStart(3,'0'));
        if (!destination) continue;
        const a=document.createElement('a');
        a.className='guide-toc-hotspot';
        a.href='#'+destination.id;
        a.style.top=(((textPageY-sheet.topOffset)/sheet.pdfHeight)*100).toFixed(5)+'%';
        a.style.height=((sheet.height/sheet.pdfHeight)*100).toFixed(5)+'%';
        a.textContent=sectionTitle;
        a.setAttribute('aria-label',sectionTitle+', page '+target);
        a.title=sectionTitle+' — page '+target;
        nav.appendChild(a);
      }
      page.appendChild(nav);
    }
  }
  if (document.readyState==='loading') {
    document.addEventListener('DOMContentLoaded',init,{once:true});
  } else init();
})();
