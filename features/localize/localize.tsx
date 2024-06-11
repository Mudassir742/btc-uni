'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

export default function Localize() {

  return (
    <>
      <Script strategy='beforeInteractive' async src="https://global.localizecdn.com/localize.js"></Script>
      <Script strategy='beforeInteractive'>
        {`!function(a){if(!a.Localize){a.Localize={};for(var e=["translate","untranslate","phrase","initialize","translatePage","setLanguage","getLanguage","getSourceLanguage","detectLanguage","getAvailableLanguages","untranslatePage","bootstrap","prefetch","on","off","hideWidget","showWidget"],t=0;t<e.length;t++)a.Localize[e[t]]=function(){}}}(window);`}
      </Script>
      <Script strategy='beforeInteractive'>
        {`Localize.initialize({ key: '64HLUEJKZpPIx', rememberLanguage: true, });`}
      </Script>
    </>
  )
}