export const BASE_TEMPLATE = (content: string) => `
 <div style="padding:10px 10px;font-family: Inter, sans-serif;border-radius: 16px; color: #333; line-height: 1.6;" >
   <table align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; margin: 0 auto; border: 1px solid #ddd;border-radius:8px;">
    <tr>
      <td style="padding: 15px;">
<!--        <a href='https://freeluencers.com'><img alt="Freeluencers" src="https://freeluencers.com/icon.png" height="80" width="80" style="margin:10px auto 30px;display:block;"/></a>-->
        ${content}
      </td>
    </tr>
  </table>
  </div>
`;
