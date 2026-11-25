using System;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ManagementSuite.Web.UI;

/// <summary>
/// Footer account links for the South Carolina Parks master page, modeled on /parks/MasterFooter.ascx.
/// Sign In shows for anonymous visitors, Sign Out for signed-in users, and Admin Tools for staff (UserAccess >= 4).
/// Links are always rendered with visLevelN classes (plus "hidden" when not applicable) so
/// /core/item/scripts/util.js can adjust them client-side for the current user.
/// </summary>
public partial class MasterFooter : UIControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (PUP.IsMode("e"))
        {
            FooterPanel.Visible = false;
            return; // Show nothing, EmailLinks.cs in MS used instead for email footer.
        }

        AccountHL.NavigateUrl = PUP.Live ? "/account" : PUP.GetShortUrl("/account", 0);

        SignInHL.NavigateUrl = PUP.Live ? "/signin" : PUP.GetShortUrl("/signin", 0);
        SignInHL.CssClass += " visLevel0";
        if (PUP.UserAccess >= 1 || PUP.IContains(PUP.RelativeUrl, "signin"))
        {
            SignInHL.Visible = false;
        }

        SignOutHL.NavigateUrl = PUP.Live ? "/signout" : PUP.GetShortUrl("/signout", 0);
        SignOutHL.CssClass += " visLevel1";
        if (PUP.UserAccess == 0) SignOutHL.CssClass += " hidden";

        AdminHL.NavigateUrl = PUP.GetShortUrl("/net/admin/tools.aspx", 0);
        AdminHL.CssClass += " visLevel4";
        if (PUP.UserAccess < 4) AdminHL.CssClass += " hidden";
    }
}
