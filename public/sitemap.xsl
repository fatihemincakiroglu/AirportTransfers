<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap – AirportTransfers Zürich</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, "Segoe UI", Roboto, Arial, sans-serif; background: #FAFAF7; color: #1C2B27; }
          .hero { background: #0C2E25; color: #fff; padding: 36px 24px; }
          .hero .inner, .wrap { max-width: 1100px; margin: 0 auto; }
          .eyebrow { color: #C9A24B; font-size: 11px; font-weight: 700; letter-spacing: .25em; text-transform: uppercase; }
          .eyebrow:before { content: ""; display: inline-block; width: 28px; height: 2px; background: #C9A24B; vertical-align: middle; margin-right: 10px; }
          h1 { font-family: Georgia, "Times New Roman", serif; font-weight: 600; font-size: 30px; margin-top: 10px; }
          .sub { color: rgba(255,255,255,.7); margin-top: 8px; font-size: 14px; }
          .wrap { padding: 28px 24px 60px; }

          /* Dil kartlari (index) */
          .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-top: 4px; }
          .card { display: block; background: #fff; border: 1px solid rgba(0,0,0,.07); border-radius: 16px; padding: 22px; text-decoration: none; color: #1C2B27; box-shadow: 0 2px 10px rgba(0,0,0,.05); transition: transform .15s ease, box-shadow .15s ease; }
          .card:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(12,46,37,.15); }
          .card .flag { font-size: 26px; }
          .card h2 { font-family: Georgia, serif; font-size: 20px; color: #0C2E25; margin-top: 8px; }
          .card p { font-size: 13px; color: #6b7671; margin-top: 4px; word-break: break-all; }
          .card .go { display: inline-block; margin-top: 12px; color: #C9A24B; font-weight: 800; font-size: 12px; letter-spacing: .12em; text-transform: uppercase; }

          /* URL tablosu */
          .meta { font-size: 13px; color: #6b7671; margin-bottom: 14px; }
          .meta b { color: #0C2E25; }
          table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,.05); }
          th { background: #0C2E25; color: #fff; text-align: left; font-size: 11px; letter-spacing: .12em; text-transform: uppercase; padding: 12px 14px; }
          td { padding: 11px 14px; border-top: 1px solid #eee7db; font-size: 13px; vertical-align: top; }
          tr:hover td { background: #FBF7EE; }
          td a { color: #0C2E25; text-decoration: none; word-break: break-all; }
          td a:hover { color: #C9A24B; }
          .pill { display: inline-block; background: #F1EADF; color: #6b5b33; border-radius: 999px; padding: 2px 10px; font-size: 11px; font-weight: 700; }
          .prio { font-family: ui-monospace, Menlo, monospace; font-weight: 700; color: #0C2E25; }
          .alt a { font-size: 11px; font-weight: 800; color: #C9A24B; text-decoration: none; margin-right: 8px; }
          .num { color: #b8b2a7; font-size: 12px; }
          .back { display: inline-block; margin-bottom: 14px; color: #0C2E25; font-weight: 700; font-size: 13px; text-decoration: none; }
          .back:hover { color: #C9A24B; }
          @media (max-width: 700px) { .hide-m { display: none; } }
        </style>
      </head>
      <body>
        <div class="hero">
          <div class="inner">
            <div class="eyebrow">AirportTransfers Zürich</div>
            <h1>Sitemap</h1>
            <xsl:choose>
              <xsl:when test="sm:sitemapindex">
                <div class="sub">Bitte wählen Sie eine Sprache · Please choose a language</div>
              </xsl:when>
              <xsl:otherwise>
                <div class="sub">
                  <xsl:value-of select="count(sm:urlset/sm:url)"/> URLs
                </div>
              </xsl:otherwise>
            </xsl:choose>
          </div>
        </div>

        <div class="wrap">
          <xsl:apply-templates/>
        </div>
      </body>
    </html>
  </xsl:template>

  <!-- ── INDEX: dil kartları ─────────────────────────────── -->
  <xsl:template match="sm:sitemapindex">
    <div class="cards">
      <xsl:for-each select="sm:sitemap">
        <a class="card" href="{sm:loc}">
          <xsl:choose>
            <xsl:when test="contains(sm:loc, '-en.xml')">
              <div class="flag">🇬🇧</div>
              <h2>English Sitemap</h2>
            </xsl:when>
            <xsl:when test="contains(sm:loc, '-de.xml')">
              <div class="flag">🇩🇪</div>
              <h2>Deutsche Sitemap</h2>
            </xsl:when>
            <xsl:otherwise>
              <div class="flag">🌍</div>
              <h2>Sitemap</h2>
            </xsl:otherwise>
          </xsl:choose>
          <p><xsl:value-of select="sm:loc"/></p>
          <span class="go">Öffnen / Open →</span>
        </a>
      </xsl:for-each>
    </div>
  </xsl:template>

  <!-- ── URLSET: tablo ───────────────────────────────────── -->
  <xsl:template match="sm:urlset">
    <a class="back" href="/sitemap.xml">← Sitemap Index</a>
    <p class="meta"><b><xsl:value-of select="count(sm:url)"/></b> URLs</p>
    <table>
      <tr>
        <th>#</th>
        <th>URL</th>
        <th class="hide-m">Sprachen</th>
        <th class="hide-m">Frequenz</th>
        <th>Priorität</th>
        <th class="hide-m">Zuletzt geändert</th>
      </tr>
      <xsl:for-each select="sm:url">
        <tr>
          <td class="num"><xsl:value-of select="position()"/></td>
          <td><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
          <td class="alt hide-m">
            <xsl:for-each select="xhtml:link">
              <a href="{@href}"><xsl:value-of select="translate(@hreflang, 'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')"/></a>
            </xsl:for-each>
          </td>
          <td class="hide-m"><span class="pill"><xsl:value-of select="sm:changefreq"/></span></td>
          <td class="prio"><xsl:value-of select="sm:priority"/></td>
          <td class="hide-m"><xsl:value-of select="substring(sm:lastmod, 1, 10)"/></td>
        </tr>
      </xsl:for-each>
    </table>
  </xsl:template>

</xsl:stylesheet>
