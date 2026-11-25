<%@ Control Language="C#" AutoEventWireup="true" CodeFile="MasterFooter.ascx.cs" Inherits="MasterFooter" %>

<%-- Account and staff links shown in the South Carolina Parks footer. Which links display depends on the
     user's access level; visLevelN classes let /core/item/scripts/util.js show/hide them on cached pages. --%>
<asp:Panel ID="FooterPanel" runat="server" CssClass="sc-account-footer" role="navigation" aria-label="Footer Account Links">
    <style>
        .sc-account-footer {
            text-align: center;
            padding: 10px 15px 4px 15px;
        }

            .sc-account-footer a.bottomlink {
                display: inline-block;
                margin: 0 12px 6px 12px;
                white-space: nowrap;
                color: #fff;
            }

                .sc-account-footer a.bottomlink:hover, .sc-account-footer a.bottomlink:focus {
                    color: #fff;
                    text-decoration: underline;
                }
    </style>
    <asp:HyperLink ID="AccountHL" CssClass="bottomlink" runat="server" Text="Volunteer Account"></asp:HyperLink>
    <asp:HyperLink ID="SignInHL" CssClass="bottomlink" runat="server" Text="Sign In"></asp:HyperLink>
    <asp:HyperLink ID="SignOutHL" CssClass="bottomlink" runat="server" Text="Sign Out"></asp:HyperLink>
    <asp:HyperLink ID="AdminHL" CssClass="bottomlink" runat="server" Text="Admin Tools"></asp:HyperLink>
</asp:Panel>
