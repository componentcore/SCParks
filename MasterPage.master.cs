using System;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ManagementSuite.Web.UI;

/// <summary>
/// South Carolina Parks master page. Header and footer markup comes from https://southcarolinaparks.com/
/// (links point back to that domain), with the BootstrapMenu account/admin control merged into the header's
/// utility bar and MasterFooter.ascx adding sign in/out and staff links by access level.
/// Modeled on /parks/MasterPage.master.
/// </summary>
public partial class MasterPage : UIMasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        PUP.IncludeJQuery = true;
        PUP.IncludeJQueryUI = true;
        PUP.IncludeJQueryUICss = true;

        MasterBlurbList.SiteID = PUP.SiteID;
        MasterBlurbList.ItemID = PUP.SiteID;
        MasterBlurbList.ShowSummary = false;
        MasterBlurbList.ShowLineBetweenItems = false;
        MasterBlurbList.ShowThumbnails = false;
        MasterBlurbList.ShowListHeader = true;
        MasterBlurbList.OrderBy = "IsNull(BlurbType.Title,IsNull(IsNull(IsNull(T.TitlePlural,T.Title),PrimaryType.TitlePlural),PrimaryType.Title)), ISNULL(Blurb.Priority, Site_Item.ItemPriority)";

        ScParksCssLink.Href = VersionedUrl("/scparks/css/scparks.css");
    }

    /// <summary>
    /// Appends ?v={last-write time} so browsers (and Cloudflare) fetch the file again after each deploy,
    /// instead of running a cached copy against newer master page markup. Same approach as
    /// BootstrapMenu.ascx.cs's UtilJsUrl().
    /// </summary>
    protected string VersionedUrl(string path)
    {
        try
        {
            return path + "?v=" + System.IO.File.GetLastWriteTimeUtc(Server.MapPath(path)).ToString("yyyyMMddHHmmss");
        }
        catch
        {
            return path;
        }
    }
}
