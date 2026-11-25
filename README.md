# SCParks

Master page and assets for the South Carolina Parks volunteer site. The header and footer come from
[southcarolinaparks.com](https://southcarolinaparks.com/), and their links point back to that site. The CMS's
account/admin menu and sign-in links are merged in.

## Files

| Path | Purpose |
|---|---|
| `MasterPage.master` / `.cs` | Master page: SC header and footer, the BootstrapMenu account/admin menu, and CSS overrides that restyle core pages in SC colors |
| `MasterFooter.ascx` / `.cs` | Footer account links (Volunteer Account, Sign In/Out, Admin Tools) shown by access level |
| `css/scparks.css` | SC site styles, copied from southcarolinaparks.com, with fonts and backgrounds served from this folder |
| `scripts/header.js` | Header behaviors (menu toggle, search, share icons, Parks dropdown, sticky header). Used instead of SC's React bundle, which would re-render the header and remove the merged menu |
| `images/`, `fonts/`, `dist/`, `favicon.ico` | Header/footer images, fonts and icon fonts used by the above |

`MasterPage.master.cs` adds `?v=` (the file's last-write time) to `scparks.css` and `header.js`, so browsers
pick up changes after a deploy.

## Testing locally

Until the SC site and database are configured, any page that uses a master page can be previewed with the SC
master by adding `mp=` to the URL. On localhost, `s=` and `db=` are also needed, since the site and database
can't be determined from the domain:

```
http://localhost/volunteer/hosts?s=0.0.0.5&db=georgia&mp=%2fscparks%2fmasterpage.master
```

- **Put `s=`, `db=` and `mp=` before any `#`.** Everything after `#` stays in the browser and is never sent
  to the server. For example:
  `/location/request/List.aspx?s=0.0.0.5&db=georgia&mp=%2fscparks%2fmasterpage.master#loc=37&atid=92200`
- **`mp=` applies to one page only.** Links the pages build (such as "Edit Application") don't carry it, so
  add it again after clicking through.
- **Template-based `/net/` pages** (UtilityPage/TemplatePage pages without a `MasterPageFile`) ignore `mp=`
  until the site's configuration points to this master page. The SC template itself can be previewed at
  `/Core/Template/Default.aspx?s=0.0.1.5&db=georgia&statictemplate=1&mp=/scparks/masterpage.master`.
- **Signed-in pages:** when a session expires on localhost, the sign-in redirect adds `reset=1`, which clears
  cached values, and `gologon=` returns you to the original URL, `mp=` included.

## Style overrides

Core pages are styled for other sites (gray text, blue links and arrows, gray panels). The `<style>` block in
`MasterPage.master` overrides them on SC pages only. Text, headers and section bars become the SC link brown
(`#9e5700`), gray panels, rows, dividers and borders become light brown tints, and `rect-blue.gif`,
`rect-green.gif` and `rect-olive.gif` arrow bullets are swapped for `/core/img/arrows/rect-brown.gif`. Other
sites are unaffected.
