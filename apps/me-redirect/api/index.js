
export function GET(req, res) {
    const domain = req.headers?.host
    if (
        !domain
    )
        return Response.redirect(process.env.NEXT_PUBLIC_FRONTEND_BASE_URL||"https://freeluencers.com");
    const username = domain.split(".")[0];
    return res.redirect(process.env.NEXT_PUBLIC_FRONTEND_BASE_URL+'/profile/'+username)
}

export const config = {
    runtime: 'edge',
};